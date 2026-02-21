-- Philadelphia Historical Synagogues - Data Import
--
-- This file provides instructions for importing the synagogue data.
-- The actual data import should be done via the web application's admin panel
-- or using the import script provided in the scripts/ directory.

-- ============================================================================
-- OPTION 1: Import via Admin Panel (Recommended)
-- ============================================================================
-- 1. Deploy the application
-- 2. Create an admin user account
-- 3. Log in and go to /admin/import
-- 4. Upload the synagogues_structured.json file
-- 5. Review and confirm the import

-- ============================================================================
-- OPTION 2: Import via Script
-- ============================================================================
-- Use the Node.js import script:
-- node scripts/import-data.js

-- ============================================================================
-- OPTION 3: Manual SQL Import (for testing)
-- ============================================================================
-- For testing purposes, here's a sample INSERT for one synagogue:

-- Create a test admin user first
INSERT INTO public.users (id, email, full_name, role)
VALUES (
  gen_random_uuid(),
  'admin@example.com',
  'Admin User',
  'admin'
);

-- Sample synagogue insert
INSERT INTO public.synagogues (name, founded_year, founded_text, status, approved)
VALUES (
  'Beth Sholom Congregation',
  1919,
  '1919',
  'active',
  true
) RETURNING id;

-- Sample address insert (use the synagogue id from above)
INSERT INTO public.addresses (
  synagogue_id,
  street_address,
  neighborhood,
  city,
  state,
  zip_code,
  latitude,
  longitude,
  is_current,
  geocode_quality
)
VALUES (
  '00000000-0000-0000-0000-000000000000', -- Replace with actual synagogue id
  '8231 Old York Road',
  'Elkins Park',
  'Philadelphia',
  'PA',
  '19027',
  40.0768,
  -75.1271,
  true,
  'exact'
);

-- Sample history entry
INSERT INTO public.history_entries (
  synagogue_id,
  entry_type,
  content,
  approved
)
VALUES (
  '00000000-0000-0000-0000-000000000000', -- Replace with actual synagogue id
  'building',
  'Frank Lloyd Wright designed building completed in 1959',
  true
);

-- ============================================================================
-- BULK IMPORT INSTRUCTIONS
-- ============================================================================
-- For the full dataset of 562 synagogues:
-- 
-- 1. Ensure schema.sql has been run successfully
-- 2. Use the provided import script:
--    npm run import-data
-- 
-- This will read from data/synagogues_structured.json and:
-- - Import all 562 synagogues
-- - Import all 458 addresses
-- - Import all 626 history entries
-- - Set all records as approved
-- - Handle proper relationships and foreign keys
--
-- ============================================================================

-- Verify your database is ready
DO $$
DECLARE
  table_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO table_count
  FROM information_schema.tables
  WHERE table_schema = 'public' 
    AND table_name IN ('synagogues', 'addresses', 'history_entries', 'users');
  
  IF table_count = 4 THEN
    RAISE NOTICE 'Database schema is ready for data import!';
    RAISE NOTICE 'Run: npm run import-data';
  ELSE
    RAISE WARNING 'Missing tables! Run schema.sql first.';
  END IF;
END $$;
