-- Philadelphia Historical Synagogues Database Schema
-- 
-- This schema creates all tables, functions, and policies for the application
-- Run this entire file in Supabase SQL Editor after creating your project

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- ============================================================================
-- TABLES
-- ============================================================================

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'contributor' CHECK (role IN ('admin', 'editor', 'contributor', 'viewer')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Synagogues table
CREATE TABLE public.synagogues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  
  -- Founding information
  founded_year INTEGER CHECK (founded_year >= 1600 AND founded_year <= EXTRACT(YEAR FROM CURRENT_DATE)),
  founded_text TEXT, -- Original text like "[1916]" or "circa 1920"
  
  -- Closure information
  closed_year INTEGER CHECK (closed_year >= founded_year),
  closed_text TEXT, -- Original text like "Merged with Beth Ami, 1875"
  status TEXT NOT NULL DEFAULT 'unknown' CHECK (status IN ('active', 'closed', 'merged', 'unknown')),
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES public.users(id),
  approved BOOLEAN DEFAULT false,
  approved_by UUID REFERENCES public.users(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  
  -- Search optimization
  search_vector tsvector GENERATED ALWAYS AS (
    to_tsvector('english', coalesce(name, ''))
  ) STORED
);

-- Addresses table
CREATE TABLE public.addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  synagogue_id UUID NOT NULL REFERENCES public.synagogues(id) ON DELETE CASCADE,
  
  -- Address details
  street_address TEXT NOT NULL,
  neighborhood TEXT,
  city TEXT NOT NULL DEFAULT 'Philadelphia',
  state TEXT NOT NULL DEFAULT 'PA',
  zip_code TEXT,
  
  -- Geospatial
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  location GEOGRAPHY(POINT, 4326) GENERATED ALWAYS AS (
    CASE 
      WHEN latitude IS NOT NULL AND longitude IS NOT NULL 
      THEN ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)::geography
      ELSE NULL
    END
  ) STORED,
  
  -- Temporal information
  is_current BOOLEAN DEFAULT false,
  start_year INTEGER CHECK (start_year >= 1600),
  end_year INTEGER CHECK (end_year >= start_year),
  address_order INTEGER DEFAULT 0, -- Order when multiple addresses
  
  -- Geocoding metadata
  geocode_quality TEXT, -- 'exact', 'approximate', 'intersection', 'manual'
  geocoded_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- History entries table
CREATE TABLE public.history_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  synagogue_id UUID NOT NULL REFERENCES public.synagogues(id) ON DELETE CASCADE,
  
  -- Content
  entry_type TEXT NOT NULL CHECK (entry_type IN ('ethnic_origin', 'rabbi', 'event', 'building', 'merger', 'general')),
  content TEXT NOT NULL,
  
  -- Temporal information
  year INTEGER CHECK (year >= 1600 AND year <= EXTRACT(YEAR FROM CURRENT_DATE) + 10),
  year_range_start INTEGER,
  year_range_end INTEGER CHECK (year_range_end >= year_range_start),
  circa BOOLEAN DEFAULT false,
  
  -- Source attribution
  source TEXT,
  source_url TEXT,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES public.users(id),
  approved BOOLEAN DEFAULT false,
  approved_by UUID REFERENCES public.users(id),
  approved_at TIMESTAMP WITH TIME ZONE
);

-- Rabbis table
CREATE TABLE public.rabbis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  synagogue_id UUID NOT NULL REFERENCES public.synagogues(id) ON DELETE CASCADE,
  
  -- Rabbi information
  name TEXT NOT NULL,
  title TEXT, -- 'Rabbi', 'Cantor', 'Reverend', etc.
  start_year INTEGER CHECK (start_year >= 1600),
  end_year INTEGER CHECK (end_year >= start_year),
  notes TEXT,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES public.users(id),
  approved BOOLEAN DEFAULT false
);

