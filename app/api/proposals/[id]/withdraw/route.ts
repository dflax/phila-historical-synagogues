import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const proposalId = params.id

  const supabase = createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  // Use admin client to bypass RLS and do the targeted update
  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  )

  // Fetch the proposal to verify ownership and pending status
  const { data: proposal, error: fetchError } = await admin
    .from('edit_proposals')
    .select('id, created_by, status')
    .eq('id', proposalId)
    .single()

  if (fetchError || !proposal) {
    return NextResponse.json({ error: 'Proposal not found' }, { status: 404 })
  }

  if (proposal.created_by !== user.id) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
  }

  if (proposal.status !== 'pending') {
    return NextResponse.json(
      { error: `Cannot withdraw a proposal with status '${proposal.status}'` },
      { status: 409 },
    )
  }

  const { error: updateError } = await admin
    .from('edit_proposals')
    .update({ status: 'withdrawn' })
    .eq('id', proposalId)

  if (updateError) {
    console.error('[withdraw] Update failed:', updateError)
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
