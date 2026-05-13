-- Add 'withdrawn' as an allowed status for edit_proposals.
-- Contributors can withdraw their own pending submissions.

ALTER TABLE edit_proposals
  DROP CONSTRAINT IF EXISTS edit_proposals_status_check;

ALTER TABLE edit_proposals
  ADD CONSTRAINT edit_proposals_status_check
  CHECK (status IN ('pending', 'approved', 'rejected', 'needs_revision', 'withdrawn'));
