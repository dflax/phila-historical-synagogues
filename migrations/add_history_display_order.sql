-- Add display_order column to history_entries for manual drag-and-drop reordering
-- Run this in Supabase SQL editor before deploying the history reorder feature.

ALTER TABLE history_entries
  ADD COLUMN IF NOT EXISTS display_order INTEGER;

-- Initialise display_order for existing rows, grouped per synagogue,
-- ordered by year (nulls last) then created_at as tiebreaker.
UPDATE history_entries
SET display_order = sub.row_num
FROM (
  SELECT
    id,
    ROW_NUMBER() OVER (
      PARTITION BY synagogue_id
      ORDER BY
        CASE WHEN year IS NOT NULL THEN year ELSE 9999 END,
        COALESCE(year_range_start, 9999),
        created_at
    ) AS row_num
  FROM history_entries
  WHERE deleted IS NOT TRUE
) sub
WHERE history_entries.id = sub.id;
