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

  if (proposal.proposal_type === 'synagogue_edit' && proposal.synagogue_id) {
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

    // 2. Delete linked rabbi affiliation records (rabbis.rabbi_profile_id FK)
    await supabase
      .from('rabbis')
      .delete()
      .eq('rabbi_profile_id', proposal.entity_id)
    // Non-fatal: if the column doesn't exist the delete is a no-op

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
