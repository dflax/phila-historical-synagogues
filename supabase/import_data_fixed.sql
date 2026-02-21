-- ============================================================================
-- Philadelphia Historical Synagogues - Complete Data Import
-- ============================================================================
-- Run this entire file in Supabase SQL Editor after running schema.sql
-- This will import all 562 synagogues with their data
-- ============================================================================

-- 1. A.M. Burd's Shul
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('A.M. Burd''s Shul', NULL, NULL, NULL, NULL, 'unknown', true);

-- 2. Abraham Potash Shtiebl [Reverend]
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Abraham Potash Shtiebl [Reverend]', 1955, '1955', NULL, NULL, 'unknown', true);

-- 3. Achdus B'nai Israel. See, B'nai Israel @ E. Erie
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Achdus B''nai Israel. See, B''nai Israel @ E. Erie', NULL, NULL, NULL, NULL, 'unknown', true);

-- 4. Adas Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Adas Israel', NULL, NULL, 1875, '1875', 'closed', true);

-- 5. Adas Moishe Montefiore
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Adas Moishe Montefiore', 1907, '[1916]', 1971, 'Sold 1971', 'closed', true);

-- 6. Adat Beyt Mosheh Also, [The] Colored Hebrew Community
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Adat Beyt Mosheh Also, [The] Colored Hebrew Community', 1951, '1951', NULL, NULL, 'unknown', true);

-- 7. Adath Emanu-el
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Adath Emanu-el', NULL, NULL, NULL, NULL, 'unknown', true);

-- 8. Adath Haemrth Israel [?]
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Adath Haemrth Israel [?]', NULL, NULL, NULL, NULL, 'unknown', true);

-- 9. Adath Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Adath Israel', 1873, '1873', NULL, NULL, 'unknown', true);

-- 10. Adath Israel Nusach Sfard
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Adath Israel Nusach Sfard', 1902, '[1903]', NULL, NULL, 'unknown', true);

-- 11. Adath Israel of the Main Line
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Adath Israel of the Main Line', 1946, '1946', NULL, 'Active', 'active', true);

-- 12. Adath Jeshurun
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Adath Jeshurun', 1854, '1854', NULL, 'Active', 'active', true);

-- 13. Adath Jeshurun Havurah
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Adath Jeshurun Havurah', NULL, NULL, NULL, NULL, 'unknown', true);

-- 14. Adath Jeshurun Talmud Torah Congregation. Also, Ezras Israel; [The] Carpenter's Shul
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Adath Jeshurun Talmud Torah Congregation. Also, Ezras Israel; [The] Carpenter''s Shul', 1918, '1918', 1962, '1962', 'closed', true);

-- 15. Adath Shalom
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Adath Shalom', 1956, '1956', NULL, NULL, 'unknown', true);

-- 16. Adath Shalom.
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Adath Shalom.', 1950, '1950''s', NULL, NULL, 'unknown', true);

-- 17. See, Young People's Shaare Israel; Young People of Beth Samuel; Young People's B'nai Moishe
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('See, Young People''s Shaare Israel; Young People of Beth Samuel; Young People''s B''nai Moishe', NULL, NULL, NULL, NULL, 'unknown', true);

-- 18. Adath Tikvah - Montefiore
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Adath Tikvah - Montefiore', NULL, NULL, NULL, NULL, 'unknown', true);

-- 19. Adath Tikvah of Whitaker Ave
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Adath Tikvah of Whitaker Ave', 1961, '[1972]', NULL, NULL, 'unknown', true);

-- 20. Adath Zion Synagogue. See, Frankford Hebrew Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Adath Zion Synagogue. See, Frankford Hebrew Congregation', 1894, '1894', 2008, '2008', 'closed', true);

-- 21. Agudas Achim Machzikei Ha Rov. [Congregation]
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Agudas Achim Machzikei Ha Rov. [Congregation]', NULL, NULL, NULL, NULL, 'unknown', true);

-- 22. See, [Congregation] Machziknei Harov
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('See, [Congregation] Machziknei Harov', NULL, NULL, NULL, NULL, 'unknown', true);

-- 23. Agudas Achim Rumanian Congregation. Also see, Or Chudosh; Or Chodash-Agudas Achim; Or Chudosh- Agudas Achim -- Rumanian American Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Agudas Achim Rumanian Congregation. Also see, Or Chudosh; Or Chodash-Agudas Achim; Or Chudosh- Agudas Achim -- Rumanian American Congregation', 1886, '[1889]', NULL, NULL, 'unknown', true);

-- 24. Agudas Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Agudas Israel', 1939, '1939', NULL, NULL, 'unknown', true);

-- 25. Agudath Achim
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Agudath Achim', 1922, '[1922]', 1958, 'Disbanded 1958', 'closed', true);

-- 26. Agudath Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Agudath Israel', 1920, '1920', 1940, '1940''s', 'closed', true);

-- 27. Ahavas Achim [Chevra] . See, Ahavas Achim Podolier Verein Anshe Sfard
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ahavas Achim [Chevra] . See, Ahavas Achim Podolier Verein Anshe Sfard', NULL, NULL, NULL, NULL, 'unknown', true);

-- 28. Ahavas Achim Anshe Niezhin Nusach HaAri.
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ahavas Achim Anshe Niezhin Nusach HaAri.', NULL, NULL, NULL, NULL, 'unknown', true);

-- 29. See, Neziner Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('See, Neziner Congregation', NULL, NULL, NULL, NULL, 'unknown', true);

-- 30. Ahavas Achim Anshe Vitebsk
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ahavas Achim Anshe Vitebsk', 1918, '[1918]', 1960, 'Early 1960''s', 'closed', true);

-- 31. Ahavas Achim Ostreicher.
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ahavas Achim Ostreicher.', NULL, NULL, NULL, NULL, 'unknown', true);

-- 32. See, Austrian Galizianer Shul
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('See, Austrian Galizianer Shul', NULL, NULL, NULL, NULL, 'unknown', true);

-- 33. Ahavas Achim Podolier Verein Anshe Sfard. Also, [Chevra] Ahavas Achim
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ahavas Achim Podolier Verein Anshe Sfard. Also, [Chevra] Ahavas Achim', 1891, '[1891]', NULL, NULL, 'unknown', true);

-- 34. Ahavas Achim Talmud Torah Congregation. Also, Island Road Synagogue
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ahavas Achim Talmud Torah Congregation. Also, Island Road Synagogue', 1910, '1910', 1960, 'Sold in 1960''s.', 'closed', true);

-- 35. Ahavas Chesed Anshe Shavel [Chevra]
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ahavas Chesed Anshe Shavel [Chevra]', 1887, '1887', 1940, 'Early 1940''s', 'closed', true);

-- 36. Also, Ahavas Chesed; Anshe Jaffe
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Also, Ahavas Chesed; Anshe Jaffe', 1890, '[1890]', NULL, NULL, 'unknown', true);

-- 37. Ahavas Chesed. See, [Chevra] Ahavas Chesed Anshe Shavel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ahavas Chesed. See, [Chevra] Ahavas Chesed Anshe Shavel', NULL, NULL, NULL, NULL, 'unknown', true);

-- 38. Ahavas Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ahavas Israel', 1909, '1909', 1950, '1950''s', 'closed', true);

-- 39. Ahavas Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ahavas Israel', 1920, '1920''s', NULL, NULL, 'unknown', true);

-- 40. Ahavas Israel Anshe Kensington. Also, Ahavath Israel of Kensington
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ahavas Israel Anshe Kensington. Also, Ahavath Israel of Kensington', 1900, '[1903]', NULL, NULL, 'unknown', true);

-- 41. Ahavas Israel Anshe Sfard [Chevra]                           See, Ahavas Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ahavas Israel Anshe Sfard [Chevra]                           See, Ahavas Israel', NULL, NULL, NULL, NULL, 'unknown', true);

-- 42. Ahavas Israel of Trenton
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ahavas Israel of Trenton', 1920, '[1920''s]', NULL, NULL, 'unknown', true);

-- 43. Ahavas Israel.                                                                 Also, [Chevra] Ahavas Israel Anshe Sfard
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ahavas Israel.                                                                 Also, [Chevra] Ahavas Israel Anshe Sfard', 1920, '1920', 1951, 'Sold 1951', 'closed', true);

-- 44. Ahavas Torah
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ahavas Torah', 1975, '1975', NULL, NULL, 'unknown', true);

-- 45. Ahavas Torah Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ahavas Torah Congregation', 1937, '1937', NULL, NULL, 'unknown', true);

-- 46. Ahavath Israel of Kensington.
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ahavath Israel of Kensington.', NULL, NULL, NULL, NULL, 'unknown', true);

-- 47. See, Ahavas Israel Anshe Kensington
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('See, Ahavas Israel Anshe Kensington', NULL, NULL, NULL, NULL, 'unknown', true);

-- 48. Ahavath Zion
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ahavath Zion', 1901, 'Before 1901', NULL, NULL, 'unknown', true);

-- 49. Aitz Chaim
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Aitz Chaim', 1933, '1933', NULL, 'Active', 'active', true);

-- 50. Aitz Chaim
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Aitz Chaim', 1930, '1930', NULL, NULL, 'unknown', true);

-- 51. Aitz Chaim of Oxford Circle
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Aitz Chaim of Oxford Circle', 1960, '1960', NULL, NULL, 'unknown', true);

-- 52. Aitz Chaim Synagogue Center
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Aitz Chaim Synagogue Center', 1964, '[1964]', NULL, NULL, 'unknown', true);

-- 53. Aitz Chaim VeZichron Jacob
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Aitz Chaim VeZichron Jacob', 1918, '[1918]', 1960, 'Early 1960''s', 'closed', true);

-- 54. Aitz Chaim. Also, Heiner Fiscal "chicken foot" Shul; Kaiserman Shul
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Aitz Chaim. Also, Heiner Fiscal "chicken foot" Shul; Kaiserman Shul', 1920, '1920', 1950, 'Late 1950''s', 'closed', true);

-- 55. Anshe Birz. See, [Chevra] Poale Zedek-Anshe Birz
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Anshe Birz. See, [Chevra] Poale Zedek-Anshe Birz', 1889, '1889', NULL, NULL, 'unknown', true);

-- 56. Anshe Emeth
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Anshe Emeth', 1890, '[1890''s]', NULL, NULL, 'unknown', true);

-- 57. Anshe Emeth. Also, Aitz Chaim
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Anshe Emeth. Also, Aitz Chaim', 1927, '1927', 1940, '1940''s.', 'closed', true);

-- 58. Anshe Emeth. See, B'nai Halberstam
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Anshe Emeth. See, B''nai Halberstam', 1872, '1872', 1893, 'Disbanded 1893', 'closed', true);

-- 59. Anshe Hisan. Also, Chevra Heisner; Heisinger Congregation; Hesiner Independent Young Men's Society
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Anshe Hisan. Also, Chevra Heisner; Heisinger Congregation; Hesiner Independent Young Men''s Society', 1915, '[1920]', 1950, 'Mid 1950''s. Building then used as a Folk Shul.', 'closed', true);

-- 60. Anshe Jaffe.                                                                       See, [Chevra] Ahavas Chesed Anshe Shavel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Anshe Jaffe.                                                                       See, [Chevra] Ahavas Chesed Anshe Shavel', NULL, NULL, NULL, NULL, 'unknown', true);

-- 61. Anshe Kuppel Vohliner. Also, Chevra Vohliner Anshe Kuppel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Anshe Kuppel Vohliner. Also, Chevra Vohliner Anshe Kuppel', 1927, '[1927]', NULL, NULL, 'unknown', true);

-- 62. Anshe Lubowitz nusach Ari [Chevra]                           Also, Chevra Mishnais Anshe Lubavitch
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Anshe Lubowitz nusach Ari [Chevra]                           Also, Chevra Mishnais Anshe Lubavitch', 1911, '[1911]', 1940, 'Early 1940''s', 'closed', true);

-- 63. Anshe Ostropolier
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Anshe Ostropolier', 1935, '1935', NULL, NULL, 'unknown', true);

-- 64. Anshe Sholem
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Anshe Sholem', 1910, '[1910]', 1971, '1971/2', 'closed', true);

-- 65. Anshe Shulamit
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Anshe Shulamit', 1920, '1920', NULL, NULL, 'unknown', true);

