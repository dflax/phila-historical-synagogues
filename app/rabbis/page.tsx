import { createClient } from '@supabase/supabase-js'
import { Suspense } from 'react'
import RabbisClient from '@/components/rabbis/RabbisClient'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Rabbis - Philadelphia Historical Synagogues',
  description: 'Browse the complete directory of rabbis documented in the Philadelphia-area synagogue records.',
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function RabbisPage() {
  const { data, error } = await supabase
    .from('rabbi_profiles')
    .select(`
      id, slug, canonical_name,
      birth_year, death_year, circa_birth, circa_death,
      rabbis (id)
    `)
    .eq('approved', true)
    .or('deleted.is.null,deleted.eq.false')
    .or('deleted.is.null,deleted.eq.false', { foreignTable: 'rabbis' })
    .order('canonical_name')

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

  const normalize = (val: unknown) =>
    Array.isArray(val) ? val : val ? [val] : []

  const rabbis = (data ?? []).map(p => ({
    id:             p.id             as string,
    slug:           p.slug           as string,
    canonical_name: p.canonical_name as string,
    birth_year:     p.birth_year     as number | null,
    death_year:     p.death_year     as number | null,
    circa_birth:    p.circa_birth    as boolean | null,
    circa_death:    p.circa_death    as boolean | null,
    affiliation_count: normalize(p.rabbis).length,
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
