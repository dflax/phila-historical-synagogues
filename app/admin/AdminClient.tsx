'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import NavAuth from '@/components/auth/NavAuth'
import { useUserRole } from '@/hooks/useUserRole'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface PendingProposal {
  id: string
  synagogue_id: string | null
  entity_id: string | null
  rabbi_name: string | null
  synagogue_name: string | null
  proposal_type: 'synagogue_edit' | 'synagogue_new' | 'synagogue_delete' | 'synagogue_merge' | 'synagogue_split' | 'address_edit' | 'address_new' | 'rabbi_edit' | 'rabbi_new' | 'rabbi_affiliation_new' | 'history_edit' | 'history_new' | 'photo_upload' | 'rabbi_profile_edit' | 'rabbi_profile_new' | 'rabbi_profile_delete' | 'rabbi_profile_merge' | 'rabbi_profile_split' | 'link_new' | 'link_edit' | 'link_delete' | 'synagogue_relationship_new' | 'synagogue_relationship_delete'
  proposed_data: Record<string, any>
  current_data: Record<string, any> | null
  submitter_note: string | null
  created_at: string
  contributor_name: string
  contributor_email: string | null
}

export interface PendingImage {
  id: string
  synagogue_id: string
  synagogue_name: string | null
  url: string | null
  storage_path: string | null
  caption: string
  description: string | null
  photographer: string | null
  year: number | null
  date_taken: string | null
  created_at: string
  original_filename: string | null
  width: number | null
  height: number | null
}

interface Props {
  proposals: PendingProposal[]
  images: PendingImage[]
  userId: string
}

// ── Config ────────────────────────────────────────────────────────────────────

const FIELD_LABELS: Record<string, string> = {
  // Synagogue fields
  name:                'Name',
  founded_year:        'Founded Year',
  closed_year:         'Closed Year',
  status:              'Status',
  neighborhood:        'Neighborhood',
  // Rabbi profile fields
  canonical_name:      'Full Name',
  birth_year:          'Birth Year',
  circa_birth:         'Birth Year Approximate',
  death_year:          'Death Year',
  circa_death:         'Death Year Approximate',
  biography:           'Biography',
  // Deletion proposal summary fields
  action:              'Action',
  biographical_fields: 'Biographical Fields',
  affiliation_count:   'Synagogue Affiliations',
  address_count:       'Addresses',
  history_count:       'Historical Entries',
  rabbi_count:         'Rabbi Affiliations',
  photo_count:         'Photos',
  // Merge proposal fields
  synagogue1_name:     'Current Synagogue 1',
  synagogue2_name:     'Current Synagogue 2',
  merge_source_id:     'Keeping (ID)',
  merge_target_id:     'Merging (ID)',
  merged_fields:       'Merged Data',
  affiliations_count:  'Total Affiliations',
  photos_count:        'Total Photos',
  relationships_count: 'Total Relationships',
  rabbi1_name:         'Current Rabbi 1',
  rabbi2_name:         'Current Rabbi 2',
  // Split proposal fields
  original_synagogue_name: 'Original Synagogue',
  new_synagogue_name:      'New Synagogue',
  original_fields:         'Original Fields',
  new_fields:              'New Fields',
  assignments:             'Item Assignments',
  // Affiliation proposal fields
  rabbi_profile_id:        'Rabbi',
  synagogue_id:            'Synagogue',
  start_year:              'Start Year',
  end_year:                'End Year',
  notes:                   'Notes',
  title:                   'Title',
  // Link proposal fields
  entity_type:             'Entity Type',
  entity_id:               'Entity',
  link_type:               'Link Type',
  url:                     'URL',
  description:             'Description',
  // Relationship proposal fields
  related_synagogue_id:        'Related Synagogue',
  relationship_type:           'Relationship Type',
  relationship_year:           'Year',
  reverse_relationship_type:   'Reverse Type (auto-created)',
}

const PROPOSAL_TYPE_LABELS: Record<string, string> = {
  synagogue_edit:      'Edit synagogue',
  synagogue_new:       'New synagogue',
  synagogue_delete:    'Delete synagogue',
  synagogue_merge:     'Merge synagogues',
  synagogue_split:     'Split synagogue',
  address_edit:        'Edit address',
  address_new:         'New address',
  rabbi_edit:          'Edit rabbi',
  rabbi_new:              'New rabbi',
  rabbi_affiliation_new:  'Add rabbi affiliation',
  history_edit:           'Edit history',
  history_new:         'New history entry',
  photo_upload:        'Photo upload',
  rabbi_profile_edit:   'Edit rabbi profile',
  rabbi_profile_new:    'New rabbi profile',
  rabbi_profile_delete: 'Delete rabbi',
  rabbi_profile_merge:  'Merge rabbis',
  rabbi_profile_split:  'Split rabbi',
  link_new:                    'Add link',
  link_edit:                   'Edit link',
  link_delete:                 'Delete link',
  synagogue_relationship_new:    'Add synagogue relationship',
  synagogue_relationship_delete: 'Delete synagogue relationship',
}

