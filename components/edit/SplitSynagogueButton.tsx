'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { User } from '@supabase/supabase-js'
import AuthModal from '@/components/auth/AuthModal'

// ── Types ──────────────────────────────────────────────────────────────────────

type Assignment = 'original' | 'new' | 'both' | 'neither'
type Step = 1 | 2 | 3 | 4 | 5 | 6  // 6 = success

interface SynagogueFields {
  name:         string
  status:       string
  founded_year: string
  closed_year:  string
}

interface Assignments {
  addresses:       Record<string, Assignment>
  rabbis:          Record<string, Assignment>
  history_entries: Record<string, Assignment>
  images:          Record<string, Assignment>
}

interface SplitAddress {
  id:             string
  street_address: string | null
  neighborhood:   string | null
  city:           string | null
}

interface SplitRabbi {
  id:         string
  name:       string | null
  title:      string | null
  start_year: number | null
  end_year:   number | null
}

interface SplitHistory {
  id:         string
  content:    string | null
  entry_type: string | null
  year:       number | null
}

interface SplitImage {
  id:      string
  url:     string | null
  caption: string | null
  year:    number | null
}

interface Props {
  synagogueId:   string
  synagogueName: string
  synagogueData: {
    name:         string
    status:       string
    founded_year: number | null
    closed_year:  number | null
  }
  addresses: SplitAddress[]
  rabbis:    SplitRabbi[]
  history:   SplitHistory[]
  images:    SplitImage[]
}

// ── Style constants ────────────────────────────────────────────────────────────

const STATUSES = ['active', 'closed', 'merged', 'unknown']

const inputClass =
  'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-sm'

const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

// ── Helpers ────────────────────────────────────────────────────────────────────

function initAssignments(
  addresses: SplitAddress[],
  rabbis:    SplitRabbi[],
  history:   SplitHistory[],
  images:    SplitImage[],
): Assignments {
  const toMap = (items: { id: string }[]) =>
    Object.fromEntries(items.map(i => [i.id, 'original' as Assignment]))
  return {
    addresses:       toMap(addresses),
    rabbis:          toMap(rabbis),
    history_entries: toMap(history),
    images:          toMap(images),
  }
}

function countByType(map: Record<string, Assignment>) {
  const c = { original: 0, new: 0, both: 0, neither: 0 }
  for (const v of Object.values(map)) c[v]++
  return c
}

