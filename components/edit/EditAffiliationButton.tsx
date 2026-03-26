'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface EditAffiliationButtonProps {
  affiliation: {
    id: string
    role_title: string | null
    start_year: number | null
    end_year: number | null
    notes: string | null
  }
  personProfile: {
    id: string
    canonical_name: string
    person_type: 'rabbi' | 'chazzan' | 'lay_leader' | 'staff' | 'other'
    slug: string | null
  }
  synagogueId: string
}

export default function EditAffiliationButton({
  affiliation,
  personProfile,
  synagogueId,
}: EditAffiliationButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [roleTitle, setRoleTitle] = useState(affiliation.role_title ?? '')
  const [startYear, setStartYear] = useState(affiliation.start_year?.toString() ?? '')
  const [endYear, setEndYear] = useState(affiliation.end_year?.toString() ?? '')
  const [notes, setNotes] = useState(affiliation.notes ?? '')
  const [convertToCantor, setConvertToCantor] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const supabase = createClientComponentClient()

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        alert('You must be logged in to edit affiliations')
        return
      }

      const proposedData: Record<string, unknown> = {
        role_title: roleTitle,
        start_year: startYear ? parseInt(startYear) : null,
        end_year:   endYear   ? parseInt(endYear)   : null,
        notes:      notes || null,
      }

      if (convertToCantor) {
        proposedData.convert_to_cantor  = true
        proposedData.person_profile_id  = personProfile.id
        proposedData.new_person_type    = 'chazzan'
      }

      const { error } = await supabase
        .from('edit_proposals')
        .insert({
          proposal_type: 'affiliation_edit',
          entity_id:     affiliation.id,
          synagogue_id:  synagogueId,
          proposed_data: proposedData,
          current_data: {
            role_title:  affiliation.role_title,
            start_year:  affiliation.start_year,
            end_year:    affiliation.end_year,
            notes:       affiliation.notes,
            person_type: personProfile.person_type,
          },
          created_by: user.id,
          status:     'pending',
        })

      if (error) throw error

      alert('Edit proposal submitted for review.')
      setIsOpen(false)
      window.location.reload()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error('Error submitting proposal:', err)
      alert(`Failed to submit proposal: ${msg}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex-shrink-0"
      >
        Edit
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                Edit Affiliation
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                {personProfile.canonical_name}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Role Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Role / Title
                  </label>
                  <input
                    type="text"
                    value={roleTitle}
                    onChange={e => setRoleTitle(e.target.value)}
                    placeholder="e.g., Senior Rabbi, Cantor"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Start Year */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Start Year
                  </label>
                  <input
                    type="number"
                    value={startYear}
                    onChange={e => setStartYear(e.target.value)}
                    placeholder="YYYY"
                    min="1600"
                    max="2100"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* End Year */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    End Year
                  </label>
                  <input
                    type="number"
                    value={endYear}
                    onChange={e => setEndYear(e.target.value)}
                    placeholder="YYYY"
                    min="1600"
                    max="2100"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Convert to Cantor — only for rabbis */}
                {personProfile.person_type === 'rabbi' && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={convertToCantor}
                        onChange={e => setConvertToCantor(e.target.checked)}
                        className="mt-0.5"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          This person is a Cantor / Chazzan
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          Updates their profile type and changes the URL slug from <code>rabbi-…</code> to <code>chazzan-…</code>
                        </div>
                      </div>
                    </label>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
                  >
                    {isSubmitting ? 'Submitting…' : 'Submit for Review'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
