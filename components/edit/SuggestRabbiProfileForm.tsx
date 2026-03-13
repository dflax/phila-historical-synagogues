'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const BIO_MAX = 10_000

interface ProfileSnapshot {
  id: string
  canonical_name: string
  birth_year: number | null
  death_year: number | null
  circa_birth: boolean | null
  circa_death: boolean | null
  biography: string | null
}

interface Props {
  profile: ProfileSnapshot
  userId: string
  onSuccess: () => void
}

const inputClass =
  'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm'
const labelClass =
  'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

export default function SuggestRabbiProfileForm({ profile, userId, onSuccess }: Props) {
  const supabase = createClientComponentClient()

  // Form state — pre-filled from current profile
  const [name,       setName]       = useState(profile.canonical_name)
  const [birthYear,  setBirthYear]  = useState(profile.birth_year?.toString()  ?? '')
  const [birthCirca, setBirthCirca] = useState(profile.circa_birth  ?? false)
  const [deathYear,  setDeathYear]  = useState(profile.death_year?.toString()  ?? '')
  const [deathCirca, setDeathCirca] = useState(profile.circa_death  ?? false)
  const [biography,  setBiography]  = useState(profile.biography    ?? '')
  const [note,       setNote]       = useState('')

  const [error,   setError]   = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Derived counts / validation
  const bioCharsLeft = BIO_MAX - biography.length
  const parsedBirth  = birthYear  ? parseInt(birthYear,  10) : null
  const parsedDeath  = deathYear  ? parseInt(deathYear,  10) : null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    // ── Client-side validation ──────────────────────────────────────────────
    if (!name.trim()) {
      setError('Name is required.')
      return
    }
    if (parsedBirth !== null && parsedDeath !== null && parsedDeath < parsedBirth) {
      setError('Death year cannot be earlier than birth year.')
      return
    }
    if (biography.length > BIO_MAX) {
      setError(`Biography must be ${BIO_MAX.toLocaleString()} characters or fewer.`)
      return
    }
    if (!note.trim()) {
      setError('Please explain what you\'re changing and why.')
      return
    }

    setLoading(true)

    // ── Rate limit: max 10 proposals per 24 hours ───────────────────────────
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
      setError('You\'ve reached the limit of 10 edit proposals per day. Please try again tomorrow.')
      setLoading(false)
      return
    }

    // ── Build proposed_data: only include changed fields ────────────────────
    const proposed: Record<string, unknown> = {}

    if (name.trim() !== profile.canonical_name)
      proposed.canonical_name = name.trim()

    if (parsedBirth !== profile.birth_year)
      proposed.birth_year = parsedBirth
    if (birthCirca !== (profile.circa_birth ?? false))
      proposed.circa_birth = birthCirca

    if (parsedDeath !== profile.death_year)
      proposed.death_year = parsedDeath
    if (deathCirca !== (profile.circa_death ?? false))
      proposed.circa_death = deathCirca

    const newBio = biography.trim() || null
    if (newBio !== profile.biography)
      proposed.biography = newBio

    if (Object.keys(proposed).length === 0) {
      setError('No changes detected. Please modify at least one field.')
      setLoading(false)
      return
    }

    // ── Submit to edit_proposals ────────────────────────────────────────────
    const { error: insertError } = await supabase
      .from('edit_proposals')
      .insert({
        rabbi_id:       profile.id,
        proposal_type:  'rabbi_profile_edit',
        proposed_data:  proposed,
        current_data: {
          canonical_name: profile.canonical_name,
          birth_year:     profile.birth_year,
          circa_birth:    profile.circa_birth,
          death_year:     profile.death_year,
          circa_death:    profile.circa_death,
          biography:      profile.biography,
        },
        submitter_note: note.trim(),
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-3 py-2 rounded-lg">
          {error}
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="rp-name" className={labelClass}>
          Full name <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id="rp-name"
          type="text"
          required
          value={name}
          onChange={e => setName(e.target.value)}
          className={inputClass}
          placeholder="e.g. Rabbi Joseph Stein"
        />
      </div>

      {/* Birth year + circa */}
      <div>
        <label className={labelClass}>Birth year</label>
        <div className="flex items-center gap-3">
          <input
            id="rp-birth"
            type="number"
            min="1600"
            max={new Date().getFullYear()}
            value={birthYear}
            onChange={e => setBirthYear(e.target.value)}
            className={`${inputClass} w-36`}
            placeholder="e.g. 1880"
          />
          <label className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={birthCirca}
              onChange={e => setBirthCirca(e.target.checked)}
              className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
            />
            Approximate (circa)
          </label>
        </div>
      </div>

      {/* Death year + circa */}
      <div>
        <label className={labelClass}>Death year</label>
        <div className="flex items-center gap-3">
          <input
            id="rp-death"
            type="number"
            min="1600"
            max={new Date().getFullYear()}
            value={deathYear}
            onChange={e => setDeathYear(e.target.value)}
            className={`${inputClass} w-36`}
            placeholder="e.g. 1952"
          />
          <label className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={deathCirca}
              onChange={e => setDeathCirca(e.target.checked)}
              className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
            />
            Approximate (circa)
          </label>
        </div>
        {parsedBirth !== null && parsedDeath !== null && parsedDeath < parsedBirth && (
          <p className="mt-1 text-xs text-red-500 dark:text-red-400">Death year must be after birth year.</p>
        )}
      </div>

      {/* Biography */}
      <div>
        <label htmlFor="rp-bio" className={labelClass}>Biography</label>
        <textarea
          id="rp-bio"
          rows={6}
          value={biography}
          onChange={e => setBiography(e.target.value)}
          className={inputClass}
          placeholder="Brief biographical notes — ordination, education, community role…"
        />
        <div className={`text-xs mt-1 text-right ${bioCharsLeft < 500 ? 'text-amber-500 dark:text-amber-400' : 'text-gray-400 dark:text-gray-500'}`}>
          {biography.length.toLocaleString()} / {BIO_MAX.toLocaleString()} characters
        </div>
      </div>

      {/* Submitter note — required */}
      <div>
        <label htmlFor="rp-note" className={labelClass}>
          Explain your changes <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <textarea
          id="rp-note"
          required
          rows={3}
          value={note}
          onChange={e => setNote(e.target.value)}
          className={inputClass}
          placeholder="What are you correcting and what is your source? (e.g. 'Birth year confirmed in 1880 US Census')"
        />
      </div>

      <button
        type="submit"
        disabled={loading || biography.length > BIO_MAX}
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
