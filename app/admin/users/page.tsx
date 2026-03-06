import { redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { createServerSupabase } from '@/lib/supabase/server'
import UsersClient from '../UsersClient'
import type { UserWithStats } from '../UsersClient'

export const dynamic   = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Manage Users – Philadelphia Historical Synagogues',
}

const ADMIN_ROLES = ['admin', 'super_admin']

export default async function UsersPage() {
  const supabase = createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/')

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle()

  if (!profile || !ADMIN_ROLES.includes(profile.role)) redirect('/admin')

  // ── Auth users (email + last login) via service role ──────────────────────
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const authUserMap = new Map<string, { email: string; last_sign_in_at: string | null }>()

  if (serviceKey) {
    const serviceClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      serviceKey,
      { auth: { autoRefreshToken: false, persistSession: false } },
    )
    const { data: authData } = await serviceClient.auth.admin.listUsers({ perPage: 1000 })
    for (const u of (authData?.users ?? [])) {
      authUserMap.set(u.id, {
        email:            u.email          ?? '',
        last_sign_in_at:  u.last_sign_in_at ?? null,
      })
    }
  }

  // ── User profiles ─────────────────────────────────────────────────────────
  const { data: profiles } = await supabase
    .from('user_profiles')
    .select('id, full_name, role, created_at')
    .order('created_at', { ascending: true })

  // ── Edit proposal stats (created_by + status) ─────────────────────────────
  const { data: proposals } = await supabase
    .from('edit_proposals')
    .select('created_by, status')

  // ── Image stats (created_by + approved) ───────────────────────────────────
  // created_by may not exist; handle gracefully
  const { data: images } = await supabase
    .from('images')
    .select('created_by, approved')

  // ── Aggregate per user ────────────────────────────────────────────────────
  const propStats = new Map<string, { total: number; approved: number; rejected: number }>()
  for (const p of (proposals ?? [])) {
    if (!p.created_by) continue
    const s = propStats.get(p.created_by) ?? { total: 0, approved: 0, rejected: 0 }
    s.total++
    if (p.status === 'approved') s.approved++
    if (p.status === 'rejected') s.rejected++
    propStats.set(p.created_by, s)
  }

  const imgStats = new Map<string, { total: number; approved: number }>()
  for (const img of (images ?? [])) {
    const createdBy = (img as any).created_by
    if (!createdBy) continue
    const s = imgStats.get(createdBy) ?? { total: 0, approved: 0 }
    s.total++
    if (img.approved) s.approved++
    imgStats.set(createdBy, s)
  }

  // ── Merge into final array ────────────────────────────────────────────────
  const users: UserWithStats[] = (profiles ?? []).map(p => {
    const auth = authUserMap.get(p.id)
    const ps   = propStats.get(p.id) ?? { total: 0, approved: 0, rejected: 0 }
    const is   = imgStats.get(p.id)  ?? { total: 0, approved: 0 }
    return {
      id:                 p.id,
      email:              auth?.email ?? '',
      full_name:          (p as any).full_name ?? null,
      role:               p.role,
      total_proposals:    ps.total,
      approved_proposals: ps.approved,
      rejected_proposals: ps.rejected,
      total_photos:       is.total,
      approved_photos:    is.approved,
      last_login:         auth?.last_sign_in_at ?? null,
      created_at:         p.created_at,
    }
  })

  return <UsersClient users={users} currentUserId={user.id} />
}
