'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { User } from '@supabase/supabase-js'
import AuthModal from '@/components/auth/AuthModal'

// ── Types ─────────────────────────────────────────────────────────────────────

interface Props {
  synagogueId:   string
  synagogueName: string
}

interface SuggestionSynagogue {
  id:               string
  name:             string
  status:           string
  founded_year:     number | null
  neighborhood:     string | null
  similarity_score: number
  match_reasons:    string[]
}

interface BasicSynagogue {
  id:          string
  name:        string
  status:      string
  founded_year: number | null
}

interface SynagogueDetails {
  synagogue: {
    id:           string
    name:         string
    status:       string
    founded_year: number | null
    closed_year:  number | null
    neighborhood: string | null
  }
  addresses_count: number
  rabbis_count:    number
  history_count:   number
  photos_count:    number
}

interface MergedFields {
  name:         string
  status:       string
  founded_year: string
  closed_year:  string
}

// ── Style helpers ─────────────────────────────────────────────────────────────

const inputClass =
  'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-sm'

const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

const STATUSES = ['active', 'closed', 'merged', 'unknown']

// ── Small helpers ─────────────────────────────────────────────────────────────

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
      Other synagogue:{' '}
      <span className="font-medium text-gray-600 dark:text-gray-300">{value || '—'}</span>
      {showConflict && value && <ConflictBadge />}
    </div>
  )
}

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
  synagogueName,
  suggestions,
  allSynagogues,
  searchTerm,
  onSearchChange,
  loading,
  loadingStep2,
  onSelect,
  error,
}: {
  synagogueName:  string
  suggestions:    SuggestionSynagogue[]
  allSynagogues:  BasicSynagogue[]
  searchTerm:     string
  onSearchChange: (v: string) => void
  loading:        boolean
  loadingStep2:   boolean
  onSelect:       (s: BasicSynagogue) => void
  error:          string | null
}) {
  const filteredSynagogues = searchTerm.trim()
    ? allSynagogues
        .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(0, 20)
    : []

  return (
    <div className="space-y-5">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Merge <span className="font-semibold">{synagogueName}</span> with a duplicate entry.
        The current record will be kept; the selected duplicate will be absorbed and soft-deleted.
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
                className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-purple-300 dark:hover:border-purple-600 hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                      {s.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {[s.status, s.neighborhood].filter(Boolean).join(' · ')}
                      {s.founded_year ? ` · Est. ${s.founded_year}` : ''}
                    </div>
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

      {/* Search all synagogues */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Or search all synagogues
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
            {filteredSynagogues.length === 0 ? (
              <p className="text-sm text-gray-400 dark:text-gray-500 px-4 py-3 italic">No matches found.</p>
            ) : (
              <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-52 overflow-y-auto">
                {filteredSynagogues.map(s => (
                  <button
                    key={s.id}
                    onClick={() => onSelect(s)}
                    disabled={loadingStep2}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{s.name}</div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">
                      {s.status}{s.founded_year ? ` · Est. ${s.founded_year}` : ''}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {loadingStep2 && (
          <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mt-3">
            <Spinner /> Loading synagogue details…
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
  syn1,
  syn2,
  mergedData,
  onMergedDataChange,
  reason,
  onReasonChange,
  onBack,
  onSubmit,
  loading,
  error,
}: {
  syn1:               SynagogueDetails
  syn2:               SynagogueDetails
  mergedData:         MergedFields
  onMergedDataChange: (d: MergedFields) => void
  reason:             string
  onReasonChange:     (v: string) => void
  onBack:             () => void
  onSubmit:           (e: React.FormEvent) => void
  loading:            boolean
  error:              string | null
}) {
  function set<K extends keyof MergedFields>(key: K, val: MergedFields[K]) {
    onMergedDataChange({ ...mergedData, [key]: val })
  }

  const s1 = syn1.synagogue
  const s2 = syn2.synagogue

  const totalAddresses = syn1.addresses_count + syn2.addresses_count
  const totalRabbis    = syn1.rabbis_count    + syn2.rabbis_count
  const totalHistory   = syn1.history_count   + syn2.history_count
  const totalPhotos    = syn1.photos_count    + syn2.photos_count

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Merge summary banner */}
      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-3 text-sm">
        <span className="font-semibold text-purple-800 dark:text-purple-300">Keeping:</span>{' '}
        <span className="text-purple-700 dark:text-purple-400">{s1.name}</span>
        <span className="mx-2 text-purple-400">·</span>
        <span className="font-semibold text-purple-800 dark:text-purple-300">Absorbing:</span>{' '}
        <span className="text-purple-700 dark:text-purple-400">{s2.name}</span>
      </div>

      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-3 py-2 rounded-lg">
          {error}
        </div>
      )}

      {/* ── Core Fields ── */}
      <SectionDivider label="Core Info" />

      <div>
        <label className={labelClass}>
          Synagogue name <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          type="text"
          required
          value={mergedData.name}
          onChange={e => set('name', e.target.value)}
          className={inputClass}
        />
        <OtherValue value={s2.name} showConflict={s2.name !== s1.name} />
      </div>

      <div>
        <label className={labelClass}>Status</label>
        <select
          value={mergedData.status}
          onChange={e => set('status', e.target.value)}
          className={inputClass}
        >
          {STATUSES.map(st => (
            <option key={st} value={st}>
              {st.charAt(0).toUpperCase() + st.slice(1)}
            </option>
          ))}
        </select>
        <OtherValue value={s2.status} showConflict={s2.status !== s1.status} />
      </div>

      {/* ── Years ── */}
      <SectionDivider label="Years" />

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Founded year</label>
          <input
            type="number"
            min="1600"
            max={new Date().getFullYear()}
            value={mergedData.founded_year}
            onChange={e => set('founded_year', e.target.value)}
            className={inputClass}
            placeholder="e.g. 1880"
          />
          <OtherValue
            value={s2.founded_year ? String(s2.founded_year) : null}
            showConflict={s2.founded_year !== s1.founded_year}
          />
        </div>
        <div>
          <label className={labelClass}>Closed year</label>
          <input
            type="number"
            min="1600"
            max={new Date().getFullYear()}
            value={mergedData.closed_year}
            onChange={e => set('closed_year', e.target.value)}
            className={inputClass}
            placeholder="e.g. 1952"
          />
          <OtherValue
            value={s2.closed_year ? String(s2.closed_year) : null}
            showConflict={s2.closed_year !== s1.closed_year}
          />
        </div>
      </div>

      {/* ── Neighbourhood (read-only comparison) ── */}
      {(s1.neighborhood || s2.neighborhood) && (
        <>
          <SectionDivider label="Location" />
          <div className="bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-sm">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">This synagogue:</div>
                <div className="font-medium text-gray-800 dark:text-gray-200">{s1.neighborhood ?? '—'}</div>
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Other synagogue:</div>
                <div className={`font-medium ${s2.neighborhood !== s1.neighborhood ? 'text-amber-700 dark:text-amber-400' : 'text-gray-800 dark:text-gray-200'}`}>
                  {s2.neighborhood ?? '—'}
                  {s2.neighborhood && s2.neighborhood !== s1.neighborhood && <ConflictBadge />}
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              Neighbourhood is tied to addresses which are merged automatically.
            </p>
          </div>
        </>
      )}

      {/* ── Auto-merged collections ── */}
      <SectionDivider label="Combined Data" />

      <div className="bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-sm">
        <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Automatically combined on approval:
        </p>
        <ul className="space-y-0.5 text-gray-600 dark:text-gray-400 text-xs">
          <li>✓ {totalAddresses} address{totalAddresses !== 1 ? 'es' : ''}</li>
          <li>✓ {totalRabbis} rabbi affiliation{totalRabbis !== 1 ? 's' : ''}</li>
          <li>✓ {totalHistory} history entr{totalHistory !== 1 ? 'ies' : 'y'}</li>
          <li>✓ {totalPhotos} photo{totalPhotos !== 1 ? 's' : ''}</li>
        </ul>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
          All addresses, rabbis, history, and photos from both synagogues will be combined.
          The absorbed synagogue will be soft-deleted.
        </p>
      </div>

      {/* ── Reason ── */}
      <SectionDivider label="Reason for Merge" />

      <div>
        <label className={labelClass}>
          Why are these the same synagogue? <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <textarea
          required
          rows={3}
          value={reason}
          onChange={e => onReasonChange(e.target.value)}
          className={inputClass}
          placeholder="e.g. 'Same congregation, duplicate entries with different name spellings'"
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
          disabled={loading}
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

// ── Merge icon ────────────────────────────────────────────────────────────────

const mergeIcon = (
  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" clipRule="evenodd" />
  </svg>
)

// ── Main Component ────────────────────────────────────────────────────────────

export default function MergeSynagogueButton({ synagogueId, synagogueName }: Props) {
  const supabase = createClientComponentClient()

  const [user,          setUser]          = useState<User | null>(null)
  const [authReady,     setAuthReady]     = useState(false)
  const [modalOpen,     setModalOpen]     = useState(false)
  const [loginOpen,     setLoginOpen]     = useState(false)

  const [step,          setStep]          = useState<1 | 2 | 3>(1)
  const [suggestions,   setSuggestions]   = useState<SuggestionSynagogue[]>([])
  const [allSynagogues, setAllSynagogues] = useState<BasicSynagogue[]>([])
  const [searchTerm,    setSearchTerm]    = useState('')
  const [syn1Details,   setSyn1Details]   = useState<SynagogueDetails | null>(null)
  const [syn2Details,   setSyn2Details]   = useState<SynagogueDetails | null>(null)
  const [mergedData,    setMergedData]    = useState<MergedFields | null>(null)
  const [reason,        setReason]        = useState('')
  const [loading,       setLoading]       = useState(false)
  const [loadingStep2,  setLoadingStep2]  = useState(false)
  const [error,         setError]         = useState<string | null>(null)

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

  // Escape + scroll lock
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

  function resetState() {
    setSyn1Details(null)
    setSyn2Details(null)
    setMergedData(null)
    setReason('')
    setSearchTerm('')
    setError(null)
    setSuggestions([])
    setAllSynagogues([])
  }

  function doOpenModal() {
    setStep(1)
    resetState()
    setModalOpen(true)
    loadSuggestionsAndList()
  }

  async function loadSuggestionsAndList() {
    setLoading(true)
    try {
      const [suggestRes, listRes] = await Promise.all([
        fetch(`/api/synagogues/${synagogueId}/merge-suggestions`),
        supabase
          .from('synagogues')
          .select('id, name, status, founded_year')
          .eq('approved', true)
          .or('deleted.is.null,deleted.eq.false')
          .neq('id', synagogueId)
          .order('name', { ascending: true }),
      ])

      if (suggestRes.ok) {
        const body = await suggestRes.json()
        setSuggestions(body.suggestions ?? [])
      }
      if (listRes.data) {
        setAllSynagogues(listRes.data)
      }
    } catch {
      // Non-fatal — suggestions will just be empty
    } finally {
      setLoading(false)
    }
  }

  function closeModal() {
    setModalOpen(false)
    setStep(1)
  }

  async function selectSynagogue(syn: BasicSynagogue) {
    setLoadingStep2(true)
    setError(null)
    try {
      const [res1, res2] = await Promise.all([
        fetch(`/api/synagogues/${synagogueId}/full-details`),
        fetch(`/api/synagogues/${syn.id}/full-details`),
      ])

      if (!res1.ok || !res2.ok) {
        setError('Failed to load synagogue details. Please try again.')
        setLoadingStep2(false)
        return
      }

      const d1: SynagogueDetails = await res1.json()
      const d2: SynagogueDetails = await res2.json()

      setSyn1Details(d1)
      setSyn2Details(d2)

      setMergedData({
        name:         d1.synagogue.name,
        status:       d1.synagogue.status,
        founded_year: d1.synagogue.founded_year?.toString() ?? '',
        closed_year:  d1.synagogue.closed_year?.toString()  ?? '',
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
    if (!mergedData || !syn2Details || !user) return
    setError(null)

    if (!mergedData.name.trim()) {
      setError('Synagogue name is required.')
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

    const totalAddresses = (syn1Details?.addresses_count ?? 0) + syn2Details.addresses_count
    const totalRabbis    = (syn1Details?.rabbis_count    ?? 0) + syn2Details.rabbis_count
    const totalHistory   = (syn1Details?.history_count   ?? 0) + syn2Details.history_count
    const totalPhotos    = (syn1Details?.photos_count    ?? 0) + syn2Details.photos_count

    const { error: insertError } = await supabase
      .from('edit_proposals')
      .insert({
        synagogue_id:  synagogueId,
        entity_id:     null,
        proposal_type: 'synagogue_merge',
        proposed_data: {
          merge_source_id: synagogueId,
          merge_target_id: syn2Details.synagogue.id,
          merged_fields: {
            name:         mergedData.name.trim(),
            status:       mergedData.status,
            founded_year: mergedData.founded_year ? parseInt(mergedData.founded_year) : null,
            closed_year:  mergedData.closed_year  ? parseInt(mergedData.closed_year)  : null,
          },
          addresses_count: totalAddresses,
          rabbis_count:    totalRabbis,
          history_count:   totalHistory,
          photos_count:    totalPhotos,
        },
        current_data: {
          synagogue1_name: syn1Details?.synagogue.name ?? synagogueName,
          synagogue2_name: syn2Details.synagogue.name,
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
          Merge with Another Synagogue
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
          aria-label="Merge synagogue records"
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl border border-gray-200 dark:border-gray-700 max-h-[90vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-700 flex-shrink-0">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  {step === 3 ? 'Merge Proposed' : `Merge ${synagogueName}`}
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
                  synagogueName={synagogueName}
                  suggestions={suggestions}
                  allSynagogues={allSynagogues}
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  loading={loading}
                  loadingStep2={loadingStep2}
                  onSelect={selectSynagogue}
                  error={error}
                />
              )}
              {step === 2 && mergedData && syn1Details && syn2Details && (
                <Step2
                  syn1={syn1Details}
                  syn2={syn2Details}
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
