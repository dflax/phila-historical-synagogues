// ═══════════════════════════════════════════════════════════════════
// CUTOVER COMPLETE - Using new tables only (person_profiles, affiliations)
// Old dual-query code is commented out below each function for rollback
// ═══════════════════════════════════════════════════════════════════

import { createServerSupabase } from '@/lib/supabase/server'
import type { PersonProfile, Affiliation } from '@/lib/types/leadership'
import type { Database } from '@/lib/types/database.types'

// type RabbiProfile = Database['public']['Tables']['rabbi_profiles']['Row']  // CUTOVER: unused
// type Rabbi = Database['public']['Tables']['rabbis']['Row']                  // CUTOVER: unused
type PersonProfileRow = Database['public']['Tables']['person_profiles']['Row']
type AffiliationRow = Database['public']['Tables']['affiliations']['Row']

// ============================================================
// PERSON PROFILES (formerly Rabbi Profiles)
// ============================================================

/**
 * Get all person profiles from the new table.
 */
export async function getAllPersonProfiles(): Promise<PersonProfile[]> {
  const supabase = createServerSupabase()

  // ── CUTOVER: Using new table only ───────────────────────────────────
  const { data } = await supabase
    .from('person_profiles')
    .select('*')
    .eq('approved', true)
    .eq('deleted', false)
    .order('canonical_name')
  return (data || []).map(convertPersonProfileRowToPersonProfile)

  // ── OLD CODE (dual-query) - Keep for rollback ────────────────────────
  // const [oldResult, newResult] = await Promise.all([
  //   supabase
  //     .from('rabbi_profiles')
  //     .select('*')
  //     .eq('approved', true)
  //     .eq('deleted', false)
  //     .order('canonical_name'),
  //   supabase
  //     .from('person_profiles')
  //     .select('*')
  //     .eq('approved', true)
  //     .eq('deleted', false)
  //     .order('canonical_name')
  // ])
  // const oldProfiles: PersonProfile[] = (oldResult.data || []).map(convertRabbiProfileToPersonProfile)
  // const newProfiles: PersonProfile[] = (newResult.data || []).map(convertPersonProfileRowToPersonProfile)
  // return deduplicateById([...oldProfiles, ...newProfiles])
}

/**
 * Get a single person profile by slug from the new table.
 */
export async function getPersonProfileBySlug(slug: string): Promise<PersonProfile | null> {
  const supabase = createServerSupabase()

  // ── CUTOVER: Using new table only ───────────────────────────────────
  const { data } = await supabase
    .from('person_profiles')
    .select('*')
    .eq('slug', slug)
    .eq('approved', true)
    .eq('deleted', false)
    .maybeSingle()
  return data ? convertPersonProfileRowToPersonProfile(data) : null

  // ── OLD CODE (dual-query) - Keep for rollback ────────────────────────
  // const [oldResult, newResult] = await Promise.all([
  //   supabase
  //     .from('rabbi_profiles')
  //     .select('*')
  //     .eq('slug', slug)
  //     .eq('approved', true)
  //     .eq('deleted', false)
  //     .maybeSingle(),
  //   supabase
  //     .from('person_profiles')
  //     .select('*')
  //     .eq('slug', slug)
  //     .eq('approved', true)
  //     .eq('deleted', false)
  //     .maybeSingle()
  // ])
  // if (newResult.data) return convertPersonProfileRowToPersonProfile(newResult.data)
  // if (oldResult.data) return convertRabbiProfileToPersonProfile(oldResult.data)
  // return null
}

/**
 * Get a person profile by ID from the new table.
 */
export async function getPersonProfileById(id: string): Promise<PersonProfile | null> {
  const supabase = createServerSupabase()

  // ── CUTOVER: Using new table only ───────────────────────────────────
  const { data } = await supabase
    .from('person_profiles')
    .select('*')
    .eq('id', id)
    .maybeSingle()
  return data ? convertPersonProfileRowToPersonProfile(data) : null

  // ── OLD CODE (dual-query) - Keep for rollback ────────────────────────
  // const [oldResult, newResult] = await Promise.all([
  //   supabase
  //     .from('rabbi_profiles')
  //     .select('*')
  //     .eq('id', id)
  //     .maybeSingle(),
  //   supabase
  //     .from('person_profiles')
  //     .select('*')
  //     .eq('id', id)
  //     .maybeSingle()
  // ])
  // if (newResult.data) return convertPersonProfileRowToPersonProfile(newResult.data)
  // if (oldResult.data) return convertRabbiProfileToPersonProfile(oldResult.data)
  // return null
}

// ============================================================
// AFFILIATIONS (formerly Rabbis)
// ============================================================

/**
 * Get all affiliations for a synagogue from the new table.
 */
