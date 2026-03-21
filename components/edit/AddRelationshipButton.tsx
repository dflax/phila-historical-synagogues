'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { User } from '@supabase/supabase-js'
import AuthModal from '@/components/auth/AuthModal'

// ── Types ─────────────────────────────────────────────────────────────────────

interface Props {
  synagogueId:   string
  synagogueName: string
}

interface SynagogueResult {
  id:           string
  name:         string
  status:       string
  founded_year: number | null
}

// ── Relationship type config ───────────────────────────────────────────────────

const RELATIONSHIP_TYPES = [
  {
    value:       'merged_into',
    icon:        '🔀',
    label:       'Merged into',
    description: (current: string, related: string) =>
      `${current} merged into ${related}`,
  },
  {
    value:       'split_into',
    icon:        '🔱',
    label:       'Split into',
    description: (current: string, related: string) =>
      `${current} split, forming ${related}`,
  },
  {
    value:       'predecessor',
    icon:        '←',
    label:       'Predecessor',
    description: (current: string, related: string) =>
      `${related} came after ${current}`,
  },
  {
    value:       'parent_organization',
    icon:        '⬆️',
    label:       'Parent Organization',
    description: (_current: string, related: string) =>
      `${related} is the parent organization`,
  },
]

const REVERSE_MAP: Record<string, string> = {
  merged_into:         'merged_from',
  merged_from:         'merged_into',
  split_into:          'split_from',
  split_from:          'split_into',
  predecessor:         'successor',
  successor:           'predecessor',
  parent_organization: 'branch_of',
  branch_of:           'parent_organization',
}

function getReverseType(type: string): string {
  return REVERSE_MAP[type] ?? type
}

// ── Style helpers ─────────────────────────────────────────────────────────────

const inputClass =
  'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm'

const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

// ── Component ─────────────────────────────────────────────────────────────────

