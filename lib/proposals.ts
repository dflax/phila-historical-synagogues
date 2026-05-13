/**
 * Fire-and-forget email confirmation after a proposal is inserted.
 * Failures are silently swallowed — email is non-critical.
 */
export function notifyProposalSubmission(proposalId: string): void {
  fetch(`/api/proposals/${proposalId}/notify`, { method: 'POST' }).catch(() => {})
}
