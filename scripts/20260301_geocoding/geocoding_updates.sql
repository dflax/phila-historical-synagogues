SELECT street_address, start_year, end_year, latitude, longitude
FROM addresses a
JOIN synagogues s ON a.synagogue_id = s.id
WHERE s.name = 'Adath Jeshurun'
ORDER BY start_year;