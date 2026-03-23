// ===================================================================
// NEW LEADERSHIP DATA MODEL TYPES
// ===================================================================

export type PersonType = 'rabbi' | 'chazzan' | 'lay_leader' | 'staff' | 'other'

export type AffiliationCategory = 'clergy' | 'lay_leader' | 'staff' | 'other'

export interface PersonProfile {
  id: string
  canonical_name: string
  person_type: PersonType
  slug: string | null

  // Biographical
  birth_year: number | null
  circa_birth: boolean
  death_year: number | null
  circa_death: boolean
  biography: string | null
  birthplace: string | null
  death_place: string | null

  // Professional
  seminary: string | null
  ordination_year: number | null
  denomination: string | null
  languages: string | null
  publications: string | null
  achievements: string | null

  // Metadata
  approved: boolean
  deleted: boolean
  created_at: string
  updated_at: string
  deleted_by: string | null
  deleted_at: string | null

  // Search
  search_vector?: string
}

export interface Affiliation {
  id: string
  synagogue_id: string
  person_profile_id: string
  affiliation_category: AffiliationCategory
  role_title: string
  start_year: number | null
  end_year: number | null
  notes: string | null

  // Metadata
  approved: boolean
  deleted: boolean
  created_at: string
  updated_at: string
  deleted_by: string | null
  deleted_at: string | null

  // Joined data
  person_profile?: PersonProfile
  synagogue?: {
    id: string
    name: string
    status: string
  }
}

export interface PersonRelationship {
  id: string
  person_id: string
  related_person_id: string
  relationship_type: string

  // Metadata
  approved: boolean
  deleted: boolean
  created_at: string
  updated_at: string
  deleted_by: string | null
  deleted_at: string | null

  // Joined data
  person?: PersonProfile
  related_person?: PersonProfile
}

// Predefined role lists
export const CLERGY_ROLES = [
  'Rabbi',
  'Senior Rabbi',
  'Lead Rabbi',
  'Associate Rabbi',
  'Assistant Rabbi',
  'Rabbi Emeritus',
  'Cantor',
  'Chazzan',
  'Senior Cantor',
  'Cantor Emeritus',
  'Other',
] as const

export const LAY_LEADER_ROLES = [
  'President',
  'Vice President',
  'Treasurer',
  'Secretary',
  'Facilities Chair',
  'Security Chair',
  'Membership Chair',
  'Education Chair',
  'Social Action Chair',
  'Ritual Chair',
  'Community Engagement Chair',
  'Philanthropy Chair',
  'Other',
] as const

export const STAFF_ROLES = [
  'Executive Director',
  'Education Director',
  'Youth Director',
  'Administrator',
  'Office Manager',
  'Other',
] as const

export type ClergyRole = typeof CLERGY_ROLES[number]
export type LayLeaderRole = typeof LAY_LEADER_ROLES[number]
export type StaffRole = typeof STAFF_ROLES[number]

// Helper functions
export function getRolesByCategory(category: AffiliationCategory): readonly string[] {
  switch (category) {
    case 'clergy':
      return CLERGY_ROLES
    case 'lay_leader':
      return LAY_LEADER_ROLES
    case 'staff':
      return STAFF_ROLES
    case 'other':
      return ['Other']
    default:
      return []
  }
}

export function getPersonTypeLabel(type: PersonType): string {
  switch (type) {
    case 'rabbi':
      return 'Rabbi'
    case 'chazzan':
      return 'Cantor/Chazzan'
    case 'lay_leader':
      return 'Lay Leader'
    case 'staff':
      return 'Staff'
    case 'other':
      return 'Other'
    default:
      return type
  }
}

export function hasProfilePage(personType: PersonType): boolean {
  return personType === 'rabbi' || personType === 'chazzan'
}

export function generateSlug(name: string, personType: PersonType): string | null {
  if (!hasProfilePage(personType)) {
    return null
  }

  const normalized = name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()

  const prefix = personType === 'chazzan' ? 'chazzan' : 'rabbi'
  return `${prefix}-${normalized}`
}
