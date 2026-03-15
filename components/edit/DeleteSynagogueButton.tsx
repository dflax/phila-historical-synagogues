'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { User } from '@supabase/supabase-js'
import AuthModal from '@/components/auth/AuthModal'

interface Props {
  synagogueId: string
  synagogueName: string
  addressCount: number
  historyCount: number
  photoCount: number
  rabbiCount: number
}

type Step = 'closed' | 'summary' | 'confirm'

export default function DeleteSynagogueButton({
  synagogueId,
  synagogueName,
  addressCount,
  historyCount,
  photoCount,
  rabbiCount,
}: Props) {
  const supabase = createClientComponentClient()
  const [user,      setUser]      = useState<User | null>(null)
  const [authReady, setAuthReady] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [step,      setStep]      = useState<Step>('closed')
  const [reason,    setReason]    = useState('')
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setAuthReady(true)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session && loginOpen) {
        setLoginOpen(false)
        setStep('summary')
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const isOpen = step !== 'closed'
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeModal()
    }
    if (isOpen) {
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [step]) // eslint-disable-line react-hooks/exhaustive-deps

  function closeModal() {
    setStep('closed')
    setReason('')
    setError(null)
    setSubmitted(false)
  }

  async function handleSubmit() {
    if (!user) return
    setError(null)
    setLoading(true)

    // Rate limit: max 10 proposals per 24 hours
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    const { count, error: countError } = await supabase
      .from('edit_proposals')
      .select('*', { count: 'exact', head: true })
      .eq('created_by', user.id)
      .gte('created_at', cutoff)

    if (countError) {
      setError(`Could not check submission limit: ${countError.message}`)
      setLoading(false)
      return
    }

    if ((count ?? 0) >= 10) {
      setError("You've reached the limit of 10 proposals per day. Please try again tomorrow.")
      setLoading(false)
      return
    }

    const { error: insertError } = await supabase
      .from('edit_proposals')
      .insert({
        synagogue_id:   synagogueId,
        entity_id:      null,
        proposal_type:  'synagogue_delete',
        proposed_data: {
          action:         'delete_synagogue',
          synagogue_name: synagogueName,
          address_count:  addressCount,
          history_count:  historyCount,
          photo_count:    photoCount,
          rabbi_count:    rabbiCount,
        },
        current_data:   null,
        submitter_note: reason.trim() || null,
        created_by:     user.id,
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

    setSubmitted(true)
  }

  if (!authReady) return null

  // ── Helpers ──────────────────────────────────────────────────────────────────

  function plural(n: number, word: string) {
    return `${n} ${word}${n !== 1 ? 's' : ''}`
  }

  const CloseButton = () => (
    <button
      onClick={closeModal}
      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition flex-shrink-0 ml-4"
      aria-label="Close"
    >
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </button>
  )

  function SummaryRow({ count, label }: { count: number; label: string }) {
    return (
      <li className="flex items-center gap-3 text-sm">
        <span className="w-7 h-7 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 font-bold text-red-600 dark:text-red-400 text-xs">
          {count}
        </span>
        <span className="text-gray-700 dark:text-gray-300">{label}</span>
      </li>
    )
  }

  return (
    <>
      {/* ── Trigger button ────────────────────────────────────────────────── */}
      <button
        onClick={() => {
          if (user) {
            setStep('summary')
          } else {
            setLoginOpen(true)
          }
        }}
        className="flex items-center gap-1.5 text-sm text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition"
      >
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        Delete Synagogue
      </button>

      {/* ── Two-step modal ────────────────────────────────────────────────── */}
      {step !== 'closed' && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Propose synagogue deletion"
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-700">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  {submitted ? 'Deletion Proposed' : 'Delete Synagogue'}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                  {synagogueName}
                </p>
              </div>
              <CloseButton />
            </div>

            {/* Body */}
            <div className="px-6 py-5">

              {/* ── Success ─────────────────────────────────────────────────── */}
              {submitted && (
                <div className="text-center py-4 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <p className="text-gray-900 dark:text-white font-semibold">Deletion proposed</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    An editor will review this request. No data has been changed yet.
                  </p>
                  <button
                    onClick={closeModal}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    Close
                  </button>
                </div>
              )}

              {/* ── Step 1: Summary ─────────────────────────────────────────── */}
              {!submitted && step === 'summary' && (
                <div className="space-y-5">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    If approved by an editor, the following will be <strong className="text-gray-900 dark:text-white">permanently removed</strong>:
                  </p>

                  <ul className="space-y-3">
                    <SummaryRow count={1} label={`Detail page for ${synagogueName}`} />
                    <SummaryRow
                      count={addressCount}
                      label={`${addressCount === 1 ? 'Address' : 'Addresses'}${addressCount === 0 ? ' (none on file)' : ''}`}
                    />
                    <SummaryRow
                      count={historyCount}
                      label={`Historical ${historyCount === 1 ? 'entry' : 'entries'}${historyCount === 0 ? ' (none on file)' : ''}`}
                    />
                    <SummaryRow
                      count={photoCount}
                      label={`${photoCount === 1 ? 'Photo' : 'Photos'}${photoCount === 0 ? ' (none on file)' : ''}`}
                    />
                    <SummaryRow
                      count={rabbiCount}
                      label={`Rabbi affiliation ${rabbiCount === 1 ? 'record' : 'records'}${rabbiCount === 0 ? ' (none on file)' : ''}`}
                    />
                  </ul>

                  <p className="text-xs text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg px-3 py-2">
                    Rabbi profiles will be preserved — only the affiliation links to this synagogue will be removed.
                  </p>

                  <p className="text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-2">
                    Nothing will be deleted until an editor reviews and approves this proposal.
                  </p>

                  <div className="flex gap-3 pt-1">
                    <button
                      onClick={closeModal}
                      className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-gray-600 rounded-lg transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setStep('confirm')}
                      className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition"
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              )}

              {/* ── Step 2: Final confirmation ───────────────────────────────── */}
              {!submitted && step === 'confirm' && (
                <div className="space-y-4">
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-4 py-3">
                    <p className="text-sm font-semibold text-red-700 dark:text-red-400 mb-1">
                      Are you sure?
                    </p>
                    <p className="text-sm text-red-600 dark:text-red-400">
                      You are proposing to delete <strong>{synagogueName}</strong> along with{' '}
                      {plural(addressCount, 'address')},{' '}
                      {plural(historyCount, 'history entry', )},{' '}
                      {plural(photoCount, 'photo')}, and{' '}
                      {plural(rabbiCount, 'rabbi affiliation')}.
                      Rabbi profiles themselves will not be deleted.
                    </p>
                  </div>

                  {error && (
                    <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-3 py-2 rounded-lg">
                      {error}
                    </div>
                  )}

                  <div>
                    <label htmlFor="delete-reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Why should this synagogue be deleted?
                    </label>
                    <textarea
                      id="delete-reason"
                      rows={3}
                      value={reason}
                      onChange={e => setReason(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition text-sm"
                      placeholder="e.g. 'Duplicate entry', 'Created in error', 'Data merged into another record'"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => { setStep('summary'); setError(null) }}
                      disabled={loading}
                      className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-gray-600 rounded-lg transition disabled:opacity-40"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition"
                    >
                      {loading ? 'Submitting…' : 'Propose deletion'}
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ── Login prompt ──────────────────────────────────────────────────── */}
      <AuthModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        initialView="login"
      />
    </>
  )
}