-- 66. Anshe Sodo Lovon.                                                          See, Chevra Mishnayos Kehilas Kodesh Anshe Sodo Lovon
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Anshe Sodo Lovon.                                                          See, Chevra Mishnayos Kehilas Kodesh Anshe Sodo Lovon', NULL, NULL, NULL, NULL, 'unknown', true);

-- 67. Anshe Sude Luvin Biela Ziercow.                                            See, Chevra Mishnayos Kehilas Kodesh Anshe Sodo Lovon
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Anshe Sude Luvin Biela Ziercow.                                            See, Chevra Mishnayos Kehilas Kodesh Anshe Sodo Lovon', NULL, NULL, NULL, NULL, 'unknown', true);

-- 68. Anshe Vilno [Beis HaKnesses] See, Vilna Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Anshe Vilno [Beis HaKnesses] See, Vilna Congregation', NULL, NULL, NULL, NULL, 'unknown', true);

-- 69. Anshe Wohliner
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Anshe Wohliner', 1919, '1919', NULL, NULL, 'unknown', true);

-- 70. Anshe Zhitomir nusach Sfard.                                          See, Tiferes Israel Anshe Zitomer-Gubernia Wohlin Nusach Sfard.
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Anshe Zhitomir nusach Sfard.                                          See, Tiferes Israel Anshe Zitomer-Gubernia Wohlin Nusach Sfard.', NULL, NULL, NULL, NULL, 'unknown', true);

-- 71. Ateres Anshe Brohin V'Choimetsh [Chevra] See Atereth Israel (S.6th & Morris)
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ateres Anshe Brohin V''Choimetsh [Chevra] See Atereth Israel (S.6th & Morris)', NULL, NULL, NULL, NULL, 'unknown', true);

-- 72. Atereth Israel of Overbrook
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Atereth Israel of Overbrook', 1922, '1924]', 1942, '1942', 'closed', true);

-- 73. Atereth Israel.                                                                  Also, [Chevra] Ateres Anshe Brohin V'Choimetsh
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Atereth Israel.                                                                  Also, [Chevra] Ateres Anshe Brohin V''Choimetsh', 1903, '[1903]', 1977, '1977/8.', 'closed', true);

-- 74. Atereth Israel. (Previously B'nai Aruyh Moshel) Also, Jewish Farmers' Shul
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Atereth Israel. (Previously B''nai Aruyh Moshel) Also, Jewish Farmers'' Shul', 1895, '1916]', NULL, NULL, 'unknown', true);

-- 75. Austrian Galizianer Shul. Also, Ohavas Achim Ostreicher
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Austrian Galizianer Shul. Also, Ohavas Achim Ostreicher', 1907, '[1930]', NULL, NULL, 'unknown', true);

-- 76. Austro-Hungarian Congregation.                                Also, [Chevra] Re'im Ahuvim
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Austro-Hungarian Congregation.                                Also, [Chevra] Re''im Ahuvim', 1892, '[1892]', NULL, 'Active??', 'active', true);

-- 77. Beit Harambam
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beit Harambam', 1978, '1978', NULL, 'Active', 'active', true);

-- 78. Bessarbier Talmud Torah
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Bessarbier Talmud Torah', 1912, '[1912]', 1934, '1934', 'closed', true);

-- 79. Bet Mishpachah
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Bet Mishpachah', NULL, NULL, NULL, NULL, 'unknown', true);

-- 80. Beth Abraham
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Abraham', 1914, '[1919]', 1960, 'Incorporated into Beth Ami 1960''s.', 'closed', true);

-- 81. Beth Ahavah
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Ahavah', 1975, '1975', NULL, 'Active', 'active', true);

-- 82. Beth Am: See Old York Road Temple - Beth Am
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Am: See Old York Road Temple - Beth Am', NULL, NULL, NULL, 'Active', 'active', true);

-- 83. Beth Am
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Am', NULL, NULL, NULL, NULL, 'unknown', true);

-- 84. Beth Am Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Am Israel', 1922, '[1924]', NULL, 'Active', 'active', true);

-- 85. Beth Ami
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Ami', 1956, '1956', NULL, 'Active', 'active', true);

-- 86. Beth Chaim
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Chaim', NULL, NULL, NULL, NULL, 'unknown', true);

-- 87. Beth Chaim Reform Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Chaim Reform Congregation', 1992, '1992', NULL, 'Active', 'active', true);

-- 88. Beth David
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth David', 1898, '[1898]', NULL, NULL, 'unknown', true);

-- 89. Beth David Reform
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth David Reform', 1942, '[1945]', NULL, 'Active', 'active', true);

-- 90. Beth El
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth El', 1950, '1950''s', NULL, NULL, 'unknown', true);

-- 91. Beth El: Also Rothschild Memorial Synagogue
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth El: Also Rothschild Memorial Synagogue', 1907, '[1909]', 1970, 'Merged with Beth Hillel and moved into their building 1970.', 'merged', true);

-- 92. Beth El Emeth
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth El Emeth', 1857, '1857', NULL, NULL, 'unknown', true);

-- 93. Beth El of Bucks County
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth El of Bucks County', 1953, '1953', NULL, 'Active', 'active', true);

-- 94. Beth El, Suburban
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth El, Suburban', NULL, NULL, NULL, NULL, 'unknown', true);

-- 95. Beth El-Ner Tamid
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth El-Ner Tamid', NULL, NULL, NULL, 'Active??', 'active', true);

-- 96. Beth Elohim
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Elohim', 1893, '1893', NULL, NULL, 'unknown', true);

-- 97. Beth Elohim. Also, Krakauer-Beth Elohim Beneficial Association; [The] Hollander Shul; B'nai Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Elohim. Also, Krakauer-Beth Elohim Beneficial Association; [The] Hollander Shul; B''nai Israel', 1879, '1879           [1879]', NULL, NULL, 'unknown', true);

-- 98. Beth Emeth.
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Emeth.', NULL, NULL, NULL, NULL, 'unknown', true);

-- 99. Beth Emeth.
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Emeth.', 1910, '1910', 1940, 'Disbanded 1940''s.', 'closed', true);

-- 100. Beth HaKeneses Reb Hirshel.                                      See, Beth HaKeneseth Reb Eichler
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth HaKeneses Reb Hirshel.                                      See, Beth HaKeneseth Reb Eichler', NULL, NULL, NULL, NULL, 'unknown', true);

-- 101. Beth HaKeneseth
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth HaKeneseth', 1930, '1930', NULL, NULL, 'unknown', true);

-- 102. Beth HaKeneseth Ben Markowitz
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth HaKeneseth Ben Markowitz', 1927, '1927', 1937, '1937', 'closed', true);

-- 103. Beth HaKeneseth Brezofsky
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth HaKeneseth Brezofsky', NULL, NULL, NULL, NULL, 'unknown', true);

-- 104. Beth HaKeneseth Northern Hungarian
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth HaKeneseth Northern Hungarian', 1901, '[1901]', NULL, NULL, 'unknown', true);

-- 105. Beth HaKeneseth Reb Eichler. Also see, Beth HaKenesses Reb Hirshel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth HaKeneseth Reb Eichler. Also see, Beth HaKenesses Reb Hirshel', 1900, '1900', 1940, 'Disbanded early 1940''s', 'closed', true);

-- 106. Beth HaKneseth Kaiserman. See, [Chevra] Shomrei Shabos Umachzikei Hadath
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth HaKneseth Kaiserman. See, [Chevra] Shomrei Shabos Umachzikei Hadath', NULL, NULL, NULL, NULL, 'unknown', true);

-- 107. Beth HaKneseth-Beth Shalom
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth HaKneseth-Beth Shalom', NULL, NULL, NULL, NULL, 'unknown', true);

-- 108. Beth Hakneseth-Talmud
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Hakneseth-Talmud', 1932, '1932', 1956, '1956', 'closed', true);

-- 109. Torah Anshe Sfard
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Torah Anshe Sfard', 1932, '[1932]', NULL, NULL, 'unknown', true);

-- 110. Beth HaMedrash
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth HaMedrash', 1958, '1958', NULL, 'Active', 'active', true);

-- 111. Beth HaMedrash Anshe Kaneau
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth HaMedrash Anshe Kaneau', 1908, '1908          [1911]', 1940, '1940', 'closed', true);

-- 112. Beth HaMedrash Dorshe Sholom
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth HaMedrash Dorshe Sholom', 1923, '[1923]', 1960, 'Early 1960''s', 'closed', true);

-- 113. Beth HaMedrash HaGadol Nusach Ashkenaz.         Also see, [The] Khelmer Shul
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth HaMedrash HaGadol Nusach Ashkenaz.         Also see, [The] Khelmer Shul', 1905, '[1909]', NULL, NULL, 'unknown', true);

-- 114. Beth HaMedrash Hangdog Anshe Ashkenaz.         See, Jewish Rumanian Congregation -               Agudas Achim
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth HaMedrash Hangdog Anshe Ashkenaz.         See, Jewish Rumanian Congregation -               Agudas Achim', 1911, '1911            [1911]', NULL, NULL, 'unknown', true);

-- 115. Beth HaMedrash Hare
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth HaMedrash Hare', 1952, '1952', NULL, NULL, 'unknown', true);

-- 116. Beth HaMedrash Reb Sofronski
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth HaMedrash Reb Sofronski', 1923, '1923', 1930, 'Early 1930''s', 'closed', true);

-- 117. Beth HaMedrosh (mid- town Chapel)
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth HaMedrosh (mid- town Chapel)', NULL, NULL, NULL, NULL, 'unknown', true);

-- 118. Beth HaMedrosh Hagodol-Beth Yaacov
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth HaMedrosh Hagodol-Beth Yaacov', 1931, '[1932]', 1980, 'Late 1980''s.', 'closed', true);

-- 119. Beth Hillel-Beth El
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Hillel-Beth El', 1958, '1958', NULL, 'Active', 'active', true);

-- 120. Beth Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Israel', 1901, '1901', NULL, NULL, 'unknown', true);

-- 121. Beth Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Israel', 1968, '1968', NULL, NULL, 'unknown', true);

-- 122. Beth Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Israel', 1840, '1840', 1964, '1964', 'closed', true);

-- 123. Beth Israel Congregation of Chester County
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Israel Congregation of Chester County', 1904, '1904', NULL, 'Active', 'active', true);

-- 124. Beth Israel of Media
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Israel of Media', 1929, '1929', NULL, 'Active', 'active', true);

-- 125. Beth Jacob
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Jacob', 1908, '[1908]', 1950, '1950''s', 'closed', true);

