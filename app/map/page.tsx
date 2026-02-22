import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import MapClient from '@/components/map/MapClient'

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
        latitude,
        longitude,
        geocode_quality
      ),
      rabbis (name, title)
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
        latitude: Number(a.latitude),
        longitude: Number(a.longitude),
        geocode_quality: a.geocode_quality,
        start_year: null,
        end_year: null,
        is_current: null,
        address_order: null,
        city: null,
        state: null,
      })),
      rabbis: Array.isArray(syn.rabbis)
        ? (syn.rabbis as any[]).map((r: any) => r.name).filter(Boolean)
        : [],
    }))

  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-white shadow-sm border-b flex-shrink-0">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Philadelphia Historical Synagogues
            </Link>
            <div className="flex gap-6">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition">
                Home
              </Link>
              <Link href="/map" className="text-gray-700 hover:text-blue-600 font-medium transition">
                Map
              </Link>
              <Link href="/synagogues" className="text-gray-700 hover:text-blue-600 font-medium transition">
                Browse
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex-1 min-h-0">
        <MapClient synagogues={mappableSynagogues} />
      </div>
    </div>
  )
}
