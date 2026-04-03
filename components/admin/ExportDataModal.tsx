'use client'

import { useState } from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

type ExportType = 'synagogues' | 'addresses' | 'clergy'

export default function ExportDataModal({ isOpen, onClose }: Props) {
  const [selected, setSelected] = useState<Set<ExportType>>(new Set())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  function toggle(type: ExportType) {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(type)) next.delete(type)
      else next.add(type)
      return next
    })
    setError(null)
  }

  async function handleExport() {
    if (selected.size === 0) {
      setError('Please select at least one data type to export.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const types = Array.from(selected).join(',')
      const res = await fetch(`/api/admin/export?types=${types}`)

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error ?? `Export failed (${res.status})`)
      }

      // Derive filename from Content-Disposition header or build a default
      const disposition = res.headers.get('Content-Disposition') ?? ''
      const match = disposition.match(/filename="?([^"]+)"?/)
      const filename = match?.[1] ?? `phila-synagogues-export-${new Date().toISOString().slice(0, 10)}.xlsx`

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)

      onClose()
      setSelected(new Set())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleCancel() {
    if (loading) return
    onClose()
    setSelected(new Set())
    setError(null)
  }

  const checkboxClass =
    'h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 cursor-pointer'
  const labelClass =
    'ml-3 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none'

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={handleCancel}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="export-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-700">
            <h2
              id="export-modal-title"
              className="text-lg font-semibold text-gray-900 dark:text-white"
            >
              Export Data
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Download data for offline review. Exports are read-only — use the proposal
              system to submit changes.
            </p>
          </div>

          {/* Body */}
          <div className="px-6 py-5 space-y-4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Select data to include:
            </p>

            {/* Synagogues */}
            <label className="flex items-center">
              <input
                type="checkbox"
                className={checkboxClass}
                checked={selected.has('synagogues')}
                onChange={() => toggle('synagogues')}
                disabled={loading}
              />
              <span className={labelClass}>
                Synagogues
                <span className="ml-1 text-xs text-gray-400 dark:text-gray-500 font-normal">
                  — name, status, founded/closed years
                </span>
              </span>
            </label>

            {/* Addresses */}
            <label className="flex items-center">
              <input
                type="checkbox"
                className={checkboxClass}
                checked={selected.has('addresses')}
                onChange={() => toggle('addresses')}
                disabled={loading}
              />
              <span className={labelClass}>
                Addresses
                <span className="ml-1 text-xs text-gray-400 dark:text-gray-500 font-normal">
                  — all locations with geocoordinates
                </span>
              </span>
            </label>

            {/* Clergy */}
            <label className="flex items-center">
              <input
                type="checkbox"
                className={checkboxClass}
                checked={selected.has('clergy')}
                onChange={() => toggle('clergy')}
                disabled={loading}
              />
              <span className={labelClass}>
                Clergy (Rabbis &amp; Chazzanim)
                <span className="ml-1 text-xs text-gray-400 dark:text-gray-500 font-normal">
                  — profiles with synagogue affiliations
                </span>
              </span>
            </label>

            {/* Error message */}
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {/* Info note */}
            <p className="text-xs text-gray-400 dark:text-gray-500 pt-1">
              Each selected type becomes a separate worksheet in the Excel file.
              Only approved records are included.
            </p>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6 flex items-center justify-end gap-3">
            <button
              onClick={handleCancel}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={selected.size === 0 || loading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[90px] justify-center"
            >
              {/* Fixed-width spinner slot — always occupies space to prevent layout shift */}
              <span className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
                {loading && (
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                )}
              </span>
              Export
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
