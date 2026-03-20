-- Add rabbi_profile_merge to the edit_proposals proposal_type check constraint.
-- Run this in the Supabase SQL editor before deploying the merge feature.

ALTER TABLE edit_proposals
  DROP CONSTRAINT IF EXISTS edit_proposals_proposal_type_check;

ALTER TABLE edit_proposals
  ADD CONSTRAINT edit_proposals_proposal_type_check
  CHECK (proposal_type IN (
    'synagogue_edit',
    'synagogue_new',
    'synagogue_delete',
    'address_edit',
    'address_new',
    'rabbi_edit',
    'rabbi_new',
    'history_edit',
    'history_new',
    'photo_upload',
    'rabbi_profile_edit',
    'rabbi_profile_new',
    'rabbi_profile_delete',
    'rabbi_profile_merge'   -- NEW: merge duplicate rabbi profiles
  ));
