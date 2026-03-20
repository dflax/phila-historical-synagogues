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

interface SuggestionRabbi {
  id:               string
  canonical_name:   string
  birth_year:       number | null
  death_year:       number | null
  slug:             string
  similarity_score: number
  match_reasons:    string[]
}

interface BasicRabbi {
  id:            string
  canonical_name: string
  birth_year:    number | null
  death_year:    number | null
}

interface RabbiDetails {
  id:                 string
  canonical_name:     string
  birth_year:         number | null
  death_year:         number | null
  circa_birth:        boolean | null
  circa_death:        boolean | null
  biography:          string | null
  birthplace:         string | null
  death_place:        string | null
  seminary:           string | null
  ordination_year:    number | null
  denomination:       string | null
  languages:          string[] | null
  publications:       string | null
  achievements:       string | null
  affiliations_count: number
  photos_count:       number
  relationships_count: number
}

interface MergedFields {
  canonical_name:  string
  birth_year:      string
  circa_birth:     boolean
  death_year:      string
  circa_death:     boolean
  biography:       string
  birthplace:      string
  death_place:     string
  seminary:        string
  ordination_year: string
  denomination:    string
  languages:       string  // comma-separated
  publications:    string
  achievements:    string
}

// ── Style helpers ─────────────────────────────────────────────────────────────

const inputClass =
  'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-sm'

const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

const DENOMINATIONS = [
  'Orthodox', 'Conservative', 'Reform', 'Reconstructionist',
  'Renewal', 'Humanistic', 'Other',
]

// ── Small helpers ─────────────────────────────────────────────────────────────

function yearsLabel(birth: number | null, death: number | null): string {
  if (!birth && !death) return ''
  return [birth ?? '?', death ?? 'present'].join(' – ')
}

function ConflictBadge() {
  return (
    <span className="ml-1.5 text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 px-1.5 py-0.5 rounded">
      Different
    </span>
  )
}

function OtherValue({
  value,
  showConflict,
}: {
  value: string | null
  showConflict: boolean
}) {
  return (
    <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
      Other rabbi:{' '}
      <span className="font-medium text-gray-600 dark:text-gray-300">{value || '—'}</span>
      {showConflict && value && <ConflictBadge />}
    </div>
  )
}

// ── Spinner ───────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <svg className="w-4 h-4 animate-spin text-purple-600 dark:text-purple-400" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

// ── Step 1: Search & Select ───────────────────────────────────────────────────