-- Images table
CREATE TABLE public.images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  synagogue_id UUID NOT NULL REFERENCES public.synagogues(id) ON DELETE CASCADE,
  
  -- Image source
  source_type TEXT NOT NULL CHECK (source_type IN ('hosted', 'external')),
  url TEXT NOT NULL,
  
  -- Metadata
  caption TEXT NOT NULL,
  description TEXT,
  year INTEGER CHECK (year >= 1600 AND year <= EXTRACT(YEAR FROM CURRENT_DATE)),
  circa_year BOOLEAN DEFAULT false,
  date_taken DATE,
  
  -- People in photo
  people_names TEXT[], -- Array of names
  people_metadata JSONB, -- Structured: [{name, role, x, y}]
  
  -- Attribution
  photographer TEXT,
  source TEXT,
  credit_line TEXT,
  copyright_holder TEXT,
  usage_rights TEXT,
  
  -- Location context
  location_description TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- File metadata
  original_filename TEXT,
  file_size INTEGER,
  width INTEGER,
  height INTEGER,
  mime_type TEXT,
  
  -- Organization
  is_primary BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  tags TEXT[],
  
  -- Approval workflow
  uploaded_by UUID REFERENCES public.users(id),
  approved BOOLEAN DEFAULT false,
  approved_by UUID REFERENCES public.users(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Edit proposals table (for community contributions)
CREATE TABLE public.edit_proposals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  synagogue_id UUID REFERENCES public.synagogues(id) ON DELETE CASCADE, -- NULL for new synagogues
  
  -- Proposal details
  proposal_type TEXT NOT NULL CHECK (proposal_type IN ('create', 'update', 'delete')),
  proposed_data JSONB NOT NULL, -- Complete proposed record
  current_data JSONB, -- Original data for updates
  change_summary TEXT, -- Human-readable summary of changes
  
  -- Status
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'needs_revision')),
  reviewer_notes TEXT,
  
  -- Tracking
  proposed_by UUID NOT NULL REFERENCES public.users(id),
  proposed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_by UUID REFERENCES public.users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Synagogues
CREATE INDEX idx_synagogues_name ON public.synagogues(name);
CREATE INDEX idx_synagogues_status ON public.synagogues(status);
CREATE INDEX idx_synagogues_founded_year ON public.synagogues(founded_year);
CREATE INDEX idx_synagogues_closed_year ON public.synagogues(closed_year);
CREATE INDEX idx_synagogues_approved ON public.synagogues(approved);
CREATE INDEX idx_synagogues_search ON public.synagogues USING gin(search_vector);

-- Addresses
CREATE INDEX idx_addresses_synagogue ON public.addresses(synagogue_id);
CREATE INDEX idx_addresses_neighborhood ON public.addresses(neighborhood);
CREATE INDEX idx_addresses_is_current ON public.addresses(is_current);
CREATE INDEX idx_addresses_location ON public.addresses USING gist(location);

-- History
CREATE INDEX idx_history_synagogue ON public.history_entries(synagogue_id);
CREATE INDEX idx_history_type ON public.history_entries(entry_type);
CREATE INDEX idx_history_year ON public.history_entries(year);
CREATE INDEX idx_history_approved ON public.history_entries(approved);

-- Rabbis
CREATE INDEX idx_rabbis_synagogue ON public.rabbis(synagogue_id);
CREATE INDEX idx_rabbis_name ON public.rabbis(name);

-- Images
CREATE INDEX idx_images_synagogue ON public.images(synagogue_id);
CREATE INDEX idx_images_year ON public.images(year);
CREATE INDEX idx_images_source_type ON public.images(source_type);
CREATE INDEX idx_images_approved ON public.images(approved);
CREATE INDEX idx_images_tags ON public.images USING gin(tags);

-- Edit Proposals
CREATE INDEX idx_proposals_synagogue ON public.edit_proposals(synagogue_id);
CREATE INDEX idx_proposals_status ON public.edit_proposals(status);
CREATE INDEX idx_proposals_proposed_by ON public.edit_proposals(proposed_by);

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_synagogues_updated_at BEFORE UPDATE ON public.synagogues
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_addresses_updated_at BEFORE UPDATE ON public.addresses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_images_updated_at BEFORE UPDATE ON public.images
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Function to search synagogues by location (radius in meters)
CREATE OR REPLACE FUNCTION search_synagogues_by_location(
  lat DECIMAL,
  lng DECIMAL,
  radius_meters INTEGER DEFAULT 1609 -- Default 1 mile
)
RETURNS TABLE (
  synagogue_id UUID,
  name TEXT,
  distance_meters DOUBLE PRECISION
) AS $$
BEGIN
  RETURN QUERY
  SELECT DISTINCT
    s.id,
    s.name,
    ST_Distance(
      a.location,
      ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography
    ) as distance
  FROM public.synagogues s
  JOIN public.addresses a ON s.id = a.synagogue_id
  WHERE ST_DWithin(
    a.location,
    ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography,
    radius_meters
  )
  AND s.approved = true
  ORDER BY distance;
