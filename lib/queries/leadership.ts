import { createServerSupabase } from '@/lib/supabase/server'
import type { PersonProfile, Affiliation } from '@/lib/types/leadership'
import type { Database } from '@/lib/types/database.types'

type RabbiProfile = Database['public']['Tables']['rabbi_profiles']['Row']
type Rabbi = Database['public']['Tables']['rabbis']['Row']
type PersonProfileRow = Database['public']['Tables']['person_profiles']['Row']
type AffiliationRow = Database['public']['Tables']['affiliations']['Row']

// ============================================================
// PERSON PROFILES (formerly Rabbi Profiles)
// ============================================================

/**
 * Get all person profiles by querying both old (rabbi_profiles) and new (person_profiles) tables.
 * Deduplicates by ID, preferring new table data.
 */
export async function getAllPersonProfiles(): Promise<PersonProfile[]> {
  const supabase = createServerSupabase()

  const [oldResult, newResult] = await Promise.all([
    supabase
      .from('rabbi_profiles')
      .select('*')
      .eq('approved', true)
      .eq('deleted', false)
      .order('canonical_name'),
    supabase
      .from('person_profiles')
      .select('*')
      .eq('approved', true)
      .eq('deleted', false)
      .order('canonical_name')
  ])

  const oldProfiles: PersonProfile[] = (oldResult.data || []).map(convertRabbiProfileToPersonProfile)
  const newProfiles: PersonProfile[] = (newResult.data || []).map(convertPersonProfileRowToPersonProfile)

  // Merge; new table items are appended last so they win deduplication
  return deduplicateById([...oldProfiles, ...newProfiles])
}

/**
 * Get a single person profile by slug, checking both tables.
 * Prefers new table data when both match.
 */
export async function getPersonProfileBySlug(slug: string): Promise<PersonProfile | null> {
  const supabase = createServerSupabase()

  const [oldResult, newResult] = await Promise.all([
    supabase
      .from('rabbi_profiles')
      .select('*')
      .eq('slug', slug)
      .eq('approved', true)
      .eq('deleted', false)
      .maybeSingle(),
    supabase
      .from('person_profiles')
      .select('*')
      .eq('slug', slug)
      .eq('approved', true)
      .eq('deleted', false)
      .maybeSingle()
  ])

  if (newResult.data) {
    return convertPersonProfileRowToPersonProfile(newResult.data)
  }

  if (oldResult.data) {
    return convertRabbiProfileToPersonProfile(oldResult.data)
  }

  return null
}

/**
 * Get a person profile by ID, checking both tables.
 * Prefers new table data when both match.
 */
export async function getPersonProfileById(id: string): Promise<PersonProfile | null> {
  const supabase = createServerSupabase()

  const [oldResult, newResult] = await Promise.all([
    supabase
      .from('rabbi_profiles')
      .select('*')
      .eq('id', id)
      .maybeSingle(),
    supabase
      .from('person_profiles')
      .select('*')
      .eq('id', id)
      .maybeSingle()
  ])

  if (newResult.data) {
    return convertPersonProfileRowToPersonProfile(newResult.data)
  }

  if (oldResult.data) {
    return convertRabbiProfileToPersonProfile(oldResult.data)
  }

  return null
}

// ============================================================
// AFFILIATIONS (formerly Rabbis)
// ============================================================

/**
 * Get all affiliations for a synagogue, querying both old and new tables.
 * Deduplicates by ID, preferring new table data.
 */
export async function getAffiliationsBySynagogue(synagogueId: string): Promise<Affiliation[]> {
  const supabase = createServerSupabase()

  const [oldResult, newResult] = await Promise.all([
    supabase
      .from('rabbis')
      .select('*, profile:rabbi_profiles(*)')
      .eq('synagogue_id', synagogueId)
      .eq('deleted', false)
      .order('start_year', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: true }),
    supabase
      .from('affiliations')
      .select('*, person_profile:person_profiles(*)')
      .eq('synagogue_id', synagogueId)
      .eq('deleted', false)
      .order('start_year', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: true })
  ])

  const oldAffiliations: Affiliation[] = (oldResult.data || []).map(
    (row) => convertRabbiToAffiliation(row as Rabbi & { profile?: RabbiProfile })
  )
  const newAffiliations: Affiliation[] = (newResult.data || []).map(
    (row) => convertAffiliationRowToAffiliation(row as AffiliationRow & { person_profile?: PersonProfileRow; synagogue?: SynagogueRef })
  )

  return deduplicateById([...oldAffiliations, ...newAffiliations])
}

/**
 * Get all affiliations for a person profile, querying both old and new tables.
 * Deduplicates by ID, preferring new table data.
 */
