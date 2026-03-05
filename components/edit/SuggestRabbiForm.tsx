'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface Props {
  synagogueId: string
  userId: string
  onSuccess: () => void
}

export default function SuggestRabbiForm({ synagogueId, userId, onSuccess }: Props) {
  const supabase = createClientComponentClient()

  const [name,          setName]          = useState('')
  const [title,         setTitle]         = useState('')
  const [startYear,     setStartYear]     = useState('')
  const [endYear,       setEndYear]       = useState('')
  const [notes,         setNotes]         = useState('')
  const [submitterNote, setSubmitterNote] = useState('')

  const [error,   setError]   = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    // Validate year ordering
    if (startYear && endYear && parseInt(endYear) < parseInt(startYear)) {
      setError('End year must be greater than or equal to start year.')
      return
    }

    setLoading(true)

    // ── Rate limit: max 10 proposals per 24 hours ─────────────────────────────
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    const { count, error: countError } = await supabase
      .from('edit_proposals')
      .select('*', { count: 'exact', head: true })
      .eq('created_by', userId)
      .gte('created_at', cutoff)

    if (countError) {
      setError(`Could not check submission limit: [${countError.code}] ${countError.message}`)
      setLoading(false)
      return
    }

    if ((count ?? 0) >= 10) {
      setError('You\'ve reached the limit of 10 proposals per day. Please try again tomorrow.')
      setLoading(false)
      return
    }

    // ── Build proposed_data ───────────────────────────────────────────────────
    const proposed: Record<string, unknown> = {
      name: name.trim(),
    }

    if (title)     proposed.title      = title.trim()
    if (startYear) proposed.start_year = parseInt(startYear)
    if (endYear)   proposed.end_year   = parseInt(endYear)
    if (notes)     proposed.notes      = notes.trim()

    // ── Submit to edit_proposals ──────────────────────────────────────────────
    const { error: insertError } = await supabase
      .from('edit_proposals')
      .insert({
        synagogue_id:   synagogueId,
        proposal_type:  'rabbi_new',
        proposed_data:  proposed,
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

      {/* Name */}
      <div>
        <label htmlFor="rabbi-name" className={labelClass}>
          Name <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id="rabbi-name"
          type="text"
          required
          value={name}
          onChange={e => setName(e.target.value)}
          className={inputClass}
          placeholder="e.g. Abraham Goldstein"
        />
      </div>

      {/* Title */}
      <div>
        <label htmlFor="rabbi-title" className={labelClass}>Title</label>
        <input
          id="rabbi-title"
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
          <label htmlFor="rabbi-start-year" className={labelClass}>From year</label>
          <input
            id="rabbi-start-year"
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
          <label htmlFor="rabbi-end-year" className={labelClass}>To year</label>
          <input
            id="rabbi-end-year"
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
        <label htmlFor="rabbi-notes" className={labelClass}>Notes</label>
        <textarea
          id="rabbi-notes"
          rows={2}
          value={notes}
          onChange={e => setNotes(e.target.value)}
          className={inputClass}
          placeholder="Additional information about this rabbi"
        />
      </div>

      {/* Submitter note */}
      <div>
        <label htmlFor="rabbi-submitter-note" className={labelClass}>Why are you adding this rabbi?</label>
        <textarea
          id="rabbi-submitter-note"
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
        {loading ? 'Submitting…' : 'Submit rabbi proposal'}
      </button>

      <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
        Proposals are reviewed by editors before being applied.
      </p>
    </form>
  )
}
