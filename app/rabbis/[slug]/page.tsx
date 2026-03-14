import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import RabbiDetail from '@/components/rabbis/RabbiDetail'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { data } = await supabase
    .from('rabbi_profiles')
    .select('canonical_name')
    .eq('slug', params.slug)
    .eq('approved', true)
    .or('deleted.is.null,deleted.eq.false')
    .maybeSingle()

  const name = data?.canonical_name
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
  const { data: profile, error } = await supabase
    .from('rabbi_profiles')
    .select(`
      *,
      rabbis (
        id, title, start_year, end_year, notes,
        synagogues (id, name)
      ),
      images!rabbi_profile_id (
        id, url, storage_path, storage_provider, caption,
        description, photographer, year, circa_year,
        width, height, is_primary, display_order,
        source, credit_line
      )
    `)
    .eq('slug', params.slug)
    .eq('approved', true)
    .or('deleted.is.null,deleted.eq.false')
    .or('deleted.is.null,deleted.eq.false', { foreignTable: 'rabbis' })
    .or('deleted.is.null,deleted.eq.false', { foreignTable: 'images' })
    .single()

  if (error || !profile) notFound()

  const normalize = (val: unknown) =>
    Array.isArray(val) ? val : val ? [val] : []

  // Normalise affiliations: flatten the nested synagogues singleton array
  // and sort chronologically by start_year (unknown years go last).
  const affiliations = normalize(profile.rabbis)
    .map((r: any) => ({
      id:          r.id          as string,
      title:       r.title       as string | null,
      start_year:  r.start_year  as number | null,
      end_year:    r.end_year    as number | null,
      notes:       r.notes       as string | null,
      synagogue:   normalize(r.synagogues)[0] as { id: string; name: string } | null,
    }))
    .sort((a, b) => (a.start_year ?? 9999) - (b.start_year ?? 9999))

  // ── Resolve storage_path → full URL for rabbi photos ─────────────────────
  const rawImages: any[] = normalize(profile.images)
    .filter((img: any) => img.approved !== false)
    .sort((a: any, b: any) => {
      if (a.is_primary && !b.is_primary) return -1
      if (!a.is_primary && b.is_primary) return 1
      return (a.display_order ?? 99) - (b.display_order ?? 99)
    })

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

  return (
    <RabbiDetail
      profile={{
        id:            profile.id,
        slug:          profile.slug,
        canonical_name: profile.canonical_name,
        birth_year:    profile.birth_year    ?? null,
        death_year:    profile.death_year    ?? null,
        circa_birth:   profile.circa_birth   ?? null,
        circa_death:   profile.circa_death   ?? null,
        biography:     profile.biography     ?? null,
      }}
      affiliations={affiliations}
      photos={photos}
    />
  )
}
