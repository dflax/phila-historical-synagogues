'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const BIO_MAX  = 10_000
const LONG_MAX = 2_000

const DENOMINATIONS = [
  'Orthodox',
  'Conservative',
  'Reform',
  'Reconstructionist',
  'Renewal',
  'Humanistic',
  'Other',
]

interface ProfileSnapshot {
  id: string
  canonical_name: string
  birth_year: number | null
  death_year: number | null
  circa_birth: boolean | null
  circa_death: boolean | null
  biography: string | null
  // new biographical fields
  birthplace: string | null
  death_place: string | null
  seminary: string | null
  ordination_year: number | null
  denomination: string | null
  languages: string[] | null
  publications: string | null
  achievements: string | null
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

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 pt-2">
      <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider whitespace-nowrap">
        {label}
      </span>
      <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
    </div>
  )
}

function CharCount({ current, max }: { current: number; max: number }) {
  const left = max - current
  return (
    <div className={`text-xs mt-1 text-right ${left < 200 ? 'text-amber-500 dark:text-amber-400' : 'text-gray-400 dark:text-gray-500'}`}>
      {current.toLocaleString()} / {max.toLocaleString()} characters
    </div>
  )
}

export default function SuggestRabbiProfileForm({ profile, userId, onSuccess }: Props) {
  const supabase = createClientComponentClient()

  // ── Form state — pre-filled from current profile ─────────────────────────
  const [name,            setName]            = useState(profile.canonical_name)
  const [birthYear,       setBirthYear]       = useState(profile.birth_year?.toString() ?? '')
  const [birthCirca,      setBirthCirca]      = useState(profile.circa_birth  ?? false)
  const [deathYear,       setDeathYear]       = useState(profile.death_year?.toString() ?? '')
  const [deathCirca,      setDeathCirca]      = useState(profile.circa_death  ?? false)

  const [birthplace,      setBirthplace]      = useState(profile.birthplace      ?? '')
  const [deathPlace,      setDeathPlace]      = useState(profile.death_place     ?? '')

  const [seminary,        setSeminary]        = useState(profile.seminary        ?? '')
  const [ordinationYear,  setOrdinationYear]  = useState(profile.ordination_year?.toString() ?? '')
  const [denomination,    setDenomination]    = useState(profile.denomination    ?? '')

  const [languages,       setLanguages]       = useState((profile.languages ?? []).join(', '))
  const [publications,    setPublications]    = useState(profile.publications    ?? '')
  const [achievements,    setAchievements]    = useState(profile.achievements    ?? '')

  const [biography,       setBiography]       = useState(profile.biography       ?? '')
  const [note,            setNote]            = useState('')

  const [error,   setError]   = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // ── Derived / validation ──────────────────────────────────────────────────
  const parsedBirth       = birthYear       ? parseInt(birthYear,       10) : null
  const parsedDeath       = deathYear       ? parseInt(deathYear,       10) : null
  const parsedOrdination  = ordinationYear  ? parseInt(ordinationYear,  10) : null

  const deathBeforeBirth    = parsedBirth !== null && parsedDeath !== null && parsedDeath < parsedBirth
  const ordinationBeforeBirth =
    parsedBirth !== null && parsedOrdination !== null && parsedOrdination < parsedBirth

  const hasCharError =
    biography.length    > BIO_MAX  ||
    publications.length > LONG_MAX ||
    achievements.length > LONG_MAX

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError('Name is required.')
      return
    }
    if (deathBeforeBirth) {
      setError('Death year cannot be earlier than birth year.')
      return
    }
    if (ordinationBeforeBirth) {
      setError('Ordination year cannot be earlier than birth year.')
      return
    }
    if (biography.length > BIO_MAX) {
      setError(`Biography must be ${BIO_MAX.toLocaleString()} characters or fewer.`)
      return
    }
    if (publications.length > LONG_MAX) {
      setError(`Publications must be ${LONG_MAX.toLocaleString()} characters or fewer.`)
      return
    }
    if (achievements.length > LONG_MAX) {
      setError(`Achievements must be ${LONG_MAX.toLocaleString()} characters or fewer.`)
      return
    }
    if (!note.trim()) {
      setError("Please explain what you're changing and why.")
      return
    }

    setLoading(true)

    // ── Rate limit check ─────────────────────────────────────────────────────
    const { data: canSubmit, error: rateLimitError } = await supabase
      .rpc('check_proposal_rate_limit', { user_id: userId })

    if (rateLimitError || !canSubmit) {
      setError("You've reached your daily proposal limit. Please try again tomorrow.")
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

    const newBirthplace = birthplace.trim() || null
    if (newBirthplace !== profile.birthplace)
      proposed.birthplace = newBirthplace

    const newDeathPlace = deathPlace.trim() || null
    if (newDeathPlace !== profile.death_place)
      proposed.death_place = newDeathPlace

    const newSeminary = seminary.trim() || null
    if (newSeminary !== profile.seminary)
      proposed.seminary = newSeminary

    if (parsedOrdination !== profile.ordination_year)
      proposed.ordination_year = parsedOrdination

    const newDenomination = denomination || null
    if (newDenomination !== profile.denomination)
      proposed.denomination = newDenomination

    const newLanguages = languages.split(',').map(l => l.trim()).filter(Boolean)
    const oldLanguages = profile.languages ?? []
    if (JSON.stringify(newLanguages) !== JSON.stringify(oldLanguages))
      proposed.languages = newLanguages

    const newPublications = publications.trim() || null
    if (newPublications !== profile.publications)
      proposed.publications = newPublications

    const newAchievements = achievements.trim() || null
    if (newAchievements !== profile.achievements)
      proposed.achievements = newAchievements

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
        entity_id:      profile.id,
        synagogue_id:   null,
        proposal_type:  'rabbi_profile_edit',
        proposed_data:  proposed,
        current_data: {
          canonical_name:  profile.canonical_name,
          birth_year:      profile.birth_year,
          circa_birth:     profile.circa_birth,
          death_year:      profile.death_year,
          circa_death:     profile.circa_death,
          birthplace:      profile.birthplace,
          death_place:     profile.death_place,
          seminary:        profile.seminary,
          ordination_year: profile.ordination_year,
          denomination:    profile.denomination,
          languages:       profile.languages,
          publications:    profile.publications,
          achievements:    profile.achievements,
          biography:       profile.biography,
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

      {/* ── Basic Info ─────────────────────────────────────────────────────── */}
      <SectionDivider label="Basic Info" />

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
        {deathBeforeBirth && (
          <p className="mt-1 text-xs text-red-500 dark:text-red-400">Death year must be after birth year.</p>
        )}
      </div>

      {/* ── Life Details ───────────────────────────────────────────────────── */}
      <SectionDivider label="Life Details" />

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="rp-birthplace" className={labelClass}>Birthplace</label>
          <input
            id="rp-birthplace"
            type="text"
            value={birthplace}
            onChange={e => setBirthplace(e.target.value)}
            className={inputClass}
            placeholder="City, Country"
          />
        </div>
        <div>
          <label htmlFor="rp-deathplace" className={labelClass}>Place of death</label>
          <input
            id="rp-deathplace"
            type="text"
            value={deathPlace}
            onChange={e => setDeathPlace(e.target.value)}
            className={inputClass}
            placeholder="City, Country"
          />
        </div>
      </div>

      {/* ── Education & Career ─────────────────────────────────────────────── */}
      <SectionDivider label="Education & Career" />

      <div>
        <label htmlFor="rp-seminary" className={labelClass}>Seminary</label>
        <input
          id="rp-seminary"
          type="text"
          value={seminary}
          onChange={e => setSeminary(e.target.value)}
          className={inputClass}
          placeholder="Hebrew Union College, Jewish Theological Seminary, etc."
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="rp-ordination" className={labelClass}>Ordination year</label>
          <input
            id="rp-ordination"
            type="number"
            min="1600"
            max={new Date().getFullYear()}
            value={ordinationYear}
            onChange={e => setOrdinationYear(e.target.value)}
            className={inputClass}
            placeholder="e.g. 1905"
          />
          {ordinationBeforeBirth && (
            <p className="mt-1 text-xs text-red-500 dark:text-red-400">Must be after birth year.</p>
          )}
        </div>
        <div>
          <label htmlFor="rp-denomination" className={labelClass}>Denomination</label>
          <select
            id="rp-denomination"
            value={denomination}
            onChange={e => setDenomination(e.target.value)}
            className={inputClass}
          >
            <option value="">— select —</option>
            {DENOMINATIONS.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Languages & Works ──────────────────────────────────────────────── */}
      <SectionDivider label="Languages & Works" />

      <div>
        <label htmlFor="rp-languages" className={labelClass}>Languages</label>
        <input
          id="rp-languages"
          type="text"
          value={languages}
          onChange={e => setLanguages(e.target.value)}
          className={inputClass}
          placeholder="Hebrew, Yiddish, English"
        />
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Separate multiple languages with commas.</p>
      </div>

      <div>
        <label htmlFor="rp-publications" className={labelClass}>Publications</label>
        <textarea
          id="rp-publications"
          rows={3}
          value={publications}
          onChange={e => setPublications(e.target.value)}
          className={inputClass}
          placeholder="Notable books, articles, or writings"
        />
        <CharCount current={publications.length} max={LONG_MAX} />
      </div>

      <div>
        <label htmlFor="rp-achievements" className={labelClass}>Achievements</label>
        <textarea
          id="rp-achievements"
          rows={3}
          value={achievements}
          onChange={e => setAchievements(e.target.value)}
          className={inputClass}
          placeholder="Awards, honors, community leadership"
        />
        <CharCount current={achievements.length} max={LONG_MAX} />
      </div>

      {/* ── Biography ──────────────────────────────────────────────────────── */}
      <SectionDivider label="Biography" />

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
        <CharCount current={biography.length} max={BIO_MAX} />
      </div>

      {/* ── Submitter note ─────────────────────────────────────────────────── */}
      <SectionDivider label="Your Note" />

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
        disabled={loading || hasCharError}
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