function Spinner() {
  return (
    <svg className="w-4 h-4 animate-spin text-indigo-600 dark:text-indigo-400" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

// ── Assignment control ─────────────────────────────────────────────────────────

const ASSIGNMENT_OPTIONS: { value: Assignment; label: string; active: string }[] = [
  { value: 'original', label: 'Original', active: 'bg-blue-600   text-white border-blue-600' },
  { value: 'new',      label: 'New',      active: 'bg-green-600  text-white border-green-600' },
  { value: 'both',     label: 'Both',     active: 'bg-amber-500  text-white border-amber-500' },
  { value: 'neither',  label: 'Neither',  active: 'bg-red-500    text-white border-red-500' },
]

function AssignmentControl({ value, onChange }: { value: Assignment; onChange: (v: Assignment) => void }) {
  return (
    <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 flex-shrink-0">
      {ASSIGNMENT_OPTIONS.map(opt => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`px-2.5 py-1 text-xs font-medium border-r last:border-r-0 border-gray-200 dark:border-gray-600 transition ${
            value === opt.value
              ? opt.active
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

// ── Section divider ────────────────────────────────────────────────────────────

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 pt-1">
      <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider whitespace-nowrap">
        {label}
      </span>
      <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
    </div>
  )
}

// ── Step 1: Basic info ─────────────────────────────────────────────────────────

function Step1({
  origFields,
  newFields,
  onOrigChange,
  onNewChange,
  onNext,
  error,
}: {
  origFields:   SynagogueFields
  newFields:    SynagogueFields
  onOrigChange: (f: SynagogueFields) => void
  onNewChange:  (f: SynagogueFields) => void
  onNext:       () => void
  error:        string | null
}) {
  function setOrig<K extends keyof SynagogueFields>(k: K, v: SynagogueFields[K]) {
    onOrigChange({ ...origFields, [k]: v })
  }
  function setNew<K extends keyof SynagogueFields>(k: K, v: SynagogueFields[K]) {
    onNewChange({ ...newFields, [k]: v })
  }

  return (
    <div className="space-y-5">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Edit the basic information for both the <strong>original</strong> synagogue (this record) and the
        <strong> new</strong> synagogue that will be created. Addresses, rabbis, history, and photos are assigned in the next steps.
      </p>

      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-3 py-2 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-6">
        {/* Original synagogue */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 flex-shrink-0" />
            <span className="text-sm font-bold text-gray-800 dark:text-gray-200">Original</span>
          </div>

          <div>
            <label className={labelClass}>
              Name <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <input
              type="text"
              required
              value={origFields.name}
              onChange={e => setOrig('name', e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Status</label>
            <select
              value={origFields.status}
              onChange={e => setOrig('status', e.target.value)}
              className={inputClass}
            >
              {STATUSES.map(s => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Founded year</label>
            <input
              type="number" min="1600" max={new Date().getFullYear()}
              value={origFields.founded_year}
              onChange={e => setOrig('founded_year', e.target.value)}
              className={inputClass}
              placeholder="e.g. 1880"
            />
          </div>

          <div>
            <label className={labelClass}>Closed year</label>
            <input
              type="number" min="1600" max={new Date().getFullYear()}
              value={origFields.closed_year}
              onChange={e => setOrig('closed_year', e.target.value)}
              className={inputClass}
              placeholder="e.g. 1952"
            />
          </div>
        </div>

        {/* New synagogue */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0" />
            <span className="text-sm font-bold text-gray-800 dark:text-gray-200">New</span>
          </div>

          <div>
            <label className={labelClass}>
              Name <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <input
              type="text"
              required
              value={newFields.name}
              onChange={e => setNew('name', e.target.value)}
              className={inputClass}
              placeholder="Name of the new synagogue"
            />
          </div>

          <div>
            <label className={labelClass}>Status</label>
            <select
              value={newFields.status}
              onChange={e => setNew('status', e.target.value)}
              className={inputClass}
            >
              {STATUSES.map(s => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Founded year</label>
            <input
              type="number" min="1600" max={new Date().getFullYear()}
              value={newFields.founded_year}
              onChange={e => setNew('founded_year', e.target.value)}
              className={inputClass}
              placeholder="e.g. 1880"
            />
          </div>

          <div>
            <label className={labelClass}>Closed year</label>
            <input
              type="number" min="1600" max={new Date().getFullYear()}
              value={newFields.closed_year}
              onChange={e => setNew('closed_year', e.target.value)}
              className={inputClass}
              placeholder="e.g. 1952"
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onNext}
        className="w-full py-2.5 px-4 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition"
      >
        Next: Assign Addresses →
      </button>
    </div>
  )
}

// ── Step 2: Assign addresses ───────────────────────────────────────────────────

function Step2({
  addresses,
  assignments,
  onAssignmentChange,
  origName,
  newName,
  onBack,
  onNext,
}: {
  addresses:          SplitAddress[]
  assignments:        Assignments
  onAssignmentChange: (type: keyof Assignments, id: string, v: Assignment) => void
  origName:           string
  newName:            string
  onBack:             () => void
  onNext:             () => void
}) {
  return (
    <div className="space-y-4">
      <AssignmentLegend origName={origName} newName={newName} />

      {addresses.length === 0 ? (
        <p className="text-sm text-gray-400 dark:text-gray-500 italic py-4 text-center">
          No addresses to assign.
        </p>
      ) : (
        <div className="divide-y divide-gray-100 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          {addresses.map(addr => {
            const label = [addr.street_address, addr.city].filter(Boolean).join(', ') || 'Address on record'
            const sub   = addr.neighborhood ?? undefined
            return (
              <AssignmentRow
                key={addr.id}
                label={label}
                sublabel={sub}
                value={assignments.addresses[addr.id] ?? 'original'}
                onChange={v => onAssignmentChange('addresses', addr.id, v)}
              />
            )
          })}
        </div>
      )}

      <StepNav onBack={onBack} onNext={onNext} nextLabel="Next: Assign Rabbis →" />
    </div>
  )
}

// ── Step 3: Assign rabbis ──────────────────────────────────────────────────────

function Step3({
  rabbis,
  assignments,
  onAssignmentChange,
  origName,
  newName,
  onBack,
  onNext,
}: {
  rabbis:             SplitRabbi[]
  assignments:        Assignments
  onAssignmentChange: (type: keyof Assignments, id: string, v: Assignment) => void
  origName:           string
  newName:            string
  onBack:             () => void
  onNext:             () => void
}) {
  return (
    <div className="space-y-4">
      <AssignmentLegend origName={origName} newName={newName} />

      {rabbis.length === 0 ? (
        <p className="text-sm text-gray-400 dark:text-gray-500 italic py-4 text-center">
          No rabbi affiliations to assign.
        </p>
      ) : (
        <div className="divide-y divide-gray-100 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          {rabbis.map(r => {
            const label = [r.title, r.name].filter(Boolean).join(' ') || 'Unknown Rabbi'
            const years = r.start_year || r.end_year
              ? `${r.start_year ?? '?'} – ${r.end_year ?? 'present'}`
              : undefined
            return (
              <AssignmentRow
                key={r.id}
                label={label}
                sublabel={years}
                value={assignments.rabbis[r.id] ?? 'original'}
                onChange={v => onAssignmentChange('rabbis', r.id, v)}
              />
            )
          })}
        </div>
      )}

      <StepNav onBack={onBack} onNext={onNext} nextLabel="Next: Assign History & Photos →" />
    </div>
  )
}

// ── Step 4: Assign history + photos ───────────────────────────────────────────

function Step4({
  history,
  images,
  assignments,
  onAssignmentChange,
  origName,
  newName,
  onBack,
  onNext,
}: {
  history:            SplitHistory[]
  images:             SplitImage[]
  assignments:        Assignments
  onAssignmentChange: (type: keyof Assignments, id: string, v: Assignment) => void
  origName:           string
  newName:            string
  onBack:             () => void
  onNext:             () => void
}) {
  return (
    <div className="space-y-4">
      <AssignmentLegend origName={origName} newName={newName} />

      {history.length > 0 && (
        <>
          <SectionDivider label={`History (${history.length})`} />
          <div className="divide-y divide-gray-100 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            {history.map(h => {
              const label = h.content
                ? (h.content.length > 80 ? h.content.slice(0, 80) + '…' : h.content)
                : 'History entry'
              const sub = [h.entry_type, h.year ? String(h.year) : null].filter(Boolean).join(' · ') || undefined
              return (
                <AssignmentRow
                  key={h.id}
                  label={label}
                  sublabel={sub}
                  value={assignments.history_entries[h.id] ?? 'original'}
                  onChange={v => onAssignmentChange('history_entries', h.id, v)}
                />
              )
            })}
          </div>
        </>
      )}

      {images.length > 0 && (
        <>
          <SectionDivider label={`Photos (${images.length})`} />
          <div className="divide-y divide-gray-100 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            {images.map(img => {
              const label = img.caption || 'Photo'
              const sub   = img.year ? String(img.year) : undefined
              return (
                <AssignmentRow
                  key={img.id}
                  label={label}
                  sublabel={sub}
                  value={assignments.images[img.id] ?? 'original'}
                  onChange={v => onAssignmentChange('images', img.id, v)}
                />
              )
            })}
          </div>
        </>
      )}

      {history.length === 0 && images.length === 0 && (
        <p className="text-sm text-gray-400 dark:text-gray-500 italic py-4 text-center">
          No history entries or photos to assign.
        </p>
      )}

      <StepNav onBack={onBack} onNext={onNext} nextLabel="Next: Review & Submit →" />
    </div>
  )
}

// ── Step 5: Review & submit ───────────────────────────────────────────────────

function Step5({
  origFields,
  newFields,
  assignments,
  reason,
  onReasonChange,
  onBack,
  onSubmit,
  loading,
  error,
}: {
  origFields:    SynagogueFields
  newFields:     SynagogueFields
  assignments:   Assignments
  reason:        string
  onReasonChange:(v: string) => void
  onBack:        () => void
  onSubmit:      (e: React.FormEvent) => void
  loading:       boolean
  error:         string | null
}) {
  const rows: { label: string; map: Record<string, Assignment> }[] = [
    { label: 'Addresses',       map: assignments.addresses },
    { label: 'Rabbis',          map: assignments.rabbis },
    { label: 'History entries', map: assignments.history_entries },
    { label: 'Photos',          map: assignments.images },
  ]

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Summary banner */}
      <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 flex-shrink-0" />
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{origFields.name || '—'}</span>
          <span className="text-xs text-gray-400">{origFields.status}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0" />
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{newFields.name || '—'}</span>
          <span className="text-xs text-gray-400">{newFields.status}</span>
        </div>
      </div>

      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-3 py-2 rounded-lg">
          {error}
        </div>
      )}

      {/* Assignment summary */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden text-xs">
        <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 py-2 grid grid-cols-5 gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
          <div className="col-span-1">Category</div>
          <div className="text-center text-blue-600 dark:text-blue-400">Original</div>
          <div className="text-center text-green-600 dark:text-green-400">New</div>
          <div className="text-center text-amber-600 dark:text-amber-400">Both</div>
          <div className="text-center text-red-500 dark:text-red-400">Delete</div>
        </div>
        {rows.map(row => {
          const c = countByType(row.map)
          const total = Object.keys(row.map).length
          if (total === 0) return null
          return (
            <div key={row.label} className="grid grid-cols-5 gap-2 px-3 py-2 border-b last:border-b-0 border-gray-100 dark:border-gray-700/60 text-gray-700 dark:text-gray-300">
              <div className="col-span-1 font-medium">{row.label}</div>
              <div className="text-center">{c.original}</div>
              <div className="text-center">{c.new}</div>
              <div className="text-center">{c.both}</div>
              <div className="text-center">{c.neither}</div>
            </div>
          )
        })}
      </div>

      {/* Reason */}
      <div>
        <label className={labelClass}>
          Why does this record need to be split? <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <textarea
          required
          rows={3}
          value={reason}
          onChange={e => onReasonChange(e.target.value)}
          className={inputClass}
          placeholder="e.g. 'This entry combines two distinct congregations that merged later — they were separate institutions'"
        />
      </div>

      <div className="flex gap-3">
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
          className="flex-1 py-2.5 px-4 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2"><Spinner /> Submitting…</span>
          ) : (
            'Propose Split'
          )}
        </button>
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
        No data is changed until an editor approves this proposal.
      </p>
    </form>
  )
}

// ── Step 6: Success ────────────────────────────────────────────────────────────

function StepSuccess({ onClose }: { onClose: () => void }) {
  return (
    <div className="text-center py-8 space-y-4">
      <div className="w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mx-auto">
        <svg className="w-7 h-7 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Split Proposed</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Your split proposal has been submitted for editor review.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-500">
        No data has been changed yet. An editor will review and approve or reject this proposal.
      </p>
      <button
        onClick={onClose}
        className="mt-2 px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition"
      >
        Close
      </button>
    </div>
  )
}

// ── Shared sub-components ─────────────────────────────────────────────────────

function AssignmentLegend({ origName, newName }: { origName: string; newName: string }) {
  return (
    <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2">
      <span><span className="font-semibold text-blue-600 dark:text-blue-400">Original</span> = stays with {origName}</span>
      <span><span className="font-semibold text-green-600 dark:text-green-400">New</span> = moves to {newName || 'new synagogue'}</span>
      <span><span className="font-semibold text-amber-600 dark:text-amber-400">Both</span> = duplicated to both</span>
      <span><span className="font-semibold text-red-500 dark:text-red-400">Neither</span> = deleted</span>
    </div>
  )
}

function AssignmentRow({
  label,
  sublabel,
  value,
  onChange,
}: {
  label:    string
  sublabel: string | undefined
  value:    Assignment
  onChange: (v: Assignment) => void
}) {
  return (
    <div className="flex items-center gap-3 px-3 py-2.5">
      <div className="flex-1 min-w-0 text-sm">
        <div className="font-medium text-gray-800 dark:text-gray-200 truncate">{label}</div>
        {sublabel && <div className="text-xs text-gray-400 dark:text-gray-500">{sublabel}</div>}
      </div>
      <AssignmentControl value={value} onChange={onChange} />
    </div>
  )
}

function StepNav({
  onBack,
  onNext,
  nextLabel,
}: {
  onBack:    () => void
  onNext:    () => void
  nextLabel: string
}) {
  return (
    <div className="flex gap-3 pt-1">
      <button
        type="button"
        onClick={onBack}
        className="flex-1 py-2.5 px-4 text-sm font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition"
      >
        ← Back
      </button>
      <button
        type="button"
        onClick={onNext}
        className="flex-1 py-2.5 px-4 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition"
      >
        {nextLabel}
      </button>
    </div>
  )
}

// ── Split icon ────────────────────────────────────────────────────────────────

const splitIcon = (
  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 000 2h4a1 1 0 100-2H3zm6 0a1 1 0 000 2h7a1 1 0 100-2H9z" clipRule="evenodd" />
  </svg>
)

// ── Step titles ───────────────────────────────────────────────────────────────

const STEP_LABELS: Record<number, string> = {
  1: 'Basic information',
  2: 'Assign addresses',
  3: 'Assign rabbi affiliations',
  4: 'Assign history & photos',
  5: 'Review & submit',
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function SplitSynagogueButton({
  synagogueId,
  synagogueName,
  synagogueData,
  addresses,
  rabbis,
  history,
  images,
}: Props) {
  const supabase = createClientComponentClient()

  const [user,      setUser]      = useState<User | null>(null)
  const [authReady, setAuthReady] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)

  const [step,        setStep]        = useState<Step>(1)
  const [origFields,  setOrigFields]  = useState<SynagogueFields>({ name: '', status: 'unknown', founded_year: '', closed_year: '' })
  const [newFields,   setNewFields]   = useState<SynagogueFields>({ name: '', status: 'unknown', founded_year: '', closed_year: '' })
  const [assignments, setAssignments] = useState<Assignments>({ addresses: {}, rabbis: {}, history_entries: {}, images: {} })
  const [reason,      setReason]      = useState('')
  const [loading,     setLoading]     = useState(false)
  const [error,       setError]       = useState<string | null>(null)

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

  function doOpenModal() {
    setStep(1)
    setOrigFields({
      name:         synagogueData.name,
      status:       synagogueData.status,
      founded_year: synagogueData.founded_year?.toString() ?? '',
      closed_year:  synagogueData.closed_year?.toString()  ?? '',
    })
    setNewFields({ name: '', status: 'unknown', founded_year: '', closed_year: '' })
    setAssignments(initAssignments(addresses, rabbis, history, images))
    setReason('')
    setError(null)
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
  }

  function setAssignment(type: keyof Assignments, id: string, v: Assignment) {
    setAssignments(prev => ({
      ...prev,
      [type]: { ...prev[type], [id]: v },
    }))
  }

  function goNext() {
    setError(null)
    setStep(prev => (prev < 5 ? (prev + 1) as Step : prev))
  }

  function goBack() {
    setError(null)
    setStep(prev => (prev > 1 ? (prev - 1) as Step : prev))
  }

  function validateStep1(): boolean {
    if (!origFields.name.trim()) {
      setError('Original synagogue name is required.')
      return false
    }
    if (!newFields.name.trim()) {
      setError('New synagogue name is required.')
      return false
    }
    return true
  }

  function handleStep1Next() {
    if (validateStep1()) goNext()
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return
    setError(null)

    if (!reason.trim()) {
      setError('Please provide a reason for the split.')
      return
    }

    setLoading(true)

    // Rate limit check
    const { data: canSubmit, error: rateLimitError } = await supabase
      .rpc('check_proposal_rate_limit', { user_id: user.id })

    if (rateLimitError || !canSubmit) {
      setError("You've reached your daily proposal limit. Please try again tomorrow.")
      setLoading(false)
      return
    }

    const { error: insertError } = await supabase
      .from('edit_proposals')
      .insert({
        synagogue_id:  synagogueId,
        entity_id:     null,
        proposal_type: 'synagogue_split',
        proposed_data: {
          original_fields: {
            name:         origFields.name.trim(),
            status:       origFields.status,
            founded_year: origFields.founded_year ? parseInt(origFields.founded_year) : null,
            closed_year:  origFields.closed_year  ? parseInt(origFields.closed_year)  : null,
          },
          new_fields: {
            name:         newFields.name.trim(),
            status:       newFields.status,
            founded_year: newFields.founded_year ? parseInt(newFields.founded_year) : null,
            closed_year:  newFields.closed_year  ? parseInt(newFields.closed_year)  : null,
          },
          assignments,
        },
        current_data: {
          original_synagogue_name: synagogueData.name,
          new_synagogue_name:      newFields.name.trim(),
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

    setStep(6)
  }

  if (!authReady) return null

  return (
    <>
      {/* ── Button ─────────────────────────────────────────────────────────── */}
      {user ? (
        <button
          onClick={doOpenModal}
          className="flex items-center gap-1.5 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium transition"
        >
          {splitIcon}
          Split Into Two Synagogues
        </button>
      ) : (
        <button
          onClick={() => setLoginOpen(true)}
          className="flex items-center gap-1.5 text-sm text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
        >
          {splitIcon}
          Sign in to split
        </button>
      )}

      {/* ── Modal ──────────────────────────────────────────────────────────── */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Split synagogue record"
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl border border-gray-200 dark:border-gray-700 max-h-[90vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-700 flex-shrink-0">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  {step === 6 ? 'Split Proposed' : `Split ${synagogueName}`}
                </h2>
                {step < 6 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    Step {step} of 5 — {STEP_LABELS[step]}
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
                  origFields={origFields}
                  newFields={newFields}
                  onOrigChange={setOrigFields}
                  onNewChange={setNewFields}
                  onNext={handleStep1Next}
                  error={error}
                />
              )}
              {step === 2 && (
                <Step2
                  addresses={addresses}
                  assignments={assignments}
                  onAssignmentChange={setAssignment}
                  origName={origFields.name}
                  newName={newFields.name}
                  onBack={goBack}
                  onNext={goNext}
                />
              )}
              {step === 3 && (
                <Step3
                  rabbis={rabbis}
                  assignments={assignments}
                  onAssignmentChange={setAssignment}
                  origName={origFields.name}
                  newName={newFields.name}
                  onBack={goBack}
                  onNext={goNext}
                />
              )}
              {step === 4 && (
                <Step4
                  history={history}
                  images={images}
                  assignments={assignments}
                  onAssignmentChange={setAssignment}
                  origName={origFields.name}
                  newName={newFields.name}
                  onBack={goBack}
                  onNext={goNext}
                />
              )}
              {step === 5 && (
                <Step5
                  origFields={origFields}
                  newFields={newFields}
                  assignments={assignments}
                  reason={reason}
                  onReasonChange={setReason}
                  onBack={goBack}
                  onSubmit={handleSubmit}
                  loading={loading}
                  error={error}
                />
              )}
              {step === 6 && <StepSuccess onClose={closeModal} />}
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
