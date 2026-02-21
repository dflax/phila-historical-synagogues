import { createClient } from '@supabase/supabase-js'
import SynagoguesClient from '@/components/synagogues/SynagoguesClient'

export const metadata = {
  title: 'Browse Synagogues - Philadelphia Historical Synagogues',
  description: 'Browse and search the complete database of Philadelphia-area synagogues',
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function SynagoguesPage() {
  const { data, error } = await supabase
    .from('synagogues')
    .select(`
      id,
      name,
      status,
      founded_year,
      founded_text,
      closed_year,
      closed_text,
      addresses (
        id,
        street_address,
        neighborhood,
        city,
        state,
        zip_code,
        is_current,
        address_order,
        start_year,
        end_year
      )
    `)
    .order('name')

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error loading synagogues:</p>
          <p>{error.message}</p>
        </div>
      </div>
    )
  }

  const synagogues = (data ?? []).map(s => {
    const addrs = Array.isArray(s.addresses)
      ? s.addresses
      : s.addresses
      ? [s.addresses as any]
      : []

    const sorted = [...addrs].sort((a, b) => {
      if (a.is_current && !b.is_current) return -1
      if (!a.is_current && b.is_current) return 1
      return (a.address_order ?? 99) - (b.address_order ?? 99)
    })

    return {
      id: s.id as string,
      name: s.name as string,
      status: (s.status ?? 'unknown') as string,
      founded_year: s.founded_year as number | null,
      founded_text: s.founded_text as string | null,
      closed_year: s.closed_year as number | null,
      closed_text: s.closed_text as string | null,
      addresses: sorted.map((a: any) => ({
        id: a.id as string,
        street_address: a.street_address as string | null,
        neighborhood: a.neighborhood as string | null,
        city: a.city as string | null,
        state: a.state as string | null,
        zip_code: a.zip_code as string | null,
        is_current: a.is_current as boolean | null,
        address_order: a.address_order as number | null,
        start_year: a.start_year as number | null,
        end_year: a.end_year as number | null,
      })),
    }
  })

  return <SynagoguesClient synagogues={synagogues} />
}
