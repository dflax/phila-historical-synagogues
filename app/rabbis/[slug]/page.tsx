import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import LeadershipDetail from '@/components/leadership/LeadershipDetail'
import { getPersonProfileBySlug, getAffiliationsByPerson } from '@/lib/queries/leadership'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const profile = await getPersonProfileBySlug(params.slug)
  const name = profile?.canonical_name
  return {
    title: name
      ? `${name} - Philadelphia Historical Synagogues`
      : 'Rabbi - Philadelphia Historical Synagogues',
    description: name
      ? `Biographical information and synagogue affiliations for ${name}.`
      : 'Rabbi profile — Philadelphia Historical Synagogues.',
  }
}

export default async function RabbiPage({ params }: { params: { slug: string } }) {
  // Query profile and affiliations from both old+new tables in parallel
  const profile = await getPersonProfileBySlug(params.slug)
  if (!profile) notFound()

  const affiliationsData = await getAffiliationsByPerson(profile.id)

  // Map to the shape RabbiDetail (and SplitRabbiButton) expect
  const affiliations = affiliationsData.map(a => ({
    id:           a.id,
    title:        a.role_title,
    start_year:   a.start_year,
    end_year:     a.end_year,
    notes:        a.notes,
    synagogue_id: a.synagogue_id,
    synagogue:    a.synagogue ? { id: a.synagogue.id, name: a.synagogue.name } : null,
  }))

  // ── Images (still queried directly — no helper yet) ───────────────────────
  const { data: rawImagesData } = await supabase
    .from('images')
    .select(`
      id, url, storage_path, storage_provider, caption,
      description, photographer, year, circa_year,
      width, height, is_primary, display_order,
      source, credit_line, approved
    `)
    .eq('rabbi_profile_id', profile.id)
    .or('deleted.is.null,deleted.eq.false')

  const rawImages: any[] = (rawImagesData ?? [])
    .filter((img: any) => img.approved !== false)
    .sort((a: any, b: any) => {
      if (a.is_primary && !b.is_primary) return -1
      if (!a.is_primary && b.is_primary) return 1
      return (a.display_order ?? 99) - (b.display_order ?? 99)
    })

  // ── Resolve storage_path → full URL ──────────────────────────────────────
  let storageBaseUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/synagogue-images`
  if (rawImages.some((img: any) => img.storage_path)) {
    const { data: cfg } = await supabase
      .from('storage_config')
      .select('base_url')
      .eq('provider', 'supabase')
      .maybeSingle()
    if (cfg?.base_url) storageBaseUrl = cfg.base_url
  }

  const photos = rawImages.map((img: any) => ({
    ...img,
    url: img.storage_path
      ? `${storageBaseUrl}/${img.storage_path}`
      : (img.url || null),
  }))

  // ── Links ─────────────────────────────────────────────────────────────────
  const { data: rawLinks } = await supabase
    .from('links')
    .select('id, link_type, url, title, description')
    .eq('entity_type', 'rabbi')
    .eq('entity_id', profile.id)
    .eq('approved', true)
    .or('deleted.is.null,deleted.eq.false')
    .order('title', { ascending: true, nullsFirst: false })

  const links = (rawLinks ?? []) as Array<{
    id: string; link_type: string; url: string;
    title: string | null; description: string | null
  }>

  return (
    <LeadershipDetail
      profile={{
        id:              profile.id,
        slug:            profile.slug ?? '',
        canonical_name:  profile.canonical_name,
        birth_year:      profile.birth_year      ?? null,
        death_year:      profile.death_year      ?? null,
        circa_birth:     profile.circa_birth     ?? null,
        circa_death:     profile.circa_death     ?? null,
        biography:       profile.biography       ?? null,
        birthplace:      profile.birthplace      ?? null,
        death_place:     profile.death_place     ?? null,
        seminary:        profile.seminary        ?? null,
        ordination_year: profile.ordination_year ?? null,
        denomination:    profile.denomination    ?? null,
        // Convert string back to string[] that RabbiDetail/SplitRabbiButton expect
        languages: profile.languages
          ? profile.languages.split(', ').filter(Boolean)
          : null,
        publications:    profile.publications    ?? null,
        achievements:    profile.achievements    ?? null,
        person_type:     profile.person_type     ?? 'rabbi',
      }}
      affiliations={affiliations}
      photos={photos}
      links={links}
    />
  )
}