export async function getAffiliationsByPerson(personProfileId: string): Promise<Affiliation[]> {
  const supabase = createServerSupabase()

  const [oldResult, newResult] = await Promise.all([
    supabase
      .from('rabbis')
      .select('*, synagogue:synagogues(id, name, status)')
      .eq('profile_id', personProfileId)
      .eq('deleted', false)
      .order('start_year', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: true }),
    supabase
      .from('affiliations')
      .select('*, synagogue:synagogues(id, name, status)')
      .eq('person_profile_id', personProfileId)
      .eq('deleted', false)
      .order('start_year', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: true })
  ])

  const oldAffiliations: Affiliation[] = (oldResult.data || []).map(
    (row) => convertRabbiToAffiliation(row as Rabbi & { synagogue?: SynagogueRef })
  )
  const newAffiliations: Affiliation[] = (newResult.data || []).map(
    (row) => convertAffiliationRowToAffiliation(row as AffiliationRow & { synagogue?: SynagogueRef })
  )

  return deduplicateById([...oldAffiliations, ...newAffiliations])
}

// ============================================================
// CONVERSION FUNCTIONS
// ============================================================

/**
 * Convert old rabbi_profiles row to PersonProfile format.
 */
function convertRabbiProfileToPersonProfile(row: RabbiProfile): PersonProfile {
  return {
    id: row.id,
    canonical_name: row.canonical_name,
    person_type: 'rabbi',
    slug: row.slug,
    birth_year: row.birth_year,
    circa_birth: row.circa_birth,
    death_year: row.death_year,
    circa_death: row.circa_death,
    biography: row.biography,
    birthplace: row.birthplace,
    death_place: row.death_place,
    seminary: row.seminary,
    ordination_year: row.ordination_year,
    denomination: row.denomination,
    // Old table stores languages as string[], new model uses a single string
    languages: Array.isArray(row.languages) ? row.languages.join(', ') : null,
    publications: row.publications,
    achievements: row.achievements,
    approved: row.approved,
    deleted: row.deleted,
    created_at: row.created_at,
    updated_at: row.updated_at,
    deleted_by: row.deleted_by,
    deleted_at: row.deleted_at,
  }
}

/**
 * Convert new person_profiles row to PersonProfile format.
 */
function convertPersonProfileRowToPersonProfile(row: PersonProfileRow): PersonProfile {
  return {
    id: row.id,
    canonical_name: row.canonical_name,
    person_type: row.person_type,
    slug: row.slug,
    birth_year: row.birth_year,
    circa_birth: row.circa_birth,
    death_year: row.death_year,
    circa_death: row.circa_death,
    biography: row.biography,
    birthplace: row.birthplace,
    death_place: row.death_place,
    seminary: row.seminary,
    ordination_year: row.ordination_year,
    denomination: row.denomination,
    languages: row.languages,
    publications: row.publications,
    achievements: row.achievements,
    approved: row.approved,
    deleted: row.deleted,
    created_at: row.created_at,
    updated_at: row.updated_at,
    deleted_by: row.deleted_by,
    deleted_at: row.deleted_at,
  }
}

/**
 * Convert old rabbis row to Affiliation format.
 * Old table has no updated_at; we fall back to created_at.
 */
function convertRabbiToAffiliation(
  row: Rabbi & { profile?: RabbiProfile | null; synagogue?: SynagogueRef | null }
): Affiliation {
  return {
    id: row.id,
    synagogue_id: row.synagogue_id,
    person_profile_id: row.profile_id || '',
    affiliation_category: 'clergy',
    role_title: row.title || 'Rabbi',
    start_year: row.start_year,
    end_year: row.end_year,
    notes: row.notes,
    approved: row.approved,
    deleted: row.deleted,
    created_at: row.created_at,
    updated_at: row.created_at, // rabbis table has no updated_at
    deleted_by: row.deleted_by,
    deleted_at: row.deleted_at,
    person_profile: row.profile ? convertRabbiProfileToPersonProfile(row.profile) : undefined,
    synagogue: row.synagogue ?? undefined,
  }
}

/**
 * Convert new affiliations row to Affiliation format.
 */
function convertAffiliationRowToAffiliation(
  row: AffiliationRow & { person_profile?: PersonProfileRow | null; synagogue?: SynagogueRef | null }
): Affiliation {
  return {
    id: row.id,
    synagogue_id: row.synagogue_id,
    person_profile_id: row.person_profile_id,
    affiliation_category: row.affiliation_category,
    role_title: row.role_title,
    start_year: row.start_year,
    end_year: row.end_year,
    notes: row.notes,
    approved: row.approved,
    deleted: row.deleted,
    created_at: row.created_at,
    updated_at: row.updated_at,
    deleted_by: row.deleted_by,
    deleted_at: row.deleted_at,
    person_profile: row.person_profile ? convertPersonProfileRowToPersonProfile(row.person_profile) : undefined,
    synagogue: row.synagogue ?? undefined,
  }
}

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

type SynagogueRef = { id: string; name: string; status: string }

/**
 * Deduplicate items by ID, keeping the last occurrence.
 * Because new table results are appended after old table results,
 * the last occurrence for any given ID will always be from the new table.
 */
function deduplicateById<T extends { id: string }>(items: T[]): T[] {
  const seen = new Map<string, T>()
  for (const item of items) {
    seen.set(item.id, item)
  }
  return Array.from(seen.values())
}
