import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { getNeighborhoodFromAddress } from '@/lib/geocoding'

const ADMIN_ROLES = ['editor', 'admin', 'super_admin']

// Fields that live on the synagogues table
const SYNAGOGUE_FIELDS = new Set([
  'name',
  'founded_year',
  'founded_text',
  'closed_year',
  'closed_text',
  'status',
])

// Fields that live on the addresses table (applied to the primary current address)
const ADDRESS_FIELDS = new Set([
  'neighborhood',
  'street_address',
  'city',
  'state',
  'zip_code',
])

export async function POST(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const supabase = createRouteHandlerClient({ cookies })

  // ── 1. Auth ──────────────────────────────────────────────────────────────
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // ── 2. Role check ────────────────────────────────────────────────────────
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle()

  if (!profile || !ADMIN_ROLES.includes(profile.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // ── 3. Fetch the proposal ────────────────────────────────────────────────
  const { data: proposal, error: propError } = await supabase
    .from('edit_proposals')
    .select('*')
    .eq('id', params.id)
    .eq('status', 'pending')  // guard: only act on pending proposals
    .single()

  if (propError || !proposal) {
    return NextResponse.json(
      { error: 'Proposal not found or already reviewed' },
      { status: 404 },
    )
  }

  const proposed = (proposal.proposed_data ?? {}) as Record<string, unknown>
  const now = new Date().toISOString()

  // ── 4. Apply changes based on proposal_type ──────────────────────────────

  if (proposal.proposal_type === 'synagogue_merge' && proposal.synagogue_id) {
    const mergeSourceId = proposal.synagogue_id
    const mergeTargetId = proposed.merge_target_id as string | undefined

    if (!mergeTargetId) {
      return NextResponse.json({ error: 'Missing merge target' }, { status: 400 })
    }

    const merged = (proposed.merged_fields ?? {}) as Record<string, unknown>

    // 1. Update source synagogue with merged field values
    const { error: updateError } = await supabase
      .from('synagogues')
      .update({
        name:         merged.name         !== undefined ? (merged.name         ?? undefined) : undefined,
        status:       merged.status       !== undefined ? (merged.status       ?? undefined) : undefined,
        founded_year: merged.founded_year !== undefined ? (merged.founded_year ?? null)      : undefined,
        closed_year:  merged.closed_year  !== undefined ? (merged.closed_year  ?? null)      : undefined,
      })
      .eq('id', mergeSourceId)

    if (updateError) {
      return NextResponse.json(
        { error: `Failed to update synagogue: ${updateError.message}` },
        { status: 500 },
      )
    }

    // 2. Move addresses from target to source
    await supabase
      .from('addresses')
      .update({ synagogue_id: mergeSourceId })
      .eq('synagogue_id', mergeTargetId)

    // 3. Move rabbi affiliations from target to source
    await supabase
      .from('rabbis')
      .update({ synagogue_id: mergeSourceId })
      .eq('synagogue_id', mergeTargetId)

    // 4. Move history entries from target to source
    await supabase
      .from('history_entries')
      .update({ synagogue_id: mergeSourceId })
      .eq('synagogue_id', mergeTargetId)

    // 5. Move photos from target to source
    await supabase
      .from('images')
      .update({ synagogue_id: mergeSourceId })
      .eq('synagogue_id', mergeTargetId)

    // 6. Soft-delete the target synagogue
    await supabase
      .from('synagogues')
      .update({
        deleted:    true,
        deleted_by: user.id,
        deleted_at: now,
      })
      .eq('id', mergeTargetId)

  } else if (proposal.proposal_type === 'synagogue_split' && proposal.synagogue_id) {
    const origId       = proposal.synagogue_id
    const origFields   = (proposed.original_fields ?? {}) as Record<string, unknown>
    const newFields    = (proposed.new_fields       ?? {}) as Record<string, unknown>
    const assignments  = (proposed.assignments      ?? {}) as {
      addresses:       Record<string, string>
      rabbis:          Record<string, string>
      history_entries: Record<string, string>
      images:          Record<string, string>
    }

    // 1. Update the original synagogue with its revised fields
    await supabase
      .from('synagogues')
      .update({
        name:         origFields.name         !== undefined ? (origFields.name         ?? undefined) : undefined,
        status:       origFields.status       !== undefined ? (origFields.status       ?? undefined) : undefined,
        founded_year: origFields.founded_year !== undefined ? (origFields.founded_year ?? null)      : undefined,
        closed_year:  origFields.closed_year  !== undefined ? (origFields.closed_year  ?? null)      : undefined,
      })
      .eq('id', origId)

    // 2. Create the new synagogue
    const { data: newSyn, error: newSynError } = await supabase
      .from('synagogues')
      .insert({
        name:         typeof newFields.name   === 'string' ? newFields.name.trim() : 'Unknown',
        status:       typeof newFields.status === 'string' ? newFields.status      : 'unknown',
        founded_year: newFields.founded_year ?? null,
        closed_year:  newFields.closed_year  ?? null,
        approved:     true,
        approved_by:  user.id,
        approved_at:  now,
        created_by:   proposal.created_by,
      })
      .select('id')
      .single()

    if (newSynError || !newSyn) {
      return NextResponse.json(
        { error: `Failed to create new synagogue: ${newSynError?.message ?? 'unknown error'}` },
        { status: 500 },
      )
    }

    const newId = newSyn.id

    // 3. Process address assignments
    for (const [addrId, action] of Object.entries(assignments.addresses ?? {})) {
      if (action === 'new') {
        await supabase.from('addresses').update({ synagogue_id: newId }).eq('id', addrId)
      } else if (action === 'both') {
        const { data: row } = await supabase.from('addresses').select('*').eq('id', addrId).single()
        if (row) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { id: _id, ...rest } = row as Record<string, unknown>
          await supabase.from('addresses').insert({ ...rest, synagogue_id: newId })
        }
      } else if (action === 'neither') {
        await supabase.from('addresses').delete().eq('id', addrId)
      }
      // 'original': no-op
    }

    // 4. Process rabbi affiliation assignments
    for (const [rabbiId, action] of Object.entries(assignments.rabbis ?? {})) {
      if (action === 'new') {
        await supabase.from('rabbis').update({ synagogue_id: newId }).eq('id', rabbiId)
      } else if (action === 'both') {
        const { data: row } = await supabase.from('rabbis').select('*').eq('id', rabbiId).single()
        if (row) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { id: _id, ...rest } = row as Record<string, unknown>
          await supabase.from('rabbis').insert({ ...rest, synagogue_id: newId })
        }
      } else if (action === 'neither') {
        await supabase.from('rabbis').delete().eq('id', rabbiId)
      }
    }

    // 5. Process history entry assignments
    for (const [histId, action] of Object.entries(assignments.history_entries ?? {})) {
      if (action === 'new') {
        await supabase.from('history_entries').update({ synagogue_id: newId }).eq('id', histId)
      } else if (action === 'both') {
        const { data: row } = await supabase.from('history_entries').select('*').eq('id', histId).single()
        if (row) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { id: _id, ...rest } = row as Record<string, unknown>
          await supabase.from('history_entries').insert({ ...rest, synagogue_id: newId })
        }
      } else if (action === 'neither') {
        await supabase.from('history_entries').delete().eq('id', histId)
      }
    }

    // 6. Process image assignments
    for (const [imgId, action] of Object.entries(assignments.images ?? {})) {
      if (action === 'new') {
        await supabase.from('images').update({ synagogue_id: newId }).eq('id', imgId)
      } else if (action === 'both') {
        const { data: row } = await supabase.from('images').select('*').eq('id', imgId).single()
        if (row) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { id: _id, storage_path: _sp, ...rest } = row as Record<string, unknown>
          await supabase.from('images').insert({ ...rest, synagogue_id: newId })
        }
      } else if (action === 'neither') {
        const { data: img } = await supabase.from('images').select('id, storage_path').eq('id', imgId).single()
        await supabase.from('images').delete().eq('id', imgId)
        if (img?.storage_path && typeof img.storage_path === 'string') {
          supabase.storage.from('synagogue-images').remove([img.storage_path]).catch(() => {})
        }
      }
    }

  } else if (proposal.proposal_type === 'synagogue_edit' && proposal.synagogue_id) {
    // Split fields by their target table
    const synagogueChanges: Record<string, unknown> = {}
    const addressChanges: Record<string, unknown> = {}

    for (const [key, value] of Object.entries(proposed)) {
      if (SYNAGOGUE_FIELDS.has(key)) {
        synagogueChanges[key] = value
      } else if (ADDRESS_FIELDS.has(key)) {
        addressChanges[key] = value
      }
      // Unknown fields are silently ignored — no accidental schema pollution
    }

    // Update synagogues row
    if (Object.keys(synagogueChanges).length > 0) {
      const { error } = await supabase
        .from('synagogues')
        .update(synagogueChanges)
        .eq('id', proposal.synagogue_id)
      if (error) {
        return NextResponse.json(
          { error: `Failed to update synagogue: ${error.message}` },
          { status: 500 },
        )
      }
    }

    // Update primary address row (neighborhood, etc.)
    if (Object.keys(addressChanges).length > 0) {
      const { data: primaryAddr } = await supabase
        .from('addresses')
        .select('id')
        .eq('synagogue_id', proposal.synagogue_id)
        .eq('is_current', true)
        .order('address_order', { ascending: true })
        .limit(1)
        .maybeSingle()

      if (primaryAddr) {
        const { error } = await supabase
          .from('addresses')
          .update(addressChanges)
          .eq('id', primaryAddr.id)
        if (error) {
          return NextResponse.json(
            { error: `Failed to update address: ${error.message}` },
            { status: 500 },
          )
        }
      }
      // If no primary address exists yet, the address fields are accepted but
      // not applied — the admin can create an address separately.
    }

  } else if (proposal.proposal_type === 'synagogue_new') {
    // Insert a new approved synagogue record
    const name       = typeof proposed.name   === 'string' ? proposed.name.trim() : 'Unknown'
    const status     = typeof proposed.status === 'string' ? proposed.status      : 'unknown'
    const newRecord: Record<string, unknown> = {
      name,
      status,
      founded_year: proposed.founded_year ?? null,
      founded_text: proposed.founded_text ?? null,
      closed_year:  proposed.closed_year  ?? null,
      closed_text:  proposed.closed_text  ?? null,
      approved:     true,
      approved_by:  user.id,
      approved_at:  now,
      created_by:   proposal.created_by,
    }
    const { error } = await supabase.from('synagogues').insert(newRecord)
    if (error) {
      return NextResponse.json(
        { error: `Failed to create synagogue: ${error.message}` },
        { status: 500 },
      )
    }

  } else if (proposal.proposal_type === 'synagogue_delete' && proposal.synagogue_id) {
    // 1. Soft-delete the synagogue row
    const { error: synError } = await supabase
      .from('synagogues')
      .update({ deleted: true, deleted_by: user.id, deleted_at: now })
      .eq('id', proposal.synagogue_id)
    if (synError) {
      return NextResponse.json(
        { error: `Failed to delete synagogue: ${synError.message}` },
        { status: 500 },
      )
    }

    // 2. Hard-delete addresses
    await supabase
      .from('addresses')
      .delete()
      .eq('synagogue_id', proposal.synagogue_id)

    // 3. Hard-delete history entries
    await supabase
      .from('history_entries')
      .delete()
      .eq('synagogue_id', proposal.synagogue_id)

    // 4. Hard-delete rabbi affiliation records (NOT rabbi_profiles)
    await supabase
      .from('rabbis')
      .delete()
      .eq('synagogue_id', proposal.synagogue_id)

    // 5. Delete images and attempt storage cleanup
    const { data: linkedImages } = await supabase
      .from('images')
      .select('id, storage_path')
      .eq('synagogue_id', proposal.synagogue_id)

    if (linkedImages?.length) {
      await supabase
        .from('images')
        .delete()
        .eq('synagogue_id', proposal.synagogue_id)

      const paths = linkedImages
        .map(i => i.storage_path)
        .filter((p): p is string => typeof p === 'string' && p.length > 0)

      if (paths.length) {
        // Fire-and-forget storage cleanup
        supabase.storage.from('synagogue-images').remove(paths).catch(() => {})
      }
    }

  } else if (proposal.proposal_type === 'address_new' && proposal.synagogue_id) {
    // If no neighborhood was provided, try to infer it from the street address.
    // Failure is non-fatal — the address is still created without a neighborhood.
    let neighborhood = typeof proposed.neighborhood === 'string' && proposed.neighborhood.trim()
      ? proposed.neighborhood.trim()
      : null

    if (!neighborhood && proposed.street_address) {
      neighborhood = await getNeighborhoodFromAddress(
        String(proposed.street_address),
        String(proposed.city  ?? 'Philadelphia'),
        String(proposed.state ?? 'PA'),
      )
    }

    const { error } = await supabase
      .from('addresses')
      .insert({
        synagogue_id:   proposal.synagogue_id,
        street_address: proposed.street_address ?? null,
        city:           proposed.city           ?? null,
        state:          proposed.state          ?? null,
        zip_code:       proposed.zip_code       ?? null,
        neighborhood,
        start_year:     proposed.start_year     ?? null,
        end_year:       proposed.end_year       ?? null,
        is_current:     proposed.is_current     ?? false,
        approved:       true,
        created_by:     proposal.created_by,
      })
    if (error) {
      return NextResponse.json(
        { error: `Failed to insert address: ${error.message}` },
        { status: 500 },
      )
    }

  } else if (proposal.proposal_type === 'rabbi_new' && proposal.synagogue_id) {
    const { error } = await supabase
      .from('rabbis')
      .insert({
        synagogue_id: proposal.synagogue_id,
        name:         proposed.name       ?? null,
        title:        proposed.title      ?? null,
        start_year:   proposed.start_year ?? null,
        end_year:     proposed.end_year   ?? null,
        notes:        proposed.notes      ?? null,
        approved:     true,
        created_by:   proposal.created_by,
      })
    if (error) {
      return NextResponse.json(
        { error: `Failed to insert rabbi: ${error.message}` },
        { status: 500 },
      )
    }

  } else if (proposal.proposal_type === 'history_new' && proposal.synagogue_id) {
    const { error } = await supabase
      .from('history_entries')
      .insert({
        synagogue_id:     proposal.synagogue_id,
        content:          proposed.content          ?? null,
        entry_type:       proposed.entry_type       ?? 'general',
        year:             proposed.year             ?? null,
        year_range_start: proposed.year_range_start ?? null,
        year_range_end:   proposed.year_range_end   ?? null,
        circa:            proposed.circa            ?? false,
        source:           proposed.source           ?? null,
        source_url:       proposed.source_url       ?? null,
        approved:         true,
        created_by:       proposal.created_by,
      })
    if (error) {
      return NextResponse.json(
        { error: `Failed to insert history entry: ${error.message}` },
        { status: 500 },
      )
    }
  } else if (proposal.proposal_type === 'rabbi_profile_delete' && proposal.entity_id) {
    // 1. Soft-delete the rabbi_profiles row
    const { error: profileError } = await supabase
      .from('rabbi_profiles')
      .update({ deleted: true })
      .eq('id', proposal.entity_id)
    if (profileError) {
      return NextResponse.json(
        { error: `Failed to delete rabbi profile: ${profileError.message}` },
        { status: 500 },
      )
    }

    // 2. Delete linked rabbi affiliation records (rabbis.profile_id FK)
    await supabase
      .from('rabbis')
      .delete()
      .eq('profile_id', proposal.entity_id)
    // Non-fatal: if no affiliations exist this is a no-op

    // 3. Delete linked images and attempt storage cleanup
    const { data: linkedImages } = await supabase
      .from('images')
      .select('id, storage_path')
      .eq('rabbi_profile_id', proposal.entity_id)

    if (linkedImages?.length) {
      await supabase
        .from('images')
        .delete()
        .eq('rabbi_profile_id', proposal.entity_id)

      const paths = linkedImages
        .map(i => i.storage_path)
        .filter((p): p is string => typeof p === 'string' && p.length > 0)
      if (paths.length) {
        // fire-and-forget; storage cleanup failure is non-critical
        supabase.storage.from('synagogue-images').remove(paths).catch(() => {})
      }
    }

  } else if (proposal.proposal_type === 'rabbi_profile_new') {
    const candidateName = typeof proposed.canonical_name === 'string'
      ? proposed.canonical_name.trim()
      : 'unknown'

    // Build base slug from name
    const baseSlug = candidateName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .substring(0, 100)

    // Ensure uniqueness by appending a counter if needed
    let finalSlug = baseSlug
    let counter   = 1
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { data: existing } = await supabase
        .from('rabbi_profiles')
        .select('id')
        .eq('slug', finalSlug)
        .maybeSingle()
      if (!existing) break
      finalSlug = `${baseSlug}-${counter}`
      counter++
    }

    const { error } = await supabase
      .from('rabbi_profiles')
      .insert({
        canonical_name:  candidateName,
        slug:            finalSlug,
        birth_year:      proposed.birth_year      ?? null,
        circa_birth:     proposed.circa_birth     ?? false,
        death_year:      proposed.death_year      ?? null,
        circa_death:     proposed.circa_death     ?? false,
        biography:       proposed.biography       ?? null,
        approved:        true,
        approved_by:     user.id,
        approved_at:     now,
        created_by:      proposal.created_by,
      })
    if (error) {
      return NextResponse.json(
        { error: `Failed to create rabbi profile: ${error.message}` },
        { status: 500 },
      )
    }

  } else if (proposal.proposal_type === 'rabbi_profile_edit' && proposal.entity_id) {
    const { error } = await supabase
      .from('rabbi_profiles')
      .update({
        canonical_name:  proposed.canonical_name  ?? undefined,
        birth_year:      proposed.birth_year      !== undefined ? (proposed.birth_year      ?? null)  : undefined,
        circa_birth:     proposed.circa_birth     !== undefined ? (proposed.circa_birth     ?? false) : undefined,
        death_year:      proposed.death_year      !== undefined ? (proposed.death_year      ?? null)  : undefined,
        circa_death:     proposed.circa_death     !== undefined ? (proposed.circa_death     ?? false) : undefined,
        biography:       proposed.biography       !== undefined ? (proposed.biography       ?? null)  : undefined,
        birthplace:      proposed.birthplace      !== undefined ? (proposed.birthplace      ?? null)  : undefined,
        death_place:     proposed.death_place     !== undefined ? (proposed.death_place     ?? null)  : undefined,
        seminary:        proposed.seminary        !== undefined ? (proposed.seminary        ?? null)  : undefined,
        ordination_year: proposed.ordination_year !== undefined ? (proposed.ordination_year ?? null)  : undefined,
        denomination:    proposed.denomination    !== undefined ? (proposed.denomination    ?? null)  : undefined,
        languages:       proposed.languages       !== undefined ? (proposed.languages       ?? null)  : undefined,
        publications:    proposed.publications    !== undefined ? (proposed.publications    ?? null)  : undefined,
        achievements:    proposed.achievements    !== undefined ? (proposed.achievements    ?? null)  : undefined,
        updated_at:      now,
      })
      .eq('id', proposal.entity_id)
    if (error) {
      return NextResponse.json(
        { error: `Failed to update rabbi profile: ${error.message}` },
        { status: 500 },
      )
    }

  } else if (proposal.proposal_type === 'rabbi_profile_merge' && proposal.entity_id) {
    const mergeSourceId = proposal.entity_id
    const mergeTargetId = proposed.merge_target_id as string | undefined

    if (!mergeTargetId) {
      return NextResponse.json({ error: 'Missing merge target' }, { status: 400 })
    }

    const merged = (proposed.merged_fields ?? {}) as Record<string, unknown>

    // 1. Update the source rabbi_profiles row with the merged data
    const { error: updateError } = await supabase
      .from('rabbi_profiles')
      .update({
        canonical_name:  merged.canonical_name  ?? undefined,
        birth_year:      merged.birth_year      !== undefined ? (merged.birth_year      ?? null)  : undefined,
        circa_birth:     merged.circa_birth     !== undefined ? (merged.circa_birth     ?? false) : undefined,
        death_year:      merged.death_year      !== undefined ? (merged.death_year      ?? null)  : undefined,
        circa_death:     merged.circa_death     !== undefined ? (merged.circa_death     ?? false) : undefined,
        biography:       merged.biography       !== undefined ? (merged.biography       ?? null)  : undefined,
        birthplace:      merged.birthplace      !== undefined ? (merged.birthplace      ?? null)  : undefined,
        death_place:     merged.death_place     !== undefined ? (merged.death_place     ?? null)  : undefined,
        seminary:        merged.seminary        !== undefined ? (merged.seminary        ?? null)  : undefined,
        ordination_year: merged.ordination_year !== undefined ? (merged.ordination_year ?? null)  : undefined,
        denomination:    merged.denomination    !== undefined ? (merged.denomination    ?? null)  : undefined,
        languages:       merged.languages       !== undefined ? (merged.languages       ?? null)  : undefined,
        publications:    merged.publications    !== undefined ? (merged.publications    ?? null)  : undefined,
        achievements:    merged.achievements    !== undefined ? (merged.achievements    ?? null)  : undefined,
        updated_at:      now,
      })
      .eq('id', mergeSourceId)

    if (updateError) {
      return NextResponse.json(
        { error: `Failed to update rabbi profile: ${updateError.message}` },
        { status: 500 },
      )
    }

    // 2. Move synagogue affiliations from target to source
    await supabase
      .from('rabbis')
      .update({ profile_id: mergeSourceId })
      .eq('profile_id', mergeTargetId)

    // 3. Move photos from target to source
    await supabase
      .from('images')
      .update({ rabbi_profile_id: mergeSourceId })
      .eq('rabbi_profile_id', mergeTargetId)

    // 4. Move rabbi_relationships (if table exists) — errors returned in {error} field, non-fatal
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any)
      .from('rabbi_relationships')
      .update({ rabbi_id: mergeSourceId })
      .eq('rabbi_id', mergeTargetId)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any)
      .from('rabbi_relationships')
      .update({ related_rabbi_id: mergeSourceId })
      .eq('related_rabbi_id', mergeTargetId)

    // 5. Soft-delete the target rabbi
    await supabase
      .from('rabbi_profiles')
      .update({
        deleted:    true,
        deleted_by: user.id,
        deleted_at: now,
      })
      .eq('id', mergeTargetId)

  } else if (proposal.proposal_type === 'rabbi_profile_split' && proposal.entity_id) {
    const origId      = proposal.entity_id
    const origFields  = (proposed.original_fields ?? {}) as Record<string, unknown>
    const newFields   = (proposed.new_fields       ?? {}) as Record<string, unknown>
    const assignments = (proposed.assignments      ?? {}) as {
      rabbis: Record<string, string>
      images: Record<string, string>
    }

    // 1. Update the original rabbi_profiles row with its revised fields
    await supabase
      .from('rabbi_profiles')
      .update({
        canonical_name:  origFields.canonical_name  ?? undefined,
        birth_year:      origFields.birth_year      !== undefined ? (origFields.birth_year      ?? null)  : undefined,
        circa_birth:     origFields.circa_birth     !== undefined ? (origFields.circa_birth     ?? false) : undefined,
        death_year:      origFields.death_year      !== undefined ? (origFields.death_year      ?? null)  : undefined,
        circa_death:     origFields.circa_death     !== undefined ? (origFields.circa_death     ?? false) : undefined,
        biography:       origFields.biography       !== undefined ? (origFields.biography       ?? null)  : undefined,
        birthplace:      origFields.birthplace      !== undefined ? (origFields.birthplace      ?? null)  : undefined,
        death_place:     origFields.death_place     !== undefined ? (origFields.death_place     ?? null)  : undefined,
        seminary:        origFields.seminary        !== undefined ? (origFields.seminary        ?? null)  : undefined,
        ordination_year: origFields.ordination_year !== undefined ? (origFields.ordination_year ?? null)  : undefined,
        denomination:    origFields.denomination    !== undefined ? (origFields.denomination    ?? null)  : undefined,
        languages:       origFields.languages       !== undefined ? (origFields.languages       ?? null)  : undefined,
        publications:    origFields.publications    !== undefined ? (origFields.publications    ?? null)  : undefined,
        achievements:    origFields.achievements    !== undefined ? (origFields.achievements    ?? null)  : undefined,
        updated_at:      now,
      })
      .eq('id', origId)

    // 2. Build a unique slug for the new rabbi profile
    const candidateName = typeof newFields.canonical_name === 'string'
      ? newFields.canonical_name.trim()
      : 'unknown'

    const baseSlug = candidateName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .substring(0, 100)

    let finalSlug = baseSlug
    let counter   = 1
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { data: existing } = await supabase
        .from('rabbi_profiles')
        .select('id')
        .eq('slug', finalSlug)
        .maybeSingle()
      if (!existing) break
      finalSlug = `${baseSlug}-${counter}`
      counter++
    }

    // 3. Insert the new rabbi profile
    const { data: newRabbi, error: newRabbiError } = await supabase
      .from('rabbi_profiles')
      .insert({
        canonical_name:  candidateName,
        slug:            finalSlug,
        birth_year:      newFields.birth_year      ?? null,
        circa_birth:     newFields.circa_birth     ?? false,
        death_year:      newFields.death_year      ?? null,
        circa_death:     newFields.circa_death     ?? false,
        biography:       newFields.biography       ?? null,
        birthplace:      newFields.birthplace      ?? null,
        death_place:     newFields.death_place     ?? null,
        seminary:        newFields.seminary        ?? null,
        ordination_year: newFields.ordination_year ?? null,
        denomination:    newFields.denomination    ?? null,
        languages:       newFields.languages       ?? null,
        publications:    newFields.publications    ?? null,
        achievements:    newFields.achievements    ?? null,
        approved:        true,
        approved_by:     user.id,
        approved_at:     now,
        created_by:      proposal.created_by,
      })
      .select('id')
      .single()

    if (newRabbiError || !newRabbi) {
      return NextResponse.json(
        { error: `Failed to create new rabbi profile: ${newRabbiError?.message ?? 'unknown error'}` },
        { status: 500 },
      )
    }

    const newRabbiId = newRabbi.id

    // 4. Process affiliation (rabbis table) assignments
    for (const [affId, action] of Object.entries(assignments.rabbis ?? {})) {
      if (action === 'new') {
        await supabase.from('rabbis').update({ profile_id: newRabbiId }).eq('id', affId)
      } else if (action === 'both') {
        const { data: row } = await supabase.from('rabbis').select('*').eq('id', affId).single()
        if (row) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { id: _id, ...rest } = row as Record<string, unknown>
          await supabase.from('rabbis').insert({ ...rest, profile_id: newRabbiId })
        }
      } else if (action === 'neither') {
        await supabase.from('rabbis').delete().eq('id', affId)
      }
      // 'original': no-op
    }

    // 5. Process image assignments
    for (const [imgId, action] of Object.entries(assignments.images ?? {})) {
      if (action === 'new') {
        await supabase.from('images').update({ rabbi_profile_id: newRabbiId }).eq('id', imgId)
      } else if (action === 'both') {
        const { data: row } = await supabase.from('images').select('*').eq('id', imgId).single()
        if (row) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { id: _id, storage_path: _sp, ...rest } = row as Record<string, unknown>
          await supabase.from('images').insert({ ...rest, rabbi_profile_id: newRabbiId })
        }
      } else if (action === 'neither') {
        const { data: img } = await supabase.from('images').select('id, storage_path').eq('id', imgId).single()
        await supabase.from('images').delete().eq('id', imgId)
        if (img?.storage_path && typeof img.storage_path === 'string') {
          supabase.storage.from('synagogue-images').remove([img.storage_path]).catch(() => {})
        }
      }
    }
  } else if (proposal.proposal_type === 'rabbi_affiliation_new') {
    const rabbiProfileId = proposed.rabbi_profile_id as string | undefined
    const affSynagogueId = proposed.synagogue_id     as string | undefined

    if (!rabbiProfileId || !affSynagogueId) {
      return NextResponse.json(
        { error: 'Missing rabbi_profile_id or synagogue_id' },
        { status: 400 },
      )
    }

    // Fetch rabbi name — required column on the rabbis table
    const { data: rabbiProfile } = await supabase
      .from('rabbi_profiles')
      .select('canonical_name')
      .eq('id', rabbiProfileId)
      .single()

    const { error: insertError } = await supabase
      .from('rabbis')
      .insert({
        profile_id:   rabbiProfileId,
        synagogue_id: affSynagogueId,
        name:         rabbiProfile?.canonical_name ?? (proposal.current_data?.rabbi_name as string | undefined) ?? 'Unknown',
        title:        proposed.title      ?? null,
        start_year:   proposed.start_year ?? null,
        end_year:     proposed.end_year   ?? null,
        notes:        proposed.notes      ?? null,
        approved:     true,
        created_by:   proposal.created_by,
      })

    if (insertError) {
      return NextResponse.json(
        { error: `Failed to create affiliation: ${insertError.message}` },
        { status: 500 },
      )
    }
  }
  // No-op for unknown proposal_type — we still mark it approved below
  // so it doesn't stay stuck in the review queue.

  // ── 5. Mark proposal as approved ────────────────────────────────────────
  const { error: approveError } = await supabase
    .from('edit_proposals')
    .update({
      status:      'approved',
      reviewed_by: user.id,
      reviewed_at: now,
    })
    .eq('id', params.id)

  if (approveError) {
    return NextResponse.json(
      { error: `Failed to mark proposal approved: ${approveError.message}` },
      { status: 500 },
    )
  }

  return NextResponse.json({ success: true })
}
