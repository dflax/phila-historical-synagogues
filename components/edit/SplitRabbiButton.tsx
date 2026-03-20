'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { User } from '@supabase/supabase-js'
import AuthModal from '@/components/auth/AuthModal'

// ── Types ──────────────────────────────────────────────────────────────────────

type Assignment = 'original' | 'new' | 'both' | 'neither'
type Step = 1 | 2 | 3 | 4 | 5  // 5 = success

interface RabbiFields {
  canonical_name: string
  birth_year:     string
  circa_birth:    boolean
  death_year:     string
  circa_death:    boolean
  biography:      string
  birthplace:     string
  death_place:    string
  seminary:       string
  ordination_year: string
  denomination:   string
  languages:      string   // comma-separated
  publications:   string
  achievements:   string
}

interface Assignments {
  rabbis: Record<string, Assignment>   // affiliation rows
  images: Record<string, Assignment>
}

interface SplitAffiliation {
  id:         string
  title:      string | null
  start_year: number | null
  end_year:   number | null
  notes:      string | null
  synagogue:  { id: string; name: string } | null
}

interface SplitImage {
  id:           string
  url:          string | null
  caption:      string | null
  year:         number | null
  photographer: string | null
}

interface Props {
  rabbiId:   string
  rabbiName: string
  rabbiData: {
    canonical_name:  string
    birth_year:      number | null
    circa_birth:     boolean | null
    death_year:      number | null
    circa_death:     boolean | null
    biography:       string | null
    birthplace:      string | null
    death_place:     string | null
    seminary:        string | null
    ordination_year: number | null
    denomination:    string | null
    languages:       string[] | null
    publications:    string | null
    achievements:    string | null
  }
  affiliations: SplitAffiliation[]
  images:       SplitImage[]
}

// ── Style constants ────────────────────────────────────────────────────────────

const inputClass =
  'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-sm'

const labelClass = 'block text-xs font-medium text-gray-600 dark:text-gray-400 mb-0.5'

// ── Helpers ────────────────────────────────────────────────────────────────────

function toFields(d: Props['rabbiData']): RabbiFields {
  return {
    canonical_name:  d.canonical_name,
    birth_year:      d.birth_year?.toString()      ?? '',
    circa_birth:     d.circa_birth                 ?? false,
    death_year:      d.death_year?.toString()      ?? '',
    circa_death:     d.circa_death                 ?? false,
    biography:       d.biography                   ?? '',
    birthplace:      d.birthplace                  ?? '',
    death_place:     d.death_place                 ?? '',
    seminary:        d.seminary                    ?? '',
    ordination_year: d.ordination_year?.toString() ?? '',
    denomination:    d.denomination                ?? '',
    languages:       d.languages?.join(', ')       ?? '',
    publications:    d.publications                ?? '',
    achievements:    d.achievements                ?? '',
  }
}

function toProposedFields(f: RabbiFields) {
  return {
    canonical_name:  f.canonical_name.trim(),
    birth_year:      f.birth_year      ? parseInt(f.birth_year)      : null,
    circa_birth:     f.circa_birth,
    death_year:      f.death_year      ? parseInt(f.death_year)      : null,
    circa_death:     f.circa_death,
    biography:       f.biography.trim()       || null,
    birthplace:      f.birthplace.trim()      || null,
    death_place:     f.death_place.trim()     || null,
    seminary:        f.seminary.trim()        || null,
    ordination_year: f.ordination_year ? parseInt(f.ordination_year) : null,
    denomination:    f.denomination.trim()    || null,
    languages:       f.languages.split(',').map(s => s.trim()).filter(Boolean),
    publications:    f.publications.trim()    || null,
    achievements:    f.achievements.trim()    || null,
  }
}

function initAssignments(affiliations: SplitAffiliation[], images: SplitImage[]): Assignments {
  return {
    rabbis: Object.fromEntries(affiliations.map(a => [a.id, 'original' as Assignment])),
    images: Object.fromEntries(images.map(i => [i.id, 'original' as Assignment])),
  }
}

