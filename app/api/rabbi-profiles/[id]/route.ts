import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  const { data: profile } = await supabase
    .from('rabbi_profiles')
    .select(`
      id, slug, canonical_name,
      birth_year, death_year, circa_birth, circa_death,
      biography, birthplace, death_place,
      seminary, ordination_year, denomination, languages,
      publications, achievements
    `)
    .eq('id', params.id)
    .eq('approved', true)
    .or('deleted.is.null,deleted.eq.false')
    .maybeSingle()

  if (!profile) {
    return NextResponse.json({ error: 'Rabbi not found' }, { status: 404 })
  }

  // Count affiliations
  const { count: affiliationsCount } = await supabase
    .from('rabbis')
    .select('*', { count: 'exact', head: true })
    .eq('rabbi_profile_id', params.id)
    .or('deleted.is.null,deleted.eq.false')

  // Count photos
  const { count: photosCount } = await supabase
    .from('images')
    .select('*', { count: 'exact', head: true })
    .or(`rabbi_profile_id.eq.${params.id},person_profile_id.eq.${params.id}`)
    .eq('approved', true)

  return NextResponse.json({
    ...profile,
    affiliations_count:  affiliationsCount  ?? 0,
    photos_count:        photosCount        ?? 0,
    relationships_count: 0,   // rabbi_relationships table not yet implemented
  })
}
