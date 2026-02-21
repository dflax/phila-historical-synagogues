import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import SynagogueDetail from '@/components/synagogues/SynagogueDetail'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { data } = await supabase
    .from('synagogues')
    .select('name')
    .eq('id', params.id)
    .single()
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
        id, name, title, start_year, end_year, notes
      ),
      images (
        id, url, caption, description, year, circa_year, is_primary, display_order,
        photographer, source, credit_line
      )
    `)
    .eq('id', params.id)
    .single()

  if (error || !synagogue) notFound()

  // Normalize all relations to arrays (Supabase can return object or array)
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

  const rabbis = normalize(synagogue.rabbis).sort((a: any, b: any) =>
    (a.start_year ?? 9999) - (b.start_year ?? 9999)
  )

  const images = normalize(synagogue.images).sort((a: any, b: any) => {
    if (a.is_primary && !b.is_primary) return -1
    if (!a.is_primary && b.is_primary) return 1
    return (a.display_order ?? 99) - (b.display_order ?? 99)
  })

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
    />
  )
}
