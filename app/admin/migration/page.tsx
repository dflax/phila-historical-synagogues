import { redirect } from 'next/navigation'
import { createServerSupabase } from '@/lib/supabase/server'
import MigrationDashboard from '@/components/admin/MigrationDashboard'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Migration Verification - Admin',
  description: 'Verify data integrity during leadership model migration',
}

const ADMIN_ROLES = ['admin', 'super_admin']

export default async function MigrationPage() {
  const supabase = createServerSupabase()

  // Check authentication and admin role
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/')
  }

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle()

  if (!profile || !ADMIN_ROLES.includes(profile.role)) {
    redirect('/')
  }

  // 1. Count records in old tables
  const [oldProfilesResult, oldAffiliationsResult] = await Promise.all([
    supabase.from('rabbi_profiles').select('id', { count: 'exact', head: true }),
    supabase.from('rabbis').select('id', { count: 'exact', head: true }),
  ])

  // 2. Count records in new tables
  const [newProfilesResult, newAffiliationsResult] = await Promise.all([
    supabase.from('person_profiles').select('id', { count: 'exact', head: true }),
    supabase.from('affiliations').select('id', { count: 'exact', head: true }),
  ])

  // 3. Get profiles with person_type breakdown
  const { data: personTypeBreakdown } = await supabase
    .from('person_profiles')
    .select('person_type')

  const typeCounts = personTypeBreakdown?.reduce((acc, p) => {
    const type = p.person_type || 'unknown'
    acc[type] = (acc[type] || 0) + 1
    return acc
  }, {} as Record<string, number>) || {}

  // 4. Get affiliations with category breakdown
  const { data: categoryBreakdown } = await supabase
    .from('affiliations')
    .select('affiliation_category')

  const categoryCounts = categoryBreakdown?.reduce((acc, a) => {
    const cat = a.affiliation_category || 'unknown'
    acc[cat] = (acc[cat] || 0) + 1
    return acc
  }, {} as Record<string, number>) || {}

  // 5. Check for slug duplicates
  const { data: slugs } = await supabase
    .from('person_profiles')
    .select('slug')
    .not('slug', 'is', null)

  const slugDuplicates = slugs?.reduce((acc, s) => {
    if (!s.slug) return acc
    acc[s.slug] = (acc[s.slug] || 0) + 1
    return acc
  }, {} as Record<string, number>) || {}

  const duplicateSlugs = Object.entries(slugDuplicates)
    .filter(([, count]) => count > 1)
    .map(([slug, count]) => ({ slug, count }))

  // 6. Check for clergy without slugs
  const { data: clergyWithoutSlugs } = await supabase
    .from('person_profiles')
    .select('id, canonical_name, person_type, slug')
    .in('person_type', ['rabbi', 'chazzan'])
    .is('slug', null)

  // 7. Check for non-clergy with slugs (shouldn't happen)
  const { data: nonClergyWithSlugs } = await supabase
    .from('person_profiles')
    .select('id, canonical_name, person_type, slug')
    .in('person_type', ['lay_leader', 'staff', 'other'])
    .not('slug', 'is', null)

  // 8. Check for ID mismatches between old and new profile tables
  const { data: oldProfileIds } = await supabase
    .from('rabbi_profiles')
    .select('id')

  const { data: newProfileIds } = await supabase
    .from('person_profiles')
    .select('id')

  const oldIds = new Set(oldProfileIds?.map(p => p.id) || [])
  const newIds = new Set(newProfileIds?.map(p => p.id) || [])

  const onlyInOld = Array.from(oldIds).filter(id => !newIds.has(id))
  const onlyInNew = Array.from(newIds).filter(id => !oldIds.has(id))

  // 9. Check for ID mismatches between old and new affiliation tables
  const { data: oldAffIds } = await supabase
    .from('rabbis')
    .select('id')

  const { data: newAffIds } = await supabase
    .from('affiliations')
    .select('id')

  const oldAffIdSet = new Set(oldAffIds?.map(a => a.id) || [])
  const newAffIdSet = new Set(newAffIds?.map(a => a.id) || [])

  const affOnlyInOld = Array.from(oldAffIdSet).filter(id => !newAffIdSet.has(id))
  const affOnlyInNew = Array.from(newAffIdSet).filter(id => !oldAffIdSet.has(id))

  const verificationData = {
    counts: {
      oldProfiles: oldProfilesResult.count || 0,
      newProfiles: newProfilesResult.count || 0,
      oldAffiliations: oldAffiliationsResult.count || 0,
      newAffiliations: newAffiliationsResult.count || 0,
    },
    personTypes: typeCounts,
    affiliationCategories: categoryCounts,
    slugIssues: {
      duplicates: duplicateSlugs,
      clergyWithoutSlugs: clergyWithoutSlugs || [],
      nonClergyWithSlugs: nonClergyWithSlugs || [],
    },
    syncIssues: {
      profilesOnlyInOld: onlyInOld,
      profilesOnlyInNew: onlyInNew,
      affiliationsOnlyInOld: affOnlyInOld,
      affiliationsOnlyInNew: affOnlyInNew,
    },
  }

  return <MigrationDashboard data={verificationData} />
}
