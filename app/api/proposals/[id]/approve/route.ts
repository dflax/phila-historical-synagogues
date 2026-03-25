import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@supabase/supabase-js'
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

  // Service-role client bypasses RLS for data mutations that admins must be
  // able to perform regardless of per-row policies (e.g. soft-deleting rows
  // in tables where the session user is not the row owner).
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  )

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

    // Mirror: move new-model affiliations
    await supabaseAdmin
      .from('affiliations')
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
        await supabaseAdmin.from('affiliations').update({ synagogue_id: newId }).eq('id', rabbiId)
      } else if (action === 'both') {
        const { data: row } = await supabase.from('rabbis').select('*').eq('id', rabbiId).single()
        if (row) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { id: _id, ...rest } = row as Record<string, unknown>
          await supabase.from('rabbis').insert({ ...rest, synagogue_id: newId })
        }
        // Mirror: copy affiliation row to new synagogue
        const { data: affRow } = await supabaseAdmin.from('affiliations').select('*').eq('id', rabbiId).single()
        if (affRow) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { id: _affId, ...affRest } = affRow as Record<string, unknown>
          await supabaseAdmin.from('affiliations').insert({ ...affRest, synagogue_id: newId })
        }
      } else if (action === 'neither') {
        await supabase.from('rabbis').delete().eq('id', rabbiId)
        await supabaseAdmin.from('affiliations').delete().eq('id', rabbiId)
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

    // Mirror: hard-delete new-model affiliation records
    await supabaseAdmin
      .from('affiliations')
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
    // 1. Soft-delete in BOTH old (rabbi_profiles) and new (person_profiles) tables
    const [profileResult, personResult] = await Promise.all([
      supabase
        .from('rabbi_profiles')
        .update({ deleted: true })
        .eq('id', proposal.entity_id),
      supabaseAdmin
        .from('person_profiles')
        .update({ deleted: true, deleted_by: user.id, deleted_at: now })
        .eq('id', proposal.entity_id),
    ])
    if (profileResult.error) {
      return NextResponse.json(
        { error: `Failed to delete rabbi profile: ${profileResult.error.message}` },
        { status: 500 },
      )
    }
    // person_profiles failure is non-fatal during transition

    // 2. Delete linked affiliation records from BOTH tables
    await Promise.all([
      supabase.from('rabbis').delete().eq('profile_id', proposal.entity_id),
      supabaseAdmin.from('affiliations').delete().eq('person_profile_id', proposal.entity_id),
    ])
    // Non-fatal: if no affiliations exist these are no-ops

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

    const personType = finalSlug.startsWith('chazzan-') ? 'chazzan' : 'rabbi'

    const [oldInsert, newInsert] = await Promise.all([
      // OLD TABLE: rabbi_profiles
      supabase.from('rabbi_profiles').insert({
        canonical_name: candidateName,
        slug:           finalSlug,
        birth_year:     proposed.birth_year  ?? null,
        circa_birth:    proposed.circa_birth ?? false,
        death_year:     proposed.death_year  ?? null,
        circa_death:    proposed.circa_death ?? false,
        biography:      proposed.biography   ?? null,
        approved:       true,
        approved_by:    user.id,
        approved_at:    now,
        created_by:     proposal.created_by,
      }),
      // NEW TABLE: person_profiles
      supabaseAdmin.from('person_profiles').insert({
        canonical_name: candidateName,
        person_type:    personType,
        slug:           finalSlug,
        birth_year:     proposed.birth_year  ?? null,
        circa_birth:    (proposed.circa_birth ?? false) as boolean,
        death_year:     proposed.death_year  ?? null,
        circa_death:    (proposed.circa_death ?? false) as boolean,
        biography:      proposed.biography   ?? null,
        approved:       true,
      }),
    ])
    if (oldInsert.error) {
      return NextResponse.json(
        { error: `Failed to create rabbi profile: ${oldInsert.error.message}` },
        { status: 500 },
      )
    }
    // person_profiles failure is non-fatal during transition

  } else if (proposal.proposal_type === 'rabbi_profile_edit' && proposal.entity_id) {
    const toLanguagesStr = (v: unknown): string | null =>
      Array.isArray(v) ? v.join(', ') : (typeof v === 'string' ? v : null)

    const [oldUpdate, newUpdate] = await Promise.all([
      // OLD TABLE: rabbi_profiles (languages stays as string[] | null)
      supabase.from('rabbi_profiles').update({
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
      }).eq('id', proposal.entity_id),

      // NEW TABLE: person_profiles (languages as string | null)
      supabaseAdmin.from('person_profiles').update({
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
        languages:       proposed.languages       !== undefined ? toLanguagesStr(proposed.languages)  : undefined,
        publications:    proposed.publications    !== undefined ? (proposed.publications    ?? null)  : undefined,
        achievements:    proposed.achievements    !== undefined ? (proposed.achievements    ?? null)  : undefined,
        updated_at:      now,
      }).eq('id', proposal.entity_id),
    ])
    if (oldUpdate.error) {
      return NextResponse.json(
        { error: `Failed to update rabbi profile: ${oldUpdate.error.message}` },
        { status: 500 },
      )
    }
    // person_profiles failure is non-fatal during transition

  } else if (proposal.proposal_type === 'rabbi_profile_merge' && proposal.entity_id) {
    const mergeSourceId = proposal.entity_id
    const mergeTargetId = proposed.merge_target_id as string | undefined

    if (!mergeTargetId) {
      return NextResponse.json({ error: 'Missing merge target' }, { status: 400 })
    }

    const merged = (proposed.merged_fields ?? {}) as Record<string, unknown>

    const toLanguagesStr = (v: unknown): string | null =>
      Array.isArray(v) ? v.join(', ') : (typeof v === 'string' ? v : null)

    // 1. Update source profile in BOTH tables
    const [mergeOldUpdate, mergeNewUpdate] = await Promise.all([
      // OLD TABLE: rabbi_profiles
      supabase.from('rabbi_profiles').update({
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
      }).eq('id', mergeSourceId),

      // NEW TABLE: person_profiles
      supabaseAdmin.from('person_profiles').update({
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
        languages:       merged.languages       !== undefined ? toLanguagesStr(merged.languages)  : undefined,
        publications:    merged.publications    !== undefined ? (merged.publications    ?? null)  : undefined,
        achievements:    merged.achievements    !== undefined ? (merged.achievements    ?? null)  : undefined,
        updated_at:      now,
      }).eq('id', mergeSourceId),
    ])

    if (mergeOldUpdate.error) {
      return NextResponse.json(
        { error: `Failed to update rabbi profile: ${mergeOldUpdate.error.message}` },
        { status: 500 },
      )
    }
    // person_profiles failure is non-fatal during transition

    // 2. Move synagogue affiliations from target to source in BOTH tables
    await Promise.all([
      supabase.from('rabbis').update({ profile_id: mergeSourceId }).eq('profile_id', mergeTargetId),
      supabaseAdmin.from('affiliations').update({ person_profile_id: mergeSourceId }).eq('person_profile_id', mergeTargetId),
    ])

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

    // 5. Soft-delete the target in BOTH tables
    await Promise.all([
      supabase.from('rabbi_profiles').update({ deleted: true, deleted_by: user.id, deleted_at: now }).eq('id', mergeTargetId),
      supabaseAdmin.from('person_profiles').update({ deleted: true, deleted_by: user.id, deleted_at: now }).eq('id', mergeTargetId),
    ])

  } else if (proposal.proposal_type === 'rabbi_profile_split' && proposal.entity_id) {
    const origId      = proposal.entity_id
    const origFields  = (proposed.original_fields ?? {}) as Record<string, unknown>
    const newFields   = (proposed.new_fields       ?? {}) as Record<string, unknown>
    const assignments = (proposed.assignments      ?? {}) as {
      rabbis: Record<string, string>
      images: Record<string, string>
    }

    const toLanguagesStr = (v: unknown): string | null =>
      Array.isArray(v) ? v.join(', ') : (typeof v === 'string' ? v : null)

    // 1. Update the original profile in BOTH tables
    await Promise.all([
      // OLD TABLE: rabbi_profiles
      supabase.from('rabbi_profiles').update({
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
      }).eq('id', origId),

      // NEW TABLE: person_profiles
      supabaseAdmin.from('person_profiles').update({
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
        languages:       origFields.languages       !== undefined ? toLanguagesStr(origFields.languages) : undefined,
        publications:    origFields.publications    !== undefined ? (origFields.publications    ?? null)  : undefined,
        achievements:    origFields.achievements    !== undefined ? (origFields.achievements    ?? null)  : undefined,
        updated_at:      now,
      }).eq('id', origId),
    ])

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

    // 3. Insert the new rabbi profile in BOTH tables
    const splitPersonType = finalSlug.startsWith('chazzan-') ? 'chazzan' : 'rabbi'

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

    // Mirror: insert into person_profiles with same ID (non-fatal)
    await supabaseAdmin.from('person_profiles').insert({
      id:              newRabbiId,
      canonical_name:  candidateName,
      person_type:     splitPersonType,
      slug:            finalSlug,
      birth_year:      newFields.birth_year      ?? null,
      circa_birth:     (newFields.circa_birth     ?? false) as boolean,
      death_year:      newFields.death_year      ?? null,
      circa_death:     (newFields.circa_death     ?? false) as boolean,
      biography:       newFields.biography       ?? null,
      birthplace:      newFields.birthplace      ?? null,
      death_place:     newFields.death_place     ?? null,
      seminary:        newFields.seminary        ?? null,
      ordination_year: newFields.ordination_year ?? null,
      denomination:    newFields.denomination    ?? null,
      languages:       toLanguagesStr(newFields.languages ?? null),
      publications:    newFields.publications    ?? null,
      achievements:    newFields.achievements    ?? null,
      approved:        true,
    })

    // 4. Process affiliation (rabbis table) assignments — mirror to affiliations table
    for (const [affId, action] of Object.entries(assignments.rabbis ?? {})) {
      if (action === 'new') {
        await supabase.from('rabbis').update({ profile_id: newRabbiId }).eq('id', affId)
        await supabaseAdmin.from('affiliations').update({ person_profile_id: newRabbiId }).eq('id', affId)
      } else if (action === 'both') {
        const { data: row } = await supabase.from('rabbis').select('*').eq('id', affId).single()
        if (row) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { id: _id, ...rest } = row as Record<string, unknown>
          await supabase.from('rabbis').insert({ ...rest, profile_id: newRabbiId })
        }
        // Mirror: copy affiliation row
        const { data: affRow } = await supabaseAdmin.from('affiliations').select('*').eq('id', affId).single()
        if (affRow) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { id: _affId, ...affRest } = affRow as Record<string, unknown>
          await supabaseAdmin.from('affiliations').insert({ ...affRest, person_profile_id: newRabbiId })
        }
      } else if (action === 'neither') {
        await supabase.from('rabbis').delete().eq('id', affId)
        await supabaseAdmin.from('affiliations').delete().eq('id', affId)
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

    const rabbiName = rabbiProfile?.canonical_name ?? (proposal.current_data?.rabbi_name as string | undefined) ?? 'Unknown'
    const roleTitle = (proposed.title as string | null | undefined) ?? null

    // Generate a single shared UUID so both tables get the same row ID.
    // Without this, each insert gets a different auto-generated UUID and
    // the dual-query helper can't deduplicate them by ID.
    const sharedAffiliationId = crypto.randomUUID()

    // Write to BOTH old table (rabbis) and new table (affiliations)
    const [oldAffResult, newAffResult] = await Promise.all([
      supabase.from('rabbis').insert({
        id:           sharedAffiliationId,
        profile_id:   rabbiProfileId,
        synagogue_id: affSynagogueId,
        name:         rabbiName,
        title:        roleTitle,
        start_year:   proposed.start_year ?? null,
        end_year:     proposed.end_year   ?? null,
        notes:        proposed.notes      ?? null,
        approved:     true,
        created_by:   proposal.created_by,
      }),
      supabaseAdmin.from('affiliations').insert({
        id:                   sharedAffiliationId,
        person_profile_id:    rabbiProfileId,
        synagogue_id:         affSynagogueId,
        affiliation_category: 'clergy',
        role_title:           roleTitle || 'Rabbi',
        start_year:           (proposed.start_year as number | null | undefined) ?? null,
        end_year:             (proposed.end_year   as number | null | undefined) ?? null,
        notes:                (proposed.notes      as string | null | undefined) ?? null,
        approved:             true,
      }),
    ])

    if (oldAffResult.error) {
      return NextResponse.json(
        { error: `Failed to create affiliation: ${oldAffResult.error.message}` },
        { status: 500 },
      )
    }
    // affiliations failure is non-fatal during transition
  } else if (proposal.proposal_type === 'link_new') {
    const linkEntityType = proposed.entity_type as string | undefined
    const linkEntityId   = proposed.entity_id   as string | undefined

    if (!linkEntityType || !linkEntityId) {
      return NextResponse.json(
        { error: 'Missing entity_type or entity_id' },
        { status: 400 },
      )
    }

    if (linkEntityType !== 'synagogue' && linkEntityType !== 'rabbi') {
      return NextResponse.json(
        { error: 'Invalid entity_type' },
        { status: 400 },
      )
    }

    const { error: linkInsertError } = await supabase
      .from('links')
      .insert({
        entity_type:   linkEntityType,
        entity_id:     linkEntityId,
        link_type:     proposed.link_type,
        url:           proposed.url,
        title:         (proposed.title       as string | undefined) ?? null,
        description:   (proposed.description as string | undefined) ?? null,
        display_order: 0,
        approved:      true,
        approved_by:   user.id,
        approved_at:   now,
        created_by:    proposal.created_by,
      })

    if (linkInsertError) {
      return NextResponse.json(
        { error: `Failed to create link: ${linkInsertError.message}` },
        { status: 500 },
      )
    }
  } else if (proposal.proposal_type === 'link_edit' && proposal.entity_id) {
    const linkId = proposal.entity_id

    const updatePayload: Record<string, unknown> = { updated_at: now }
    if (proposed.link_type  !== undefined) updatePayload.link_type    = proposed.link_type
    if (proposed.url        !== undefined) updatePayload.url          = proposed.url
    if (proposed.title      !== undefined) updatePayload.title        = proposed.title ?? null
    if (proposed.description !== undefined) updatePayload.description = proposed.description ?? null

    const { error: linkUpdateError } = await supabase
      .from('links')
      .update(updatePayload)
      .eq('id', linkId)

    if (linkUpdateError) {
      return NextResponse.json(
        { error: `Failed to update link: ${linkUpdateError.message}` },
        { status: 500 },
      )
    }
  } else if (proposal.proposal_type === 'link_delete' && proposal.entity_id) {
    const linkId = proposal.entity_id

    const { error: linkDeleteError } = await supabase
      .from('links')
      .update({
        deleted:    true,
        deleted_by: user.id,
        deleted_at: now,
      })
      .eq('id', linkId)

    if (linkDeleteError) {
      return NextResponse.json(
        { error: `Failed to delete link: ${linkDeleteError.message}` },
        { status: 500 },
      )
    }
  } else if (proposal.proposal_type === 'synagogue_relationship_new') {
    const synagogueId        = proposed.synagogue_id         as string | undefined
    const relatedSynagogueId = proposed.related_synagogue_id as string | undefined
    const relationshipType   = proposed.relationship_type    as string | undefined
    const reverseType        = proposed.reverse_relationship_type as string | undefined

    if (!synagogueId || !relatedSynagogueId || !relationshipType || !reverseType) {
      return NextResponse.json(
        { error: 'Missing required relationship data' },
        { status: 400 },
      )
    }

    const sharedFields = {
      relationship_year: (proposed.relationship_year as number | undefined) ?? null,
      notes:             (proposed.notes             as string | undefined) ?? null,
      approved:          true,
      approved_by:       user.id,
      approved_at:       now,
      created_by:        proposal.created_by,
    }

    // Insert primary relationship — use service role to bypass RLS
    const { error: insertError } = await supabaseAdmin
      .from('synagogue_relationships')
      .insert({
        synagogue_id:         synagogueId,
        related_synagogue_id: relatedSynagogueId,
        relationship_type:    relationshipType,
        ...sharedFields,
      })

    if (insertError) {
      return NextResponse.json(
        { error: `Failed to create relationship: ${insertError.message}` },
        { status: 500 },
      )
    }

    // Insert reverse relationship; if it fails, roll back the primary
    const { error: reverseError } = await supabaseAdmin
      .from('synagogue_relationships')
      .insert({
        synagogue_id:         relatedSynagogueId,
        related_synagogue_id: synagogueId,
        relationship_type:    reverseType,
        ...sharedFields,
      })

    if (reverseError) {
      // Roll back the primary to keep the table consistent
      await supabaseAdmin
        .from('synagogue_relationships')
        .delete()
        .eq('synagogue_id',         synagogueId)
        .eq('related_synagogue_id', relatedSynagogueId)
        .eq('relationship_type',    relationshipType)

      return NextResponse.json(
        { error: `Failed to create reverse relationship: ${reverseError.message}` },
        { status: 500 },
      )
    }
  } else if (proposal.proposal_type === 'synagogue_relationship_delete' && proposal.entity_id) {
    const relationshipId     = proposal.entity_id
    // Fallback: some older proposals stored synagogue_id only in the top-level column
    const synagogueId        = (proposed.synagogue_id         as string | undefined) || proposal.synagogue_id
    const relatedSynagogueId = proposed.related_synagogue_id as string | undefined
    const relationshipType   = proposed.relationship_type    as string | undefined
    const reverseType        = proposed.reverse_relationship_type as string | undefined

    if (!synagogueId || !relatedSynagogueId || !relationshipType || !reverseType) {
      return NextResponse.json(
        { error: 'Missing required relationship data' },
        { status: 400 },
      )
    }

    // Soft-delete the primary relationship — use service role to bypass RLS
    const { error: deleteError } = await supabaseAdmin
      .from('synagogue_relationships')
      .update({ deleted: true, deleted_by: user.id, deleted_at: now })
      .eq('id', relationshipId)

    if (deleteError) {
      return NextResponse.json(
        { error: `Failed to delete relationship: ${deleteError.message}` },
        { status: 500 },
      )
    }

    // Locate and soft-delete the reverse relationship (best-effort)
    const { data: reverseRows, error: findReverseError } = await supabaseAdmin
      .from('synagogue_relationships')
      .select('id')
      .eq('synagogue_id',         relatedSynagogueId)
      .eq('related_synagogue_id', synagogueId)
      .eq('relationship_type',    reverseType)
      .eq('deleted', false)

    if (findReverseError) {
      console.error('Error finding reverse relationship:', findReverseError)
    } else if (reverseRows && reverseRows.length > 0) {
      for (const row of reverseRows) {
        const { error: deleteReverseError } = await supabaseAdmin
          .from('synagogue_relationships')
          .update({ deleted: true, deleted_by: user.id, deleted_at: now })
          .eq('id', row.id)

        if (deleteReverseError) {
          console.error('Error deleting reverse relationship:', deleteReverseError)
        }
      }
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