function Step1({
  rabbiName,
  suggestions,
  allRabbis,
  searchTerm,
  onSearchChange,
  loading,
  loadingStep2,
  onSelect,
  error,
}: {
  rabbiName:      string
  suggestions:    SuggestionRabbi[]
  allRabbis:      BasicRabbi[]
  searchTerm:     string
  onSearchChange: (v: string) => void
  loading:        boolean
  loadingStep2:   boolean
  onSelect:       (r: BasicRabbi) => void
  error:          string | null
}) {
  const filteredRabbis = searchTerm.trim()
    ? allRabbis
        .filter(r => r.canonical_name.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(0, 20)
    : []

  return (
    <div className="space-y-5">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Merge <span className="font-semibold">{rabbiName}</span> with a duplicate entry.
        The current profile will be kept; the selected duplicate will be absorbed and soft-deleted.
      </p>

      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-3 py-2 rounded-lg">
          {error}
        </div>
      )}

      {/* Smart suggestions */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Suggested duplicates
        </h3>
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 py-3">
            <Spinner /> Loading suggestions…
          </div>
        ) : suggestions.length === 0 ? (
          <p className="text-sm text-gray-400 dark:text-gray-500 italic py-2">
            No strong matches found automatically.
          </p>
        ) : (
          <div className="space-y-2">
            {suggestions.map(s => (
              <button
                key={s.id}
                onClick={() => onSelect(s)}
                disabled={loadingStep2}
                className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-purple-300 dark:hover:border-purple-600 hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                      {s.canonical_name}
                    </div>
                    {(s.birth_year || s.death_year) && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {yearsLabel(s.birth_year, s.death_year)}
                      </div>
                    )}
                    {s.match_reasons.length > 0 && (
                      <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                        {s.match_reasons.join(' · ')}
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0 text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-2 py-0.5 rounded-full">
                    {s.similarity_score}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Search all rabbis */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Or search all rabbis
        </h3>
        <input
          type="search"
          value={searchTerm}
          onChange={e => onSearchChange(e.target.value)}
          className={inputClass}
          placeholder="Type a name to search…"
          autoComplete="off"
        />

        {searchTerm.trim() && (
          <div className="mt-2 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            {filteredRabbis.length === 0 ? (
              <p className="text-sm text-gray-400 dark:text-gray-500 px-4 py-3 italic">No matches found.</p>
            ) : (
              <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-52 overflow-y-auto">
                {filteredRabbis.map(r => (
                  <button
                    key={r.id}
                    onClick={() => onSelect(r)}
                    disabled={loadingStep2}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {r.canonical_name}
                    </div>
                    {(r.birth_year || r.death_year) && (
                      <div className="text-xs text-gray-400 dark:text-gray-500">
                        {yearsLabel(r.birth_year, r.death_year)}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {loadingStep2 && (
          <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mt-3">
            <Spinner /> Loading rabbi details…
          </div>
        )}
      </div>
    </div>
  )
}

// ── Step 2: Review & Edit ─────────────────────────────────────────────────────

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

function Step2({
  rabbi1,
  rabbi2,
  mergedData,
  onMergedDataChange,
  reason,
  onReasonChange,
  onBack,
  onSubmit,
  loading,
  error,
}: {
  rabbi1:               RabbiDetails
  rabbi2:               RabbiDetails
  mergedData:           MergedFields
  onMergedDataChange:   (d: MergedFields) => void
  reason:               string
  onReasonChange:       (v: string) => void
  onBack:               () => void
  onSubmit:             (e: React.FormEvent) => void
  loading:              boolean
  error:                string | null
}) {
  function set<K extends keyof MergedFields>(key: K, val: MergedFields[K]) {
    onMergedDataChange({ ...mergedData, [key]: val })
  }

  const parsedBirth = mergedData.birth_year ? parseInt(mergedData.birth_year) : null
  const parsedDeath = mergedData.death_year ? parseInt(mergedData.death_year) : null
  const deathBeforeBirth = parsedBirth !== null && parsedDeath !== null && parsedDeath < parsedBirth

  const totalAffiliations  = rabbi1.affiliations_count  + rabbi2.affiliations_count
  const totalPhotos        = rabbi1.photos_count        + rabbi2.photos_count
  const totalRelationships = rabbi1.relationships_count + rabbi2.relationships_count

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Merge summary banner */}
      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-3 text-sm">
        <span className="font-semibold text-purple-800 dark:text-purple-300">Keeping:</span>{' '}
        <span className="text-purple-700 dark:text-purple-400">{rabbi1.canonical_name}</span>
        <span className="mx-2 text-purple-400">·</span>
        <span className="font-semibold text-purple-800 dark:text-purple-300">Absorbing:</span>{' '}
        <span className="text-purple-700 dark:text-purple-400">{rabbi2.canonical_name}</span>
      </div>

      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-3 py-2 rounded-lg">
          {error}
        </div>
      )}

      {/* ── Basic Info ── */}
      <SectionDivider label="Basic Info" />

      <div>
        <label className={labelClass}>
          Full name <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          type="text"
          required
          value={mergedData.canonical_name}
          onChange={e => set('canonical_name', e.target.value)}
          className={inputClass}
        />
        <OtherValue
          value={rabbi2.canonical_name}
          showConflict={rabbi2.canonical_name !== rabbi1.canonical_name}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Birth year</label>
          <input
            type="number"
            min="1600"
            max={new Date().getFullYear()}
            value={mergedData.birth_year}
            onChange={e => set('birth_year', e.target.value)}
            className={inputClass}
            placeholder="e.g. 1880"
          />
          <label className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mt-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={mergedData.circa_birth}
              onChange={e => set('circa_birth', e.target.checked)}
              className="rounded border-gray-300 dark:border-gray-600 text-purple-600 focus:ring-purple-500"
            />
            Approximate
          </label>
          <OtherValue
            value={rabbi2.birth_year ? String(rabbi2.birth_year) + (rabbi2.circa_birth ? ' (approx)' : '') : null}
            showConflict={rabbi2.birth_year !== rabbi1.birth_year}
          />
        </div>

        <div>
          <label className={labelClass}>Death year</label>
          <input
            type="number"
            min="1600"
            max={new Date().getFullYear()}
            value={mergedData.death_year}
            onChange={e => set('death_year', e.target.value)}
            className={inputClass}
            placeholder="e.g. 1952"
          />
          <label className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mt-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={mergedData.circa_death}
              onChange={e => set('circa_death', e.target.checked)}
              className="rounded border-gray-300 dark:border-gray-600 text-purple-600 focus:ring-purple-500"
            />
            Approximate
          </label>
          <OtherValue
            value={rabbi2.death_year ? String(rabbi2.death_year) + (rabbi2.circa_death ? ' (approx)' : '') : null}
            showConflict={rabbi2.death_year !== rabbi1.death_year}
          />
          {deathBeforeBirth && (
            <p className="mt-1 text-xs text-red-500 dark:text-red-400">Death year must be after birth year.</p>
          )}
        </div>
      </div>

      {/* ── Life Details ── */}
      <SectionDivider label="Life Details" />

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Birthplace</label>
          <input
            type="text"
            value={mergedData.birthplace}
            onChange={e => set('birthplace', e.target.value)}
            className={inputClass}
            placeholder="City, Country"
          />
          <OtherValue value={rabbi2.birthplace} showConflict={rabbi2.birthplace !== rabbi1.birthplace} />
        </div>
        <div>
          <label className={labelClass}>Place of death</label>
          <input
            type="text"
            value={mergedData.death_place}
            onChange={e => set('death_place', e.target.value)}
            className={inputClass}
            placeholder="City, Country"
          />
          <OtherValue value={rabbi2.death_place} showConflict={rabbi2.death_place !== rabbi1.death_place} />
        </div>
      </div>

      {/* ── Education & Career ── */}
      <SectionDivider label="Education & Career" />

      <div>
        <label className={labelClass}>Seminary</label>
        <input
          type="text"
          value={mergedData.seminary}
          onChange={e => set('seminary', e.target.value)}
          className={inputClass}
          placeholder="Hebrew Union College, Jewish Theological Seminary, etc."
        />
        <OtherValue value={rabbi2.seminary} showConflict={rabbi2.seminary !== rabbi1.seminary} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Ordination year</label>
          <input
            type="number"
            min="1600"
            max={new Date().getFullYear()}
            value={mergedData.ordination_year}
            onChange={e => set('ordination_year', e.target.value)}
            className={inputClass}
            placeholder="e.g. 1905"
          />
          <OtherValue
            value={rabbi2.ordination_year ? String(rabbi2.ordination_year) : null}
            showConflict={rabbi2.ordination_year !== rabbi1.ordination_year}
          />
        </div>
        <div>
          <label className={labelClass}>Denomination</label>
          <select
            value={mergedData.denomination}
            onChange={e => set('denomination', e.target.value)}
            className={inputClass}
          >
            <option value="">— select —</option>
            {DENOMINATIONS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <OtherValue value={rabbi2.denomination} showConflict={rabbi2.denomination !== rabbi1.denomination} />
        </div>
      </div>

      {/* ── Languages & Works ── */}
      <SectionDivider label="Languages & Works" />

      <div>
        <label className={labelClass}>Languages</label>
        <input
          type="text"
          value={mergedData.languages}
          onChange={e => set('languages', e.target.value)}
          className={inputClass}
          placeholder="Hebrew, Yiddish, English"
        />
        <OtherValue
          value={rabbi2.languages?.join(', ') ?? null}
          showConflict={
            JSON.stringify(rabbi2.languages ?? []) !== JSON.stringify(rabbi1.languages ?? [])
          }
        />
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Separate with commas.</p>
      </div>

      <div>
        <label className={labelClass}>Publications</label>
        <textarea
          rows={3}
          value={mergedData.publications}
          onChange={e => set('publications', e.target.value)}
          className={inputClass}
          placeholder="Notable books, articles, or writings"
        />
        <OtherValue value={rabbi2.publications} showConflict={rabbi2.publications !== rabbi1.publications} />
      </div>

      <div>
        <label className={labelClass}>Achievements</label>
        <textarea
          rows={3}
          value={mergedData.achievements}
          onChange={e => set('achievements', e.target.value)}
          className={inputClass}
          placeholder="Awards, honors, community leadership"
        />
        <OtherValue value={rabbi2.achievements} showConflict={rabbi2.achievements !== rabbi1.achievements} />
      </div>

      {/* ── Biography ── */}
      <SectionDivider label="Biography" />

      <div>
        <label className={labelClass}>Biography (combined from both rabbis)</label>
        <textarea
          rows={8}
          value={mergedData.biography}
          onChange={e => set('biography', e.target.value)}
          className={inputClass}
          placeholder="Brief biographical notes…"
        />
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          Pre-filled with both biographies combined. Edit as needed.
        </p>
      </div>

      {/* ── Auto-merged collections ── */}
      <div className="bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-sm">
        <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Automatically combined on approval:
        </p>
        <ul className="space-y-0.5 text-gray-600 dark:text-gray-400 text-xs">
          <li>✓ {totalAffiliations} synagogue affiliation{totalAffiliations !== 1 ? 's' : ''}</li>
          <li>✓ {totalPhotos} photo{totalPhotos !== 1 ? 's' : ''}</li>
          {totalRelationships > 0 && (
            <li>✓ {totalRelationships} family relationship{totalRelationships !== 1 ? 's' : ''}</li>
          )}
        </ul>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
          All affiliations and photos from both rabbis will be combined. The absorbed profile will be soft-deleted.
        </p>
      </div>

      {/* ── Reason ── */}
      <SectionDivider label="Reason for Merge" />

      <div>
        <label className={labelClass}>
          Why are these the same person? <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <textarea
          required
          rows={3}
          value={reason}
          onChange={e => onReasonChange(e.target.value)}
          className={inputClass}
          placeholder="e.g. 'Same rabbi, duplicate entries with different name spellings'"
        />
      </div>

      {/* ── Buttons ── */}
      <div className="flex gap-3 pt-1">
        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="flex-1 py-2.5 px-4 text-sm font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition"
        >
          ← Back
        </button>
        <button
          type="submit"
          disabled={loading || deathBeforeBirth}
          className="flex-1 py-2.5 px-4 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition"
        >
          {loading ? 'Submitting…' : 'Propose Merge'}
        </button>
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
        No data is changed until an editor approves this proposal.
      </p>
    </form>
  )
}

// ── Step 3: Confirmation ──────────────────────────────────────────────────────

function Step3({ onClose }: { onClose: () => void }) {
  return (
    <div className="text-center py-8 space-y-4">
      <div className="w-14 h-14 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto">
        <svg className="w-7 h-7 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Merge Proposed</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Your merge proposal has been submitted for editor review.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-500">
        No data has been changed yet. An editor will review and approve or reject this merge.
      </p>
      <button
        onClick={onClose}
        className="mt-2 px-6 py-2.5 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition"
      >
        Close
      </button>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

const mergeIcon = (
  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" clipRule="evenodd" />
  </svg>
)

export default function MergeRabbiButton({ rabbiId, rabbiName }: Props) {
  const supabase = createClientComponentClient()

  const [user,          setUser]         = useState<User | null>(null)
  const [authReady,     setAuthReady]    = useState(false)
  const [modalOpen,     setModalOpen]    = useState(false)
  const [loginOpen,     setLoginOpen]    = useState(false)

  const [step,          setStep]         = useState<1 | 2 | 3>(1)
  const [suggestions,   setSuggestions]  = useState<SuggestionRabbi[]>([])
  const [allRabbis,     setAllRabbis]    = useState<BasicRabbi[]>([])
  const [searchTerm,    setSearchTerm]   = useState('')
  const [rabbi1Details, setRabbi1Details] = useState<RabbiDetails | null>(null)
  const [rabbi2Details, setRabbi2Details] = useState<RabbiDetails | null>(null)
  const [mergedData,    setMergedData]   = useState<MergedFields | null>(null)
  const [reason,        setReason]       = useState('')
  const [loading,       setLoading]      = useState(false)
  const [loadingStep2,  setLoadingStep2] = useState(false)
  const [error,         setError]        = useState<string | null>(null)

  // Auth
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setAuthReady(true)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session && loginOpen) {
        setLoginOpen(false)
        doOpenModal()
      }
    })
    return () => subscription.unsubscribe()
  }, [supabase]) // eslint-disable-line react-hooks/exhaustive-deps

  // Escape key + scroll lock
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') closeModal() }
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

  function doOpenModal() {
    setStep(1)
    setSelectedRabbiReset()
    setReason('')
    setSearchTerm('')
    setError(null)
    setSuggestions([])
    setAllRabbis([])
    setModalOpen(true)
    loadSuggestionsAndRabbis()
  }

  function setSelectedRabbiReset() {
    setRabbi1Details(null)
    setRabbi2Details(null)
    setMergedData(null)
  }

  async function loadSuggestionsAndRabbis() {
    setLoading(true)
    try {
      const [suggestRes, rabbisRes] = await Promise.all([
        fetch(`/api/rabbis/${rabbiId}/merge-suggestions`),
        supabase
          .from('rabbi_profiles')
          .select('id, canonical_name, birth_year, death_year')
          .eq('approved', true)
          .or('deleted.is.null,deleted.eq.false')
          .neq('id', rabbiId)
          .order('canonical_name', { ascending: true }),
      ])

      if (suggestRes.ok) {
        const body = await suggestRes.json()
        setSuggestions(body.suggestions ?? [])
      }
      if (rabbisRes.data) {
        setAllRabbis(rabbisRes.data)
      }
    } catch {
      // Non-fatal — suggestions and search will just be empty
    } finally {
      setLoading(false)
    }
  }

  function closeModal() {
    setModalOpen(false)
    setStep(1)
  }

  async function selectRabbi(rabbi: BasicRabbi) {
    setLoadingStep2(true)
    setError(null)
    try {
      const [res1, res2] = await Promise.all([
        fetch(`/api/rabbi-profiles/${rabbiId}`),
        fetch(`/api/rabbi-profiles/${rabbi.id}`),
      ])

      if (!res1.ok || !res2.ok) {
        setError('Failed to load rabbi details. Please try again.')
        setLoadingStep2(false)
        return
      }

      const r1: RabbiDetails = await res1.json()
      const r2: RabbiDetails = await res2.json()

      setRabbi1Details(r1)
      setRabbi2Details(r2)

      // Pre-fill from r1; combine biographies
      const combinedBio = [r1.biography, r2.biography]
        .filter(Boolean)
        .join('\n\n---\n\n')

      setMergedData({
        canonical_name:  r1.canonical_name,
        birth_year:      r1.birth_year?.toString()      ?? '',
        circa_birth:     r1.circa_birth                 ?? false,
        death_year:      r1.death_year?.toString()      ?? '',
        circa_death:     r1.circa_death                 ?? false,
        biography:       combinedBio,
        birthplace:      r1.birthplace                  ?? '',
        death_place:     r1.death_place                 ?? '',
        seminary:        r1.seminary                    ?? '',
        ordination_year: r1.ordination_year?.toString() ?? '',
        denomination:    r1.denomination               ?? '',
        languages:       (r1.languages ?? []).join(', '),
        publications:    r1.publications               ?? '',
        achievements:    r1.achievements               ?? '',
      })

      setStep(2)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoadingStep2(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!mergedData || !rabbi2Details || !user) return
    setError(null)

    if (!mergedData.canonical_name.trim()) {
      setError('Name is required.')
      return
    }
    if (!reason.trim()) {
      setError('Please provide a reason for the merge.')
      return
    }

    setLoading(true)

    // Rate limit check
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    const { count } = await supabase
      .from('edit_proposals')
      .select('*', { count: 'exact', head: true })
      .eq('created_by', user.id)
      .gte('created_at', cutoff)

    if ((count ?? 0) >= 10) {
      setError("You've reached the limit of 10 proposals per day. Please try again tomorrow.")
      setLoading(false)
      return
    }

    const totalAffiliations  = (rabbi1Details?.affiliations_count  ?? 0) + rabbi2Details.affiliations_count
    const totalPhotos        = (rabbi1Details?.photos_count        ?? 0) + rabbi2Details.photos_count
    const totalRelationships = (rabbi1Details?.relationships_count ?? 0) + rabbi2Details.relationships_count

    const { error: insertError } = await supabase
      .from('edit_proposals')
      .insert({
        entity_id:     rabbiId,
        synagogue_id:  null,
        proposal_type: 'rabbi_profile_merge',
        proposed_data: {
          merge_source_id: rabbiId,
          merge_target_id: rabbi2Details.id,
          merged_fields: {
            canonical_name:  mergedData.canonical_name.trim(),
            birth_year:      mergedData.birth_year ? parseInt(mergedData.birth_year) : null,
            circa_birth:     mergedData.circa_birth,
            death_year:      mergedData.death_year ? parseInt(mergedData.death_year) : null,
            circa_death:     mergedData.circa_death,
            biography:       mergedData.biography.trim()       || null,
            birthplace:      mergedData.birthplace.trim()      || null,
            death_place:     mergedData.death_place.trim()     || null,
            seminary:        mergedData.seminary.trim()        || null,
            ordination_year: mergedData.ordination_year ? parseInt(mergedData.ordination_year) : null,
            denomination:    mergedData.denomination           || null,
            languages:       mergedData.languages.split(',').map(l => l.trim()).filter(Boolean),
            publications:    mergedData.publications.trim()    || null,
            achievements:    mergedData.achievements.trim()    || null,
          },
          affiliations_count:  totalAffiliations,
          photos_count:        totalPhotos,
          relationships_count: totalRelationships,
        },
        current_data: {
          rabbi1_name: rabbi1Details?.canonical_name ?? rabbiName,
          rabbi2_name: rabbi2Details.canonical_name,
        },
        submitter_note: reason.trim(),
        created_by:     user.id,
        status:         'pending',
      })

    setLoading(false)

    if (insertError) {
      if (insertError.code === '23503') {
        setError('Your account is not fully set up. Please sign out and sign in again.')
      } else {
        setError(insertError.message)
      }
      return
    }

    setStep(3)
  }

  if (!authReady) return null

  return (
    <>
      {/* ── Button ─────────────────────────────────────────────────────────── */}
      {user ? (
        <button
          onClick={doOpenModal}
          className="flex items-center gap-1.5 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium transition"
        >
          {mergeIcon}
          Merge with Another Rabbi
        </button>
      ) : (
        <button
          onClick={() => setLoginOpen(true)}
          className="flex items-center gap-1.5 text-sm text-gray-400 dark:text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition"
        >
          {mergeIcon}
          Sign in to merge
        </button>
      )}

      {/* ── Modal ──────────────────────────────────────────────────────────── */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Merge rabbi profiles"
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl border border-gray-200 dark:border-gray-700 max-h-[90vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-700 flex-shrink-0">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  {step === 3 ? 'Merge Proposed' : `Merge ${rabbiName}`}
                </h2>
                {step < 3 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    Step {step} of 2 — {step === 1 ? 'Select duplicate' : 'Review combined data'}
                  </p>
                )}
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
            <div className="px-6 py-5 overflow-y-auto flex-1">
              {step === 1 && (
                <Step1
                  rabbiName={rabbiName}
                  suggestions={suggestions}
                  allRabbis={allRabbis}
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  loading={loading}
                  loadingStep2={loadingStep2}
                  onSelect={selectRabbi}
                  error={error}
                />
              )}
              {step === 2 && mergedData && rabbi1Details && rabbi2Details && (
                <Step2
                  rabbi1={rabbi1Details}
                  rabbi2={rabbi2Details}
                  mergedData={mergedData}
                  onMergedDataChange={setMergedData}
                  reason={reason}
                  onReasonChange={setReason}
                  onBack={() => { setStep(1); setError(null) }}
                  onSubmit={handleSubmit}
                  loading={loading}
                  error={error}
                />
              )}
              {step === 3 && <Step3 onClose={closeModal} />}
            </div>
          </div>
        </div>
      )}

      {/* ── Login prompt ────────────────────────────────────────────────────── */}
      <AuthModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        initialView="login"
      />
    </>
  )
}
