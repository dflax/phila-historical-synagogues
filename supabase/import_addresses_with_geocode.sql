-- ============================================================================
-- Philadelphia Historical Synagogues - Addresses Import
-- ============================================================================
-- This imports all geocoded addresses and links them to synagogues
-- Run this AFTER importing synagogues (import_data_fixed.sql)
-- ============================================================================

-- Step 1: Insert addresses with geocoded data
-- We'll use the synagogue name to look up the ID

-- 1. A.M. Burd's Shul (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'Westview & Wissahickon Ave',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'A.M. Burd''s Shul'
LIMIT 1;

-- 2. Abraham Potash Shtiebl [Reverend] (confidence: 0.81)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1031 Wyoming Ave',
  'Feltonville',
  'Philadelphia',
  'PA',
  NULL,
  40.0190198,
  -75.1040591,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Abraham Potash Shtiebl [Reverend]'
LIMIT 1;

-- 3. Achdus B'nai Israel. See, B'nai Israel @ E. Erie (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '540 W. Erie Ave',
  NULL,
  'Philadelphia',
  'PA',
  '19140',
  40.00733795,
  -75.13853991016958,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Achdus B''nai Israel. See, B''nai Israel @ E. Erie'
LIMIT 1;

-- 4. Adas Moishe Montefiore (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '2911 N.9th St',
  NULL,
  'Philadelphia',
  'PA',
  '19133',
  39.99619395,
  -75.14520386391821,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Adas Moishe Montefiore'
LIMIT 1;

-- 5. Adat Beyt Mosheh.                                                           Also, [The] Colored Hebrew Community (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1700 W. Girard Ave',
  NULL,
  'Philadelphia',
  'PA',
  '19130',
  39.972021,
  -75.164455,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Adat Beyt Mosheh.                                                           Also, [The] Colored Hebrew Community'
LIMIT 1;

-- 6. Adath Israel (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '832 N. Marshall St',
  NULL,
  'Philadelphia',
  'PA',
  '19123',
  39.966804183673474,
  -75.14811544897958,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Adath Israel'
LIMIT 1;

-- 7. Adath Israel Nusach Sfard (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '224 Christian St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19146',
  39.9361244,
  -75.14798370678031,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Adath Israel Nusach Sfard'
LIMIT 1;

-- 8. Adath Israel of the Main Line (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '250 North Highland Ave (at Old Lancaster Rd)',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Adath Israel of the Main Line'
LIMIT 1;

-- 9. Adath Jeshurun (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '7763 Old York Rd',
  'West Oak Lane',
  'Philadelphia',
  'PA',
  NULL,
  40.0701423,
  -75.1332109,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Adath Jeshurun'
LIMIT 1;

-- 10. Adath Jeshurun Havurah (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '7763 Old York Rd',
  'West Oak Lane',
  'Philadelphia',
  'PA',
  NULL,
  40.0701423,
  -75.1332109,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Adath Jeshurun Havurah'
LIMIT 1;

-- 11. Adath Jeshurun Talmud Torah Congregation. Also, Ezras Israel; [The] Carpenter's Shul (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '2113 S. 6th St (at Cantrell St)',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Adath Jeshurun Talmud Torah Congregation. Also, Ezras Israel; [The] Carpenter''s Shul'
LIMIT 1;

-- 12. Adath Shalom (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '607 Ritner St          (at Marshall St)',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Adath Shalom'
LIMIT 1;

-- 13. Adath Shalom (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '8022 Rugby St',
  NULL,
  'Philadelphia',
  'PA',
  '19150',
  40.07114371428571,
  -75.17160866666667,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Adath Shalom'
LIMIT 1;

-- 14. Adath Tikvah - Montefiore (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1630 Hoffnagle St',
  NULL,
  'Philadelphia',
  'PA',
  '19152',
  40.06910763265306,
  -75.05921712244898,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Adath Tikvah - Montefiore'
LIMIT 1;

-- 15. Adath Tikvah of Whitaker Ave (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '7838 Whitaker Ave',
  NULL,
  'Philadelphia',
  'PA',
  '19111',
  40.06546,
  -75.0697645638279,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Adath Tikvah of Whitaker Ave'
LIMIT 1;

-- 16. Adath Zion Synagogue. See, Frankford Hebrew Congregation (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '7101 Pennway St (@ Friendship St)',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Adath Zion Synagogue. See, Frankford Hebrew Congregation'
LIMIT 1;

-- 17. Agudas Achim Rumanian Congregation. Also see, Or Chudosh; Or Chodash-Agudas Achim; Or Chudosh- Agudas Achim -- Rumanian American Congregation (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '512 S. 3rd St',
  'Center City',
  'Philadelphia',
  'PA',
  '19147',
  39.94217035,
  -75.14766624729768,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Agudas Achim Rumanian Congregation. Also see, Or Chudosh; Or Chodash-Agudas Achim; Or Chudosh- Agudas Achim -- Rumanian American Congregation'
LIMIT 1;

-- 18. Agudas Israel (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '2401 N. 59th St',
  NULL,
  'Philadelphia',
  'PA',
  '19131',
  39.990302,
  -75.244053,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Agudas Israel'
LIMIT 1;

-- 19. Agudath Achim (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '5944 Catherine St',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Agudath Achim'
LIMIT 1;

-- 20. Agudath Israel (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '4735 Old York Rd',
  NULL,
  'Philadelphia',
  'PA',
  '19141',
  40.0255745,
  -75.14609600036664,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Agudath Israel'
LIMIT 1;

-- 21. Ahavas Achim Anshe Vitebsk (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1929 S. 6th St.',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19148',
  39.924168,
  -75.15619727027027,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Ahavas Achim Anshe Vitebsk'
LIMIT 1;

-- 22. Ahavas Achim Podolier Verein Anshe Sfard. Also, [Chevra] Ahavas Achim (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '320 Catherine St.',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Ahavas Achim Podolier Verein Anshe Sfard. Also, [Chevra] Ahavas Achim'
LIMIT 1;

-- 23. Ahavas Achim Talmud Torah Congregation. Also, Island Road Synagogue (confidence: 0.5)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '3012 S. 80th St',
  NULL,
  'Philadelphia',
  'PA',
  '19153',
  39.902192,
  -75.247136,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Ahavas Achim Talmud Torah Congregation. Also, Island Road Synagogue'
LIMIT 1;

-- 24. Ahavas Chesed Anshe Shavel [Chevra] (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '322 Bainbridge St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19147',
  39.94031075,
  -75.14884978323764,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Ahavas Chesed Anshe Shavel [Chevra]'
LIMIT 1;

-- 25. Ahavas Israel (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '29 W. Rittenhouse St',
  NULL,
  'Philadelphia',
  'PA',
  '19144',
  40.0373478,
  -75.17728601537362,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Ahavas Israel'
LIMIT 1;

-- 26. Ahavas Israel (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '322 Bainbridge St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19147',
  39.94031075,
  -75.14884978323764,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Ahavas Israel'
LIMIT 1;

-- 27. Ahavas Israel Anshe Kensington. Also, Ahavath Israel of Kensington (confidence: 0.5)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '2302-4 N. Mascher St',
  NULL,
  'Philadelphia',
  'PA',
  '19140',
  39.992728,
  -75.132552,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Ahavas Israel Anshe Kensington. Also, Ahavath Israel of Kensington'
LIMIT 1;

-- 28. Ahavas Israel.                                                                 Also, [Chevra] Ahavas Israel Anshe Sfard (confidence: 0.5)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '3900/1 Brown St',
  NULL,
  'Philadelphia',
  'PA',
  '19139',
  39.966438,
  -75.2153426,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Ahavas Israel.                                                                 Also, [Chevra] Ahavas Israel Anshe Sfard'
LIMIT 1;

-- 29. Ahavas Torah (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1425 Rhawn St',
  NULL,
  'Philadelphia',
  'PA',
  '19111',
  40.06819515,
  -75.0648439104983,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Ahavas Torah'
LIMIT 1;

-- 30. Ahavas Torah Congregation (confidence: 0.5)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1937 Franklin St',
  'Society Hill',
  'Philadelphia',
  'PA',
  '19147',
  39.942834,
  -75.154588,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Ahavas Torah Congregation'
LIMIT 1;

-- 31. Ahavath Zion (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '815 S. 4th St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19147',
  39.93773795,
  -75.14986094786876,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Ahavath Zion'
LIMIT 1;

-- 32. Aitz Chaim (confidence: 0.405)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1420 Walnut Sts',
  'Rittenhouse',
  'Philadelphia',
  'PA',
  '19102-4016',
  39.949165,
  -75.165507,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Aitz Chaim'
LIMIT 1;

-- 33. Aitz Chaim (confidence: 0.2222222222222222)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '7th & Dickinson Sts',
  'Stadium District',
  'Philadelphia',
  'PA',
  NULL,
  39.911666,
  -75.15976,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Aitz Chaim'
LIMIT 1;

-- 34. Aitz Chaim Synagogue Center (confidence: 0.5)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '7600 Summerdale Ave',
  'Northwood',
  'Philadelphia',
  'PA',
  NULL,
  40.026671,
  -75.097489,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Aitz Chaim Synagogue Center'
LIMIT 1;

-- 35. Aitz Chaim VeZichron Jacob (confidence: 0.81)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '3209 Cumberland St',
  'Strawberry Mansion',
  'Philadelphia',
  'PA',
  NULL,
  39.994666,
  -75.1845957,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Aitz Chaim VeZichron Jacob'
LIMIT 1;

-- 36. Aitz Chaim. Also, Heiner Fiscal "chicken foot" Shul; Kaiserman Shul (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '4166 Viola St',
  NULL,
  'Philadelphia',
  'PA',
  '19104',
  39.97508844214399,
  -75.20866216576833,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Aitz Chaim. Also, Heiner Fiscal "chicken foot" Shul; Kaiserman Shul'
LIMIT 1;

-- 37. Anshe Birz. See, [Chevra] Poale Zedek-Anshe Birz (confidence: 0.25515)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '6th and South Sts',
  'Old City',
  'Philadelphia',
  'PA',
  '19106',
  39.950677,
  -75.150665,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Anshe Birz. See, [Chevra] Poale Zedek-Anshe Birz'
LIMIT 1;

-- 38. Anshe Emeth. Also, Aitz Chaim (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1537 S. 7th St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19147',
  39.92925195,
  -75.15655726167608,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Anshe Emeth. Also, Aitz Chaim'
LIMIT 1;

-- 39. Anshe Emeth. See, B'nai Halberstam (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'New Market St above Poplar St',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Anshe Emeth. See, B''nai Halberstam'
LIMIT 1;

-- 40. Anshe Hisan. Also, Chevra Heisner; Heisinger Congregation; Hesiner Independent Young Men's Society (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1729 S.6th St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19148',
  39.92661,
  -75.155648,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Anshe Hisan. Also, Chevra Heisner; Heisinger Congregation; Hesiner Independent Young Men''s Society'
LIMIT 1;

-- 41. Anshe Kuppel Vohliner. Also, Chevra Vohliner Anshe Kuppel (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '928 S. 6th St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19147',
  39.937503285714286,
  -75.15344357142857,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Anshe Kuppel Vohliner. Also, Chevra Vohliner Anshe Kuppel'
LIMIT 1;

-- 42. Anshe Lubowitz nusach Ari [Chevra]                           Also, Chevra Mishnais Anshe Lubavitch (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '951 N. Franklin St',
  NULL,
  'Philadelphia',
  'PA',
  '19123',
  39.96825577181208,
  -75.14933539597315,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Anshe Lubowitz nusach Ari [Chevra]                           Also, Chevra Mishnais Anshe Lubavitch'
LIMIT 1;

-- 43. Anshe Ostropolier (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '916 N. Franklin St',
  NULL,
  'Philadelphia',
  'PA',
  '19123',
  39.96800004697987,
  -75.1496080067114,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Anshe Ostropolier'
LIMIT 1;

-- 44. Anshe Sholem (confidence: 0.5)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1924-6 Germantown Ave',
  NULL,
  'Philadelphia',
  'PA',
  '19140',
  40.0164409,
  -75.1541329,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Anshe Sholem'
LIMIT 1;

-- 45. Anshe Shulamit (confidence: 0.2222222222222222)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '4th & Poplar Sts',
  'West Poplar',
  'Philadelphia',
  'PA',
  NULL,
  39.969332,
  -75.157475,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Anshe Shulamit'
LIMIT 1;

-- 46. Anshe Wohliner (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '322 Bainbridge St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19147',
  39.94031075,
  -75.14884978323764,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Anshe Wohliner'
LIMIT 1;

-- 47. Atereth Israel of Overbrook (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1243 N. 60th St',
  NULL,
  'Philadelphia',
  'PA',
  '19151',
  39.97104355,
  -75.23909050028402,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Atereth Israel of Overbrook'
LIMIT 1;

-- 48. Atereth Israel.                                                                  Also, [Chevra] Ateres Anshe Brohin V'Choimetsh (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1638 S. 6th St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19148',
  39.92768305,
  -75.15571659608386,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Atereth Israel.                                                                  Also, [Chevra] Ateres Anshe Brohin V''Choimetsh'
LIMIT 1;

-- 49. Atereth Israel. (Previously B'nai Aruyh Moshel) Also, Jewish Farmers' Shul (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '3119 S. 84th St',
  NULL,
  'Philadelphia',
  'PA',
  '19153',
  39.89419933838384,
  -75.24646715151516,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Atereth Israel. (Previously B''nai Aruyh Moshel) Also, Jewish Farmers'' Shul'
LIMIT 1;

-- 50. Austrian Galizianer Shul. Also, Ohavas Achim Ostreicher (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '507 Tasker St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19145',
  39.9288243,
  -75.1543096931848,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Austrian Galizianer Shul. Also, Ohavas Achim Ostreicher'
LIMIT 1;

-- 51. Austro-Hungarian Congregation.                                Also, [Chevra] Re'im Ahuvim (confidence: 0.5)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '5884 Overbrook Ave.',
  NULL,
  'Philadelphia',
  'PA',
  '19131',
  39.995025,
  -75.232667,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Austro-Hungarian Congregation.                                Also, [Chevra] Re''im Ahuvim'
LIMIT 1;

-- 52. B'nai Aaron (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '53rd & Euclid Sts 1713 Georges Lane',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Aaron'
LIMIT 1;

-- 53. B'nai Aaron of Parkside (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1713 N. 42nd St',
  NULL,
  'Philadelphia',
  'PA',
  '19104',
  39.975254928571424,
  -75.21010728571429,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Aaron of Parkside'
LIMIT 1;

-- 54. B'nai Abraham (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '3040 N.22nd St',
  NULL,
  'Philadelphia',
  'PA',
  '19132',
  40.00113057575758,
  -75.16647181818182,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Abraham'
LIMIT 1;

-- 55. B'nai Abraham Jewish Center (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '9037 Eastview St',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Abraham Jewish Center'
LIMIT 1;

-- 56. B'nai Abraham- Anshe Russ.                                       Also, [Chevra] B'nai Abraham; Di Rusishe Shul; (confidence: 0.5)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '521-27 Lombard St',
  'Center City',
  'Philadelphia',
  'PA',
  '19146',
  39.946843,
  -75.182807,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Abraham- Anshe Russ.                                       Also, [Chevra] B''nai Abraham; Di Rusishe Shul;'
LIMIT 1;

-- 57. B'nai David (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '3221 W. Clifford St',
  NULL,
  'Philadelphia',
  'PA',
  '19121',
  39.98331198562262,
  -75.18716044490456,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai David'
LIMIT 1;

-- 58. B'nai David Congregation (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '418 Lombard St',
  'Center City',
  'Philadelphia',
  'PA',
  '19147',
  39.94259365306122,
  -75.14935536734693,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai David Congregation'
LIMIT 1;

-- 59. B'nai Ephraim (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '715 Fairmount Ave',
  NULL,
  'Philadelphia',
  'PA',
  '19123',
  39.96426455,
  -75.14983935000001,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Ephraim'
LIMIT 1;

-- 60. B'nai Halberstam.  Also, Anshe Emet; B'nai Israel-Halberstam; B'nai Israel-Ohev Zedek; B'nai Israel-Ohev Zedek-B'nai Halberstam (confidence: 0.5103)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '610 N. 6th St (at Green)',
  'East Poplar',
  'Philadelphia',
  'PA',
  '19123',
  39.96278,
  -75.148487,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Halberstam.                                                              Also, Anshe Emet; B''nai Israel-Halberstam; B''nai Israel-Ohev Zedek; B''nai Israel-Ohev Zedek-B''nai Halberstam '
LIMIT 1;

-- 61. B'nai Israel (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1214 S. 3rd St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19147',
  39.9327846,
  -75.14962539999999,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Israel'
LIMIT 1;

-- 62. B'nai Israel (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1709 N. 22nd St',
  NULL,
  'Philadelphia',
  'PA',
  '19121',
  39.98058497959184,
  -75.17073697959184,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Israel'
LIMIT 1;

-- 63. B'nai Israel (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '4024 Lancaster Ave',
  NULL,
  'Philadelphia',
  'PA',
  '19104',
  39.96356966666667,
  -75.20320533333333,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Israel'
LIMIT 1;

-- 64. B'nai Israel (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '922 S. 4th St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19147',
  39.93645202799076,
  -75.15044012619279,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Israel'
LIMIT 1;

-- 65. B'nai Israel (confidence: 0.81)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '942 Ruscomb St',
  NULL,
  'Philadelphia',
  'PA',
  '19141',
  40.02809510526316,
  -75.13947747368421,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Israel'
LIMIT 1;

-- 66. B'nai Israel (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'NE Corner, 3rd & Manton Sts',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Israel'
LIMIT 1;

-- 67. B'nai Israel (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'SW corner Tulip & Auburn Sts',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Israel'
LIMIT 1;

-- 68. B'nai Israel Anshe Polin (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '324 Fitzwater St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19147',
  39.9389565,
  -75.14906036716127,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Israel Anshe Polin'
LIMIT 1;

-- 69. B'nai Israel of Olney (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '307 W. Tabor Rd',
  NULL,
  'Philadelphia',
  'PA',
  '19141',
  40.03418495,
  -75.12849529818077,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Israel of Olney'
LIMIT 1;

-- 70. B'nai Israel-Ohev Zedek. See, B'nai Halberstam (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '8201 Castor Ave',
  NULL,
  'Philadelphia',
  'PA',
  '19152',
  40.0642412,
  -75.0532254,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Israel-Ohev Zedek. See, B''nai Halberstam'
LIMIT 1;

-- 71. B'nai Israel. Also, Ahdus B'nai Israel (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '540 E. Erie Ave',
  NULL,
  'Philadelphia',
  'PA',
  '19140',
  40.00736769387756,
  -75.13730951020408,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Israel. Also, Ahdus B''nai Israel'
LIMIT 1;

-- 72. B'nai Jacob (confidence: 0.5)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1927-9 N. 31st St',
  NULL,
  'Philadelphia',
  'PA',
  '19104',
  39.9612679,
  -75.1870437,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Jacob'
LIMIT 1;

-- 73. B'nai Jacob (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'Starr & Manavon Sts',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Jacob'
LIMIT 1;

-- 74. B'nai Jacob - Dirshu Tov (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1147 Gilham St',
  NULL,
  'Philadelphia',
  'PA',
  '19111',
  40.04453885,
  -75.08095919689406,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Jacob - Dirshu Tov'
LIMIT 1;

-- 75. B'nai Jacob Anshe Sfard (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '323 N. 2nd St',
  'Center City',
  'Philadelphia',
  'PA',
  '19106',
  39.956168,
  -75.142278,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Jacob Anshe Sfard'
LIMIT 1;

-- 76. B'nai Jacob. Also, Kesher Israel (confidence: 0.5)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '418 Lombard S',
  'Hawthorne',
  'Philadelphia',
  'PA',
  '19110',
  39.943587,
  -75.165563,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Jacob. Also, Kesher Israel'
LIMIT 1;

-- 77. B'nai Jeshurun. Also, B'nai Jeshurun of Mount Airy (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '33rd & Parkway Sts., (between Diamond St & Susquehanna Ave)',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Jeshurun. Also, B''nai Jeshurun of Mount Airy'
LIMIT 1;

-- 78. B'nai Joseph (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '525 Bainbridge St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19147',
  39.941138,
  -75.151818,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Joseph'
LIMIT 1;

-- 79. B'nai Joshua (confidence: 0.81)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '5343 Berks St',
  NULL,
  'Philadelphia',
  'PA',
  '19131',
  39.986263,
  -75.230466,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Joshua'
LIMIT 1;

-- 80. B'nai Menasha (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '722 N. 38th St',
  NULL,
  'Philadelphia',
  'PA',
  '19104',
  39.9665404,
  -75.1981007,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Menasha'
LIMIT 1;

-- 81. B'nai Menasha. Also, The White Shul (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '2339 N. 31st St (at Arizona St)',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Menasha. Also, The White Shul'
LIMIT 1;

-- 82. B'nai Moishe (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '3836 N. 18th St',
  NULL,
  'Philadelphia',
  'PA',
  '19140',
  40.01211438775511,
  -75.15726806122449,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Moishe'
LIMIT 1;

-- 83. B'nai Moishe Anshe Sefard. Also, B'nai Moshe - Poale Zedek (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1711 S. 5th St (at Watkins)',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Moishe Anshe Sefard. Also, B''nai Moshe - Poale Zedek'
LIMIT 1;

-- 84. B'nai Moses Montefiore Anshe Polin (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '342 Queen St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19147',
  39.937429,
  -75.14997594146428,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Moses Montefiore Anshe Polin'
LIMIT 1;

-- 85. B'nai Moshe Gomel Chesed Shel Emes (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '314 Catherine St',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Moshe Gomel Chesed Shel Emes'
LIMIT 1;

-- 86. B'nai Nahum. Also, B'nai Nachman (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '2126 N. 16th St',
  NULL,
  'Philadelphia',
  'PA',
  '19121',
  39.98636,
  -75.15966,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Nahum. Also, B''nai Nachman'
LIMIT 1;

-- 87. B'nai Reuben Anshe Sephard [Chevra] (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '615 S. 6th St (at Kater St)',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Reuben Anshe Sephard [Chevra]'
LIMIT 1;

-- 88. B'nai Sholom (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '4858 N. 7th St',
  NULL,
  'Philadelphia',
  'PA',
  '19120',
  40.02563080927716,
  -75.13669848588684,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Sholom'
LIMIT 1;

-- 89. B'nai Shram (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '521 Lombard St',
  'Center City',
  'Philadelphia',
  'PA',
  '19147',
  39.94286178205128,
  -75.15151203846153,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Shram'
LIMIT 1;

-- 90. B'nai Torah (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '11082 Knights Rd',
  NULL,
  'Philadelphia',
  'PA',
  '19154',
  40.08367815,
  -74.9753538679752,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Torah'
LIMIT 1;

-- 91. B'nai Yehoshua (confidence: 0.81)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '5343 Berks St',
  NULL,
  'Philadelphia',
  'PA',
  '19131',
  39.986263,
  -75.230466,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Yehoshua'
LIMIT 1;

-- 92. B'nai Yitzchok (confidence: 0.5)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '243 E. Roosevelt Blvd',
  NULL,
  'Philadelphia',
  'PA',
  '19140',
  40.0204965,
  -75.1408634,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Yitzchok'
LIMIT 1;

-- 93. B'nai Zion (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '532 Pine St',
  'Center City',
  'Philadelphia',
  'PA',
  '19147',
  39.94366345,
  -75.15160898252033,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Zion'
LIMIT 1;

-- 94. B'nai Zwi (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '5821 Upland Way (at Wanamaker St)',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'B''nai Zwi'
LIMIT 1;

-- 95. Beit Harambam (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '9981 Verree Rd',
  NULL,
  'Philadelphia',
  'PA',
  '19115',
  40.10366625,
  -75.03495358855574,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Beit Harambam'
LIMIT 1;

-- 96. Bessarbier Talmud Torah (confidence: 0.7290000000000001)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1627 S. 6th St (nr Mountain St)',
  'Old City',
  'Philadelphia',
  'PA',
  NULL,
  39.9279639,
  -75.155461,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Bessarbier Talmud Torah'
LIMIT 1;

-- 97. Beth Abraham (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '3040 N. 22nd St',
  NULL,
  'Philadelphia',
  'PA',
  '19132',
  40.00113057575758,
  -75.16647181818182,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Abraham'
LIMIT 1;

-- 98. Beth Ahavah (confidence: 0.45927)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '615 N Broad St 8 Leticia St',
  NULL,
  'Philadelphia',
  'PA',
  '19123',
  39.9637089,
  -75.16049076650438,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Ahavah'
LIMIT 1;

-- 99. Beth Am Israel (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1301 Hagys Ford Rd',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Am Israel'
LIMIT 1;

-- 100. Beth Ami (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '9201 Bustleton Ave',
  NULL,
  'Philadelphia',
  'PA',
  '19115',
  40.081479,
  -75.041355,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Ami'
LIMIT 1;

-- 101. Beth Chaim (confidence: 0.81)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '350 East Street Rd',
  'Feltonville',
  'Philadelphia',
  'PA',
  '19120-3910',
  40.022995,
  -75.118548,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Chaim'
LIMIT 1;

-- 102. Beth Chaim Reform Congregation (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '389 Conestoga Rd',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Chaim Reform Congregation'
LIMIT 1;

-- 103. Beth David (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '328 Catherine St',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Beth David'
LIMIT 1;

-- 104. Beth David Reform (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1130 Vaughans Lane',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Beth David Reform'
LIMIT 1;

-- 105. Beth El (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'Maryland & Lowber Sts',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Beth El'
LIMIT 1;

-- 106. Beth El Emeth (confidence: 0.1860465116279069)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'Franklin St above Green St',
  'Haddington',
  'Philadelphia',
  'PA',
  NULL,
  39.961208,
  -75.230373,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Beth El Emeth'
LIMIT 1;

-- 107. Beth El of Bucks County (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '375 Stony Hill Rd',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Beth El of Bucks County'
LIMIT 1;

-- 108. Beth El-Ner Tamid (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '715 Paxon Hollow',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Beth El-Ner Tamid'
LIMIT 1;

-- 109. Beth El, Suburban (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '715 Paxon Hollow Rd',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Beth El, Suburban'
LIMIT 1;

-- 110. Beth El: Also Rothschild Memorial Synagogue (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '58th & Walnut Sts',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Beth El: Also Rothschild Memorial Synagogue'
LIMIT 1;

-- 111. Beth Elohim (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '16th St & Columbia Ave',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Elohim'
LIMIT 1;

-- 112. Beth Elohim. Also, Krakauer-Beth Elohim Beneficial Association; [The] Hollander Shul; B'nai Israel (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '510 S. 5th St',
  'Center City',
  'Philadelphia',
  'PA',
  '19148',
  39.9424911,
  -75.15079123813558,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Elohim. Also, Krakauer-Beth Elohim Beneficial Association; [The] Hollander Shul; B''nai Israel'
LIMIT 1;

-- 113. Beth Emeth. (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '5217 Woodland Ave',
  NULL,
  'Philadelphia',
  'PA',
  '19143',
  39.937894666666665,
  -75.21696566666667,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Emeth.'
LIMIT 1;

-- 114. Beth Emeth. (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'Bustleton & Unruh Aves',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Emeth.'
LIMIT 1;

-- 115. Beth HaKeneseth (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '900 N. 7th St',
  NULL,
  'Philadelphia',
  'PA',
  '19123',
  39.96765,
  -75.148773,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Beth HaKeneseth'
LIMIT 1;

-- 116. Beth HaKeneseth Ben Markowitz (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'SW corner 5th & Moore Sts',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Beth HaKeneseth Ben Markowitz'
LIMIT 1;

-- 117. Beth HaKeneseth Brezofsky (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '3221 Clifford St',
  NULL,
  'Philadelphia',
  'PA',
  '19121',
  39.98331198562262,
  -75.18716044490456,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Beth HaKeneseth Brezofsky'
LIMIT 1;

-- 118. Beth HaKeneseth Northern Hungarian (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '415 N.4th St',
  'Center City',
  'Philadelphia',
  'PA',
  '19123',
  39.95786985714286,
  -75.14553571428571,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Beth HaKeneseth Northern Hungarian'
LIMIT 1;

-- 119. Beth HaKeneseth Reb Eichler. Also see, Beth HaKenesses Reb Hirshel (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '417 Monroe St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19147',
  39.94015065,
  -75.15019855848988,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Beth HaKeneseth Reb Eichler. Also see, Beth HaKenesses Reb Hirshel'
LIMIT 1;

-- 120. Beth HaKneseth-Beth Shalom (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '2302 S. 6th St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19148',
  39.9200939,
  -75.15735833973213,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Beth HaKneseth-Beth Shalom'
LIMIT 1;

-- 121. Beth Hakneseth-Talmud (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '2340 N. 30th St',
  NULL,
  'Philadelphia',
  'PA',
  '19132',
  39.99247893939394,
  -75.18134772727274,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Hakneseth-Talmud'
LIMIT 1;

-- 122. Beth HaMedrash (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '200 Haverford Rd',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Beth HaMedrash'
LIMIT 1;

-- 123. Beth HaMedrash Anshe Kaneau (confidence: 0.5)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1924-6 S. 6th St',
  'Center City',
  'Philadelphia',
  'PA',
  '19106',
  39.949298,
  -75.1507342,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Beth HaMedrash Anshe Kaneau'
LIMIT 1;

-- 124. Beth HaMedrash Dorshe Sholom (confidence: 0.3969)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '3046-8 Berks St',
  'Strawberry Mansion',
  'Philadelphia',
  'PA',
  '19121-1811',
  39.985022,
  -75.184247,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Beth HaMedrash Dorshe Sholom'
LIMIT 1;

-- 125. Beth HaMedrash HaGadol Nusach Ashkenaz.         Also see, [The] Khelmer Shul (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '4th & Wharton Sts',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Beth HaMedrash HaGadol Nusach Ashkenaz.         Also see, [The] Khelmer Shul'
LIMIT 1;

-- 126. Beth HaMedrash Hangdog Anshe Ashkenaz.         See, Jewish Rumanian Congregation -               Agudas Achim (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '426 Spruce St',
  'Center City',
  'Philadelphia',
  'PA',
  '19106',
  39.9449925,
  -75.14951169999999,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Beth HaMedrash Hangdog Anshe Ashkenaz.         See, Jewish Rumanian Congregation -               Agudas Achim'
LIMIT 1;

-- 127. Beth HaMedrash Hare (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '5601 Woodcrest Ave',
  NULL,
  'Philadelphia',
  'PA',
  '19131',
  39.990206,
  -75.236156,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Beth HaMedrash Hare'
LIMIT 1;

-- 128. Beth HaMedrash Reb Sofronski (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '3rd & McKean Sts',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Beth HaMedrash Reb Sofronski'
LIMIT 1;

-- 129. Beth HaMedrosh (mid- town Chapel) (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1211 Chestnut St',
  'Center City',
  'Philadelphia',
  'PA',
  '19107',
  39.95077075,
  -75.16071192340988,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Beth HaMedrosh (mid- town Chapel)'
LIMIT 1;

-- 130. Beth HaMedrosh Hagodol-Beth Yaacov (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '6018 Larchwood Ave',
  NULL,
  'Philadelphia',
  'PA',
  '19143',
  39.9539406,
  -75.24322785,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Beth HaMedrosh Hagodol-Beth Yaacov'
LIMIT 1;

-- 131. Beth Hillel-Beth El (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1001 Rimmington Rd',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Hillel-Beth El'
LIMIT 1;

-- 132. Beth Israel (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '32nd St & Montgomery Ave',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Israel'
LIMIT 1;

-- 133. Beth Israel (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '417 Pine St',
  'Center City',
  'Philadelphia',
  'PA',
  '19106',
  39.943695,
  -75.149367,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Israel'
LIMIT 1;

-- 134. Beth Israel (confidence: 0.5)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'Balwynne Park',
  NULL,
  'Philadelphia',
  'PA',
  '19131',
  39.9993959,
  -75.2123206,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Israel'
LIMIT 1;

-- 135. Beth Israel Congregation of Chester County (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '385 Pottstown Pike',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Israel Congregation of Chester County'
LIMIT 1;

-- 136. Beth Israel of Media (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '542 S New',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Israel of Media'
LIMIT 1;

-- 137. Beth Jacob (confidence: 0.5)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1706-8 South St.',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19104',
  39.9459219,
  -75.1836843,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Jacob'
LIMIT 1;

-- 138. Beth Jacob (confidence: 0.81)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '6027-9 Chestnut St',
  NULL,
  'Philadelphia',
  'PA',
  '19139',
  39.9607248,
  -75.2420466,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Jacob'
LIMIT 1;

-- 139. Beth Jacob Anshe (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '414 Christian St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19147',
  39.936931,
  -75.1505912857143,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Jacob Anshe'
LIMIT 1;

-- 140. Beth Jacob Anshe Dadmoor (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '6th & Wolf St (SW corner)',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Jacob Anshe Dadmoor'
LIMIT 1;

-- 141. Beth Jacob of West Philadelphia [Chevra] (confidence: 0.5)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '4008-10 Poplar St',
  NULL,
  'Philadelphia',
  'PA',
  '19108',
  39.970117,
  -75.1593204,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Jacob of West Philadelphia [Chevra]'
LIMIT 1;

-- 142. Beth Judah (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '232 Lombard St',
  'Center City',
  'Philadelphia',
  'PA',
  '19146',
  39.94229365,
  -75.14719958969597,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Judah'
LIMIT 1;

-- 143. Beth Judah (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '4820 N. 11th St',
  NULL,
  'Philadelphia',
  'PA',
  '19141',
  40.02621585,
  -75.1423394561521,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Judah'
LIMIT 1;

-- 144. Beth Judah. Also, Hebrew Congregation of West Philadelphia (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '5426 Sansom St',
  NULL,
  'Philadelphia',
  'PA',
  '19139',
  39.9581728,
  -75.2303092,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Judah. Also, Hebrew Congregation of West Philadelphia'
LIMIT 1;

-- 145. Beth Or Reform Congregation (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '239 Welsh Rd.',
  'Bustleton',
  'Philadelphia',
  'PA',
  '19006',
  40.1103604,
  -75.0553857,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Or Reform Congregation'
LIMIT 1;

-- 146. Beth Schmuel. Also, Beth Samuel; Bes Schmuel (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'Ritner & Marshall Sts',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Schmuel. Also, Beth Samuel; Bes Schmuel'
LIMIT 1;

-- 147. Beth Sholom.                                                                       Also, Logan Congregation Ahavas Israel (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '8231 Old York Rd.',
  'West Oak Lane',
  'Philadelphia',
  'PA',
  NULL,
  40.0815512,
  -75.1259989,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Sholom.                                                                       Also, Logan Congregation Ahavas Israel'
LIMIT 1;

-- 148. Beth Solomon (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '601 E. Mt Pleasant Ave',
  NULL,
  'Philadelphia',
  'PA',
  '19119',
  40.06648,
  -75.180483,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Solomon'
LIMIT 1;

-- 149. Beth Solomon Suburban (of Somerton) (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '198 Tomlinson Rd',
  NULL,
  'Philadelphia',
  'PA',
  '19116',
  40.1194488,
  -75.03572493101768,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Solomon Suburban (of Somerton)'
LIMIT 1;

-- 150. Beth Solomon.                                                                  Also, Beth Shloime Rumanian Congregation (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '601 E Sedgewick St 2300 S. 6th St',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Solomon.                                                                  Also, Beth Shloime Rumanian Congregation'
LIMIT 1;

-- 151. Beth Tefilath Israel (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '3911 Powelton Ave',
  NULL,
  'Philadelphia',
  'PA',
  '19104',
  39.95938583333333,
  -75.20029749999999,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Tefilath Israel'
LIMIT 1;

-- 152. Beth Tfilla of Overbrook Park (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '7630 Woodbine Ave',
  NULL,
  'Philadelphia',
  'PA',
  '19151',
  39.9740014,
  -75.2679612,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Tfilla of Overbrook Park'
LIMIT 1;

-- 153. Beth Tikvah-B'nai (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1001 Paper Mill Rd',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Tikvah-B''nai'
LIMIT 1;

-- 154. Beth Torah [Temple] (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '608 Welsh Rd',
  NULL,
  'Philadelphia',
  'PA',
  '19115',
  40.10401547036384,
  -75.05178909187951,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Torah [Temple]'
LIMIT 1;

-- 155. Beth Tovim (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'NE Corner 59th St & Drexel Rd',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Tovim'
LIMIT 1;

-- 156. Beth Uziel (confidence: 0.5)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '41 E. Wyoming Ave',
  NULL,
  'Philadelphia',
  'PA',
  '19124',
  40.0181532,
  -75.0975922,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Uziel'
LIMIT 1;

-- 157. Beth Zion-Beth Israel [Temple] (confidence: 0.95)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '300 South 18th St',
  'Center City',
  'Philadelphia',
  'PA',
  '19146',
  39.9476144,
  -75.17143395156,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Beth Zion-Beth Israel [Temple]'
LIMIT 1;

-- 158. Bialostotski Minyan (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1410 S 5th St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19148',
  39.9307116,
  -75.1534081915332,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Bialostotski Minyan'
LIMIT 1;

-- 159. Bikur Cholim [Chevra ] (confidence: 0.19845)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'Mercantile Hall,',
  'Center City',
  'Philadelphia',
  'PA',
  '19107',
  39.9531287,
  -75.1642021,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Bikur Cholim [Chevra ]'
LIMIT 1;

-- 160. Birchas Shalom (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '5820 Woodcrest Ave',
  NULL,
  'Philadelphia',
  'PA',
  '19131',
  39.988067,
  -75.23995,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Birchas Shalom'
LIMIT 1;

-- 161. Boulevard Temple. Also Temple Beth Torah (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'Tyson & Brous Sts',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Boulevard Temple. Also Temple Beth Torah'
LIMIT 1;

-- 162. Bristol Jewish Center (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '216 Pond St',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Bristol Jewish Center'
LIMIT 1;

-- 163. Brith Achim (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '481 South Gulph Rd',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Brith Achim'
LIMIT 1;

-- 164. Brith Israel Congregation (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '524 W. Roosevelt Blvd',
  NULL,
  'Philadelphia',
  'PA',
  '19120',
  40.023338853837885,
  -75.13382794316156,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Brith Israel Congregation'
LIMIT 1;

-- 165. Brith Sholem Synagogue of Paschall Ave. Also see, Brith Sholom Community Center (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '6842 Paschall Ave',
  NULL,
  'Philadelphia',
  'PA',
  '19142',
  39.921124285714285,
  -75.23785371428572,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Brith Sholem Synagogue of Paschall Ave. Also see, Brith Sholom Community Center'
LIMIT 1;

-- 166. Brith Sholom (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '571 N. 5th St',
  NULL,
  'Philadelphia',
  'PA',
  '19123',
  39.96185809863163,
  -75.14645066409047,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Brith Sholom'
LIMIT 1;

-- 167. Brith Sholom Chevra Kedusha. (confidence: 0.81)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '604 Girard Ave',
  'Fishtown',
  'Philadelphia',
  'PA',
  '19125-3409',
  39.971194,
  -75.126766,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Brith Sholom Chevra Kedusha.'
LIMIT 1;

-- 168. Brith Sholom Community Center. Also see, Brith Sholem Synagogue of Paschall Ave. (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '63rd & Greenway Sts',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Brith Sholom Community Center. Also see, Brith Sholem Synagogue of Paschall Ave.'
LIMIT 1;

-- 169. Brith Sholom. See, Brith Sholom (@ N.5th) (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '201 Poplar St',
  NULL,
  'Philadelphia',
  'PA',
  '19123',
  39.964273,
  -75.140787,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Brith Sholom. See, Brith Sholom (@ N.5th)'
LIMIT 1;

-- 170. Brothers of Israel (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '530 Washington Crossing Rd',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Brothers of Israel'
LIMIT 1;

-- 171. Bukier Congregation (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1527 S. 6th St.  (at Cross St)',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Bukier Congregation'
LIMIT 1;

-- 172. Bustleton-Somerton Synagogue (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'Ferndale & Tomlinson Rds',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Bustleton-Somerton Synagogue'
LIMIT 1;

-- 173. Central Talmud Torah (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '314-20 Catherine St',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Central Talmud Torah'
LIMIT 1;

-- 174. Chevra Ahavas Chesed (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1209 N Hutchinson St',
  NULL,
  'Philadelphia',
  'PA',
  '19122',
  39.97123847030714,
  -75.15163693271406,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Chevra Ahavas Chesed'
LIMIT 1;

-- 175. Chevra Kuvier (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '243 Christian St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19147',
  39.93649533333333,
  -75.14839606666666,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Chevra Kuvier'
LIMIT 1;

-- 176. Chevra Mishnais (confidence: 0.81)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1028 Wyoming Ave',
  'Feltonville',
  'Philadelphia',
  'PA',
  NULL,
  40.0190369,
  -75.1041945,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Chevra Mishnais'
LIMIT 1;

-- 177. Chevra Mishnayos Kehilas Kodesh Anshe Sodo Lovon. Also, Anshe Sodo Lovon; Anshe Sude Luvin Biela Ziercow (confidence: 0.3572099999999999)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '2024 S. 5th St.            (at Mercy)',
  'Greenwich',
  'Philadelphia',
  'PA',
  '19148',
  39.923032,
  -75.155181,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Chevra Mishnayos Kehilas Kodesh Anshe Sodo Lovon. Also, Anshe Sodo Lovon; Anshe Sude Luvin Biela Ziercow'
LIMIT 1;

-- 178. Chevra Northern Hungarian (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '3rd & Brown Sts',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Chevra Northern Hungarian'
LIMIT 1;

-- 179. Chevra Ohev Sholom (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1926 S. 26th St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19145',
  39.92863693314504,
  -75.1891736233904,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Chevra Ohev Sholom'
LIMIT 1;

-- 180. Chevra Schlansky (confidence: 0.2857142857142857)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '8th & Shunk Sts',
  'Old City',
  'Philadelphia',
  'PA',
  '19106',
  39.953597,
  -75.150235,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Chevra Schlansky'
LIMIT 1;

-- 181. Chevra Shas (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '932 Philadelphia [?]',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Chevra Shas'
LIMIT 1;

-- 182. Chevra Tahzuka Mishnoyis. Also, HaRav Ravi Moshe-Kelle Shlita Synagogue (confidence: 0.81)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1910 Moyamensing Ave',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19148',
  39.9243375,
  -75.15248960059336,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Chevra Tahzuka Mishnoyis. Also, HaRav Ravi Moshe-Kelle Shlita Synagogue'
LIMIT 1;

-- 183. Chevra Tehilim (confidence: 0.81)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '2244 William St',
  'Richmond',
  'Philadelphia',
  'PA',
  '19134-3917',
  39.986128,
  -75.115363,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Chevra Tehilim'
LIMIT 1;

-- 184. Chevra Tehilim Mishnayos (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'NE Corner Auburn & Tulip Sts',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Chevra Tehilim Mishnayos'
LIMIT 1;

-- 185. Chevra Tehilim Zikhron Yaakov. Also, Zikhron Yaakov (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '3012 W Cumberland St',
  NULL,
  'Philadelphia',
  'PA',
  '19132',
  39.994112040816326,
  -75.18109479591837,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Chevra Tehilim Zikhron Yaakov. Also, Zikhron Yaakov'
LIMIT 1;

-- 186. Chevra Tehilim. See, Beth HaKeneseth Reb Eichler (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '715 S. 4th St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19147',
  39.9400767,
  -75.14927598956444,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Chevra Tehilim. See, Beth HaKeneseth Reb Eichler'
LIMIT 1;

-- 187. Chevra Vohliner Anshe Kuppel. See, Anshe Kuppel Vohliner (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '2016 N. 32nd St',
  NULL,
  'Philadelphia',
  'PA',
  '19121',
  39.987303,
  -75.185742,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Chevra Vohliner Anshe Kuppel. See, Anshe Kuppel Vohliner'
LIMIT 1;

-- 188. Community Torah of Bucks County. (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '8 Surry Rd',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Community Torah of Bucks County.'
LIMIT 1;

-- 189. Daily Minyan and Torah Study (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1518 Walnut St',
  'Center City',
  'Philadelphia',
  'PA',
  '19102',
  39.94941515,
  -75.16692522023337,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Daily Minyan and Torah Study'
LIMIT 1;

-- 190. Dirshu Tov. See B'nai Jacob-Dishu Tov (confidence: 0.5)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '924-6 New Market St',
  NULL,
  'Philadelphia',
  'PA',
  '19123',
  39.9644514,
  -75.139007,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Dirshu Tov. See B''nai Jacob-Dishu Tov'
LIMIT 1;

-- 191. Dorshe Sholom Congregation (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '924 New Market St',
  NULL,
  'Philadelphia',
  'PA',
  '19123',
  39.9642581,
  -75.13919746956427,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Dorshe Sholom Congregation'
LIMIT 1;

-- 192. Dorshey Sholem Nusach HaAri (confidence: 0.45)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '3046-8 Birch St',
  'Richmond',
  'Philadelphia',
  'PA',
  NULL,
  39.990621,
  -75.11695,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Dorshey Sholem Nusach HaAri'
LIMIT 1;

-- 193. Eastern Women's Talmud Torah. Also, Old Lady Sack's Shul; Vine Street Synagogue (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '820 N 5th St 205 Vine St',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Eastern Women''s Talmud Torah. Also, Old Lady Sack''s Shul; Vine Street Synagogue'
LIMIT 1;

-- 194. Emanu-el Congregation See B'nai Israel-Emanu- el (confidence: 0.81)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1524 Champlost Ave',
  'Ogontz',
  'Philadelphia',
  'PA',
  '19141-0000',
  40.044581,
  -75.146361,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Emanu-el Congregation See B''nai Israel-Emanu- el'
LIMIT 1;

-- 195. Emunas Israel Ohev Sholom. See, [The] Hungarian Synagogue; Ohev Sholom (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '515 Gaskill (Wheatley Hall)',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Emunas Israel Ohev Sholom. See, [The] Hungarian Synagogue; Ohev Sholom'
LIMIT 1;

-- 196. Emunas Israel See, Ahavas Achim (confidence: 0.5)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '7828 Eastwick Ave',
  NULL,
  'Philadelphia',
  'PA',
  '19142',
  39.919049,
  -75.223383,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Emunas Israel See, Ahavas Achim'
LIMIT 1;

-- 197. Emunath Israel (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '7th & South Sts',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Emunath Israel'
LIMIT 1;

-- 198. Ezras Israel (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '2114 S. 6th St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19148',
  39.92220815,
  -75.1568960128198,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Ezras Israel'
LIMIT 1;

-- 199. Ezrath Israel (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '69th St & Ogontz Ave',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Ezrath Israel'
LIMIT 1;

-- 200. Fairmount Jewish Community Center. See, Old Man Miller's Shul (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'NW Corner, 19th St & Fairmount Ave',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Fairmount Jewish Community Center. See, Old Man Miller''s Shul'
LIMIT 1;

-- 201. Far Northeast Orthodox Synagogue (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'Tomlinson St & Bustleton Ave',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Far Northeast Orthodox Synagogue'
LIMIT 1;

-- 202. Fastover Independent Congregation. See also, Kehilos Kodes Anshe Sodo Lovon; Magidei Tehilim; Shivtei Yeshurun (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1826 S. 6th St              (at Sigel St)',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Fastover Independent Congregation. See also, Kehilos Kodes Anshe Sodo Lovon; Magidei Tehilim; Shivtei Yeshurun'
LIMIT 1;

-- 203. First Postiver Relief Congregation (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '621 S. 3rd St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19147',
  39.9407983,
  -75.14754468222083,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'First Postiver Relief Congregation'
LIMIT 1;

-- 204. First Romanian Poras Joseph. See, Agudas Achim Rumanian Congregation (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '754 S. 3rd St (at Fitzwater)',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'First Romanian Poras Joseph. See, Agudas Achim Rumanian Congregation'
LIMIT 1;

-- 205. Fitzgerald Street Congregation (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '5th & Fitzgerald Sts',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Fitzgerald Street Congregation'
LIMIT 1;

-- 206. Fox Chase Jewish Community Center (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '7816 Halstead St',
  NULL,
  'Philadelphia',
  'PA',
  '19111',
  40.071597,
  -75.08277336363636,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Fox Chase Jewish Community Center'
LIMIT 1;

-- 207. Frankford Hebrew Congregation. (confidence: 0.855)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '4330/4408 Paul St',
  NULL,
  'Philadelphia',
  'PA',
  '19124',
  40.01087836734693,
  -75.0869413265306,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Frankford Hebrew Congregation.'
LIMIT 1;

-- 208. Gemilas Chesed [Chevra] (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '6th & Brown Sts',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Gemilas Chesed [Chevra]'
LIMIT 1;

-- 209. Gemilath Chesed (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '916 N. Franklin St',
  NULL,
  'Philadelphia',
  'PA',
  '19123',
  39.96800004697987,
  -75.1496080067114,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Gemilath Chesed'
LIMIT 1;

-- 210. Germantown Jewish Center (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '400 W Eliet Sts (At Lincoln Drive)',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Germantown Jewish Center'
LIMIT 1;

-- 211. Gershman YM & YWHA (Congregation) (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '401 S Broad St',
  'Center City',
  'Philadelphia',
  'PA',
  '19146',
  39.94544137934802,
  -75.16528540674899,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Gershman YM & YWHA (Congregation)'
LIMIT 1;

-- 212. Geulas Israel Anshe Sefard (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '843 N. 7th St (at Parrish)',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Geulas Israel Anshe Sefard'
LIMIT 1;

-- 213. Gomel Chesed Shel Emes (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '314 Catherine St',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Gomel Chesed Shel Emes'
LIMIT 1;

-- 214. Greater Northeast Congregation (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'Verree & Welsh Rds',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Greater Northeast Congregation'
LIMIT 1;

-- 215. Har Zion Temple (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1500 Hagys Ford Rd',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Har Zion Temple'
LIMIT 1;

-- 216. Hebrew West End Jewish Community Center (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '2402 N 29th St',
  NULL,
  'Philadelphia',
  'PA',
  '19132',
  39.99262463265306,
  -75.17965626530612,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Hebrew West End Jewish Community Center'
LIMIT 1;

-- 217. Heisiner -Ezras Israel. See, Anshe Hisan; Ezras Israel (confidence: 0.3572099999999999)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '2015 S 4th St (at Mercy)',
  'Pennsport',
  'Philadelphia',
  'PA',
  '19148',
  39.923041,
  -75.153078,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Heisiner -Ezras Israel. See, Anshe Hisan; Ezras Israel'
LIMIT 1;

-- 218. Hesed Shel Emet; Also Haded Shel Emet (confidence: 0.45)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '575 N Keim St',
  NULL,
  'Philadelphia',
  'PA',
  '19134',
  40.000164,
  -75.117288,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Hesed Shel Emet; Also Haded Shel Emet'
LIMIT 1;

-- 219. Hillel, University of Pennsylvania (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '202 S 36th St',
  NULL,
  'Philadelphia',
  'PA',
  '19104',
  39.9526368,
  -75.19522993025768,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Hillel, University of Pennsylvania'
LIMIT 1;

-- 220. Hollander Synagogue (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '4th & Catherine Sts',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Hollander Synagogue'
LIMIT 1;

-- 221. Independent Congregation [Chevra Kadisha] (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '809 S 5th St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19148',
  39.9382031,
  -75.15138717539682,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Independent Congregation [Chevra Kadisha]'
LIMIT 1;

-- 222. Independent Southern Congregation.                         See, Talmud Torah (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '625 Dickinson St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19147',
  39.93016566666667,
  -75.15575254761904,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Independent Southern Congregation.                         See, Talmud Torah'
LIMIT 1;

-- 223. Ivy Ridge Jewish Community Center. See also, Or Ami (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'Silverwood & Green Lanes',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Ivy Ridge Jewish Community Center. See also, Or Ami'
LIMIT 1;

-- 224. Jewish Congregation of (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'PO Box 244',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Jewish Congregation of'
LIMIT 1;

-- 225. Jewish Hospital Congregation (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'Old York & Tabor Rds',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Jewish Hospital Congregation'
LIMIT 1;

-- 226. Jewish Mute Society Congregation (confidence: 0.81)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '2213 Natrona St',
  NULL,
  'Philadelphia',
  'PA',
  '19132',
  39.99038682942031,
  -75.1857239126346,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Jewish Mute Society Congregation'
LIMIT 1;

-- 227. Jewish Rumanian Congregation - Agudas Achim. See, Beth HaMedrash HaGodol Anshe Ashkenaz (confidence: 0.5)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '418-26 Spruce St',
  NULL,
  'Philadelphia',
  'PA',
  '19104',
  39.9510159,
  -75.1971178,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Jewish Rumanian Congregation - Agudas Achim. See, Beth HaMedrash HaGodol Anshe Ashkenaz'
LIMIT 1;

-- 228. Jewish War Veterans (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '52nd & Overbrook Sts',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Jewish War Veterans'
LIMIT 1;

-- 229. Joseph Asbell Congregation (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '511 Mifflin St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19145',
  39.9250698,
  -75.15492599360906,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Joseph Asbell Congregation'
LIMIT 1;

-- 230. Kahal Kodesh Israel [Chevra] (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '3rd & Christian Sts',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Kahal Kodesh Israel [Chevra]'
LIMIT 1;

-- 231. Kehilas Adas Israel (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '843 S 3rd St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19147',
  39.936560150000005,
  -75.14847473779754,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Kehilas Adas Israel'
LIMIT 1;

-- 232. Kehilas B'nai Shalom (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '2446 Briston Rd',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Kehilas B''nai Shalom'
LIMIT 1;

-- 233. Kehilat Chaverim (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '4242 Bensalem Blvd',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Kehilat Chaverim'
LIMIT 1;

-- 234. Kehilat HaNahar Also, [The] Little Shul by the River (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '85 W Mechanic St',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Kehilat HaNahar Also, [The] Little Shul by the River'
LIMIT 1;

-- 235. Kehilath Israel (confidence: 0.5)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '520-22 Morris St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19148',
  39.926203,
  -75.145358,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Kehilath Israel'
LIMIT 1;

-- 236. Kehiloth Israel (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '234 Bainbridge St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19147',
  39.9403264,
  -75.14745665348877,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Kehiloth Israel'
LIMIT 1;

-- 237. Keneseth Beth Zion (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1514 S 6th St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19148',
  39.9296206,
  -75.1555486,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Keneseth Beth Zion'
LIMIT 1;

-- 238. Keneseth Israel (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '8339 Old York Rd',
  'West Oak Lane',
  'Philadelphia',
  'PA',
  NULL,
  40.0857945,
  -75.1273064,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Keneseth Israel'
LIMIT 1;

-- 239. Kensington Synagogue & Community Center. Also, Shaare Yishkan (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '2033 E Allegheny Ave',
  NULL,
  'Philadelphia',
  'PA',
  '19134',
  39.99356375,
  -75.11041498083881,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Kensington Synagogue & Community Center. Also, Shaare Yishkan'
LIMIT 1;

-- 240. Kerem Israel Anshe Sefard (confidence: 0.24)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '32nd & Morse Sts (NW Corner)',
  'Strawberry Mansion',
  'Philadelphia',
  'PA',
  '19132',
  39.993274,
  -75.18466,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Kerem Israel Anshe Sefard'
LIMIT 1;

-- 241. Kesher Israel Also, Rodeph Zedek (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '412 Lombard St',
  'Center City',
  'Philadelphia',
  'PA',
  '19147',
  39.9425719,
  -75.14958691871965,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Kesher Israel Also, Rodeph Zedek'
LIMIT 1;

-- 242. Kesher Israel Congregation (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1000 Pottstown Pike',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Kesher Israel Congregation'
LIMIT 1;

-- 243. Kesher Torah (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '335 Christian St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19146',
  39.936997000000005,
  -75.14963262693006,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Kesher Torah'
LIMIT 1;

-- 244. Kesher Torah Anshe Lubliner (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '610 S 3rd St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19147',
  39.941112450000006,
  -75.14784853533276,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Kesher Torah Anshe Lubliner'
LIMIT 1;

-- 245. Kesher Torah Anshe Vohliner (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '324 Catherine St',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Kesher Torah Anshe Vohliner'
LIMIT 1;

-- 246. Kesher Torah Synagogue (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '5032 Brown St',
  NULL,
  'Philadelphia',
  'PA',
  '19139',
  39.96557375,
  -75.221587916235,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Kesher Torah Synagogue'
LIMIT 1;

-- 247. Kieve Tserkasser Bulgarian Congregation (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1815 S 6th St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19148',
  39.925804,
  -75.15572241408555,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Kieve Tserkasser Bulgarian Congregation'
LIMIT 1;

-- 248. Kneses HaSefer- Educational Synagogue of Yardley (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1237 Edgewood Rd',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Kneses HaSefer- Educational Synagogue of Yardley'
LIMIT 1;

-- 249. Kneseth Chai (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '8400 Pine Rd',
  NULL,
  'Philadelphia',
  'PA',
  '19111',
  40.082419,
  -75.078248,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Kneseth Chai'
LIMIT 1;

-- 250. Knesses Israel Anshe Sefard.                                       Also, Kneses Adas Israel Congregation (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '984 N. Marshall St',
  NULL,
  'Philadelphia',
  'PA',
  '19123',
  39.96826006174258,
  -75.1478472422938,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Knesses Israel Anshe Sefard.                                       Also, Kneses Adas Israel Congregation'
LIMIT 1;

-- 251. Kol Ami (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'Gratz Chapel, Mandell Education Campus',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Kol Ami'
LIMIT 1;

-- 252. Kol Emet (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '19 South Main St',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Kol Emet'
LIMIT 1;

-- 253. Kol Tzedek West Philadelphia Synagogue (confidence: 0.125)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'Calvary Center for Community & Culture',
  NULL,
  'Philadelphia',
  'PA',
  '19143',
  39.9482235,
  -75.2185172,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Kol Tzedek West Philadelphia Synagogue'
LIMIT 1;

-- 254. Krakauer - Beth Elohim Beneficial Association (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '417 Pine St',
  'Center City',
  'Philadelphia',
  'PA',
  '19106',
  39.943695,
  -75.149367,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Krakauer - Beth Elohim Beneficial Association'
LIMIT 1;

-- 255. Kreminitzer Synagogue (confidence: 0.3)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1908-10 E',
  'East Passyunk Crossing',
  'Philadelphia',
  'PA',
  '19148-2317',
  39.925688,
  -75.162604,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Kreminitzer Synagogue'
LIMIT 1;

-- 256. Leidy Ave Congregation (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '4106 Viola St',
  NULL,
  'Philadelphia',
  'PA',
  '19104',
  39.974507264458914,
  -75.2068927199552,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Leidy Ave Congregation'
LIMIT 1;

-- 257. Lenas HaZedek (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '542 Queen St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19147',
  39.9378239,
  -75.1530398561458,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Lenas HaZedek'
LIMIT 1;

-- 258. Lenas HaZedek of West Philadelphia. See also, Beth HaMedrosh Hagodol- Beth Yaacov (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '5944 Larchwood Ave',
  NULL,
  'Philadelphia',
  'PA',
  '19143',
  39.9537334,
  -75.2419636714437,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Lenas HaZedek of West Philadelphia. See also, Beth HaMedrosh Hagodol- Beth Yaacov'
LIMIT 1;

-- 259. Leyv Ha-Ir Heart of the City; Center City Center City Reconstructionist Synagogue (confidence: 0.5)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'Ethical Society 1906 S Rittenhouse Sq',
  'Center City',
  'Philadelphia',
  'PA',
  '19103',
  39.948932,
  -75.1740869,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Leyv Ha-Ir Heart of the City; Center City Center City Reconstructionist Synagogue'
LIMIT 1;

-- 260. Linath HaZedek Anshe Fairmount (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '157 Fairmount Ave',
  NULL,
  'Philadelphia',
  'PA',
  '19123',
  39.96190081818182,
  -75.14082604545455,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Linath HaZedek Anshe Fairmount'
LIMIT 1;

-- 261. Logan Jewish Community (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '10th & Duncanon Sts',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Logan Jewish Community'
LIMIT 1;

-- 262. Lowenstein's Shul (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '2005 W Cambria St',
  NULL,
  'Philadelphia',
  'PA',
  '19132',
  39.99835971428572,
  -75.1636462857143,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Lowenstein''s Shul'
LIMIT 1;

-- 263. Lower Merion Synagogue (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '123 Old Lancaster Ave',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Lower Merion Synagogue'
LIMIT 1;

-- 264. Lubavitch House at the University of Pennsylvania (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '4032 Spruce St',
  NULL,
  'Philadelphia',
  'PA',
  '19104',
  39.95183081578947,
  -75.20444505263158,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Lubavitch House at the University of Pennsylvania'
LIMIT 1;

-- 265. Lubavitch Synagogue (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '7622 Castor Ave',
  NULL,
  'Philadelphia',
  'PA',
  '19152',
  40.0567977,
  -75.0612642049263,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Lubavitch Synagogue'
LIMIT 1;

-- 266. Machzike Adas - B'nai Moishe [Chevra] (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '943 N 6th St',
  NULL,
  'Philadelphia',
  'PA',
  '19140',
  39.96823715,
  -75.14677625328832,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Machzike Adas - B''nai Moishe [Chevra]'
LIMIT 1;

-- 267. Machzike Torah [Chevra] (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1336 N 7th St',
  NULL,
  'Philadelphia',
  'PA',
  '19140',
  39.97281065,
  -75.14790785618226,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Machzike Torah [Chevra]'
LIMIT 1;

-- 268. Machziknei Har Rov. [Congregation]:                         Also, [Congregation] Agudath Achim Machzikei Har Rov (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1336 N 7th St',
  NULL,
  'Philadelphia',
  'PA',
  '19140',
  39.97281065,
  -75.14790785618226,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Machziknei Har Rov. [Congregation]:                         Also, [Congregation] Agudath Achim Machzikei Har Rov'
LIMIT 1;

-- 269. Magidei Tehilim [Chevra]: See, Fastover Independent; Shivtei Yeshurun (confidence: 0.3572099999999999)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '2027 S 6th St (at Mercy)',
  'Old City',
  'Philadelphia',
  'PA',
  '19148-2446',
  39.923141,
  -75.156528,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Magidei Tehilim [Chevra]: See, Fastover Independent; Shivtei Yeshurun'
LIMIT 1;

-- 270. Main Line Reform Temple (confidence: 0.81)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '410 Montgomery Ave',
  'Fishtown',
  'Philadelphia',
  'PA',
  NULL,
  39.9768945,
  -75.1322035,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Main Line Reform Temple'
LIMIT 1;

-- 271. Manayunk Hebrew Congregation [The] Also, [Rev.] Fleischer's Shul (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '4250 Main St',
  NULL,
  'Philadelphia',
  'PA',
  '19127',
  40.02471132,
  -75.22151242,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Manayunk Hebrew Congregation [The] Also, [Rev.] Fleischer''s Shul'
LIMIT 1;

-- 272. Mekor Baruch (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '8 Merion Rd',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Mekor Baruch'
LIMIT 1;

-- 273. Mekor Habracha; Center City Synagogue; Formerly Etz Chaim (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '262 S 16th St',
  'Center City',
  'Philadelphia',
  'PA',
  '19102',
  39.9478129375,
  -75.16804756249999,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Mekor Habracha; Center City Synagogue; Formerly Etz Chaim'
LIMIT 1;

-- 274. Melrose B'nai Israel- Emanu-el (confidence: 0.5)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '133 W Cheltenham Ave.',
  NULL,
  'Philadelphia',
  'PA',
  '19126',
  40.0639062,
  -75.1403163,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Melrose B''nai Israel- Emanu-el'
LIMIT 1;

-- 275. Mikveh Israel (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '44 N 4th St',
  'Center City',
  'Philadelphia',
  'PA',
  '19106',
  39.9513058,
  -75.14781728880236,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Mikveh Israel'
LIMIT 1;

-- 276. Minyan Masorati and Minyan Dorshei Derech (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'Germantown Jewish Center',
  'West Mount Airy',
  'Philadelphia',
  'PA',
  '19119',
  40.050854,
  -75.194779,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Minyan Masorati and Minyan Dorshei Derech'
LIMIT 1;

-- 277. Minyanim at Penn Hillel (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '202 S 36th St',
  NULL,
  'Philadelphia',
  'PA',
  '19104',
  39.9526368,
  -75.19522993025768,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Minyanim at Penn Hillel'
LIMIT 1;

-- 278. Mishkan Israel (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1112 N 2nd St',
  NULL,
  'Philadelphia',
  'PA',
  '19123',
  39.96827854523551,
  -75.13991867312326,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Mishkan Israel'
LIMIT 1;

-- 279. Mishkan Israel [Chevra] Also, Kolker Synagogue (Raim Ahuvim Anshe Kolker) (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '5th & Dudley Sts',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Mishkan Israel [Chevra] Also, Kolker Synagogue (Raim Ahuvim Anshe Kolker)'
LIMIT 1;

-- 280. Mishkan Shalom (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '4101 Freeland St          8836 Crefeld St',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Mishkan Shalom'
LIMIT 1;

-- 281. Mishnayos Anshe Sefard [Chevra Tehilim] (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '873 N 6th St',
  NULL,
  'Philadelphia',
  'PA',
  '19140',
  39.96686836734694,
  -75.14708787755102,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Mishnayos Anshe Sefard [Chevra Tehilim]'
LIMIT 1;

-- 282. Mishnayos Anshe Sefard [Chevra] (confidence: 0.5)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '446 N Marshall St',
  NULL,
  'Philadelphia',
  'PA',
  '19140',
  40.01853,
  -75.137593,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Mishnayos Anshe Sefard [Chevra]'
LIMIT 1;

-- 283. Mishnayos Chesed Ve'Emes [Chevra]. (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '432 N 2nd St',
  'Center City',
  'Philadelphia',
  'PA',
  '19123',
  39.95839775609756,
  -75.14203890243903,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Mishnayos Chesed Ve''Emes [Chevra].'
LIMIT 1;

-- 284. Mogen Abraham (confidence: 0.3572099999999999)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1709 S 4th St (at Morris)',
  'Dickinson Narrows',
  'Philadelphia',
  'PA',
  '19148-1801',
  39.9268501,
  -75.1524688,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Mogen Abraham'
LIMIT 1;

-- 285. Monastreichner Shul (aka Manestrishtze Shul) (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '5601 Woodcrest Ave',
  NULL,
  'Philadelphia',
  'PA',
  '19131',
  39.990206,
  -75.236156,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Monastreichner Shul (aka Manestrishtze Shul)'
LIMIT 1;

-- 286. Moshav Zekenim. Also, Uptown Home for the Aged (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '957 N. Franklin St',
  NULL,
  'Philadelphia',
  'PA',
  '19123',
  39.96830566442953,
  -75.14932452348994,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Moshav Zekenim. Also, Uptown Home for the Aged'
LIMIT 1;

-- 287. Mount Airy Jewish Community Center (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '6400 Johnson St (at Arleigh)',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Mount Airy Jewish Community Center'
LIMIT 1;

-- 288. Mount Airy Orthodox Congregation (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1201 E Mt. Pleasant Ave',
  NULL,
  'Philadelphia',
  'PA',
  '19150',
  40.072319,
  -75.17474,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Mount Airy Orthodox Congregation'
LIMIT 1;

-- 289. Mount Sinai Hospital (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '5th & Reed Sts',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Mount Sinai Hospital'
LIMIT 1;

-- 290. Ner Zedek - Ezrath Israel - Beth Uziel  Also see, Temple Brith Kodesh; Boulevard Park. (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'Bustleton Ave & Oakmont St',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Ner Zedek - Ezrath Israel - Beth Uziel  Also see, Temple Brith Kodesh; Boulevard Park.'
LIMIT 1;

-- 291. Neziner Congregation Also, Ahavas Achim Anshe Niezhin Nusach HaAri: See Beth Zion-Beth Israel. (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '771 S. 2nd St (at Fitzwater St)',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Neziner Congregation Also, Ahavas Achim Anshe Niezhin Nusach HaAri: See Beth Zion-Beth Israel.'
LIMIT 1;

-- 292. North West Religious Association (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'Natrona St & Columbia Ave',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'North West Religious Association'
LIMIT 1;

-- 293. Northeast Orthodox Congregation (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '2117 Bleigh St',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Northeast Orthodox Congregation'
LIMIT 1;

-- 294. Northern [ North Eastern?] Talmud Torah Congregation (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '820 N 5th St',
  NULL,
  'Philadelphia',
  'PA',
  '19123',
  39.9651114,
  -75.14666943205714,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Northern [ North Eastern?] Talmud Torah Congregation'
LIMIT 1;

-- 295. Northern Chevra Kadisha (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '930 N. Franklin St',
  NULL,
  'Philadelphia',
  'PA',
  '19123',
  39.96811646308725,
  -75.14958263758389,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Northern Chevra Kadisha'
LIMIT 1;

-- 296. Northern Liberties Hospital Chapel (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '7th & Brown Sts',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Northern Liberties Hospital Chapel'
LIMIT 1;

-- 297. Ohel Jacob (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1705 N.7th St. (at Columbia Ave)',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Ohel Jacob'
LIMIT 1;

-- 298. Ohev Itzchok (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '2440 S 9th St               (at Porter St)',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Ohev Itzchok'
LIMIT 1;

-- 299. Ohev Shalom (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '2 Chester Rd',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Ohev Shalom'
LIMIT 1;

-- 300. Ohev Sholom (confidence: 0.81)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '5164 Columbia Ave',
  'West Parkside',
  'Philadelphia',
  'PA',
  NULL,
  39.980168,
  -75.2238748,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Ohev Sholom'
LIMIT 1;

-- 301. Ohev Sholom of Bucks County (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '944 Second Street Pike',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Ohev Sholom of Bucks County'
LIMIT 1;

-- 302. Ohev Zedek (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '322 Bainbridge St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19147',
  39.94031075,
  -75.14884978323764,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Ohev Zedek'
LIMIT 1;

-- 303. Ohev Zedek Anshe Sefard [Chevra] (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '322 Christian St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19147',
  39.93666364033464,
  -75.14964296623087,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Ohev Zedek Anshe Sefard [Chevra]'
LIMIT 1;

-- 304. Ohev Zedek: Also, Samuel Rosa Nathan Ohev Zedek (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1535 N 7th St (at Oxford Ave)',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Ohev Zedek: Also, Samuel Rosa Nathan Ohev Zedek'
LIMIT 1;

-- 305. Ohr Achaim Anshe Golitzer: Also see, [The] Galicianer Shul; Ohr Achaim (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1517 S 5th St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19148',
  39.9292497,
  -75.1533929,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Ohr Achaim Anshe Golitzer: Also see, [The] Galicianer Shul; Ohr Achaim'
LIMIT 1;

-- 306. Old Man Miller's Shul. Also, B'nai Israel of Fairmount; Fairmount Jewish Community Center (confidence: 0.5)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '2223/5 Wallace St',
  NULL,
  'Philadelphia',
  'PA',
  '19139',
  39.9635339,
  -75.2087708,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Old Man Miller''s Shul. Also, B''nai Israel of Fairmount; Fairmount Jewish Community Center'
LIMIT 1;

-- 307. Old York Road Temple- Beth Am (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '971 Old York Rd',
  'West Oak Lane',
  'Philadelphia',
  'PA',
  NULL,
  40.1096642,
  -75.1226031,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Old York Road Temple- Beth Am'
LIMIT 1;

-- 308. Or Ami. See also, Ivy Ridge Jewish Community Center (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '708 Ridge Pike',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Or Ami. See also, Ivy Ridge Jewish Community Center'
LIMIT 1;

-- 309. Or HaChayim Anshe Ostreich (confidence: 0.63)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '479-481 N 3rd St',
  'Northern Liberties',
  'Philadelphia',
  'PA',
  NULL,
  39.9602481,
  -75.1435464,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Or HaChayim Anshe Ostreich'
LIMIT 1;

-- 310. Or Hadash (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '190 Camp Hill Rd',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Or Hadash'
LIMIT 1;

-- 311. Or Shalom (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '835 Darby-Paoli Rd',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Or Shalom'
LIMIT 1;

-- 312. Otik Moliver (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '922 S 4th St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19147',
  39.93645202799076,
  -75.15044012619279,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Otik Moliver'
LIMIT 1;

-- 313. Oxford Circle Jewish Community Center-                  Beth Israel (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1009 Unruh Ave',
  NULL,
  'Philadelphia',
  'PA',
  '19149',
  40.04781425,
  -75.08160826515437,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Oxford Circle Jewish Community Center-                  Beth Israel'
LIMIT 1;

-- 314. Perry's Shul (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '5350 W Market St',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Perry''s Shul'
LIMIT 1;

-- 315. Philadelphia General Hospital (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '38th St & Woodland Ave',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Philadelphia General Hospital'
LIMIT 1;

-- 316. Philadelphia Tailor's Congregation (confidence: 0.19845)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'Hutchinson St & Girard Ave',
  NULL,
  'Philadelphia',
  'PA',
  '19130',
  39.9706807,
  -75.1516833,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Philadelphia Tailor''s Congregation'
LIMIT 1;

-- 317. Pnai Or Religious Fellowship of Philadelphia-Jewish Renewal (confidence: 0.2893401)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '6757 Green St              310 Wellesley Rd',
  'West Mount Airy',
  'Philadelphia',
  'PA',
  '19119-2905',
  40.05441,
  -75.195694,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Pnai Or Religious Fellowship of Philadelphia-Jewish Renewal'
LIMIT 1;

-- 318. Po'el Zedek (confidence: 0.5)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '716-8 Lombard St',
  'Center City',
  'Philadelphia',
  'PA',
  '19146',
  39.946843,
  -75.182807,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Po''el Zedek'
LIMIT 1;

-- 319. Poale Zedek Sharith Israel (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1011 S 5th St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19147',
  39.93541928112571,
  -75.15207816793826,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Poale Zedek Sharith Israel'
LIMIT 1;

-- 320. Podolier Gubernia Lodge (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1514 S 6th St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19148',
  39.9296206,
  -75.1555486,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Podolier Gubernia Lodge'
LIMIT 1;

-- 321. Poneviezher Lodge Congregation (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '4th & Reed Sts',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Poneviezher Lodge Congregation'
LIMIT 1;

-- 322. Progressive Geulas Israel (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '5th & Green Sts',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Progressive Geulas Israel'
LIMIT 1;

-- 323. Prushzveer Shershow Congregation:                         Also, Lenas HaZedek (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '542 Queen St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19147',
  39.9378239,
  -75.1530398561458,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Prushzveer Shershow Congregation:                         Also, Lenas HaZedek'
LIMIT 1;

-- 324. Raim Ahuvim (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '5854 Drexel Rd 59th St & Cedar Ave',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Raim Ahuvim'
LIMIT 1;

-- 325. Raim Ahuvim Anshe Kolker. [Chevra] See also, [Chevra] Mishkan Israel; Kolker Synagogue (confidence: 0.3572099999999999)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1929 S 5th St (at Dudley)',
  'Greenwich',
  'Philadelphia',
  'PA',
  '19148',
  39.923979,
  -75.154533,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Raim Ahuvim Anshe Kolker. [Chevra] See also, [Chevra] Mishkan Israel; Kolker Synagogue'
LIMIT 1;

-- 326. Reb Heschel Shul (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '417 Monroe St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19147',
  39.94015065,
  -75.15019855848988,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Reb Heschel Shul'
LIMIT 1;

-- 327. Rhawnhurst Jewish Center (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'Hoffnagle & Summerdale Aves',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Rhawnhurst Jewish Center'
LIMIT 1;

-- 328. Rodeph Shalom (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '615 North Broad St',
  NULL,
  'Philadelphia',
  'PA',
  '19123',
  39.9637089,
  -75.16049076650438,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Rodeph Shalom'
LIMIT 1;

-- 329. Rodeph Shalom Suburban (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '8201 High School Rd',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Rodeph Shalom Suburban'
LIMIT 1;

-- 330. Rodeph Zedek [Temple] (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '10th & Ruscomb Sts',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Rodeph Zedek [Temple]'
LIMIT 1;

-- 331. Rodeph Zedek Anshe Szager: See, Kesher Israel (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '788 S 2nd St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19147',
  39.9378334,
  -75.14659377183084,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Rodeph Zedek Anshe Szager: See, Kesher Israel'
LIMIT 1;

-- 332. Rudiviler Lubliner Lodge Congregation (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '410 Christian St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19147',
  39.93691757142857,
  -75.15054120408163,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Rudiviler Lubliner Lodge Congregation'
LIMIT 1;

-- 333. Russian Synagogue (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '98 Tomlinson Rd',
  NULL,
  'Philadelphia',
  'PA',
  '19116',
  40.12025777777777,
  -75.03671788888889,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Russian Synagogue'
LIMIT 1;

-- 334. Sabato Morais Congregation (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '502 N 4th St',
  'Center City',
  'Philadelphia',
  'PA',
  '19123',
  39.9612317755102,
  -75.14504014285714,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Sabato Morais Congregation'
LIMIT 1;

-- 335. Samuel Rosenwald Lodge Congregation (confidence: 0.3572099999999999)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1635 S 6th St (at Morris)',
  'Old City',
  'Philadelphia',
  'PA',
  NULL,
  39.9277489,
  -75.1555053,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Samuel Rosenwald Lodge Congregation'
LIMIT 1;

-- 336. Shaare Eliyhu (confidence: 0.1250234999999999)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '8th & Morris Sts',
  'Center City',
  'Philadelphia',
  'PA',
  '19133',
  39.9512871,
  -75.1535469,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Shaare Eliyhu'
LIMIT 1;

-- 337. Shaare Shamayim See Beth Judah, Rodeph Zedek, and Beth Chaim (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '23 & Wharton Sts.           9768 Verree Rd. ',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Shaare Shamayim See Beth Judah, Rodeph Zedek, and Beth Chaim'
LIMIT 1;

-- 338. Shaare Torah (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '728 W.             Moyamensing Ave',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19148',
  39.9203475,
  -75.15970335603866,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Shaare Torah'
LIMIT 1;

-- 339. Shaare Tzedek of Philadelphia Geriatric Center (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '5301 Old York Rd',
  NULL,
  'Philadelphia',
  'PA',
  '19141',
  40.033745,
  -75.145246,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Shaare Tzedek of Philadelphia Geriatric Center'
LIMIT 1;

-- 340. Shaare Yitzchok Congregation (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '2033 E Allegheny Ave',
  NULL,
  'Philadelphia',
  'PA',
  '19134',
  39.99356375,
  -75.11041498083881,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Shaare Yitzchok Congregation'
LIMIT 1;

-- 341. Shaare Zedek. (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'SW Corner 52nd St & Columbia Ave',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Shaare Zedek.'
LIMIT 1;

-- 342. Shaarei Eli (confidence: 0.1250234999999999)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '8th & Porter Sts',
  'Center City',
  'Philadelphia',
  'PA',
  '19133',
  39.9512871,
  -75.1535469,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Shaarei Eli'
LIMIT 1;

-- 343. Shaari Israel (confidence: 0.3572099999999999)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '2509 S 4th St (at Porter)',
  'Whitman',
  'Philadelphia',
  'PA',
  '19148',
  39.916934,
  -75.153677,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Shaari Israel'
LIMIT 1;

-- 344. Shari Zedek Anshe Reisicher: Also, Shaare Hatzedek Cong. Of Rezistchev (confidence: 0.3572099999999999)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1212 S 3rd St (at Manton)',
  'Pennsport',
  'Philadelphia',
  'PA',
  '19147',
  39.932683,
  -75.149707,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Shari Zedek Anshe Reisicher: Also, Shaare Hatzedek Cong. Of Rezistchev'
LIMIT 1;

-- 345. Sharith Israel (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '4th & Gaskill Sts',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Sharith Israel'
LIMIT 1;

-- 346. Shearith Israel (confidence: 0.19845)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '27th St & Girard Ave',
  NULL,
  'Philadelphia',
  'PA',
  '19121',
  39.9741302,
  -75.1805963,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Shearith Israel'
LIMIT 1;

-- 347. Shearith Israel Talmud Torah (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '2132 S 8th St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19148',
  39.9221623,
  -75.16011683021625,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Shearith Israel Talmud Torah'
LIMIT 1;

-- 348. Sheinfeld's Shul (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'Cambridge & Poplar Sts',
  'West Poplar',
  'Philadelphia',
  'PA',
  NULL,
  39.969332,
  -75.157475,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Sheinfeld''s Shul'
LIMIT 1;

-- 349. Shel Emeth [Chevra Chesed] (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '515 S 9th St',
  'Center City',
  'Philadelphia',
  'PA',
  '19148',
  39.94298755,
  -75.15666012684127,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Shel Emeth [Chevra Chesed]'
LIMIT 1;

-- 350. Shir Ami-Bucks County Jewish Congregation (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '101 Richboro Rd',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Shir Ami-Bucks County Jewish Congregation'
LIMIT 1;

-- 351. Shir Shalom (Society for Humanistic (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '116 Yew Rd',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Shir Shalom (Society for Humanistic'
LIMIT 1;

-- 352. Shivtei Yeshurun: Also, Shivtei Yeshurun Anshe Philadelphia; Adath Jeshurun Talmud Torah (confidence: 0.3572099999999999)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '2015 S 4th St (at Mercy)',
  'Pennsport',
  'Philadelphia',
  'PA',
  '19148',
  39.923041,
  -75.153078,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Shivtei Yeshurun: Also, Shivtei Yeshurun Anshe Philadelphia; Adath Jeshurun Talmud Torah'
LIMIT 1;

-- 353. Sholom Eswill [Chevra] (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '518 Mifflin St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19145',
  39.9248912,
  -75.15521663385996,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Sholom Eswill [Chevra]'
LIMIT 1;

-- 354. Shomre Emuno Anshe Kelem: Also, Khelmer Shul; Beth HaMedrash Hagodol (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '718 S 5th St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19147',
  39.940447000000006,
  -75.15118954545454,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Shomre Emuno Anshe Kelem: Also, Khelmer Shul; Beth HaMedrash Hagodol'
LIMIT 1;

-- 355. Shomre Shabbas (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '232 Lombard St',
  'Center City',
  'Philadelphia',
  'PA',
  '19146',
  39.94229365,
  -75.14719958969597,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Shomre Shabbas'
LIMIT 1;

-- 356. Shomre Shabbas (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '414 Christian St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19147',
  39.936931,
  -75.1505912857143,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Shomre Shabbas'
LIMIT 1;

-- 357. Shomre Shabbas (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '442 Dickinson St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19147',
  39.929572285714286,
  -75.152578,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Shomre Shabbas'
LIMIT 1;

-- 358. Shomre Shabbas (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '4th & Gaskill Sts (NW corner)',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Shomre Shabbas'
LIMIT 1;

-- 359. Shomre Shabbas [Chevra] (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '442 Jackson St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19145',
  39.92109765,
  -75.15496248448311,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Shomre Shabbas [Chevra]'
LIMIT 1;

-- 360. Shomre Shabbas: See also, Emunas Israel Ohev Sholom (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '518 S 3rd St',
  'Center City',
  'Philadelphia',
  'PA',
  '19147',
  39.9418937,
  -75.14767610287714,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Shomre Shabbas: See also, Emunas Israel Ohev Sholom'
LIMIT 1;

-- 361. Shomre Shabes UMachzikei HaDath: Also, Beth HaKeneseth Kaiserman (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '4194 Viola St',
  NULL,
  'Philadelphia',
  'PA',
  '19104',
  39.97540266666667,
  -75.20950133333334,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Shomre Shabes UMachzikei HaDath: Also, Beth HaKeneseth Kaiserman'
LIMIT 1;

-- 362. Sinai Temple (Aka Temple Sinai) (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1908 S 6th St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19148',
  39.92486425,
  -75.15630928667035,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Sinai Temple (Aka Temple Sinai)'
LIMIT 1;

-- 363. Soble Family Congregation [The] (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '5th & Champlost Sts',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Soble Family Congregation [The]'
LIMIT 1;

-- 364. Society Hill Synagogue (confidence: 1.0)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '418 Spruce St',
  'Center City',
  'Philadelphia',
  'PA',
  '19106',
  39.9448795,
  -75.14950832285018,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Society Hill Synagogue'
LIMIT 1;

-- 365. Suburban Jewish Community Center-B'nai Aaron (confidence: 0.81)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '560 Mill Rd',
  'Upper Roxborough',
  'Philadelphia',
  'PA',
  NULL,
  40.057512,
  -75.241483,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Suburban Jewish Community Center-B''nai Aaron'
LIMIT 1;

-- 366. Tacony Hebrew Congregation. Also see, Temple Menorah (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'Torresdale Ave & Longshore Ave',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Tacony Hebrew Congregation. Also see, Temple Menorah'
LIMIT 1;

-- 367. Talmudical Yeshiva of Philadelphia (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '6063 Drexel Rd',
  'Overbrook',
  'Philadelphia',
  'PA',
  '19066',
  39.9888083,
  -75.2478059,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Talmudical Yeshiva of Philadelphia'
LIMIT 1;

-- 368. Temple Beth Ami (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '9201 Bustelton Ave',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Temple Beth Ami'
LIMIT 1;

-- 369. Temple Brith Kodesh. Also see, Ner Zedek - Ezrath Israel (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '2106 Longshore Ave',
  NULL,
  'Philadelphia',
  'PA',
  '19111',
  40.04125515,
  -75.06420384998907,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Temple Brith Kodesh. Also see, Ner Zedek - Ezrath Israel'
LIMIT 1;

-- 370. Temple Isaiah (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '8900 Roosevelt Blvd',
  'Far Northeast Philadelphia',
  'Philadelphia',
  'PA',
  '19115',
  40.071409,
  -75.038291,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Temple Isaiah'
LIMIT 1;

-- 371. Temple Israel (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '59th St & Woodbine Ave                                    1981 Upland Way',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Temple Israel'
LIMIT 1;

-- 372. Temple Israel of Upper Darby (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'Bywood Ave & Walnut St',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Temple Israel of Upper Darby'
LIMIT 1;

-- 373. Temple Judea (confidence: 0.5)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '6929 N. Broad St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19145',
  39.9132156,
  -75.1720875,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Temple Judea'
LIMIT 1;

-- 374. Temple Judea of Bucks County (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '300 Swamp Rd',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Temple Judea of Bucks County'
LIMIT 1;

-- 375. Temple Menorah Kneseth Chai See also, Tacony Hebrew Congregation; The Northeast Jewish Community Center (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '4301 Tyson Ave',
  NULL,
  'Philadelphia',
  'PA',
  '19136',
  40.03123115,
  -75.04434888676022,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Temple Menorah Kneseth Chai See also, Tacony Hebrew Congregation; The Northeast Jewish Community Center'
LIMIT 1;

-- 376. Temple Shalom (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '2901 Edgely Rd',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Temple Shalom'
LIMIT 1;

-- 377. Temple Sholom of Broomall (confidence: 0.45)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '55 N Church Lane',
  NULL,
  'Philadelphia',
  'PA',
  '19138',
  40.0456486,
  -75.1560027,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Temple Sholom of Broomall'
LIMIT 1;

-- 378. Temple Sholom: Also, Upper Northwood Jewish Community Center (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'Large St & Roosevelt Blvd',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Temple Sholom: Also, Upper Northwood Jewish Community Center'
LIMIT 1;

-- 379. Temple Sinai (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'Limekiln Pike & Dillon Rd',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Temple Sinai'
LIMIT 1;

-- 380. Temple Zion (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1620 Pine Rd',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Temple Zion'
LIMIT 1;

-- 381. Temple Zion: Also see, Parker's Place (confidence: 0.3770549999999999)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '[The Mcfadden Estate]',
  'Francisville',
  'Philadelphia',
  'PA',
  '19130',
  39.969831,
  -75.160297,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Temple Zion: Also see, Parker''s Place'
LIMIT 1;

-- 382. Teshuath Israel (confidence: 0.45)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1518 Columbia Ave',
  'Fishtown',
  'Philadelphia',
  'PA',
  NULL,
  39.974743,
  -75.133741,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Teshuath Israel'
LIMIT 1;

-- 383. Tiferes B'nai Israel (confidence: 0.075)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '2478 Street Rd',
  NULL,
  'Bensalem Township',
  'PA',
  '19053',
  40.1135305,
  -74.95743163487397,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Tiferes B''nai Israel'
LIMIT 1;

-- 384. Tiferes Israel Anshe Zitomir-Gubernia Wohlin Nusach Sfard: Also, Anshe Zhitomir nusach Sfard (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '2300 S 6th St 604 Dickinson St',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Tiferes Israel Anshe Zitomir-Gubernia Wohlin Nusach Sfard: Also, Anshe Zhitomir nusach Sfard'
LIMIT 1;

-- 385. Tiferet Bet Israel (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1920 Skippack Pike',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Tiferet Bet Israel'
LIMIT 1;

-- 386. Tiferet Israel of Lower Bucks County (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '2909 Bristol Rd',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Tiferet Israel of Lower Bucks County'
LIMIT 1;

-- 387. Tiferet Joseph (confidence: 0.35)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '31st & Berks Sts',
  'Strawberry Mansion',
  'Philadelphia',
  'PA',
  '19132',
  39.993084,
  -75.183053,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Tiferet Joseph'
LIMIT 1;

-- 388. Tifereth Israel (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '40th St & Powelton Ave',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Tifereth Israel'
LIMIT 1;

-- 389. Tifereth Israel Anshe Lita (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '827 N 4th St',
  'Center City',
  'Philadelphia',
  'PA',
  '19123',
  39.9644523,
  -75.1439542962585,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Tifereth Israel Anshe Lita'
LIMIT 1;

-- 390. Tifereth Israel of Parkside (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '3940 W Girard Ave',
  NULL,
  'Philadelphia',
  'PA',
  '19104',
  39.97418,
  -75.202979,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Tifereth Israel of Parkside'
LIMIT 1;

-- 391. Tikvas Israel (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '41st & Viola Sts.',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Tikvas Israel'
LIMIT 1;

-- 392. Tikvas Zion (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '505 Lombard St',
  'Center City',
  'Philadelphia',
  'PA',
  '19147',
  39.942934666666666,
  -75.150755,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Tikvas Zion'
LIMIT 1;

-- 393. Tikvoh Chadoshoh (confidence: 0.5)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '5364 W Chew Ave.',
  NULL,
  'Philadelphia',
  'PA',
  '19120',
  40.03889,
  -75.137169,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Tikvoh Chadoshoh'
LIMIT 1;

-- 394. Torah Anshe Sfard (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '(nr. York)',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Torah Anshe Sfard'
LIMIT 1;

-- 395. Toras Israel. Also, Bialik Congregation; Beth Zion (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '2453-5 Phillip St (nr. Porter)',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Toras Israel. Also, Bialik Congregation; Beth Zion'
LIMIT 1;

-- 396. Touro Hall Free Synagogue (confidence: 0.375)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '10th & Carpenter Sts',
  'Hawthorne',
  'Philadelphia',
  'PA',
  '19147',
  39.938103,
  -75.159696,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Touro Hall Free Synagogue'
LIMIT 1;

-- 397. Tzedek V'Shalom (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '314 Washington Crossing Rd.',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Tzedek V''Shalom'
LIMIT 1;

-- 398. Vilna Congregation. Also, [Beis HaKnesses] Anshe Vilno. (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '509 Pine St',
  'Center City',
  'Philadelphia',
  'PA',
  '19147',
  39.9439145,
  -75.15075714464793,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Vilna Congregation. Also, [Beis HaKnesses] Anshe Vilno.'
LIMIT 1;

-- 399. Vine Street Synagogue: Also see, Eastern Women's Talmud Torah (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '201 Vine St',
  'Center City',
  'Philadelphia',
  'PA',
  '19106',
  39.955712,
  -75.142661,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Vine Street Synagogue: Also see, Eastern Women''s Talmud Torah'
LIMIT 1;

-- 400. West Oak Lane Jewish Community Center (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'Sedgwick & Thouron Sts',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'West Oak Lane Jewish Community Center'
LIMIT 1;

-- 401. West Philadelphia Hebrew Congregation (Beth Judah) (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '5426 Sansom St',
  NULL,
  'Philadelphia',
  'PA',
  '19139',
  39.9581728,
  -75.2303092,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'West Philadelphia Hebrew Congregation (Beth Judah)'
LIMIT 1;

-- 402. West Philadelphia Jewish Community Center (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'Ludlow St & Cobb''s Creek Blvd',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'West Philadelphia Jewish Community Center'
LIMIT 1;

-- 403. West Philadelphia Talmud Torah (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '6003 Larchwood St',
  NULL,
  'Philadelphia',
  'PA',
  '19143',
  39.95407932653062,
  -75.24260885714286,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'West Philadelphia Talmud Torah'
LIMIT 1;

-- 404. Wilner Congregation (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '314 Lombard St',
  'Center City',
  'Philadelphia',
  'PA',
  '19147',
  39.9423613,
  -75.1479345364929,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Wilner Congregation'
LIMIT 1;

-- 405. Winitzer Congregation: Also Beneficial Sons of David (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '302 Lombard St',
  'Center City',
  'Philadelphia',
  'PA',
  '19146',
  39.94234795,
  -75.14760171499503,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Winitzer Congregation: Also Beneficial Sons of David'
LIMIT 1;

-- 406. Woodside Park Congregation (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  'Cranston & Conshocken Rd',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Woodside Park Congregation'
LIMIT 1;

-- 407. Wynnefield Jewish Center (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '5820 Overbrook Ave.',
  'Overbrook',
  'Philadelphia',
  'PA',
  '19131-1221',
  39.990791,
  -75.241848,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Wynnefield Jewish Center'
LIMIT 1;

-- 408. Yagdil Torah (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '5701 N 13th St',
  NULL,
  'Philadelphia',
  'PA',
  '19141',
  40.03966615,
  -75.14209730640894,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Yagdil Torah'
LIMIT 1;

-- 409. Yagdil Torah (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '630 N 6th St',
  NULL,
  'Philadelphia',
  'PA',
  '19123',
  39.96271032653061,
  -75.14805475510204,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Yagdil Torah'
LIMIT 1;

-- 410. Yardley Synagogue (Beth El) (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '375 Stoney Hill Rd',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Yardley Synagogue (Beth El)'
LIMIT 1;

-- 411. Yavneh Synagogue (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '2222 N 53rd St',
  NULL,
  'Philadelphia',
  'PA',
  '19131',
  39.99022419869329,
  -75.23081850820266,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Yavneh Synagogue'
LIMIT 1;

-- 412. Young Israel of Elkins Park (confidence: 0.45)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '7715 Montgomery Ave',
  'Fishtown',
  'Philadelphia',
  'PA',
  NULL,
  39.97649,
  -75.130944,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Young Israel of Elkins Park'
LIMIT 1;

-- 413. Young Israel of Oxford Circle (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '6427 Large St',
  NULL,
  'Philadelphia',
  'PA',
  '19149',
  40.03892715,
  -75.0744596085419,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Young Israel of Oxford Circle'
LIMIT 1;

-- 414. Young Israel of Strawberry Mansion (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1939 N 31st St             (3rd Floor)',
  NULL,
  'Philadelphia',
  'PA',
  '19121',
  39.98582069387755,
  -75.18422291836734,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Young Israel of Strawberry Mansion'
LIMIT 1;

-- 415. Young Israel of the Main Line (confidence: 0.81)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '273 Montgomery Ave',
  'Fishtown',
  'Philadelphia',
  'PA',
  NULL,
  39.9769021,
  -75.1322534,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Young Israel of the Main Line'
LIMIT 1;

-- 416. Young People's B'nai Moishe: See, Adath Shalom (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '5th & Watkins Sts',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Young People''s B''nai Moishe: See, Adath Shalom'
LIMIT 1;

-- 417. Young People's Congregation - Shaare Israel; Also Adath Shalom (confidence: 0.81)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '342 Porter St',
  'Lower Moyamensing',
  'Philadelphia',
  'PA',
  NULL,
  39.9171558,
  -75.153408,
  true,
  'approximate',
  NOW()
FROM public.synagogues
WHERE name = 'Young People''s Congregation - Shaare Israel; Also Adath Shalom'
LIMIT 1;

-- 418. Young People's Congregation - Shari Eli. (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '728 W              Moyamensing Ave',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19148',
  39.9203475,
  -75.15970335603866,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Young People''s Congregation - Shari Eli.'
LIMIT 1;

-- 419. Zeiras Israel: Also, Catherine St. Shul (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '343 Christian St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19146',
  39.9370108,
  -75.14987173579136,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Zeiras Israel: Also, Catherine St. Shul'
LIMIT 1;

-- 420. Zemach David nusach Sfard (confidence: 0.2250422999999999)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '1437 S 6th St (nr Dickinson)',
  'Dickinson Narrows',
  'Philadelphia',
  'PA',
  '19148',
  39.930111,
  -75.154742,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Zemach David nusach Sfard'
LIMIT 1;

-- 421. Zemach David of Logan (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '6735 N 16th St',
  NULL,
  'Philadelphia',
  'PA',
  '19126',
  40.05613090225858,
  -75.14423932723376,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Zemach David of Logan'
LIMIT 1;

-- 422. Zemach David of Logan (confidence: 0.25)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '7976 Summerdale Ave (at Rhawn St)',
  NULL,
  'Philadelphia',
  'PA',
  NULL,
  39.9527237,
  -75.1635262,
  true,
  'low_confidence',
  NOW()
FROM public.synagogues
WHERE name = 'Zemach David of Logan'
LIMIT 1;

-- 423. Zikne Zedek (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '516 S 4th St',
  'Center City',
  'Philadelphia',
  'PA',
  '19147',
  39.942283,
  -75.149139,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Zikne Zedek'
LIMIT 1;

-- 424. Ziknei Israel [Chevra] (confidence: 0.9)
INSERT INTO public.addresses (
  synagogue_id, street_address, neighborhood, city, state, zip_code,
  latitude, longitude, is_current, geocode_quality, geocoded_at
)
SELECT 
  id,
  '432 Dickinson St',
  'South Philadelphia',
  'Philadelphia',
  'PA',
  '19147',
  39.92955675,
  -75.1530218483067,
  true,
  'exact',
  NOW()
FROM public.synagogues
WHERE name = 'Ziknei Israel [Chevra]'
LIMIT 1;


-- ============================================================================
-- Import complete!
-- Total addresses: 424
-- Low confidence geocodes: 179
-- ============================================================================
