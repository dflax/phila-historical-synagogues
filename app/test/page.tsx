import { supabase } from '@/lib/supabase/client'

export default async function TestPage() {
  const { data: synagogues, error } = await supabase
    .from('synagogues')
    .select('*')
    .order('name')
    .limit(10)

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Database Test</h1>
      
      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error connecting to database:</p>
          <p>{error.message}</p>
        </div>
      ) : (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">✓ Successfully connected to Supabase!</p>
          <p>Found {synagogues?.length} synagogues (showing first 10)</p>
        </div>
      )}

      {synagogues && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Sample Synagogues:</h2>
          <div className="space-y-4">
            {synagogues.map((syn) => (
              <div key={syn.id} className="border p-4 rounded">
                <h3 className="font-bold">{syn.name}</h3>
                <p className="text-sm text-gray-600">
                  Founded: {syn.founded_year || 'Unknown'} | 
                  Status: {syn.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
