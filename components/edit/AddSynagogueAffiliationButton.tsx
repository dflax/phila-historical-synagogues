'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { User } from '@supabase/supabase-js'
import AuthModal from '@/components/auth/AuthModal'

// ── Types ─────────────────────────────────────────────────────────────────────

interface Props {
  rabbiId:   string
  rabbiName: string
}

interface SynagogueResult {
  id:           string
  name:         string
  status:       string

  founded_year: number | null
  closed_year:  number | null
}

// ── Style helpers ─────────────────────────────────────────────────────────────

const inputClass =
  'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm'

const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

// ── Component ─────────────────────────────────────────────────────────────────

export default function AddSynagogueAffiliationButton({ rabbiId, rabbiName }: Props) {
  const supabase = createClientComponentClient()

  const [user,      setUser]      = useState<User | null>(null)
  const [authReady, setAuthReady] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)

  // Steps: 1 = search, 2 = details, 3 = success
  const [step, setStep] = useState(1)

  // Step 1 state
  const [searchQuery,        setSearchQuery]        = useState('')
  const [searchResults,      setSearchResults]      = useState<SynagogueResult[]>([])
  const [searching,          setSearching]          = useState(false)
  const [selectedSynagogue,  setSelectedSynagogue]  = useState<SynagogueResult | null>(null)

  // Step 2 state
  const [title,            setTitle]            = useState('')
  const [startYear,        setStartYear]        = useState('')
  const [endYear,          setEndYear]          = useState('')
  const [notes,            setNotes]            = useState('')
  const [reason,           setReason]           = useState('')
  const [duplicateWarning, setDuplicateWarning] = useState<string | null>(null)
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
      const { data, error } = await supabase
        .from('synagogues')
        .select('id, name, status, founded_year, closed_year')
        .ilike('name', `%${searchQuery.trim()}%`)
        .eq('approved', true)
        .is('deleted', null)
        .order('name')
        .limit(20)

      if (error) console.error('Synagogue search error:', error)
      setSearchResults(data ?? [])
      setSearching(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery, supabase])

  // ── Duplicate check when synagogue selected ────────────────────────────────

  useEffect(() => {
    if (!selectedSynagogue) return
    setDuplicateWarning(null)

    const check = async () => {
      const { data: existing } = await supabase
        .from('rabbis')
        .select('id, start_year, end_year, title')
        .eq('rabbi_profile_id', rabbiId)
        .eq('synagogue_id', selectedSynagogue.id)
        .or('deleted.is.null,deleted.eq.false')

      if (existing && existing.length > 0) {
        setDuplicateWarning(
          `${rabbiName} already has ${existing.length} affiliation${existing.length !== 1 ? 's' : ''} with ${selectedSynagogue.name}. You can still add another if this covers a different time period.`
        )
      }
    }

    check()
  }, [selectedSynagogue, rabbiId, rabbiName, supabase])

  // ── Helpers ───────────────────────────────────────────────────────────────

  function openModal() {
    setStep(1)
    setSearchQuery('')
    setSearchResults([])
    setSelectedSynagogue(null)
    setTitle('')
    setStartYear('')
    setEndYear('')
    setNotes('')
    setReason('')
    setDuplicateWarning(null)
    setError(null)
    setLoading(false)
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
  }

  function selectSynagogue(syn: SynagogueResult) {
    setSelectedSynagogue(syn)
    setStep(2)
  }

  // ── Submit ────────────────────────────────────────────────────────────────

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!reason.trim()) {
      setError('Please explain why you are adding this affiliation.')
      return
    }

    if (startYear && endYear && parseInt(endYear) < parseInt(startYear)) {
      setError('End year must be greater than or equal to start year.')
      return
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
        synagogue_id:   selectedSynagogue!.id,
        entity_id:      rabbiId,
        proposal_type:  'rabbi_affiliation_new',
        proposed_data: {
          rabbi_profile_id: rabbiId,
          synagogue_id:     selectedSynagogue!.id,
          title:            title.trim() || null,
          start_year:       startYear ? parseInt(startYear) : null,
          end_year:         endYear   ? parseInt(endYear)   : null,
          notes:            notes.trim() || null,
        },
        current_data: {
          rabbi_name:     rabbiName,
          synagogue_name: selectedSynagogue!.name,
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
        setError(insertError.message)
      }
      return
    }

    setStep(3)
  }

  if (!authReady) return null

  // ── Render ────────────────────────────────────────────────────────────────

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
          Add Synagogue Affiliation
        </button>
      ) : (
        <button
          onClick={() => setLoginOpen(true)}
          className="flex items-center gap-1.5 text-sm text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Sign in to add affiliations
        </button>
      )}

      {/* ── Modal ───────────────────────────────────────────────────────── */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Add synagogue affiliation"
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-700">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  {step === 1 ? 'Add Synagogue Affiliation' : step === 2 ? 'Affiliation Details' : 'Proposal Submitted'}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">{rabbiName}</p>
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

              {/* ── Step 1: Search ─────────────────────────────────────── */}
              {step === 1 && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Search for a synagogue to affiliate with this rabbi.
                  </p>

                  <div>
                    <label htmlFor="syn-search" className={labelClass}>Search for Synagogue</label>
                    <input
                      id="syn-search"
                      type="text"
                      autoFocus
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Type synagogue name…"
                      className={inputClass}
                    />
                  </div>

                  {searching && (
                    <p className="text-sm text-gray-400 dark:text-gray-500">Searching…</p>
                  )}

                  {!searching && searchResults.length > 0 && (
                    <div className="border border-gray-200 dark:border-gray-600 rounded-lg divide-y divide-gray-100 dark:divide-gray-700 max-h-80 overflow-y-auto">
                      {searchResults.map(syn => (
                        <button
                          key={syn.id}
                          type="button"
                          onClick={() => selectSynagogue(syn)}
                          className="w-full text-left px-4 py-3 hover:bg-blue-50 dark:hover:bg-gray-700 transition"
                        >
                          <div className="font-medium text-gray-900 dark:text-white text-sm">
                            {syn.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 capitalize">
                            {syn.status}
                            {syn.founded_year && ` · Founded ${syn.founded_year}`}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {!searching && searchQuery.trim() && searchResults.length === 0 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                      No synagogues found. Try a different search term.
                    </p>
                  )}
                </div>
              )}

              {/* ── Step 2: Details form ───────────────────────────────── */}
              {step === 2 && selectedSynagogue && (
                <form onSubmit={handleSubmit} className="space-y-4">

                  {error && (
                    <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-3 py-2 rounded-lg">
                      {error}
                    </div>
                  )}

                  {/* Summary card */}
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 text-sm">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Adding affiliation:</div>
                    <div className="font-semibold text-gray-900 dark:text-white">{rabbiName}</div>
                    <div className="text-gray-500 dark:text-gray-400">to {selectedSynagogue.name}</div>
                  </div>

                  {/* Duplicate warning */}
                  {duplicateWarning && (
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 flex gap-2">
                      <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <p className="text-sm text-amber-800 dark:text-amber-200">{duplicateWarning}</p>
                    </div>
                  )}

                  {/* Title */}
                  <div>
                    <label htmlFor="aff-title" className={labelClass}>Title</label>
                    <input
                      id="aff-title"
                      type="text"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      className={inputClass}
                      placeholder="e.g. Rabbi, Assistant Rabbi, Cantor, Hazzan"
                    />
                  </div>

                  {/* Years */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="aff-start-year" className={labelClass}>Start year</label>
                      <input
                        id="aff-start-year"
                        type="number"
                        min="1700"
                        max={new Date().getFullYear()}
                        value={startYear}
                        onChange={e => setStartYear(e.target.value)}
                        className={inputClass}
                        placeholder="e.g. 1935"
                      />
                    </div>
                    <div>
                      <label htmlFor="aff-end-year" className={labelClass}>End year</label>
                      <input
                        id="aff-end-year"
                        type="number"
                        min="1700"
                        max={new Date().getFullYear()}
                        value={endYear}
                        onChange={e => setEndYear(e.target.value)}
                        className={inputClass}
                        placeholder="e.g. 1962"
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label htmlFor="aff-notes" className={labelClass}>Notes (optional)</label>
                    <textarea
                      id="aff-notes"
                      rows={2}
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      className={inputClass}
                      placeholder="Additional information about this affiliation"
                    />
                  </div>

                  {/* Reason (required) */}
                  <div>
                    <label htmlFor="aff-reason" className={labelClass}>
                      Why are you adding this affiliation?{' '}
                      <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="aff-reason"
                      rows={2}
                      required
                      value={reason}
                      onChange={e => setReason(e.target.value)}
                      className={inputClass}
                      placeholder="Source or context (e.g. 'Listed in 1948 Philadelphia Jewish Year Book')"
                    />
                  </div>

                  {/* Footer buttons */}
                  <div className="flex gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => { setStep(1); setSelectedSynagogue(null); setError(null) }}
                      className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      ← Back
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

              {/* ── Step 3: Success ────────────────────────────────────── */}
              {step === 3 && selectedSynagogue && (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-900 dark:text-white font-semibold">Proposal Submitted</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your proposal to affiliate <span className="font-medium">{rabbiName}</span> with <span className="font-medium">{selectedSynagogue.name}</span> has been submitted for review.
                  </p>
                  <button
                    onClick={closeModal}
                    className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-medium text-sm transition"
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
