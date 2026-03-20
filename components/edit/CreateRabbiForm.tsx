'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface Props {
  userId: string
  onSuccess: () => void
}

export default function CreateRabbiForm({ userId, onSuccess }: Props) {
  const supabase = createClientComponentClient()

  const [fullName,    setFullName]    = useState('')
  const [birthYear,   setBirthYear]   = useState('')
  const [circaBirth,  setCircaBirth]  = useState(false)
  const [deathYear,   setDeathYear]   = useState('')
  const [circaDeath,  setCircaDeath]  = useState(false)
  const [biography,   setBiography]   = useState('')
  const [note,        setNote]        = useState('')

  const [error,   setError]   = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const bioCharsRemaining = 10000 - biography.length

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (fullName.trim().length < 3) {
      setError('Full name must be at least 3 characters.')
      return
    }

    const bYear = birthYear ? parseInt(birthYear) : null
    const dYear = deathYear ? parseInt(deathYear) : null

    if (bYear && dYear && dYear < bYear) {
      setError('Death year must be greater than or equal to birth year.')
      return
    }

    setLoading(true)

    // Rate limit check
    const { data: canSubmit, error: rateLimitError } = await supabase
      .rpc('check_proposal_rate_limit', { user_id: userId })

    if (rateLimitError || !canSubmit) {
      setError("You've reached your daily proposal limit. Please try again tomorrow.")
      setLoading(false)
      return
    }

    const { error: insertError } = await supabase
      .from('edit_proposals')
      .insert({
        entity_id:      null,
        synagogue_id:   null,
        proposal_type:  'rabbi_profile_new',
        proposed_data: {
          canonical_name: fullName.trim(),
          birth_year:     bYear,
          circa_birth:    circaBirth,
          death_year:     dYear,
          circa_death:    circaDeath,
          biography:      biography.trim() || null,
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
  const labelClass =
    'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
  const checkboxLabelClass =
    'flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer select-none'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-3 py-2 rounded-lg">
          {error}
        </div>
      )}

      {/* Full name */}
      <div>
        <label htmlFor="new-rabbi-name" className={labelClass}>
          Full name{' '}
          <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id="new-rabbi-name"
          type="text"
          required
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          className={inputClass}
          placeholder="e.g. Rabbi Abraham Katz"
        />
      </div>

      {/* Birth year + circa */}
      <div>
        <label htmlFor="new-rabbi-birth" className={labelClass}>Birth year</label>
        <input
          id="new-rabbi-birth"
          type="number"
          min="1600"
          max={new Date().getFullYear()}
          value={birthYear}
          onChange={e => setBirthYear(e.target.value)}
          className={inputClass}
          placeholder="e.g. 1880"
        />
        <label className={`${checkboxLabelClass} mt-2`}>
          <input
            type="checkbox"
            checked={circaBirth}
            onChange={e => setCircaBirth(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
          />
          Birth year is approximate
        </label>
      </div>

      {/* Death year + circa */}
      <div>
        <label htmlFor="new-rabbi-death" className={labelClass}>Death year</label>
        <input
          id="new-rabbi-death"
          type="number"
          min="1600"
          max={new Date().getFullYear()}
          value={deathYear}
          onChange={e => setDeathYear(e.target.value)}
          className={inputClass}
          placeholder="e.g. 1955"
        />
        <label className={`${checkboxLabelClass} mt-2`}>
          <input
            type="checkbox"
            checked={circaDeath}
            onChange={e => setCircaDeath(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
          />
          Death year is approximate
        </label>
      </div>

      {/* Biography */}
      <div>
        <div className="flex items-baseline justify-between mb-1">
          <label htmlFor="new-rabbi-bio" className={labelClass.replace('mb-1', '')}>
            Biography
          </label>
          <span className={`text-xs ${bioCharsRemaining < 500 ? 'text-amber-500 dark:text-amber-400' : 'text-gray-400 dark:text-gray-500'}`}>
            {bioCharsRemaining.toLocaleString()} chars remaining
          </span>
        </div>
        <textarea
          id="new-rabbi-bio"
          rows={5}
          maxLength={10000}
          value={biography}
          onChange={e => setBiography(e.target.value)}
          className={inputClass}
          placeholder="Brief biographical notes — congregation, background, notable activities…"
        />
      </div>

      {/* Note */}
      <div>
        <label htmlFor="new-rabbi-note" className={labelClass}>
          Why are you adding this rabbi?
        </label>
        <textarea
          id="new-rabbi-note"
          rows={3}
          value={note}
          onChange={e => setNote(e.target.value)}
          className={inputClass}
          placeholder="Describe your source (e.g. 'Listed in 1923 Philadelphia Jewish Exponent, confirmed via JewishGen')"
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
        Proposals are reviewed by editors before the rabbi profile is added to the directory.
      </p>
    </form>
  )
}