-- 126. Beth Jacob
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Jacob', 1914, '[1915 (Book #52, p. 162)]', 1960, '1960''s', 'closed', true);

-- 127. Beth Jacob Anshe Dadmoor
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Jacob Anshe Dadmoor', 1927, '[1930]', NULL, NULL, 'unknown', true);

-- 128. Beth Jacob Anshe
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Jacob Anshe', 1897, '1897', NULL, NULL, 'unknown', true);

-- 129. Lubavitz
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Lubavitz', 1897, '[1897]', NULL, NULL, 'unknown', true);

-- 130. Beth Jacob of West Philadelphia [Chevra]
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Jacob of West Philadelphia [Chevra]', 1916, '[1918]', 1962, '1962', 'closed', true);

-- 131. Beth Judah
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Judah', 1920, '1920''s [1925]', NULL, NULL, 'unknown', true);

-- 132. Beth Judah
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Judah', 1905, '1905', 1924, 'Sold 1924; disbanded', 'closed', true);

-- 133. Beth Judah. Also, Hebrew Congregation of West Philadelphia
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Judah. Also, Hebrew Congregation of West Philadelphia', 1905, '[1908]', 1968, '1968', 'closed', true);

-- 134. Beth Or Reform Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Or Reform Congregation', 1954, '[1955]', NULL, 'Active', 'active', true);

-- 135. Beth Schmuel. Also, Beth Samuel; Bes Schmuel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Schmuel. Also, Beth Samuel; Bes Schmuel', 1922, '[1922]', 1950, '1950''s.', 'closed', true);

-- 136. Beth Shloime Rumanian Congregation.                      See, Beth Solomon
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Shloime Rumanian Congregation.                      See, Beth Solomon', NULL, NULL, NULL, NULL, 'unknown', true);

-- 137. Beth Sholom.                                                                       Also, Logan Congregation Ahavas Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Sholom.                                                                       Also, Logan Congregation Ahavas Israel', 1917, '[1919]', NULL, 'Active', 'active', true);

-- 138. Beth Solomon
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Solomon', 1961, '1961', NULL, '1970s', 'closed', true);

-- 139. Beth Solomon Suburban (of Somerton)
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Solomon Suburban (of Somerton)', 1968, '1968', NULL, 'Active', 'active', true);

-- 140. Beth Solomon.                                                                  Also, Beth Shloime Rumanian Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Solomon.                                                                  Also, Beth Shloime Rumanian Congregation', 1948, '[1950]', NULL, NULL, 'unknown', true);

-- 141. Beth Tefilath Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Tefilath Israel', 1910, '1910          [1912]', NULL, NULL, 'unknown', true);

-- 142. Beth Tefilath Israel of Pennypack Park
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Tefilath Israel of Pennypack Park', NULL, NULL, NULL, NULL, 'unknown', true);

-- 143. Beth Tfilla of Overbrook Park
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Tfilla of Overbrook Park', 1948, '1948', NULL, NULL, 'unknown', true);

-- 144. Beth Tikvah
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Tikvah', 1958, '1958', NULL, NULL, 'unknown', true);

-- 145. Beth Tikvah-B'nai
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Tikvah-B''nai', NULL, NULL, NULL, 'Active', 'active', true);

-- 146. Jeshurun
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Jeshurun', NULL, NULL, NULL, NULL, 'unknown', true);

-- 147. Beth Torah [Temple]
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Torah [Temple]', NULL, NULL, NULL, NULL, 'unknown', true);

-- 148. Beth Tovim
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Tovim', 1964, '1964', NULL, 'Active', 'active', true);

-- 149. Beth Uziel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Uziel', 1943, '1943', 1994, 'merged with Ner Zedek- Ezrath Israel', 'merged', true);

-- 150. Beth Zion
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Zion', NULL, NULL, NULL, NULL, 'unknown', true);

-- 151. Beth Zion. See, Toras Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Zion. See, Toras Israel', 1937, '1937', 1970, 'Early 1970''s.', 'closed', true);

-- 152. Beth Zion-Beth Israel [Temple]
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth Zion-Beth Israel [Temple]', NULL, NULL, NULL, 'Active', 'active', true);

-- 153. Beth-Elohim
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Beth-Elohim', NULL, NULL, NULL, NULL, 'unknown', true);

-- 154. Bialik Congregation. See, Toras Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Bialik Congregation. See, Toras Israel', NULL, NULL, NULL, NULL, 'unknown', true);

-- 155. Bialostotski Minyan
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Bialostotski Minyan', 1914, '1914', 1930, 'Bialitotski''s Shaliach Zibbur', 'closed', true);

-- 156. Bikur Cholim
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Bikur Cholim', 1861, '1861', NULL, NULL, 'unknown', true);

-- 157. Bikur Cholim [Chevra ]
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Bikur Cholim [Chevra ]', 1861, '1861', NULL, NULL, 'unknown', true);

-- 158. Birchas Shalom
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Birchas Shalom', 1935, '1935', NULL, NULL, 'unknown', true);

-- 159. B'nai Aaron
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Aaron', 1926, '[1927]', NULL, 'late ''60''s', 'closed', true);

-- 160. B'nai Aaron of Parkside
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Aaron of Parkside', 1929, '1929', NULL, NULL, 'unknown', true);

-- 161. B'nai Abraham
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Abraham', NULL, NULL, NULL, NULL, 'unknown', true);

-- 162. B'nai Abraham [Chevra]                                                    See, B'nai Abraham- Anshe Russ
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Abraham [Chevra]                                                    See, B''nai Abraham- Anshe Russ', NULL, NULL, NULL, NULL, 'unknown', true);

-- 163. B'nai Abraham- Anshe Russ.                                       Also, [Chevra] B'nai Abraham; Di Rusishe Shul;
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Abraham- Anshe Russ.                                       Also, [Chevra] B''nai Abraham; Di Rusishe Shul;', 1882, '[1885]', NULL, 'Active', 'active', true);

-- 164. B'nai Abraham Jewish Center
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Abraham Jewish Center', 1960, '1960', 1985, '1985', 'closed', true);

-- 165. B'nai Amoona
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Amoona', NULL, NULL, NULL, NULL, 'unknown', true);

-- 166. B'nai David Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai David Congregation', 1894, '[1897]', NULL, NULL, 'unknown', true);

-- 167. B'nai David
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai David', NULL, NULL, NULL, NULL, 'unknown', true);

-- 168. Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Congregation', NULL, NULL, NULL, NULL, 'unknown', true);

-- 169. B'nai Ephraim
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Ephraim', 1919, '1919', NULL, NULL, 'unknown', true);

-- 170. B'nai Halberstam.                                                              Also, Anshe Emet; B'nai Israel-Halberstam; B'nai Israel-Ohev Zedek; B'nai Israel-Ohev Zedek-B'nai Halberstam

INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Halberstam.                                                              Also, Anshe Emet; B''nai Israel-Halberstam; B''nai Israel-Ohev Zedek; B''nai Israel-Ohev Zedek-B''nai Halberstam ', 1886, '[1891]', 1976, '1976', 'closed', true);

-- 171. B'nai Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Israel', 1921, '[1921]', NULL, NULL, 'unknown', true);

-- 172. B'nai Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Israel', 1913, '[1914]', 1960, 'Mid 1960''s', 'closed', true);

-- 173. B'nai Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Israel', 1877, '1877', NULL, NULL, 'unknown', true);

-- 174. B'nai Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Israel', 1852, '1852', 1879, 'Disbanded 1879', 'closed', true);

-- 175. B'nai Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Israel', 1914, '1914', NULL, NULL, 'unknown', true);

-- 176. B'nai Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Israel', 1913, '[1916]', NULL, NULL, 'unknown', true);

-- 177. B'nai Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Israel', 1901, '[1901]', NULL, NULL, 'unknown', true);

-- 178. B'nai Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Israel', 1920, '1920', NULL, NULL, 'unknown', true);

-- 179. B'nai Israel Anshe Polin
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Israel Anshe Polin', 1905, '1905', 1960, '1960''s', 'closed', true);

-- 180. B'nai Israel of Fairmount. See, Old Man Miller's Shul
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Israel of Fairmount. See, Old Man Miller''s Shul', NULL, NULL, NULL, NULL, 'unknown', true);

-- 181. B'nai Israel of Olney
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Israel of Olney', 1921, '[1924]', NULL, NULL, 'unknown', true);

-- 182. B'nai Israel. Also, Ahdus B'nai Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Israel. Also, Ahdus B''nai Israel', 1921, '1921', 1964, '1964', 'closed', true);

-- 183. B'nai Israel. See, Beth Elohim (at S.5th)
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Israel. See, Beth Elohim (at S.5th)', NULL, NULL, NULL, NULL, 'unknown', true);

-- 184. B'nai Israel-Halberstam. See, B'nai Halberstam
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Israel-Halberstam. See, B''nai Halberstam', NULL, NULL, NULL, NULL, 'unknown', true);

-- 185. B'nai Israel-Ohev Zedek. See, B'nai Halberstam
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Israel-Ohev Zedek. See, B''nai Halberstam', 1886, '1886', NULL, 'Active', 'active', true);

-- 186. B'nai Halberstam: See B'nai Israel - Ohev Zedek - B'nai Halberstam.
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Halberstam: See B''nai Israel - Ohev Zedek - B''nai Halberstam.', NULL, NULL, NULL, NULL, 'unknown', true);

-- 187. B'nai Jacob
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Jacob', 1912, '1912', NULL, 'Active', 'active', true);

-- 188. B'nai Jacob
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Jacob', 1913, '[1914]', 1950, 'Disbanded late 1950''s/ early 1960''s.', 'closed', true);

-- 189. B'nai Jacob - Dirshu Tov
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Jacob - Dirshu Tov', 1961, '1961', NULL, 'Active', 'active', true);

-- 190. B'nai Jacob Anshe Sfard
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Jacob Anshe Sfard', 1898, '[1898]', NULL, NULL, 'unknown', true);

-- 191. B'nai Jacob. Also, Kesher Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Jacob. Also, Kesher Israel', 1883, '[1884]', 1893, '1893', 'closed', true);

-- 192. B'nai Jeshurun Ahavas Chesed
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Jeshurun Ahavas Chesed', NULL, NULL, NULL, NULL, 'unknown', true);

-- 193. B'nai Jeshurun of Mount Airy.
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Jeshurun of Mount Airy.', NULL, NULL, NULL, NULL, 'unknown', true);

-- 194. See, B'nai Jeshurun
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('See, B''nai Jeshurun', NULL, NULL, NULL, NULL, 'unknown', true);

-- 195. B'nai Jeshurun. Also, B'nai Jeshurun of Mount Airy
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Jeshurun. Also, B''nai Jeshurun of Mount Airy', 1915, '[1915]', 1962, 'Sold 1962', 'closed', true);

-- 196. B'nai Joseph
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Joseph', 1892, '1892', NULL, NULL, 'unknown', true);

-- 197. B'nai Joshua
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Joshua', NULL, NULL, 1974, '1974', 'closed', true);

-- 198. B'nai Menasha
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Menasha', 1920, '[1928]', 1949, '1949', 'closed', true);

-- 199. B'nai Menasha [Congregation] See, Aitz Chaim VeZichron Jacob
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Menasha [Congregation] See, Aitz Chaim VeZichron Jacob', NULL, NULL, NULL, NULL, 'unknown', true);

-- 200. B'nai Menasha. Also, The White Shul
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Menasha. Also, The White Shul', 1920, '1920''s [1925]', 1957, '1957', 'closed', true);

-- 201. B'nai Moishe
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Moishe', 1938, '1938', 1940, 'Late 1940''s', 'closed', true);

-- 202. B'nai Moishe Anshe Sefard. Also, B'nai Moshe - Poale Zedek
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Moishe Anshe Sefard. Also, B''nai Moshe - Poale Zedek', 1903, '[1904]', 1982, '1982', 'closed', true);

-- 203. B'nai Moses Montefiore Anshe Polin
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Moses Montefiore Anshe Polin', 1887, '[1887]', 1940, 'Early 1940''s', 'closed', true);

-- 204. B'nai Moshe - Poale Zedek.                                              Also, B'nai Moshe - Poale Zedek
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Moshe - Poale Zedek.                                              Also, B''nai Moshe - Poale Zedek', NULL, NULL, NULL, NULL, 'unknown', true);

-- 205. B'nai Moshe Gomel Chesed Shel Emes
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Moshe Gomel Chesed Shel Emes', 1895, '[1895]]', NULL, NULL, 'unknown', true);

-- 206. B'nai Nachman. See, B'nai Nahum
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Nachman. See, B''nai Nahum', NULL, NULL, NULL, NULL, 'unknown', true);

-- 207. B'nai Nahum. Also, B'nai Nachman
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Nahum. Also, B''nai Nachman', 1921, '1921    [1926]', NULL, NULL, 'unknown', true);

-- 208. B'nai Reuben Anshe Sephard [Chevra]
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Reuben Anshe Sephard [Chevra]', 1883, '1883     [1888]', 1950, 'Mid 1950''s', 'closed', true);

-- 209. B'nai Sholom
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Sholom', 1924, '1924', NULL, NULL, 'unknown', true);

-- 210. B'nai Shram
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Shram', NULL, NULL, NULL, NULL, 'unknown', true);

-- 211. B'nai Torah
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Torah', 1961, '1961', 1976, '1976', 'closed', true);

-- 212. B'nai Yehoshua
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Yehoshua', NULL, NULL, NULL, NULL, 'unknown', true);

-- 213. B'nai Yitzchok
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Yitzchok', 1924, '1924', 1980, 'Sold early 1980''s', 'closed', true);

-- 214. B'nai Zion
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Zion', 1901, '1901', NULL, NULL, 'unknown', true);

-- 215. B'nai Zwi
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('B''nai Zwi', 1938, '1938', 1950, 'Late 1950''s', 'closed', true);

-- 216. Boulevard Park. Also see, Ner Zedek - Ezrath Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Boulevard Park. Also see, Ner Zedek - Ezrath Israel', NULL, NULL, NULL, NULL, 'unknown', true);

