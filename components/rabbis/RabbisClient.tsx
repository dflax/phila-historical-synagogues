'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import AppHeader from '@/components/layout/AppHeader'
import CreateRabbiButton from '@/components/edit/CreateRabbiButton'

interface RabbiRow {
  id: string
  slug: string
  canonical_name: string
  birth_year: number | null
  death_year: number | null
  circa_birth: boolean | null
  circa_death: boolean | null
  affiliation_count: number
}

interface Props {
  rabbis: RabbiRow[]
}

function formatLifespan(
  birth: number | null, death: number | null,
  circaBirth: boolean | null, circaDeath: boolean | null
): string | null {
  if (!birth && !death) return null
  const b = birth ? (circaBirth ? `c. ${birth}` : String(birth)) : '?'
  const d = death ? (circaDeath ? `c. ${death}` : String(death)) : 'present'
  return `${b} – ${d}`
}

export default function RabbisClient({ rabbis }: Props) {
  const [search, setSearch] = useState('')

  const groups = useMemo(() => {
    const q = search.toLowerCase().trim()
    const filtered = q
      ? rabbis.filter(r => r.canonical_name.toLowerCase().includes(q))
      : rabbis

    const byLetter: Record<string, RabbiRow[]> = {}
    filtered.forEach(r => {
      const letter = r.canonical_name[0]?.toUpperCase() ?? '#'
      if (!byLetter[letter]) byLetter[letter] = []
      byLetter[letter].push(r)
    })

    return Object.entries(byLetter).sort(([a], [b]) => a.localeCompare(b))
  }, [rabbis, search])

  const totalVisible = groups.reduce((sum, [, rows]) => sum + rows.length, 0)
  const hasSearch = search.trim().length > 0

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-900">

      <AppHeader />

      <div className="container mx-auto px-4 py-8 max-w-4xl">

        {/* Page header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Leadership</h1>
            <p className="text-gray-500 dark:text-gray-400">{rabbis.length} clergy and leaders documented in Philadelphia-area synagogue records</p>
          </div>
          <div className="flex-shrink-0 mt-1">
            <CreateRabbiButton />
          </div>
        </div>

        {/* Search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-4">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by name…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-9 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Clear search"
              >
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-3 px-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {totalVisible === rabbis.length
              ? `${rabbis.length} person${rabbis.length !== 1 ? 's' : ''}`
              : `${totalVisible} of ${rabbis.length} people`}
          </p>
        </div>

        {/* Empty state */}
        {groups.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <p className="text-4xl mb-3">✡️</p>
            <p className="font-semibold text-gray-700 dark:text-gray-200">No results match your search</p>
            {hasSearch && (
              <button onClick={() => setSearch('')} className="mt-2 text-blue-600 dark:text-blue-400 text-sm hover:underline">
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {groups.map(([letter, rows]) => (
              <div key={letter}>
                {/* Letter header */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400 w-7 text-center">{letter}</span>
                  <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                </div>

                {/* Rabbi rows */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden">
                  {rows.map(r => {
                    const lifespan = formatLifespan(r.birth_year, r.death_year, r.circa_birth, r.circa_death)
                    return (
                      <Link
                        key={r.id}
                        href={`/leadership/${r.slug}`}
                        className="flex items-center gap-4 px-5 py-3.5 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition group"
                      >
                        {/* Name */}
                        <div className="flex-1 min-w-0">
                          <span className="font-medium text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition">
                            {r.canonical_name}
                          </span>
                          {lifespan && (
                            <span className="ml-2 text-sm text-gray-400 dark:text-gray-500">{lifespan}</span>
                          )}
                        </div>

                        {/* Affiliation count */}
                        <div className="flex-shrink-0 text-sm text-gray-400 dark:text-gray-500 whitespace-nowrap">
                          {r.affiliation_count > 0 ? (
                            <span>
                              {r.affiliation_count} synagogue{r.affiliation_count !== 1 ? 's' : ''}
                            </span>
                          ) : (
                            <span className="italic">no affiliations</span>
                          )}
                        </div>

                        {/* Arrow */}
                        <svg className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-blue-400 dark:group-hover:text-blue-500 flex-shrink-0 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-gray-400 dark:text-gray-500 text-sm pb-8">
          Showing {totalVisible} of {rabbis.length} people
        </div>
      </div>
    </main>
  )
}