const PROPOSAL_TYPE_COLORS: Record<string, string> = {
  synagogue_edit:      'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20',
  synagogue_new:       'text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20',
  synagogue_delete:    'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20',
  synagogue_merge:     'text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20',
  synagogue_split:     'text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20',
  address_edit:        'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20',
  address_new:         'text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20',
  rabbi_edit:          'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20',
  rabbi_new:              'text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20',
  rabbi_affiliation_new:  'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20',
  history_edit:           'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20',
  history_new:         'text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20',
  photo_upload:        'text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20',
  rabbi_profile_edit:   'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20',
  rabbi_profile_new:    'text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20',
  rabbi_profile_delete: 'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20',
  rabbi_profile_merge:  'text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20',
  rabbi_profile_split:  'text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20',
  link_new:                    'text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20',
  link_edit:                   'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20',
  link_delete:                 'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20',
  synagogue_relationship_new:    'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20',
  synagogue_relationship_delete: 'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20',
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string | null | undefined): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

type EntityType = 'synagogue' | 'rabbi' | 'ungrouped'

interface ProposalGroup {
  key: string
  entity_type: EntityType
  entity_id: string | null
  display_name: string
  items: PendingProposal[]
}

function groupProposals(proposals: PendingProposal[]): ProposalGroup[] {
  const map = new Map<string, ProposalGroup>()

  for (const p of proposals) {
    let key: string

    if (p.proposal_type === 'rabbi_profile_new') {
      // Each new-rabbi proposal gets its own group keyed by proposal id
      key = `new_rabbi__${p.id}`
      const proposedName =
        typeof p.proposed_data?.canonical_name === 'string'
          ? p.proposed_data.canonical_name
          : null
      map.set(key, {
        key,
        entity_type:  'rabbi',
        entity_id:    null,
        display_name: proposedName ? `(New) ${proposedName}` : '(New Rabbi)',
        items: [p],
      })
      continue  // items already populated above
    } else if (p.proposal_type.startsWith('rabbi_profile_')) {
      // Group existing rabbi profile proposals by their entity_id
      key = `rabbi__${p.entity_id ?? '__unknown__'}`
      if (!map.has(key)) {
        map.set(key, {
          key,
          entity_type:  'rabbi',
          entity_id:    p.entity_id,
          display_name: p.rabbi_name ?? 'Unknown Rabbi',
          items: [],
        })
      }
    } else if (p.synagogue_id) {
      // Group synagogue-linked proposals by synagogue_id
      key = `synagogue__${p.synagogue_id}`
      if (!map.has(key)) {
        map.set(key, {
          key,
          entity_type:  'synagogue',
          entity_id:    p.synagogue_id,
          display_name: p.synagogue_name ?? 'Unknown Synagogue',
          items: [],
        })
      }
    } else if (p.proposal_type === 'synagogue_new') {
      // Each new-synagogue proposal gets its own group keyed by proposal id,
      // showing the proposed name so reviewers can distinguish them at a glance.
      key = `new_synagogue__${p.id}`
      const proposedName =
        typeof p.proposed_data?.name === 'string' ? p.proposed_data.name : null
      map.set(key, {
        key,
        entity_type:  'ungrouped',
        entity_id:    null,
        display_name: proposedName ? `(New) ${proposedName}` : '(New Synagogue)',
        items: [p],
      })
      continue  // items already populated above
    } else {
      // Unknown types without a synagogue land here
      key = '__ungrouped__'
      if (!map.has(key)) {
        map.set(key, {
          key,
          entity_type:  'ungrouped',
          entity_id:    null,
          display_name: 'Ungrouped',
          items: [],
        })
      }
    }

    map.get(key)!.items.push(p)
  }

  return [...map.values()]
}

// ── Main component ────────────────────────────────────────────────────────────

const ROLE_BADGE: Record<string, { label: string; className: string }> = {
  super_admin: {
    label: 'Super Admin',
    className: 'text-violet-700 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800',
  },
  admin: {
    label: 'Admin',
    className: 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800',
  },
  editor: {
    label: 'Editor',
    className: 'text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800',
  },
}