export default function AddRelationshipButton({ synagogueId, synagogueName }: Props) {
  const supabase = createClientComponentClient()

  const [user,      setUser]      = useState<User | null>(null)
  const [authReady, setAuthReady] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)

  // Steps: 'form' | 'success'
  const [step, setStep] = useState<'form' | 'success'>('form')

  // Search state
  const [searchQuery,       setSearchQuery]       = useState('')
  const [searchResults,     setSearchResults]     = useState<SynagogueResult[]>([])
  const [searching,         setSearching]         = useState(false)
  const [selectedSynagogue, setSelectedSynagogue] = useState<SynagogueResult | null>(null)

  // Form state
  const [relationshipType, setRelationshipType] = useState('')
  const [year,             setYear]             = useState('')
  const [notes,            setNotes]            = useState('')
  const [reason,           setReason]           = useState('')
  const [error,            setError]            = useState<string | null>(null)
  const [loading,          setLoading]          = useState(false)

  // ── Auth ──────────────────────────────────────────────────────────────────

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setAuthReady(true)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session && loginOpen) {
        setLoginOpen(false)
        setModalOpen(true)
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Escape key + scroll lock ───────────────────────────────────────────────

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeModal()
    }
    if (modalOpen) {
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [modalOpen])

  // ── Debounced synagogue search ─────────────────────────────────────────────

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }

    setSearching(true)
    const timer = setTimeout(async () => {
      const { data, error: searchError } = await supabase
        .from('synagogues')
        .select('id, name, status, founded_year')
        .ilike('name', `%${searchQuery.trim()}%`)
        .eq('approved', true)
        .or('deleted.is.null,deleted.eq.false')
        .order('name')
        .limit(20)

      if (searchError) console.error('Synagogue search error:', searchError)
      // Exclude the current synagogue from results
      setSearchResults((data ?? []).filter(s => s.id !== synagogueId))
      setSearching(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery, synagogueId, supabase])

  // ── Helpers ───────────────────────────────────────────────────────────────

  function openModal() {
    setStep('form')
    setSearchQuery('')
    setSearchResults([])
    setSelectedSynagogue(null)
    setRelationshipType('')
    setYear('')
    setNotes('')
    setReason('')
    setError(null)
    setLoading(false)
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
  }

  // ── Submit ────────────────────────────────────────────────────────────────

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!selectedSynagogue) {
      setError('Please select a related synagogue.')
      return
    }
    if (!relationshipType) {
      setError('Please select a relationship type.')
      return
    }
    if (reason.trim().length < 10) {
      setError('Please provide a reason of at least 10 characters.')
      return
    }
    if (year) {
      const y = parseInt(year)
      if (isNaN(y) || y < 1700 || y > 2100) {
        setError('Year must be between 1700 and 2100.')
        return
      }
    }

    setLoading(true)

    const { data: canSubmit, error: rateLimitError } = await supabase
      .rpc('check_proposal_rate_limit', { user_id: user!.id })

    if (rateLimitError || !canSubmit) {
      setError("You've reached your daily proposal limit. Please try again tomorrow.")
      setLoading(false)
      return
    }

    const { error: insertError } = await supabase
      .from('edit_proposals')
      .insert({
        synagogue_id:   synagogueId,
        entity_id:      null,
        proposal_type:  'synagogue_relationship_new',
        proposed_data: {
          synagogue_id:              synagogueId,
          related_synagogue_id:      selectedSynagogue.id,
          relationship_type:         relationshipType,
          relationship_year:         year ? parseInt(year) : null,
          notes:                     notes.trim() || null,
          reverse_relationship_type: getReverseType(relationshipType),
        },
        current_data: {
          synagogue_name:         synagogueName,
          related_synagogue_name: selectedSynagogue.name,
        },
        submitter_note: reason.trim(),
        created_by:     user!.id,
        status:         'pending',
      })

    setLoading(false)

    if (insertError) {
      if (insertError.code === '23503') {
        setError('Your account profile is not fully set up. Please sign out and sign in again.')
      } else {
        setError(`Failed to submit: ${insertError.message}`)
      }
      return
    }

    setStep('success')
  }

  if (!authReady) return null

  // ── Render ────────────────────────────────────────────────────────────────

  const selectedTypeConfig = RELATIONSHIP_TYPES.find(t => t.value === relationshipType)

  return (
    <>
      {/* ── Trigger button ──────────────────────────────────────────────── */}
      {user ? (
        <button
          onClick={openModal}
          className="flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition"
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Relationship
        </button>
      ) : (
        <button
          onClick={() => setLoginOpen(true)}
          className="flex items-center gap-1.5 text-sm text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Sign in to add relationships
        </button>
      )}

      {/* ── Modal ───────────────────────────────────────────────────────── */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Add organizational relationship"
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-700">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  {step === 'form' ? 'Add Organizational Relationship' : 'Proposal Submitted'}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">{synagogueName}</p>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition flex-shrink-0 ml-4"
                aria-label="Close"
              >
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5">

              {/* ── Form ────────────────────────────────────────────────── */}
              {step === 'form' && (
                <form onSubmit={handleSubmit} className="space-y-5">

                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Record historical organizational connections such as mergers, splits, or succession.
                    Both synagogues will be linked automatically.
                  </p>

                  {error && (
                    <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-3 py-2 rounded-lg">
                      {error}
                    </div>
                  )}

                  {/* ── Related synagogue search ─────────────────────── */}
                  <div>
                    <label htmlFor="rel-search" className={labelClass}>
                      Related synagogue <span className="text-red-500" aria-hidden="true">*</span>
                    </label>

                    {selectedSynagogue ? (
                      <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{selectedSynagogue.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 capitalize mt-0.5">
                            {selectedSynagogue.status}
                            {selectedSynagogue.founded_year && ` · Founded ${selectedSynagogue.founded_year}`}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => { setSelectedSynagogue(null); setSearchQuery('') }}
                          className="text-xs text-blue-600 dark:text-blue-400 hover:underline ml-3 flex-shrink-0"
                        >
                          Change
                        </button>
                      </div>
                    ) : (
                      <>
                        <input
                          id="rel-search"
                          type="text"
                          autoFocus
                          value={searchQuery}
                          onChange={e => setSearchQuery(e.target.value)}
                          placeholder="Search by synagogue name…"
                          className={inputClass}
                        />

                        {searching && (
                          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Searching…</p>
                        )}

                        {!searching && searchResults.length > 0 && (
                          <div className="mt-1 border border-gray-200 dark:border-gray-600 rounded-lg divide-y divide-gray-100 dark:divide-gray-700 max-h-52 overflow-y-auto">
                            {searchResults.map(syn => (
                              <button
                                key={syn.id}
                                type="button"
                                onClick={() => setSelectedSynagogue(syn)}
                                className="w-full text-left px-4 py-3 hover:bg-blue-50 dark:hover:bg-gray-700 transition"
                              >
                                <div className="font-medium text-gray-900 dark:text-white text-sm">{syn.name}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 capitalize">
                                  {syn.status}
                                  {syn.founded_year && ` · Founded ${syn.founded_year}`}
                                </div>
                              </button>
                            ))}
                          </div>
                        )}

                        {!searching && searchQuery.trim() && searchResults.length === 0 && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-2">
                            No synagogues found. Try a different search term.
                          </p>
                        )}
                      </>
                    )}
                  </div>

                  {/* ── Relationship type ────────────────────────────── */}
                  <div>
                    <label className={labelClass}>
                      Relationship type <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <div className="space-y-2">
                      {RELATIONSHIP_TYPES.map(rt => (
                        <label
                          key={rt.value}
                          className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition ${
                            relationshipType === rt.value
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-600'
                              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                          }`}
                        >
                          <input
                            type="radio"
                            name="relationship_type"
                            value={rt.value}
                            checked={relationshipType === rt.value}
                            onChange={() => setRelationshipType(rt.value)}
                            className="mt-0.5 flex-shrink-0 accent-blue-600"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 text-sm font-medium text-gray-900 dark:text-white">
                              <span aria-hidden="true">{rt.icon}</span>
                              {rt.label}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                              {rt.description(
                                synagogueName,
                                selectedSynagogue?.name ?? '[selected synagogue]',
                              )}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* ── Relationship preview ─────────────────────────── */}
                  {selectedSynagogue && relationshipType && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 text-sm">
                      <div className="font-medium text-blue-900 dark:text-blue-100 mb-2">This will create:</div>
                      <ol className="space-y-1 text-blue-800 dark:text-blue-200 text-xs list-decimal list-inside">
                        <li>
                          <span className="font-medium">{synagogueName}</span>
                          {' → '}{relationshipType.replace(/_/g, ' ')}{' → '}
                          <span className="font-medium">{selectedSynagogue.name}</span>
                          {year && ` (${year})`}
                        </li>
                        <li>
                          <span className="font-medium">{selectedSynagogue.name}</span>
                          {' → '}{getReverseType(relationshipType).replace(/_/g, ' ')}{' → '}
                          <span className="font-medium">{synagogueName}</span>
                          {year && ` (${year})`}
                          {' '}
                          <span className="text-blue-500 dark:text-blue-400">(automatic)</span>
                        </li>
                      </ol>
                    </div>
                  )}

                  {/* ── Year ─────────────────────────────────────────── */}
                  <div>
                    <label htmlFor="rel-year" className={labelClass}>
                      Year <span className="text-xs font-normal text-gray-400">(optional)</span>
                    </label>
                    <input
                      id="rel-year"
                      type="number"
                      min="1700"
                      max="2100"
                      value={year}
                      onChange={e => setYear(e.target.value)}
                      className={inputClass}
                      placeholder="e.g. 1985"
                    />
                  </div>

                  {/* ── Notes ────────────────────────────────────────── */}
                  <div>
                    <label htmlFor="rel-notes" className={labelClass}>
                      Notes <span className="text-xs font-normal text-gray-400">(optional)</span>
                    </label>
                    <textarea
                      id="rel-notes"
                      rows={3}
                      value={notes}
                      onChange={e => setNotes(e.target.value.slice(0, 500))}
                      className={inputClass}
                      placeholder="Additional context about this organizational change…"
                    />
                    {notes.length > 450 && (
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{notes.length}/500</p>
                    )}
                  </div>

                  {/* ── Reason ───────────────────────────────────────── */}
                  <div>
                    <label htmlFor="rel-reason" className={labelClass}>
                      Why are you adding this relationship?{' '}
                      <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="rel-reason"
                      rows={2}
                      required
                      value={reason}
                      onChange={e => setReason(e.target.value.slice(0, 1000))}
                      className={inputClass}
                      placeholder="Why are you adding this relationship? Source of information?"
                    />
                    {reason.length > 900 && (
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{reason.length}/1000</p>
                    )}
                  </div>

                  {/* ── Footer ───────────────────────────────────────── */}
                  <div className="flex gap-3 pt-1">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 px-4 rounded-lg font-medium text-sm transition"
                    >
                      {loading ? 'Submitting…' : 'Submit Proposal'}
                    </button>
                  </div>

                  <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
                    Proposals are reviewed by editors before being applied.
                  </p>
                </form>
              )}

              {/* ── Success ─────────────────────────────────────────── */}
              {step === 'success' && (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Relationship Proposed
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Your organizational relationship has been submitted for editor review.
                      Both relationships will be created when approved.
                    </p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-medium text-sm transition"
                  >
                    Close
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ── Login prompt ─────────────────────────────────────────────────── */}
      <AuthModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        initialView="login"
      />
    </>
  )
}
