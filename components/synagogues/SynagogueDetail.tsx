'use client'

import Link from 'next/link'
import { useState } from 'react'
import MiniMap from '@/components/map/MiniMap'
import SuggestEditButton from '@/components/edit/SuggestEditButton'
import SuggestAddressButton from '@/components/edit/SuggestAddressButton'
import SuggestRabbiButton from '@/components/edit/SuggestRabbiButton'
import SuggestHistoryButton from '@/components/edit/SuggestHistoryButton'
import PhotoUploadButton from '@/components/photos/PhotoUploadButton'
import AppHeader from '@/components/layout/AppHeader'
import { useUserRole } from '@/hooks/useUserRole'
import ConfirmDialog from '@/components/common/ConfirmDialog'
import DeleteSynagogueButton from '@/components/edit/DeleteSynagogueButton'
import MergeSynagogueButton from '@/components/edit/MergeSynagogueButton'
import SplitSynagogueButton from '@/components/edit/SplitSynagogueButton'
import AddRabbiAffiliationButton from '@/components/edit/AddRabbiAffiliationButton'
import EditAffiliationButton from '@/components/edit/EditAffiliationButton'
import AddRelationshipButton from '@/components/edit/AddRelationshipButton'
import DeleteRelationshipModal from '@/components/edit/DeleteRelationshipModal'
import AddLinkButton from '@/components/edit/AddLinkButton'
import LinksSection from '@/components/common/LinksSection'
import HistoryList from '@/components/synagogues/HistoryList'

// ── Types ────────────────────────────────────────────────────────────────────

interface Synagogue {
  id: string
  name: string
  status: string
  founded_year: number | null
  founded_text: string | null
  closed_year: number | null
  closed_text: string | null
}

interface Address {
  id: string
  street_address: string | null
  neighborhood: string | null
  city: string | null
  state: string | null
  zip_code: string | null
  latitude: number | null
  longitude: number | null
  is_current: boolean | null
  start_year: number | null
  end_year: number | null
  address_order: number | null
}

interface HistoryEntry {
  id: string
  entry_type: string | null
  content: string | null
  year: number | null
  year_range_start: number | null
  year_range_end: number | null
  circa: boolean | null
  source: string | null
  source_url: string | null
  display_order: number | null
}

interface Rabbi {
  id: string
  name: string | null
  title: string | null
  start_year: number | null
  end_year: number | null
  notes: string | null
  slug: string | null
  profile_id: string
  person_type: 'rabbi' | 'chazzan' | 'lay_leader' | 'staff' | 'other'
}

