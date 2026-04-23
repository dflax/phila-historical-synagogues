import { redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { createServerSupabase } from '@/lib/supabase/server'
import AdminClient from './AdminClient'
import type { PendingProposal, PendingImage } from './AdminClient'

export const dynamic   = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Admin Dashboard - Philadelphia Historical Synagogues',
}

const ADMIN_ROLES = ['editor', 'admin', 'super_admin']

export default async function AdminPage() {
  const supabase = createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/')

  // ── Role guard ────────────────────────────────────────────────────────────
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle()

  if (!profile || !ADMIN_ROLES.includes(profile.role)) redirect('/')

  // ── Fetch pending edit proposals ──────────────────────────────────────────
  const { data: rawProposals } = await supabase
    .from('edit_proposals')
    .select('id, synagogue_id, entity_id, proposal_type, proposed_data, current_data, submitter_note, created_at, created_by, synagogues(name)')
    .eq('status', 'pending')
    .order('created_at', { ascending: true })    // oldest first

  // ── Fetch pending image uploads ───────────────────────────────────────────
  const { data: rawImages } = await supabase
    .from('images')
    .select('id, synagogue_id, url, storage_path, storage_provider, caption, description, photographer, year, date_taken, created_at, original_filename, width, height, synagogues(name)')
    .eq('approved', false)
    .or('deleted.is.null,deleted.eq.false')
    .order('created_at', { ascending: true })    // oldest first

  // ── Resolve storage URLs ──────────────────────────────────────────────────
  let storageBaseUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/synagogue-images`
  if (rawImages?.some((img: any) => img.storage_path)) {
    const { data: cfg } = await supabase
      .from('storage_config')
      .select('base_url')
      .eq('provider', 'supabase')
      .maybeSingle()
    if (cfg?.base_url) storageBaseUrl = cfg.base_url
  }

  // ── Resolve rabbi names for rabbi_profile_* proposals ────────────────────
  const rabbiProfileIds = (rawProposals ?? [])
    .filter((p: any) => typeof p.proposal_type === 'string' && p.proposal_type.startsWith('rabbi_profile_') && p.entity_id)
    .map((p: any) => p.entity_id as string)

  const rabbiMap = new Map<string, string>()
  if (rabbiProfileIds.length > 0) {
    const { data: rabbiProfiles } = await supabase
      .from('rabbi_profiles')
      .select('id, canonical_name')
      .in('id', rabbiProfileIds)
    for (const r of rabbiProfiles ?? []) {
      rabbiMap.set(r.id as string, r.canonical_name as string)
    }
  }

  // ── Fetch contributor names and emails ───────────────────────────────────
  const creatorIds = [...new Set(
    (rawProposals ?? []).map((p: any) => p.created_by).filter(Boolean) as string[]
  )]

  const profileMap = new Map<string, string>()
  const authUserMap = new Map<string, string>()

  if (creatorIds.length > 0) {
    const { data: userProfiles } = await supabase
      .from('user_profiles')
      .select('id, full_name')
      .in('id', creatorIds)
    for (const u of userProfiles ?? []) {
      profileMap.set(u.id as string, u.full_name as string)
    }

    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (serviceKey) {
      const serviceClient = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        serviceKey,
        { auth: { autoRefreshToken: false, persistSession: false } }
      )
      const { data: authData } = await serviceClient.auth.admin.listUsers()
      for (const u of authData?.users ?? []) {
        if (u.email) authUserMap.set(u.id, u.email)
      }
    }
  }

  // ── Shape props ───────────────────────────────────────────────────────────
  const proposals: PendingProposal[] = (rawProposals ?? []).map((p: any) => ({
    id:             p.id,
    synagogue_id:   p.synagogue_id ?? null,
    entity_id:      p.entity_id    ?? null,
    rabbi_name:     p.entity_id ? (rabbiMap.get(p.entity_id) ?? null) : null,
    synagogue_name: (p.synagogues as any)?.name ?? null,
    proposal_type:  p.proposal_type,
    proposed_data:  p.proposed_data ?? {},
    current_data:   p.current_data ?? null,
    submitter_note:     p.submitter_note ?? null,
    created_at:         p.created_at,
    contributor_name:   profileMap.get(p.created_by) ?? 'Unknown',
    contributor_email:  authUserMap.get(p.created_by) ?? null,
  }))

  const images: PendingImage[] = (rawImages ?? []).map((img: any) => ({
    id:                img.id,
    synagogue_id:      img.synagogue_id,
    synagogue_name:    (img.synagogues as any)?.name ?? null,
    url:               img.storage_path
                         ? `${storageBaseUrl}/${img.storage_path}`
                         : (img.url || null),
    storage_path:      img.storage_path ?? null,
    caption:           img.caption,
    description:       img.description ?? null,
    photographer:      img.photographer ?? null,
    year:              img.year ?? null,
    date_taken:        img.date_taken ?? null,
    created_at:        img.created_at,
    original_filename: img.original_filename ?? null,
    width:             img.width ?? null,
    height:            img.height ?? null,
  }))

  return <AdminClient proposals={proposals} images={images} userId={user.id} storageBaseUrl={storageBaseUrl} />
}
