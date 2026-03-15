'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const STATUS_OPTIONS = [
  { value: 'active',  label: 'Active'  },
  { value: 'closed',  label: 'Closed'  },
  { value: 'merged',  label: 'Merged'  },
  { value: 'unknown', label: 'Unknown' },
]

interface Props {
  userId: string
  onSuccess: () => void
}

export default function CreateSynagogueForm({ userId, onSuccess }: Props) {
  const supabase = createClientComponentClient()

  const [name,         setName]         = useState('')
  const [status,       setStatus]       = useState('unknown')
  const [foundedYear,  setFoundedYear]  = useState('')
  const [closedYear,   setClosedYear]   = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [note,         setNote]         = useState('')

  const [error,   setError]   = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Closed year field is relevant for Closed or Merged synagogues
  const closedYearApplicable = status === 'closed' || status === 'merged'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (name.trim().length < 3) {
      setError('Synagogue name must be at least 3 characters.')
      return
    }

    const fYear = foundedYear ? parseInt(foundedYear) : null
    const cYear = closedYear  ? parseInt(closedYear)  : null

    if (status === 'closed' && !cYear) {
      setError('Closed year is required when status is Closed.')
      return
    }

    if (fYear && cYear && cYear < fYear) {
      setError('Closed year must be greater than or equal to founded year.')
      return
    }

    setLoading(true)

    // Rate limit: max 10 proposals per 24 hours
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    const { count, error: countError } = await supabase
      .from('edit_proposals')
      .select('*', { count: 'exact', head: true })
      .eq('created_by', userId)
      .gte('created_at', cutoff)

    if (countError) {
      setError(`Could not check submission limit: ${countError.message}`)
      setLoading(false)
      return
    }

    if ((count ?? 0) >= 10) {
      setError("You've reached the limit of 10 proposals per day. Please try again tomorrow.")
      setLoading(false)
      return
    }

    const { error: insertError } = await supabase
      .from('edit_proposals')
      .insert({
        synagogue_id:   null,
        proposal_type:  'synagogue_new',
        proposed_data: {
          name:         name.trim(),
          status,
          founded_year: fYear,
          closed_year:  cYear,
          neighborhood: neighborhood.trim() || null,
        },
        current_data:   null,
        submitter_note: note.trim() || null,
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
  const inputDisabledClass =
    'w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-600 placeholder-gray-300 dark:placeholder-gray-700 cursor-not-allowed text-sm'
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
        <label htmlFor="new-name" className={labelClass}>
          Synagogue name{' '}
          <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id="new-name"
          type="text"
          required
          value={name}
          onChange={e => setName(e.target.value)}
          className={inputClass}
          placeholder="e.g. Congregation Beth Shalom"
        />
      </div>

      {/* Status */}
      <div>
        <label htmlFor="new-status" className={labelClass}>
          Status{' '}
          <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <select
          id="new-status"
          value={status}
          onChange={e => setStatus(e.target.value)}
          className={inputClass}
        >
          {STATUS_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Founded / Closed years */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="new-founded" className={labelClass}>Founded year</label>
          <input
            id="new-founded"
            type="number"
            min="1600"
            max={new Date().getFullYear()}
            value={foundedYear}
            onChange={e => setFoundedYear(e.target.value)}
            className={inputClass}
            placeholder="e.g. 1892"
          />
        </div>
        <div>
          <label htmlFor="new-closed" className={labelClass}>
            Closed year
            {status === 'closed' && (
              <span className="text-red-500 ml-1" aria-hidden="true">*</span>
            )}
          </label>
          <input
            id="new-closed"
            type="number"
            min="1600"
            max={new Date().getFullYear()}
            value={closedYear}
            onChange={e => setClosedYear(e.target.value)}
            className={closedYearApplicable ? inputClass : inputDisabledClass}
            placeholder="if applicable"
            disabled={!closedYearApplicable}
          />
        </div>
      </div>

      {/* Neighborhood */}
      <div>
        <label htmlFor="new-neighborhood" className={labelClass}>Neighborhood</label>
        <input
          id="new-neighborhood"
          type="text"
          value={neighborhood}
          onChange={e => setNeighborhood(e.target.value)}
          className={inputClass}
          placeholder="e.g. Strawberry Mansion"
        />
      </div>

      {/* Note */}
      <div>
        <label htmlFor="new-note" className={labelClass}>
          Why are you adding this synagogue?
        </label>
        <textarea
          id="new-note"
          rows={3}
          value={note}
          onChange={e => setNote(e.target.value)}
          className={inputClass}
          placeholder="Describe your source (e.g. 'Found in 1923 Philadelphia Jewish Exponent directory listing')"
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
        Proposals are reviewed by editors before the synagogue is added to the directory.
      </p>
    </form>
  )
}
