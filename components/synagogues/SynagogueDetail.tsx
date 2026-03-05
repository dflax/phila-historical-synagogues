'use client'

import Link from 'next/link'
import { useState } from 'react'
import MiniMap from '@/components/map/MiniMap'
import SuggestEditButton from '@/components/edit/SuggestEditButton'
import SuggestAddressButton from '@/components/edit/SuggestAddressButton'
import SuggestRabbiButton from '@/components/edit/SuggestRabbiButton'
import SuggestHistoryButton from '@/components/edit/SuggestHistoryButton'
import PhotoUploadButton from '@/components/photos/PhotoUploadButton'
import NavAuth from '@/components/auth/NavAuth'
import { useUserRole } from '@/hooks/useUserRole'
import ConfirmDialog from '@/components/common/ConfirmDialog'

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
}

interface Rabbi {
  id: string
  name: string | null
  title: string | null
  start_year: number | null
  end_year: number | null
  notes: string | null
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

interface Props {
  synagogue: Synagogue
  addresses: Address[]
  history: HistoryEntry[]
  rabbis: Rabbi[]
  images: Image[]
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

function formatAddress(addr: Address): string {
  const parts = [
    addr.street_address,
    addr.neighborhood,
    addr.city && addr.city.toLowerCase() !== 'philadelphia' ? addr.city : null,
    addr.state && addr.state.toUpperCase() !== 'PA' ? addr.state : null,
  ].filter(Boolean)
  return parts.join(', ') || 'Address on record'
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

export default function SynagogueDetail({ synagogue, addresses: initialAddresses, history: initialHistory, rabbis: initialRabbis, images: initialImages }: Props) {
  const { isEditor } = useUserRole()

  const [addresses,     setAddresses]     = useState<Address[]>(initialAddresses)
  const [history,       setHistory]       = useState<HistoryEntry[]>(initialHistory)
  const [rabbis,        setRabbis]        = useState<Rabbi[]>(initialRabbis)
  const [images,        setImages]        = useState<Image[]>(initialImages)
  const [lightboxImg,   setLightboxImg]   = useState<Image | null>(null)
  const [pendingDelete, setPendingDelete] = useState<PendingDelete | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteError,   setDeleteError]   = useState<string | null>(null)

  function requestDelete(endpoint: string, id: string, label: string, remove: (id: string) => void) {
    setDeleteError(null)
    setPendingDelete({ endpoint, id, label, remove })
  }

  async function executeDelete() {
    if (!pendingDelete) return
    setDeleteLoading(true)
    setDeleteError(null)
    const { endpoint, id, remove } = pendingDelete
    const res = await fetch(`/api/${endpoint}/${id}`, { method: 'DELETE' })
    setDeleteLoading(false)
    if (res.ok) {
      remove(id)
      setPendingDelete(null)
    } else {
      const body = await res.json().catch(() => ({}))
      setDeleteError(body.error ?? 'Delete failed. Please try again.')
    }
  }

  function cancelDelete() {
    if (deleteLoading) return
    setPendingDelete(null)
    setDeleteError(null)
  }

  const primaryAddr = addresses[0] ?? null
  const mapUrl = primaryAddr?.latitude && primaryAddr?.longitude
    ? `/map?lat=${primaryAddr.latitude}&lng=${primaryAddr.longitude}&id=${synagogue.id}`
    : '/map'

  const foundedLabel = formatYearLabel(synagogue.founded_year, synagogue.founded_text, null)
  const closedLabel  = formatYearLabel(synagogue.closed_year, synagogue.closed_text, null)

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

          {/* Action row — both buttons are auth-aware client components */}
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <PhotoUploadButton
              synagogueId={synagogue.id}
              synagogueName={synagogue.name}
            />
            <SuggestEditButton
              synagogue={synagogue}
              primaryNeighborhood={primaryAddr?.neighborhood ?? null}
            />
          </div>
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
                        <div className="font-medium text-gray-800 dark:text-gray-200">{formatAddress(addr)}</div>
                        {addr.zip_code && (
                          <div className="text-gray-400 dark:text-gray-500 text-xs">{addr.zip_code}</div>
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
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                <SuggestAddressButton
                  synagogueId={synagogue.id}
                  synagogueName={synagogue.name}
                />
              </div>
            </div>

            {/* Rabbis */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
              <SectionHeader icon="✡️" title="Rabbis" />
              {rabbis.length === 0 ? (
                <EmptyState message="No rabbis on record" />
              ) : (
                <div className="space-y-3">
                  {rabbis.map(r => (
                    <div key={r.id} className="flex items-start justify-between gap-2 group">
                      <div className="text-sm border-l-2 border-blue-100 dark:border-blue-800 pl-3 flex-1 min-w-0">
                        <div className="font-medium text-gray-800 dark:text-gray-200">
                          {r.title ? `${r.title} ` : ''}{r.name}
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
                      {isEditor && (
                        <TrashButton onClick={() => requestDelete('rabbis', r.id, 'rabbi', id => setRabbis(prev => prev.filter(x => x.id !== id)))} />
                      )}
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                <SuggestRabbiButton
                  synagogueId={synagogue.id}
                  synagogueName={synagogue.name}
                />
              </div>
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
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-[52px] top-0 bottom-0 w-px bg-gray-100 dark:bg-gray-700" />
                  <div className="space-y-5">
                    {history.map(entry => (
                      <div key={entry.id} className="flex gap-4 group">
                        {/* Year label */}
                        <div className="w-12 flex-shrink-0 text-right">
                          <span className="text-xs font-mono text-gray-400 dark:text-gray-500 leading-5">
                            {formatHistoryYear(entry)}
                          </span>
                        </div>
                        {/* Dot */}
                        <div className="flex-shrink-0 w-4 flex items-start justify-center pt-1.5">
                          <span className="w-2 h-2 rounded-full bg-blue-300 ring-2 ring-white dark:ring-gray-800" />
                        </div>
                        {/* Content */}
                        <div className="flex-1 pb-1 min-w-0">
                          {entry.entry_type && entry.entry_type !== 'general' && (
                            <span className="text-xs font-semibold text-blue-500 dark:text-blue-400 uppercase tracking-wide">
                              {entry.entry_type}
                            </span>
                          )}
                          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mt-0.5">
                            {entry.content}
                          </p>
                          {(entry.source || entry.source_url) && (
                            <div className="mt-1">
                              {entry.source_url ? (
                                <a
                                  href={entry.source_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"
                                >
                                  {entry.source ?? 'Source'} ↗
                                </a>
                              ) : (
                                <span className="text-xs text-gray-300 dark:text-gray-600">{entry.source}</span>
                              )}
                            </div>
                          )}
                        </div>
                        {isEditor && (
                          <TrashButton onClick={() => requestDelete('history', entry.id, 'history entry', id => setHistory(prev => prev.filter(h => h.id !== id)))} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                <SuggestHistoryButton
                  synagogueId={synagogue.id}
                  synagogueName={synagogue.name}
                />
              </div>
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
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <ConfirmDialog
        isOpen={pendingDelete !== null}
        title={`Delete ${pendingDelete?.label ?? 'item'}`}
        message={`Are you sure you want to delete this ${pendingDelete?.label ?? 'item'}? This cannot be undone.`}
        onConfirm={executeDelete}
        onCancel={cancelDelete}
        loading={deleteLoading}
        error={deleteError}
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