function countByType(map: Record<string, Assignment>) {
  const c = { original: 0, new: 0, both: 0, neither: 0 }
  for (const v of Object.values(map)) c[v]++
  return c
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <svg className="w-4 h-4 animate-spin text-indigo-600 dark:text-indigo-400" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

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

function AssignmentRow({
  label, sublabel, value, onChange,
}: {
  label: string; sublabel?: string; value: Assignment; onChange: (v: Assignment) => void
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

function AssignmentLegend({ origName, newName }: { origName: string; newName: string }) {
  return (
    <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2">
      <span><span className="font-semibold text-blue-600 dark:text-blue-400">Original</span> = stays with {origName}</span>
      <span><span className="font-semibold text-green-600 dark:text-green-400">New</span> = moves to {newName || 'new profile'}</span>
      <span><span className="font-semibold text-amber-600 dark:text-amber-400">Both</span> = duplicated to both</span>
      <span><span className="font-semibold text-red-500 dark:text-red-400">Neither</span> = deleted</span>
    </div>
  )
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 pt-1">
      <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider whitespace-nowrap">{label}</span>
      <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
    </div>
  )
}

function StepNav({ onBack, onNext, nextLabel }: { onBack: () => void; onNext: () => void; nextLabel: string }) {
  return (
    <div className="flex gap-3 pt-1">
      <button type="button" onClick={onBack}
        className="flex-1 py-2.5 px-4 text-sm font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition">
        ← Back
      </button>
      <button type="button" onClick={onNext}
        className="flex-1 py-2.5 px-4 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition">
        {nextLabel}
      </button>
    </div>
  )
}

// ── RabbiFieldsForm ────────────────────────────────────────────────────────────

function RabbiFieldsForm({
  fields,
  onChange,
  label,
  dotColor,
  subLabel,
}: {
  fields:    RabbiFields
  onChange:  (f: RabbiFields) => void
  label:     string
  dotColor:  string
  subLabel?: string
}) {
  function set<K extends keyof RabbiFields>(k: K, v: RabbiFields[K]) {
    onChange({ ...fields, [k]: v })
  }

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2 pb-1">
        <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${dotColor}`} />
        <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{label}</span>
      </div>
      {subLabel && <p className="text-xs text-gray-500 dark:text-gray-400 -mt-2">{subLabel}</p>}

      {/* Name */}
      <div>
        <label className={labelClass}>
          Full name <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          type="text"
          required
          value={fields.canonical_name}
          onChange={e => set('canonical_name', e.target.value)}
          className={inputClass}
          placeholder="e.g. Rabbi Aaron Levine"
        />
      </div>

      {/* Birth / Death years */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className={labelClass}>Birth year</label>
          <input type="number" value={fields.birth_year} onChange={e => set('birth_year', e.target.value)}
            className={inputClass} placeholder="e.g. 1850" min="1500" max={new Date().getFullYear()} />
          <label className="flex items-center gap-1.5 mt-1 cursor-pointer">
            <input type="checkbox" checked={fields.circa_birth} onChange={e => set('circa_birth', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
            <span className="text-xs text-gray-500 dark:text-gray-400">Approximate</span>
          </label>
        </div>
        <div>
          <label className={labelClass}>Death year</label>
          <input type="number" value={fields.death_year} onChange={e => set('death_year', e.target.value)}
            className={inputClass} placeholder="e.g. 1920" min="1500" max={new Date().getFullYear()} />
          <label className="flex items-center gap-1.5 mt-1 cursor-pointer">
            <input type="checkbox" checked={fields.circa_death} onChange={e => set('circa_death', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
            <span className="text-xs text-gray-500 dark:text-gray-400">Approximate</span>
          </label>
        </div>
      </div>

      {/* Biography */}
      <div>
        <label className={labelClass}>Biography</label>
        <textarea rows={4} value={fields.biography} onChange={e => set('biography', e.target.value)}
          className={inputClass} placeholder="Brief biography…" />
      </div>

      {/* Birthplace / Death Place */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className={labelClass}>Birthplace</label>
          <input value={fields.birthplace} onChange={e => set('birthplace', e.target.value)}
            className={inputClass} placeholder="City, Country" />
        </div>
        <div>
          <label className={labelClass}>Death place</label>
          <input value={fields.death_place} onChange={e => set('death_place', e.target.value)}
            className={inputClass} placeholder="City, Country" />
        </div>
      </div>

      {/* Seminary / Ordination */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className={labelClass}>Seminary</label>
          <input value={fields.seminary} onChange={e => set('seminary', e.target.value)}
            className={inputClass} placeholder="e.g. JTS" />
        </div>
        <div>
          <label className={labelClass}>Ordination year</label>
          <input type="number" value={fields.ordination_year} onChange={e => set('ordination_year', e.target.value)}
            className={inputClass} placeholder="e.g. 1875" min="1500" max={new Date().getFullYear()} />
        </div>
      </div>

      {/* Denomination */}
      <div>
        <label className={labelClass}>Denomination / Movement</label>
        <input value={fields.denomination} onChange={e => set('denomination', e.target.value)}
          className={inputClass} placeholder="e.g. Conservative, Reform" />
      </div>

      {/* Languages */}
      <div>
        <label className={labelClass}>Languages</label>
        <input value={fields.languages} onChange={e => set('languages', e.target.value)}
          className={inputClass} placeholder="English, Hebrew, Yiddish" />
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Comma-separated</p>
      </div>

      {/* Publications */}
      <div>
        <label className={labelClass}>Publications</label>
        <textarea rows={2} value={fields.publications} onChange={e => set('publications', e.target.value)}
          className={inputClass} placeholder="Books, articles…" />
      </div>

      {/* Achievements */}
      <div>
        <label className={labelClass}>Achievements</label>
        <textarea rows={2} value={fields.achievements} onChange={e => set('achievements', e.target.value)}
          className={inputClass} placeholder="Notable achievements…" />
      </div>
    </div>
  )
}

// ── Step 1: Basic Info ─────────────────────────────────────────────────────────

function Step1({
  origFields,
  newFields,
  onOrigChange,
  onNewChange,
  onNext,
  error,
}: {
  origFields:   RabbiFields
  newFields:    RabbiFields
  onOrigChange: (f: RabbiFields) => void
  onNewChange:  (f: RabbiFields) => void
  onNext:       () => void
  error:        string | null
}) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Edit the fields for both the <strong>original</strong> rabbi profile (kept) and the
        <strong> new</strong> profile (created). Affiliations and photos are assigned in the next steps.
      </p>

      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-3 py-2 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <RabbiFieldsForm
          fields={origFields}
          onChange={onOrigChange}
          label="Original"
          dotColor="bg-blue-500"
          subLabel="Keeping this profile (same ID & slug)"
        />
        <div className="border-t sm:border-t-0 sm:border-l border-gray-200 dark:border-gray-700 pt-4 sm:pt-0 sm:pl-6">
          <RabbiFieldsForm
            fields={newFields}
            onChange={onNewChange}
            label="New"
            dotColor="bg-green-500"
            subLabel="New profile will be created — edit as needed"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={onNext}
        className="w-full py-2.5 px-4 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition"
      >
        Next: Assign Affiliations →
      </button>
    </div>
  )
}

// ── Step 2: Assign affiliations ────────────────────────────────────────────────

function Step2({
  affiliations,
  assignments,
  onAssignmentChange,
  origName,
  newName,
  onBack,
  onNext,
}: {
  affiliations:       SplitAffiliation[]
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

      {affiliations.length === 0 ? (
        <p className="text-sm text-gray-400 dark:text-gray-500 italic py-4 text-center">
          No synagogue affiliations to assign.
        </p>
      ) : (
        <div className="divide-y divide-gray-100 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          {affiliations.map(aff => {
            const synName = aff.synagogue?.name ?? 'Unknown Synagogue'
            const years   = aff.start_year || aff.end_year
              ? `${aff.start_year ?? '?'} – ${aff.end_year ?? 'present'}`
              : undefined
            const sub = [aff.title, years].filter(Boolean).join(' · ')
            return (
              <AssignmentRow
                key={aff.id}
                label={synName}
                sublabel={sub || undefined}
                value={assignments.rabbis[aff.id] ?? 'original'}
                onChange={v => onAssignmentChange('rabbis', aff.id, v)}
              />
            )
          })}
        </div>
      )}

      <StepNav onBack={onBack} onNext={onNext} nextLabel="Next: Assign Photos →" />
    </div>
  )
}

// ── Step 3: Assign photos ──────────────────────────────────────────────────────

function Step3({
  images,
  assignments,
  onAssignmentChange,
  origName,
  newName,
  onBack,
  onNext,
}: {
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

      {images.length === 0 ? (
        <p className="text-sm text-gray-400 dark:text-gray-500 italic py-4 text-center">
          No photos to assign.
        </p>
      ) : (
        <div className="divide-y divide-gray-100 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          {images.map(img => {
            const label = img.caption || 'Untitled photo'
            const sub   = [img.year ? String(img.year) : null, img.photographer].filter(Boolean).join(' · ')
            return (
              <div key={img.id} className="flex items-center gap-3 px-3 py-2.5">
                {img.url ? (
                  <img src={img.url} alt={img.caption ?? ''} className="w-12 h-12 rounded object-cover flex-shrink-0 border border-gray-200 dark:border-gray-600" />
                ) : (
                  <div className="w-12 h-12 rounded bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 text-gray-400 text-lg">🖼️</div>
                )}
                <div className="flex-1 min-w-0 text-sm">
                  <div className="font-medium text-gray-800 dark:text-gray-200 truncate">{label}</div>
                  {sub && <div className="text-xs text-gray-400 dark:text-gray-500">{sub}</div>}
                </div>
                <AssignmentControl
                  value={assignments.images[img.id] ?? 'original'}
                  onChange={v => onAssignmentChange('images', img.id, v)}
                />
              </div>
            )
          })}
        </div>
      )}

      <StepNav onBack={onBack} onNext={onNext} nextLabel="Next: Review & Submit →" />
    </div>
  )
}

// ── Step 4: Review & submit ───────────────────────────────────────────────────

function Step4({
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
  origFields:    RabbiFields
  newFields:     RabbiFields
  assignments:   Assignments
  reason:        string
  onReasonChange:(v: string) => void
  onBack:        () => void
  onSubmit:      (e: React.FormEvent) => void
  loading:       boolean
  error:         string | null
}) {
  const affCounts = countByType(assignments.rabbis)
  const imgCounts = countByType(assignments.images)

  const rows: { label: string; orig: number; new: number; both: number; neither: number }[] = []
  if (Object.keys(assignments.rabbis).length > 0) {
    rows.push({ label: 'Affiliations', orig: affCounts.original, new: affCounts.new, both: affCounts.both, neither: affCounts.neither })
  }
  if (Object.keys(assignments.images).length > 0) {
    rows.push({ label: 'Photos', orig: imgCounts.original, new: imgCounts.new, both: imgCounts.both, neither: imgCounts.neither })
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Profile comparison banner */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-sm space-y-1">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="font-semibold text-gray-800 dark:text-gray-200 text-xs">Original</span>
          </div>
          <div className="font-medium text-gray-900 dark:text-white">{origFields.canonical_name || '—'}</div>
          {origFields.birth_year && <div className="text-xs text-gray-500 dark:text-gray-400">b. {origFields.circa_birth ? 'c. ' : ''}{origFields.birth_year}</div>}
          {origFields.denomination && <div className="text-xs text-gray-500 dark:text-gray-400">{origFields.denomination}</div>}
          {origFields.seminary && <div className="text-xs text-gray-500 dark:text-gray-400">{origFields.seminary}</div>}
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 text-sm space-y-1">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="font-semibold text-gray-800 dark:text-gray-200 text-xs">New</span>
          </div>
          <div className="font-medium text-gray-900 dark:text-white">{newFields.canonical_name || '—'}</div>
          {newFields.birth_year && <div className="text-xs text-gray-500 dark:text-gray-400">b. {newFields.circa_birth ? 'c. ' : ''}{newFields.birth_year}</div>}
          {newFields.denomination && <div className="text-xs text-gray-500 dark:text-gray-400">{newFields.denomination}</div>}
          {newFields.seminary && <div className="text-xs text-gray-500 dark:text-gray-400">{newFields.seminary}</div>}
        </div>
      </div>

      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-3 py-2 rounded-lg">
          {error}
        </div>
      )}

      {/* Assignment summary */}
      {rows.length > 0 && (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden text-xs">
          <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 py-2 grid grid-cols-5 gap-2 font-semibold text-gray-500 dark:text-gray-400">
            <div className="col-span-1">Category</div>
            <div className="text-center text-blue-600 dark:text-blue-400">Original</div>
            <div className="text-center text-green-600 dark:text-green-400">New</div>
            <div className="text-center text-amber-600 dark:text-amber-400">Both</div>
            <div className="text-center text-red-500 dark:text-red-400">Delete</div>
          </div>
          {rows.map(row => (
            <div key={row.label} className="grid grid-cols-5 gap-2 px-3 py-2 border-b last:border-b-0 border-gray-100 dark:border-gray-700/60 text-gray-700 dark:text-gray-300">
              <div className="col-span-1 font-medium">{row.label}</div>
              <div className="text-center">{row.orig}</div>
              <div className="text-center">{row.new}</div>
              <div className="text-center">{row.both}</div>
              <div className="text-center">{row.neither}</div>
            </div>
          ))}
        </div>
      )}

      {/* Reason */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Why does this profile need to be split? <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <textarea
          required
          rows={3}
          value={reason}
          onChange={e => onReasonChange(e.target.value)}
          className={inputClass}
          placeholder="e.g. 'Two different rabbis with similar names were incorrectly merged during data import'"
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

// ── Step 5: Success ────────────────────────────────────────────────────────────

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

// ── Split icon ────────────────────────────────────────────────────────────────

const splitIcon = (
  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 000 2h4a1 1 0 100-2H3zm6 0a1 1 0 000 2h7a1 1 0 100-2H9z" clipRule="evenodd" />
  </svg>
)

const STEP_LABELS: Record<number, string> = {
  1: 'Basic information',
  2: 'Assign affiliations',
  3: 'Assign photos',
  4: 'Review & submit',
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function SplitRabbiButton({
  rabbiId,
  rabbiName,
  rabbiData,
  affiliations,
  images,
}: Props) {
  const supabase = createClientComponentClient()

  const [user,      setUser]      = useState<User | null>(null)
  const [authReady, setAuthReady] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)

  const [step,        setStep]        = useState<Step>(1)
  const [origFields,  setOrigFields]  = useState<RabbiFields>(() => toFields(rabbiData))
  const [newFields,   setNewFields]   = useState<RabbiFields>(() => toFields(rabbiData))
  const [assignments, setAssignments] = useState<Assignments>(() => initAssignments(affiliations, images))
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
  }, [modalOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  function doOpenModal() {
    setStep(1)
    setOrigFields(toFields(rabbiData))
    setNewFields(toFields(rabbiData))
    setAssignments(initAssignments(affiliations, images))
    setReason('')
    setError(null)
    setModalOpen(true)
  }

  function closeModal() { setModalOpen(false) }

  function setAssignment(type: keyof Assignments, id: string, v: Assignment) {
    setAssignments(prev => ({ ...prev, [type]: { ...prev[type], [id]: v } }))
  }

  function goNext() { setError(null); setStep(prev => (prev < 4 ? (prev + 1) as Step : prev)) }
  function goBack() { setError(null); setStep(prev => (prev > 1 ? (prev - 1) as Step : prev)) }

  function handleStep1Next() {
    if (!origFields.canonical_name.trim()) { setError('Original rabbi name is required.'); return }
    if (!newFields.canonical_name.trim())  { setError('New rabbi name is required.'); return }
    setError(null)
    goNext()
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
        entity_id:     rabbiId,
        synagogue_id:  null,
        proposal_type: 'rabbi_profile_split',
        proposed_data: {
          original_fields: toProposedFields(origFields),
          new_fields:      toProposedFields(newFields),
          assignments,
        },
        current_data: {
          original_rabbi_name: rabbiData.canonical_name,
          new_rabbi_name:      newFields.canonical_name.trim(),
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

    setStep(5)
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
          Split Into Two Rabbis
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
          aria-label="Split rabbi profile"
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl border border-gray-200 dark:border-gray-700 max-h-[90vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-700 flex-shrink-0">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  {step === 5 ? 'Split Proposed' : `Split ${rabbiName}`}
                </h2>
                {step < 5 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    Step {step} of 4 — {STEP_LABELS[step]}
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
                  affiliations={affiliations}
                  assignments={assignments}
                  onAssignmentChange={setAssignment}
                  origName={origFields.canonical_name}
                  newName={newFields.canonical_name}
                  onBack={goBack}
                  onNext={goNext}
                />
              )}
              {step === 3 && (
                <Step3
                  images={images}
                  assignments={assignments}
                  onAssignmentChange={setAssignment}
                  origName={origFields.canonical_name}
                  newName={newFields.canonical_name}
                  onBack={goBack}
                  onNext={goNext}
                />
              )}
              {step === 4 && (
                <Step4
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
              {step === 5 && <StepSuccess onClose={closeModal} />}
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
