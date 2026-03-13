'use client'

import Link from 'next/link'
import { useState } from 'react'
import NavAuth from '@/components/auth/NavAuth'
import { useUserRole } from '@/hooks/useUserRole'
import ConfirmDialog from '@/components/common/ConfirmDialog'
import SuggestRabbiProfileButton from '@/components/edit/SuggestRabbiProfileButton'

// ── Types ────────────────────────────────────────────────────────────────────

interface RabbiProfile {
  id: string
  slug: string
  canonical_name: string
  birth_year: number | null
  death_year: number | null
  circa_birth: boolean | null
  circa_death: boolean | null
  biography: string | null
}

interface Affiliation {
  id: string
  title: string | null
  start_year: number | null
  end_year: number | null
  notes: string | null
  synagogue: { id: string; name: string } | null
}

interface Props {
  profile: RabbiProfile
  affiliations: Affiliation[]
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatLifespan(
  birth: number | null, death: number | null,
  circaBirth: boolean | null, circaDeath: boolean | null
): string | null {
  if (!birth && !death) return null
  const b = birth ? (circaBirth ? `c. ${birth}` : String(birth)) : '?'
  const d = death ? (circaDeath ? `c. ${death}` : String(death)) : 'present'
  return `${b} – ${d}`
}

function formatServiceYears(aff: Affiliation): string {
  if (!aff.start_year && !aff.end_year) return ''
  const s = aff.start_year ?? '?'
  const e = aff.end_year   ?? 'present'
  return `${s} – ${e}`
}

function SectionHeader({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-xl">{icon}</span>
      <h2 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h2>
    </div>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <p className="text-sm text-gray-400 dark:text-gray-500 italic py-2">{message}</p>
  )
}

// ── Biography (expandable) ───────────────────────────────────────────────────

const BIO_COLLAPSE_THRESHOLD = 400 // characters

function Biography({ text }: { text: string }) {
  const isLong   = text.length > BIO_COLLAPSE_THRESHOLD
  const [expanded, setExpanded] = useState(!isLong)

  return (
    <div>
      <p className={`text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap ${!expanded ? 'line-clamp-6' : ''}`}>
        {text}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded(v => !v)}
          className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  )
}

// ── Delete button (editors only) ─────────────────────────────────────────────

function TrashButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      title="Delete"
      className="flex-shrink-0 text-gray-300 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 transition p-0.5 rounded"
      aria-label="Delete"
    >
      <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    </button>
  )
}

// ── Main Component ───────────────────────────────────────────────────────────

interface PendingDelete {
  endpoint: string
  id: string
  label: string
  remove: (id: string) => void
}

export default function RabbiDetail({ profile, affiliations: initialAffiliations }: Props) {
  const { isEditor, isAdmin } = useUserRole()

  const [affiliations,  setAffiliations]  = useState<Affiliation[]>(initialAffiliations)
  const [pendingDelete, setPendingDelete] = useState<PendingDelete | null>(null)

  function requestDelete(endpoint: string, id: string, label: string, remove: (id: string) => void) {
    setPendingDelete({ endpoint, id, label, remove })
  }

  async function executeDelete(): Promise<void> {
    if (!pendingDelete) return
    const { endpoint, id, remove } = pendingDelete
    const res = await fetch(`/api/${endpoint}/${id}`, { method: 'DELETE' })
    if (res.ok) {
      remove(id)
      setPendingDelete(null)
    } else {
      const body = await res.json().catch(() => ({}))
      throw new Error(body.error ?? 'Delete failed. Please try again.')
    }
  }

  const lifespan = formatLifespan(
    profile.birth_year, profile.death_year,
    profile.circa_birth, profile.circa_death
  )

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-900">

      {/* Nav */}
      <nav className="bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
              Philadelphia Historical Synagogues
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">Home</Link>
              <Link href="/map" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">Map</Link>
              <Link href="/synagogues" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">Browse</Link>
              <NavAuth />
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-6">
          <Link href="/synagogues" className="hover:text-blue-600 dark:hover:text-blue-400 transition">← Back to directory</Link>
        </div>

        {/* Hero header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {profile.canonical_name}
              </h1>
              {lifespan && (
                <p className="text-sm text-gray-500 dark:text-gray-400">{lifespan}</p>
              )}
              {affiliations.length > 0 && (
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                  Served at {affiliations.length} synagogue{affiliations.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>

            {/* Suggest edit */}
            <div className="flex-shrink-0">
              <SuggestRabbiProfileButton profile={profile} />
            </div>
          </div>

          {/* Admin: delete profile */}
          {isAdmin && (
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
              <button
                onClick={() => requestDelete('rabbi-profiles', profile.id, 'rabbi profile', () => {
                  // Soft-delete handled server-side; redirect on success
                  window.location.href = '/synagogues'
                })}
                className="flex items-center gap-1.5 text-sm text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition"
              >
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Delete Profile
              </button>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* ── Left column: biography ── */}
          <div className="lg:col-span-1 space-y-6">

            {/* Biography */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
              <SectionHeader icon="📜" title="Biography" />
              {profile.biography ? (
                <Biography text={profile.biography} />
              ) : (
                <EmptyState message="No biography on record" />
              )}
            </div>

            {/* Photos placeholder */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
              <SectionHeader icon="🖼️" title="Photos" />
              <div className="py-4 text-center">
                <p className="text-gray-400 dark:text-gray-500 italic text-sm">No photos yet.</p>
                <p className="text-gray-300 dark:text-gray-600 text-xs mt-1">Photos will appear here once uploaded.</p>
              </div>
            </div>

          </div>

          {/* ── Right column: synagogue affiliations ── */}
          <div className="lg:col-span-2 space-y-6">

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
              <SectionHeader icon="✡️" title="Synagogue Affiliations" />

              {affiliations.length === 0 ? (
                <EmptyState message="No synagogue affiliations on record" />
              ) : (
                <div className="space-y-3">
                  {affiliations.map(aff => (
                    <div key={aff.id} className="flex items-start justify-between gap-2 group">
                      <div className="flex-1 min-w-0 text-sm border-l-2 border-blue-100 dark:border-blue-800 pl-3">

                        {/* Synagogue name */}
                        {aff.synagogue ? (
                          <Link
                            href={`/synagogues/${aff.synagogue.id}`}
                            className="font-semibold text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-200 transition"
                          >
                            {aff.synagogue.name}
                          </Link>
                        ) : (
                          <span className="font-semibold text-gray-700 dark:text-gray-300">
                            Unknown synagogue
                          </span>
                        )}

                        {/* Title */}
                        {aff.title && (
                          <div className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">
                            {aff.title}
                          </div>
                        )}

                        {/* Years of service */}
                        {(aff.start_year || aff.end_year) && (
                          <div className="text-gray-400 dark:text-gray-500 text-xs">
                            {formatServiceYears(aff)}
                          </div>
                        )}

                        {/* Notes */}
                        {aff.notes && (
                          <div className="text-gray-500 dark:text-gray-400 text-xs mt-1 italic">
                            {aff.notes}
                          </div>
                        )}
                      </div>

                      {isEditor && (
                        <TrashButton
                          onClick={() => requestDelete(
                            'rabbis',
                            aff.id,
                            'affiliation',
                            id => setAffiliations(prev => prev.filter(a => a.id !== id))
                          )}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <ConfirmDialog
        isOpen={pendingDelete !== null}
        title={`Delete ${pendingDelete?.label ?? 'item'}`}
        message={`Are you sure you want to delete this ${pendingDelete?.label ?? 'item'}? This cannot be undone.`}
        onConfirm={executeDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </main>
  )
}
