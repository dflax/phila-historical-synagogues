'use client'

import Link from 'next/link'
import { useState } from 'react'
import AppHeader from '@/components/layout/AppHeader'
import { useUserRole } from '@/hooks/useUserRole'
import ConfirmDialog from '@/components/common/ConfirmDialog'
import SuggestRabbiProfileButton from '@/components/edit/SuggestRabbiProfileButton'
import DeleteRabbiButton from '@/components/edit/DeleteRabbiButton'
import MergeRabbiButton from '@/components/edit/MergeRabbiButton'
import SplitRabbiButton from '@/components/edit/SplitRabbiButton'
import AddSynagogueAffiliationButton from '@/components/edit/AddSynagogueAffiliationButton'
import EditAffiliationButton from '@/components/edit/EditAffiliationButton'
import AddLinkButton from '@/components/edit/AddLinkButton'
import LinksSection from '@/components/common/LinksSection'
import PhotoUploadButton from '@/components/photos/PhotoUploadButton'

// ── Types ────────────────────────────────────────────────────────────────────

interface RabbiProfile {
  id: string
  slug: string
  canonical_name: string
  person_type: string
  birth_year: number | null
  death_year: number | null
  circa_birth: boolean | null
  circa_death: boolean | null
  biography: string | null
  birthplace: string | null
  death_place: string | null
  seminary: string | null
  ordination_year: number | null
  denomination: string | null
  languages: string[] | null
  publications: string | null
  achievements: string | null
}

interface Affiliation {
  id: string
  title: string | null
  start_year: number | null
  end_year: number | null
  notes: string | null
  synagogue_id: string
  synagogue: { id: string; name: string } | null
}

interface RabbiImage {
  id: string
  url: string | null
  caption: string | null
  description: string | null
  year: number | null
  circa_year: boolean | null
  is_primary: boolean | null
  display_order: number | null
  photographer: string | null
  source: string | null
  credit_line: string | null
}

interface LinkItem {
  id:          string
  link_type:   string
  url:         string
  title:       string | null
  description: string | null
}

interface Props {
  profile:      RabbiProfile
  affiliations: Affiliation[]
  photos:       RabbiImage[]
  links:        LinkItem[]
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

const BIO_COLLAPSE_THRESHOLD  = 400  // characters
const LONG_COLLAPSE_THRESHOLD = 300  // characters for publications / achievements

function ExpandableText({ text, threshold = LONG_COLLAPSE_THRESHOLD, className = '' }: {
  text: string
  threshold?: number
  className?: string
}) {
  const isLong = text.length > threshold
  const [expanded, setExpanded] = useState(!isLong)

  return (
    <div>
      <p className={`text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap ${!expanded ? 'line-clamp-4' : ''} ${className}`}>
        {text}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded(v => !v)}
          className="mt-1 text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  )
}

function Biography({ text }: { text: string }) {
  return <ExpandableText text={text} threshold={BIO_COLLAPSE_THRESHOLD} />
}

// ── Biographical Details section ─────────────────────────────────────────────

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-2 py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
      <dt className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide w-24 flex-shrink-0 pt-0.5">
        {label}
      </dt>
      <dd className="flex-1 text-sm text-gray-700 dark:text-gray-300">
        {children}
      </dd>
    </div>
  )
}

