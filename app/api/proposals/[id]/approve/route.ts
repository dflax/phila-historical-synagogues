import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { geocodeAddress } from '@/lib/geocoding'

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

  // ═══════════════════════════════════════════════════════════════════════════
  // CUTOVER COMPLETE - Writing to new tables only (person_profiles, affiliations)
  // Old dual-write code is commented out below each handler for rollback
  // ═══════════════════════════════════════════════════════════════════════════

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
    // Geocode the address to get lat/lng + neighborhood in one API call.
    // All fields are non-fatal — the address is still created if geocoding fails.
    let neighborhood = typeof proposed.neighborhood === 'string' && proposed.neighborhood.trim()
      ? proposed.neighborhood.trim()
      : null
    let latitude:  number | null = null
    let longitude: number | null = null

    if (proposed.street_address) {
      const geo = await geocodeAddress(
        String(proposed.street_address),
        String(proposed.city  ?? 'Philadelphia'),
        String(proposed.state ?? 'PA'),
      )
      if (geo) {
        latitude  = geo.lat
        longitude = geo.lng
        if (!neighborhood) neighborhood = geo.neighborhood
      }
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
        latitude,
        longitude,
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
    // ── CUTOVER: Writing to new tables only ────────────────────────────────
    // 1. Soft-delete in new (person_profiles) table only
    const { error: personResult } = await supabaseAdmin
      .from('person_profiles')
      .update({ deleted: true, deleted_by: user.id, deleted_at: now })
      .eq('id', proposal.entity_id)

    if (personResult) {
      return NextResponse.json(
        { error: `Failed to delete person profile: ${personResult.message}` },
        { status: 500 },
      )
    }

    // ── OLD CODE (dual-write) - Keep for rollback ──────────────────────────
    // const [profileResult, personResult] = await Promise.all([
    //   supabase
    //     .from('rabbi_profiles')
    //     .update({ deleted: true })
    //     .eq('id', proposal.entity_id),
    //   supabaseAdmin
    //     .from('person_profiles')
    //     .update({ deleted: true, deleted_by: user.id, deleted_at: now })
    //     .eq('id', proposal.entity_id),
    // ])
    // if (profileResult.error) {
    //   return NextResponse.json(
    //     { error: `Failed to delete rabbi profile: ${profileResult.error.message}` },
    //     { status: 500 },
    //   )
    // }
    // // person_profiles failure is non-fatal during transition

    // ── CUTOVER: Delete linked affiliations from new table only ───────────
    // 2. Delete linked affiliation records
    await supabaseAdmin.from('affiliations').delete().eq('person_profile_id', proposal.entity_id)
    // Non-fatal: if no affiliations exist this is a no-op

    // ── OLD CODE (dual-write) - Keep for rollback ──────────────────────────
    // await Promise.all([
    //   supabase.from('rabbis').delete().eq('profile_id', proposal.entity_id),
    //   supabaseAdmin.from('affiliations').delete().eq('person_profile_id', proposal.entity_id),
    // ])

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

    const proposedPersonType = proposed.person_type as 'rabbi' | 'chazzan' | undefined

    // Build base slug from name, adding chazzan- prefix for cantors
    const baseName = candidateName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .substring(0, 100)

    const baseSlug = proposedPersonType === 'chazzan' ? `chazzan-${baseName}` : baseName

    // ── CUTOVER: Check uniqueness against new table only ──────────────────
    // Ensure uniqueness by appending a counter if needed
    let finalSlug = baseSlug
    let counter   = 1
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { data: existing } = await supabaseAdmin
        .from('person_profiles')
        .select('id')
        .eq('slug', finalSlug)
        .maybeSingle()
      if (!existing) break
      finalSlug = `${baseSlug}-${counter}`
      counter++
    }

    // ── OLD CODE (slug check) - Keep for rollback ──────────────────────────
    // while (true) {
    //   const { data: existing } = await supabase
    //     .from('rabbi_profiles')
    //     .select('id')
    //     .eq('slug', finalSlug)
    //     .maybeSingle()
    //   if (!existing) break
    //   finalSlug = `${baseSlug}-${counter}`
    //   counter++
    // }

    // Use person_type from proposal data; fall back to slug-prefix inference
    const personType = proposedPersonType ?? (finalSlug.startsWith('chazzan-') ? 'chazzan' : 'rabbi')

    // Pre-generate the ID so we can use it for the affiliation insert below
    const newPersonProfileId = crypto.randomUUID()

    // ── CUTOVER: Writing to new table only ─────────────────────────────────
    const { error: newInsertError } = await supabaseAdmin.from('person_profiles').insert({
      id:             newPersonProfileId,
      canonical_name: candidateName,
      person_type:    personType,
      slug:           finalSlug,
      birth_year:     proposed.birth_year  ?? null,
      circa_birth:    (proposed.circa_birth ?? false) as boolean,
      death_year:     proposed.death_year  ?? null,
      circa_death:    (proposed.circa_death ?? false) as boolean,
      biography:      proposed.biography   ?? null,
      approved:       true,
    })
    if (newInsertError) {
      return NextResponse.json(
        { error: `Failed to create person profile: ${newInsertError.message}` },
        { status: 500 },
      )
    }

    // ── If submitted from a synagogue detail page, also create the affiliation ─
    if (proposal.synagogue_id) {
      const affTitle = (proposed.affiliation_title as string | null | undefined) ?? null
      await supabaseAdmin.from('affiliations').insert({
        person_profile_id:    newPersonProfileId,
        synagogue_id:         proposal.synagogue_id,
        affiliation_category: 'clergy',
        role_title:           affTitle || (personType === 'chazzan' ? 'Cantor' : 'Rabbi'),
        start_year:           (proposed.affiliation_start_year as number | null | undefined) ?? null,
        end_year:             (proposed.affiliation_end_year   as number | null | undefined) ?? null,
        notes:                (proposed.affiliation_notes      as string | null | undefined) ?? null,
        approved:             true,
      })
      // Non-fatal: affiliation failure does not roll back the profile creation
    }

    // ── OLD CODE (dual-write) - Keep for rollback ──────────────────────────
    // const [oldInsert, newInsert] = await Promise.all([
    //   // OLD TABLE: rabbi_profiles
    //   supabase.from('rabbi_profiles').insert({
    //     canonical_name: candidateName,
    //     slug:           finalSlug,
    //     birth_year:     proposed.birth_year  ?? null,
    //     circa_birth:    proposed.circa_birth ?? false,
    //     death_year:     proposed.death_year  ?? null,
    //     circa_death:    proposed.circa_death ?? false,
    //     biography:      proposed.biography   ?? null,
    //     approved:       true,
    //     approved_by:    user.id,
    //     approved_at:    now,
    //     created_by:     proposal.created_by,
    //   }),
    //   // NEW TABLE: person_profiles
    //   supabaseAdmin.from('person_profiles').insert({
    //     canonical_name: candidateName,
    //     person_type:    personType,
    //     slug:           finalSlug,
    //     birth_year:     proposed.birth_year  ?? null,
    //     circa_birth:    (proposed.circa_birth ?? false) as boolean,
    //     death_year:     proposed.death_year  ?? null,
    //     circa_death:    (proposed.circa_death ?? false) as boolean,
    //     biography:      proposed.biography   ?? null,
    //     approved:       true,
    //   }),
    // ])
    // if (oldInsert.error) {
    //   return NextResponse.json(
    //     { error: `Failed to create rabbi profile: ${oldInsert.error.message}` },
    //     { status: 500 },
    //   )
    // }
    // // person_profiles failure is non-fatal during transition

  } else if (proposal.proposal_type === 'rabbi_profile_edit' && proposal.entity_id) {
    const toLanguagesStr = (v: unknown): string | null =>
      Array.isArray(v) ? v.join(', ') : (typeof v === 'string' ? v : null)

    // ── CUTOVER: Writing to new table only ─────────────────────────────────
    const { error: newUpdateError } = await supabaseAdmin.from('person_profiles').update({
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
    }).eq('id', proposal.entity_id)

    if (newUpdateError) {
      return NextResponse.json(
        { error: `Failed to update person profile: ${newUpdateError.message}` },
        { status: 500 },
      )
    }

    // ── OLD CODE (dual-write) - Keep for rollback ──────────────────────────
    // const [oldUpdate, newUpdate] = await Promise.all([
    //   // OLD TABLE: rabbi_profiles (languages stays as string[] | null)
    //   supabase.from('rabbi_profiles').update({
    //     canonical_name:  proposed.canonical_name  ?? undefined,
    //     birth_year:      proposed.birth_year      !== undefined ? (proposed.birth_year      ?? null)  : undefined,
    //     circa_birth:     proposed.circa_birth     !== undefined ? (proposed.circa_birth     ?? false) : undefined,
    //     death_year:      proposed.death_year      !== undefined ? (proposed.death_year      ?? null)  : undefined,
    //     circa_death:     proposed.circa_death     !== undefined ? (proposed.circa_death     ?? false) : undefined,
    //     biography:       proposed.biography       !== undefined ? (proposed.biography       ?? null)  : undefined,
    //     birthplace:      proposed.birthplace      !== undefined ? (proposed.birthplace      ?? null)  : undefined,
    //     death_place:     proposed.death_place     !== undefined ? (proposed.death_place     ?? null)  : undefined,
    //     seminary:        proposed.seminary        !== undefined ? (proposed.seminary        ?? null)  : undefined,
    //     ordination_year: proposed.ordination_year !== undefined ? (proposed.ordination_year ?? null)  : undefined,
    //     denomination:    proposed.denomination    !== undefined ? (proposed.denomination    ?? null)  : undefined,
    //     languages:       proposed.languages       !== undefined ? (proposed.languages       ?? null)  : undefined,
    //     publications:    proposed.publications    !== undefined ? (proposed.publications    ?? null)  : undefined,
    //     achievements:    proposed.achievements    !== undefined ? (proposed.achievements    ?? null)  : undefined,
    //     updated_at:      now,
    //   }).eq('id', proposal.entity_id),
    //   // NEW TABLE: person_profiles (languages as string | null)
    //   supabaseAdmin.from('person_profiles').update({ ... }).eq('id', proposal.entity_id),
    // ])
    // if (oldUpdate.error) { ... }
    // // person_profiles failure is non-fatal during transition

  } else if (proposal.proposal_type === 'rabbi_profile_merge' && proposal.entity_id) {
    const mergeSourceId = proposal.entity_id
    const mergeTargetId = proposed.merge_target_id as string | undefined

    if (!mergeTargetId) {
      return NextResponse.json({ error: 'Missing merge target' }, { status: 400 })
    }

    const merged = (proposed.merged_fields ?? {}) as Record<string, unknown>

    const toLanguagesStr = (v: unknown): string | null =>
      Array.isArray(v) ? v.join(', ') : (typeof v === 'string' ? v : null)

    // ── CUTOVER: Writing to new table only ─────────────────────────────────
    // 1. Update source profile in new table only
    const { error: mergeNewUpdateError } = await supabaseAdmin.from('person_profiles').update({
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
    }).eq('id', mergeSourceId)

    if (mergeNewUpdateError) {
      return NextResponse.json(
        { error: `Failed to update person profile: ${mergeNewUpdateError.message}` },
        { status: 500 },
      )
    }

    // ── OLD CODE (dual-write) - Keep for rollback ──────────────────────────
    // const [mergeOldUpdate, mergeNewUpdate] = await Promise.all([
    //   // OLD TABLE: rabbi_profiles
    //   supabase.from('rabbi_profiles').update({ ... }).eq('id', mergeSourceId),
    //   // NEW TABLE: person_profiles
    //   supabaseAdmin.from('person_profiles').update({ ... }).eq('id', mergeSourceId),
    // ])
    // if (mergeOldUpdate.error) { ... }
    // // person_profiles failure is non-fatal during transition

    // ── CUTOVER: Move affiliations in new table only ───────────────────────
    // 2. Move synagogue affiliations from target to source
    await supabaseAdmin.from('affiliations').update({ person_profile_id: mergeSourceId }).eq('person_profile_id', mergeTargetId)

    // ── OLD CODE (dual-write) - Keep for rollback ──────────────────────────
    // await Promise.all([
    //   supabase.from('rabbis').update({ profile_id: mergeSourceId }).eq('profile_id', mergeTargetId),
    //   supabaseAdmin.from('affiliations').update({ person_profile_id: mergeSourceId }).eq('person_profile_id', mergeTargetId),
    // ])

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

    // ── CUTOVER: Soft-delete target in new table only ─────────────────────
    // 5. Soft-delete the target
    await supabaseAdmin.from('person_profiles').update({ deleted: true, deleted_by: user.id, deleted_at: now }).eq('id', mergeTargetId)

    // ── OLD CODE (dual-write) - Keep for rollback ──────────────────────────
    // await Promise.all([
    //   supabase.from('rabbi_profiles').update({ deleted: true, deleted_by: user.id, deleted_at: now }).eq('id', mergeTargetId),
    //   supabaseAdmin.from('person_profiles').update({ deleted: true, deleted_by: user.id, deleted_at: now }).eq('id', mergeTargetId),
    // ])

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

    // ── CUTOVER: Writing to new table only ─────────────────────────────────
    // 1. Update the original profile in new table only
    await supabaseAdmin.from('person_profiles').update({
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
    }).eq('id', origId)

    // ── OLD CODE (dual-write) - Keep for rollback ──────────────────────────
    // await Promise.all([
    //   // OLD TABLE: rabbi_profiles
    //   supabase.from('rabbi_profiles').update({ ... }).eq('id', origId),
    //   // NEW TABLE: person_profiles
    //   supabaseAdmin.from('person_profiles').update({ ... }).eq('id', origId),
    // ])

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

    // ── CUTOVER: Check uniqueness against new table only ──────────────────
    let finalSlug = baseSlug
    let counter   = 1
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { data: existing } = await supabaseAdmin
        .from('person_profiles')
        .select('id')
        .eq('slug', finalSlug)
        .maybeSingle()
      if (!existing) break
      finalSlug = `${baseSlug}-${counter}`
      counter++
    }

    // ── OLD CODE (slug check) - Keep for rollback ──────────────────────────
    // while (true) {
    //   const { data: existing } = await supabase
    //     .from('rabbi_profiles')
    //     .select('id')
    //     .eq('slug', finalSlug)
    //     .maybeSingle()
    //   if (!existing) break
    //   finalSlug = `${baseSlug}-${counter}`
    //   counter++
    // }

    // ── CUTOVER: Insert new profile into new table only ────────────────────
    // 3. Insert the new profile
    const splitPersonType = finalSlug.startsWith('chazzan-') ? 'chazzan' : 'rabbi'
    const newRabbiId = crypto.randomUUID()

    const { error: newRabbiError } = await supabaseAdmin.from('person_profiles').insert({
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

    if (newRabbiError) {
      return NextResponse.json(
        { error: `Failed to create new person profile: ${newRabbiError.message}` },
        { status: 500 },
      )
    }

    // ── OLD CODE (dual-write) - Keep for rollback ──────────────────────────
    // const { data: newRabbi, error: newRabbiError } = await supabase
    //   .from('rabbi_profiles')
    //   .insert({ canonical_name: candidateName, slug: finalSlug, ... approved_by: user.id, ... })
    //   .select('id')
    //   .single()
    // if (newRabbiError || !newRabbi) { return NextResponse.json({ error: ... }, { status: 500 }) }
    // const newRabbiId = newRabbi.id
    // // Mirror: insert into person_profiles with same ID (non-fatal)
    // await supabaseAdmin.from('person_profiles').insert({ id: newRabbiId, ... })

    // ── CUTOVER: Process affiliation assignments in new table only ─────────
    // 4. Process affiliation assignments
    for (const [affId, action] of Object.entries(assignments.rabbis ?? {})) {
      if (action === 'new') {
        await supabaseAdmin.from('affiliations').update({ person_profile_id: newRabbiId }).eq('id', affId)
      } else if (action === 'both') {
        // Copy affiliation row to new profile
        const { data: affRow } = await supabaseAdmin.from('affiliations').select('*').eq('id', affId).single()
        if (affRow) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { id: _affId, ...affRest } = affRow as Record<string, unknown>
          await supabaseAdmin.from('affiliations').insert({ ...affRest, person_profile_id: newRabbiId })
        }
      } else if (action === 'neither') {
        await supabaseAdmin.from('affiliations').delete().eq('id', affId)
      }
      // 'original': no-op
    }

    // ── OLD CODE (dual-write) - Keep for rollback ──────────────────────────
    // for (const [affId, action] of Object.entries(assignments.rabbis ?? {})) {
    //   if (action === 'new') {
    //     await supabase.from('rabbis').update({ profile_id: newRabbiId }).eq('id', affId)
    //     await supabaseAdmin.from('affiliations').update({ person_profile_id: newRabbiId }).eq('id', affId)
    //   } else if (action === 'both') {
    //     const { data: row } = await supabase.from('rabbis').select('*').eq('id', affId).single()
    //     if (row) {
    //       const { id: _id, ...rest } = row as Record<string, unknown>
    //       await supabase.from('rabbis').insert({ ...rest, profile_id: newRabbiId })
    //     }
    //     const { data: affRow } = await supabaseAdmin.from('affiliations').select('*').eq('id', affId).single()
    //     if (affRow) {
    //       const { id: _affId, ...affRest } = affRow as Record<string, unknown>
    //       await supabaseAdmin.from('affiliations').insert({ ...affRest, person_profile_id: newRabbiId })
    //     }
    //   } else if (action === 'neither') {
    //     await supabase.from('rabbis').delete().eq('id', affId)
    //     await supabaseAdmin.from('affiliations').delete().eq('id', affId)
    //   }
    // }

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

    // ── CUTOVER: Fetch name from new table only ────────────────────────────
    const { data: rabbiProfile } = await supabaseAdmin
      .from('person_profiles')
      .select('canonical_name')
      .eq('id', rabbiProfileId)
      .maybeSingle()

    // ── OLD CODE (name fetch) - Keep for rollback ──────────────────────────
    // const { data: rabbiProfile } = await supabase
    //   .from('rabbi_profiles')
    //   .select('canonical_name')
    //   .eq('id', rabbiProfileId)
    //   .single()

    const rabbiName = rabbiProfile?.canonical_name ?? (proposal.current_data?.rabbi_name as string | undefined) ?? 'Unknown'
    const roleTitle = (proposed.title as string | null | undefined) ?? null

    // ── CUTOVER: Writing to new table only ─────────────────────────────────
    const affiliationId = crypto.randomUUID()

    const { error: newAffError } = await supabaseAdmin.from('affiliations').insert({
      id:                   affiliationId,
      person_profile_id:    rabbiProfileId,
      synagogue_id:         affSynagogueId,
      affiliation_category: 'clergy',
      role_title:           roleTitle || 'Rabbi',
      start_year:           (proposed.start_year as number | null | undefined) ?? null,
      end_year:             (proposed.end_year   as number | null | undefined) ?? null,
      notes:                (proposed.notes      as string | null | undefined) ?? null,
      approved:             true,
    })

    if (newAffError) {
      return NextResponse.json(
        { error: `Failed to create affiliation: ${newAffError.message}` },
        { status: 500 },
      )
    }

    // ── OLD CODE (dual-write) - Keep for rollback ──────────────────────────
    // const sharedAffiliationId = crypto.randomUUID()
    // const [oldAffResult, newAffResult] = await Promise.all([
    //   supabase.from('rabbis').insert({
    //     id: sharedAffiliationId, profile_id: rabbiProfileId, synagogue_id: affSynagogueId,
    //     name: rabbiName, title: roleTitle, start_year: ..., end_year: ..., notes: ...,
    //     approved: true, created_by: proposal.created_by,
    //   }),
    //   supabaseAdmin.from('affiliations').insert({
    //     id: sharedAffiliationId, person_profile_id: rabbiProfileId, ...
    //   }),
    // ])
    // if (oldAffResult.error) { return NextResponse.json({ error: ... }, { status: 500 }) }
    // // affiliations failure is non-fatal during transition
  } else if (
    proposal.proposal_type === 'lay_leader_affiliation_new' ||
    proposal.proposal_type === 'staff_affiliation_new'
  ) {
    const personName  = proposed.person_name  as string
    const roleTitle   = proposed.role_title   as string
    const personType  = proposed.person_type  as string   // 'lay_leader' | 'staff'
    const category    = proposed.affiliation_category as string

    if (!personName || !roleTitle || !proposal.synagogue_id) {
      return NextResponse.json(
        { error: 'Missing required fields for lay leader / staff proposal' },
        { status: 400 },
      )
    }

    const personProfileId = crypto.randomUUID()
    const affiliationId   = crypto.randomUUID()

    // Create person profile in person_profiles only (no slug for non-clergy)
    const { error: profileError } = await supabaseAdmin
      .from('person_profiles')
      .insert({
        id:             personProfileId,
        canonical_name: personName,
        person_type:    personType,
        slug:           null,
        approved:       true,
        deleted:        false,
      })

    if (profileError) {
      return NextResponse.json(
        { error: `Failed to create person profile: ${profileError.message}` },
        { status: 500 },
      )
    }

    // Create affiliation in affiliations only
    const { error: affError } = await supabaseAdmin
      .from('affiliations')
      .insert({
        id:                   affiliationId,
        person_profile_id:    personProfileId,
        synagogue_id:         proposal.synagogue_id,
        affiliation_category: category,
        role_title:           roleTitle,
        start_year:           (proposed.start_year as number | null | undefined) ?? null,
        end_year:             (proposed.end_year   as number | null | undefined) ?? null,
        notes:                (proposed.notes      as string | null | undefined) ?? null,
        approved:             true,
      })

    if (affError) {
      return NextResponse.json(
        { error: `Failed to create affiliation: ${affError.message}` },
        { status: 500 },
      )
    }

    // ── CUTOVER: No longer mirroring to old tables ─────────────────────────
    // ── OLD CODE (mirror write) - Keep for rollback ────────────────────────
    // await supabase.from('rabbis').insert({
    //   id:           affiliationId,
    //   synagogue_id: proposal.synagogue_id,
    //   name:         personName,
    //   title:        roleTitle,
    //   start_year:   (proposed.start_year as number | null | undefined) ?? null,
    //   end_year:     (proposed.end_year   as number | null | undefined) ?? null,
    //   notes:        (proposed.notes      as string | null | undefined) ?? null,
    //   approved:     true,
    //   created_by:   proposal.created_by,
    // })

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
  } else if (proposal.proposal_type === 'affiliation_edit' && proposal.entity_id) {
    const affiliationId    = proposal.entity_id
    const convertToCantor  = proposed.convert_to_cantor  as boolean | undefined
    const personProfileId  = proposed.person_profile_id  as string | undefined
    // new_person_type is the preferred field; convert_to_cantor is kept for backward compat
    const newPersonType    = proposed.new_person_type as 'rabbi' | 'chazzan' | undefined

    // ── CUTOVER: Writing to new table only ─────────────────────────────────
    const { error: newAffUpdateError } = await supabaseAdmin
      .from('affiliations')
      .update({
        role_title: proposed.role_title as string,
        start_year: proposed.start_year as number | null,
        end_year:   proposed.end_year   as number | null,
        notes:      proposed.notes      as string | null,
      })
      .eq('id', affiliationId)

    if (newAffUpdateError) {
      return NextResponse.json(
        { error: `Failed to update affiliation: ${newAffUpdateError.message}` },
        { status: 500 },
      )
    }

    // ── OLD CODE (dual-write) - Keep for rollback ──────────────────────────
    // // Update old rabbis table (title column)
    // const { error: oldAffError } = await supabase
    //   .from('rabbis')
    //   .update({ title: proposed.role_title, start_year: ..., end_year: ..., notes: ... })
    //   .eq('id', affiliationId)
    // if (oldAffError) { return NextResponse.json({ error: ... }, { status: 500 }) }
    // // Update new affiliations table — non-fatal during transition
    // await supabaseAdmin.from('affiliations').update({ role_title: ..., ... }).eq('id', affiliationId)

    // If changing person type (rabbi↔chazzan), update the profile and regenerate slug
    // Supports new_person_type field; also handles legacy convert_to_cantor boolean
    const effectiveNewType = newPersonType ?? (convertToCantor ? 'chazzan' : undefined)

    if (effectiveNewType && personProfileId) {
      // ── CUTOVER: Look up name from new table only ───────────────────────
      const { data: currentProfile } = await supabaseAdmin
        .from('person_profiles')
        .select('canonical_name, slug')
        .eq('id', personProfileId)
        .maybeSingle()

      const baseName = (currentProfile?.canonical_name ?? '')
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()

      // Slugs: chazzan → "chazzan-<name>", rabbi → "<name>" (no prefix)
      const baseSlug = effectiveNewType === 'chazzan' ? `chazzan-${baseName}` : baseName
      let newSlug = baseSlug
      let counter = 1

      // ── CUTOVER: Check uniqueness against new table only ────────────────
      while (true) {
        const { data: existing } = await supabaseAdmin
          .from('person_profiles')
          .select('id')
          .eq('slug', newSlug)
          .neq('id', personProfileId)
          .maybeSingle()
        if (!existing) break
        newSlug = `${baseSlug}-${counter}`
        counter++
      }

      // ── CUTOVER: Update new table only ─────────────────────────────────
      await supabaseAdmin
        .from('person_profiles')
        .update({ person_type: effectiveNewType, slug: newSlug })
        .eq('id', personProfileId)
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