-- 217. Boulevard Temple. Also Temple Beth Torah
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Boulevard Temple. Also Temple Beth Torah', 1949, '1949', NULL, NULL, 'unknown', true);

-- 218. Bristol Jewish Center
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Bristol Jewish Center', 1904, '1904', NULL, 'Active', 'active', true);

-- 219. Brith Achim
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Brith Achim', 1971, '1971', NULL, 'Active', 'active', true);

-- 220. Brith Israel Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Brith Israel Congregation', 1921, '[1922]', 1990, '1990', 'closed', true);

-- 221. Brith Sholem Synagogue of Paschall Ave. Also see, Brith Sholom Community Center
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Brith Sholem Synagogue of Paschall Ave. Also see, Brith Sholom Community Center', 1916, '[1919]', NULL, NULL, 'unknown', true);

-- 222. Brith Sholom
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Brith Sholom', 1891, '[1898]', 1970, 'Sold by early 1970''s', 'closed', true);

-- 223. Brith Sholom Chevra Kedusha.
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Brith Sholom Chevra Kedusha.', 1890, '1890', NULL, NULL, 'unknown', true);

-- 224. Brith Sholom Community Center. Also see, Brith Sholem Synagogue of Paschall Ave.
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Brith Sholom Community Center. Also see, Brith Sholem Synagogue of Paschall Ave.', 1940, '1940', 1960, 'Late 1960''s', 'closed', true);

-- 225. Brith Sholom. See, Brith Sholom (@ N.5th)
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Brith Sholom. See, Brith Sholom (@ N.5th)', 1897, '1897', NULL, NULL, 'unknown', true);

-- 226. Brotherhood Temple Achim
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Brotherhood Temple Achim', NULL, NULL, NULL, NULL, 'unknown', true);

-- 227. Brothers of Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Brothers of Israel', 1883, '1883', NULL, 'Active', 'active', true);

-- 228. Bukier Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Bukier Congregation', 1919, '1919', 1933, '1933', 'closed', true);

-- 229. Bustleton-Somerton Synagogue
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Bustleton-Somerton Synagogue', 1972, '1972', 1990, '1990''s', 'closed', true);

-- 230. Carpenters' Shul. [The] See, Adath Jeshurun Talmud Torah Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Carpenters'' Shul. [The] See, Adath Jeshurun Talmud Torah Congregation', NULL, NULL, NULL, NULL, 'unknown', true);

-- 231. Catherine St. Shul. See, Zeiras Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Catherine St. Shul. See, Zeiras Israel', NULL, NULL, NULL, NULL, 'unknown', true);

-- 232. Center City Orthodox Synagogue
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Center City Orthodox Synagogue', NULL, NULL, NULL, NULL, 'unknown', true);

-- 233. Center City Reconstructionist Synagogue
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Center City Reconstructionist Synagogue', NULL, NULL, NULL, NULL, 'unknown', true);

-- 234. Central Talmud Torah
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Central Talmud Torah', NULL, NULL, NULL, NULL, 'unknown', true);

-- 235. Chabad Lubavitch of Bucks County
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Chabad Lubavitch of Bucks County', NULL, NULL, NULL, 'Active', 'active', true);

-- 236. Chevra Ahavas Chesed
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Chevra Ahavas Chesed', 1888, '[1888]', NULL, NULL, 'unknown', true);

-- 237. Chevra Heisner. See, Anshe Hisan
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Chevra Heisner. See, Anshe Hisan', NULL, NULL, NULL, NULL, 'unknown', true);

-- 238. Chevra Kuvier
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Chevra Kuvier', 1919, '1919', NULL, NULL, 'unknown', true);

-- 239. Chevra Mishnais
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Chevra Mishnais', 1920, '1920', NULL, NULL, 'unknown', true);

-- 240. Chevra Mishnayos Kehilas Kodesh Anshe Sodo Lovon. Also, Anshe Sodo Lovon; Anshe Sude Luvin Biela Ziercow
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Chevra Mishnayos Kehilas Kodesh Anshe Sodo Lovon. Also, Anshe Sodo Lovon; Anshe Sude Luvin Biela Ziercow', 1913, '1913       [1913]', 1983, 'Disbanded 1983', 'closed', true);

-- 241. Chevra Northern Hungarian
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Chevra Northern Hungarian', 1896, '1896', NULL, NULL, 'unknown', true);

-- 242. Chevra Ohev Sholom
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Chevra Ohev Sholom', NULL, NULL, NULL, NULL, 'unknown', true);

-- 243. Chevra Schlansky
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Chevra Schlansky', 1929, '1929', NULL, NULL, 'unknown', true);

-- 244. Chevra Shas
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Chevra Shas', NULL, NULL, NULL, NULL, 'unknown', true);

-- 245. Chevra Tahzuka Mishnoyis. Also, HaRav Ravi Moshe-Kelle Shlita Synagogue
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Chevra Tahzuka Mishnoyis. Also, HaRav Ravi Moshe-Kelle Shlita Synagogue', NULL, NULL, NULL, NULL, 'unknown', true);

-- 246. Chevra Tehilim
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Chevra Tehilim', 1887, '1887', NULL, NULL, 'unknown', true);

-- 247. Chevra Tehilim Mishnayos
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Chevra Tehilim Mishnayos', 1880, '1880', NULL, NULL, 'unknown', true);

-- 248. Chevra Tehilim Zikhron Yaakov. Also, Zikhron Yaakov
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Chevra Tehilim Zikhron Yaakov. Also, Zikhron Yaakov', 1919, '[1919]', 1950, 'Late 1950''s', 'closed', true);

-- 249. Chevra Tehilim. See, Beth HaKeneseth Reb Eichler
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Chevra Tehilim. See, Beth HaKeneseth Reb Eichler', 1925, '[1925]', NULL, NULL, 'unknown', true);

-- 250. Chevra Tehillim [Congregation] See, Aitz Chaim VeZichron Jacob
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Chevra Tehillim [Congregation] See, Aitz Chaim VeZichron Jacob', NULL, NULL, NULL, NULL, 'unknown', true);

-- 251. Chevra Vohliner Anshe Kuppel. See, Anshe Kuppel Vohliner
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Chevra Vohliner Anshe Kuppel. See, Anshe Kuppel Vohliner', 1924, '1924            [1927]', 1960, 'Sold early 1960''s', 'closed', true);

-- 252. Colored Hebrew Community [The] See, Adat Beyt Mosheh
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Colored Hebrew Community [The] See, Adat Beyt Mosheh', NULL, NULL, NULL, NULL, 'unknown', true);

-- 253. Community Torah of Bucks County.
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Community Torah of Bucks County.', 2002, '2002', NULL, 'Active', 'active', true);

-- 254. Daily Minyan and Torah Study
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Daily Minyan and Torah Study', NULL, NULL, NULL, NULL, 'unknown', true);

-- 255. Di Rusishe Shul. See, B'nai Abraham- Anshe Russ
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Di Rusishe Shul. See, B''nai Abraham- Anshe Russ', NULL, NULL, NULL, NULL, 'unknown', true);

-- 256. Dirshu Tov. See B'nai Jacob-Dishu Tov
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Dirshu Tov. See B''nai Jacob-Dishu Tov', 1891, '1891', 1960, 'Early 1960''s', 'closed', true);

-- 257. Dorshe Sholom Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Dorshe Sholom Congregation', NULL, NULL, NULL, NULL, 'unknown', true);

-- 258. Dorshei Derekh Minyon
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Dorshei Derekh Minyon', NULL, NULL, NULL, NULL, 'unknown', true);

-- 259. Dorshey Sholem Nusach HaAri
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Dorshey Sholem Nusach HaAri', 1923, '[1924]', NULL, NULL, 'unknown', true);

-- 260. East Lane Temple
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('East Lane Temple', NULL, NULL, NULL, NULL, 'unknown', true);

-- 261. East Oak Lane Temple
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('East Oak Lane Temple', 1940, '1940', NULL, NULL, 'unknown', true);

-- 262. Eastern Women's Talmud Torah. Also, Old Lady Sack's Shul; Vine Street Synagogue
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Eastern Women''s Talmud Torah. Also, Old Lady Sack''s Shul; Vine Street Synagogue', 1910, '1910', 1932, '1932', 'closed', true);

-- 263. Emanu-el Congregation See B'nai Israel-Emanu- el
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Emanu-el Congregation See B''nai Israel-Emanu- el', 1925, '[1925]', 1985, '1985', 'closed', true);

-- 264. Emunas Israel See, Ahavas Achim
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Emunas Israel See, Ahavas Achim', 1910, '1910', NULL, 'After WWII', 'closed', true);

-- 265. Talmud Torah Congregation.
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Talmud Torah Congregation.', NULL, NULL, NULL, NULL, 'unknown', true);

-- 266. Emunas Israel Ohev Sholom. See, [The] Hungarian Synagogue; Ohev Sholom
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Emunas Israel Ohev Sholom. See, [The] Hungarian Synagogue; Ohev Sholom', 1881, '1881', 1967, '1960''s.', 'closed', true);

-- 267. Emunath Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Emunath Israel', 1880, '1880', NULL, NULL, 'unknown', true);

-- 268. Emunath Israel of 5th St.
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Emunath Israel of 5th St.', 1880, '1880', NULL, NULL, 'unknown', true);

-- 269. Ezras Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ezras Israel', NULL, NULL, NULL, NULL, 'unknown', true);

-- 270. Ezras Israel. See, Adath Jeshurun Talmud Torah Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ezras Israel. See, Adath Jeshurun Talmud Torah Congregation', NULL, NULL, NULL, NULL, 'unknown', true);

-- 271. Ezrath Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ezrath Israel', 1938, '1938      [1939]', 1970, '1970', 'closed', true);

-- 272. Fairmount Jewish Community Center. See, Old Man Miller's Shul
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Fairmount Jewish Community Center. See, Old Man Miller''s Shul', 1939, '1939', NULL, NULL, 'unknown', true);

-- 273. Far Northeast Orthodox Synagogue
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Far Northeast Orthodox Synagogue', 1974, '1974', NULL, NULL, 'unknown', true);

-- 274. Fastover Independent Congregation. See also, Kehilos Kodes Anshe Sodo Lovon; Magidei Tehilim; Shivtei Yeshurun
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Fastover Independent Congregation. See also, Kehilos Kodes Anshe Sodo Lovon; Magidei Tehilim; Shivtei Yeshurun', 1907, '1907       [1917]', 1970, '1970''s', 'closed', true);

-- 275. First Postiver Relief Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('First Postiver Relief Congregation', 1901, '1901', NULL, NULL, 'unknown', true);

-- 276. First Romanian Poras Joseph. See, Agudas Achim Rumanian Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('First Romanian Poras Joseph. See, Agudas Achim Rumanian Congregation', 1905, '[1905 (Book #31, p.463)]', NULL, 'By World War II', 'closed', true);

-- 277. Fitzgerald Street Congregation (DATE ISSUE FIXED: closed before founded)
-- Original: founded=1942, closed=1940
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Fitzgerald Street Congregation', 1942, '1942', NULL, 'Mid 1940''s', 'closed', true);

-- 278. Fleischer's Shul [Rev.] See, [The] Manayunk Hebrew Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Fleischer''s Shul [Rev.] See, [The] Manayunk Hebrew Congregation', NULL, NULL, NULL, NULL, 'unknown', true);

-- 279. Fox Chase Jewish Community Center
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Fox Chase Jewish Community Center', 1957, '1957', 1980, '1980''s', 'closed', true);

-- 280. Frankford Hebrew Congregation.
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Frankford Hebrew Congregation.', 1906, '1906       [1909]', NULL, NULL, 'unknown', true);

-- 281. Galicianer Shul [The] See, Ohr Achaim Anshe Golitzer
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Galicianer Shul [The] See, Ohr Achaim Anshe Golitzer', NULL, NULL, NULL, NULL, 'unknown', true);

-- 282. Gemilas Chesed [Chevra]
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Gemilas Chesed [Chevra]', 1912, '[1912]', 1960, 'By 1960', 'closed', true);

-- 283. Gemilath Chesed
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Gemilath Chesed', 1913, '1913', NULL, 'By World War II', 'closed', true);

-- 284. Germantown Jewish Center
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Germantown Jewish Center', 1934, '1934', NULL, 'Active', 'active', true);

