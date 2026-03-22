import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const EDITOR_ROLES = ['editor', 'admin', 'super_admin']

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies })

  // ── 1. Auth ──────────────────────────────────────────────────────────────
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // ── 2. Role check (editors+) ─────────────────────────────────────────────
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle()

  if (!profile || !EDITOR_ROLES.includes(profile.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // ── 3. Parse body ────────────────────────────────────────────────────────
  const body = await req.json().catch(() => null)
  const items: { id: string; display_order: number }[] = body?.items
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: 'items array required' }, { status: 400 })
  }

  // ── 4. Persist display_order for each item (admin client bypasses RLS) ───
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  )

  const updates = items.map(({ id, display_order }) =>
    supabaseAdmin
      .from('history_entries')
      .update({ display_order })
      .eq('id', id)
  )

  const results = await Promise.all(updates)
  const failed = results.filter(r => r.error)
  if (failed.length > 0) {
    return NextResponse.json(
      { error: `Failed to update ${failed.length} item(s)` },
      { status: 500 },
    )
  }

  return NextResponse.json({ success: true })
}
