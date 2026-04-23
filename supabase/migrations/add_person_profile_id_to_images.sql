-- Add person_profile_id to images (FK → person_profiles, replacing legacy rabbi_profile_id for new uploads).
-- Also adds image_upload to the edit_proposals proposal_type check constraint.
-- Run this in the Supabase SQL editor before deploying the photo approval workflow.

-- 1. Add person_profile_id column to images
ALTER TABLE images
  ADD COLUMN IF NOT EXISTS person_profile_id UUID REFERENCES person_profiles(id) ON DELETE SET NULL;

-- 2. Update images_entity_check to accept person_profile_id as a valid entity reference
--    (original constraint only knew about synagogue_id and rabbi_profile_id)
ALTER TABLE images
  DROP CONSTRAINT IF EXISTS images_entity_check;

ALTER TABLE images
  ADD CONSTRAINT images_entity_check CHECK (
    synagogue_id IS NOT NULL OR
    rabbi_profile_id IS NOT NULL OR
    person_profile_id IS NOT NULL
  );

-- 2. Add image_upload to the edit_proposals proposal_type check constraint
ALTER TABLE edit_proposals
  DROP CONSTRAINT IF EXISTS edit_proposals_proposal_type_check;

ALTER TABLE edit_proposals
  ADD CONSTRAINT edit_proposals_proposal_type_check CHECK (
    proposal_type IN (
      'synagogue_edit',
      'synagogue_new',
      'synagogue_delete',
      'synagogue_merge',
      'synagogue_split',
      'address_edit',
      'address_new',
      'rabbi_edit',
      'rabbi_new',
      'rabbi_affiliation_new',
      'lay_leader_affiliation_new',
      'staff_affiliation_new',
      'affiliation_edit',
      'history_edit',
      'history_new',
      'photo_upload',
      'image_upload',           -- NEW: photo upload via contributor approval workflow
      'rabbi_profile_edit',
      'rabbi_profile_new',
      'rabbi_profile_delete',
      'rabbi_profile_merge',
      'rabbi_profile_split',
      'link_new',
      'link_edit',
      'link_delete',
      'synagogue_relationship_new',
      'synagogue_relationship_delete'
    )
  );
