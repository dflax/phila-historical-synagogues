'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import ClergyCategorySelect, { type ClergyPersonType } from '@/components/common/ClergyCategorySelect'

interface Props {
  synagogueId: string
  userId: string
  onSuccess: () => void
}

export default function SuggestRabbiForm({ synagogueId, userId, onSuccess }: Props) {
  const supabase = createClientComponentClient()

  const [canonicalName,   setCanonicalName]   = useState('')
  const [personType,      setPersonType]      = useState<ClergyPersonType>('rabbi')
  const [affTitle,        setAffTitle]        = useState('')
  const [startYear,       setStartYear]       = useState('')
  const [endYear,         setEndYear]         = useState('')
  const [notes,           setNotes]           = useState('')
  const [submitterNote,   setSubmitterNote]   = useState('')

  const [error,   setError]   = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (canonicalName.trim().length < 2) {
      setError('Full name must be at least 2 characters.')
      return
    }

    if (startYear && endYear && parseInt(endYear) < parseInt(startYear)) {
      setError('End year must be greater than or equal to start year.')
      return
    }

    setLoading(true)

    // ── Rate limit check ──────────────────────────────────────────────────────
    const { data: canSubmit, error: rateLimitError } = await supabase
      .rpc('check_proposal_rate_limit', { user_id: userId })

    if (rateLimitError || !canSubmit) {
      setError("You've reached your daily proposal limit. Please try again tomorrow.")
      setLoading(false)
      return
    }

    // ── Submit to edit_proposals ──────────────────────────────────────────────
    const { error: insertError } = await supabase
      .from('edit_proposals')
      .insert({
        synagogue_id:   synagogueId,
        proposal_type:  'rabbi_profile_new',
        proposed_data: {
          canonical_name:          canonicalName.trim(),
          person_type:             personType,
          affiliation_title:       affTitle.trim() || null,
          affiliation_start_year:  startYear ? parseInt(startYear) : null,
          affiliation_end_year:    endYear   ? parseInt(endYear)   : null,
          affiliation_notes:       notes.trim() || null,
        },
        submitter_note: submitterNote.trim() || null,
        created_by:     userId,
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

    onSuccess()
  }

  const inputClass =
    'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm'
  const labelClass =
    'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-3 py-2 rounded-lg">
          {error}
        </div>
      )}

      {/* Full name */}
      <div>
        <label htmlFor="leader-name" className={labelClass}>
          Full name <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id="leader-name"
          type="text"
          required
          value={canonicalName}
          onChange={e => setCanonicalName(e.target.value)}
          className={inputClass}
          placeholder="e.g. Abraham Goldstein"
        />
      </div>

      {/* Person type */}
      <div>
        <label htmlFor="leader-person-type" className={labelClass}>
          Type of leader <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <ClergyCategorySelect
          id="leader-person-type"
          value={personType}
          onChange={setPersonType}
          required
          className={inputClass}
        />
      </div>

      {/* Role title */}
      <div>
        <label htmlFor="leader-title" className={labelClass}>Role title</label>
        <input
          id="leader-title"
          type="text"
          value={affTitle}
          onChange={e => setAffTitle(e.target.value)}
          className={inputClass}
          placeholder="e.g. Senior Rabbi, Assistant Rabbi, Cantor"
        />
      </div>

      {/* Years at this synagogue */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="leader-start-year" className={labelClass}>Served from</label>
          <input
            id="leader-start-year"
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
          <label htmlFor="leader-end-year" className={labelClass}>Served until</label>
          <input
            id="leader-end-year"
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
        <label htmlFor="leader-notes" className={labelClass}>Notes</label>
        <textarea
          id="leader-notes"
          rows={2}
          value={notes}
          onChange={e => setNotes(e.target.value)}
          className={inputClass}
          placeholder="Additional information about this person's role"
        />
      </div>

      {/* Submitter note */}
      <div>
        <label htmlFor="leader-submitter-note" className={labelClass}>Why are you adding this person?</label>
        <textarea
          id="leader-submitter-note"
          rows={2}
          value={submitterNote}
          onChange={e => setSubmitterNote(e.target.value)}
          className={inputClass}
          placeholder="Source or context (e.g. 'Listed in 1948 Philadelphia Jewish Year Book')"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 px-4 rounded-lg font-medium text-sm transition"
      >
        {loading ? 'Submitting…' : 'Submit for review'}
      </button>

      <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
        Proposals are reviewed by editors before being applied.
      </p>
    </form>
  )
}
