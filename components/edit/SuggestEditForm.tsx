'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface SynagogueSnapshot {
  id: string
  name: string
  founded_year: number | null
  founded_text: string | null
  closed_year: number | null
  status: string
  neighborhood: string | null
}

interface Props {
  synagogue: SynagogueSnapshot
  userId: string
  onSuccess: () => void
}

const STATUS_OPTIONS = [
  { value: 'active',  label: 'Active'  },
  { value: 'closed',  label: 'Closed'  },
  { value: 'merged',  label: 'Merged'  },
  { value: 'unknown', label: 'Unknown' },
]

export default function SuggestEditForm({ synagogue, userId, onSuccess }: Props) {
  const supabase = createClientComponentClient()

  // Form fields — pre-filled from current data
  const [name,         setName]         = useState(synagogue.name)
  const [foundedYear,  setFoundedYear]  = useState(synagogue.founded_year?.toString() ?? '')
  const [closedYear,   setClosedYear]   = useState(synagogue.closed_year?.toString() ?? '')
  const [status,       setStatus]       = useState(synagogue.status)
  const [neighborhood, setNeighborhood] = useState(synagogue.neighborhood ?? '')
  const [note,         setNote]         = useState('')

  const [error,   setError]   = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!note.trim()) {
      setError('Please explain what you\'re changing and why.')
      return
    }

    setLoading(true)

    // ── Rate limit: max 10 proposals per 24 hours ─────────────────────────────
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    console.log('[SuggestEditForm] rate-limit check — userId:', userId, 'cutoff:', cutoff)
    const { count, error: countError } = await supabase
      .from('edit_proposals')
      .select('*', { count: 'exact', head: true })
      .eq('created_by', userId)
      .gte('created_at', cutoff)
    console.log('[SuggestEditForm] rate-limit response — count:', count, 'error:', countError)

    if (countError) {
      setError(`Could not check submission limit: [${countError.code}] ${countError.message} (hint: ${countError.hint ?? 'none'}, details: ${countError.details ?? 'none'})`)
      setLoading(false)
      return
    }

    if ((count ?? 0) >= 10) {
      setError('You\'ve reached the limit of 10 edit proposals per day. Please try again tomorrow.')
      setLoading(false)
      return
    }

    // ── Build proposed_data: only include changed fields ──────────────────────
    const proposed: Record<string, unknown> = {}

    if (name.trim() !== synagogue.name)
      proposed.name = name.trim()

    const newFoundedYear = foundedYear ? parseInt(foundedYear) : null
    if (newFoundedYear !== synagogue.founded_year)
      proposed.founded_year = newFoundedYear

    const newClosedYear = closedYear ? parseInt(closedYear) : null
    if (newClosedYear !== synagogue.closed_year)
      proposed.closed_year = newClosedYear

    if (status !== synagogue.status)
      proposed.status = status

    const newNeighborhood = neighborhood.trim() || null
    if (newNeighborhood !== synagogue.neighborhood)
      proposed.neighborhood = newNeighborhood

    if (Object.keys(proposed).length === 0) {
      setError('No changes detected. Please modify at least one field.')
      setLoading(false)
      return
    }

    // ── Submit to edit_proposals ──────────────────────────────────────────────
    const { error: insertError } = await supabase
      .from('edit_proposals')
      .insert({
        synagogue_id:   synagogue.id,
        proposal_type:  'update',
        proposed_data:  proposed,
        current_data: {
          name:         synagogue.name,
          founded_year: synagogue.founded_year,
          closed_year:  synagogue.closed_year,
          status:       synagogue.status,
          neighborhood: synagogue.neighborhood,
        },
        change_summary: note.trim(),
        proposed_by:    userId,
        status:         'pending',
      })

    setLoading(false)

    if (insertError) {
      // FK violation: user exists in auth.users but not in public.users profile table
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
        <label htmlFor="edit-name" className={labelClass}>Synagogue name</label>
        <input
          id="edit-name"
          type="text"
          required
          value={name}
          onChange={e => setName(e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Founded / Closed years */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="edit-founded" className={labelClass}>Founded year</label>
          <input
            id="edit-founded"
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
          <label htmlFor="edit-closed" className={labelClass}>Closed year</label>
          <input
            id="edit-closed"
            type="number"
            min="1600"
            max={new Date().getFullYear()}
            value={closedYear}
            onChange={e => setClosedYear(e.target.value)}
            className={inputClass}
            placeholder="if applicable"
          />
        </div>
      </div>

      {/* Status / Neighborhood */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="edit-status" className={labelClass}>Status</label>
          <select
            id="edit-status"
            value={status}
            onChange={e => setStatus(e.target.value)}
            className={inputClass}
          >
            {STATUS_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="edit-neighborhood" className={labelClass}>Neighborhood</label>
          <input
            id="edit-neighborhood"
            type="text"
            value={neighborhood}
            onChange={e => setNeighborhood(e.target.value)}
            className={inputClass}
            placeholder="e.g. Strawberry Mansion"
          />
        </div>
      </div>

      {/* Note — required */}
      <div>
        <label htmlFor="edit-note" className={labelClass}>
          Explain your changes{' '}
          <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <textarea
          id="edit-note"
          required
          rows={3}
          value={note}
          onChange={e => setNote(e.target.value)}
          className={inputClass}
          placeholder="What are you correcting and what is your source? (e.g. 'Founded year should be 1923 per Philadelphia Jewish Exponent, March 1923')"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 px-4 rounded-lg font-medium text-sm transition"
      >
        {loading ? 'Submitting…' : 'Submit edit proposal'}
      </button>

      <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
        Proposals are reviewed by editors before being applied.
      </p>
    </form>
  )
}