export default function AdminClient({ proposals: initialProposals, images: initialImages, userId }: Props) {
  const supabase = createClientComponentClient()
  const { role, isAdmin } = useUserRole()

  const [activeTab,         setActiveTab]         = useState<'proposals' | 'photos'>('proposals')
  const [pendingProposals,  setPendingProposals]   = useState<PendingProposal[]>(initialProposals)
  const [pendingImages,     setPendingImages]      = useState<PendingImage[]>(initialImages)
  const [expandedGroups,    setExpandedGroups]     = useState<Set<string>>(new Set())
  const [rejectingId,       setRejectingId]        = useState<string | null>(null)
  const [rejectNotes,       setRejectNotes]        = useState('')
  const [selectedPhoto,     setSelectedPhoto]      = useState<PendingImage | null>(null)
  const [processing,        setProcessing]         = useState<Set<string>>(new Set())
  const [error,             setError]              = useState<string | null>(null)

  const addProcessing    = (id: string) => setProcessing(p => { const s = new Set(p); s.add(id);    return s })
  const removeProcessing = (id: string) => setProcessing(p => { const s = new Set(p); s.delete(id); return s })

  const groups = groupProposals(pendingProposals)

  function toggleGroup(key: string) {
    setExpandedGroups(prev => {
      const s = new Set(prev)
      if (s.has(key)) s.delete(key); else s.add(key)
      return s
    })
  }

  // ── Proposal actions ───────────────────────────────────────────────────────

  async function approveProposal(id: string) {
    addProcessing(id)
    setError(null)
    try {
      const res  = await fetch(`/api/proposals/${id}/approve`, { method: 'POST' })
      const body = await res.json()
      if (!res.ok) { setError(body.error ?? 'Approval failed'); return }
      setPendingProposals(prev => prev.filter(p => p.id !== id))
    } catch {
      setError('Network error. Please try again.')
    } finally {
      removeProcessing(id)
    }
  }

  async function rejectProposal(id: string) {
    addProcessing(id)
    setError(null)
    const { error: err } = await supabase
      .from('edit_proposals')
      .update({
        status:         'rejected',
        review_notes: rejectNotes.trim() || null,
        reviewed_by:    userId,
        reviewed_at:    new Date().toISOString(),
      })
      .eq('id', id)
    removeProcessing(id)
    if (err) { setError(err.message); return }
    setPendingProposals(prev => prev.filter(p => p.id !== id))
    setRejectingId(null)
    setRejectNotes('')
  }

  async function approveAllInGroup(group: ProposalGroup) {
    const ids = group.items.map(p => p.id)
    ids.forEach(addProcessing)
    setError(null)

    const results = await Promise.allSettled(
      ids.map(async id => {
        const res  = await fetch(`/api/proposals/${id}/approve`, { method: 'POST' })
        const body = await res.json()
        return { id, ok: res.ok, error: body.error as string | undefined }
      }),
    )

    ids.forEach(removeProcessing)

    const approved: string[] = []
    const failed: string[]   = []
    for (const r of results) {
      if (r.status === 'fulfilled' && r.value.ok) approved.push(r.value.id)
      else failed.push(r.status === 'fulfilled' ? r.value.id : '?')
    }

    if (approved.length) setPendingProposals(prev => prev.filter(p => !approved.includes(p.id)))
    if (failed.length)   setError(`${failed.length} approval(s) failed — the others were applied.`)
  }

  // ── Photo actions ──────────────────────────────────────────────────────────

  async function approvePhoto(photo: PendingImage) {
    addProcessing(photo.id)
    setError(null)
    const { error: err } = await supabase
      .from('images')
      .update({ approved: true, approved_by: userId, approved_at: new Date().toISOString() })
      .eq('id', photo.id)
    removeProcessing(photo.id)
    if (err) { setError(err.message); return }
    setPendingImages(prev => prev.filter(i => i.id !== photo.id))
    if (selectedPhoto?.id === photo.id) setSelectedPhoto(null)
  }

  async function rejectPhoto(photo: PendingImage) {
    addProcessing(photo.id)
    setError(null)
    // Delete the record; attempt storage cleanup (best-effort)
    const { error: err } = await supabase.from('images').delete().eq('id', photo.id)
    removeProcessing(photo.id)
    if (err) { setError(err.message); return }
    if (photo.storage_path) {
      // fire-and-forget; failure is non-critical
      supabase.storage.from('synagogue-images').remove([photo.storage_path]).catch(() => {})
    }
    setPendingImages(prev => prev.filter(i => i.id !== photo.id))
    if (selectedPhoto?.id === photo.id) setSelectedPhoto(null)
  }

  // ESC closes photo modal
  useEffect(() => {
    if (!selectedPhoto) return
    function handleKey(e: KeyboardEvent) { if (e.key === 'Escape') setSelectedPhoto(null) }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [selectedPhoto])

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
              <Link href="/synagogues" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">Synagogues</Link>
              <Link href="/rabbis" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">Rabbis</Link>
              <NavAuth />
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-5xl">

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {pendingProposals.length} edit proposal{pendingProposals.length !== 1 ? 's' : ''} pending
              {' · '}
              {pendingImages.length} photo{pendingImages.length !== 1 ? 's' : ''} pending
            </p>
          </div>
          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link
                href="/admin/users"
                className="flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                Manage Users
              </Link>
            )}
            {role && ROLE_BADGE[role] && (
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${ROLE_BADGE[role].className}`}>
                {ROLE_BADGE[role].label}
              </span>
            )}
          </div>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-4 flex items-start gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            <span className="flex-1">{error}</span>
            <button onClick={() => setError(null)} className="flex-shrink-0 hover:opacity-70">✕</button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          {(['proposals', 'photos'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition -mb-px ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {tab === 'proposals'
                ? `Edit Proposals (${pendingProposals.length})`
                : `Photos (${pendingImages.length})`}
            </button>
          ))}
        </div>

        {/* ── Edit Proposals Tab ─────────────────────────────────────────────── */}
        {activeTab === 'proposals' && (
          pendingProposals.length === 0 ? (
            <AllClear label="No pending edit proposals" />
          ) : (
            <div className="space-y-3">
              {groups.map(group => {
                const isOpen    = expandedGroups.has(group.key)
                const groupBusy = group.items.every(p => processing.has(p.id))

                // Entity-type prefix badge
                const entityBadge = group.entity_type === 'rabbi' ? (
                  <span className="flex-shrink-0 text-xs font-medium text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 px-1.5 py-0.5 rounded">
                    Rabbi
                  </span>
                ) : group.entity_type === 'synagogue' ? (
                  <span className="flex-shrink-0 text-xs font-medium text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 px-1.5 py-0.5 rounded">
                    Synagogue
                  </span>
                ) : (
                  <span className="flex-shrink-0 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-1.5 py-0.5 rounded">
                    New
                  </span>
                )

                // External link — synagogues have a page; rabbi profiles do too
                const entityLink = group.entity_type === 'synagogue' && group.entity_id ? (
                  <Link
                    href={`/synagogues/${group.entity_id}`}
                    target="_blank"
                    onClick={e => e.stopPropagation()}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex-shrink-0"
                    title="View synagogue"
                  >
                    ↗
                  </Link>
                ) : null

                return (
                  <div key={group.key} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">

                    {/* Group header */}
                    <div className="flex items-center gap-3 px-4 py-3">
                      <button
                        onClick={() => toggleGroup(group.key)}
                        className="flex items-center gap-2 flex-1 min-w-0 text-left"
                        aria-expanded={isOpen}
                      >
                        <svg
                          className={`w-4 h-4 flex-shrink-0 text-gray-400 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                          viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                        >
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        {entityBadge}
                        <span className="font-semibold text-gray-900 dark:text-white truncate">{group.display_name}</span>
                        {entityLink}
                      </button>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full flex-shrink-0">
                        {group.items.length} pending
                      </span>
                      <button
                        onClick={() => approveAllInGroup(group)}
                        disabled={groupBusy}
                        className="flex-shrink-0 text-xs font-medium text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 border border-green-200 dark:border-green-800 disabled:opacity-40 disabled:cursor-not-allowed px-2.5 py-1 rounded-full transition"
                      >
                        {groupBusy ? 'Approving…' : 'Approve All'}
                      </button>
                    </div>

                    {/* Expanded proposals */}
                    {isOpen && (
                      <div className="border-t border-gray-100 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800">
                        {group.items.map(proposal => (
                          <ProposalCard
                            key={proposal.id}
                            proposal={proposal}
                            processing={processing.has(proposal.id)}
                            isRejecting={rejectingId === proposal.id}
                            rejectNotes={rejectNotes}
                            onRejectNoteChange={setRejectNotes}
                            onApprove={() => approveProposal(proposal.id)}
                            onStartReject={() => { setRejectingId(proposal.id); setRejectNotes('') }}
                            onConfirmReject={() => rejectProposal(proposal.id)}
                            onCancelReject={() => { setRejectingId(null); setRejectNotes('') }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )
        )}

        {/* ── Photos Tab ─────────────────────────────────────────────────────── */}
        {activeTab === 'photos' && (
          pendingImages.length === 0 ? (
            <AllClear label="No pending photo uploads" />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {pendingImages.map(photo => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  processing={processing.has(photo.id)}
                  onView={() => setSelectedPhoto(photo)}
                  onApprove={() => approvePhoto(photo)}
                  onReject={() => rejectPhoto(photo)}
                />
              ))}
            </div>
          )
        )}
      </div>

      {/* Photo detail modal */}
      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          processing={processing.has(selectedPhoto.id)}
          onClose={() => setSelectedPhoto(null)}
          onApprove={() => approvePhoto(selectedPhoto)}
          onReject={() => rejectPhoto(selectedPhoto)}
        />
      )}
    </div>
  )
}