function BiographicalDetails({ profile }: { profile: RabbiProfile }) {
  // Build year strings with circa
  const bornParts: string[] = []
  if (profile.birthplace)  bornParts.push(profile.birthplace)
  if (profile.birth_year)  bornParts.push(profile.circa_birth ? `c. ${profile.birth_year}` : String(profile.birth_year))

  const diedParts: string[] = []
  if (profile.death_place) diedParts.push(profile.death_place)
  if (profile.death_year)  diedParts.push(profile.circa_death ? `c. ${profile.death_year}` : String(profile.death_year))

  const hasBorn         = bornParts.length > 0
  const hasDied         = diedParts.length > 0
  const hasSeminary     = !!profile.seminary
  const hasOrdination   = !!profile.ordination_year
  const hasDenomination = !!profile.denomination
  const hasLanguages    = !!(profile.languages && profile.languages.length > 0)
  const hasPublications = !!profile.publications
  const hasAchievements = !!profile.achievements

  const hasAny = hasBorn || hasDied || hasSeminary || hasOrdination ||
    hasDenomination || hasLanguages || hasPublications || hasAchievements

  if (!hasAny) return null

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
      <SectionHeader icon="🔍" title="Biographical Details" />
      <dl>
        {hasBorn && (
          <DetailRow label="Born">
            {bornParts.join(', ')}
          </DetailRow>
        )}
        {hasDied && (
          <DetailRow label="Died">
            {diedParts.join(', ')}
          </DetailRow>
        )}
        {hasSeminary && (
          <DetailRow label="Education">
            {profile.seminary}
          </DetailRow>
        )}
        {hasOrdination && (
          <DetailRow label="Ordained">
            {profile.ordination_year}
          </DetailRow>
        )}
        {hasDenomination && (
          <DetailRow label="Movement">
            {profile.denomination}
          </DetailRow>
        )}
        {hasLanguages && (
          <DetailRow label="Languages">
            {profile.languages!.join(', ')}
          </DetailRow>
        )}
        {hasPublications && (
          <DetailRow label="Publications">
            <ExpandableText text={profile.publications!} />
          </DetailRow>
        )}
        {hasAchievements && (
          <DetailRow label="Achievements">
            <ExpandableText text={profile.achievements!} />
          </DetailRow>
        )}
      </dl>
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

export default function RabbiDetail({ profile, affiliations: initialAffiliations, photos: initialPhotos, links }: Props) {
  const { isEditor, isAdmin, isContributor } = useUserRole()

  const [affiliations,  setAffiliations]  = useState<Affiliation[]>(initialAffiliations)
  const [photos,        setPhotos]        = useState<RabbiImage[]>(initialPhotos)
  const [lightboxImg,   setLightboxImg]   = useState<RabbiImage | null>(null)
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

      <AppHeader />

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
              {affiliations.length > 0 && (() => {
                const current = affiliations.filter(a => a.end_year === null)
                const past    = affiliations.filter(a => a.end_year !== null)
                const hasBoth = current.length > 0 && past.length > 0
                return (
                  <div className="text-sm text-gray-400 dark:text-gray-500 mt-1 space-y-0.5">
                    {hasBoth ? (
                      <>
                        <p>{`Is currently affiliated with ${current.length} synagogue${current.length !== 1 ? 's' : ''}`}</p>
                        <p>{`Has previously been affiliated with ${past.length} synagogue${past.length !== 1 ? 's' : ''}`}</p>
                      </>
                    ) : current.length > 0 ? (
                      <p>{`Is currently affiliated with ${current.length} synagogue${current.length !== 1 ? 's' : ''}`}</p>
                    ) : (
                      <p>{`Has been affiliated with ${past.length} synagogue${past.length !== 1 ? 's' : ''}`}</p>
                    )}
                  </div>
                )
              })()}
            </div>

            {/* Suggest edit — visible to logged-in contributors only */}
            {isContributor && (
              <div className="flex-shrink-0">
                <SuggestRabbiProfileButton profile={profile} />
              </div>
            )}
          </div>

          {/* Merge & delete actions — visible to logged-in contributors only */}
          {isContributor && (
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-end gap-4">
              <SplitRabbiButton
                rabbiId={profile.id}
                rabbiName={profile.canonical_name}
                rabbiData={{
                  canonical_name:  profile.canonical_name,
                  birth_year:      profile.birth_year,
                  circa_birth:     profile.circa_birth,
                  death_year:      profile.death_year,
                  circa_death:     profile.circa_death,
                  biography:       profile.biography,
                  birthplace:      profile.birthplace,
                  death_place:     profile.death_place,
                  seminary:        profile.seminary,
                  ordination_year: profile.ordination_year,
                  denomination:    profile.denomination,
                  languages:       profile.languages,
                  publications:    profile.publications,
                  achievements:    profile.achievements,
                }}
                affiliations={affiliations}
                images={photos}
              />
              <MergeRabbiButton
                rabbiId={profile.id}
                rabbiName={profile.canonical_name}
              />
              <DeleteRabbiButton
                profile={profile}
                affiliationCount={affiliations.length}
                photoCount={photos.length}
              />
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

            {/* Biographical Details */}
            <BiographicalDetails profile={profile} />

            {/* Photos */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
              <SectionHeader icon="🖼️" title="Photos" />
              {photos.length === 0 ? (
                <div className="py-4 text-center">
                  <p className="text-gray-400 dark:text-gray-500 italic text-sm">No photos yet.</p>
                  <p className="text-gray-300 dark:text-gray-600 text-xs mt-1">Photos will appear here once uploaded.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {photos.map(img => (
                    <div key={img.id} className="relative group aspect-square">
                      <button
                        onClick={() => setLightboxImg(img)}
                        className="w-full h-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition"
                      >
                        {img.url ? (
                          <img
                            src={img.url}
                            alt={img.caption ?? img.description ?? profile.canonical_name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-gray-600 text-3xl">
                            🖼️
                          </div>
                        )}
                        {img.year && (
                          <span className="absolute bottom-1 right-1 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded">
                            {img.circa_year ? 'c. ' : ''}{img.year}
                          </span>
                        )}
                      </button>
                      {isEditor && (
                        <button
                          onClick={() => requestDelete('images', img.id, 'photo', id => {
                            setPhotos(prev => prev.filter(p => p.id !== id))
                            if (lightboxImg?.id === id) setLightboxImg(null)
                          })}
                          title="Delete photo"
                          className="absolute top-1 right-1 bg-black/50 hover:bg-red-600 text-white rounded p-1 opacity-0 group-hover:opacity-100 transition"
                          aria-label="Delete photo"
                        >
                          <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {isContributor && (
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <PhotoUploadButton
                    entityType="rabbi"
                    entityId={profile.id}
                    entityName={profile.canonical_name}
                  />
                </div>
              )}
            </div>

          </div>

          {/* ── Right column: synagogue affiliations ── */}
          <div className="lg:col-span-2 space-y-6">

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">✡️</span>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Synagogue Affiliations</h2>
                </div>
                {isContributor && (
                  <AddSynagogueAffiliationButton
                    rabbiId={profile.id}
                    rabbiName={profile.canonical_name}
                  />
                )}
              </div>

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

                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {isEditor && (
                          <EditAffiliationButton
                            affiliation={{
                              id:         aff.id,
                              role_title: aff.title,
                              start_year: aff.start_year,
                              end_year:   aff.end_year,
                              notes:      aff.notes,
                            }}
                            personProfile={{
                              id:             profile.id,
                              canonical_name: profile.canonical_name,
                              person_type:    (profile.person_type as 'rabbi' | 'chazzan' | 'lay_leader' | 'staff' | 'other') ?? 'rabbi',
                              slug:           profile.slug,
                            }}
                            synagogueId={aff.synagogue_id}
                          />
                        )}
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
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Links & Resources */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <SectionHeader icon="🔗" title="Links & Resources" />
                {isContributor && (
                  <AddLinkButton
                    entityType="rabbi"
                    entityId={profile.id}
                    entityName={profile.canonical_name}
                  />
                )}
              </div>
              {links.length > 0 ? (
                <LinksSection links={links} />
              ) : (
                <p className="text-sm text-gray-400 dark:text-gray-500 italic">
                  No links have been added yet.
                </p>
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

      {/* Lightbox */}
      {lightboxImg && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden max-w-2xl w-full shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {lightboxImg.url && (
              <img
                src={lightboxImg.url}
                alt={lightboxImg.caption ?? ''}
                className="w-full object-contain max-h-[60vh]"
              />
            )}
            <div className="p-4">
              {lightboxImg.caption && (
                <p className="text-sm font-medium text-gray-800 dark:text-white">{lightboxImg.caption}</p>
              )}
              {lightboxImg.description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{lightboxImg.description}</p>
              )}
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                {lightboxImg.year && (
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {lightboxImg.circa_year ? 'c. ' : ''}{lightboxImg.year}
                  </span>
                )}
                {lightboxImg.photographer && (
                  <span className="text-xs text-gray-400 dark:text-gray-500">📷 {lightboxImg.photographer}</span>
                )}
                {lightboxImg.credit_line && (
                  <span className="text-xs text-gray-400 dark:text-gray-500">{lightboxImg.credit_line}</span>
                )}
                {lightboxImg.source && (
                  <span className="text-xs text-gray-400 dark:text-gray-500">Source: {lightboxImg.source}</span>
                )}
              </div>
            </div>
            <div className="border-t dark:border-gray-700 px-4 py-3 flex justify-end">
              <button
                onClick={() => setLightboxImg(null)}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
