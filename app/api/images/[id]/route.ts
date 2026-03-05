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

  // ── 3. Fetch the image record (need storage_path for cleanup) ─────────────
  const { data: record } = await supabase
    .from('images')
    .select('approved_by, storage_path')
    .eq('id', params.id)
    .maybeSingle()

  if (!record) {
    return NextResponse.json({ error: 'Image not found' }, { status: 404 })
  }

  // For editors, verify they approved this record
  if (!isAdmin && record.approved_by !== user.id) {
    return NextResponse.json({ error: 'Forbidden: you did not approve this record' }, { status: 403 })
  }

  // ── 4. Soft delete DB record (preserves audit trail) ─────────────────────
  const { error } = await supabase
    .from('images')
    .update({
      deleted:    true,
      deleted_by: user.id,
      deleted_at: new Date().toISOString(),
    })
    .eq('id', params.id)

  if (error) {
    return NextResponse.json({ error: `Failed to mark image as deleted: ${error.message}` }, { status: 500 })
  }

  // ── 5. Delete file from storage (best-effort; soft-delete already succeeded) ──
  // File deleted from storage but database record kept for audit trail
  if (record.storage_path) {
    await supabase.storage
      .from('synagogue-images')
      .remove([record.storage_path])
      .catch(() => {})
  }

  return NextResponse.json({ success: true })
}