// ── All-clear empty state ─────────────────────────────────────────────────────

function AllClear({ label }: { label: string }) {
  return (
    <div className="text-center py-20">
      <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-4">
        <svg className="w-7 h-7 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
      <p className="font-semibold text-gray-700 dark:text-gray-300">{label}</p>
      <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Check back later.</p>
    </div>
  )
}

// ── Proposal card ─────────────────────────────────────────────────────────────

interface ProposalCardProps {
  proposal: PendingProposal
  processing: boolean
  isRejecting: boolean
  rejectNotes: string
  onRejectNoteChange: (v: string) => void
  onApprove: () => void
  onStartReject: () => void
  onConfirmReject: () => void
  onCancelReject: () => void
}

function ProposalCard({
  proposal, processing, isRejecting, rejectNotes,
  onRejectNoteChange, onApprove, onStartReject, onConfirmReject, onCancelReject,
}: ProposalCardProps) {
  // For affiliation proposals, hide UUID fields from the diff table (shown in summary instead)
  const UUID_FIELDS_FOR_AFFILIATION = new Set(['rabbi_profile_id', 'synagogue_id'])
  const LINK_ALL_FIELDS         = new Set(['entity_type', 'entity_id', 'link_type', 'url', 'title', 'description'])
  const LINK_ENTITY_FIELDS      = new Set(['entity_type', 'entity_id'])
  // For relationship proposals: show only notes in the diff table; everything else is in the summary block
  const RELATIONSHIP_HIDE_FIELDS = new Set(['synagogue_id', 'related_synagogue_id', 'relationship_type', 'relationship_year', 'reverse_relationship_type'])
  const RELATIONSHIP_DELETE_HIDE_FIELDS = new Set(['relationship_id', 'synagogue_id', 'related_synagogue_id', 'relationship_type', 'reverse_relationship_type'])
  const changedFields = Object.keys(proposal.proposed_data).filter(f => {
    if (proposal.proposal_type === 'rabbi_affiliation_new' && UUID_FIELDS_FOR_AFFILIATION.has(f)) return false
    // link_new and link_delete: all fields shown in summary block, nothing in diff table
    if ((proposal.proposal_type === 'link_new' || proposal.proposal_type === 'link_delete') && LINK_ALL_FIELDS.has(f)) return false
    // link_edit: hide entity identity fields (shown in summary), show changed fields in diff table
    if (proposal.proposal_type === 'link_edit' && LINK_ENTITY_FIELDS.has(f)) return false
    // relationship_new: all structural fields shown in summary block; only notes shown in diff table
    if (proposal.proposal_type === 'synagogue_relationship_new' && RELATIONSHIP_HIDE_FIELDS.has(f)) return false
    // relationship_delete: all structural fields shown in summary block; nothing in diff table
    if (proposal.proposal_type === 'synagogue_relationship_delete' && RELATIONSHIP_DELETE_HIDE_FIELDS.has(f)) return false
    return true
  })
  const typeColor = PROPOSAL_TYPE_COLORS[proposal.proposal_type] ?? PROPOSAL_TYPE_COLORS.update

  return (
    <div className="px-4 py-4 space-y-3">
      {/* Proposal meta */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeColor}`}>
          {PROPOSAL_TYPE_LABELS[proposal.proposal_type] ?? proposal.proposal_type}
        </span>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {formatDate(proposal.created_at)}
        </span>
      </div>

      {/* Contributor */}
      <div className="text-xs text-gray-500 dark:text-gray-400">
        Submitted by:{' '}
        {proposal.contributor_email ? (
          <a
            href={`mailto:${proposal.contributor_email}`}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            {proposal.contributor_name}
          </a>
        ) : (
          <span className="font-medium text-gray-700 dark:text-gray-300">{proposal.contributor_name}</span>
        )}
      </div>

      {/* Reason / change_summary */}
      {proposal.submitter_note && (
        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 rounded-lg px-3 py-2">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-0.5">Reason given</p>
          <p className="text-sm text-amber-900 dark:text-amber-200">{proposal.submitter_note}</p>
        </div>
      )}

      {/* Split summary */}
      {(proposal.proposal_type === 'synagogue_split' || proposal.proposal_type === 'rabbi_profile_split') && (() => {
        const isSynSplit  = proposal.proposal_type === 'synagogue_split'
        const assignments = proposal.proposed_data?.assignments as Record<string, Record<string, string>> | undefined
        const origName    = isSynSplit
          ? (proposal.current_data?.original_synagogue_name ?? '—')
          : (proposal.current_data?.original_rabbi_name     ?? '—')
        const newName     = isSynSplit
          ? (proposal.current_data?.new_synagogue_name ?? '—')
          : (proposal.current_data?.new_rabbi_name     ?? '—')
        const newFields   = proposal.proposed_data?.new_fields as Record<string, unknown> | undefined

        function countByType(map: Record<string, string> = {}) {
          const c = { original: 0, new: 0, both: 0, neither: 0 }
          for (const v of Object.values(map)) {
            if (v === 'original' || v === 'new' || v === 'both' || v === 'neither') c[v]++
          }
          return c
        }

        const rows: { label: string; key: string }[] = isSynSplit
          ? [
              { label: 'Addresses',       key: 'addresses' },
              { label: 'Rabbis',          key: 'rabbis' },
              { label: 'History entries', key: 'history_entries' },
              { label: 'Photos',          key: 'images' },
            ]
          : [
              { label: 'Affiliations', key: 'rabbis' },
              { label: 'Photos',       key: 'images' },
            ]

        return (
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 space-y-3">
            <h4 className="text-xs font-semibold text-indigo-700 dark:text-indigo-400 uppercase tracking-wide">
              Split Operation
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Original (kept):</div>
                <div className="font-semibold text-gray-900 dark:text-white">{origName}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">New (created):</div>
                <div className="font-semibold text-green-700 dark:text-green-400">
                  {isSynSplit
                    ? String(newFields?.name             ?? newName)
                    : String(newFields?.canonical_name   ?? newName)}
                </div>
              </div>
            </div>
            {assignments && (
              <div className="border border-indigo-200 dark:border-indigo-700 rounded-lg overflow-hidden text-xs">
                <div className="grid grid-cols-5 gap-1 bg-indigo-100 dark:bg-indigo-900/40 px-2 py-1.5 font-semibold text-indigo-700 dark:text-indigo-400">
                  <div className="col-span-1">Category</div>
                  <div className="text-center">Orig</div>
                  <div className="text-center">New</div>
                  <div className="text-center">Both</div>
                  <div className="text-center">Del</div>
                </div>
                {rows.map(row => {
                  const map = assignments[row.key] ?? {}
                  const total = Object.keys(map).length
                  if (total === 0) return null
                  const c = countByType(map)
                  return (
                    <div key={row.key} className="grid grid-cols-5 gap-1 px-2 py-1.5 border-t border-indigo-100 dark:border-indigo-800 text-gray-700 dark:text-gray-300">
                      <div className="col-span-1 font-medium">{row.label}</div>
                      <div className="text-center">{c.original}</div>
                      <div className="text-center text-green-700 dark:text-green-400">{c.new}</div>
                      <div className="text-center text-amber-600 dark:text-amber-400">{c.both}</div>
                      <div className="text-center text-red-500 dark:text-red-400">{c.neither}</div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })()}

      {/* Affiliation summary */}
      {proposal.proposal_type === 'rabbi_affiliation_new' && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-2">
          <h4 className="text-xs font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wide">
            New Affiliation
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Rabbi:</div>
              <div className="font-semibold text-gray-900 dark:text-white">
                {proposal.current_data?.rabbi_name ?? '—'}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Synagogue:</div>
              <div className="font-semibold text-gray-900 dark:text-white">
                {proposal.current_data?.synagogue_name ?? '—'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Link summary */}
      {(proposal.proposal_type === 'link_new' || proposal.proposal_type === 'link_edit' || proposal.proposal_type === 'link_delete') && (() => {
        const isNew    = proposal.proposal_type === 'link_new'
        const isDelete = proposal.proposal_type === 'link_delete'
        const colorClass = isNew
          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
          : isDelete
            ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
            : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
        const headingClass = isNew
          ? 'text-green-700 dark:text-green-400'
          : isDelete
            ? 'text-red-700 dark:text-red-400'
            : 'text-blue-700 dark:text-blue-400'
        const heading = isNew ? 'New Link' : isDelete ? 'Delete Link' : 'Edit Link'
        // For link_edit the entity fields live in proposed_data; for new/delete they also live there
        const entityName = proposal.current_data?.entity_name as string | undefined
        const entityType = proposal.proposed_data.entity_type as string | undefined
        const linkType   = proposal.proposed_data.link_type   as string | undefined
        const linkUrl    = proposal.proposed_data.url         as string | undefined
        return (
          <div className={`border rounded-lg p-4 space-y-2 ${colorClass}`}>
            <h4 className={`text-xs font-semibold uppercase tracking-wide ${headingClass}`}>
              {heading}
            </h4>
            <div className="text-sm space-y-1.5">
              {entityName && (
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">For: </span>
                  <span className="font-semibold text-gray-900 dark:text-white">{entityName}</span>
                  {entityType && (
                    <span className="text-xs text-gray-400 dark:text-gray-500 ml-1 capitalize">
                      ({entityType})
                    </span>
                  )}
                </div>
              )}
              {linkType && (
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Type: </span>
                  <span className="text-gray-900 dark:text-white capitalize">
                    {linkType.replace(/_/g, ' ')}
                  </span>
                </div>
              )}
              {linkUrl && (
                <div className="break-all">
                  <span className="text-xs text-gray-500 dark:text-gray-400">URL: </span>
                  <a
                    href={linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline text-xs"
                  >
                    {linkUrl}
                  </a>
                </div>
              )}
              {proposal.proposed_data.title && (
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Title: </span>
                  <span className="text-gray-900 dark:text-white">{proposal.proposed_data.title as string}</span>
                </div>
              )}
              {proposal.proposed_data.description && (
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Description: </span>
                  <span className="text-gray-900 dark:text-white">{proposal.proposed_data.description as string}</span>
                </div>
              )}
            </div>
          </div>
        )
      })()}

      {/* Relationship summary */}
      {proposal.proposal_type === 'synagogue_relationship_new' && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
          <h4 className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wide mb-3">
            Bidirectional Relationship
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-gray-900 dark:text-white">
                {proposal.current_data?.synagogue_name ?? '—'}
              </span>
              <span className="text-amber-700 dark:text-amber-400 font-medium">
                {String(proposal.proposed_data?.relationship_type ?? '').replace(/_/g, ' ')}
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {proposal.current_data?.related_synagogue_name ?? '—'}
              </span>
              {proposal.proposed_data?.relationship_year && (
                <span className="text-gray-500 dark:text-gray-400">
                  ({proposal.proposed_data.relationship_year as number})
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 flex-wrap text-gray-500 dark:text-gray-400">
              <span className="font-medium">
                {proposal.current_data?.related_synagogue_name ?? '—'}
              </span>
              <span>
                {String(proposal.proposed_data?.reverse_relationship_type ?? '').replace(/_/g, ' ')}
              </span>
              <span className="font-medium">
                {proposal.current_data?.synagogue_name ?? '—'}
              </span>
              {proposal.proposed_data?.relationship_year && (
                <span>({proposal.proposed_data.relationship_year as number})</span>
              )}
              <span className="text-xs italic">(auto-created)</span>
            </div>
          </div>
        </div>
      )}

      {/* Relationship delete summary */}
      {proposal.proposal_type === 'synagogue_relationship_delete' && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <h4 className="text-xs font-semibold text-red-700 dark:text-red-400 uppercase tracking-wide mb-3">
            Relationships to Delete
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 flex-wrap text-gray-900 dark:text-white">
              <span className="font-semibold">{proposal.current_data?.synagogue_name ?? '—'}</span>
              <span className="text-red-600 dark:text-red-400 font-medium">
                {String(proposal.current_data?.relationship_type ?? '').replace(/_/g, ' ')}
              </span>
              <span className="font-semibold">{proposal.current_data?.related_synagogue_name ?? '—'}</span>
              {proposal.current_data?.relationship_year && (
                <span className="text-gray-500 dark:text-gray-400">
                  ({proposal.current_data.relationship_year as number})
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs italic">
              <span>+ Reverse relationship (auto-deleted)</span>
            </div>
          </div>
        </div>
      )}

      {/* Merge summary (replaces diff table for merge/split proposals) */}
      {proposal.proposal_type !== 'synagogue_split' && proposal.proposal_type !== 'rabbi_profile_split' && ((proposal.proposal_type === 'rabbi_profile_merge' || proposal.proposal_type === 'synagogue_merge') ? (
        <div className="space-y-3">
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
            <h4 className="text-xs font-semibold text-purple-700 dark:text-purple-400 uppercase tracking-wide mb-3">
              Merge Operation
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm mb-3">
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Keeping (source):</div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {proposal.proposal_type === 'rabbi_profile_merge'
                    ? (proposal.current_data?.rabbi1_name ?? '—')
                    : (proposal.current_data?.synagogue1_name ?? '—')}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Absorbing (will be deleted):</div>
                <div className="font-semibold text-red-700 dark:text-red-400">
                  {proposal.proposal_type === 'rabbi_profile_merge'
                    ? (proposal.current_data?.rabbi2_name ?? '—')
                    : (proposal.current_data?.synagogue2_name ?? '—')}
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 space-y-0.5">
              {proposal.proposal_type === 'rabbi_profile_merge' ? (
                <>
                  {proposal.proposed_data?.affiliations_count != null && (
                    <div>Combined affiliations: <span className="font-medium">{String(proposal.proposed_data.affiliations_count)}</span></div>
                  )}
                  {proposal.proposed_data?.photos_count != null && (
                    <div>Combined photos: <span className="font-medium">{String(proposal.proposed_data.photos_count)}</span></div>
                  )}
                  {proposal.proposed_data?.relationships_count != null && Number(proposal.proposed_data.relationships_count) > 0 && (
                    <div>Combined relationships: <span className="font-medium">{String(proposal.proposed_data.relationships_count)}</span></div>
                  )}
                </>
              ) : (
                <>
                  {proposal.proposed_data?.addresses_count != null && (
                    <div>Combined addresses: <span className="font-medium">{String(proposal.proposed_data.addresses_count)}</span></div>
                  )}
                  {proposal.proposed_data?.rabbis_count != null && (
                    <div>Combined rabbi affiliations: <span className="font-medium">{String(proposal.proposed_data.rabbis_count)}</span></div>
                  )}
                  {proposal.proposed_data?.history_count != null && (
                    <div>Combined history entries: <span className="font-medium">{String(proposal.proposed_data.history_count)}</span></div>
                  )}
                  {proposal.proposed_data?.photos_count != null && (
                    <div>Combined photos: <span className="font-medium">{String(proposal.proposed_data.photos_count)}</span></div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Show merged field values */}
          {proposal.proposed_data?.merged_fields && typeof proposal.proposed_data.merged_fields === 'object' && (
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden text-sm">
              <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 py-2">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Merged field values</span>
              </div>
              <table className="w-full">
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60">
                  {Object.entries(proposal.proposed_data.merged_fields as Record<string, unknown>)
                    .filter(([, v]) => v != null && v !== '' && !(Array.isArray(v) && v.length === 0))
                    .map(([field, value]) => (
                      <tr key={field}>
                        <td className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap w-1/3">
                          {FIELD_LABELS[field] ?? field}
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-700 dark:text-gray-300 font-medium">
                          {Array.isArray(value) ? value.join(', ') : String(value)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        /* Standard diff table */
        changedFields.length > 0 && (
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden text-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 w-1/4">Field</th>
                  <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 w-5/12">Current</th>
                  <th className="text-left px-3 py-2 text-xs font-semibold text-gray-900 dark:text-white w-5/12">Proposed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60">
                {changedFields.map(field => {
                  const before = proposal.current_data?.[field]
                  const after  = proposal.proposed_data[field]

                  // Special rendering for link fields in link_edit proposals
                  const isLinkProposal = proposal.proposal_type === 'link_edit'
                  let afterDisplay: React.ReactNode = after != null && after !== ''
                    ? String(after)
                    : <span className="italic font-normal text-gray-400">—</span>

                  if (isLinkProposal && after != null && after !== '') {
                    if (field === 'link_type') {
                      const LINK_TYPE_ICONS: Record<string, string> = {
                        website: '🌐', youtube: '📺', vimeo: '🎬', facebook: '📘',
                        instagram: '📷', twitter: '🐦', wikipedia: '📖', findagrave: '🪦',
                        documentary: '🎥', virtual_tour: '🏛️', historical_doc: '📄',
                        news_article: '📰', podcast: '🎙️', interview: '🎤',
                        obituary: '📜', sermon: '📖', publication: '📚', other: '🔗',
                      }
                      const icon = LINK_TYPE_ICONS[String(after)] ?? '🔗'
                      afterDisplay = `${icon} ${String(after).replace(/_/g, ' ')}`
                    } else if (field === 'url') {
                      afterDisplay = (
                        <a
                          href={String(after)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline break-all"
                        >
                          {String(after)}
                        </a>
                      )
                    }
                  }

                  return (
                    <tr key={field}>
                      <td className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {FIELD_LABELS[field] ?? field}
                      </td>
                      <td className="px-3 py-2 text-xs text-gray-400 dark:text-gray-500">
                        {before != null && before !== '' ? String(before) : <span className="italic">—</span>}
                      </td>
                      <td className="px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white bg-green-50/50 dark:bg-green-900/10">
                        {afterDisplay}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )
      ))}

      {/* Action buttons */}
      {!isRejecting ? (
        <div className="flex gap-2 pt-1">
          <button
            onClick={onApprove}
            disabled={processing}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 border border-green-200 dark:border-green-800 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition"
          >
            {processing ? (
              <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
            ) : (
              <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            )}
            Approve
          </button>
          <button
            onClick={onStartReject}
            disabled={processing}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 border border-red-200 dark:border-red-800 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            Reject
          </button>
        </div>
      ) : (
        /* Inline reject form */
        <div className="space-y-2 pt-1 border-t border-gray-100 dark:border-gray-800">
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">Reviewer note (optional)</p>
          <textarea
            value={rejectNotes}
            onChange={e => onRejectNoteChange(e.target.value)}
            rows={2}
            placeholder="Explain why this proposal was rejected…"
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          />
          <div className="flex gap-2">
            <button
              onClick={onConfirmReject}
              disabled={processing}
              className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition"
            >
              {processing ? 'Rejecting…' : 'Confirm reject'}
            </button>
            <button
              onClick={onCancelReject}
              disabled={processing}
              className="px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Photo card (grid tile) ────────────────────────────────────────────────────

function PhotoCard({
  photo, processing, onView, onApprove, onReject,
}: { photo: PendingImage; processing: boolean; onView: () => void; onApprove: () => void; onReject: () => void }) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden flex flex-col">
      {/* Thumbnail */}
      <button
        onClick={onView}
        className="aspect-square w-full overflow-hidden bg-gray-100 dark:bg-gray-800 relative hover:opacity-90 transition"
        aria-label="View full size"
      >
        {photo.url ? (
          <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-gray-600">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition flex items-end">
          <span className="w-full bg-gradient-to-t from-black/50 to-transparent px-2 py-2 text-white text-xs opacity-0 hover:opacity-100 transition line-clamp-2">
            {photo.caption}
          </span>
        </div>
      </button>

      {/* Info */}
      <div className="px-2.5 py-2 flex-1 space-y-0.5">
        <p className="text-xs font-medium text-gray-900 dark:text-white truncate">{photo.synagogue_name ?? '—'}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{photo.caption}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500">{formatDate(photo.created_at)}</p>
      </div>

      {/* Action buttons */}
      <div className="px-2.5 pb-2.5 flex gap-1.5">
        <button
          onClick={onApprove}
          disabled={processing}
          title="Approve"
          className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs font-medium text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 border border-green-200 dark:border-green-800 disabled:opacity-40 rounded-lg transition"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
          Approve
        </button>
        <button
          onClick={onReject}
          disabled={processing}
          title="Reject & delete"
          className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 border border-red-200 dark:border-red-800 disabled:opacity-40 rounded-lg transition"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          Reject
        </button>
      </div>
    </div>
  )
}

// ── Photo detail modal ────────────────────────────────────────────────────────

function PhotoModal({
  photo, processing, onClose, onApprove, onReject,
}: { photo: PendingImage; processing: boolean; onClose: () => void; onApprove: () => void; onReject: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 flex items-start justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700 gap-3">
          <h2 className="font-semibold text-gray-900 dark:text-white leading-snug flex-1">{photo.caption}</h2>
          <button onClick={onClose} className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition" aria-label="Close">
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          </button>
        </div>

        <div className="px-5 py-4 space-y-4">
          {/* Full image */}
          {photo.url ? (
            <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <img src={photo.url} alt={photo.caption} className="w-full object-contain max-h-80" />
            </div>
          ) : (
            <div className="rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 h-40 flex items-center justify-center text-gray-300 dark:text-gray-600">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z" />
              </svg>
            </div>
          )}

          {/* Metadata grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Synagogue</p>
              {photo.synagogue_id ? (
                <Link href={`/synagogues/${photo.synagogue_id}`} target="_blank" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                  {photo.synagogue_name ?? 'View →'}
                </Link>
              ) : (
                <p className="text-sm text-gray-700 dark:text-gray-300">{photo.synagogue_name ?? '—'}</p>
              )}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Uploaded</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">{formatDate(photo.created_at)}</p>
            </div>
            {photo.photographer && (
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Photographer</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{photo.photographer}</p>
              </div>
            )}
            {(photo.year || photo.date_taken) && (
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">{photo.date_taken ? 'Date Taken' : 'Year'}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{photo.date_taken ? formatDate(photo.date_taken) : photo.year}</p>
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
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Filename</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 truncate" title={photo.original_filename}>{photo.original_filename}</p>
              </div>
            )}
          </div>

          {photo.description && (
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Description</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">{photo.description}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={onApprove}
              disabled={processing}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition"
            >
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              {processing ? 'Approving…' : 'Approve photo'}
            </button>
            <button
              onClick={onReject}
              disabled={processing}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition"
            >
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              {processing ? 'Deleting…' : 'Reject & delete'}
            </button>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center -mt-2">
            Rejecting permanently deletes this photo and removes it from storage.
          </p>
        </div>
      </div>
    </div>
  )
}
