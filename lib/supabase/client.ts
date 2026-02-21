import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type definitions for our database tables
export type Synagogue = {
  id: string
  name: string
  founded_year: number | null
  founded_text: string | null
  closed_year: number | null
  closed_text: string | null
  status: 'active' | 'closed' | 'merged' | 'unknown'
  created_at: string
  updated_at: string
  approved: boolean
}

export type Address = {
  id: string
  synagogue_id: string
  street_address: string
  neighborhood: string | null
  city: string
  state: string
  zip_code: string | null
  latitude: number | null
  longitude: number | null
  is_current: boolean
  start_year: number | null
  end_year: number | null
  address_order: number
  geocode_quality: string | null
}

export type HistoryEntry = {
  id: string
  synagogue_id: string
  entry_type: 'ethnic_origin' | 'rabbi' | 'event' | 'building' | 'merger' | 'general'
  content: string
  year: number | null
  year_range_start: number | null
  year_range_end: number | null
  circa: boolean
  source: string | null
  approved: boolean
}

export type Image = {
  id: string
  synagogue_id: string
  source_type: 'hosted' | 'external'
  url: string
  caption: string
  year: number | null
  circa_year: boolean
  photographer: string | null
  people_names: string[] | null
  tags: string[] | null
  is_primary: boolean
  approved: boolean
}
