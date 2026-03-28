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
        geocode_quality
      ),
      affiliations (
        affiliation_category,
        person_profiles (
          canonical_name
        )
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

  // Filter to only include synagogues with valid coordinates
  const mappableSynagogues = (data ?? [])
    .filter(syn =>
      Array.isArray(syn.addresses) &&
      syn.addresses.length > 0 &&
      syn.addresses[0].latitude &&
      syn.addresses[0].longitude
    )
    .map(syn => ({
      id: syn.id,
      name: syn.name,
      status: syn.status,
      founded_year: syn.founded_year,
      closed_year: syn.closed_year,
      addresses: (syn.addresses as any[]).map(a => ({
        id: a.id,
        street_address: a.street_address,
        neighborhood: a.neighborhood,
        city: a.city,
        state: a.state,
        zip_code: a.zip_code,
        latitude: Number(a.latitude),
        longitude: Number(a.longitude),
        geocode_quality: a.geocode_quality,
        start_year: null,
        end_year: null,
        is_current: null,
        address_order: null,
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
