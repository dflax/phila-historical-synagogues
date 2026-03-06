import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// Ordered lowest → highest
const ROLE_ORDER = ['contributor', 'editor', 'admin', 'super_admin']

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  const supabase = createRouteHandlerClient({ cookies })

  // ── 1. Auth ───────────────────────────────────────────────────────────────
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // ── 2. Caller's role ──────────────────────────────────────────────────────
  const { data: callerProfile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle()

  const callerRole = callerProfile?.role ?? ''
  const isAdmin      = callerRole === 'admin' || callerRole === 'super_admin'
  const isSuperAdmin = callerRole === 'super_admin'

  if (!isAdmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // ── 3. Parse body ─────────────────────────────────────────────────────────
  const body = await req.json().catch(() => ({}))
  const { targetRole } = body as { targetRole?: string }

  if (!targetRole || !ROLE_ORDER.includes(targetRole)) {
    return NextResponse.json({ error: 'Invalid targetRole' }, { status: 400 })
  }

  // ── 4. Fetch target user's current role ───────────────────────────────────
  const { data: targetProfile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', params.id)
    .maybeSingle()

  if (!targetProfile) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const currentRole    = targetProfile.role
  const currentIdx     = ROLE_ORDER.indexOf(currentRole)
  const targetIdx      = ROLE_ORDER.indexOf(targetRole)

  // Must be a promotion (one step up only, to keep audit trail clean)
  if (targetIdx !== currentIdx + 1) {
    return NextResponse.json({ error: 'Invalid promotion path' }, { status: 400 })
  }

  // contributor → editor: admin+ can do
  // editor → admin:       super_admin only
  // admin → super_admin:  super_admin only
  if (targetRole !== 'editor' && !isSuperAdmin) {
    return NextResponse.json({ error: 'Forbidden: only super admins can promote beyond editor' }, { status: 403 })
  }

  // ── 5. Apply update via service role (bypasses RLS) ───────────────────────
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceKey) {
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
  }

  const serviceClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceKey,
    { auth: { autoRefreshToken: false, persistSession: false } },
  )

  const { error: updateError } = await serviceClient
    .from('user_profiles')
    .update({ role: targetRole, updated_at: new Date().toISOString() })
    .eq('id', params.id)

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, role: targetRole })
}
