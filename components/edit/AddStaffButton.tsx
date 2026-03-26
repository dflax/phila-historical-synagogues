'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { STAFF_ROLES } from '@/lib/types/leadership'

interface Props {
  synagogueId: string
  synagogueName: string
}

export default function AddStaffButton({ synagogueId, synagogueName }: Props) {
  const [isOpen,       setIsOpen]       = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess,  setShowSuccess]  = useState(false)
  const [submitError,  setSubmitError]  = useState<string | null>(null)

  const [name,      setName]      = useState('')
  const [role,      setRole]      = useState('')
  const [startYear, setStartYear] = useState('')
  const [endYear,   setEndYear]   = useState('')
  const [notes,     setNotes]     = useState('')

  function resetForm() {
    setName(''); setRole(''); setStartYear(''); setEndYear(''); setNotes('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    const supabase = createClientComponentClient()

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setSubmitError('You must be logged in.')
        return
      }

      const { error } = await supabase
        .from('edit_proposals')
        .insert({
          proposal_type: 'staff_affiliation_new',
          synagogue_id:  synagogueId,
          proposed_data: {
            person_name:          name,
            role_title:           role,
            start_year:           startYear ? parseInt(startYear) : null,
            end_year:             endYear   ? parseInt(endYear)   : null,
            notes:                notes || null,
            person_type:          'staff',
            affiliation_category: 'staff',
          },
          created_by: user.id,
          status:     'pending',
        })

      if (error) throw error

      resetForm()
      setShowSuccess(true)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error('Error submitting staff proposal:', err)
      setSubmitError(msg || 'An unexpected error occurred.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition"
      >
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        Add Staff
      </button>

      {/* Main modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Add Staff Member</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 line-clamp-1">{synagogueName}</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g., Rebecca Jacobson"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role *</label>
                  <select
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a role…</option>
                    {STAFF_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Year</label>
                    <input
                      type="number" value={startYear} onChange={e => setStartYear(e.target.value)}
                      placeholder="YYYY" min="1600" max="2100"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Year</label>
                    <input
                      type="number" value={endYear} onChange={e => setEndYear(e.target.value)}
                      placeholder="YYYY" min="1600" max="2100"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</label>
                  <textarea
                    value={notes} onChange={e => setNotes(e.target.value)} rows={2}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setIsOpen(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    Cancel
                  </button>
                  <button type="submit" disabled={isSubmitting}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition">
                    {isSubmitting ? 'Submitting…' : 'Submit for Review'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Success modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
              <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Proposal Submitted</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Your staff proposal has been submitted for review by an editor.
            </p>
            <button onClick={() => { setShowSuccess(false); setIsOpen(false); window.location.reload() }}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Error modal */}
      {submitError && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 mb-4">
              <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Submission Failed</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{submitError}</p>
            <button onClick={() => setSubmitError(null)}
              className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
