import { redirect } from 'next/navigation'
import { createServerSupabase } from '@/lib/supabase/server'
import ContributionsClient from './ContributionsClient'
import type { EditProposal, PhotoUpload } from './ContributionsClient'

export const dynamic   = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'My Contributions - Philadelphia Historical Synagogues',
}

export default async function ContributionsPage() {
  const supabase = createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/')

  // ── Fetch edit proposals ──────────────────────────────────────────────────
  const { data: rawProposals } = await supabase
    .from('edit_proposals')
    .select('id, synagogue_id, proposal_type, proposed_data, current_data, change_summary, status, reviewer_notes, proposed_at, reviewed_at, synagogues(name)')
    .eq('proposed_by', user.id)
    .order('proposed_at', { ascending: false })

  // ── Fetch image uploads ───────────────────────────────────────────────────
  const { data: rawImages } = await supabase
    .from('images')
    .select('id, synagogue_id, url, storage_path, storage_provider, caption, description, photographer, year, date_taken, approved, approved_at, created_at, original_filename, width, height, synagogues(name)')
    .eq('uploaded_by', user.id)
    .order('created_at', { ascending: false })

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
  const proposals: EditProposal[] = (rawProposals ?? []).map((p: any) => ({
    id:             p.id,
    synagogue_id:   p.synagogue_id,
    proposal_type:  p.proposal_type,
    proposed_data:  p.proposed_data ?? {},
    current_data:   p.current_data ?? null,
    change_summary: p.change_summary ?? null,
    status:         p.status,
    reviewer_notes: p.reviewer_notes ?? null,
    proposed_at:    p.proposed_at,
    reviewed_at:    p.reviewed_at ?? null,
    synagogue_name: (p.synagogues as any)?.name ?? null,
  }))

  const images: PhotoUpload[] = (rawImages ?? []).map((img: any) => ({
    id:                img.id,
    synagogue_id:      img.synagogue_id,
    url:               img.storage_path
                         ? `${storageBaseUrl}/${img.storage_path}`
                         : (img.url || null),
    caption:           img.caption,
    description:       img.description ?? null,
    photographer:      img.photographer ?? null,
    year:              img.year ?? null,
    date_taken:        img.date_taken ?? null,
    approved:          img.approved ?? false,
    approved_at:       img.approved_at ?? null,
    created_at:        img.created_at,
    original_filename: img.original_filename ?? null,
    width:             img.width ?? null,
    height:            img.height ?? null,
    synagogue_name:    (img.synagogues as any)?.name ?? null,
  }))

  return <ContributionsClient proposals={proposals} images={images} />
}
