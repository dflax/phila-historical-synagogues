-- ============================================================================
-- IMPORT SYNAGOGUES - Fresh Import (CORRECTED SCHEMA v2)
-- ============================================================================
-- Total records: 706
-- ============================================================================

-- Truncate existing data
TRUNCATE TABLE public.history_entries CASCADE;
TRUNCATE TABLE public.rabbis CASCADE;
TRUNCATE TABLE public.addresses CASCADE;
TRUNCATE TABLE public.synagogues CASCADE;

-- Insert synagogues
INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e85f2292-a2fd-4e18-bb3a-d8109f0ccb5f',
  'Abraham Potash Shtiebl [Reverend]',
  1955,
  '1955',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'fd58b591-a73b-47a7-80fe-91277a653560',
  'Achdus B''nai Israel. See, B''nai Israel @ E. Erie',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '2d212090-9278-4b43-b583-ab070513b836',
  'Agudas Israel',
  NULL,
  NULL,
  NULL,
  'Merged with Beth Ami,',
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'bede2b4b-1647-4f8f-a44f-24a3c00597f0',
  'Adas Moishe Montefiore',
  1907,
  '1907',
  1971,
  'Sold 1971',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'd46131b3-5924-471d-ac9b-98e07aa29a66',
  'Adat Beyt Mosheh Also, [The] Colored Hebrew Community',
  1951,
  '1951',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'c5ff16eb-93ea-45cc-a6cf-e6145677956b',
  'Adath Emanu-el',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'a0581824-f42d-43b9-b19f-45f836ceb0e9',
  'Adath Haemrth Israel [?]',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'b7e19b4f-b532-4ecc-8775-451a31ed6848',
  'Agudath Israel',
  1873,
  '1873',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '26b87bf3-33bc-4179-a131-d3e8ddabc766',
  'Adath Israel Nusach Sfard',
  1902,
  '1902',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '15909baa-52d6-4159-95a5-78426bc920e8',
  'Adath Israel of the Main Line',
  1946,
  '1946',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '3a3a7b77-55b5-403a-9e6a-30670a4064a8',
  'Adath Jeshurun',
  1854,
  '1854',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'a7630ae8-e02b-4b36-be75-9c199a1e308b',
  'Adath Jeshurun Havurah',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'cacc71d6-4f4c-4e04-ab34-3bffb051f02c',
  'Adath Jeshurun Talmud Torah Congregation. Also, Ezras Israel; [The] Carpenter''s Shul',
  1918,
  '1918',
  1962,
  '1962',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '2ea1467f-31f9-4f2a-925e-1eaeb766081f',
  'Adath Shalom.',
  1956,
  '1956',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '87aeed39-a5c4-4d9a-abd5-c4331e54133d',
  'Adath Tikvah - Montefiore',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e49b3a56-440e-4d45-9178-35e5fbae1668',
  'Adath Tikvah of Whitaker Ave',
  1961,
  '1961',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'ef6085b4-94f8-4072-ae87-c2474b49d687',
  'Adath Zion',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e3ce474e-2620-41d1-ac37-588f97a827cf',
  'Adath Zion Synagogue. See, Frankford Hebrew Congregation',
  1894,
  '1894',
  2008,
  '2008',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e6e0770c-b18b-46ba-9944-41fc887989f5',
  'Agudas Achim Machzikei Ha Rov. [Congregation]',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '47dccddf-a083-4ce8-83d0-1b220fe64c48',
  'See, Agudas Achim Rumanian Congregation',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '556e1d61-cc38-4fa8-9948-4e2ea5f67ff6',
  'Agudas Achim Rumanian Congregation. Also see, Or Chudosh; Or Chodash-Agudas Achim; Or Chudosh- Agudas Achim -- Rumanian American Congregation',
  1886,
  '1886',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'b56e89d3-9b6e-4a5d-94cd-69c782bbe55f',
  'Agudath Achim',
  1922,
  '1922',
  1958,
  'Disbanded 1958',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '73c48d1e-2cf9-4472-9da0-d4f894229525',
  'Ahavas Achim [Chevra] . See, Ahavas Achim Podolier Verein Anshe Sfard',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '20039899-3799-4d68-9d12-5b4e667e8f01',
  'Ahavas Achim Anshe Niezhin Nusach HaAri.',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'a49b4d71-f629-4f19-9726-ad3fd3894c0d',
  'Ahavas Achim Anshe Vitebsk',
  NULL,
  '[1918]',
  1960,
  'Early 1960''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '8a2db7b9-65d4-4d6e-ad24-673dcbefbb56',
  'Ahavas Achim Ostreicher.',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '0c9db82e-aec0-4b08-8ecb-d9a41ba466a2',
  'Ahavas Achim Podolier Verein Anshe Sfard. Also, [Chevra] Ahavas Achim',
  1891,
  '1891',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e10d8f6f-9102-4323-87c5-2c5933e1a3cc',
  'Ahavas Achim Talmud Torah Congregation. Also, Island Road Synagogue',
  1910,
  '1910',
  1960,
  'Sold in 1960''s.',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '380d3c52-d477-4b91-b726-27f9da0e280f',
  'Ahavas Chesed. See, [Chevra] Ahavas Chesed Anshe Shavel',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '07900394-2c0c-433b-9b31-34bfd5005e47',
  'Ahavas Chesed Anshe Shavel [Chevra]',
  1887,
  '1887',
  1940,
  'Early 1940''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e345ab70-f916-4d14-b9aa-ba1bac88440e',
  'Ahavas Israel',
  1909,
  '1909',
  1950,
  '1950''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'f84fed5e-50aa-430f-92e9-fd806db21818',
  'Ahavas Israel.                                                                 Also, [Chevra] Ahavas Israel Anshe Sfard',
  1920,
  '1920',
  1951,
  'Sold 1951',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'dde34143-c76d-46e8-a52b-a88fdd098850',
  'See, Ahavas Israel Anshe Kensington',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '06b4a8ec-a166-4e8e-8fd3-6efac03d8839',
  'Ahavas Israel Anshe Kensington. Also, Ahavath Israel of Kensington',
  1900,
  '1900',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e56c958f-65b2-461b-8d4e-2f9bb0b85dab',
  'Ahavas Israel Anshe Sfard [Chevra]                           See, Ahavas Israel',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e9f33448-77e4-427c-98d3-d72c58e321a0',
  'Ahavas Israel of Trenton',
  NULL,
  '[1920''s]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '2413f656-63fb-42c7-8ac5-352891c511f2',
  'Ahavas Torah',
  1975,
  '1975',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '95a55be7-95f7-4de8-a71d-545e851ce691',
  'Ahavas Torah Congregation',
  1937,
  '1937',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '6ce68580-5149-4aae-bd9a-dc27f1951ada',
  'Ahavath Israel',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'f3257b9c-e126-4e7c-b314-c69353f30926',
  'Ahavath Israel of Kensington.',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '660fd40f-3fa0-4d49-9e3a-ff10d9f258d4',
  'Ahavath Israel of Oak Lane',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '73b92e52-a527-4c81-a677-17259e406706',
  'Ahavath Zion',
  NULL,
  'Before 1901',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '81a39d8c-34d2-4062-91ec-b0394efce029',
  'Aish Village Shul',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '5c6f477a-47ce-4120-8a14-98d2ef38beb1',
  'Aitz Chaim',
  1933,
  '1933',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '3f44a7f2-4a56-4c61-9a2a-fa789fe318ee',
  'Aitz Chaim. Also, Heiner Fiscal "chicken foot" Shul; Kaiserman Shul',
  1920,
  '1920',
  1950,
  'Late 1950''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'd4b000a1-d049-46f0-9caf-89fe7fe9be78',
  'Aitz Chaim of Oxford Circle',
  1960,
  '1960',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '84a9bbd4-a9b6-4b45-bc7b-377f47299bad',
  'Aitz Chaim Synagogue Center',
  1964,
  '1964',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '25f72969-e0cf-45e6-8e32-c74d2c6a5290',
  'Aitz Chaim Synagogue Center, Tifereth Israel Chapel',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '6940c1d3-ed3b-4732-93d2-3f316cb01fc3',
  'Aitz Chaim VeZichron Jacob',
  NULL,
  '[1918]',
  1960,
  'Early 1960''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e344763f-c3d2-4dcb-8595-bbda770747ac',
  'A.M. Burd''s Shul',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '70aa0720-1dd3-40b3-b3a6-7d72532199fb',
  'Anshe Birz. See, [Chevra] Poale Zedek-Anshe Birz',
  1889,
  '1889',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'cf776561-eec4-494f-a3b6-89a5142da812',
  'Anshe Emeth',
  NULL,
  '[1890''s]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '95d87cbc-4ac1-4106-9398-e3d913b3371e',
  'Anshe Emeth. Also, Aitz Chaim',
  1927,
  '1927',
  1940,
  '1940''s.',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '0bbedfbb-0144-4287-b33b-153c86867349',
  'Anshe Emeth. See, B''nai Halberstam',
  1872,
  '1872',
  NULL,
  'Disbanded 1893',
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'dbaf2d49-5254-4ae8-970c-f0ced04b3d5b',
  'Anshe Hisan. Also, Chevra Heisner; Heisinger Congregation; Hesiner Independent Young Men''s Society',
  1915,
  '1915',
  1955,
  'Mid 1950''s. Building then used as a Folk Shul.',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '7c79dd52-71ff-4032-b32e-723101af908d',
  'Anshe Jaffe.                                                                       See, [Chevra] Ahavas Chesed Anshe Shavel',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '7340a645-5456-43bb-82aa-fffa6e5b57b4',
  'Anshe Kuppel Vohliner. Also, Chevra Vohliner Anshe Kuppel',
  NULL,
  '[1927]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '18fbee51-7505-4bdb-b317-bcdc2a3622bd',
  'Anshe Lubowitz nusach Ari [Chevra]                           Also, Chevra Mishnais Anshe Lubavitch',
  1911,
  '1911',
  1940,
  'Early 1940''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'bf77fea9-17cc-4010-8acb-2c254be24137',
  'Anshe Ostropolier',
  1935,
  '1935',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '30661e10-1f7b-4c09-af08-314bb91facfd',
  'Anshe Shalom',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '449210f9-0208-4a59-9b1f-25587c2a46b9',
  'Anshe Sholem',
  1910,
  '1910',
  1971,
  '1971/2',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'da949dd2-7d59-45b6-9792-0217ffa4120d',
  'Anshe Shulamit',
  1920,
  '1920',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '74204e80-80d0-4846-ae39-03136b33a866',
  'Anshe Sodo Lovon.                                                          See, Chevra Mishnayos Kehilas Kodesh Anshe Sodo Lovon',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'a1fcdea8-7d3c-4db1-ae0b-3728d6311c52',
  'Anshe Sude Luvin Biela Ziercow.                                            See, Chevra Mishnayos Kehilas Kodesh Anshe Sodo Lovon',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e527b0f5-57ce-4cc3-9857-8892b409e58e',
  'Anshe Szager ; See B''nai Jacob @ Lombard',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '4c6ed9bc-5303-481b-abc0-fa1bba2616e1',
  'Anshe Vilno [Beis HaKnesses] See, Vilna Congregation',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '2261c05b-a06f-40c5-9a4a-19128ffdd981',
  'Anshe Wohliner',
  1919,
  '1919',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '137a25bd-2e70-436e-b134-1285bd969bfe',
  'Anshe Zhitomir nusach Sfard.                                          See, Tiferes Israel Anshe Zitomer-Gubernia Wohlin Nusach Sfard.',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'b74cca5f-b4c2-45fd-91b4-85c53c2c49de',
  'Anshei Vilna ',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '0803347e-ab01-4c45-9db4-96d341dd06a7',
  'Ateres Anshe Brohin V''Choimetsh [Chevra] See Atereth Israel (S.6th & Morris)',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '9dd74552-4b6f-4898-a7b6-6677188c55a7',
  'Atereth Israel',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '95f933c4-23b3-4c88-bf7c-6a81f166bc77',
  'Atereth Israel.                                                                  Also, [Chevra] Ateres Anshe Brohin V''Choimetsh',
  NULL,
  '[1903]',
  1977,
  '1977/8.',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '714cba29-21b1-46ed-b353-2811a7e508a7',
  'Atereth Israel of Overbrook',
  1922,
  '1922',
  1942,
  '1942',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'f25eb5dd-00d6-4f0a-825c-a9cddae79dda',
  'Atereth Israel. (Previously B''nai Aruyh Moshel) Also, Jewish Farmers'' Shul',
  1895,
  '1895',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '2cf72634-3a0c-4bef-8f45-a80cc9c3545d',
  'See, Austrian Galizianer Shul',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '261e741f-330e-4274-8772-5bdd4772187c',
  'Austrian Galizianer Shul. Also, Ohavas Achim Ostreicher',
  1907,
  '1907',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e2aceda9-1892-462e-a1d5-e1b73e020f53',
  'Austro-Hungarian Congregation.                                Also, [Chevra] Re''im Ahuvim',
  1892,
  '1892',
  NULL,
  'Active??',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '338ab301-a6fb-4f0c-ac33-92b0f7661b7c',
  'B''nai Aaron',
  1926,
  '1926',
  NULL,
  'late ''60''s',
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'b85c2fa6-81e7-4e68-af12-9860c9d9649b',
  'B''nai Aaron of Parkside',
  1929,
  '1929',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '1b4e6686-5051-422c-9b07-f8444b30434b',
  'B''nai Aaron Temple',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '5d4b9804-4730-4a9f-a16b-e7051a50d14b',
  'B''nai Abraham',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '1a25bf2b-a087-4968-95ba-523ec18562b4',
  'B''nai Abraham Congregation',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '259d35e0-fe6d-475c-b951-edbe5bb3b221',
  'B''nai Abraham Jewish Center',
  1960,
  '1960',
  1985,
  '1985',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '803a7d20-07e8-4ee1-8057-5cd1773c2243',
  'B''nai Abraham- Anshe Russ.                                       Also, [Chevra] B''nai Abraham; Di Rusishe Shul;',
  1882,
  '1882',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'c2ee8f9f-d107-4f80-ac5a-2ef21d52b522',
  'B''nai Amoona',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'd8674370-76ec-4beb-8108-a716d3319e3c',
  'B''nai David',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '27b24f76-c627-4b71-ac20-8c4866ef97f8',
  'B''nai David Congregation',
  1894,
  '1894',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'fb792b69-35b4-4cef-85a7-d5a21792d0d2',
  'B''nai Ephraim',
  1919,
  '1919',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'eb8c8a7e-a697-4e1b-bf09-d7c9d27defbd',
  'B''nai Halberstam.                                                              Also, Anshe Emet; B''nai Israel-Halberstam; B''nai Israel-Ohev Zedek; B''nai Israel-Ohev Zedek-B''nai Halberstam ',
  1886,
  '1886',
  1976,
  '1976',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '24a8fec7-9dee-4347-9e51-230b2f855a0e',
  'B''nai Halberstam: See B''nai Israel - Ohev Zedek - B''nai Halberstam.',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'f54fce5f-7d8a-4d27-8ab1-dbdc4783e49b',
  'B''nai Israel',
  NULL,
  '[1921]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '5616968c-e440-4bcf-8b9e-3aee8b2436e4',
  'B''nai Israel. Also, Ahdus B''nai Israel',
  1921,
  '1921',
  1964,
  '1964',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'af4d1e72-1ddd-4485-9251-df151775b813',
  'B''nai Israel Anshe Polin',
  1905,
  '1905',
  1960,
  '1960''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '826400d9-2e06-4fd5-b546-69436078efaa',
  'B''nai Israel. See, Beth Elohim (at S.5th)',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e4e636a8-f6fc-4fd5-b75a-eb1e262bce4e',
  'B''nai Israel of Fairmount. See, Old Man Miller''s Shul',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '8e55b038-f63e-48ff-b07f-9d8db863eda8',
  'B''nai Israel of Olney',
  1921,
  '1921',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '2d75f130-455d-4d04-9a51-cbaafb5dc7f2',
  'B''nai Israel-Halberstam. See, B''nai Halberstam',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'bb7c5fb0-2737-493e-956d-34021825e406',
  'B''nai Israel-Ohev Zedek. See, B''nai Halberstam',
  1886,
  '1886',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'c7391c80-5396-4e68-8497-f24653b29da1',
  'B''nai Jacob',
  1912,
  '1912',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'f163c25f-ad37-4167-a20e-c456c7f3a915',
  'B''nai Jacob - Dirshu Tov',
  1961,
  '1961',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '96d1fcd5-f57f-4369-9a37-d39d51967323',
  'B''nai Jacob Anshe Sfard',
  1898,
  '1898',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '78e22a83-0e3f-405c-afa7-a0fcd440ee76',
  'B''nai Jacob. Also, Kesher Israel',
  1883,
  '1883',
  NULL,
  '1893',
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '84fea56d-fc30-4913-9e96-4f239f041547',
  'B''nai Jeshurun Ahavas Chesed',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '2fab8bf9-6212-4d96-bdaf-7e02b039ff38',
  'Congregation B''nai Jeshurin of Mt.Airy',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '127399a1-1e6d-435f-9aca-592ea019aa55',
  'B''nai Jeshurin Synagogue and Community Center',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '26a438d9-83e5-4271-b8c7-c566f1c0ade5',
  'See, B''nai Jeshurun',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '96a3e726-7024-4c12-a9c8-41fb142b4c03',
  'B''nai Jeshurun. Also, B''nai Jeshurun of Mount Airy',
  1915,
  '1915',
  1962,
  'Sold 1962',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '14af5f3f-12ee-40a1-9925-9a18e6944eb9',
  'B''nai Jeshurun of Mount Airy.',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '3f8aaee7-8171-4d01-9fc1-99e00f1b68d0',
  'B''nai Joseph',
  1892,
  '1892',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '399096ac-5d62-405c-83a3-ae072b1ebd24',
  'B''nai Joshua',
  NULL,
  NULL,
  1974,
  '1974',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '3bf15809-6d9d-4338-b267-b8e79f43ed3f',
  'B''nai Menasha',
  1920,
  '1920',
  1949,
  '1949',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '3f1c7efd-ac9b-4d8c-83db-41a9e7d030f2',
  'B''nai Menasha [Congregation] See, Aitz Chaim VeZichron Jacob',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '5f69ac44-495e-42cd-b3b4-7996ac2cc57d',
  'B''nai Menasha. Also, The White Shul',
  NULL,
  '1920''s [1925]',
  1957,
  '1957',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '38a56e4d-819a-41f7-84a9-814068acbb14',
  'Congregation B''nai Menoshe',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '6324d646-aba6-427e-9d2a-403a189602d2',
  'B''nai Moishe',
  1938,
  '1938',
  1940,
  'Late 1940''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '341b29a3-022f-4510-b4ec-9e5981c5a566',
  'B''nai Moishe Anshe Sefard. Also, B''nai Moshe - Poale Zedek',
  1903,
  '1903',
  1982,
  '1982',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '6a3117aa-a872-47f0-a9d1-4dc949d0a139',
  'B''nai Moses Montefiore Anshe Polin',
  1887,
  '1887',
  1940,
  'Early 1940''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '04701a6e-8101-44cc-94a9-da9051d55245',
  'B''nai Moshe - Poale Zedek.                                              Also, B''nai Moshe - Poale Zedek',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '125b85ae-8c87-4dee-9028-82839760a93f',
  'B''nai Moshe Gomel Chesed Shel Emes',
  NULL,
  '[1895]]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '4de4da00-8265-4089-94b8-eb0d3bbf7739',
  'Congregation B''nai Moshe Poale Zedek',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '75f8a2a2-1551-4579-ae07-5f3c1944df2d',
  'B''nai Nachman. See, B''nai Nahum',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '23c272a3-193f-4378-96cc-a6e7ef5c8d55',
  'B''nai Nahum. Also, B''nai Nachman',
  NULL,
  '1921    [1926]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '9d3ab1b5-7558-4d3a-846e-193be8bd48df',
  'Congregation B''nai Or',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '770a81e4-58b9-4994-86fa-5bec68ea8a2a',
  'B''nai Reuben Anshe Sephard [Chevra]',
  NULL,
  '1883     [1888]',
  1955,
  'Mid 1950''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e5fddef4-8bda-4c4b-8eeb-feea0e3fed1e',
  'B''nai Sholom',
  1924,
  '1924',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '33678631-8ae7-47d0-9c5d-4d91063a5037',
  'B''nai Shram',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '0fea859b-39b2-4389-a10f-b25b5a1f7317',
  'B''nai Tikvah',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'afe83928-c2f1-425c-ba29-fd2f605bf741',
  'B''nai Tikvah-Beth Israel',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'f4c5586b-7410-49f6-b1d9-9591a02251ae',
  'B''nai Torah',
  1961,
  '1961',
  1976,
  '1976',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '23467554-958e-4536-b995-db9c321d449a',
  'B''nai Torah Congregation',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e6b338d8-39cc-4abf-8ce4-48d0f341cd6a',
  'B''nai Yehoshua',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '268f7484-adaf-44f0-903d-fdbe2d027868',
  'B''nai Yitzchok',
  1924,
  '1924',
  1980,
  'Sold early 1980''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '45d1a359-4b60-4403-8eec-ce1d077ac58e',
  'B''nai Zion',
  1901,
  '1901',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '05345dec-27f6-443b-bbed-7a420c6e30e6',
  'B''nai Zwi',
  1938,
  '1938',
  1950,
  'Late 1950''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e5c0959d-9bb1-420c-abe7-11c35ff6e884',
  'Beit Harambam',
  1978,
  '1978',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '9cbbc1fd-ebbb-417f-beef-877dd2b0e218',
  'Beit Harambam Congregation',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'c91a3181-6613-4847-bf85-819e9cd9e78b',
  'Congregation Beit Tefilah',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '8cbb3140-2039-4984-8246-bbaa72ea1b4f',
  'Bensalem Traditional Minyan',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '206363fc-e57d-4271-be2b-1bea063f9d30',
  'Bessarbier Talmud Torah',
  NULL,
  '[1912]',
  1934,
  '1934',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '031ed7d2-1341-40a5-bde3-46d1eb1860c4',
  'Bet Mishpachah',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'd36ff4a5-177e-490c-8a7e-4661b3fad91e',
  'Beth Abraham',
  1914,
  '1914',
  1960,
  'Incorporated into Beth Ami 1960''s.',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'c92ca858-e980-4828-94e2-1373b4460222',
  'Beth Ahavah',
  1975,
  '1975',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '2f2b9a90-d386-4283-b75b-81f609ef93cd',
  'Congregation Beth Ahavah at Rodeph Shalom',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '48eb076d-cc47-46b1-a827-054ac61b387a',
  'Temple Beth Ami',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'bd23d31b-5fa5-4421-ba45-2248c1d4ad33',
  'Beth Am Israel',
  1922,
  '1922',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '11b356e3-84bd-46bb-9cc4-2ab863b0b886',
  'Beth Am: See Old York Road Temple - Beth Am',
  NULL,
  NULL,
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'f681cc50-35a5-44e1-890d-b5baec6cb9a6',
  'Beth Chaim',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '4e5f821a-15bd-4971-82e2-49a77d41c87b',
  'Beth Chaim at Feasterville',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'c029dac2-d6d7-4a22-923f-7f00077e5425',
  'Beth Chaim Reform Congregation',
  1992,
  '1992',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '0a0b9853-c31e-4ffd-9707-cb78de7a04f9',
  'Beth Chaim  Reform Temple ',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '68917971-0731-4934-a90d-a0746204e56a',
  'Beth David',
  1898,
  '1898',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '742e6e55-ffee-4321-b13b-f26a63e39b5c',
  'Beth David Reform',
  1942,
  '1942',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '6f9e73c7-0eb9-44f6-9099-f85ef8936182',
  'Beth El',
  NULL,
  '1950''s',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '99d16a97-7c13-4639-a506-0a6e1c138e6f',
  'Beth El Emeth',
  1857,
  '1857',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '3be60ad9-737b-4b6d-8ad5-f0f31df414ac',
  'Beth El of Bucks County',
  1953,
  '1953',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '16e3951d-2d77-412a-b418-738112807caf',
  'Congregation Beth El of Levittown',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '29c28a37-1472-4172-8371-dca27082a418',
  'Congregation Beth El of Lower Bucks County',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '321f2619-a60e-49eb-bbea-2202f63f06f7',
  'Beth El: Also Rothschild Memorial Synagogue',
  1907,
  '1907',
  1970,
  'Merged with Beth Hillel and moved into their building 1970.',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '36e0ec3b-8ca7-45eb-9ff2-a88ef1407d6c',
  'Beth El, Suburban',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '305afc0e-b9b6-42f7-a5ef-ca8d1b68b039',
  'Congregation Beth El, the Levittown Jewish Center',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '5a69af17-681b-4beb-b6bb-cdedb6a827b4',
  'Beth El-Ner Tamid',
  NULL,
  NULL,
  NULL,
  'Active??',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '7c93908c-cf6e-405e-acc2-ec6f3f7b9303',
  'Beth Elohim',
  1893,
  '1893',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '6ee9f5b6-633e-4983-882a-1376faeca70e',
  'Beth Elohim. Also, Krakauer-Beth Elohim Beneficial Association; [The] Hollander Shul; B''nai Israel',
  NULL,
  '1879           [1879]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '1834137a-6909-4d5a-a7a9-a309e1616dd1',
  'Beth Emeth.',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'f7862154-b19e-408c-b9d5-4e69eea26e78',
  'Beth Emeth-B''nai Yitzhok',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '375c5b1f-25a7-4d57-bb12-12f9a170ce7f',
  'Beth Emuna Congregation',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'c254dbea-3ae3-4249-bfb6-5ca979a933f9',
  'Beth HaKeneses Reb Hirshel.                                      See, Beth HaKeneseth Reb Eichler',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '074134ae-f5d3-475a-8a54-39e291fd2963',
  'Beth HaKeneseth',
  1930,
  '1930',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '30a0a94f-df5a-477c-9c61-99f64793bc80',
  'Beth HaKeneseth Ben Markowitz',
  1927,
  '1927',
  1937,
  '1937',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '35c788f7-cbc4-47b7-8973-0fa0c8888311',
  'Beth HaKeneseth Brezofsky',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '9071014d-f9d5-4ccb-a51a-b3daf6386e78',
  'Beth HaKeneseth Northern Hungarian',
  NULL,
  '[1901]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '51f56055-0538-475c-8051-95482a99a75d',
  'Beth HaKeneseth Reb Eichler. Also see, Beth HaKenesses Reb Hirshel',
  1900,
  '1900',
  1940,
  'Disbanded early 1940''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e017fb7c-3e9a-4cdb-a25f-989e14f1e4b1',
  'Beth HaKneseth Kaiserman. See, [Chevra] Shomrei Shabos Umachzikei Hadath',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'a6c0f71d-fd23-4e80-b239-cce48007ecd7',
  'Beth HaKneseth-Beth Shalom',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '5ce6fa31-1824-49f0-9d23-f138695791f7',
  'Beth Hakneseth-Talmud',
  1932,
  '1932',
  1956,
  '1956',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'ec5dec4c-061c-4f59-9a33-bd0e108625c8',
  'Beth HaMedrash',
  1958,
  '1958',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '37dcbb2f-2376-4ab9-8f29-203b1e6d722a',
  'Beth HaMedrash Anshe Kaneau',
  NULL,
  '1908          [1911]',
  1940,
  '1940',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '5f6956d8-ad58-4df1-a047-cdcc7a31d81d',
  'Beth HaMedrash Dorshe Sholom',
  NULL,
  '[1923]',
  1960,
  'Early 1960''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '284bba3d-2067-48ad-ac16-97b34557bb06',
  'Beth HaMedrash HaGadol Nusach Ashkenaz.         Also see, [The] Khelmer Shul',
  1905,
  '1905',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'd53a8d39-5a58-49cc-9329-0c0360f76153',
  'Beth HaMedrash Hangdog Anshe Ashkenaz.         See, Jewish Rumanian Congregation -               Agudas Achim',
  NULL,
  '1911            [1911]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '9e0e125e-7310-41f2-8958-010f77fb7be3',
  'Beth HaMedrash Hare',
  1952,
  '1952',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'dca174dc-48b1-43f9-a71e-927edbcc06c7',
  'Beth HaMedrash Reb Sofronski',
  1923,
  '1923',
  1930,
  'Early 1930''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'd90d8074-e5e4-44b9-9923-a0ec54af90ea',
  'See also, Beth HaMedrosh Hagodol- Beth Yaacov',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '29651910-4e30-4a49-a07a-eb2dc3bee908',
  'Beth HaMedrosh (mid- town Chapel)',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e4278f35-c5e0-439c-9cbe-c31ce358b9f6',
  'Congregation Beth Hamedrosh of Overbrook Park',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '049123a0-698e-4284-90a0-82a3f245f035',
  'Temple Beth Hillell ',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '3c902526-448e-436d-8ab2-fee78e9bf465',
  'Beth Hillel-Beth El',
  1958,
  '1958',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '0aaff20b-da3c-4173-a7f2-26078b17086c',
  'Beth Israel',
  1901,
  '1901',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '21340714-96f8-458b-baf1-7c5ef7dba696',
  'Brith Israel Congregation',
  1921,
  '1921',
  1990,
  '1990',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '76757656-2863-44e3-aebd-f2a31d2c107b',
  'Beth Israel Congregation of Chester County',
  1904,
  '1904',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '2abc4731-dcf7-40ae-b8df-6421e1450a04',
  'Beth Israel of Media',
  1929,
  '1929',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '4f3b0669-9c56-45ff-99e4-0e83254068b5',
  'Beth Jacob',
  1908,
  '1908',
  1950,
  '1950''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '7b7502be-d95a-4ce3-a660-6539a17fd5ad',
  'Beth Jacob Anshe',
  1897,
  '1897',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '070948a5-f6f0-44ef-afa9-9b4b882be0d3',
  'Beth Jacob Anshe Dadmoor',
  1927,
  '1927',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '3b20c27f-ac31-4ccc-b5a6-2369eff87e9d',
  'Beth Jacob of West Philadelphia [Chevra]',
  1916,
  '1916',
  1962,
  '1962',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'ade8a534-101f-44b2-9e69-efa1ff2ca0a3',
  'Beth Judah',
  NULL,
  '1920''s [1925]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '19027030-89c1-4031-ac01-16fe3a78ce4b',
  'Beth Judah. Also, Hebrew Congregation of West Philadelphia',
  1905,
  '1905',
  1968,
  '1968',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '456cf59c-656b-4527-8c1e-f62196bd4fb9',
  'Congregation Beth Judah of Logan',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '21dfdb85-d3e6-4993-bd38-3e72b61f6533',
  'Beth Midrash Harav ',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'd89e1c67-7d43-4e0c-b261-23ebf037478f',
  'Congregation Beth Moshe',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '2e2a3422-e7c8-40e6-b40b-e7390ba4c140',
  'Beth Or Reform Congregation',
  1954,
  '1954',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'f1934110-362b-4289-bf1d-0320e16fc32d',
  'Beth Schmuel. Also, Beth Samuel; Bes Schmuel',
  1922,
  '1922',
  1950,
  '1950''s.',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '410f0302-5aba-4f0c-b1c3-64262d837ec2',
  'Beth Shloime Rumanian Congregation.                      See, Beth Solomon',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '9c19bf8e-6e0e-43f7-81ea-7b54c7bb3d03',
  'Temple Beth Sholom',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'c07ff42e-d81c-4e98-b2e1-d68d8ec8234d',
  'Beth Sholom Congregation',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'f60bd8bc-5027-4d05-8a65-e59558ef6097',
  'Beth Sholom Congregation Logan',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e6c478c7-5ab0-4f25-a624-54c10608dc24',
  'Beth Sholom.                                                                       Also, Logan Congregation Ahavas Israel',
  1917,
  '1917',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '333bc0a6-5341-42f9-babc-af58b7dfbca7',
  'Beth Solomon',
  1961,
  '1961',
  NULL,
  '1970s',
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'eca07821-e20f-41fa-8551-7bd7ffdcda6d',
  'Beth Solomon.                                                                  Also, Beth Shloime Rumanian Congregation',
  1948,
  '1948',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '8e9e82a9-2582-476b-90a4-988783810c23',
  'Congregation Beth Solomon Suburban',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'a425cb52-e572-4038-a89a-8b6408becf4f',
  'Beth Solomon Suburban (of Somerton)',
  1968,
  '1968',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '29a29be0-bd9b-4ebf-8681-96366a5b83ee',
  'Beth Tfilla of Overbrook Park',
  1948,
  '1948',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '71aac2ff-9f52-48a4-a5f7-974c4e306a73',
  'Beth Tefilath Israel',
  NULL,
  '1910          [1912]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'bbc3acff-0489-4794-a233-40b993a49115',
  'Beth Tefilath Israel - Beth Judah',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e028b165-3340-4c75-ba4a-3eefb18473f6',
  'Beth Tefilath Israel - Rodeph Zedek',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '85fde69a-ede8-4eeb-ba75-a9c4b56fce09',
  'Beth Tefilath Israel of Pennypack Park',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '5a8c0e24-9800-4e29-b79a-8286a124e7aa',
  'Beth Tikvah',
  1958,
  '1958',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '46dfd8bb-c5d1-47d7-a40e-10e34afa80bd',
  'Beth Tikvah-B''nai',
  NULL,
  NULL,
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'fe818018-9ef0-4870-8106-9efc2b3282b6',
  'Temple Beth Tikvah-B''nai Jeshurin',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '7ffcc7a7-b958-425a-b56a-97e467cb2ef1',
  'Beth Torah [Temple]',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'dd088f4f-6fa3-4830-8fd4-f5bae6a8e03b',
  'Beth Tovim',
  1964,
  '1964',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'a4f486e4-1a4b-4cfc-a7c7-f935c1eda2f2',
  'Beth Uziel',
  1943,
  '1943',
  1994,
  '1994 -',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '7d4b33ea-df59-4c09-a34b-5183988c10a3',
  'Beth Zion',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '1c9e97c8-55cc-4c56-b1f5-2c3ee3e24318',
  'Beth Zion Temple',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '05f33ca3-6045-42b3-8ce8-8de0d88fca46',
  'Beth Zion. See, Toras Israel',
  1937,
  '1937',
  1970,
  'Early 1970''s.',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '1534c618-b2d6-4760-804c-664393056c4e',
  'Beth Zion-Beth Israel [Temple]',
  NULL,
  NULL,
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '924d3f38-b69b-4585-866e-388dc2372068',
  'Congregation Beth-El - Suburban',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '3f9be7b8-ccc7-4893-ab99-453bb7826d9b',
  'Temple Bethell',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'a4fb8cdb-47bf-49ef-b70b-40120e3aae76',
  'Bialik Congregation. See, Toras Israel',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '08bceb73-64d8-4ebc-9057-b079a2356c53',
  'Bialostotski Minyan',
  1914,
  '1914',
  1930,
  'Disbanded 1930''s &',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'fdcb4cbb-ef47-4793-a921-54ec7bf88856',
  'Bikur Cholim [Chevra ]',
  1861,
  '1861',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'c8ec628c-2c33-4c2c-bd41-06d7444be905',
  'Birchas Shalom',
  1935,
  '1935',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '15ce9dc8-a9eb-425b-813b-4a362f63061e',
  'B’nai Israel Halberstam',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '1ce8e7c3-b88f-4d8c-9867-bd434b2d594a',
  'B’nai Israel of Logan ',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '665d7407-3fa1-4a49-bb20-8128a3aa3c60',
  'Congregation B’nai Israel-Ohev Zedek',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e4f60d09-ec77-4ce3-84d8-ad3a4a049520',
  'Boulevard Park. Also see, Ner Zedek - Ezrath Israel',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '49af2246-96ef-4214-9e46-6295b3301953',
  'Boulevard Temple ',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'f29b038e-e03f-4f86-8017-5752d0da3b63',
  'Boulevard Temple, Congregation Beth Torah',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '803cb422-26b4-492a-b41a-2ca539ee04b3',
  'Boulevard Temple Reform Congregation',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '054b9008-c074-4211-8028-85f1a3c60198',
  'Boulevard Temple. Also Temple Beth Torah',
  1949,
  '1949',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '897a5b68-e669-452d-b4b1-da26ced23e21',
  'Bristol Jewish Center',
  1904,
  '1904',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '7f42840c-6c5d-469d-8ddc-8d390b8614dc',
  'Brith Achim',
  1971,
  '1971',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'bdad964d-d74e-4b2f-a210-849da4cd53c4',
  'Congregation Brith Israel',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '8c5d3dcd-c2d8-430b-94bd-ef2dc93b267e',
  'Temple Brith Kodesh',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'ef2c97e7-9572-4a6f-8766-9a652f8cbf4b',
  'Temple Brith Kodesh. Also see, Ner Zedek - Ezrath Israel',
  1952,
  '1952',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '05a4c83e-3ecd-4905-9694-b6fe830bd3e2',
  'Brith Sholem Synagogue of Paschall Ave. Also see, Brith Sholom Community Center',
  1916,
  '1916',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '79459043-42b3-48da-b938-d6d1c471cd75',
  'Brith Sholom',
  1891,
  '1891',
  1970,
  'Sold by early 1970''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '6cf7ed51-bc42-47ab-b58f-cf5151c020ff',
  'Brith Sholom. See, Brith Sholom (@ N.5th)',
  1897,
  '1897',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e47b2302-e452-4175-8d86-c50c2f65634b',
  'Brith Sholom Chevra Kedusha.',
  1890,
  '1890',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'ff6d614b-854c-4c80-937d-8a0812d4c1fb',
  'Brith Sholom Community Center',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '225ab4fa-421b-45cb-9350-ade474e7adad',
  'Brith Sholom Community Center. Also see, Brith Sholem Synagogue of Paschall Ave.',
  1940,
  '1940',
  1960,
  'Late 1960''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'cadc951c-77e6-46db-aef6-cb2a400aed87',
  'Brotherhood Temple Achim',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'f82fbbf3-d8d2-4cc2-9052-fee9e1c86570',
  'Brotherhood Temple Brith Achim ',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '782d83b0-9ff5-450b-af00-c03f75f91f7c',
  'Brothers of Israel',
  1883,
  '1883',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '4ab0a870-0348-4225-93d2-549304bea4ee',
  'Bucks County Jewish Congregation',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '76dbc89a-8c34-472c-984e-2854078c16c0',
  'Bukier Congregation',
  1919,
  '1919',
  1933,
  '1933',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'f2e3fdb7-137d-4644-a81b-35daa111d03b',
  'Bustleton-Somerton Conservative Synagogoe',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'ddee34c4-311a-4423-836c-77231546a73e',
  'Bustleton-Somerton Synagogue',
  1972,
  '1972',
  1990,
  '1990''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '8f8bcbe8-39e3-4cf4-a756-655f81a94004',
  'Carpenters'' Shul. [The] See, Adath Jeshurun Talmud Torah Congregation',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'a56763de-a596-4f06-9d45-4c61ca60c19c',
  'Catherine St. Shul. See, Zeiras Israel',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '581ca592-6c58-432c-8daf-25946c54545e',
  'Center City Orthodox Synagogue',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'f42e202b-5dc6-4ebf-8549-554a5118eea5',
  'Center City Reconstructionist Synagogue',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e5ccf697-b1ca-4c4b-941f-a3c42ddc4812',
  'Central Talmud Torah',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '8d93fa2c-d6e2-4459-bcee-5ebfb1d62b8d',
  'Chabad at Rowan',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '4dc25bb2-6fe5-418f-b19b-d79cbf797883',
  'Chabad House',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '797a0008-cc61-4991-aa92-c8c21ade10d7',
  'Chabad in Medford',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '2fb69e07-4277-4249-ae7e-b8b77e86d463',
  'Chabad Lubavitch of Bucks County',
  NULL,
  NULL,
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '9fd733e0-20a3-43ae-8c7f-0692ef28437e',
  'Chabad Lubavitch of Camden County',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '2edd523a-0f3f-4c3b-83d9-c93d2939a10e',
  'Chabad Lubavitch of Chester County: Jewish Center',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '94536a9e-35c0-4319-9b1a-2958645125fd',
  'Chabad Lubavitch of the Main Line',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'a6b5cfc0-680d-4c4e-b3f6-e7696d9ef49c',
  'Chabad of Gloucester County',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'caeb3a65-27d3-4ce0-8a35-71b1b07dfdfb',
  'Chabad-Lubavitch Jewish Center',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e2d483b2-e0ac-4a1a-9446-18b7d7100df9',
  'Chevra Ahavas Chesed',
  NULL,
  '[1888]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e7928310-8a9d-4a0b-b379-dee6c6a72f6e',
  'Chevra Heisner. See, Anshe Hisan',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '6fb5968c-5e38-4409-b1f8-d8613d7fef28',
  'Chevra Kuvier',
  1919,
  '1919',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'ff120848-0ef4-4b3e-844d-e0c88a783d83',
  'Chevra Mishnais',
  1920,
  '1920',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'b0165fdc-6d79-4a81-843c-192fee8515ac',
  'Chevra Mishnayos Kehilas Kodesh Anshe Sodo Lovon. Also, Anshe Sodo Lovon; Anshe Sude Luvin Biela Ziercow',
  NULL,
  '1913       [1913] ',
  1983,
  'Disbanded 1983',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '322b39d1-a00d-476c-8ece-541b48c82fa9',
  'Chevra Northern Hungarian',
  1896,
  '1896',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'dc3bcbb6-351d-4a3a-b202-bf294538e72a',
  'Chevra Ohev Sholom',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '5580768d-998d-4744-9c92-c8f4387a125b',
  'Chevra Schlansky',
  1929,
  '1929',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'cffc4f95-a3a9-41e1-87f3-72adb2277202',
  'Chevra Shas',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '2778ce2f-12c0-4959-8989-26fce57609cf',
  'Chevra Tahzuka Mishnoyis. Also, HaRav Ravi Moshe-Kelle Shlita Synagogue',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '1592cab5-bea4-4561-becb-778450c5682b',
  'Chevra Tehilim',
  1887,
  '1887',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'fe4a16a8-0447-472b-853a-4a1cbd294225',
  'Chevra Tehilim. See, Beth HaKeneseth Reb Eichler',
  NULL,
  '[1925]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'd3d1fb8f-d058-416f-906d-5b7edce98b09',
  'Chevra Tehilim Mishnayos',
  1880,
  '1880',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '54638522-fe33-4437-9597-5ddc297fad61',
  'Chevra Tehilim Zikhron Yaakov. Also, Zikhron Yaakov',
  NULL,
  '[1919]',
  1950,
  'Late 1950''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '259a4402-c9c9-4e0d-827d-379f37da7a0b',
  'Chevra Tehillim [Congregation] See, Aitz Chaim VeZichron Jacob',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '4a5dfd60-e4c5-4fd2-a224-b4f636469196',
  'Chevra Vohliner Anshe Kuppel. See, Anshe Kuppel Vohliner',
  NULL,
  '1924            [1927]',
  1960,
  'Sold early 1960''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '317087ef-52ed-45f0-b19c-7adb428b1849',
  'Colored Hebrew Community [The] See, Adat Beyt Mosheh',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '0a8a7146-f67b-426f-98af-563fd15c1fa8',
  'Community Synagogue of Richboro',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'cfe3fba9-365e-433c-b96d-7c1085de9497',
  'Community Torah Center of Bucks County ',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '43864654-08f7-4d5c-8610-09f64275d360',
  'Community Torah of Bucks County.',
  2002,
  '2002',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '711f4716-0aff-4127-bb3f-7cf19a130025',
  'Congregation',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'cb2ee3fe-4d5d-49c5-acfd-ec72e8c48b88',
  '(Congregation) Ahavas Torah',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '4fabb1bf-826d-4c1e-8196-540a0a88703b',
  '(Congregation) Ahavas Torah-Rhawnhurst Torah Center',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '1f9db6b6-2198-40e0-b52a-9164714e9ad8',
  '(Congregation) Beth El – Ner Tamud',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'ea9f474b-5316-4bca-b621-9752589ca601',
  '(Congregation) Beth Israel',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'db6d5576-9aaa-4746-a23a-001332b92a5e',
  '(Congregation) Beth Israel of Media ',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'b070b094-7975-4bce-9554-846dcf0a3a0a',
  '(Congregation) Beth Jacob',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'b6426008-2a24-4e88-b48d-0fbe53ce41ba',
  '(Congregation) Beth Jacob-Beth Israel',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'de5593a0-fc80-49a6-84df-99daee924c92',
  '(Congregation) Beth Judah-Bustleton-Somerton Conservative Synagogoe',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '02960118-c06e-4260-a062-8cc97e806f30',
  '(Congregation) Beth Medrash Harav B’nai Jacob',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'dfa5d803-208a-4fd0-a4bf-03e1f3748735',
  '(Congregation) Beth Torah',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'c86fe686-8c0a-4bbb-bae3-a6b73f082048',
  '(Congregation) Beth Tikvah',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '622a2f71-7a4d-49f9-8d44-f533dc8d3fa0',
  '(Congregation) B’nai Jacob',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '6f53bf85-47e4-40e5-99c7-6f7e97c58ab2',
  '(Congregation) B’nai Jacob-Bershu Tov ',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '74bf8196-5a56-4066-85e4-cf02ea0ad6cf',
  '(Congregation) Brothers of Israel',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '312fddaa-24f8-4924-aa68-fa0423f8ed4a',
  '(Congregation) Hesed Shel Emet',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '406cebe1-2379-4858-b858-4c95e0e80d32',
  '(Congregation) Mekor Baruch',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '9796ba40-a6ed-4aba-9974-558b200ef336',
  '(Congregation) Mercy and Truth',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '00fd5198-0df5-44fb-a8e9-4f02e2f6b554',
  '(Congregation) Ner Tamid',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '9bf12f27-c699-4dc5-aa7b-a05f8dcb8452',
  '(Congregation) Ner Zedek',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'f11a6b69-187b-47ab-9652-00b35c620e78',
  '(Congregation) Ner Zedek-Ezrath Israel-Beth Uziel',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '08d4b476-5077-4219-8e34-36dc4a19eb2c',
  '(Congregation) Sons of Israel',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '1b714ca4-fa58-4775-ab7c-97ad95cfd441',
  'Daily Minyan and Torah Study',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '07378c97-5993-4f8a-aeaa-8856e2e8b880',
  'Delaware County Jewish Commmunity Center',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '64e5a284-843a-4aa7-97d1-33e12192802d',
  'Di Rusishe Shul. See, B''nai Abraham- Anshe Russ',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '227068a4-fb54-4de2-8096-f77e5cf75681',
  'Dirshu Tov. See B''nai Jacob-Dishu Tov',
  1891,
  '1891',
  1960,
  'Early 1960''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '6ddb3601-e57b-4f1e-a80f-f1562f843827',
  'Dorshe Sholom Congregation',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'db724b2c-de91-4c97-84d6-ab7f6bb18c3b',
  'Dorshei Derekh Minyon',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '25d12c10-d6c3-4ded-87b5-e31350d553e0',
  'Dorshey Sholem Nusach HaAri',
  1923,
  '1923',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '160fd0d5-dbdc-4c1a-9f09-cd57ab58888f',
  'East Lane Temple',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'da3bf2fd-af15-4785-abc0-d5d6004b7ac0',
  'East Oak Lane Temple',
  1940,
  '1940',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '7abc4cf7-6106-4154-b49f-73e9b23127aa',
  'Eastern Women''s Talmud Torah. Also, Old Lady Sack''s Shul; Vine Street Synagogue',
  1910,
  '1910',
  1932,
  '1932',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '78c8fe5c-39f7-407b-a2cb-f4cc37b13a88',
  'Congregation Emanu-El',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '130f148f-cd70-46b4-af39-86f824fe3bb4',
  'Emanu-el Congregation See B''nai Israel-Emanu- el',
  1925,
  '1925',
  1985,
  '1985',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '33846546-5ed0-4dfb-b6dd-010d05088bde',
  'Emunas Israel See, Ahavas Achim',
  1910,
  '1910',
  NULL,
  'After WWII',
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '3b199800-610f-4603-aa52-231e1fded796',
  'Emunas Israel Ohev Sholom. See, [The] Hungarian Synagogue; Ohev Sholom',
  1881,
  '1881',
  1967,
  '1967',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '0caf792b-e6a0-4309-ba2c-e4f362f80e32',
  'Emunath Israel',
  1880,
  '1880',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '437f6bb9-7777-4648-bbe0-9f50c0a22cbb',
  'Emunath Israel of 5th St.',
  1880,
  '1880',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '88bdfe0d-3b3d-41da-bc49-190d611fcc21',
  'Ezras Israel',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '0b9b5241-df07-4cff-8bda-ad185ad25afd',
  'Ezras Israel. See, Adath Jeshurun Talmud Torah Congregation',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '2468477f-413d-479a-bc65-c69fe3bd99df',
  'Ezrath Israel',
  NULL,
  '1938      [1939]',
  1970,
  '1970',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '5f53f309-b511-4ddd-91e3-ac6ba437282b',
  'Fairmount Jewish Community Center. See, Old Man Miller''s Shul',
  1939,
  '1939',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '0b3e79c5-8132-41d2-a30d-8ad36c4596bb',
  'Far Northeast Community Center',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'f41d2cf7-1936-422a-9642-2658f764c784',
  'Far Northeast Congregation',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '554273b0-ba2f-4a46-86e4-0dd7e4f1e074',
  'Far Northeast Orthodox Synagogue',
  1974,
  '1974',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e769ef25-d39f-4acb-b36a-643a6a999ebc',
  'Fastover Independent Congregation. See also, Kehilos Kodes Anshe Sodo Lovon; Magidei Tehilim; Shivtei Yeshurun',
  NULL,
  '1907       [1917]',
  1970,
  '1970''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e8ee240f-c3b6-44bc-ac09-1fb148ff20b7',
  'First Postiver Relief Congregation',
  1901,
  '1901',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'fdf7be71-168e-4b27-b29a-fa32db23a0f2',
  'First Romanian Poras Joseph. See, Agudas Achim Rumanian Congregation',
  NULL,
  '[1905 (Book #31, p.463)]',
  NULL,
  'By World War II',
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '34da4148-e824-40b1-8e12-82ea574bb92b',
  'Fitzgerald Street Congregation',
  1942,
  '1942',
  1945,
  'Mid 1940''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '0dca8317-c1b8-4fbe-9303-333857ca157e',
  'Fleischer''s Shul [Rev.] See, [The] Manayunk Hebrew Congregation',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '4f14e497-7098-4612-8c69-2860dbb67e27',
  'Fox Chase Jewish Community Center',
  1957,
  '1957',
  1980,
  '1980''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '9484f7e9-05a2-44f6-8b52-be1333377548',
  'Frankford Hebrew Congregation.',
  NULL,
  '1906       [1909]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '512dbab5-b2ec-4c51-906d-b65cf45b8d62',
  'Galicianer Shul [The] See, Ohr Achaim Anshe Golitzer',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'b3b9427f-7e3c-4ab2-8cd3-9124254aa0cf',
  'Gemilas Chesed [Chevra]',
  NULL,
  '[1912]',
  1960,
  'By 1960',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'f577bd4c-65b6-455a-ae6b-208b1ee98866',
  'Gemilath Chesed',
  1913,
  '1913',
  NULL,
  'By World War II',
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'd9808825-9823-49d4-999b-ff47638f0e14',
  'Germantown Community Center ',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'd0113215-fc38-4db1-934f-b918e58bd59c',
  'Germantown Jewish Center',
  1934,
  '1934',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '9495a129-e5af-4919-8086-3f1e1a2a3f43',
  'Germantown Minyon',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '6507bc1f-072c-49dd-90bc-89f38e892d3d',
  'Gershman YM & YWHA (Congregation)',
  NULL,
  NULL,
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '807e6be5-cfe4-4a7c-acc2-f26b96473d29',
  'Geulas Israel Anshe Sefard',
  NULL,
  '1915       [1915]',
  1953,
  '1953',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '6024a6c8-bf62-42ad-b634-8fa386a1ee1d',
  'Gomel Chesed Shel Emes',
  1895,
  '1895',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'aae964f7-ab24-430f-8e50-f1b6386be99e',
  'Greater Northeast Congregation',
  1962,
  '1962',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '55794c9d-8a33-4a1b-8f61-ddd52c769aa3',
  'Greater Northeast Jewish Congregation',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '50815e7e-6f20-4807-bf30-c06033b37a02',
  'Greater Romanian Synagogue',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '5848a3e0-56dc-464e-a75e-0b8c8fb25cca',
  'Har Tikvah',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '9d914807-731d-487f-bc9c-ebac97d7231d',
  'Temple Har Zion',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '6c58b082-5004-455e-8864-18622a5f217d',
  'Har Zion Temple',
  1922,
  '1922',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '4ebd50bd-ec21-4b92-8961-ea63cca02406',
  'Har Zion Temple-Radnor',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '890efeee-96da-4801-9f30-655ce6aaf523',
  'HaRav Ravi Moshe- Kelle Shlita Synagogue. See Chevra Tahzuka Mishnoyis',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'd7f55d60-abcb-4d22-8a23-5f19a2b00903',
  'Hebrew Congregation of West Philadelphia             See, Beth Judah (Sansom St.)',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '2f42e071-5994-4814-b0dd-7c2f5b2aae42',
  'Hebrew West End Jewish Community Center',
  NULL,
  '1928           [late 20''s]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '2e663da6-97bf-4faa-bb35-aa06dff066e3',
  'Heiner Fiscal "chicken foot" Shul. See, Aitz Chaim.',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'a03bb3ca-86b7-40e0-9458-6030ef67a5b2',
  'Heisiner -Ezras Israel. See, Anshe Hisan; Ezras Israel',
  NULL,
  '1876          [1895]',
  NULL,
  'Became Anshe Zvavz early 1890''s',
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'ba28673f-066a-4d79-8241-6081c0b72dd9',
  'Heisinger Congregation. See, Anshe Hisan',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '1f3f34b7-fe0a-44cb-96e3-2b845f490a8a',
  'Henry S. Memorial Frank Synagogue',
  1905,
  '1905',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '976e2a56-7a8c-44ec-ae29-3b9656ba0d67',
  'Hesed Shel Emet; Also Haded Shel Emet',
  NULL,
  NULL,
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'aeb7bdd2-b762-4c8c-81e8-b667fc98f5da',
  'Hesiner Independent. Young Men''s Society.               See, Anshe Hisan',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'f8b2b430-ce8a-476f-ae36-1f78fce319de',
  'Hillel, University of Pennsylvania',
  1925,
  '1925',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '77bd7918-5a19-4568-b6dc-103e6a032f99',
  'Hollander Shul [The] See, Beth Elohim (at S.5th)',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '03bad4f0-9201-4f6c-b949-2017ec234efd',
  'Hollander Synagogue',
  NULL,
  '1870''s',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '5747e6e2-f953-4ad2-99f0-385c830aff07',
  'Hungarian Synagogue [The]. See, Emunas Israel Ohev Sholom',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'c4dbe2b4-410c-4e84-8ca3-226612e29d9f',
  'Independent Congregation [Chevra Kadisha]',
  NULL,
  '[1894]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '04ebd48e-a3d5-4ca3-a79c-b381d2e544c2',
  'Independent Southern Congregation.                         See, Talmud Torah',
  NULL,
  '1903            [1904]',
  1930,
  'Until 1930''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '9f2c836a-ab27-4236-bafa-7ec84c5f1ded',
  'Temple Isaiah',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '9d49f972-8420-41f9-a2ae-a0bd948bbf3b',
  'Island Road Synagogue. See, Ahavas Achim Talmud Torah Congregation',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '6a524f7d-aec7-417b-9d65-07241425bc36',
  'Temple Israel',
  1943,
  '1943',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'd114844c-f64c-4e6d-8363-7017aaf6f362',
  'Israel Congregation',
  1904,
  '1904',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '3c7a5cab-ee5f-4f74-82f2-fe0b680ca4fb',
  'Temple Israel of Upper Darby',
  1945,
  '1945',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '52c05732-5fe5-44c9-b195-5d96e84c5051',
  'Temple Israel of Wynnefield',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '689075ed-9970-4360-bc25-396bddcf52f5',
  'Israeli Chabad Center',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'd4af4111-7b93-44e7-8892-604fbbf72ebb',
  'Ivy Ridge Jewish Community Center. See also, Or Ami',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '0c958433-eb6d-4ef2-b032-69043960dbbc',
  'Jeshurun',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '592beb0a-0623-425d-84e3-a22817e187d6',
  'Jewish Congregation at Graterford',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '6ae42970-8ae2-4682-99f7-c5e04afdf1cc',
  'Jewish Congregation of Bustleton',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '4992fbc1-07fb-4632-9308-4189360d36db',
  'Jewish Congregation of Graterford Prison',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '4a02b54e-3356-499c-8b6f-ca08adbbebba',
  'Jewish Farmers'' Shul. See, Atereth Israel (at 84th & Harley)',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'f8f62e75-04a7-43fe-874e-b94c21f33c07',
  'Jewish Hospital Congregation',
  1936,
  '1936',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '9ca03603-f134-446a-96fd-eb59e36b55b6',
  'Jewish Mute Society Congregation',
  1907,
  '1907',
  NULL,
  'Disbanded early',
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '3aa5b13d-5601-42b7-9226-9e0f6bfa2b8d',
  'Jewish Rumanian Congregation - Agudas Achim. See, Beth HaMedrash HaGodol Anshe Ashkenaz',
  1905,
  '1905',
  1911,
  'Disbanded 1911',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '9b283439-ef67-40c5-88d4-4f66aaf7d2cc',
  'Jewish War Veterans',
  1955,
  '1955',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'a049dd3a-cbca-4d48-a08c-4827b81c7ed8',
  'Joseph Asbell Congregation',
  1926,
  '1926',
  NULL,
  'Disbanded by World War II',
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '72bdbfef-5591-46f6-af4d-6f3c806bce21',
  'Judaism)',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'c43e6f55-91cd-4bce-be64-5a67c90c0171',
  'Temple Judea',
  NULL,
  '1928             [1931]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '5d81b895-8e1f-430d-9fc0-bf683185e867',
  'Temple Judea of Bucks County',
  NULL,
  NULL,
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'ffcdfff0-7012-46e3-877d-4ce86bebb2a8',
  'Kahal Kodesh Israel [Chevra]',
  1894,
  '1894',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '93bd6bd5-dcc6-4a20-a9b4-7e967be719ab',
  'Kaiserman Shul. See, Aitz Chaim (Viola St.)',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '126e8ba9-0442-40e2-9680-9260016d9690',
  'Kavanah T''hora',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e507a177-58f4-4650-9eb4-a729af261f7e',
  'Kehilas Adas Israel',
  1905,
  '1905',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'bc70538a-5f80-4c4d-94de-5f2178d2f044',
  'Kehilas B''nai Shalom',
  NULL,
  NULL,
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '493315d4-6f1c-4fd5-9c57-8ba828801027',
  'Kehilat Chaverim',
  NULL,
  NULL,
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'f5f0558e-7e9d-4eba-9dc9-bfe120c92c01',
  'Kehilat HaNahar Also, [The] Little Shul by the River',
  NULL,
  NULL,
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'c866840a-d1d7-4ef3-b5f5-97c0b80257ae',
  'Kehilath Israel',
  NULL,
  '1910            [1912]',
  NULL,
  'Building demolished',
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '95673752-e7ae-40df-979a-7317c6a3b737',
  'Keneseth Beth Zion',
  1918,
  '1918',
  NULL,
  'Disbanded by World War II',
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '1d42aa9b-0dfa-4ad4-bf59-f4579660842e',
  'Keneseth Israel',
  1847,
  '1847',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '76f627af-c1be-4bd8-98d2-8a7bb3d30bd2',
  'Kneseth Chai',
  1982,
  '1982',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '86ceb5d5-ccf1-4c23-96d0-be36001d62be',
  'Kensington Synagogue and Community Center',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '3de32cb1-72ab-482b-a3a8-7ccc47fa5f1c',
  'Kensington Synagogue and Community Center of the Congregation Shaari Yitzhok',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '77471542-7e89-4689-987b-fd1dc650442c',
  'Kensington Synagogue & Community Center. Also, Shaare Yishkan',
  1920,
  '1920',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'd1018e05-b62b-497c-9070-ee5249d1ba91',
  'Kerem Israel Anshe Sefard',
  NULL,
  '1909         [1912  (Book #58, p. 13)]',
  1971,
  '1971',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '4ceea96f-e7b3-41f2-99de-115d6c4fa17e',
  'Congregation Kesher Israel',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '6fa07388-8914-4cf8-ac44-40baad4c4898',
  'Kesher Israel Congregation',
  1914,
  '1914',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '3767d007-1771-47c2-8086-a02f03b4b5fa',
  'Kesher Israel Also, Rodeph Zedek',
  NULL,
  '1893           [1893]',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'df284383-6d0c-455e-ad8f-b1bf53ebf7cc',
  'Kesher Torah',
  1894,
  '1894',
  1920,
  '1920''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e23a5409-e290-467b-839d-125816078412',
  'Kesher Torah Anshe Lubliner',
  1923,
  '1923',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '31f8879a-fdf0-4e9b-a342-8988e11bda89',
  'Kesher Torah Anshe Vohliner',
  1894,
  '1894',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '11af25b4-b17e-48c0-8ab0-df11fb1e40a2',
  'Kesher Torah Synagogue',
  NULL,
  '1925          [1925]',
  NULL,
  'Closed after World War II.',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'ba8d1a6b-5a75-49de-b645-c35bcba7b5c1',
  'Khelmer Shul. See, Shomre Emuno Anshe Kelem',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '08fac827-a1fb-481a-a950-81e49521f3e1',
  'Kieve Tserkasser Bulgarian Congregation',
  1930,
  '1930',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '0b428a13-6491-4d54-aca0-bfe8ad527110',
  'Kneses Adas Israel Congregation.                                   See, Knesses Israel Anshe Sefard',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '962a3f6e-23d3-46a4-8a32-e37a3c01f75c',
  'Kneses HaSefer- Educational Synagogue of Yardley',
  NULL,
  NULL,
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '94b60e59-1fed-4fab-a3b2-751bdf5b576f',
  'Kneses Israel',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '65feade3-f9c2-4295-91fa-918fb8b7e7e4',
  'Kneses Israel Anshei Sfard',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '59b19e7b-d333-4975-8850-cae75e75d89f',
  'Knesses Israel Anshe Sefard.                                       Also, Kneses Adas Israel Congregation',
  NULL,
  '1908         [1912]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'c3f64566-40c1-4c06-bb64-3887325c3030',
  'Kol Ami',
  1994,
  '1994',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'cfa8a405-8f16-4132-91f7-22f3e2eece99',
  'Kol Emet',
  1984,
  '1984',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '53de1cad-4a6b-43a4-ac19-a5074540404d',
  'Kol Emet- Yardley Reconstructionist Synagogue',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '0744f345-8a00-491b-ba45-4e37ba24d176',
  'Kol Tzedek',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '87c64bd2-570b-49cd-8a4c-60bb6f6a351b',
  'Kol Tzedek West Philadelphia Synagogue',
  2005,
  '2005',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'd8613d91-65e9-492c-bb5e-93b1d57f89fa',
  'Kol Yisrael Newtown Chabad of Bucks County',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '39100f14-6d67-49e5-9ba5-123e4107af36',
  'Kol Yisrael Yardley Chabad of Bucks County',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '7b0eaa2a-be32-4de9-9c1f-312bbc8a5953',
  'Kolker Synagogue. See, Raim Ahuvim Anshe Kolker',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '06ba5ff7-8f87-46a9-9b90-209139bba74b',
  'Krakauer - Beth Elohim Beneficial Association',
  NULL,
  '1876             [1882]',
  1947,
  '1947',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'b55efb35-ac5a-4e47-960b-ff3c6d2be4b8',
  'Kreminitzer Synagogue',
  1919,
  '1919',
  1930,
  '1930''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '2ee95888-709d-4246-9a6c-a9cd2d3ad1d0',
  'Leidy Ave Congregation',
  1929,
  '1929',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'ba82424d-c979-44a3-8400-865a54b6cd0a',
  'Lenas HaZedek',
  NULL,
  '1891        [1902]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '6e7a8538-4dd5-411a-987a-9e5fc824cd98',
  'Lenas HaZedek of West Philadelphia. See also, Beth HaMedrosh Hagodol- Beth Yaacov',
  NULL,
  '1917          [1918]',
  1975,
  'Mid 1970''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '8ac4e18b-abfb-48a4-a39d-488e5c4f53d8',
  'Lenas Hazedek. See, Prushzveer Shershow Congregation',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '1371bdb0-1d81-40dd-b281-8a53efe07105',
  'Lenas Hazedek-The Woodside Jewish Center',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '83d361a5-abc9-41ff-88d4-82901237ca22',
  'Levittown Jewish Center, Congregation Beth El',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '3366df89-9bb6-4739-a74b-97965a57343f',
  'Leyv Ha-Ir, Center City Reconstructionist Congregation',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'a2d9e723-1553-4fe3-8ce0-f3fe7bd0916f',
  'Leyv Ha-Ir Heart of the City; Center City Center City Reconstructionist Synagogue',
  1990,
  '1990',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'ca1c3266-e86e-4a38-ab53-92966b012461',
  'Linath HaZedek Anshe Fairmount',
  NULL,
  '1909.      [1910]',
  NULL,
  'After WWII',
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '0cace1b2-d7ea-4a60-9aa6-be618a17455c',
  'Little Shul by the River. [The]:                                       See, Kehilas HaNahar',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'c46c5f19-a3e7-4400-a044-3814463d41c7',
  'Logan Congregation Ahavas Israel.                             See, Beth Sholom',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '8787db8e-153f-4cfd-bdc0-142ff1543059',
  'Logan Jewish Community',
  1935,
  '1935',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'b0f251ad-0fe3-4471-81b3-ece3093e775c',
  'Lowenstein''s Shul',
  1938,
  '1938',
  1940,
  'Late 1940''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '2d6c3ac0-0925-4cfe-a669-753464b91980',
  'Lower Merion Synagogue',
  1954,
  '1954',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '92ebfee4-300b-4cb9-a826-875b9e3281d6',
  'Lubavitch House',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '1d0a12c8-212f-43c3-832f-0cdf8af25d33',
  'Lubavitch House at Penn',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'c56aefea-ca86-42ee-bbd2-c5752991b440',
  'Lubavitch House at the University of Pennsylvania',
  NULL,
  NULL,
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '6daeb2f5-27ed-47aa-9b9e-b7becf0a3282',
  'Congregation Lubavitch, Lubavitcher Center',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'af4ff92a-7382-46d8-8f89-8fab2b317d65',
  'Lubavitch of Montgomery County',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'f9e463f7-240c-4cc4-999c-1c8ddc626f16',
  'Lubavitch Synagogue',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '40062a1e-899a-4cd2-90fa-09d9bfe26463',
  'Lubavitz',
  NULL,
  '[1897]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '3d011662-aa81-47e7-8df5-d0c7a8a80b83',
  'Congregation M''kor Shalom',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'b84ee196-cee6-4460-b0c8-cef9089c11d7',
  'Machzike Adas - B''nai Moishe [Chevra]',
  1918,
  '1918',
  1950,
  '1950''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '7ecb8397-519a-49b8-9b7e-1bf86ed1fd70',
  'Machzike Torah [Chevra]',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '2e737137-c8c7-447e-ac94-acc3601ecc24',
  'Machziknei Har Rov. [Congregation]:                         Also, [Congregation] Agudath Achim Machzikei Har Rov',
  NULL,
  '1917          [1918]',
  1950,
  'Early 1950''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '2adfad99-e661-4105-8021-9589bdc4950d',
  'Magidei Tehilim [Chevra]: See, Fastover Independent; Shivtei Yeshurun',
  NULL,
  '1913      [1913]',
  1960,
  '1960''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '953e997c-1df2-465b-ad5b-ecdcd4977629',
  'Main Line Reform Temple',
  1952,
  '1952',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '8c7fa998-1bd8-454e-84f4-028083dde36a',
  'Main Line Reform Temple Beth Elohim',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'ab563aa0-8174-46cc-b844-f4be90015dea',
  'Manayunk Hebrew Congregation [The] Also, [Rev.] Fleischer''s Shul',
  1908,
  '1908',
  NULL,
  'Around WWII',
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '5bb694c7-c256-4e42-86d4-4422ed27b95f',
  'Mekor Baruch',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '6b4ece4a-2537-489a-9aca-5a60b3e29f60',
  'Mekor Habracha; Center City Synagogue; Formerly Etz Chaim',
  1989,
  '1989',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '06efe076-9c11-4caa-931c-aa819c3bffda',
  'Mekor Habracha/Center City Synagogue',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '16997e84-c1ac-439f-83e4-2ed60cc8192f',
  'Melrose B''nai Israel- Emanu-el',
  1955,
  '1955',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '812cad4d-0ba5-4d41-90f7-393d75d74622',
  'Melrose B’nai Israel',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'bf254c5b-8563-4314-9fc6-8a1404937664',
  'Temple Menorah ',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'ada44cf4-9a94-4c95-8879-2ccea58c8852',
  'Temple Menorah Keneseth Chai',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '83eeb5c0-cfcf-456b-8c50-0a09f69e6cb8',
  'Temple Menorah Kneseth Chai See also, Tacony Hebrew Congregation; The Northeast Jewish Community Center',
  1924,
  '1924',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'd9745229-87e3-474a-b6be-8c3169965c99',
  'Temple Menorah of the Northeast Jewish Community Center',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '6338c389-a995-4092-bb64-40d6c9e0dc52',
  'Meysos Israel',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'af6c7d21-b8fd-4960-932a-822ddead0898',
  'Temple Micah',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'b6aafd94-3969-48b4-bc02-7e830114309a',
  'Mid-Town Temple',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'fda6ac89-4aec-4e70-8efd-7cee29e9d8a9',
  'Mikveh Israel',
  1745,
  '1745',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '39156bc6-ad3c-4dae-8e27-eaed627c0489',
  'Minyan Masorati and Minyan Dorshei Derech',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '54e93dd3-f663-48c6-89db-6ecea16a8638',
  'Minyanim at Penn Hillel',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '50878a22-bd4a-49f3-84da-600d20c2f141',
  'Mishkan Israel',
  1930,
  '1930',
  1940,
  'Early 1940''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '0ee3f66b-59d0-43b5-9f42-c4ea87ea8bbc',
  'Mishkan Israel [Chevra] Also, Kolker Synagogue (Raim Ahuvim Anshe Kolker)',
  NULL,
  '1904          [1904]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '4eb871cc-1c77-403a-8532-49409534c125',
  'Mishkan Shalom',
  NULL,
  NULL,
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '056f73bd-27c3-4df6-b9b6-d3ccec4d9076',
  'Mishnais Anshe Lubavitch [Chevra]: See, [Chevra] Anshe Lubavitch nusach Ari',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '7dfda1d2-9e7d-49f3-b249-29c173bd8bd0',
  'Mishnayos Anshe Sefard [Chevra Tehilim]',
  NULL,
  '1903            [1904]',
  1945,
  'Mid 1940''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '51a96cbd-37f5-43e8-9647-84e075a5e9b6',
  'Mishnayos Chesed Ve''Emes [Chevra].',
  NULL,
  '1893     [1893]',
  1940,
  '1940''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '111d5eaa-835c-4794-9379-646a3e889130',
  'Mishnayos Kehilas Kodesh Anshe Sode Loven [Chevra]: See, Kehilas Kodesh Anshe Sode Lovon',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '396584ea-f607-49f2-bdce-1917780c813d',
  'Mishpallelim Congregation',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'b7417741-f34f-4359-a253-7239bf3922ce',
  'Mogen Abraham',
  NULL,
  '1913          [1917]',
  1958,
  '1958',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '6d0a2468-feef-4ef9-b773-62ba719a1a8c',
  'Monastreichner Shul (aka Manestrishtze Shul)',
  1948,
  '1948',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'd8b48746-32d1-4581-9878-8d4449d6e91a',
  'Montefiore Synagogue',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '19ad79c9-6780-4606-a3b0-342ef49bc8c1',
  'Moshav Zekenim. Also, Uptown Home for the Aged',
  NULL,
  '1912        [1912 (Book #49, p. 351)]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '407ed2ba-5cd4-4379-87f8-fe3ae6608aa8',
  'Mount Airy Jewish Community Center',
  1951,
  '1951',
  1982,
  '1982',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'ed32b1f4-2453-447b-9a1a-7c09c3bccc99',
  'Mount Airy Orthodox Congregation',
  1958,
  '1958',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '41de4edc-a8a7-4ec6-a4b3-156bb3bf3a9a',
  'Mount Sinai Hospital',
  1903,
  '1903',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'd314f787-5c4c-4cd9-983f-13f364519fc8',
  'Ner Tamid of Delaware County',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '3c8df78e-fadc-40d2-8e99-91c81d0bd786',
  'Ner Zedek - Ezrath Israel - Beth Uziel  Also see, Temple Brith Kodesh; Boulevard Park.',
  1961,
  '1961',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'b4807e99-ad49-448d-bfc4-5dede21f1c2a',
  'Nes Ami',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '56ee3578-4fe7-4abd-a000-f7238b11277c',
  'Nes Ami Penn Valley Congregation',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e5e8e0c7-90ed-465d-ba88-c097cb8b54fe',
  'Neshaminy Valley Jewish Community Center',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'f8805967-644f-4179-89af-dc4e47425cde',
  'See, Neziner Congregation',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'dd732f3f-b05d-41f5-820d-0af3349cf617',
  'Neziner Congregation Also, Ahavas Achim Anshe Niezhin Nusach HaAri: See Beth Zion-Beth Israel.',
  NULL,
  '1887             [1889]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '4dd69d26-9e00-4951-9ae0-dd27b17b573a',
  'Norristown Jewish Community Center',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'c88b87d8-66fe-42e1-895c-8509639fabec',
  'North West Religious Association',
  NULL,
  '1904            [1906]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'c472d557-dcf1-49a0-8030-91cff77e2b7f',
  'Northeast Jewish Community Center',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '8455a29f-6cbf-4b26-854a-49067583bb8c',
  'Northeast Jewish Community Center. See, Temple Menorah',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '0a40dde1-29d0-487a-86e2-a05fd9fe77d2',
  'Northeast Orthodox Congregation',
  1958,
  '1958',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '82325856-fe23-4ecd-8ec2-444bd071be36',
  'Northern Chevra Kadisha',
  NULL,
  '1898               [1901]',
  1937,
  '1937',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e8b17f0b-6617-4082-baa2-455d60dff6ad',
  'Northern Liberties Hospital Chapel',
  1928,
  '1928',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e22caddd-76de-422f-bd87-5d6f91516689',
  'Northern [ North Eastern?] Talmud Torah Congregation',
  NULL,
  '1910/12',
  1952,
  '1952',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '121ff0ff-406a-4a3a-8083-6bc4f8a3dfdd',
  'Congregation Ohavas Chesed',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '3d6d4681-d9aa-49ba-8ab4-2337f70dcb93',
  'Ohel Jacob',
  NULL,
  '1910             [1910]',
  1965,
  'Sold mid 1960''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '904f53ff-7211-48bf-b3fc-f236f14ed86c',
  'Congregation Ohel Jacob of Bells Corner',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '87c1e8b5-a4c9-4c55-8367-c5be08a9581c',
  'Ohel Jacob of Bustleton',
  1967,
  '1967',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '47846183-ea5a-4976-9bc3-ce7bc7dc575a',
  'Ohel Jacob of Oxford Circle',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'cb24d5ce-e47f-40df-b492-57b646070856',
  'Ohev Itzchok',
  1913,
  '1913',
  1959,
  '1959',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'a84a971f-18bb-4d2a-a995-70a8e9b2debc',
  'Ohev Shalom',
  1891,
  '1891',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '2029c90e-1d4b-44df-9a99-2c6fdfe6744e',
  'Ohev Sholom of Bucks County',
  NULL,
  NULL,
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '3bf0c0c3-86f7-4e67-81c1-6761e6e3b199',
  'Ohev Sholom: See, Emunas Israel Ohev Sholom:',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'b0fd7f4e-d1f8-42af-9d54-f4bfc277b24e',
  'Ohev Yitzchok. See, Ohev Itzchok',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'cc9d536b-7651-4a0d-bf45-352f9931b236',
  'Ohev Zedek',
  1903,
  '1903',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '84af84b9-bb95-4afb-9add-6dc7cb2e6084',
  'Ohev Zedek Anshe Sefard [Chevra]',
  NULL,
  '1892             [1893]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '6eeb1715-61b8-493a-9737-2ac09e322fde',
  'Ohev Zedek: Also, Samuel Rosa Nathan Ohev Zedek',
  NULL,
  '1889           [1889]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '12bf6abd-99f6-4953-bf6c-6d81f2e3614f',
  'Ohr Achaim. [Congregation]',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '40269dd8-86c1-4d49-8d44-5a104999d8e0',
  'See, Ohr Achaim Anshe Golitzer',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'a461222c-1491-4424-a278-766d0be82dc9',
  'Ohr Achaim Anshe Golitzer: Also see, [The] Galicianer Shul; Ohr Achaim',
  NULL,
  '1907            [1908]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '8c6515ef-d37d-4b0f-b00b-e63c09d5c3f0',
  'Oir Chodash Agudath Achim. See, Agudas Achim Rumanian Congregation',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '6def1dd1-34c7-4037-aba1-c0f110777e84',
  'Old Lady Sack''s Shul. See Eastern Women''s Talmud Torah',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '7fce3bc0-cb61-4c59-898e-c7f9c798ed6b',
  'Old Man Miller''s Shul. Also, B''nai Israel of Fairmount; Fairmount Jewish Community Center',
  1910,
  '1910',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'fa7b1e90-d07e-4998-9b6b-6cf4a80d38cd',
  'Old York Road Temple- Beth Am',
  NULL,
  NULL,
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '3022f9c1-ddbd-4a80-8875-624413e05d03',
  'Or Chudosh.',
  NULL,
  'Before 1892',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '36ac993b-b6e8-41c6-a320-b0532bd926f6',
  'Or Chudosh-Agudas Achim -- Rumanian American Congregation; See Agudas Achim Rumanian Congregation',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'b01f7ccd-2ed9-4b74-aa1b-53b5ca27123d',
  'Or HaChayim Anshe Ostreich',
  NULL,
  '1890        [1894]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '1b7afd56-b238-47b7-9304-af45af8392af',
  'Or Hadash',
  NULL,
  NULL,
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '9b90fc38-391c-47f5-a66e-c80539f7c568',
  'Or Hadash: A Reconstructionist Congregation',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '324ca157-baae-4f02-8b96-c515fb129245',
  'Or Shalom',
  1974,
  '1974',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e99bff3b-90e7-48c4-a1a9-923f6c93d152',
  'Or Yisrael',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '7cdd6843-89a6-4e5a-8194-1c70a74a5392',
  'Orthodox Minyan of Elkins Park ',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '01e75170-ce1f-4163-8305-0132a9b2d26c',
  'Otik Moliver',
  1899,
  '1899',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '1bd4838b-8cef-4627-807e-f31392e70490',
  'Overbrook Park Congregation',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '87bc5edf-71e6-490e-bee5-c0a1602b55d1',
  'Overbrook Park Synagogue',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'a3839c30-faf3-4c65-9ed1-4ea330eb2f08',
  'Oxford Circle Jewish Community Center',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'fa34e170-9999-495c-93e1-8d95fc632316',
  'Oxford Circle Jewish Community Center-                  Beth Israel',
  1948,
  '1948',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '1403ba67-c266-4999-a465-4dcd452a84ac',
  'Parker''s Place: See, Temple Zion                                  [The Mcfadden Estate]',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'cf82caaa-0fb6-464a-97bd-86621c6d3946',
  'Pennypack Jewish Community Center',
  1959,
  '1959',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '9decacf8-b834-4754-976f-f0ef0fd033ab',
  'Perry''s Shul',
  1933,
  '1933',
  1948,
  '1948',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'cecf4007-6908-45e3-9aa6-d83abd420dfc',
  'Philadelphia General Hospital',
  1942,
  '1942',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '7f1ce7da-adad-4f51-8ef2-b00b9151b06e',
  'Philadelphia Tailor''s Congregation',
  1919,
  '1919',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'a1d980ff-f7aa-4d9e-b4e2-f7d6666885f2',
  'P’nai Or Philadelphia Havurah ',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '1c4e2a3c-a755-463f-9144-d9259af317ec',
  'P’nai Or Religious Fellowship of Philadelphia',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'd0014cde-bce5-4e0f-96dd-f165e34fc941',
  'Pnai Or Religious Fellowship of Philadelphia-Jewish Renewal',
  NULL,
  NULL,
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '25e48c8f-81b9-4574-8c52-5249e998d120',
  'Po''el Zedek',
  1889,
  '1889',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '7dba8ac4-f649-4aac-9ad1-af1c6104d920',
  'Poale Zedek: See [Chevra] Poale Zedek-Anshe Birz',
  1886,
  '1886',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'a9590936-23b9-48f1-bd54-ff9051359cee',
  'Poale Zedek Sharith Israel',
  NULL,
  '1886 [1889/1890]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'c4fa16ed-3a42-48a5-ab7d-34d052df38f4',
  'Poale Zedek-Anshe Birz [Chevra]: See, Poale Zedek Sharith Israel',
  1890,
  '1890',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'd1b99250-3704-401b-aa55-fb0c08f25219',
  'Podolier Gubernia Lodge',
  1919,
  '1919',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '5aa64482-c492-478b-81cd-f0861de8e42a',
  'Poneviezher Lodge Congregation',
  1919,
  '1919',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '3c2be34e-03b1-4cd3-b00e-1bbaf6288fba',
  'Progressive Geulas Israel',
  1920,
  '1920',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '20ebd6bc-dc2b-41b0-8c09-be67687e1e08',
  'Prushzveer Shershow Congregation:                         Also, Lenas HaZedek',
  NULL,
  '1895               [1892]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '3cac6c4f-2485-43d6-b947-e37b23d2233e',
  'Raim Ahuvim',
  NULL,
  '1892               [1892]',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '7481fe7f-0f31-40bd-91de-29095da7c9ed',
  'Raim Ahuvim Anshe Kolker. [Chevra] See also, [Chevra] Mishkan Israel; Kolker Synagogue',
  NULL,
  '1914             [1920]0.  ',
  1971,
  'Disbanded in 1971',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '79c66617-0e20-4622-9647-cf3503fa5ff8',
  'Ramat El',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '8c2d7998-fc3a-4bf8-853c-2798dfd1bb5c',
  'Reb Heschel Shul',
  1924,
  '1924',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '5677b534-9d58-4dcc-a0e4-711d9937d05a',
  'Reform Congregation Beth Or ',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '8a535875-272f-4e80-94d8-e60243cac166',
  'Reform Congregation Keneseth Israel',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '67d88c09-f798-4a29-a528-66fabfd3964c',
  'Rhawnhurst Jewish Center',
  1956,
  '1956',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '2aebda65-2a1b-406c-ac91-21b212a40ea8',
  'Rodeph Shalom',
  1802,
  '1802',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'a715e53f-0ae5-47ef-a314-57279242995f',
  'Rodeph Shalom Suburban',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '631cdd52-54e3-45f2-b3eb-c18c1f99e113',
  'Rodeph Zedek [Temple]',
  1953,
  '1953',
  1982,
  '1982',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '7c02b6ff-aff8-4060-b947-75d64a4dc6a2',
  'Rodeph Zedek Anshe Szager: See, Kesher Israel',
  NULL,
  '1887             [1889]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '85170322-7a98-4545-99b0-970b07e8e139',
  'Rodeph Zedek Anshe Szager:                                        See, Kesher Israel (Lombard St)',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'c3115eeb-dbab-41aa-b23e-1ab51d52bc5b',
  'Rothenberg Shul',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'b8d57584-92da-48ba-9a61-30ebf3136b9e',
  'Rothschild Memorial Synagogue: See, Beth-El',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'd319bb8a-a487-46cb-8dea-de5fef46aad2',
  'Rudiviler Lubliner Lodge Congregation',
  1919,
  '1919',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'c79831bc-fae4-407c-8396-ce1230618cb5',
  'Rumanian American Congregation:                             See, Agudas Achim Rumanian Congregation',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '606a2121-42e3-4878-89cc-6cde0e39dfd2',
  'Russian Synagogue',
  NULL,
  '[1995]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '1d8a02a6-f110-4bfb-91ed-a417599f27f3',
  'Sabato Morais Congregation',
  1894,
  '1894',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e8583840-96a4-43cf-9351-112079be7149',
  'Samuel Rosa Nathan Ohev Zedek:                              See, Ohev Zedek',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '42832257-e9dc-4bf4-a236-60d87b4b8d99',
  'Samuel Rosenwald Lodge Congregation',
  1919,
  '1919',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '601ffdee-6da0-4d5b-a10c-31077926a7e8',
  'Shaare Eliyhu',
  1919,
  '1919',
  1940,
  '1940''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '0141d4bd-0475-4f70-968d-3565c2ac5cc1',
  'Shaare Hatzedek Congregation of Rezistchev:                See Shari Zedek Anshe Reisicher',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'ae7a1eb8-61a0-467e-8891-f92f934b3cc5',
  'Shaare Shamayim ',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '67bfefd4-37e0-4211-8e94-b8ff95f56007',
  'Shaare Shamayim See Beth Judah, Rodeph Zedek, and Beth Chaim',
  NULL,
  '1907           [1909]            1961',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '8cb3522f-508f-43fd-83e2-1f53b374563f',
  'Shaare Shamayim-Beth Judah-Beth Tefilath Israel-Rodeph Zedek',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'ee2d8118-405f-45eb-8fd1-450cbedf4e21',
  'Shaare Torah',
  NULL,
  '1911          [1911]',
  1952,
  '1952',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '97db3692-2ee2-4688-a7f7-53350d70fe11',
  'Shaare Zedek.',
  NULL,
  '1914              [1917]',
  1970,
  'Late 1970''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'f33e1d61-a102-4366-a393-c7c9dbd056c5',
  'Shaare Tzedek of Philadelphia Geriatric Center',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '5bf3ddb9-d916-4ee2-a506-4eb64057afca',
  'Shaare Yishkan: See, Kensington Synagogue & Community Center',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'd54e3378-202d-4e17-bd10-ed725aae46af',
  'Shaare Yitzchok Congregation',
  NULL,
  '1920          [1921]',
  1990,
  '1990',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'd38adda1-efdb-48e1-bb74-28b9072be6d3',
  'Shaareh Zion',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '55edb45c-b430-4950-ad3c-c8b9f90d78db',
  'Shaarei Eli',
  NULL,
  '1917          [1918]',
  1981,
  '1981',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '2de1916a-66aa-4e1c-ad3f-2937a35286ff',
  'Shaari Israel',
  NULL,
  '1916             [1917]',
  1970,
  '1970''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '9501c065-c92c-489a-a652-3cbf2e7fc3ae',
  'Shaari Yitzhok',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '33995300-6f87-4cac-b30f-e56745a0b17b',
  'Shaari Zedek',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '9035f2ba-e307-4799-9de5-57bded77a622',
  'Temple Shalom',
  NULL,
  NULL,
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '246ba6ca-8162-475d-aa5f-dce09cccf716',
  'Shar Israel Young People''s Congregation',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '40b375d8-1676-48af-9712-676157650419',
  'Shari Zedek Anshe Reisicher: Also, Shaare Hatzedek Cong. Of Rezistchev',
  NULL,
  '1902             [1902]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e893ad04-e09c-4b4b-a21f-4f1175791322',
  'Shearith Israel',
  NULL,
  '1894               [1894]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'dfed8c9b-21f2-49c5-bc3a-b3b31ada9adb',
  'Shearit Israel - Northeast Sephardic Congregation',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '419aa2f6-c8f4-4577-aa16-f9f05c5d4a9c',
  'Shearith Israel Talmud Torah',
  NULL,
  '1911            [1911]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '7d8eb815-b298-4161-88cb-3a55a7e15932',
  'Sheinfeld''s Shul',
  1930,
  '1930',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e42f3f40-1046-49f9-9d7a-5d0c9416ccaf',
  'Shel Emeth [Chevra Chesed]',
  NULL,
  '1894               [1894]',
  1910,
  'Disbanded by 1910',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '37288ced-f7f5-419b-9bc1-4b0afea96a6a',
  'Shir Ami-Bucks County Jewish Congregation',
  1976,
  '1976',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'f737d8ef-aed7-4809-a34b-6b4979258ddb',
  'Shir Shalom (Society for Humanistic',
  NULL,
  NULL,
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '079e1905-94ef-46e8-b7a7-0881fe70dd54',
  'Shivtei Yeshurun Anshe Philadelphia:                       See, Shivtei Yeshurun',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '91cc8daf-af65-4f28-bd39-f2b8c169af57',
  'Shivtei Yeshurun: Also, Shivtei Yeshurun Anshe Philadelphia; Adath Jeshurun Talmud Torah',
  NULL,
  '1876             [1892]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '6ed0158d-3b8c-4d03-b338-13c32882ceba',
  'Temple Sholom',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'c550c5f9-5d59-40d4-afee-1bad33c3c1ac',
  'Sholom Eswill [Chevra]',
  1930,
  '1930',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '82ddbc7a-82c5-48a0-91d5-b15a493cea18',
  'Temple Sholom of Broomall',
  1956,
  '1956',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'ce4850e6-4a5d-49df-9cef-34d994ffd71f',
  'Temple Sholom: Also, Upper Northwood Jewish Community Center',
  1940,
  '1940',
  2005,
  '2005',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'fbc2214f-0e7f-476b-ae6e-07adc254edf6',
  'Shomre Emuno Anshe Kelem: Also, Khelmer Shul; Beth HaMedrash Hagodol',
  NULL,
  '1890              [1893]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'ead0efa9-d177-47b5-b910-a2e3021a166e',
  'Shomre Shabbas [Chevra]',
  1907,
  '1907',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '466efc86-5454-438f-a636-920bb0f7f209',
  'Shomre Shabbas Congregation Umesilas Yesharim;',
  1893,
  '1893',
  1930,
  'Late 1930''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '1437c430-cf3b-48aa-9ee8-dab19d8c39b8',
  'Shomre Shabbas: See also, Emunas Israel Ohev Sholom',
  NULL,
  '1892            [1894]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'df7a3e20-32e4-47c5-8746-b774274ce9a1',
  'Shomre Shabes UMachzikei HaDath: Also, Beth HaKeneseth Kaiserman',
  1892,
  '1892',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '911b03af-0d70-43d2-8a37-3da43ebc71fd',
  'Temple Sinai',
  1940,
  '1940',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '1cac8823-2191-4933-a1f5-66b91b4bfc34',
  'Sinai Temple (Aka Temple Sinai)',
  1929,
  '1929',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '82259b6d-d6bd-4354-b253-52bc1aca85b4',
  'Soble Family Congregation [The]',
  1903,
  '1903',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e127efde-172c-4905-8b7c-3e5409adc625',
  'Society Hill Free Synagogue ',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '9e8d6168-7404-4c2e-9255-f3b94301b804',
  'Society Hill Rumanian Synagogue ',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '26417501-489c-4fc1-a948-81799b7327a3',
  'Society Hill Synagogue',
  1916,
  '1916',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '4ad22983-31e5-4ce9-afad-0ba8438f297b',
  'Congregation Sons of Halberstam',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'c8ad1946-e42c-4f8a-89af-7c0c774f36c1',
  'Suburban Jewish Community Center, Temple Tel Or',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'c5b37322-87a1-4b72-8808-ecbc5681dc45',
  'Suburban Jewish Community Center-B''nai Aaron',
  1926,
  '1926',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '335b58df-73a5-4724-b0de-6f6212f4b33b',
  'Tacony Hebrew Congregation. Also see, Temple Menorah',
  1924,
  '1924',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'b636ba35-f68c-48e5-9828-96d1f7295675',
  'Talmud Torah Congregation.',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'a7507b37-f2cd-4e42-9ea4-7acb0fdf7052',
  'Talmud Torah. See, Independent Southern Congregation',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '0d68d032-8918-4508-b804-345b2d5a114d',
  'Talmudical Yeshiva of Philadelphia',
  1956,
  '1956',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '56ee6da2-91e7-4a10-851f-ca9bac172807',
  'Temple Tel Or',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '35cd57ca-15ed-4396-8eda-590a44784f80',
  '(Temple) B''nai Israel',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'dce88913-a073-4c36-892c-861c72a11bec',
  'Congregation Temple Judea',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'a055aabc-a196-4b81-b4ff-828ef1c6c67d',
  'Teshuath Israel',
  1893,
  '1893',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '24df8c72-946d-4757-8fc2-4f4aa7350222',
  'The Rushiner Shul. See, Shari Zedek Anshe Reisicher',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '4471a948-2b54-4589-acf4-d747229541d6',
  'The White Shul. See, B''nai Menasha',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '42a60297-424d-4b2b-9140-4f989b8de083',
  'Tiferes B''nai Israel',
  NULL,
  NULL,
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '83d489dd-60ef-46cd-8160-f6d6fb74d52c',
  'Tiferes Israel Anshe Zitomir-Gubernia Wohlin Nusach Sfard: Also, Anshe Zhitomir nusach Sfard',
  NULL,
  '[1892]',
  1965,
  '1965;                  moved to 6th      & Wolf.',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '4c4f751b-a888-4963-baed-4fd4e178fc06',
  'Tiferet Bet Israel',
  NULL,
  NULL,
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '3ad2f6db-35ac-40c7-befa-e6a3fdade686',
  'Tiferet Israel of Lower Bucks County',
  NULL,
  NULL,
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'bec5cb2d-9879-4b86-bf83-d8cd6d92f015',
  'Tiferet Joseph',
  1929,
  '1929',
  1978,
  '1978',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'a28d2b91-8273-4586-8c17-f30866e37061',
  'Tifereth Israel',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'da520970-2320-4ce0-b9ba-c1b848389f4b',
  'Tifereth Israel Anshe Lita',
  NULL,
  '1903            [1905]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'c7f0a771-3756-4baa-abbf-032593e16fef',
  'Tifereth Israel Anshel Zitomer',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '0768dfdb-4236-4bd0-a8c8-b3d6d8c7a2c6',
  'Tifereth Israel of Parkside',
  NULL,
  '1904             [1912]',
  1960,
  '1960',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'b74be613-0a62-4fed-9232-32fc99afc0ec',
  'Tikvas Israel',
  NULL,
  '1920            [1924]',
  1972,
  '1972;',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'c1857424-9714-4005-b754-cfd76bfaf235',
  'Tikvas Zion',
  1905,
  '1905',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'a6d1d8a9-10fc-4d3f-b560-cb8aaafaba4a',
  'Tikvoh Chadoshoh',
  NULL,
  '1940''s',
  1985,
  '1985',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'ef52d2d7-b9ab-4582-95cb-3140dc6c3845',
  'Torah Anshe Sfard',
  NULL,
  '[1932]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'b6b45beb-f216-4cb9-ba1d-8164d4f0b2ac',
  'Torah Links Minyan',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '39c518ad-a8bb-45d4-9d84-c4f2cc323d88',
  'Toras Israel. Also, Bialik Congregation; Beth Zion',
  NULL,
  '1922             [1923]',
  1970,
  'Early 1970''s.',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '54432f77-c696-4a94-8623-f3c5fcf78c69',
  'Touro Hall Free Synagogue',
  NULL,
  '[1891]',
  1930,
  'Early 1930''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'bb478e41-f905-49dd-95bd-b1f8d4a92c99',
  'Tzedek V''Shalom',
  NULL,
  NULL,
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'ef189e1c-9020-480c-bc54-3f7c85508951',
  'University City Synagogue',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '44435ce8-546a-42df-9a2f-a38291ce785f',
  'Upper Darby Synagogue Center',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '2c231cea-4304-4725-9e37-20421b46a46a',
  'Upper Northwood Jewish Community Center: See, Temple Sholom',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '2f41e3fd-845a-4f56-ad6b-58b0b297e63b',
  'Uptown Home for the Aged: See, Moshe Zekenim',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'a6b08280-7a08-431c-a110-022ecd475c34',
  'Congregation Vilna ',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'a9d58994-73b8-4394-92c1-e9363e25b2b5',
  'Vilna Congregation. Also, [Beis HaKnesses] Anshe Vilno.',
  NULL,
  '1904           [1904]',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'f0449772-8462-42e5-a81a-ddd6b1565aac',
  'Vine Street Synagogue: Also see, Eastern Women''s Talmud Torah',
  NULL,
  NULL,
  1960,
  '1960''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'a847a084-2e1b-4942-8ac7-5e0ac5dd5a0e',
  'West Chester Reform Temple Beth Chaim',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'b328995b-aab7-4c53-b4e4-a62648e8039b',
  'West Oak Lane Jewish Community Center',
  1950,
  '1950',
  1978,
  '1978;',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '51afbb7e-41c3-4dd6-9417-749248250a92',
  'West Philadelphia Hebrew Congregation (Beth Judah)',
  1908,
  '1908',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'b9f68536-2a56-4e16-94e3-b05b60f3f7c9',
  'West Philadelphia Jewish Community Center',
  NULL,
  '1923             [1928]',
  1960,
  '1960''s;',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '65642261-0b3a-4703-91e1-34ef0a4b3a4e',
  'West Philadelphia Talmud Torah',
  1919,
  '1919',
  1952,
  'About 1952',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '0425e9d8-5988-484b-b895-446eaf2378f3',
  'Wilner Congregation',
  1901,
  '1901',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '552fd018-6cd2-49a9-9069-116fc7bc0be1',
  'Winitzer Congregation: Also Beneficial Sons of David',
  NULL,
  '1896/1901 [1896/1901]',
  1910,
  'Disbanded by early 1910''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '6b29c64c-b262-42e3-ab1e-24f42a3d1005',
  'Woodside Jewish Community Center',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '45e004bc-5fc2-490b-8fbd-ee136e0e8d08',
  'Woodside Park Congregation',
  1962,
  '1962',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '7fb766af-c1c3-4a78-b33b-7cc7c962c5f1',
  'Wynnefield Jewish Center',
  1945,
  '1945',
  1960,
  '1960''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'b40c796d-3658-4230-b5ab-345eb7df5d43',
  'Yagdil Torah',
  NULL,
  '1924              [1924]',
  1931,
  'Disbanded by 1931',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '35f8fe1b-69b9-409c-8059-c16c49e2c3e3',
  'Yardley Synagogue (Beth El)',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'bf49caed-7d84-4679-b7ca-31e02696d657',
  'Yavneh Synagogue',
  1950,
  '1950',
  1970,
  '1970',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '88ddd6d3-3643-4705-9e4b-0d700dfaa9d5',
  'Yeadon Jewish Community Center',
  NULL,
  NULL,
  1991,
  '1991',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '2e29cc9e-ca5a-40b2-83d2-035140f8bb17',
  'Yeadon Jewish Community Center-Beth Tefilah',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e24146ae-678a-465b-82a4-7d46693893fe',
  'YM-YWHA Congregation',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '813a53d4-ca11-4537-80de-fbe35127ae8c',
  'Young Israel of Beth Samuel: See, Adath Shalom',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'db01983f-7fe1-4811-b19d-3d7eb15f770e',
  'Young Israel of Cherry Hill',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '4c8c693f-80e0-453a-9137-336150f656f4',
  'Young Israel of Elkins Park',
  1980,
  '1980',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '1727000e-3aa5-49a5-8f4c-b394e56807c4',
  'Young Israel of Oxford Circle',
  1954,
  '1954',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '492ee459-fb54-45a3-a6d2-5394e6eeae86',
  'Young Israel of Strawberry Mansion',
  1940,
  '1940',
  1954,
  '1954;',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'd2bc3c1b-1f8c-4227-a5df-069c17cebe6d',
  'Young Israel of the Main Line',
  NULL,
  '1960               [1965]',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '0e9c5c37-690e-49bd-8e60-5c7b3435343c',
  'Young Israel of Wynnefield',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '6ad4c097-3496-4e23-8afe-dd83822d0ecf',
  'Young Israel Synagogue of Oxford Circle',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '6db9a0ca-132a-40f5-aeba-517642ec0b72',
  'Young People''s B''nai Moishe: See, Adath Shalom',
  1950,
  '1950',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'cc5b27c1-25ea-4c04-b6f7-47581ffde5a4',
  'Young People''s Congregation - Shaare Israel; Also Adath Shalom',
  1947,
  '1947',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'be644373-58ea-4984-bb9b-06b48c0b90e0',
  'Young People''s Congregation - Shari Eli.',
  1946,
  '1946',
  NULL,
  'Active',
  'active',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'a986b202-88fb-43ce-947a-1043a39e8f24',
  'Zeiras Israel: Also, Catherine St. Shul',
  NULL,
  '[1915/20]',
  1965,
  'Disbanded in 1965',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '6c3eb29b-f74b-4be2-aeb4-f4c6c5686469',
  'Congregation Zemach David',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'c296eac2-628e-491b-96b8-2c5defc1a7d9',
  'Zemach David nusach Sfard',
  NULL,
  '1923             [1928]',
  1981,
  '1981',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '4dfc3808-9c38-4649-828e-4883850f8056',
  'Zemach David of Logan',
  NULL,
  '1970''s',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'ce03564d-ba1e-44cd-8002-98bbdf27cfd7',
  'Zikhron Yaakov: See, Chevra Tehilim Zikhron Yaakov',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '2adaba1e-5942-408b-a94d-3dc649dca1d8',
  'Zikne Zedek',
  NULL,
  '[1896]',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '1fbd9103-f77c-4202-a4a8-140faffbbc17',
  'Ziknei Israel [Chevra]',
  NULL,
  '1890''s [1914]',
  1970,
  '1970''s',
  'closed',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '81d22c18-e293-4aa9-964a-fd4bc7de76cd',
  'Temple Zion',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'f116cdb2-815a-4954-8623-52726301db99',
  'Temple Zion of Huntingdon Valley',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e81c953c-f25a-439d-ab97-97ba51a389bb',
  'Temple Zion: Also see, Parker''s Place',
  NULL,
  'Late 50''s/ Early 60''s',
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'a954769d-e683-41bc-ae36-8d3ffdafae80',
  '(Congregation) Beth Medrash Harav B’nai Jacob',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'b149789b-0f01-4ffc-8295-5c4b8d82020d',
  '(Congregation) Beth Or',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'c0042da4-09db-4394-86a3-2e07bf57b57d',
  '(Congregation) B’nai Jacob-Bershu Tov ',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '412e21c3-d56b-44c0-aa78-adb4ea135158',
  '(Congregation) Sons of Israel',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'fd9a844e-f9c6-4428-b3b8-0d566550b765',
  'Or Ami, Ivy Ridge Jewish Community Center',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '6e0105fe-b673-4ed0-a9bb-af467cdac99a',
  '(Congregation) Ner Zedek-Ezrath Israel-Beth Uziel',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '8e70d2cd-6a80-49b3-96a8-de3980c2499e',
  '(Congregation) Beth Jacob-Beth Israel',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '53406b40-0745-426d-a95d-5edcb2db4cd4',
  '(Congregation) Ahavas Torah-Rhawnhurst Torah Center',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'ec6f53b0-a7c2-4f5d-beee-2596e2dd08b4',
  '(Congregation) Hesed Shel Emet',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'e1a5751f-ccde-4c5a-bb30-6299d6b94e9a',
  '(Congregation) Mercy and Truth',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  '566ca246-f622-4c6b-bbbf-657872463585',
  '(Congregation) Ner Tamid',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

INSERT INTO public.synagogues (
  id, name, founded_year, founded_text, closed_year, closed_text,
  status, created_at, updated_at, approved
) VALUES (
  'a47ce4d0-d334-4dd6-a9ae-81192957aa61',
  '(Congregation) Ner Zedek',
  NULL,
  NULL,
  NULL,
  NULL,
  'unknown',
  NOW(),
  NOW(),
  true
);

