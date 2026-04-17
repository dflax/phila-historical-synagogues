import { createClient } from '@supabase/supabase-js'
import MapClient from '@/components/map/MapClient'
import AppHeader from '@/components/layout/AppHeader'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Map - Philadelphia Historical Synagogues',
  description: 'Interactive map of Philadelphia-area synagogues past and present',
}

// Server-side Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function MapPage() {
  const { data, error } = await supabase
    .from('synagogues')
    .select(`
      id,
      name,
      status,
      founded_year,
      closed_year,
      addresses (
        id,
        street_address,
        neighborhood,
        city,
        state,
        zip_code,
        latitude,
        longitude,
        geocode_quality,
        start_year,
        end_year,
        is_current,
        address_order
      ),
      affiliations (
        affiliation_category,
        person_profiles (
          canonical_name
        )
      )
    `)
    .or('deleted.is.null,deleted.eq.false', { foreignTable: 'addresses' })
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

  // Include synagogues that have at least one geocoded address; pass ALL addresses
  // (geocoded and not) so the sidebar panel can show the complete location history.
  // buildMarkers() in MapClient skips non-geocoded entries when placing map markers.
  const mappableSynagogues = (data ?? [])
    .filter(syn =>
      Array.isArray(syn.addresses) &&
      (syn.addresses as any[]).some((a: any) => a.latitude && a.longitude)
    )
    .map(syn => ({
      id: syn.id,
      name: syn.name,
      status: syn.status,
      founded_year: syn.founded_year,
      closed_year: syn.closed_year,
      addresses: (syn.addresses as any[]).map((a: any) => ({
        id:             a.id,
        street_address: a.street_address,
        neighborhood:   a.neighborhood,
        city:           a.city,
        state:          a.state,
        zip_code:       a.zip_code,
        latitude:       a.latitude  != null ? Number(a.latitude)  : null,
        longitude:      a.longitude != null ? Number(a.longitude) : null,
        geocode_quality: a.geocode_quality,
        start_year:     a.start_year   ?? null,
        end_year:       a.end_year     ?? null,
        is_current:     a.is_current   ?? null,
        address_order:  a.address_order ?? null,
      })),
      clergy: Array.isArray((syn as any).affiliations)
        ? ((syn as any).affiliations as any[])
            .filter((a: any) => a.affiliation_category === 'clergy')
            .map((a: any) => a.person_profiles?.canonical_name)
            .filter(Boolean)
        : [],
    }))

  return (
    <div className="flex flex-col h-screen">
      <AppHeader />
      <div className="flex-1 min-h-0">
        <MapClient synagogues={mappableSynagogues} />
      </div>
    </div>
  )
}
