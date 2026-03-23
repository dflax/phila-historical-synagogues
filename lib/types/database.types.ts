// ============================================================
// DATABASE TYPES
// Source: Supabase project iocyggibgtvsujxmajhn
// Generated: 2026-03-22 (via REST API introspection)
// ============================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// ── Enums ────────────────────────────────────────────────────────────────────

export type PersonType = 'rabbi' | 'chazzan' | 'lay_leader' | 'staff' | 'other'
export type AffiliationCategory = 'clergy' | 'lay_leader' | 'staff' | 'other'

// ── Database interface ────────────────────────────────────────────────────────

export interface Database {
  public: {
    Tables: {

      // ── person_profiles ──────────────────────────────────────────────────
      person_profiles: {
        Row: {
          id: string
          canonical_name: string
          person_type: PersonType
          slug: string | null
          birth_year: number | null
          circa_birth: boolean
          death_year: number | null
          circa_death: boolean
          biography: string | null
          birthplace: string | null
          death_place: string | null
          seminary: string | null
          ordination_year: number | null
          denomination: string | null
          languages: string | null
          publications: string | null
          achievements: string | null
          approved: boolean
          deleted: boolean
          created_at: string
          updated_at: string
          deleted_by: string | null
          deleted_at: string | null
          search_vector: string | null
        }
        Insert: {
          id?: string
          canonical_name: string
          person_type: PersonType
          slug?: string | null
          birth_year?: number | null
          circa_birth?: boolean
          death_year?: number | null
          circa_death?: boolean
          biography?: string | null
          birthplace?: string | null
          death_place?: string | null
          seminary?: string | null
          ordination_year?: number | null
          denomination?: string | null
          languages?: string | null
          publications?: string | null
          achievements?: string | null
          approved?: boolean
          deleted?: boolean
          created_at?: string
          updated_at?: string
          deleted_by?: string | null
          deleted_at?: string | null
        }
        Update: {
          id?: string
          canonical_name?: string
          person_type?: PersonType
          slug?: string | null
          birth_year?: number | null
          circa_birth?: boolean
          death_year?: number | null
          circa_death?: boolean
          biography?: string | null
          birthplace?: string | null
          death_place?: string | null
          seminary?: string | null
          ordination_year?: number | null
          denomination?: string | null
          languages?: string | null
          publications?: string | null
          achievements?: string | null
          approved?: boolean
          deleted?: boolean
          updated_at?: string
          deleted_by?: string | null
          deleted_at?: string | null
        }
      }

      // ── affiliations ─────────────────────────────────────────────────────
      affiliations: {
        Row: {
          id: string
          synagogue_id: string
          person_profile_id: string
          affiliation_category: AffiliationCategory
          role_title: string
          start_year: number | null
          end_year: number | null
          notes: string | null
          approved: boolean
          deleted: boolean
          created_at: string
          updated_at: string
          deleted_by: string | null
          deleted_at: string | null
        }
        Insert: {
          id?: string
          synagogue_id: string
          person_profile_id: string
          affiliation_category: AffiliationCategory
          role_title: string
          start_year?: number | null
          end_year?: number | null
          notes?: string | null
          approved?: boolean
          deleted?: boolean
          created_at?: string
          updated_at?: string
          deleted_by?: string | null
          deleted_at?: string | null
        }
        Update: {
          id?: string
          synagogue_id?: string
          person_profile_id?: string
          affiliation_category?: AffiliationCategory
          role_title?: string
          start_year?: number | null
          end_year?: number | null
          notes?: string | null
          approved?: boolean
          deleted?: boolean
          updated_at?: string
          deleted_by?: string | null
          deleted_at?: string | null
        }
      }

      // ── person_relationships ─────────────────────────────────────────────
      person_relationships: {
        Row: {
          id: string
          person_id: string
          related_person_id: string
          relationship_type: string
          approved: boolean
          deleted: boolean
          created_at: string
          updated_at: string
          deleted_by: string | null
          deleted_at: string | null
        }
        Insert: {
          id?: string
          person_id: string
          related_person_id: string
          relationship_type: string
          approved?: boolean
          deleted?: boolean
          created_at?: string
          updated_at?: string
          deleted_by?: string | null
          deleted_at?: string | null
        }
        Update: {
          id?: string
          person_id?: string
          related_person_id?: string
          relationship_type?: string
          approved?: boolean
          deleted?: boolean
          updated_at?: string
          deleted_by?: string | null
          deleted_at?: string | null
        }
      }

      // ── synagogues ───────────────────────────────────────────────────────
      synagogues: {
        Row: {
          id: string
          name: string
          founded_year: number | null
          founded_text: string | null
          closed_year: number | null
          closed_text: string | null
          status: string | null
          created_at: string
          updated_at: string
          created_by: string | null
          approved: boolean
          approved_by: string | null
          approved_at: string | null
          search_vector: string | null
          deleted: boolean
          deleted_by: string | null
          deleted_at: string | null
        }
        Insert: {
          id?: string
          name: string
          founded_year?: number | null
          founded_text?: string | null
          closed_year?: number | null
          closed_text?: string | null
          status?: string | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
          approved?: boolean
          approved_by?: string | null
          approved_at?: string | null
          deleted?: boolean
          deleted_by?: string | null
          deleted_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          founded_year?: number | null
          founded_text?: string | null
          closed_year?: number | null
          closed_text?: string | null
          status?: string | null
          updated_at?: string
          created_by?: string | null
          approved?: boolean
          approved_by?: string | null
          approved_at?: string | null
          deleted?: boolean
          deleted_by?: string | null
          deleted_at?: string | null
        }
      }

      // ── addresses ────────────────────────────────────────────────────────
      addresses: {
        Row: {
          id: string
          synagogue_id: string
          street_address: string | null
          neighborhood: string | null
          city: string | null
          state: string | null
          zip_code: string | null
          latitude: number | null
          longitude: number | null
          is_current: boolean | null
          start_year: number | null
          end_year: number | null
          address_order: number | null
          geocode_quality: string | null
          geocoded_at: string | null
          created_at: string
          updated_at: string
          approved: boolean
          created_by: string | null
          deleted: boolean
          deleted_by: string | null
          deleted_at: string | null
        }
        Insert: {
          id?: string
          synagogue_id: string
          street_address?: string | null
          neighborhood?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          latitude?: number | null
          longitude?: number | null
          is_current?: boolean | null
          start_year?: number | null
          end_year?: number | null
          address_order?: number | null
          geocode_quality?: string | null
          geocoded_at?: string | null
          created_at?: string
          updated_at?: string
          approved?: boolean
          created_by?: string | null
          deleted?: boolean
          deleted_by?: string | null
          deleted_at?: string | null
        }
        Update: {
          id?: string
          synagogue_id?: string
          street_address?: string | null
          neighborhood?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          latitude?: number | null
          longitude?: number | null
          is_current?: boolean | null
          start_year?: number | null
          end_year?: number | null
          address_order?: number | null
          geocode_quality?: string | null
          geocoded_at?: string | null
          updated_at?: string
          approved?: boolean
          created_by?: string | null
          deleted?: boolean
          deleted_by?: string | null
          deleted_at?: string | null
        }
      }

      // ── history_entries ──────────────────────────────────────────────────
      history_entries: {
        Row: {
          id: string
          synagogue_id: string
          entry_type: string | null
          content: string | null
          year: number | null
          year_range_start: number | null
          year_range_end: number | null
          circa: boolean | null
          source: string | null
          source_url: string | null
          created_at: string
          created_by: string | null
          approved: boolean
          approved_by: string | null
          approved_at: string | null
          deleted: boolean
          deleted_by: string | null
          deleted_at: string | null
          display_order: number | null
        }
        Insert: {
          id?: string
          synagogue_id: string
          entry_type?: string | null
          content?: string | null
          year?: number | null
          year_range_start?: number | null
          year_range_end?: number | null
          circa?: boolean | null
          source?: string | null
          source_url?: string | null
          created_at?: string
          created_by?: string | null
          approved?: boolean
          approved_by?: string | null
          approved_at?: string | null
          deleted?: boolean
          deleted_by?: string | null
          deleted_at?: string | null
          display_order?: number | null
        }
        Update: {
          id?: string
          synagogue_id?: string
          entry_type?: string | null
          content?: string | null
          year?: number | null
          year_range_start?: number | null
          year_range_end?: number | null
          circa?: boolean | null
          source?: string | null
          source_url?: string | null
          updated_at?: string
          created_by?: string | null
          approved?: boolean
          approved_by?: string | null
          approved_at?: string | null
          deleted?: boolean
          deleted_by?: string | null
          deleted_at?: string | null
          display_order?: number | null
        }
      }

      // ── rabbis ───────────────────────────────────────────────────────────
      rabbis: {
        Row: {
          id: string
          synagogue_id: string
          name: string | null
          title: string | null
          start_year: number | null
          end_year: number | null
          notes: string | null
          created_at: string
          created_by: string | null
          approved: boolean
          deleted: boolean
          deleted_by: string | null
          deleted_at: string | null
          profile_id: string | null
        }
        Insert: {
          id?: string
          synagogue_id: string
          name?: string | null
          title?: string | null
          start_year?: number | null
          end_year?: number | null
          notes?: string | null
          created_at?: string
          created_by?: string | null
          approved?: boolean
          deleted?: boolean
          deleted_by?: string | null
          deleted_at?: string | null
          profile_id?: string | null
        }
        Update: {
          id?: string
          synagogue_id?: string
          name?: string | null
          title?: string | null
          start_year?: number | null
          end_year?: number | null
          notes?: string | null
          created_at?: string
          created_by?: string | null
          approved?: boolean
          deleted?: boolean
          deleted_by?: string | null
          deleted_at?: string | null
          profile_id?: string | null
        }
      }

      // ── rabbi_profiles ───────────────────────────────────────────────────
      rabbi_profiles: {
        Row: {
          id: string
          canonical_name: string
          birth_year: number | null
          circa_birth: boolean
          death_year: number | null
          circa_death: boolean
          biography: string | null
          slug: string | null
          created_by: string | null
          approved: boolean
          approved_by: string | null
          approved_at: string | null
          deleted: boolean
          deleted_by: string | null
          deleted_at: string | null
          created_at: string
          updated_at: string
          birthplace: string | null
          death_place: string | null
          seminary: string | null
          ordination_year: number | null
          denomination: string | null
          languages: string[] | null
          publications: string | null
          achievements: string | null
        }
        Insert: {
          id?: string
          canonical_name: string
          birth_year?: number | null
          circa_birth?: boolean
          death_year?: number | null
          circa_death?: boolean
          biography?: string | null
          slug?: string | null
          created_by?: string | null
          approved?: boolean
          approved_by?: string | null
          approved_at?: string | null
          deleted?: boolean
          deleted_by?: string | null
          deleted_at?: string | null
          created_at?: string
          updated_at?: string
          birthplace?: string | null
          death_place?: string | null
          seminary?: string | null
          ordination_year?: number | null
          denomination?: string | null
          languages?: string[] | null
          publications?: string | null
          achievements?: string | null
        }
        Update: {
          id?: string
          canonical_name?: string
          birth_year?: number | null
          circa_birth?: boolean
          death_year?: number | null
          circa_death?: boolean
          biography?: string | null
          slug?: string | null
          created_by?: string | null
          approved?: boolean
          approved_by?: string | null
          approved_at?: string | null
          deleted?: boolean
          deleted_by?: string | null
          deleted_at?: string | null
          updated_at?: string
          birthplace?: string | null
          death_place?: string | null
          seminary?: string | null
          ordination_year?: number | null
          denomination?: string | null
          languages?: string[] | null
          publications?: string | null
          achievements?: string | null
        }
      }

      // ── rabbi_relationships ──────────────────────────────────────────────
      rabbi_relationships: {
        Row: {
          id: string
          rabbi_id: string
          related_rabbi_id: string
          relationship_type: string
          notes: string | null
          created_by: string | null
          approved: boolean
          approved_by: string | null
          approved_at: string | null
          deleted: boolean
          deleted_by: string | null
          deleted_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          rabbi_id: string
          related_rabbi_id: string
          relationship_type: string
          notes?: string | null
          created_by?: string | null
          approved?: boolean
          approved_by?: string | null
          approved_at?: string | null
          deleted?: boolean
          deleted_by?: string | null
          deleted_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          rabbi_id?: string
          related_rabbi_id?: string
          relationship_type?: string
          notes?: string | null
          created_by?: string | null
          approved?: boolean
          approved_by?: string | null
          approved_at?: string | null
          deleted?: boolean
          deleted_by?: string | null
          deleted_at?: string | null
          updated_at?: string
        }
      }

      // ── synagogue_relationships ──────────────────────────────────────────
      synagogue_relationships: {
        Row: {
          id: string
          synagogue_id: string
          related_synagogue_id: string
          relationship_type: string
          relationship_year: number | null
          notes: string | null
          created_by: string | null
          approved: boolean
          approved_by: string | null
          approved_at: string | null
          deleted: boolean
          deleted_by: string | null
          deleted_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          synagogue_id: string
          related_synagogue_id: string
          relationship_type: string
          relationship_year?: number | null
          notes?: string | null
          created_by?: string | null
          approved?: boolean
          approved_by?: string | null
          approved_at?: string | null
          deleted?: boolean
          deleted_by?: string | null
          deleted_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          synagogue_id?: string
          related_synagogue_id?: string
          relationship_type?: string
          relationship_year?: number | null
          notes?: string | null
          created_by?: string | null
          approved?: boolean
          approved_by?: string | null
          approved_at?: string | null
          deleted?: boolean
          deleted_by?: string | null
          deleted_at?: string | null
          updated_at?: string
        }
      }

      // ── links ────────────────────────────────────────────────────────────
      links: {
        Row: {
          id: string
          entity_type: string
          entity_id: string
          link_type: string | null
          url: string
          title: string | null
          description: string | null
          display_order: number | null
          created_by: string | null
          approved: boolean
          approved_by: string | null
          approved_at: string | null
          deleted: boolean
          deleted_by: string | null
          deleted_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          entity_type: string
          entity_id: string
          link_type?: string | null
          url: string
          title?: string | null
          description?: string | null
          display_order?: number | null
          created_by?: string | null
          approved?: boolean
          approved_by?: string | null
          approved_at?: string | null
          deleted?: boolean
          deleted_by?: string | null
          deleted_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          entity_type?: string
          entity_id?: string
          link_type?: string | null
          url?: string
          title?: string | null
          description?: string | null
          display_order?: number | null
          created_by?: string | null
          approved?: boolean
          approved_by?: string | null
          approved_at?: string | null
          deleted?: boolean
          deleted_by?: string | null
          deleted_at?: string | null
          updated_at?: string
        }
      }

      // ── images ───────────────────────────────────────────────────────────
      images: {
        Row: {
          id: string
          synagogue_id: string | null
          source_type: string | null
          url: string | null
          caption: string | null
          description: string | null
          year: number | null
          circa_year: boolean | null
          date_taken: string | null
          people_names: string[] | null
          people_metadata: Json | null
          photographer: string | null
          source: string | null
          credit_line: string | null
          copyright_holder: string | null
          usage_rights: string | null
          location_description: string | null
          latitude: number | null
          longitude: number | null
          original_filename: string | null
          file_size: number | null
          width: number | null
          height: number | null
          mime_type: string | null
          is_primary: boolean | null
          display_order: number | null
          tags: string[] | null
          uploaded_by: string | null
          approved: boolean
          approved_by: string | null
          approved_at: string | null
          created_at: string
          updated_at: string
          storage_provider: string | null
          storage_path: string | null
          uploaded_via_proposal: string | null
          deleted: boolean
          deleted_by: string | null
          deleted_at: string | null
          rabbi_profile_id: string | null
        }
        Insert: {
          id?: string
          synagogue_id?: string | null
          source_type?: string | null
          url?: string | null
          caption?: string | null
          description?: string | null
          year?: number | null
          circa_year?: boolean | null
          date_taken?: string | null
          people_names?: string[] | null
          people_metadata?: Json | null
          photographer?: string | null
          source?: string | null
          credit_line?: string | null
          copyright_holder?: string | null
          usage_rights?: string | null
          location_description?: string | null
          latitude?: number | null
          longitude?: number | null
          original_filename?: string | null
          file_size?: number | null
          width?: number | null
          height?: number | null
          mime_type?: string | null
          is_primary?: boolean | null
          display_order?: number | null
          tags?: string[] | null
          uploaded_by?: string | null
          approved?: boolean
          approved_by?: string | null
          approved_at?: string | null
          created_at?: string
          updated_at?: string
          storage_provider?: string | null
          storage_path?: string | null
          uploaded_via_proposal?: string | null
          deleted?: boolean
          deleted_by?: string | null
          deleted_at?: string | null
          rabbi_profile_id?: string | null
        }
        Update: {
          id?: string
          synagogue_id?: string | null
          source_type?: string | null
          url?: string | null
          caption?: string | null
          description?: string | null
          year?: number | null
          circa_year?: boolean | null
          date_taken?: string | null
          people_names?: string[] | null
          people_metadata?: Json | null
          photographer?: string | null
          source?: string | null
          credit_line?: string | null
          copyright_holder?: string | null
          usage_rights?: string | null
          location_description?: string | null
          latitude?: number | null
          longitude?: number | null
          original_filename?: string | null
          file_size?: number | null
          width?: number | null
          height?: number | null
          mime_type?: string | null
          is_primary?: boolean | null
          display_order?: number | null
          tags?: string[] | null
          uploaded_by?: string | null
          approved?: boolean
          approved_by?: string | null
          approved_at?: string | null
          updated_at?: string
          storage_provider?: string | null
          storage_path?: string | null
          uploaded_via_proposal?: string | null
          deleted?: boolean
          deleted_by?: string | null
          deleted_at?: string | null
          rabbi_profile_id?: string | null
        }
      }

      // ── edit_proposals ────────────────────────────────────────────────────
      edit_proposals: {
        Row: {
          id: string
          synagogue_id: string | null
          proposal_type: string
          proposed_data: Json | null
          current_data: Json | null
          created_by: string | null
          submitter_note: string | null
          status: string
          reviewed_by: string | null
          reviewed_at: string | null
          review_notes: string | null
          created_at: string
          updated_at: string
          entity_id: string | null
        }
        Insert: {
          id?: string
          synagogue_id?: string | null
          proposal_type: string
          proposed_data?: Json | null
          current_data?: Json | null
          created_by?: string | null
          submitter_note?: string | null
          status?: string
          reviewed_by?: string | null
          reviewed_at?: string | null
          review_notes?: string | null
          created_at?: string
          updated_at?: string
          entity_id?: string | null
        }
        Update: {
          id?: string
          synagogue_id?: string | null
          proposal_type?: string
          proposed_data?: Json | null
          current_data?: Json | null
          created_by?: string | null
          submitter_note?: string | null
          status?: string
          reviewed_by?: string | null
          reviewed_at?: string | null
          review_notes?: string | null
          updated_at?: string
          entity_id?: string | null
        }
      }

      // ── storage_config ────────────────────────────────────────────────────
      storage_config: {
        Row: {
          id: number
          provider: string
          base_url: string
          is_active: boolean
          config: Json | null
          created_at: string
        }
        Insert: {
          id?: number
          provider: string
          base_url: string
          is_active?: boolean
          config?: Json | null
          created_at?: string
        }
        Update: {
          id?: number
          provider?: string
          base_url?: string
          is_active?: boolean
          config?: Json | null
          created_at?: string
        }
      }

      // ── user_profiles ─────────────────────────────────────────────────────
      user_profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          role: string | null
          total_proposals: number | null
          approved_proposals: number | null
          rejected_proposals: number | null
          created_at: string
          updated_at: string
          last_login_at: string | null
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          role?: string | null
          total_proposals?: number | null
          approved_proposals?: number | null
          rejected_proposals?: number | null
          created_at?: string
          updated_at?: string
          last_login_at?: string | null
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          role?: string | null
          total_proposals?: number | null
          approved_proposals?: number | null
          rejected_proposals?: number | null
          updated_at?: string
          last_login_at?: string | null
        }
      }

    }

    Views: {
      [_ in never]: never
    }

    Functions: {
      [_ in never]: never
    }

    Enums: {
      person_type: PersonType
      affiliation_category: AffiliationCategory
    }

    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// ── Convenience row types ─────────────────────────────────────────────────────

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type TablesInsert<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']

export type TablesUpdate<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update']

export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T]
