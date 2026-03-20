'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface Props {
  synagogueId: string
  userId: string
  onSuccess: () => void
}

const ENTRY_TYPE_OPTIONS = [
  { value: 'general',      label: 'General' },
  { value: 'ethnic_origin', label: 'Ethnic Origin' },
  { value: 'event',        label: 'Event' },
  { value: 'building',     label: 'Building' },
  { value: 'merger',       label: 'Merger' },
]

export default function SuggestHistoryForm({ synagogueId, userId, onSuccess }: Props) {
  const supabase = createClientComponentClient()

  const [content,        setContent]        = useState('')
  const [entryType,      setEntryType]      = useState('general')
  const [year,           setYear]           = useState('')
  const [yearRangeStart, setYearRangeStart] = useState('')
  const [yearRangeEnd,   setYearRangeEnd]   = useState('')
  const [circa,          setCirca]          = useState(false)
  const [source,         setSource]         = useState('')
  const [sourceUrl,      setSourceUrl]      = useState('')
  const [submitterNote,  setSubmitterNote]  = useState('')

  const [error,   setError]   = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (content.trim().length < 20) {
      setError('History entry must be at least 20 characters.')
      return
    }

    if (yearRangeStart && yearRangeEnd && parseInt(yearRangeEnd) < parseInt(yearRangeStart)) {
      setError('Range end year must be greater than or equal to range start year.')
      return
    }

    if (sourceUrl) {
      try {
        new URL(sourceUrl)
      } catch {
        setError('Source URL must be a valid URL (e.g. https://example.com).')
        return
      }
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

    // ── Build proposed_data ───────────────────────────────────────────────────
    const proposed: Record<string, unknown> = {
      content:    content.trim(),
      entry_type: entryType,
      circa,
    }

    if (year)           proposed.year             = parseInt(year)
    if (yearRangeStart) proposed.year_range_start = parseInt(yearRangeStart)
    if (yearRangeEnd)   proposed.year_range_end   = parseInt(yearRangeEnd)
    if (source)         proposed.source           = source.trim()
    if (sourceUrl)      proposed.source_url       = sourceUrl.trim()

    // ── Submit to edit_proposals ──────────────────────────────────────────────
    const { error: insertError } = await supabase
      .from('edit_proposals')
      .insert({
        synagogue_id:   synagogueId,
        proposal_type:  'history_new',
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

      {/* Content */}
      <div>
        <label htmlFor="history-content" className={labelClass}>
          History entry <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <textarea
          id="history-content"
          required
          rows={4}
          value={content}
          onChange={e => setContent(e.target.value)}
          className={inputClass}
          placeholder="Share a historical fact, story, or detail about this synagogue"
        />
        {content.length > 0 && content.length < 20 && (
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
            {20 - content.length} more character{20 - content.length !== 1 ? 's' : ''} required
          </p>
        )}
      </div>

      {/* Entry type */}
      <div>
        <label htmlFor="history-entry-type" className={labelClass}>Category</label>
        <select
          id="history-entry-type"
          value={entryType}
          onChange={e => setEntryType(e.target.value)}
          className={inputClass}
        >
          {ENTRY_TYPE_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Single year */}
      <div>
        <label htmlFor="history-year" className={labelClass}>Year</label>
        <input
          id="history-year"
          type="number"
          min="1700"
          max={new Date().getFullYear()}
          value={year}
          onChange={e => setYear(e.target.value)}
          className={inputClass}
          placeholder="e.g. 1923"
        />
      </div>

      {/* Year range */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="history-range-start" className={labelClass}>Range start</label>
          <input
            id="history-range-start"
            type="number"
            min="1700"
            max={new Date().getFullYear()}
            value={yearRangeStart}
            onChange={e => setYearRangeStart(e.target.value)}
            className={inputClass}
            placeholder="e.g. 1910"
          />
        </div>
        <div>
          <label htmlFor="history-range-end" className={labelClass}>Range end</label>
          <input
            id="history-range-end"
            type="number"
            min="1700"
            max={new Date().getFullYear()}
            value={yearRangeEnd}
            onChange={e => setYearRangeEnd(e.target.value)}
            className={inputClass}
            placeholder="e.g. 1955"
          />
        </div>
      </div>

      {/* Circa */}
      <label className="flex items-center gap-2.5 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={circa}
          onChange={e => setCirca(e.target.checked)}
          className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm text-gray-700 dark:text-gray-300">Date is approximate (circa)</span>
      </label>

      {/* Source */}
      <div>
        <label htmlFor="history-source" className={labelClass}>Source</label>
        <input
          id="history-source"
          type="text"
          value={source}
          onChange={e => setSource(e.target.value)}
          className={inputClass}
          placeholder="Where did you learn this? (e.g. Philadelphia Jewish Exponent, March 1923)"
        />
      </div>

      {/* Source URL */}
      <div>
        <label htmlFor="history-source-url" className={labelClass}>Source URL</label>
        <input
          id="history-source-url"
          type="url"
          value={sourceUrl}
          onChange={e => setSourceUrl(e.target.value)}
          className={inputClass}
          placeholder="https://…"
        />
      </div>

      {/* Submitter note */}
      <div>
        <label htmlFor="history-submitter-note" className={labelClass}>Why are you adding this?</label>
        <textarea
          id="history-submitter-note"
          rows={2}
          value={submitterNote}
          onChange={e => setSubmitterNote(e.target.value)}
          className={inputClass}
          placeholder="Any additional context for the editors"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 px-4 rounded-lg font-medium text-sm transition"
      >
        {loading ? 'Submitting…' : 'Submit history proposal'}
      </button>

      <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
        Proposals are reviewed by editors before being applied.
      </p>
    </form>
  )
}
