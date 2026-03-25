import { createClient } from '@supabase/supabase-js'
import { Suspense } from 'react'
import RabbisClient from '@/components/rabbis/RabbisClient'
import { getAllPersonProfiles } from '@/lib/queries/leadership'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Leadership - Philadelphia Historical Synagogues',
  description: 'Browse clergy and leadership documented in the Philadelphia-area synagogue records.',
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function RabbisPage() {
  // Query profiles from both old+new tables in parallel with affiliation counts
  const [profiles, { data: affiliationRows, error }] = await Promise.all([
    getAllPersonProfiles(),
    supabase
      .from('affiliations')
      .select('person_profile_id')
      .eq('deleted', false)
      .eq('approved', true),
  ])

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error loading rabbis:</p>
          <p>{error.message}</p>
        </div>
      </div>
    )
  }

  // Build a per-person affiliation count from the new affiliations table
  const countMap = new Map<string, number>()
  for (const a of affiliationRows ?? []) {
    if (a.person_profile_id) {
      countMap.set(a.person_profile_id, (countMap.get(a.person_profile_id) ?? 0) + 1)
    }
  }

  const rabbis = profiles.map(p => ({
    id:             p.id,
    slug:           p.slug           ?? '',
    canonical_name: p.canonical_name,
    birth_year:     p.birth_year     ?? null,
    death_year:     p.death_year     ?? null,
    circa_birth:    p.circa_birth    ?? null,
    circa_death:    p.circa_death    ?? null,
    affiliation_count: countMap.get(p.id) ?? 0,
  }))

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
      </div>
    }>
      <RabbisClient rabbis={rabbis} />
    </Suspense>
  )
}
