'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface Props {
  synagogueId: string
  userId: string
  onSuccess: () => void
}

export default function SuggestAddressForm({ synagogueId, userId, onSuccess }: Props) {
  const supabase = createClientComponentClient()

  const [streetAddress, setStreetAddress] = useState('')
  const [city,          setCity]          = useState('Philadelphia')
  const [state,         setState]         = useState('PA')
  const [zipCode,       setZipCode]       = useState('')
  const [neighborhood,  setNeighborhood]  = useState('')
  const [startYear,     setStartYear]     = useState('')
  const [endYear,       setEndYear]       = useState('')
  const [isCurrent,     setIsCurrent]     = useState(false)
  const [note,          setNote]          = useState('')

  const [error,             setError]             = useState<string | null>(null)
  const [loading,           setLoading]           = useState(false)
  const [detectingNeighbor, setDetectingNeighbor] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    // Validate ZIP if provided
    if (zipCode && !/^\d{5}$/.test(zipCode)) {
      setError('ZIP code must be exactly 5 digits.')
      return
    }

    setLoading(true)

    // ── Rate limit: max 10 proposals per 24 hours ─────────────────────────────
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    const { count, error: countError } = await supabase
      .from('edit_proposals')
      .select('*', { count: 'exact', head: true })
      .eq('created_by', userId)
      .gte('created_at', cutoff)

    if (countError) {
      setError(`Could not check submission limit: [${countError.code}] ${countError.message}`)
      setLoading(false)
      return
    }

    if ((count ?? 0) >= 10) {
      setError('You\'ve reached the limit of 10 proposals per day. Please try again tomorrow.')
      setLoading(false)
      return
    }

    // ── Build proposed_data ───────────────────────────────────────────────────
    const proposed: Record<string, unknown> = {
      street_address: streetAddress.trim(),
      city:           city.trim() || 'Philadelphia',
      state:          state.trim().toUpperCase() || 'PA',
    }

    if (zipCode)       proposed.zip_code     = zipCode
    if (neighborhood)  proposed.neighborhood = neighborhood.trim()
    if (startYear)     proposed.start_year   = parseInt(startYear)
    proposed.is_current = isCurrent
    proposed.end_year   = isCurrent ? null : (endYear ? parseInt(endYear) : null)

    // ── Submit to edit_proposals ──────────────────────────────────────────────
    const { error: insertError } = await supabase
      .from('edit_proposals')
      .insert({
        synagogue_id:   synagogueId,
        proposal_type:  'address_new',
        proposed_data:  proposed,
        submitter_note: note.trim() || null,
        created_by:     userId,
        status:         'pending',
      })

    setLoading(false)

    if (insertError) {
      if (insertError.code === '23503') {
        setError('Your account profile is not fully set up. Please sign out and sign in again.')
      } else {
        setError(insertError.message)
      }
      return
    }

    onSuccess()
  }

  async function detectNeighborhood() {
    const addr = streetAddress.trim()
    if (!addr) return
    setDetectingNeighbor(true)
    try {
      const query = encodeURIComponent(`${addr}, ${city.trim() || 'Philadelphia'}, ${state.trim() || 'PA'}`)
      const key   = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      const res   = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${key}`,
      )
      const data = await res.json()
      if (data.status === 'OK' && data.results?.[0]) {
        const components: Array<{ types: string[]; long_name: string }> =
          data.results[0].address_components ?? []
        const match = components.find(c =>
          c.types.includes('neighborhood') ||
          c.types.includes('sublocality_level_1') ||
          c.types.includes('sublocality'),
        )
        if (match) setNeighborhood(match.long_name)
      }
    } catch {
      // Silently fail — user can still type manually
    } finally {
      setDetectingNeighbor(false)
    }
  }

  const inputClass =
    'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm'
  const labelClass =
    'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-3 py-2 rounded-lg">
          {error}
        </div>
      )}

      {/* Street address */}
      <div>
        <label htmlFor="addr-street" className={labelClass}>
          Street address <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id="addr-street"
          type="text"
          required
          value={streetAddress}
          onChange={e => setStreetAddress(e.target.value)}
          className={inputClass}
          placeholder="e.g. 1234 North Broad Street"
        />
      </div>

      {/* City / State */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="addr-city" className={labelClass}>City</label>
          <input
            id="addr-city"
            type="text"
            value={city}
            onChange={e => setCity(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="addr-state" className={labelClass}>State</label>
          <input
            id="addr-state"
            type="text"
            maxLength={2}
            value={state}
            onChange={e => setState(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {/* ZIP / Neighborhood */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="addr-zip" className={labelClass}>ZIP code</label>
          <input
            id="addr-zip"
            type="text"
            inputMode="numeric"
            maxLength={5}
            value={zipCode}
            onChange={e => setZipCode(e.target.value.replace(/\D/g, ''))}
            className={inputClass}
            placeholder="e.g. 19122"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="addr-neighborhood" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Neighborhood
            </label>
            <button
              type="button"
              onClick={detectNeighborhood}
              disabled={detectingNeighbor || !streetAddress.trim()}
              className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 disabled:opacity-40 disabled:cursor-not-allowed transition"
              title={streetAddress.trim() ? 'Auto-detect from street address' : 'Enter a street address first'}
            >
              {detectingNeighbor ? 'Detecting…' : 'Auto-detect'}
            </button>
          </div>
          <input
            id="addr-neighborhood"
            type="text"
            value={neighborhood}
            onChange={e => setNeighborhood(e.target.value)}
            className={inputClass}
            placeholder="e.g. Strawberry Mansion"
          />
        </div>
      </div>

      {/* Years */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="addr-start-year" className={labelClass}>From year</label>
          <input
            id="addr-start-year"
            type="number"
            min="1700"
            max={new Date().getFullYear()}
            value={startYear}
            onChange={e => setStartYear(e.target.value)}
            className={inputClass}
            placeholder="e.g. 1910"
          />
        </div>
        <div>
          <label htmlFor="addr-end-year" className={labelClass}>To year</label>
          <input
            id="addr-end-year"
            type="number"
            min="1700"
            max={new Date().getFullYear()}
            value={isCurrent ? '' : endYear}
            onChange={e => setEndYear(e.target.value)}
            disabled={isCurrent}
            className={inputClass + (isCurrent ? ' opacity-40 cursor-not-allowed' : '')}
            placeholder={isCurrent ? 'present' : 'e.g. 1955'}
          />
        </div>
      </div>

      {/* Is current address */}
      <label className="flex items-center gap-2.5 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={isCurrent}
          onChange={e => {
            setIsCurrent(e.target.checked)
            if (e.target.checked) setEndYear('')
          }}
          className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm text-gray-700 dark:text-gray-300">This is the current / most recent address</span>
      </label>

      {/* Note */}
      <div>
        <label htmlFor="addr-note" className={labelClass}>Why are you adding this?</label>
        <textarea
          id="addr-note"
          rows={2}
          value={note}
          onChange={e => setNote(e.target.value)}
          className={inputClass}
          placeholder="Source or context (e.g. 'Listed in 1920 Philadelphia Jewish Directory')"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 px-4 rounded-lg font-medium text-sm transition"
      >
        {loading ? 'Submitting…' : 'Submit address proposal'}
      </button>

      <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
        Proposals are reviewed by editors before being applied.
      </p>
    </form>
  )
}