END;
$$ LANGUAGE plpgsql;

-- Function to get synagogues active in a specific year
CREATE OR REPLACE FUNCTION get_synagogues_by_year(target_year INTEGER)
RETURNS TABLE (
  id UUID,
  name TEXT,
  founded_year INTEGER,
  closed_year INTEGER,
  status TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.id,
    s.name,
    s.founded_year,
    s.closed_year,
    s.status
  FROM public.synagogues s
  WHERE s.approved = true
    AND (s.founded_year IS NULL OR s.founded_year <= target_year)
    AND (s.closed_year IS NULL OR s.closed_year > target_year OR s.status = 'active');
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.synagogues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.history_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rabbis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.edit_proposals ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON public.users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Synagogues policies
CREATE POLICY "Anyone can view approved synagogues" ON public.synagogues
  FOR SELECT USING (approved = true OR auth.uid() = created_by);

CREATE POLICY "Authenticated users can create synagogues" ON public.synagogues
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Editors can approve synagogues" ON public.synagogues
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

-- Addresses policies
CREATE POLICY "Anyone can view addresses of approved synagogues" ON public.addresses
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.synagogues
      WHERE id = synagogue_id AND approved = true
    )
  );

CREATE POLICY "Authenticated users can create addresses" ON public.addresses
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- History entries policies
CREATE POLICY "Anyone can view approved history" ON public.history_entries
  FOR SELECT USING (
    approved = true OR auth.uid() = created_by
  );

CREATE POLICY "Authenticated users can create history entries" ON public.history_entries
  FOR INSERT WITH CHECK (auth.uid() = created_by);

-- Rabbis policies
CREATE POLICY "Anyone can view approved rabbis" ON public.rabbis
  FOR SELECT USING (
    approved = true OR auth.uid() = created_by
  );

CREATE POLICY "Authenticated users can add rabbis" ON public.rabbis
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Images policies
CREATE POLICY "Anyone can view approved images" ON public.images
  FOR SELECT USING (
    approved = true OR auth.uid() = uploaded_by
  );

CREATE POLICY "Authenticated users can upload images" ON public.images
  FOR INSERT WITH CHECK (auth.uid() = uploaded_by);

-- Edit proposals policies
CREATE POLICY "Users can view their own proposals" ON public.edit_proposals
  FOR SELECT USING (auth.uid() = proposed_by);

CREATE POLICY "Editors can view all proposals" ON public.edit_proposals
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

CREATE POLICY "Authenticated users can create proposals" ON public.edit_proposals
  FOR INSERT WITH CHECK (auth.uid() = proposed_by);

CREATE POLICY "Editors can update proposals" ON public.edit_proposals
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

-- ============================================================================
-- STORAGE BUCKETS (Run after schema is created)
-- ============================================================================

-- Create storage bucket for synagogue images
-- Note: This needs to be run in Supabase dashboard Storage section or via API
-- INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
-- VALUES (
--   'synagogue-images',
--   'synagogue-images',
--   true,
--   5242880, -- 5MB limit
--   ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
-- );

-- ============================================================================
-- GRANT PERMISSIONS
-- ============================================================================

-- Grant access to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- Grant read access to anonymous users (for public viewing)
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;
GRANT EXECUTE ON FUNCTION search_synagogues_by_location TO anon;
GRANT EXECUTE ON FUNCTION get_synagogues_by_year TO anon;

-- ============================================================================
-- COMPLETION
-- ============================================================================

-- Verify setup
DO $$
BEGIN
  RAISE NOTICE 'Schema creation complete!';
  RAISE NOTICE 'Tables created: %, %, %, %, %, %, %',
    (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'users'),
    (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'synagogues'),
    (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'addresses'),
    (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'history_entries'),
    (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'rabbis'),
    (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'images'),
    (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'edit_proposals');
END $$;
