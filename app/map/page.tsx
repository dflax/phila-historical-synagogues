import { supabase } from '@/lib/supabase/client'
import MapClient from '@/components/map/MapClient'

export const metadata = {
  title: 'Map - Philadelphia Historical Synagogues',
  description: 'Interactive map of Philadelphia-area synagogues past and present',
}

export default async function MapPage() {
  // Fetch all synagogues with addresses
  const { data: synagogues, error } = await supabase
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
      )
    `)
    .not('addresses', 'is', null)
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
  const mappableSynagogues = synagogues?.filter(syn => 
    syn.addresses && 
    syn.addresses.length > 0 && 
    syn.addresses[0].latitude && 
    syn.addresses[0].longitude
  ) || []

  return <MapClient synagogues={mappableSynagogues} />
}
