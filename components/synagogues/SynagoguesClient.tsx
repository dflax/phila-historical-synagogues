'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

interface Address {
  id: string
  street_address: string | null
  neighborhood: string | null
  city: string | null
  state: string | null
  zip_code: string | null
  is_current: boolean | null
  address_order: number | null
  start_year: number | null
  end_year: number | null
}

interface Synagogue {
  id: string
  name: string
  status: string
  founded_year: number | null
  founded_text: string | null
  closed_year: number | null
  closed_text: string | null
  addresses: Address[]
}

interface Props {
  synagogues: Synagogue[]
}

const STATUS_CONFIG: Record<string, { label: string; textColor: string; bgColor: string; dotColor: string }> = {
  active:  { label: 'Active',   textColor: 'text-green-700 dark:text-green-400',  bgColor: 'bg-green-50 dark:bg-green-900/20',   dotColor: 'bg-green-500' },
  closed:  { label: 'Closed',   textColor: 'text-red-700 dark:text-red-400',      bgColor: 'bg-red-50 dark:bg-red-900/20',       dotColor: 'bg-red-500' },
  merged:  { label: 'Merged',   textColor: 'text-amber-700 dark:text-amber-400',  bgColor: 'bg-amber-50 dark:bg-amber-900/20',   dotColor: 'bg-amber-500' },
  unknown: { label: 'Unknown',  textColor: 'text-gray-600 dark:text-gray-400',    bgColor: 'bg-gray-100 dark:bg-gray-700',       dotColor: 'bg-gray-400' },
}

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.unknown
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${cfg.textColor} ${cfg.bgColor}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dotColor}`} />
      {cfg.label}
    </span>
  )
}

function formatYearRange(
  founded_year: number | null,
  founded_text: string | null,
  closed_year: number | null,
  closed_text: string | null,
  status: string
): string {
  const f = founded_year ? String(founded_year) : (founded_text ?? null)
  const c = closed_year ? String(closed_year) : (closed_text ?? null)

  if (!f && !c) return '—'
  if (status === 'active') return f ? `Est. ${f}` : '—'
  if (f && c) return `${f} – ${c}`
  if (f) return `Est. ${f}`
  if (c) return `Closed ${c}`
  return '—'
}

function formatAddress(addr: Address): string {
  const parts: string[] = []
  if (addr.street_address) parts.push(addr.street_address)
  if (addr.neighborhood) parts.push(addr.neighborhood)
  if (addr.city && addr.city.toLowerCase() !== 'philadelphia') parts.push(addr.city)
  return parts.join(', ') || '—'
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-4 h-4 text-gray-400 dark:text-gray-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

export default function SynagoguesClient({ synagogues }: Props) {
  const searchParams = useSearchParams()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') ?? 'all')
  const [yearMin, setYearMin] = useState('')
  const [yearMax, setYearMax] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [sortField, setSortField] = useState<'name' | 'founded_year' | 'closed_year'>('name')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    const yMin = yearMin ? parseInt(yearMin) : null
    const yMax = yearMax ? parseInt(yearMax) : null

    return synagogues
      .filter(s => {
        if (q && !s.name.toLowerCase().includes(q)) return false
        if (statusFilter !== 'all' && s.status !== statusFilter) return false
        if (yMin !== null && (s.founded_year ?? s.closed_year ?? 0) < yMin) return false
        if (yMax !== null && (s.founded_year ?? s.closed_year ?? 9999) > yMax) return false
        return true
      })
      .sort((a, b) => {
        let av: string | number, bv: string | number
        if (sortField === 'name') {
          av = a.name.toLowerCase(); bv = b.name.toLowerCase()
        } else if (sortField === 'founded_year') {
          av = a.founded_year ?? 9999; bv = b.founded_year ?? 9999
        } else {
          av = a.closed_year ?? 9999; bv = b.closed_year ?? 9999
        }
        if (av === bv) return 0
        const cmp = av < bv ? -1 : 1
        return sortDir === 'asc' ? cmp : -cmp
      })
  }, [synagogues, search, statusFilter, yearMin, yearMax, sortField, sortDir])

  function toggleSort(field: typeof sortField) {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortField(field); setSortDir('asc') }
  }

  function SortButton({ field, label }: { field: typeof sortField; label: string }) {
    const active = sortField === field
    return (
      <button
        onClick={() => toggleSort(field)}
        className={`flex items-center gap-1 text-sm font-medium transition-colors ${
          active ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
        }`}
      >
        {label}
        <span className="text-xs">
          {active ? (sortDir === 'asc' ? '↑' : '↓') : <span className="text-gray-300 dark:text-gray-600">↕</span>}
        </span>
      </button>
    )
  }

  const hasFilters = search || statusFilter !== 'all' || yearMin || yearMax
  const clearFilters = () => { setSearch(''); setStatusFilter('all'); setYearMin(''); setYearMax('') }

  // Counts per status for filter badges
  const counts = useMemo(() => {
    const c: Record<string, number> = { active: 0, closed: 0, merged: 0, unknown: 0 }
    synagogues.forEach(s => { c[s.status] = (c[s.status] ?? 0) + 1 })
    return c
  }, [synagogues])

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-900">
      {/* Nav */}
      <nav className="bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
              Philadelphia Historical Synagogues
            </Link>
            <div className="flex gap-6">
              <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">Home</Link>
              <Link href="/map" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">Map</Link>
              <Link href="/synagogues" className="text-blue-600 dark:text-blue-400 font-medium border-b-2 border-blue-600 dark:border-blue-400 pb-0.5">Browse</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Synagogue Directory</h1>
          <p className="text-gray-500 dark:text-gray-400">{synagogues.length} congregations documented in the Philadelphia area</p>
        </div>

        {/* Status quick-filter pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(['all', 'active', 'closed', 'merged', 'unknown'] as const).map(s => {
            const cfg = s === 'all' ? null : STATUS_CONFIG[s]
            const count = s === 'all' ? synagogues.length : counts[s] ?? 0
            const active = statusFilter === s
            return (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  active
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {cfg && <span className={`w-2 h-2 rounded-full ${active ? 'bg-white' : cfg.dotColor}`} />}
                {s === 'all' ? 'All' : cfg!.label}
                <span className={`text-xs ${active ? 'text-blue-100' : 'text-gray-400 dark:text-gray-500'}`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Search + year range */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by name…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">Founded:</span>
              <input
                type="number"
                placeholder="From"
                value={yearMin}
                onChange={e => setYearMin(e.target.value)}
                className="w-24 px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                min={1700} max={2024}
              />
              <span className="text-gray-400 dark:text-gray-500">–</span>
              <input
                type="number"
                placeholder="To"
                value={yearMax}
                onChange={e => setYearMax(e.target.value)}
                className="w-24 px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                min={1700} max={2024}
              />
            </div>
            {hasFilters && (
              <button onClick={clearFilters} className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 underline whitespace-nowrap">
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Results bar + sort */}
        <div className="flex items-center justify-between mb-2 px-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {filtered.length === synagogues.length
              ? `${synagogues.length} synagogues`
              : `${filtered.length} of ${synagogues.length} synagogues`}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400 dark:text-gray-500">Sort:</span>
            <SortButton field="name" label="Name" />
            <SortButton field="founded_year" label="Founded" />
            <SortButton field="closed_year" label="Closed" />
          </div>
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <p className="text-4xl mb-3">🕍</p>
            <p className="font-semibold text-gray-700 dark:text-gray-200">No synagogues match your search</p>
            <button onClick={clearFilters} className="mt-2 text-blue-600 dark:text-blue-400 text-sm hover:underline">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-1">
            {filtered.map(s => {
              const isOpen = expandedId === s.id
              const primaryAddr = s.addresses[0] ?? null

              return (
                <div
                  key={s.id}
                  className={`bg-white dark:bg-gray-800 rounded-xl border transition-all duration-150 overflow-hidden ${
                    isOpen
                      ? 'border-blue-200 dark:border-blue-700 shadow-md'
                      : 'border-gray-200 dark:border-gray-700 shadow-sm hover:border-gray-300 dark:hover:border-gray-600 hover:shadow'
                  }`}
                >
                  {/* Collapsed row */}
                  <button
                    onClick={() => setExpandedId(isOpen ? null : s.id)}
                    className="w-full text-left px-5 py-4 flex items-center gap-4"
                  >
                    <ChevronIcon open={isOpen} />

                    {/* Name */}
                    <div className="flex-1 min-w-0">
                      <span className="font-semibold text-gray-900 dark:text-white leading-snug">{s.name}</span>
                      {primaryAddr?.neighborhood && (
                        <span className="text-gray-400 dark:text-gray-500 text-sm ml-2">· {primaryAddr.neighborhood}</span>
                      )}
                    </div>

                    {/* Years */}
                    <div className="hidden sm:block text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap w-36 text-right">
                      {formatYearRange(s.founded_year, s.founded_text, s.closed_year, s.closed_text, s.status)}
                    </div>

                    {/* Status */}
                    <div className="w-24 text-right">
                      <StatusBadge status={s.status} />
                    </div>
                  </button>

                  {/* Expanded detail */}
                  {isOpen && (
                    <div className="border-t border-blue-100 dark:border-blue-900 bg-blue-50/40 dark:bg-blue-900/10 px-5 py-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        {/* Left: details */}
                        <div className="space-y-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wide mb-3">Details</h3>

                          <div className="flex gap-2 text-sm">
                            <span className="text-gray-400 dark:text-gray-500 w-20 flex-shrink-0">Status</span>
                            <StatusBadge status={s.status} />
                          </div>

                          {(s.founded_year || s.founded_text) && (
                            <div className="flex gap-2 text-sm">
                              <span className="text-gray-400 dark:text-gray-500 w-20 flex-shrink-0">Founded</span>
                              <span className="text-gray-700 dark:text-gray-300">
                                {s.founded_year ?? s.founded_text}
                              </span>
                            </div>
                          )}

                          {(s.closed_year || s.closed_text) && (
                            <div className="flex gap-2 text-sm">
                              <span className="text-gray-400 dark:text-gray-500 w-20 flex-shrink-0">Closed</span>
                              <span className="text-gray-700 dark:text-gray-300">
                                {s.closed_year ?? s.closed_text}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Right: addresses */}
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wide mb-3">
                            {s.addresses.length > 1 ? `Locations (${s.addresses.length})` : 'Location'}
                          </h3>
                          {s.addresses.length === 0 ? (
                            <p className="text-sm text-gray-400 dark:text-gray-500 italic">No address on record</p>
                          ) : (
                            <div className="space-y-2">
                              {s.addresses.map((addr) => (
                                <div key={addr.id} className="text-sm">
                                  <div className="flex items-start gap-2">
                                    {s.addresses.length > 1 && (
                                      <span className="text-gray-300 dark:text-gray-600 mt-0.5">·</span>
                                    )}
                                    <div>
                                      <span className="text-gray-700 dark:text-gray-300">{formatAddress(addr)}</span>
                                      {addr.is_current && (
                                        <span className="ml-2 text-xs text-green-600 dark:text-green-400 font-medium">Current</span>
                                      )}
                                      {(addr.start_year || addr.end_year) && (
                                        <span className="ml-2 text-xs text-gray-400 dark:text-gray-500">
                                          ({addr.start_year ?? '?'} – {addr.end_year ?? 'present'})
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Footer link */}
                      <div className="mt-4 pt-3 border-t border-blue-100 dark:border-blue-900">
                        <Link
                          href={`/synagogues/${s.id}`}
                          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                        >
                          View full history →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center text-gray-400 dark:text-gray-500 text-sm pb-8">
          Showing {filtered.length} of {synagogues.length} congregations
        </div>
      </div>
    </main>
  )
}
