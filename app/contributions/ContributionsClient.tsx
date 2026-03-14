'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import NavAuth from '@/components/auth/NavAuth'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface EditProposal {
  id: string
  synagogue_id: string | null
  proposal_type: 'synagogue_edit' | 'synagogue_new' | 'address_edit' | 'address_new' | 'rabbi_edit' | 'rabbi_new' | 'history_edit' | 'history_new' | 'photo_upload'
  proposed_data: Record<string, any>
  current_data: Record<string, any> | null
  submitter_note: string | null
  status: 'pending' | 'approved' | 'rejected' | 'needs_revision'
  review_notes: string | null
  created_at: string
  reviewed_at: string | null
  synagogue_name: string | null
}

export interface PhotoUpload {
  id: string
  synagogue_id: string
  url: string | null
  caption: string
  description: string | null
  photographer: string | null
  year: number | null
  date_taken: string | null
  approved: boolean
  approved_at: string | null
  created_at: string
  original_filename: string | null
  width: number | null
  height: number | null
  synagogue_name: string | null
}

interface Props {
  proposals: EditProposal[]
  images: PhotoUpload[]
}

// ── Config ────────────────────────────────────────────────────────────────────

const PROPOSAL_STATUS: Record<string, { label: string; text: string; bg: string; dot: string }> = {
  pending:        { label: 'Pending',        text: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20',  dot: 'bg-amber-500' },
  approved:       { label: 'Approved',       text: 'text-green-700 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20',  dot: 'bg-green-500' },
  rejected:       { label: 'Rejected',       text: 'text-red-700 dark:text-red-400',     bg: 'bg-red-50 dark:bg-red-900/20',      dot: 'bg-red-500' },
  needs_revision: { label: 'Needs Revision', text: 'text-blue-700 dark:text-blue-400',   bg: 'bg-blue-50 dark:bg-blue-900/20',    dot: 'bg-blue-500' },
}

const PROPOSAL_TYPE_LABELS: Record<string, string> = {
  synagogue_edit:  'Edit synagogue',
  synagogue_new:   'New synagogue',
  address_edit:    'Edit address',
  address_new:     'New address',
  rabbi_edit:      'Edit rabbi',
  rabbi_new:       'New rabbi',
  history_edit:    'Edit history',
  history_new:     'New history entry',
  photo_upload:    'Photo upload',
}

const FIELD_LABELS: Record<string, string> = {
  name:         'Name',
  founded_year: 'Founded Year',
  founded_text: 'Founded Note',
  closed_year:  'Closed Year',
  closed_text:  'Closure Note',
  status:       'Status',
  neighborhood: 'Neighborhood',
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string | null | undefined): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

function ProposalStatusBadge({ status }: { status: string }) {
  const cfg = PROPOSAL_STATUS[status] ?? PROPOSAL_STATUS.pending
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${cfg.text} ${cfg.bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  )
}

function ApprovalBadge({ approved }: { approved: boolean }) {
  return approved
    ? <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />Approved
      </span>
    : <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />Pending review
      </span>
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ContributionsClient({ proposals, images }: Props) {
  const [activeTab,     setActiveTab]     = useState<'edits' | 'photos'>('edits')
  const [statusFilter,  setStatusFilter]  = useState('all')
  const [photoFilter,   setPhotoFilter]   = useState('all')
  const [selectedEdit,  setSelectedEdit]  = useState<EditProposal | null>(null)
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoUpload | null>(null)

  // ── Derived values ─────────────────────────────────────────────────────────

  const statusCounts: Record<string, number> = {
    all:            proposals.length,
    pending:        proposals.filter(p => p.status === 'pending').length,
    approved:       proposals.filter(p => p.status === 'approved').length,
    rejected:       proposals.filter(p => p.status === 'rejected').length,
    needs_revision: proposals.filter(p => p.status === 'needs_revision').length,
  }

  const filteredProposals = statusFilter === 'all'
    ? proposals
    : proposals.filter(p => p.status === statusFilter)

  const photoStatusCounts: Record<string, number> = {
    all:      images.length,
    pending:  images.filter(i => !i.approved).length,
    approved: images.filter(i =>  i.approved).length,
  }

  const filteredPhotos = photoFilter === 'all'
    ? images
    : photoFilter === 'approved'
      ? images.filter(i =>  i.approved)
      : images.filter(i => !i.approved)

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* Nav */}
      <nav className="bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-700 sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
              Philadelphia Historical Synagogues
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">Home</Link>
              <Link href="/map" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">Map</Link>
              <Link href="/synagogues" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">Browse</Link>
              <Link href="/rabbis" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">Rabbis</Link>
              <NavAuth />
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Contributions</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {proposals.length} edit proposal{proposals.length !== 1 ? 's' : ''}
            {' · '}
            {images.length} photo upload{images.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          {(['edits', 'photos'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition -mb-px ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {tab === 'edits' ? `Edits (${proposals.length})` : `Photos (${images.length})`}
            </button>
          ))}
        </div>

        {/* ── Edits tab ───────────────────────────────────────────────────── */}
        {activeTab === 'edits' && (
          <div>
            {/* Status filter pills */}
            {proposals.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {([
                  ['all',            'All'],
                  ['pending',        'Pending'],
                  ['approved',       'Approved'],
                  ['rejected',       'Rejected'],
                  ['needs_revision', 'Needs Revision'],
                ] as [string, string][]).map(([value, label]) => {
                  const count = statusCounts[value] ?? 0
                  if (value !== 'all' && count === 0) return null
                  return (
                    <button
                      key={value}
                      onClick={() => setStatusFilter(value)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                        statusFilter === value
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                      }`}
                    >
                      {label}{' '}
                      <span className={statusFilter === value ? 'opacity-75' : 'text-gray-400 dark:text-gray-500'}>
                        {count}
                      </span>
                    </button>
                  )
                })}
              </div>
            )}

            {/* List or empty state */}
            {filteredProposals.length === 0 ? (
              <div className="text-center py-16 text-gray-400 dark:text-gray-500">
                {proposals.length === 0 ? (
                  <>
                    <div className="text-4xl mb-3">✏️</div>
                    <p className="font-medium text-gray-600 dark:text-gray-400">No edit proposals yet</p>
                    <p className="text-sm mt-1">
                      Visit a{' '}
                      <Link href="/synagogues" className="text-blue-600 dark:text-blue-400 hover:underline">synagogue page</Link>
                      {' '}and click "Suggest an Edit" to contribute.
                    </p>
                  </>
                ) : (
                  <p>No proposals with this status.</p>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredProposals.map(proposal => (
                  <button
                    key={proposal.id}
                    onClick={() => setSelectedEdit(proposal)}
                    className="w-full text-left bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-sm transition"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {proposal.synagogue_name ?? 'New Synagogue'}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full flex-shrink-0">
                            {PROPOSAL_TYPE_LABELS[proposal.proposal_type] ?? proposal.proposal_type}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                          Submitted {formatDate(proposal.created_at)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <ProposalStatusBadge status={proposal.status} />
                        <svg className="w-4 h-4 text-gray-300 dark:text-gray-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Photos tab ──────────────────────────────────────────────────── */}
        {activeTab === 'photos' && (
          <div>
            {/* Approval filter pills */}
            {images.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {([
                  ['all',      'All'],
                  ['pending',  'Pending'],
                  ['approved', 'Approved'],
                ] as [string, string][]).map(([value, label]) => {
                  const count = photoStatusCounts[value] ?? 0
                  if (value !== 'all' && count === 0) return null
                  return (
                    <button
                      key={value}
                      onClick={() => setPhotoFilter(value)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                        photoFilter === value
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                      }`}
                    >
                      {label}{' '}
                      <span className={photoFilter === value ? 'opacity-75' : 'text-gray-400 dark:text-gray-500'}>
                        {count}
                      </span>
                    </button>
                  )
                })}
              </div>
            )}

            {/* List or empty state */}
            {filteredPhotos.length === 0 ? (
              <div className="text-center py-16 text-gray-400 dark:text-gray-500">
                {images.length === 0 ? (
                  <>
                    <div className="text-4xl mb-3">📷</div>
                    <p className="font-medium text-gray-600 dark:text-gray-400">No photos uploaded yet</p>
                    <p className="text-sm mt-1">
                      Visit a{' '}
                      <Link href="/synagogues" className="text-blue-600 dark:text-blue-400 hover:underline">synagogue page</Link>
                      {' '}and click the camera icon to upload a photo.
                    </p>
                  </>
                ) : (
                  <p>No photos with this status.</p>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredPhotos.map(photo => (
                  <button
                    key={photo.id}
                    onClick={() => setSelectedPhoto(photo)}
                    className="w-full text-left bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-sm transition"
                  >
                    <div className="flex items-center gap-3">
                      {/* Thumbnail */}
                      <div className="w-12 h-12 flex-shrink-0 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        {photo.url ? (
                          <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-gray-600">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="min-w-0 flex-1">
                        <span className="font-medium text-gray-900 dark:text-white block truncate">
                          {photo.synagogue_name ?? 'Unknown synagogue'}
                        </span>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{photo.caption}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                          Uploaded {formatDate(photo.created_at)}
                        </p>
                      </div>

                      {/* Status + chevron */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <ApprovalBadge approved={photo.approved} />
                        <svg className="w-4 h-4 text-gray-300 dark:text-gray-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedEdit  && <EditDetailModal  proposal={selectedEdit}  onClose={() => setSelectedEdit(null)}  />}
      {selectedPhoto && <PhotoDetailModal photo={selectedPhoto}    onClose={() => setSelectedPhoto(null)} />}
    </div>
  )
}

// ── Edit detail modal ─────────────────────────────────────────────────────────

function EditDetailModal({ proposal, onClose }: { proposal: EditProposal; onClose: () => void }) {
  const changedFields = Object.keys(proposal.proposed_data).filter(k => k !== 'note')
  const note = proposal.proposed_data.note as string | undefined
  const showOriginal = proposal.proposal_type.endsWith('_edit') && proposal.current_data != null

  useEffect(() => {
    function handleKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 min-w-0">
            <h2 className="font-semibold text-gray-900 dark:text-white">Edit Proposal</h2>
            <ProposalStatusBadge status={proposal.status} />
          </div>
          <button
            onClick={onClose}
            className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
            aria-label="Close"
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="px-5 py-4 space-y-4">

          {/* Synagogue + type */}
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              {proposal.synagogue_id ? (
                <Link
                  href={`/synagogues/${proposal.synagogue_id}`}
                  className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  onClick={onClose}
                >
                  {proposal.synagogue_name ?? 'View synagogue →'}
                </Link>
              ) : (
                <span className="font-medium text-gray-900 dark:text-white">New synagogue proposal</span>
              )}
              <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                {PROPOSAL_TYPE_LABELS[proposal.proposal_type] ?? proposal.proposal_type}
              </span>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Submitted {formatDate(proposal.created_at)}
              {proposal.reviewed_at && ` · Reviewed ${formatDate(proposal.reviewed_at)}`}
            </p>
          </div>

          {/* Reviewer notes */}
          {proposal.review_notes && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-2.5">
              <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-1">Reviewer note</p>
              <p className="text-sm text-amber-800 dark:text-amber-300">{proposal.review_notes}</p>
            </div>
          )}

          {/* Change summary */}
          {proposal.submitter_note && (
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Summary</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">{proposal.submitter_note}</p>
            </div>
          )}

          {/* Note / reason */}
          {note && (
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Your Note</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">{note}</p>
            </div>
          )}

          {/* Proposed changes table */}
          {changedFields.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                {proposal.proposal_type.endsWith('_edit') ? 'Proposed Changes' : 'Proposed Data'}
              </p>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 w-1/3">Field</th>
                      {showOriginal && (
                        <th className="text-left px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 w-1/3">Original</th>
                      )}
                      <th className="text-left px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400">Proposed</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60">
                    {changedFields.map(field => (
                      <tr key={field}>
                        <td className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                          {FIELD_LABELS[field] ?? field}
                        </td>
                        {showOriginal && (
                          <td className="px-3 py-2 text-xs text-gray-400 dark:text-gray-500 line-through">
                            {String(proposal.current_data?.[field] ?? '—')}
                          </td>
                        )}
                        <td className="px-3 py-2 text-sm text-gray-900 dark:text-white font-medium">
                          {String(proposal.proposed_data[field] ?? '—')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Photo detail modal ────────────────────────────────────────────────────────

function PhotoDetailModal({ photo, onClose }: { photo: PhotoUpload; onClose: () => void }) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 flex items-start justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700 gap-3">
          <div className="min-w-0">
            <h2 className="font-semibold text-gray-900 dark:text-white leading-snug">{photo.caption}</h2>
            <div className="mt-1">
              <ApprovalBadge approved={photo.approved} />
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition mt-0.5"
            aria-label="Close"
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="px-5 py-4 space-y-4">

          {/* Image preview */}
          {photo.url ? (
            <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <img src={photo.url} alt={photo.caption} className="w-full object-contain max-h-72" />
            </div>
          ) : (
            <div className="rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 h-36 flex items-center justify-center text-gray-300 dark:text-gray-600">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
          )}

          {/* Synagogue link */}
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Synagogue</p>
            <Link
              href={`/synagogues/${photo.synagogue_id}`}
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
              onClick={onClose}
            >
              {photo.synagogue_name ?? 'View synagogue →'}
            </Link>
          </div>

          {/* Metadata grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Uploaded</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">{formatDate(photo.created_at)}</p>
            </div>
            {photo.approved && photo.approved_at && (
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Approved</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{formatDate(photo.approved_at)}</p>
              </div>
            )}
            {photo.photographer && (
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Photographer</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{photo.photographer}</p>
              </div>
            )}
            {(photo.year || photo.date_taken) && (
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                  {photo.date_taken ? 'Date Taken' : 'Year'}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {photo.date_taken ? formatDate(photo.date_taken) : photo.year}
                </p>
              </div>
            )}
            {photo.width && photo.height && (
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Dimensions</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{photo.width} × {photo.height}px</p>
              </div>
            )}
            {photo.original_filename && (
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">File</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 truncate" title={photo.original_filename}>
                  {photo.original_filename}
                </p>
              </div>
            )}
          </div>

          {/* Description */}
          {photo.description && (
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Description</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">{photo.description}</p>
            </div>
          )}

          {/* Pending notice */}
          {!photo.approved && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-2.5">
              <p className="text-sm text-amber-700 dark:text-amber-400">
                This photo is pending review and is not yet publicly visible.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
