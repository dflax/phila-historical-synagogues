import { redirect } from 'next/navigation'
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
    .select('id, synagogue_id, proposal_type, proposed_data, current_data, change_summary, proposed_at, synagogues(name)')
    .eq('status', 'pending')
    .order('proposed_at', { ascending: true })   // oldest first

  // ── Fetch pending image uploads ───────────────────────────────────────────
  const { data: rawImages } = await supabase
    .from('images')
    .select('id, synagogue_id, url, storage_path, storage_provider, caption, description, photographer, year, date_taken, created_at, original_filename, width, height, synagogues(name)')
    .eq('approved', false)
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

  // ── Shape props ───────────────────────────────────────────────────────────
  const proposals: PendingProposal[] = (rawProposals ?? []).map((p: any) => ({
    id:             p.id,
    synagogue_id:   p.synagogue_id ?? null,
    synagogue_name: (p.synagogues as any)?.name ?? null,
    proposal_type:  p.proposal_type,
    proposed_data:  p.proposed_data ?? {},
    current_data:   p.current_data ?? null,
    change_summary: p.change_summary ?? null,
    proposed_at:    p.proposed_at,
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

  return <AdminClient proposals={proposals} images={images} userId={user.id} />
}
