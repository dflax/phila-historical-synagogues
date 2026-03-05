import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

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

  if (proposal.proposal_type === 'update' && proposal.synagogue_id) {
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

  } else if (proposal.proposal_type === 'create') {
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

  } else if (proposal.proposal_type === 'delete' && proposal.synagogue_id) {
    // Soft-close rather than hard delete to preserve historical data.
    // A hard delete can be done manually if truly needed.
    const { error } = await supabase
      .from('synagogues')
      .update({ status: 'closed' })
      .eq('id', proposal.synagogue_id)
    if (error) {
      return NextResponse.json(
        { error: `Failed to update synagogue: ${error.message}` },
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
