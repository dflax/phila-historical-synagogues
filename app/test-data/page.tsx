import { supabase } from '@/lib/supabase/client'

export default async function TestDataPage() {
  // Get counts
  const { count: synagogueCount } = await supabase
    .from('synagogues')
    .select('*', { count: 'exact', head: true })

  const { count: addressCount } = await supabase
    .from('addresses')
    .select('*', { count: 'exact', head: true })

  // Get some synagogues with addresses
  const { data: synagoguesWithAddresses } = await supabase
    .from('synagogues')
    .select(`
      id,
      name,
      status,
      founded_year,
      addresses (
        street_address,
        neighborhood,
        zip_code,
        latitude,
        longitude,
        geocode_quality
      )
    `)
    .not('addresses', 'is', null)
    .limit(10)

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Database Test Results</h1>
      
      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-100 p-6 rounded-lg">
          <div className="text-4xl font-bold text-blue-600">{synagogueCount}</div>
          <div className="text-gray-700">Total Synagogues</div>
        </div>
        <div className="bg-green-100 p-6 rounded-lg">
          <div className="text-4xl font-bold text-green-600">{addressCount}</div>
          <div className="text-gray-700">Geocoded Addresses</div>
        </div>
        <div className="bg-purple-100 p-6 rounded-lg">
          <div className="text-4xl font-bold text-purple-600">
            {addressCount && synagogueCount ? Math.round((addressCount / synagogueCount) * 100) : 0}%
          </div>
          <div className="text-gray-700">Coverage</div>
        </div>
      </div>

      {/* Sample Data */}
      <h2 className="text-2xl font-bold mb-4">Sample Synagogues with Addresses</h2>
      <div className="space-y-4">
        {synagoguesWithAddresses?.map((syn: any) => (
          <div key={syn.id} className="border rounded-lg p-4 bg-white shadow">
            <h3 className="font-bold text-lg mb-2">{syn.name}</h3>
            <div className="text-sm text-gray-600 mb-2">
              Status: {syn.status} | Founded: {syn.founded_year || 'Unknown'}
            </div>
            
            {syn.addresses && syn.addresses.length > 0 && (
              <div className="bg-gray-50 p-3 rounded mt-2">
                <div className="font-semibold text-sm mb-1">Address:</div>
                {syn.addresses.map((addr: any, idx: number) => (
                  <div key={idx} className="text-sm">
                    <div>{addr.street_address}</div>
                    {addr.neighborhood && <div className="text-gray-600">{addr.neighborhood}</div>}
                    {addr.zip_code && <div className="text-gray-600">Philadelphia, PA {addr.zip_code}</div>}
                    <div className="text-xs text-gray-500 mt-1">
                      📍 Lat: {addr.latitude?.toFixed(6)}, Lon: {addr.longitude?.toFixed(6)}
                      {' '} • Quality: {addr.geocode_quality}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Map Test Link */}
      <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-bold mb-2">Ready for the next step?</h3>
        <p className="text-gray-700">
          Your data is loaded! Now we can build the interactive map to display all these synagogues.
        </p>
      </div>
    </div>
  )
}
