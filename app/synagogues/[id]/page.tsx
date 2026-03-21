import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import SynagogueDetail from '@/components/synagogues/SynagogueDetail'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { data } = await supabase
    .from('synagogues')
    .select('name')
    .eq('id', params.id)
    .or('deleted.is.null,deleted.eq.false')
    .maybeSingle()
  return {
    title: data?.name
      ? `${data.name} - Philadelphia Historical Synagogues`
      : 'Synagogue - Philadelphia Historical Synagogues',
  }
}

export default async function SynagoguePage({ params }: { params: { id: string } }) {
  const { data: synagogue, error } = await supabase
    .from('synagogues')
    .select(`
      id, name, status,
      founded_year, founded_text,
      closed_year, closed_text,
      addresses (
        id, street_address, neighborhood, city, state, zip_code,
        latitude, longitude, is_current, start_year, end_year, address_order
      ),
      history_entries (
        id, entry_type, content, year, year_range_start, year_range_end, circa, source, source_url
      ),
      rabbis (
        id, name, title, start_year, end_year, notes,
        rabbi_profiles!profile_id (slug)
      ),
      images (
        id, url, storage_path, storage_provider,
        caption, description, year, circa_year, is_primary, display_order,
        photographer, source, credit_line
      )
    `)
    .eq('id', params.id)
    .or('deleted.is.null,deleted.eq.false')
    // Exclude soft-deleted records from each related table.
    // .or() with foreignTable filters nested resources without affecting the parent query.
    .or('deleted.is.null,deleted.eq.false', { foreignTable: 'addresses' })
    .or('deleted.is.null,deleted.eq.false', { foreignTable: 'history_entries' })
    .or('deleted.is.null,deleted.eq.false', { foreignTable: 'rabbis' })
    .or('deleted.is.null,deleted.eq.false', { foreignTable: 'images' })
    .single()

  if (error || !synagogue) notFound()

  const normalize = (val: any) =>
    Array.isArray(val) ? val : val ? [val] : []

  const addresses = normalize(synagogue.addresses).sort((a: any, b: any) => {
    if (a.is_current && !b.is_current) return -1
    if (!a.is_current && b.is_current) return 1
    return (a.address_order ?? 99) - (b.address_order ?? 99)
  })

  const history = normalize(synagogue.history_entries).sort((a: any, b: any) => {
    const ay = a.year ?? a.year_range_start ?? 9999
    const by = b.year ?? b.year_range_start ?? 9999
    return ay - by
  })

  const rabbis = normalize(synagogue.rabbis)
    .sort((a: any, b: any) => (a.start_year ?? 9999) - (b.start_year ?? 9999))
    .map((r: any) => ({
      ...r,
      slug: normalize(r.rabbi_profiles)[0]?.slug ?? null,
    }))

  const rawImages: any[] = normalize(synagogue.images).sort((a: any, b: any) => {
    if (a.is_primary && !b.is_primary) return -1
    if (!a.is_primary && b.is_primary) return 1
    return (a.display_order ?? 99) - (b.display_order ?? 99)
  })

  // ── Resolve storage_path → full URL ──────────────────────────────────────
  // Reads base_url from storage_config table (provider = 'supabase').
  // Falls back to constructing from NEXT_PUBLIC_SUPABASE_URL if the table
  // doesn't exist yet or has no matching row.
  let storageBaseUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/synagogue-images`
  if (rawImages.some((img: any) => img.storage_path)) {
    const { data: cfg } = await supabase
      .from('storage_config')
      .select('base_url')
      .eq('provider', 'supabase')
      .maybeSingle()
    if (cfg?.base_url) storageBaseUrl = cfg.base_url
  }

  const images = rawImages.map((img: any) => ({
    ...img,
    // Prefer storage_path → build URL; fall back to whatever is in url column
    url: img.storage_path
      ? `${storageBaseUrl}/${img.storage_path}`
      : (img.url || null),
  }))

  const { data: rawLinks } = await supabase
    .from('links')
    .select('id, link_type, url, title, description')
    .eq('entity_type', 'synagogue')
    .eq('entity_id', params.id)
    .eq('approved', true)
    .or('deleted.is.null,deleted.eq.false')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false })

  const links = (rawLinks ?? []) as Array<{
    id: string; link_type: string; url: string;
    title: string | null; description: string | null
  }>

  return (
    <SynagogueDetail
      synagogue={{
        id: synagogue.id,
        name: synagogue.name,
        status: synagogue.status ?? 'unknown',
        founded_year: synagogue.founded_year,
        founded_text: synagogue.founded_text,
        closed_year: synagogue.closed_year,
        closed_text: synagogue.closed_text,
      }}
      addresses={addresses}
      history={history}
      rabbis={rabbis}
      images={images}
      links={links}
    />
  )
}