interface Image {
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

interface Relationship {
  id:                string
  relationship_type: string
  relationship_year: number | null
  notes:             string | null
  related_synagogue: { id: string; name: string } | null
}

interface Props {
  synagogue:     Synagogue
  addresses:     Address[]
  history:       HistoryEntry[]
  rabbis:        Rabbi[]
  images:        Image[]
  links:         LinkItem[]
  relationships: Relationship[]
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<string, { label: string; textColor: string; bgColor: string; dotColor: string }> = {
  active:  { label: 'Active',   textColor: 'text-green-700 dark:text-green-400', bgColor: 'bg-green-50 dark:bg-green-900/20',  dotColor: 'bg-green-500' },
  closed:  { label: 'Closed',   textColor: 'text-red-700 dark:text-red-400',     bgColor: 'bg-red-50 dark:bg-red-900/20',      dotColor: 'bg-red-500' },
  merged:  { label: 'Merged',   textColor: 'text-amber-700 dark:text-amber-400', bgColor: 'bg-amber-50 dark:bg-amber-900/20',  dotColor: 'bg-amber-500' },
  unknown: { label: 'Unknown',  textColor: 'text-gray-600 dark:text-gray-400',   bgColor: 'bg-gray-100 dark:bg-gray-700',      dotColor: 'bg-gray-400' },
}

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.unknown
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${cfg.textColor} ${cfg.bgColor}`}>
      <span className={`w-2 h-2 rounded-full ${cfg.dotColor}`} />
      {cfg.label}
    </span>
  )
}

function formatYearLabel(year: number | null, yearText: string | null, circa: boolean | null): string {
  if (!year && !yearText) return '?'
  const y = year ? String(year) : yearText!
  return circa ? `c. ${y}` : y
}

function formatHistoryYear(entry: HistoryEntry): string {
  if (entry.year_range_start && entry.year_range_end) {
    return `${entry.year_range_start}–${entry.year_range_end}`
  }
  if (entry.year) return entry.circa ? `c. ${entry.year}` : String(entry.year)
  if (entry.year_range_start) return `${entry.year_range_start}–`
  return ''
}


function getRelationshipIcon(type: string): string {
  const icons: Record<string, string> = {
    merged_into:         '🔀',
    merged_from:         '🔀',
    split_into:          '🔱',
    split_from:          '🔱',
    predecessor:         '←',
    successor:           '→',
    parent_organization: '⬆️',
    branch_of:           '↗️',
  }
  return icons[type] ?? '🔗'
}

function getRelationshipLabel(type: string, relatedName: string, year: number | null): string {
  const truncated = relatedName.length > 30 ? relatedName.slice(0, 30) + '…' : relatedName
  const yearStr   = year ? ` (${year})` : ''
  const labels: Record<string, string> = {
    merged_into:         `Merged into ${truncated}${yearStr}`,
    merged_from:         `Merger with ${truncated}${yearStr}`,
    split_into:          `Split, forming ${truncated}${yearStr}`,
    split_from:          `Formed from ${truncated}${yearStr}`,
    predecessor:         `Preceded by ${truncated}${yearStr}`,
    successor:           `Succeeded by ${truncated}${yearStr}`,
    parent_organization: `Branch of ${truncated}`,
    branch_of:           `Part of ${truncated}`,
  }
  return labels[type] ?? `Related to ${truncated}`
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

// ── Main Component ───────────────────────────────────────────────────────────

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

interface PendingDelete {
  endpoint: string
  id: string
  label: string
  remove: (id: string) => void
}

export default function SynagogueDetail({ synagogue, addresses: initialAddresses, history: initialHistory, rabbis: initialRabbis, images: initialImages, links, relationships }: Props) {
  const { isEditor, isContributor } = useUserRole()

  const [addresses,     setAddresses]     = useState<Address[]>(initialAddresses)
  const [history,       setHistory]       = useState<HistoryEntry[]>(initialHistory)
  const [rabbis,        setRabbis]        = useState<Rabbi[]>(initialRabbis)
  const [images,        setImages]        = useState<Image[]>(initialImages)
  const [lightboxImg,           setLightboxImg]           = useState<Image | null>(null)
  const [pendingDelete,         setPendingDelete]         = useState<PendingDelete | null>(null)
  const [relationshipToDelete,  setRelationshipToDelete]  = useState<Relationship | null>(null)

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

  function cancelDelete() {
    setPendingDelete(null)
  }

  // Prefer is_current for map/hero; addresses list is sorted by start_year (oldest first)
  const primaryAddr = addresses.find(a => a.is_current) ?? addresses[addresses.length - 1] ?? null
  const mapUrl = primaryAddr?.latitude && primaryAddr?.longitude
    ? `/map?lat=${primaryAddr.latitude}&lng=${primaryAddr.longitude}&id=${synagogue.id}`
    : '/map'

  const foundedLabel = formatYearLabel(synagogue.founded_year, synagogue.founded_text, null)
  const closedLabel  = formatYearLabel(synagogue.closed_year, synagogue.closed_text, null)

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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{synagogue.name}</h1>
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge status={synagogue.status} />
                {(synagogue.founded_year || synagogue.founded_text) && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {synagogue.status === 'active'
                      ? `Est. ${foundedLabel}`
                      : `${foundedLabel} – ${closedLabel}`}
                  </span>
                )}
                {primaryAddr?.neighborhood && (
                  <span className="text-sm text-gray-400 dark:text-gray-500">· {primaryAddr.neighborhood}</span>
                )}
              </div>

              {/* Organizational relationships */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                {relationships
                  .filter(rel => rel.related_synagogue !== null)
                  .map(rel => (
                    <div key={rel.id} className="relative group">
                      <Link
                        href={`/synagogues/${rel.related_synagogue!.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-full text-amber-900 dark:text-amber-100 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors"
                      >
                        <span aria-hidden="true">
                          {getRelationshipIcon(rel.relationship_type)}
                        </span>
                        <span className="text-xs font-medium">
                          {getRelationshipLabel(
                            rel.relationship_type,
                            rel.related_synagogue!.name,
                            rel.relationship_year,
                          )}
                        </span>
                      </Link>

                      {isContributor && (
                        <button
                          onClick={e => {
                            e.preventDefault()
                            e.stopPropagation()
                            setRelationshipToDelete(rel)
                          }}
                          className="absolute -top-1.5 -right-1.5 z-10 opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold transition-opacity shadow-sm pointer-events-auto"
                          title="Propose deletion of this relationship"
                          aria-label="Delete relationship"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                {isContributor && (
                  <AddRelationshipButton
                    synagogueId={synagogue.id}
                    synagogueName={synagogue.name}
                  />
                )}
              </div>
            </div>
            {primaryAddr?.latitude && primaryAddr?.longitude ? (
              <MiniMap
                lat={primaryAddr.latitude}
                lng={primaryAddr.longitude}
                status={synagogue.status}
                mapUrl={mapUrl}
              />
            ) : (
              <Link
                href={mapUrl}
                className="flex-shrink-0 inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition shadow-sm"
              >
                🗺️ View on Map
              </Link>
            )}
          </div>

          {/* Action row — visible to logged-in contributors only */}
          {isContributor && (
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <PhotoUploadButton
                entityType="synagogue"
                entityId={synagogue.id}
                entityName={synagogue.name}
              />
              <div className="flex items-center gap-4">
                <AddRelationshipButton
                  synagogueId={synagogue.id}
                  synagogueName={synagogue.name}
                />
                <SuggestEditButton
                  synagogue={synagogue}
                  primaryNeighborhood={primaryAddr?.neighborhood ?? null}
                />
              </div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* ── Left column: addresses + rabbis ── */}
          <div className="lg:col-span-1 space-y-6">

            {/* Addresses */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
              <SectionHeader icon="📍" title="Locations" />
              {addresses.length === 0 ? (
                <EmptyState message="No address on record" />
              ) : (
                <div className="space-y-4">
                  {addresses.map(addr => (
                    <div key={addr.id} className="text-sm flex items-start justify-between gap-2 group">
                      <div className="flex-1 min-w-0">
                        {/* Line 1: street address */}
                        <div className="font-medium text-gray-800 dark:text-gray-200">
                          {addr.street_address || 'Address on record'}
                        </div>
                        {/* Line 2: city, state zip */}
                        {(addr.city || addr.state || addr.zip_code) && (
                          <div className="text-gray-600 dark:text-gray-400">
                            {[
                              [addr.city, addr.state].filter(Boolean).join(', '),
                              addr.zip_code,
                            ].filter(Boolean).join(' ')}
                          </div>
                        )}
                        {/* Line 3: neighborhood (linked to filtered browse) */}
                        {addr.neighborhood && (
                          <Link
                            href={`/synagogues?neighborhood=${encodeURIComponent(addr.neighborhood)}`}
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            {addr.neighborhood}
                          </Link>
                        )}
                        <div className="flex flex-wrap gap-2 mt-1">
                          {addr.is_current && (
                            synagogue.status === 'active'
                              ? <span className="text-xs text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">Current</span>
                              : <span className="text-xs text-gray-500 dark:text-gray-400 font-medium bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">Last</span>
                          )}
                          {(addr.start_year || addr.end_year) && (
                            <span className="text-xs text-gray-400 dark:text-gray-500">
                              {addr.start_year ?? '?'} – {addr.end_year ?? 'present'}
                            </span>
                          )}
                        </div>
                      </div>
                      {isEditor && (
                        <TrashButton onClick={() => requestDelete('addresses', addr.id, 'address', id => setAddresses(prev => prev.filter(a => a.id !== id)))} />
                      )}
                    </div>
                  ))}
                </div>
              )}
              {isContributor && (
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <SuggestAddressButton
                    synagogueId={synagogue.id}
                    synagogueName={synagogue.name}
                  />
                </div>
              )}
            </div>

            {/* Rabbis */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">✡️</span>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Leadership</h2>
                </div>
                {isContributor && (
                  <AddRabbiAffiliationButton
                    synagogueId={synagogue.id}
                    synagogueName={synagogue.name}
                  />
                )}
              </div>
              {rabbis.length === 0 ? (
                <EmptyState message="No rabbis on record" />
              ) : (
                <div className="space-y-3">
                  {rabbis.map(r => (
                    <div key={r.id} className="flex items-start justify-between gap-2 group">
                      <div className="text-sm border-l-2 border-blue-100 dark:border-blue-800 pl-3 flex-1 min-w-0">
                        <div className="font-medium text-gray-800 dark:text-gray-200">
                          {r.title ? `${r.title} ` : ''}
                          {r.slug ? (
                            <Link href={`/leadership/${r.slug}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                              {r.name}
                            </Link>
                          ) : r.name}
                        </div>
                        {(r.start_year || r.end_year) && (
                          <div className="text-gray-400 dark:text-gray-500 text-xs">
                            {r.start_year ?? '?'} – {r.end_year ?? 'present'}
                          </div>
                        )}
                        {r.notes && (
                          <div className="text-gray-500 dark:text-gray-400 text-xs mt-1 italic">{r.notes}</div>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {isEditor && r.profile_id && (
                          <EditAffiliationButton
                            affiliation={{
                              id:         r.id,
                              role_title: r.title,
                              start_year: r.start_year,
                              end_year:   r.end_year,
                              notes:      r.notes,
                            }}
                            personProfile={{
                              id:             r.profile_id,
                              canonical_name: r.name ?? '',
                              person_type:    r.person_type,
                              slug:           r.slug,
                            }}
                            synagogueId={synagogue.id}
                          />
                        )}
                        {isEditor && (
                          <TrashButton onClick={() => requestDelete('rabbis', r.id, 'rabbi', id => setRabbis(prev => prev.filter(x => x.id !== id)))} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {isContributor && (
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <SuggestRabbiButton
                    synagogueId={synagogue.id}
                    synagogueName={synagogue.name}
                  />
                </div>
              )}
            </div>

          </div>

          {/* ── Right column: history + images ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* History */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
              <SectionHeader icon="📖" title="History" />
              {history.length === 0 ? (
                <div className="py-4 text-center">
                  <p className="text-gray-400 dark:text-gray-500 italic text-sm">No history entries yet.</p>
                  <p className="text-gray-300 dark:text-gray-600 text-xs mt-1">History will appear here once imported.</p>
                </div>
              ) : (
                <HistoryList
                  key={history.map(h => h.id).join(',')}
                  items={history}
                  synagogueId={synagogue.id}
                  canReorder={isEditor}
                  onDeleteClick={isEditor
                    ? (id) => requestDelete('history', id, 'history entry', delId => setHistory(prev => prev.filter(h => h.id !== delId)))
                    : undefined
                  }
                />
              )}
              {isContributor && (
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <SuggestHistoryButton
                    synagogueId={synagogue.id}
                    synagogueName={synagogue.name}
                  />
                </div>
              )}
            </div>

            {/* Images */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
              <SectionHeader icon="🖼️" title="Photos" />
              {images.length === 0 ? (
                <div className="py-4 text-center">
                  <p className="text-gray-400 dark:text-gray-500 italic text-sm">No photos yet.</p>
                  <p className="text-gray-300 dark:text-gray-600 text-xs mt-1">Photos will appear here once uploaded.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {images.map(img => (
                    <div key={img.id} className="relative group aspect-square">
                      <button
                        onClick={() => setLightboxImg(img)}
                        className="w-full h-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition"
                      >
                        {img.url ? (
                          <img
                            src={img.url}
                            alt={img.caption ?? img.description ?? synagogue.name}
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
                            setImages(prev => prev.filter(i => i.id !== id))
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
            </div>

          </div>

          {/* Links & Resources */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <SectionHeader icon="🔗" title="Links & Resources" />
              {isContributor && (
                <AddLinkButton
                  entityType="synagogue"
                  entityId={synagogue.id}
                  entityName={synagogue.name}
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

      {/* Merge & delete actions — visible to logged-in contributors only */}
      {isContributor && (
        <div className="container mx-auto px-4 pb-8 max-w-4xl">
          <div className="flex items-center justify-end gap-4">
            <SplitSynagogueButton
              synagogueId={synagogue.id}
              synagogueName={synagogue.name}
              synagogueData={{
                name:         synagogue.name,
                status:       synagogue.status,
                founded_year: synagogue.founded_year,
                closed_year:  synagogue.closed_year,
              }}
              addresses={addresses}
              rabbis={rabbis}
              history={history}
              images={images}
            />
            <MergeSynagogueButton
              synagogueId={synagogue.id}
              synagogueName={synagogue.name}
            />
            <DeleteSynagogueButton
              synagogueId={synagogue.id}
              synagogueName={synagogue.name}
              addressCount={addresses.length}
              historyCount={history.length}
              photoCount={images.length}
              rabbiCount={rabbis.length}
            />
          </div>
        </div>
      )}

      {/* Relationship deletion proposal modal */}
      {relationshipToDelete && (
        <DeleteRelationshipModal
          relationship={relationshipToDelete}
          synagogueId={synagogue.id}
          synagogueName={synagogue.name}
          onClose={() => setRelationshipToDelete(null)}
          onSuccess={() => setRelationshipToDelete(null)}
        />
      )}

      {/* Delete confirmation dialog */}
      <ConfirmDialog
        isOpen={pendingDelete !== null}
        title={`Delete ${pendingDelete?.label ?? 'item'}`}
        message={`Are you sure you want to delete this ${pendingDelete?.label ?? 'item'}? This cannot be undone.`}
        onConfirm={executeDelete}
        onCancel={cancelDelete}
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