export async function getAffiliationsBySynagogue(synagogueId: string): Promise<Affiliation[]> {
  const supabase = createServerSupabase()

  // ── CUTOVER: Using new table only ───────────────────────────────────
  const { data } = await supabase
    .from('affiliations')
    .select('*, person_profile:person_profiles(*)')
    .eq('synagogue_id', synagogueId)
    .eq('deleted', false)
    .order('start_year', { ascending: true, nullsFirst: false })
    .order('created_at', { ascending: true })
  return (data || []).map(
    (row) => convertAffiliationRowToAffiliation(row as AffiliationRow & { person_profile?: PersonProfileRow; synagogue?: SynagogueRef })
  )

  // ── OLD CODE (dual-query) - Keep for rollback ────────────────────────
  // const [oldResult, newResult] = await Promise.all([
  //   supabase
  //     .from('rabbis')
  //     .select('*, profile:rabbi_profiles(*)')
  //     .eq('synagogue_id', synagogueId)
  //     .eq('deleted', false)
  //     .order('start_year', { ascending: true, nullsFirst: false })
  //     .order('created_at', { ascending: true }),
  //   supabase
  //     .from('affiliations')
  //     .select('*, person_profile:person_profiles(*)')
  //     .eq('synagogue_id', synagogueId)
  //     .eq('deleted', false)
  //     .order('start_year', { ascending: true, nullsFirst: false })
  //     .order('created_at', { ascending: true })
  // ])
  // const oldAffiliations: Affiliation[] = (oldResult.data || []).map(
  //   (row) => convertRabbiToAffiliation(row as Rabbi & { profile?: RabbiProfile })
  // )
  // const newAffiliations: Affiliation[] = (newResult.data || []).map(
  //   (row) => convertAffiliationRowToAffiliation(row as AffiliationRow & { person_profile?: PersonProfileRow; synagogue?: SynagogueRef })
  // )
  // return deduplicateById([...oldAffiliations, ...newAffiliations])
}

/**
 * Get all affiliations for a person profile from the new table.
 */
export async function getAffiliationsByPerson(personProfileId: string): Promise<Affiliation[]> {
  const supabase = createServerSupabase()

  // ── CUTOVER: Using new table only ───────────────────────────────────
  const { data } = await supabase
    .from('affiliations')
    .select('*, synagogue:synagogues(id, name, status)')
    .eq('person_profile_id', personProfileId)
    .eq('deleted', false)
    .order('start_year', { ascending: true, nullsFirst: false })
    .order('created_at', { ascending: true })
  return (data || []).map(
    (row) => convertAffiliationRowToAffiliation(row as AffiliationRow & { synagogue?: SynagogueRef })
  )

  // ── OLD CODE (dual-query) - Keep for rollback ────────────────────────
  // const [oldResult, newResult] = await Promise.all([
  //   supabase
  //     .from('rabbis')
  //     .select('*, synagogue:synagogues(id, name, status)')
  //     .eq('profile_id', personProfileId)
  //     .eq('deleted', false)
  //     .order('start_year', { ascending: true, nullsFirst: false })
  //     .order('created_at', { ascending: true }),
  //   supabase
  //     .from('affiliations')
  //     .select('*, synagogue:synagogues(id, name, status)')
  //     .eq('person_profile_id', personProfileId)
  //     .eq('deleted', false)
  //     .order('start_year', { ascending: true, nullsFirst: false })
  //     .order('created_at', { ascending: true })
  // ])
  // const oldAffiliations: Affiliation[] = (oldResult.data || []).map(
  //   (row) => convertRabbiToAffiliation(row as Rabbi & { synagogue?: SynagogueRef })
  // )
  // const newAffiliations: Affiliation[] = (newResult.data || []).map(
  //   (row) => convertAffiliationRowToAffiliation(row as AffiliationRow & { synagogue?: SynagogueRef })
  // )
  // return deduplicateById([...oldAffiliations, ...newAffiliations])
}

// ============================================================
// CONVERSION FUNCTIONS
// ============================================================

// ── DEPRECATED: No longer needed after cutover ─────────────────────
// These functions converted old table structures to new types.
// Kept for reference during rollback period.
//
// function convertRabbiProfileToPersonProfile(row: RabbiProfile): PersonProfile {
//   return {
//     id: row.id,
//     canonical_name: row.canonical_name,
//     person_type: 'rabbi',
//     slug: row.slug,
//     birth_year: row.birth_year,
//     circa_birth: row.circa_birth,
//     death_year: row.death_year,
//     circa_death: row.circa_death,
//     biography: row.biography,
//     birthplace: row.birthplace,
//     death_place: row.death_place,
//     seminary: row.seminary,
//     ordination_year: row.ordination_year,
//     denomination: row.denomination,
//     languages: Array.isArray(row.languages) ? row.languages.join(', ') : null,
//     publications: row.publications,
//     achievements: row.achievements,
//     approved: row.approved,
//     deleted: row.deleted,
//     created_at: row.created_at,
//     updated_at: row.updated_at,
//     deleted_by: row.deleted_by,
//     deleted_at: row.deleted_at,
//   }
// }
//
// function convertRabbiToAffiliation(
//   row: Rabbi & { profile?: RabbiProfile | null; synagogue?: SynagogueRef | null }
// ): Affiliation {
//   return {
//     id: row.id,
//     synagogue_id: row.synagogue_id,
//     person_profile_id: row.profile_id || '',
//     affiliation_category: 'clergy',
//     role_title: row.title || 'Rabbi',
//     start_year: row.start_year,
//     end_year: row.end_year,
//     notes: row.notes,
//     approved: row.approved,
//     deleted: row.deleted,
//     created_at: row.created_at,
//     updated_at: row.created_at, // rabbis table has no updated_at
//     deleted_by: row.deleted_by,
//     deleted_at: row.deleted_at,
//     person_profile: row.profile ? convertRabbiProfileToPersonProfile(row.profile) : undefined,
//     synagogue: row.synagogue ?? undefined,
//   }
// }

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

// ── DEPRECATED: No longer needed after cutover ─────────────────────
// Deduplicated merged results from old + new tables. No longer needed
// now that we query only one table.
//
// function deduplicateById<T extends { id: string }>(items: T[]): T[] {
//   const seen = new Map<string, T>()
//   for (const item of items) {
//     seen.set(item.id, item)
//   }
//   return Array.from(seen.values())
// }