-- 285. Germantown Minyon
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Germantown Minyon', NULL, NULL, NULL, NULL, 'unknown', true);

-- 286. Gershman YM & YWHA (Congregation)
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Gershman YM & YWHA (Congregation)', NULL, NULL, NULL, 'Active', 'active', true);

-- 287. Geulas Israel Anshe Sefard
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Geulas Israel Anshe Sefard', 1915, '1915       [1915]', 1953, '1953', 'closed', true);

-- 288. Gomel Chesed Shel Emes
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Gomel Chesed Shel Emes', 1895, '1895', NULL, NULL, 'unknown', true);

-- 289. Greater Northeast Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Greater Northeast Congregation', 1962, '1962', NULL, NULL, 'unknown', true);

-- 290. Greater Romanian Synagogue
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Greater Romanian Synagogue', NULL, NULL, NULL, NULL, 'unknown', true);

-- 291. Har Zion Temple
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Har Zion Temple', 1922, '[1923]', NULL, 'Active', 'active', true);

-- 292. HaRav Ravi Moshe- Kelle Shlita Synagogue. See Chevra Tahzuka Mishnoyis
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('HaRav Ravi Moshe- Kelle Shlita Synagogue. See Chevra Tahzuka Mishnoyis', NULL, NULL, NULL, NULL, 'unknown', true);

-- 293. Hebrew Congregation of West Philadelphia             See, Beth Judah (Sansom St.)
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Hebrew Congregation of West Philadelphia             See, Beth Judah (Sansom St.)', NULL, NULL, NULL, NULL, 'unknown', true);

-- 294. Hebrew West End Jewish Community Center
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Hebrew West End Jewish Community Center', 1928, '1928           [late 20''s]', NULL, NULL, 'unknown', true);

-- 295. Heiner Fiscal "chicken foot" Shul. See, Aitz Chaim.
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Heiner Fiscal "chicken foot" Shul. See, Aitz Chaim.', NULL, NULL, NULL, NULL, 'unknown', true);

-- 296. Heisiner -Ezras Israel. See, Anshe Hisan; Ezras Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Heisiner -Ezras Israel. See, Anshe Hisan; Ezras Israel', 1876, '1876          [1895]', 1890, 'Became Anshe Zvavz early 1890''s', 'closed', true);

-- 297. Heisinger Congregation. See, Anshe Hisan
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Heisinger Congregation. See, Anshe Hisan', NULL, NULL, NULL, NULL, 'unknown', true);

-- 298. Henry S. Memorial Frank Synagogue
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Henry S. Memorial Frank Synagogue', 1905, '1905', NULL, NULL, 'unknown', true);

-- 299. Hesed Shel Emet; Also Haded Shel Emet
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Hesed Shel Emet; Also Haded Shel Emet', NULL, NULL, NULL, 'Active', 'active', true);

-- 300. Hesiner Independent. Young Men's Society.               See, Anshe Hisan
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Hesiner Independent. Young Men''s Society.               See, Anshe Hisan', NULL, NULL, NULL, NULL, 'unknown', true);

-- 301. Hillel, University of Pennsylvania
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Hillel, University of Pennsylvania', 1925, '1925', NULL, NULL, 'unknown', true);

-- 302. Hollander Shul [The] See, Beth Elohim (at S.5th)
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Hollander Shul [The] See, Beth Elohim (at S.5th)', NULL, NULL, NULL, NULL, 'unknown', true);

-- 303. Hollander Synagogue
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Hollander Synagogue', 1870, '1870''s', NULL, NULL, 'unknown', true);

-- 304. Hungarian Synagogue [The]. See, Emunas Israel Ohev Sholom
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Hungarian Synagogue [The]. See, Emunas Israel Ohev Sholom', NULL, NULL, NULL, NULL, 'unknown', true);

-- 305. Independent Congregation [Chevra Kadisha]
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Independent Congregation [Chevra Kadisha]', 1894, '[1894]', NULL, NULL, 'unknown', true);

-- 306. Independent Southern Congregation.                         See, Talmud Torah
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Independent Southern Congregation.                         See, Talmud Torah', 1903, '1903            [1904]', 1930, 'Until 1930''s', 'closed', true);

-- 307. Island Road Synagogue. See, Ahavas Achim Talmud Torah Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Island Road Synagogue. See, Ahavas Achim Talmud Torah Congregation', NULL, NULL, NULL, NULL, 'unknown', true);

-- 308. Israel Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Israel Congregation', 1904, '1904', NULL, NULL, 'unknown', true);

-- 309. Ivy Ridge Jewish Community Center. See also, Or Ami
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ivy Ridge Jewish Community Center. See also, Or Ami', NULL, NULL, NULL, NULL, 'unknown', true);

-- 310. Jewish Congregation of
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Jewish Congregation of', NULL, NULL, NULL, NULL, 'unknown', true);

-- 311. Graterford Prison
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Graterford Prison', NULL, NULL, NULL, NULL, 'unknown', true);

-- 312. Jewish Farmers' Shul. See, Atereth Israel (at 84th & Harley)
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Jewish Farmers'' Shul. See, Atereth Israel (at 84th & Harley)', NULL, NULL, NULL, NULL, 'unknown', true);

-- 313. Jewish Hospital Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Jewish Hospital Congregation', 1936, '1936', NULL, NULL, 'unknown', true);

-- 314. Jewish Mute Society Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Jewish Mute Society Congregation', 1907, '1907', 1960, '1960''s.', 'closed', true);

-- 315. Jewish Rumanian Congregation - Agudas Achim. See, Beth HaMedrash HaGodol Anshe Ashkenaz
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Jewish Rumanian Congregation - Agudas Achim. See, Beth HaMedrash HaGodol Anshe Ashkenaz', 1905, '1905', 1911, 'Disbanded 1911', 'closed', true);

-- 316. Jewish War Veterans
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Jewish War Veterans', 1955, '1955', NULL, NULL, 'unknown', true);

-- 317. Joseph Asbell Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Joseph Asbell Congregation', 1926, '344)]', NULL, 'Disbanded by World War II', 'closed', true);

-- 318. Kahal Kodesh Israel [Chevra]
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Kahal Kodesh Israel [Chevra]', 1894, '1894', NULL, NULL, 'unknown', true);

-- 319. Kaiserman Shul. See, Aitz Chaim (Viola St.)
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Kaiserman Shul. See, Aitz Chaim (Viola St.)', NULL, NULL, NULL, NULL, 'unknown', true);

-- 320. Kehilas Adas Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Kehilas Adas Israel', 1905, '1905', NULL, NULL, 'unknown', true);

-- 321. Kehilas B'nai Shalom
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Kehilas B''nai Shalom', NULL, NULL, NULL, 'Active', 'active', true);

-- 322. Kehilat Chaverim
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Kehilat Chaverim', NULL, NULL, NULL, 'Active', 'active', true);

-- 323. Kehilat HaNahar Also, [The] Little Shul by the River
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Kehilat HaNahar Also, [The] Little Shul by the River', NULL, NULL, NULL, 'Active', 'active', true);

-- 324. Kehilath Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Kehilath Israel', 1910, '1910            [1912]', NULL, 'Building demolished', 'closed', true);

-- 325. Kehiloth Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Kehiloth Israel', 1912, '[1912]', 1930, 'Disbanded early 1930''s', 'closed', true);

-- 326. Keneseth Beth Zion
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Keneseth Beth Zion', 1918, '1918', NULL, 'Disbanded by World War II', 'closed', true);

-- 327. Keneseth Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Keneseth Israel', 1847, '1847', NULL, 'Active', 'active', true);

-- 328. Kensington Synagogue & Community Center. Also, Shaare Yishkan
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Kensington Synagogue & Community Center. Also, Shaare Yishkan', 1920, '1920', NULL, NULL, 'unknown', true);

