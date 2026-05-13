import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendProposalConfirmation } from '@/lib/email'

// Admin client with service role — needed to look up user email
function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  )
}

export async function POST(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const proposalId = params.id

  // Skip silently if Resend is not configured (development without email)
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ ok: true, skipped: true })
  }

  const admin = getAdminClient()

  // Fetch proposal + synagogue name
  const { data: proposal, error: proposalError } = await admin
    .from('edit_proposals')
    .select('id, proposal_type, proposed_data, submitter_note, created_by, created_at, synagogue_id, synagogues(name)')
    .eq('id', proposalId)
    .single()

  if (proposalError || !proposal) {
    return NextResponse.json({ ok: false, error: 'Proposal not found' }, { status: 404 })
  }

  if (!proposal.created_by) {
    return NextResponse.json({ ok: true, skipped: true })
  }

  // Get user email from Supabase Auth
  const { data: userData, error: userError } = await admin.auth.admin.getUserById(proposal.created_by)
  const email = userData?.user?.email

  if (userError || !email) {
    // No email on file — skip silently
    return NextResponse.json({ ok: true, skipped: true })
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://historicalsynagogues.org'
  const synagogueName = (proposal.synagogues as any)?.name ?? null

  try {
    await sendProposalConfirmation({
      to: email,
      proposalId: proposal.id,
      proposalType: proposal.proposal_type,
      proposedData: (proposal.proposed_data as Record<string, unknown>) ?? {},
      submitterNote: proposal.submitter_note ?? null,
      synagogueName,
      submittedAt: proposal.created_at,
      baseUrl,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    // Log but don't surface to client — email failure is non-critical
    console.error('[notify] Failed to send confirmation email:', err)
    return NextResponse.json({ ok: false, error: 'Email send failed' }, { status: 500 })
  }
}
