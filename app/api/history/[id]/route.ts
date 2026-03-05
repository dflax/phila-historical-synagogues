import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const ADMIN_ROLES  = ['admin', 'super_admin']
const EDITOR_ROLES = ['editor', 'admin', 'super_admin']

export async function DELETE(
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

  if (!profile || !EDITOR_ROLES.includes(profile.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const isAdmin = ADMIN_ROLES.includes(profile.role)

  // ── 3. For editors, verify they approved this record ─────────────────────
  if (!isAdmin) {
    const { data: record } = await supabase
      .from('history_entries')
      .select('approved_by')
      .eq('id', params.id)
      .maybeSingle()

    if (!record) {
      return NextResponse.json({ error: 'History entry not found' }, { status: 404 })
    }
    if (record.approved_by !== user.id) {
      return NextResponse.json({ error: 'Forbidden: you did not approve this record' }, { status: 403 })
    }
  }

  // ── 4. Soft delete (preserves audit trail) ───────────────────────────────
  const { error } = await supabase
    .from('history_entries')
    .update({
      deleted:    true,
      deleted_by: user.id,
      deleted_at: new Date().toISOString(),
    })
    .eq('id', params.id)

  if (error) {
    return NextResponse.json({ error: `Failed to mark history entry as deleted: ${error.message}` }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