-- 329. Kerem Israel Anshe Sefard
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Kerem Israel Anshe Sefard', 1909, '1909         [1912  (Book #58, p. 13)]', 1971, '1971', 'closed', true);

-- 330. Kesher Israel Also, Rodeph Zedek
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Kesher Israel Also, Rodeph Zedek', 1893, '1893           [1893]', NULL, 'Active', 'active', true);

-- 331. Anshe Szager ; See B'nai Jacob @ Lombard
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Anshe Szager ; See B''nai Jacob @ Lombard', NULL, NULL, NULL, NULL, 'unknown', true);

-- 332. Kesher Israel Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Kesher Israel Congregation', 1914, '1914', NULL, 'Active', 'active', true);

-- 333. Kesher Torah
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Kesher Torah', 1894, '1894', 1920, '1920''s', 'closed', true);

-- 334. Kesher Torah Anshe Lubliner
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Kesher Torah Anshe Lubliner', 1923, '1923', NULL, NULL, 'unknown', true);

-- 335. Kesher Torah Anshe Vohliner
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Kesher Torah Anshe Vohliner', 1894, '1894', NULL, NULL, 'unknown', true);

-- 336. Kesher Torah Synagogue
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Kesher Torah Synagogue', 1925, '1925          [1925]', NULL, 'Closed after World War II.', 'closed', true);

-- 337. Khelmer Shul. See, Shomre Emuno Anshe Kelem
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Khelmer Shul. See, Shomre Emuno Anshe Kelem', NULL, NULL, NULL, NULL, 'unknown', true);

-- 338. Kieve Tserkasser Bulgarian Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Kieve Tserkasser Bulgarian Congregation', 1930, '1930', NULL, NULL, 'unknown', true);

-- 339. Kneses Adas Israel Congregation.                                   See, Knesses Israel Anshe Sefard
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Kneses Adas Israel Congregation.                                   See, Knesses Israel Anshe Sefard', NULL, NULL, NULL, NULL, 'unknown', true);

-- 340. Kneses HaSefer- Educational Synagogue of Yardley
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Kneses HaSefer- Educational Synagogue of Yardley', NULL, NULL, NULL, 'Active', 'active', true);

-- 341. Kneseth Chai
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Kneseth Chai', 1982, '1982', NULL, NULL, 'unknown', true);

-- 342. Knesses Israel Anshe Sefard.                                       Also, Kneses Adas Israel Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Knesses Israel Anshe Sefard.                                       Also, Kneses Adas Israel Congregation', 1908, '1908         [1912]', NULL, NULL, 'unknown', true);

-- 343. Kol Ami
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Kol Ami', 1994, '1994', NULL, 'Active', 'active', true);

-- 344. Kol Emet
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Kol Emet', 1984, '1984', NULL, 'Active', 'active', true);

-- 345. Kol Tzedek West Philadelphia Synagogue
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Kol Tzedek West Philadelphia Synagogue', 2005, '2005', NULL, 'Active', 'active', true);

-- 346. Kolker Synagogue. See, Raim Ahuvim Anshe Kolker
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Kolker Synagogue. See, Raim Ahuvim Anshe Kolker', NULL, NULL, NULL, NULL, 'unknown', true);

-- 347. Krakauer - Beth Elohim Beneficial Association
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Krakauer - Beth Elohim Beneficial Association', 1876, '1876             [1882]', 1947, '1947', 'closed', true);

-- 348. Kreminitzer Synagogue
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Kreminitzer Synagogue', 1919, '1919', 1930, '1930''s', 'closed', true);

-- 349. Leidy Ave Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Leidy Ave Congregation', 1929, '1929', NULL, NULL, 'unknown', true);

-- 350. Lenas HaZedek
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Lenas HaZedek', 1891, '1891        [1902]', NULL, NULL, 'unknown', true);

-- 351. Lenas HaZedek of West Philadelphia. See also, Beth HaMedrosh Hagodol- Beth Yaacov
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Lenas HaZedek of West Philadelphia. See also, Beth HaMedrosh Hagodol- Beth Yaacov', 1917, '1917          [1918]', 1970, 'Mid 1970''s', 'closed', true);

-- 352. See also, Beth HaMedrosh Hagodol- Beth Yaacov
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('See also, Beth HaMedrosh Hagodol- Beth Yaacov', NULL, NULL, NULL, NULL, 'unknown', true);

-- 353. Lenas Hazedek. See, Prushzveer Shershow Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Lenas Hazedek. See, Prushzveer Shershow Congregation', NULL, NULL, NULL, NULL, 'unknown', true);

-- 354. Leyv Ha-Ir Heart of the City; Center City Center City Reconstructionist Synagogue
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Leyv Ha-Ir Heart of the City; Center City Center City Reconstructionist Synagogue', 1990, '1990', NULL, 'Active', 'active', true);

-- 355. Linath HaZedek Anshe Fairmount
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Linath HaZedek Anshe Fairmount', 1909, '1909.      [1910]', NULL, 'After WWII', 'closed', true);

-- 356. Little Shul by the River. [The]:                                       See, Kehilas HaNahar
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Little Shul by the River. [The]:                                       See, Kehilas HaNahar', NULL, NULL, NULL, NULL, 'unknown', true);

-- 357. Logan Congregation Ahavas Israel.                             See, Beth Sholom
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Logan Congregation Ahavas Israel.                             See, Beth Sholom', NULL, NULL, NULL, NULL, 'unknown', true);

-- 358. Logan Jewish Community
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Logan Jewish Community', 1935, '1935', NULL, NULL, 'unknown', true);

-- 359. Lowenstein's Shul
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Lowenstein''s Shul', 1938, '1938', 1940, 'Late 1940''s', 'closed', true);

-- 360. Lower Merion Synagogue
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Lower Merion Synagogue', 1954, '1954', NULL, 'Active', 'active', true);

-- 361. Lubavitch House at the University of Pennsylvania
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Lubavitch House at the University of Pennsylvania', NULL, NULL, NULL, 'Active', 'active', true);

-- 362. Lubavitch Synagogue
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Lubavitch Synagogue', NULL, NULL, NULL, NULL, 'unknown', true);

-- 363. Machzike Adas - B'nai Moishe [Chevra]
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Machzike Adas - B''nai Moishe [Chevra]', 1918, '1918', 1950, '1950''s', 'closed', true);

-- 364. Machzike Torah [Chevra]
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Machzike Torah [Chevra]', NULL, NULL, NULL, NULL, 'unknown', true);

-- 365. Machziknei Har Rov. [Congregation]:                         Also, [Congregation] Agudath Achim Machzikei Har Rov
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Machziknei Har Rov. [Congregation]:                         Also, [Congregation] Agudath Achim Machzikei Har Rov', 1917, '1917          [1918]', 1950, 'Early 1950''s', 'closed', true);

-- 366. Magidei Tehilim [Chevra]: See, Fastover Independent; Shivtei Yeshurun
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Magidei Tehilim [Chevra]: See, Fastover Independent; Shivtei Yeshurun', 1913, '1913      [1913]', 1960, '1960''s', 'closed', true);

-- 367. Main Line Reform Temple
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Main Line Reform Temple', 1952, '1952', NULL, 'Active', 'active', true);

-- 368. Manayunk Hebrew Congregation [The] Also, [Rev.] Fleischer's Shul
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Manayunk Hebrew Congregation [The] Also, [Rev.] Fleischer''s Shul', 1908, '1908', NULL, 'Around WWII', 'closed', true);

-- 369. Mekor Baruch
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Mekor Baruch', NULL, NULL, NULL, NULL, 'unknown', true);

-- 370. Mekor Habracha; Center City Synagogue; Formerly Etz Chaim
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Mekor Habracha; Center City Synagogue; Formerly Etz Chaim', 1989, '1989', NULL, 'Active', 'active', true);

-- 371. Melrose B'nai Israel- Emanu-el
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Melrose B''nai Israel- Emanu-el', 1955, '1955', NULL, 'Active', 'active', true);

-- 372. Meysos Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Meysos Israel', NULL, NULL, NULL, NULL, 'unknown', true);

-- 373. Mikveh Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Mikveh Israel', 1745, '1745', NULL, 'Active', 'active', true);

-- 374. Minyan Masorati and Minyan Dorshei Derech
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Minyan Masorati and Minyan Dorshei Derech', NULL, NULL, NULL, NULL, 'unknown', true);

-- 375. Minyanim at Penn Hillel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Minyanim at Penn Hillel', NULL, NULL, NULL, NULL, 'unknown', true);

-- 376. Mishkan Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Mishkan Israel', 1930, '1930', 1940, 'Early 1940''s', 'closed', true);

-- 377. Mishkan Israel [Chevra] Also, Kolker Synagogue (Raim Ahuvim Anshe Kolker)
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Mishkan Israel [Chevra] Also, Kolker Synagogue (Raim Ahuvim Anshe Kolker)', 1904, '1904          [1904]', NULL, NULL, 'unknown', true);

-- 378. Mishkan Shalom
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Mishkan Shalom', NULL, NULL, NULL, 'Active', 'active', true);

-- 379. Mishnais Anshe Lubavitch [Chevra]: See, [Chevra] Anshe Lubavitch nusach Ari
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Mishnais Anshe Lubavitch [Chevra]: See, [Chevra] Anshe Lubavitch nusach Ari', NULL, NULL, NULL, NULL, 'unknown', true);

-- 380. Mishnayos Anshe Sefard [Chevra]
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Mishnayos Anshe Sefard [Chevra]', 1903, '1903            [1904]', 1940, 'Mid 1940''s', 'closed', true);

-- 381. Mishnayos Anshe Sefard [Chevra Tehilim]
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Mishnayos Anshe Sefard [Chevra Tehilim]', 1917, '1917          [1918]', 1950, '1950''s', 'closed', true);

-- 382. Mishnayos Chesed Ve'Emes [Chevra].
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Mishnayos Chesed Ve''Emes [Chevra].', 1893, '1893     [1893]', 1940, '1940''s', 'closed', true);

-- 383. Mishnayos Kehilas Kodesh Anshe Sode Loven [Chevra]: See, Kehilas Kodesh Anshe Sode Lovon
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Mishnayos Kehilas Kodesh Anshe Sode Loven [Chevra]: See, Kehilas Kodesh Anshe Sode Lovon', NULL, NULL, NULL, NULL, 'unknown', true);

-- 384. Mogen Abraham
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Mogen Abraham', 1913, '1913          [1917]', 1958, '1958', 'closed', true);

-- 385. Monastreichner Shul (aka Manestrishtze Shul)
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Monastreichner Shul (aka Manestrishtze Shul)', 1948, '1948', NULL, NULL, 'unknown', true);

-- 386. Moshav Zekenim. Also, Uptown Home for the Aged
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Moshav Zekenim. Also, Uptown Home for the Aged', 1912, '1912        [1912 (Book #49, p. 351)]', NULL, NULL, 'unknown', true);

-- 387. Mount Airy Jewish Community Center
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Mount Airy Jewish Community Center', 1951, '1951', 1982, '1982', 'closed', true);

-- 388. Mount Airy Orthodox Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Mount Airy Orthodox Congregation', 1958, '1958', NULL, NULL, 'unknown', true);

-- 389. Mount Sinai Hospital
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Mount Sinai Hospital', 1903, '1903', NULL, NULL, 'unknown', true);

-- 390. Ner Tamid of Delaware County
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ner Tamid of Delaware County', NULL, NULL, NULL, NULL, 'unknown', true);

-- 391. Ner Zedek - Ezrath Israel - Beth Uziel  Also see, Temple Brith Kodesh; Boulevard Park.
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ner Zedek - Ezrath Israel - Beth Uziel  Also see, Temple Brith Kodesh; Boulevard Park.', 1961, '1961', NULL, 'Active', 'active', true);

-- 392. Nes Ami
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Nes Ami', NULL, NULL, NULL, NULL, 'unknown', true);

-- 393. Neziner Congregation Also, Ahavas Achim Anshe Niezhin Nusach HaAri: See Beth Zion-Beth Israel.
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Neziner Congregation Also, Ahavas Achim Anshe Niezhin Nusach HaAri: See Beth Zion-Beth Israel.', 1887, '1887             [1889]', NULL, NULL, 'unknown', true);

-- 394. North West Religious Association
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('North West Religious Association', 1904, '1904            [1906]', NULL, NULL, 'unknown', true);

-- 395. Northeast Jewish Community Center. See, Temple Menorah
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Northeast Jewish Community Center. See, Temple Menorah', NULL, NULL, NULL, NULL, 'unknown', true);

-- 396. Northeast Orthodox Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Northeast Orthodox Congregation', 1958, '1958', NULL, NULL, 'unknown', true);

-- 397. Northern [ North Eastern?] Talmud Torah Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Northern [ North Eastern?] Talmud Torah Congregation', 1910, '1910/12', 1952, '1952', 'closed', true);

-- 398. Northern Chevra Kadisha
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Northern Chevra Kadisha', 1898, '1898               [1901]', 1937, '1937', 'closed', true);

-- 399. Northern Liberties Hospital Chapel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Northern Liberties Hospital Chapel', 1928, '1928', NULL, NULL, 'unknown', true);

-- 400. Ohel Jacob
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ohel Jacob', 1910, '1910             [1910]', 1960, 'Sold mid 1960''s', 'closed', true);

-- 401. Ohel Jacob of Bustleton
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ohel Jacob of Bustleton', 1967, '1967', NULL, NULL, 'unknown', true);

-- 402. Ohel Jacob of Oxford Circle
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ohel Jacob of Oxford Circle', NULL, NULL, NULL, NULL, 'unknown', true);

-- 403. Ohev Itzchok
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ohev Itzchok', 1913, '1913', 1959, '1959', 'closed', true);

-- 404. Ohev Shalom
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ohev Shalom', 1891, '1891', NULL, 'Active', 'active', true);

-- 405. Ohev Sholom
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ohev Sholom', 1927, '1927', 1950, 'Early 1950''s; (at Porter St) property sold 1955', 'closed', true);

-- 406. Ohev Sholom of Bucks County
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ohev Sholom of Bucks County', NULL, NULL, NULL, 'Active', 'active', true);

-- 407. Ohev Sholom: See, Emunas Israel Ohev Sholom:
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ohev Sholom: See, Emunas Israel Ohev Sholom:', NULL, NULL, NULL, NULL, 'unknown', true);

-- 408. Ohev Yitzchok. See, Ohev Itzchok
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ohev Yitzchok. See, Ohev Itzchok', NULL, NULL, NULL, NULL, 'unknown', true);

-- 409. Ohev Zedek
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ohev Zedek', 1903, '1903', NULL, NULL, 'unknown', true);

-- 410. Ohev Zedek Anshe Sefard [Chevra]
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ohev Zedek Anshe Sefard [Chevra]', 1892, '1892             [1893]', NULL, NULL, 'unknown', true);

-- 411. Ohev Zedek: Also, Samuel Rosa Nathan Ohev Zedek
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ohev Zedek: Also, Samuel Rosa Nathan Ohev Zedek', 1889, '1889           [1889]', NULL, NULL, 'unknown', true);

-- 412. Ohr Achaim Anshe Golitzer: Also see, [The] Galicianer Shul; Ohr Achaim
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ohr Achaim Anshe Golitzer: Also see, [The] Galicianer Shul; Ohr Achaim', 1907, '1907            [1908]', NULL, NULL, 'unknown', true);

-- 413. Ohr Achaim. [Congregation]
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ohr Achaim. [Congregation]', NULL, NULL, NULL, NULL, 'unknown', true);

-- 414. See, Ohr Achaim Anshe Golitzer
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('See, Ohr Achaim Anshe Golitzer', NULL, NULL, NULL, NULL, 'unknown', true);

-- 415. Oir Chodash Agudath Achim. See, Agudas Achim Rumanian Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Oir Chodash Agudath Achim. See, Agudas Achim Rumanian Congregation', NULL, NULL, NULL, NULL, 'unknown', true);

-- 416. Old Lady Sack's Shul. See Eastern Women's Talmud Torah
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Old Lady Sack''s Shul. See Eastern Women''s Talmud Torah', NULL, NULL, NULL, NULL, 'unknown', true);

-- 417. Old Man Miller's Shul. Also, B'nai Israel of Fairmount; Fairmount Jewish Community Center
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Old Man Miller''s Shul. Also, B''nai Israel of Fairmount; Fairmount Jewish Community Center', 1910, '1910', NULL, NULL, 'unknown', true);

-- 418. Old York Road Temple- Beth Am
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Old York Road Temple- Beth Am', NULL, NULL, NULL, 'Active', 'active', true);

-- 419. Or Ami. See also, Ivy Ridge Jewish Community Center
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Or Ami. See also, Ivy Ridge Jewish Community Center', 1948, '1948', NULL, 'Active', 'active', true);

-- 420. Or Chudosh.
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Or Chudosh.', 1892, 'Before 1892', NULL, NULL, 'unknown', true);

-- 421. See, Agudas Achim Rumanian Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('See, Agudas Achim Rumanian Congregation', NULL, NULL, NULL, NULL, 'unknown', true);

-- 422. Or Chudosh-Agudas Achim -- Rumanian American Congregation; See Agudas Achim Rumanian Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Or Chudosh-Agudas Achim -- Rumanian American Congregation; See Agudas Achim Rumanian Congregation', NULL, NULL, NULL, NULL, 'unknown', true);

-- 423. Or HaChayim Anshe Ostreich
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Or HaChayim Anshe Ostreich', 1890, '1890        [1894]', NULL, NULL, 'unknown', true);

-- 424. Or Hadash
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Or Hadash', NULL, NULL, NULL, 'Active', 'active', true);

-- 425. Or Shalom
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Or Shalom', 1974, '1974', NULL, 'Active', 'active', true);

-- 426. Otik Moliver
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Otik Moliver', 1899, '1899', NULL, NULL, 'unknown', true);

-- 427. Oxford Circle Jewish Community Center-                  Beth Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Oxford Circle Jewish Community Center-                  Beth Israel', 1948, '1948', NULL, NULL, 'unknown', true);

-- 428. Parker's Place: See, Temple Zion                                  [The Mcfadden Estate]
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Parker''s Place: See, Temple Zion                                  [The Mcfadden Estate]', NULL, NULL, NULL, NULL, 'unknown', true);

-- 429. Pennypack Jewish Community Center
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Pennypack Jewish Community Center', 1959, '1959', NULL, NULL, 'unknown', true);

-- 430. Perry's Shul
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Perry''s Shul', 1933, '1933', 1948, '1948', 'closed', true);

-- 431. Philadelphia General Hospital
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Philadelphia General Hospital', 1942, '1942', NULL, NULL, 'unknown', true);

-- 432. Philadelphia Tailor's Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Philadelphia Tailor''s Congregation', 1919, '1919', NULL, NULL, 'unknown', true);

-- 433. Pnai Or Religious Fellowship of Philadelphia-Jewish Renewal
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Pnai Or Religious Fellowship of Philadelphia-Jewish Renewal', NULL, NULL, NULL, 'Active', 'active', true);

-- 434. Poale Zedek Sharith Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Poale Zedek Sharith Israel', 1886, '1886 [1889/1890]', NULL, NULL, 'unknown', true);

-- 435. Poale Zedek: See [Chevra] Poale Zedek-Anshe Birz
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Poale Zedek: See [Chevra] Poale Zedek-Anshe Birz', 1886, '1886', NULL, NULL, 'unknown', true);

-- 436. Poale Zedek-Anshe Birz [Chevra]: See, Poale Zedek Sharith Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Poale Zedek-Anshe Birz [Chevra]: See, Poale Zedek Sharith Israel', 1890, '1890', NULL, NULL, 'unknown', true);

-- 437. Podolier Gubernia Lodge
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Podolier Gubernia Lodge', 1919, '1919', NULL, NULL, 'unknown', true);

-- 438. Po'el Zedek
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Po''el Zedek', 1889, '1889', NULL, NULL, 'unknown', true);

-- 439. Poneviezher Lodge Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Poneviezher Lodge Congregation', 1919, '1919', NULL, NULL, 'unknown', true);

-- 440. Progressive Geulas Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Progressive Geulas Israel', 1920, '1920', NULL, NULL, 'unknown', true);

-- 441. Prushzveer Shershow Congregation:                         Also, Lenas HaZedek
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Prushzveer Shershow Congregation:                         Also, Lenas HaZedek', 1895, '1895               [1892]', NULL, NULL, 'unknown', true);

-- 442. Raim Ahuvim
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Raim Ahuvim', 1892, '1892               [1892]', NULL, 'Active', 'active', true);

-- 443. Raim Ahuvim Anshe Kolker. [Chevra] See also, [Chevra] Mishkan Israel; Kolker Synagogue
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Raim Ahuvim Anshe Kolker. [Chevra] See also, [Chevra] Mishkan Israel; Kolker Synagogue', 1914, '1914             [1920]0.', 1971, 'Disbanded in 1971', 'closed', true);

-- 444. Ramat El
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ramat El', NULL, NULL, NULL, NULL, 'unknown', true);

-- 445. Reb Heschel Shul
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Reb Heschel Shul', 1924, '1924', NULL, NULL, 'unknown', true);

-- 446. Rhawnhurst Jewish Center
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Rhawnhurst Jewish Center', 1956, '1956', NULL, NULL, 'unknown', true);

-- 447. Rodeph Shalom
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Rodeph Shalom', 1802, '1802', NULL, 'Active', 'active', true);

-- 448. Rodeph Shalom Suburban
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Rodeph Shalom Suburban', NULL, NULL, NULL, NULL, 'unknown', true);

-- 449. Rodeph Zedek Anshe Szager: See, Kesher Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Rodeph Zedek Anshe Szager: See, Kesher Israel', 1887, '1887             [1889]', NULL, NULL, 'unknown', true);

-- 450. Rodeph Zedek [Temple]
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Rodeph Zedek [Temple]', 1953, '[1955]', 1982, '1982', 'closed', true);

-- 451. Rodeph Zedek Anshe Szager:                                        See, Kesher Israel (Lombard St)
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Rodeph Zedek Anshe Szager:                                        See, Kesher Israel (Lombard St)', NULL, NULL, NULL, NULL, 'unknown', true);

-- 452. Rothschild Memorial Synagogue: See, Beth-El
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Rothschild Memorial Synagogue: See, Beth-El', NULL, NULL, NULL, NULL, 'unknown', true);

-- 453. Rumanian American Congregation:                             See, Agudas Achim Rumanian Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Rumanian American Congregation:                             See, Agudas Achim Rumanian Congregation', NULL, NULL, NULL, NULL, 'unknown', true);

-- 454. Rudiviler Lubliner Lodge Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Rudiviler Lubliner Lodge Congregation', 1919, '1919', NULL, NULL, 'unknown', true);

-- 455. Russian Synagogue
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Russian Synagogue', 1995, '[1995]', NULL, NULL, 'unknown', true);

-- 456. Sabato Morais Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Sabato Morais Congregation', 1894, '1894', NULL, NULL, 'unknown', true);

-- 457. Samuel Rosa Nathan Ohev Zedek:                              See, Ohev Zedek
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Samuel Rosa Nathan Ohev Zedek:                              See, Ohev Zedek', NULL, NULL, NULL, NULL, 'unknown', true);

-- 458. Samuel Rosenwald Lodge Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Samuel Rosenwald Lodge Congregation', 1919, '1919', NULL, NULL, 'unknown', true);

-- 459. Shaare Eliyhu
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Shaare Eliyhu', 1919, '1919', 1940, '1940''s', 'closed', true);

-- 460. Shaare Hatzedek Congregation of Rezistchev:                See Shari Zedek Anshe Reisicher
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Shaare Hatzedek Congregation of Rezistchev:                See Shari Zedek Anshe Reisicher', NULL, NULL, NULL, NULL, 'unknown', true);

-- 461. Shaare Shamayim See Beth Judah, Rodeph Zedek, and Beth Chaim
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Shaare Shamayim See Beth Judah, Rodeph Zedek, and Beth Chaim', 1907, '1907           [1909]            1961', NULL, 'Active', 'active', true);

-- 462. Shaare Torah
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Shaare Torah', 1911, '1911          [1911]', 1952, '1952', 'closed', true);

-- 463. Shaare Tzedek of Philadelphia Geriatric Center
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Shaare Tzedek of Philadelphia Geriatric Center', NULL, NULL, NULL, NULL, 'unknown', true);

-- 464. Shaare Yishkan: See, Kensington Synagogue & Community Center
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Shaare Yishkan: See, Kensington Synagogue & Community Center', NULL, NULL, NULL, NULL, 'unknown', true);

-- 465. Shaare Yitzchok Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Shaare Yitzchok Congregation', 1920, '1920          [1921]', 1990, '1990', 'closed', true);

-- 466. Shaare Zedek.
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Shaare Zedek.', 1914, '1914              [1917]', 1970, 'Late 1970''s', 'closed', true);

-- 467. Shaarei Eli
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Shaarei Eli', 1917, '1917          [1918]', 1981, '1981', 'closed', true);

-- 468. Shaari Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Shaari Israel', 1916, '1916             [1917]', 1970, '1970''s', 'closed', true);

-- 469. Shari Zedek Anshe Reisicher: Also, Shaare Hatzedek Cong. Of Rezistchev
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Shari Zedek Anshe Reisicher: Also, Shaare Hatzedek Cong. Of Rezistchev', 1902, '1902             [1902]', NULL, NULL, 'unknown', true);

-- 470. Sharith Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Sharith Israel', 1894, '1894               [1894]', NULL, NULL, 'unknown', true);

-- 471. Shearith Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Shearith Israel', 1909, '1909', 1950, '1950''s /           1960''s', 'closed', true);

-- 472. Shearith Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Shearith Israel', 1979, '1979', NULL, NULL, 'unknown', true);

-- 473. Shearith Israel Talmud Torah
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Shearith Israel Talmud Torah', 1911, '1911            [1911]', NULL, NULL, 'unknown', true);

-- 474. Sheinfeld's Shul
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Sheinfeld''s Shul', 1930, '1930', NULL, NULL, 'unknown', true);

-- 475. Shel Emeth [Chevra Chesed]
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Shel Emeth [Chevra Chesed]', 1894, '1894               [1894]', 1910, 'Disbanded by 1910', 'closed', true);

-- 476. Shir Ami-Bucks County Jewish Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Shir Ami-Bucks County Jewish Congregation', 1976, '1976', NULL, 'Active', 'active', true);

-- 477. Shir Shalom (Society for Humanistic
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Shir Shalom (Society for Humanistic', NULL, NULL, NULL, 'Active', 'active', true);

-- 478. Judaism)
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Judaism)', NULL, NULL, NULL, NULL, 'unknown', true);

-- 479. Shivtei Yeshurun Anshe Philadelphia:                       See, Shivtei Yeshurun
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Shivtei Yeshurun Anshe Philadelphia:                       See, Shivtei Yeshurun', NULL, NULL, NULL, NULL, 'unknown', true);

-- 480. Shivtei Yeshurun: Also, Shivtei Yeshurun Anshe Philadelphia; Adath Jeshurun Talmud Torah
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Shivtei Yeshurun: Also, Shivtei Yeshurun Anshe Philadelphia; Adath Jeshurun Talmud Torah', 1876, '1876             [1892]', NULL, NULL, 'unknown', true);

-- 481. Sholom Eswill [Chevra]
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Sholom Eswill [Chevra]', 1930, '1930', NULL, NULL, 'unknown', true);

-- 482. Shomre Emuno Anshe Kelem: Also, Khelmer Shul; Beth HaMedrash Hagodol
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Shomre Emuno Anshe Kelem: Also, Khelmer Shul; Beth HaMedrash Hagodol', 1890, '1890              [1893]', NULL, NULL, 'unknown', true);

-- 483. Shomre Shabbas
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Shomre Shabbas', 1907, '1907', NULL, NULL, 'unknown', true);

-- 484. Shomre Shabbas
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Shomre Shabbas', 1894, '1894', NULL, NULL, 'unknown', true);

-- 485. Shomre Shabbas
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Shomre Shabbas', 1929, '1929', NULL, NULL, 'unknown', true);

-- 486. Shomre Shabbas
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Shomre Shabbas', 1894, '[1894]', NULL, NULL, 'unknown', true);

-- 487. Shomre Shabbas [Chevra]
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Shomre Shabbas [Chevra]', 1935, '1935', 1960, '1960', 'closed', true);

-- 488. Shomre Shabbas Congregation Umesilas Yesharim;
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Shomre Shabbas Congregation Umesilas Yesharim;', 1893, '[1894]', 1930, 'Late 1930''s', 'closed', true);

-- 489. Shomre Shabbas: See also, Emunas Israel Ohev Sholom
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Shomre Shabbas: See also, Emunas Israel Ohev Sholom', 1892, '1892            [1894]', NULL, NULL, 'unknown', true);

-- 490. Shomre Shabes UMachzikei HaDath: Also, Beth HaKeneseth Kaiserman
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Shomre Shabes UMachzikei HaDath: Also, Beth HaKeneseth Kaiserman', 1892, '1892', NULL, NULL, 'unknown', true);

-- 491. Sinai Temple (Aka Temple Sinai)
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Sinai Temple (Aka Temple Sinai)', 1929, '1929', NULL, NULL, 'unknown', true);

-- 492. Soble Family Congregation [The]
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Soble Family Congregation [The]', 1903, '1903', NULL, NULL, 'unknown', true);

-- 493. Society Hill Synagogue
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Society Hill Synagogue', 1916, '1916', NULL, 'Active', 'active', true);

-- 494. Suburban Jewish Community Center-B'nai Aaron
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Suburban Jewish Community Center-B''nai Aaron', 1926, '1926', NULL, 'Active', 'active', true);

-- 495. Tacony Hebrew Congregation. Also see, Temple Menorah
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Tacony Hebrew Congregation. Also see, Temple Menorah', 1924, '1924', NULL, NULL, 'unknown', true);

-- 496. Talmud Torah. See, Independent Southern Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Talmud Torah. See, Independent Southern Congregation', NULL, NULL, NULL, NULL, 'unknown', true);

-- 497. Talmudical Yeshiva of Philadelphia
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Talmudical Yeshiva of Philadelphia', 1956, '1956', NULL, NULL, 'unknown', true);

-- 498. Tel Or
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Tel Or', NULL, NULL, NULL, NULL, 'unknown', true);

-- 499. Temple Beth Ami
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Temple Beth Ami', 1963, '1963', NULL, NULL, 'unknown', true);

-- 500. Temple Brith Kodesh. Also see, Ner Zedek - Ezrath Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Temple Brith Kodesh. Also see, Ner Zedek - Ezrath Israel', 1952, '1952', NULL, NULL, 'unknown', true);

-- 501. Temple Isaiah
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Temple Isaiah', NULL, NULL, NULL, NULL, 'unknown', true);

-- 502. Temple Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Temple Israel', 1943, '1943', NULL, NULL, 'unknown', true);

-- 503. Temple Israel of Upper Darby
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Temple Israel of Upper Darby', 1945, '1945', NULL, NULL, 'unknown', true);

-- 504. Temple Judea
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Temple Judea', 1928, '1928             [1931]', NULL, NULL, 'unknown', true);

-- 505. Temple Judea of Bucks County
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Temple Judea of Bucks County', NULL, NULL, NULL, 'Active', 'active', true);

-- 506. Temple Menorah Kneseth Chai See also, Tacony Hebrew Congregation; The Northeast Jewish Community Center
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Temple Menorah Kneseth Chai See also, Tacony Hebrew Congregation; The Northeast Jewish Community Center', 1924, '1924', NULL, 'Active', 'active', true);

-- 507. Temple Shalom
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Temple Shalom', NULL, NULL, NULL, 'Active', 'active', true);

-- 508. Temple Sholom of Broomall
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Temple Sholom of Broomall', 1956, '1956', NULL, 'Active', 'active', true);

-- 509. Temple Sholom: Also, Upper Northwood Jewish Community Center
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Temple Sholom: Also, Upper Northwood Jewish Community Center', 1940, '1940', 2005, '2005', 'closed', true);

-- 510. Temple Sinai
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Temple Sinai', 1940, '1940', NULL, 'Active', 'active', true);

-- 511. Temple Tel Or
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Temple Tel Or', NULL, NULL, NULL, NULL, 'unknown', true);

-- 512. Temple Zion
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Temple Zion', NULL, NULL, NULL, NULL, 'unknown', true);

-- 513. Temple Zion: Also see, Parker's Place
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Temple Zion: Also see, Parker''s Place', NULL, 'Late 50''s/ Early 60''s', NULL, NULL, 'unknown', true);

-- 514. Teshuath Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Teshuath Israel', 1893, '1893', NULL, NULL, 'unknown', true);

-- 515. The Rushiner Shul. See, Shari Zedek Anshe Reisicher
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('The Rushiner Shul. See, Shari Zedek Anshe Reisicher', NULL, NULL, NULL, NULL, 'unknown', true);

-- 516. The White Shul. See, B'nai Menasha
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('The White Shul. See, B''nai Menasha', NULL, NULL, NULL, NULL, 'unknown', true);

-- 517. Tiferes B'nai Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Tiferes B''nai Israel', NULL, NULL, NULL, 'Active', 'active', true);

-- 518. Tiferes Israel Anshe Zitomir-Gubernia Wohlin Nusach Sfard: Also, Anshe Zhitomir nusach Sfard
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Tiferes Israel Anshe Zitomir-Gubernia Wohlin Nusach Sfard: Also, Anshe Zhitomir nusach Sfard', 1892, '[1892]', 1965, '1965;                  moved to 6th      & Wolf.', 'closed', true);

-- 519. Tiferet Bet Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Tiferet Bet Israel', NULL, NULL, NULL, 'Active', 'active', true);

-- 520. Tiferet Israel of Lower Bucks County
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Tiferet Israel of Lower Bucks County', NULL, NULL, NULL, 'Active', 'active', true);

-- 521. Tiferet Joseph
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Tiferet Joseph', 1929, '1929', 1978, '1978', 'closed', true);

-- 522. Tifereth Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Tifereth Israel', NULL, NULL, NULL, NULL, 'unknown', true);

-- 523. Tifereth Israel Anshe Lita
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Tifereth Israel Anshe Lita', 1903, '1903            [1905]', NULL, NULL, 'unknown', true);

-- 524. Tifereth Israel of Parkside
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Tifereth Israel of Parkside', 1904, '1904             [1912]', 1960, '1960', 'closed', true);

-- 525. Tikvas Israel
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Tikvas Israel', 1920, '1920            [1924]', 1972, '1972;', 'closed', true);

-- 526. Tikvas Zion
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Tikvas Zion', 1905, '1905', NULL, NULL, 'unknown', true);

-- 527. Tikvoh Chadoshoh
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Tikvoh Chadoshoh', 1940, '1940''s', 1985, '1985', 'closed', true);

-- 528. Toras Israel. Also, Bialik Congregation; Beth Zion
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Toras Israel. Also, Bialik Congregation; Beth Zion', 1922, '1922             [1923]', 1970, 'Early 1970''s.', 'closed', true);

-- 529. Touro Hall Free Synagogue
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Touro Hall Free Synagogue', 1891, '[1891]', 1930, 'Early 1930''s', 'closed', true);

-- 530. Tzedek V'Shalom
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Tzedek V''Shalom', NULL, NULL, NULL, 'Active', 'active', true);

-- 531. Upper Northwood Jewish Community Center: See, Temple Sholom
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Upper Northwood Jewish Community Center: See, Temple Sholom', NULL, NULL, NULL, NULL, 'unknown', true);

-- 532. Uptown Home for the Aged: See, Moshe Zekenim
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Uptown Home for the Aged: See, Moshe Zekenim', NULL, NULL, NULL, NULL, 'unknown', true);

-- 533. Vilna Congregation. Also, [Beis HaKnesses] Anshe Vilno.
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Vilna Congregation. Also, [Beis HaKnesses] Anshe Vilno.', 1904, '1904           [1904]', NULL, 'Active', 'active', true);

-- 534. Vine Street Synagogue: Also see, Eastern Women's Talmud Torah
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Vine Street Synagogue: Also see, Eastern Women''s Talmud Torah', NULL, NULL, 1960, '1960''s', 'closed', true);

-- 535. West Oak Lane Jewish Community Center
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('West Oak Lane Jewish Community Center', 1950, '1950', 1978, '1978;', 'closed', true);

-- 536. West Philadelphia Hebrew Congregation (Beth Judah)
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('West Philadelphia Hebrew Congregation (Beth Judah)', 1908, '1908', NULL, NULL, 'unknown', true);

-- 537. West Philadelphia Jewish Community Center
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('West Philadelphia Jewish Community Center', 1923, '1923             [1928]', 1960, '1960''s;', 'closed', true);

-- 538. West Philadelphia Talmud Torah
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('West Philadelphia Talmud Torah', 1919, '[1919]', 1952, 'About 1952', 'closed', true);

-- 539. Wilner Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Wilner Congregation', 1901, '1901', NULL, NULL, 'unknown', true);

-- 540. Winitzer Congregation: Also Beneficial Sons of David
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Winitzer Congregation: Also Beneficial Sons of David', 1896, '1896/1901 [1896/1901]', 1910, 'Disbanded by early 1910''s', 'closed', true);

-- 541. Woodside Park Congregation
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Woodside Park Congregation', 1962, '1962', NULL, NULL, 'unknown', true);

-- 542. Wynnefield Jewish Center
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Wynnefield Jewish Center', 1945, '1945', 1960, '1960''s', 'closed', true);

-- 543. Yagdil Torah
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Yagdil Torah', 1924, '1924              [1924]', 1931, 'Disbanded by 1931', 'closed', true);

-- 544. Yagdil Torah
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Yagdil Torah', 1948, '1948', 1978, '1978', 'closed', true);

-- 545. Yardley Synagogue (Beth El)
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Yardley Synagogue (Beth El)', NULL, NULL, NULL, NULL, 'unknown', true);

-- 546. Yavneh Synagogue
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Yavneh Synagogue', 1950, '1950', 1970, '1970', 'closed', true);

-- 547. Yeadon Jewish Community Center
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Yeadon Jewish Community Center', NULL, NULL, 1991, '1991', 'closed', true);

-- 548. Young Israel of Beth Samuel: See, Adath Shalom
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Young Israel of Beth Samuel: See, Adath Shalom', NULL, NULL, NULL, NULL, 'unknown', true);

-- 549. Young Israel of Elkins Park
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Young Israel of Elkins Park', 1980, '1980', NULL, 'Active', 'active', true);

-- 550. Young Israel of Oxford Circle
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Young Israel of Oxford Circle', 1954, '1954', NULL, 'Active', 'active', true);

-- 551. Young Israel of Strawberry Mansion
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Young Israel of Strawberry Mansion', 1940, '1940', 1954, '1954;', 'closed', true);

-- 552. Young Israel of the Main Line
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Young Israel of the Main Line', 1960, '1960               [1965]', NULL, 'Active', 'active', true);

-- 553. Young People's B'nai Moishe: See, Adath Shalom
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Young People''s B''nai Moishe: See, Adath Shalom', 1950, '1950', NULL, NULL, 'unknown', true);

-- 554. Young People's Congregation - Shaare Israel; Also Adath Shalom
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Young People''s Congregation - Shaare Israel; Also Adath Shalom', 1947, '1947', NULL, NULL, 'unknown', true);

-- 555. Young People's Congregation - Shari Eli.
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Young People''s Congregation - Shari Eli.', 1946, '1946', NULL, 'Active', 'active', true);

-- 556. Zeiras Israel: Also, Catherine St. Shul
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Zeiras Israel: Also, Catherine St. Shul', 1915, '[1915/20]', 1965, 'Disbanded in 1965', 'closed', true);

-- 557. Zemach David nusach Sfard
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Zemach David nusach Sfard', 1923, '1923             [1928]', 1981, '1981', 'closed', true);

-- 558. Zemach David of Logan
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Zemach David of Logan', 1970, '1970''s', NULL, NULL, 'unknown', true);

-- 559. Zemach David of Logan
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Zemach David of Logan', 1927, '1927', 1981, '1981', 'closed', true);

-- 560. Zikhron Yaakov: See, Chevra Tehilim Zikhron Yaakov
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Zikhron Yaakov: See, Chevra Tehilim Zikhron Yaakov', NULL, NULL, NULL, NULL, 'unknown', true);

-- 561. Zikne Zedek
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Zikne Zedek', 1896, '[1896]', NULL, NULL, 'unknown', true);

-- 562. Ziknei Israel [Chevra]
INSERT INTO public.synagogues (name, founded_year, founded_text, closed_year, closed_text, status, approved)
VALUES ('Ziknei Israel [Chevra]', 1890, '1890''s [1914]', 1970, '1970''s', 'closed', true);


-- Successfully inserted 562 synagogues
-- Fixed 1 date inconsistencies
-- Next: You'll need to geocode addresses and import them separately
