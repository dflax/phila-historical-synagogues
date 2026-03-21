'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { User } from '@supabase/supabase-js'
import AuthModal from '@/components/auth/AuthModal'

// ── Types ─────────────────────────────────────────────────────────────────────

interface Relationship {
  id:                string
  relationship_type: string
  relationship_year: number | null
  notes:             string | null
  related_synagogue: { id: string; name: string; status: string } | null
}

interface Props {
  relationship:  Relationship
  synagogueId:   string
  synagogueName: string
  onClose:       () => void
  onSuccess:     () => void
}

const REVERSE_MAP: Record<string, string> = {
  merged_into:         'merged_from',
  merged_from:         'merged_into',
  split_into:          'split_from',
  split_from:          'split_into',
  predecessor:         'successor',
  successor:           'predecessor',
  parent_organization: 'branch_of',
  branch_of:           'parent_organization',
}

// ── Style helpers ─────────────────────────────────────────────────────────────

const inputClass =
  'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm'

const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

// ── Component ─────────────────────────────────────────────────────────────────

export default function DeleteRelationshipModal({
  relationship,
  synagogueId,
  synagogueName,
  onClose,
  onSuccess,
}: Props) {
  const supabase = createClientComponentClient()

  const [user,      setUser]      = useState<User | null>(null)
  const [authReady, setAuthReady] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [step,      setStep]      = useState<'confirm' | 'success'>('confirm')
  const [reason,    setReason]    = useState('')
  const [error,     setError]     = useState<string | null>(null)
  const [loading,   setLoading]   = useState(false)

  const relatedName    = relationship.related_synagogue?.name ?? 'Unknown'
  const reverseType    = REVERSE_MAP[relationship.relationship_type] ?? relationship.relationship_type
  const yearStr        = relationship.relationship_year ? ` (${relationship.relationship_year})` : ''

  // ── Auth ──────────────────────────────────────────────────────────────────

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setAuthReady(true)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session && loginOpen) {
        setLoginOpen(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Escape key + scroll lock ───────────────────────────────────────────────

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  // ── Submit ────────────────────────────────────────────────────────────────

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!user) {
      setLoginOpen(true)
      return
    }

    if (reason.trim().length < 10) {
      setError('Please provide a reason of at least 10 characters.')
      return
    }

    setLoading(true)

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
        proposal_type: 'synagogue_relationship_delete',
        proposed_data: {
          relationship_id:           relationship.id,
          relationship_type:         relationship.relationship_type,
          related_synagogue_id:      relationship.related_synagogue?.id ?? null,
          relationship_year:         relationship.relationship_year,
          reverse_relationship_type: reverseType,
        },
        current_data: {
          synagogue_name:         synagogueName,
          related_synagogue_name: relatedName,
          relationship_type:      relationship.relationship_type,
          relationship_year:      relationship.relationship_year,
        },
        submitter_note: reason.trim(),
        created_by:     user.id,
        status:         'pending',
      })

    setLoading(false)

    if (insertError) {
      if (insertError.code === '23503') {
        setError('Your account profile is not fully set up. Please sign out and sign in again.')
      } else {
        setError(`Failed to submit: ${insertError.message}`)
      }
      return
    }

    setStep('success')
  }

  if (!authReady) return null

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Propose relationship deletion"
      >
        <div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-700">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {step === 'confirm' ? 'Propose Relationship Deletion' : 'Proposal Submitted'}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{synagogueName}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition flex-shrink-0 ml-4"
              aria-label="Close"
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-5">

            {/* ── Confirm form ─────────────────────────────────────── */}
            {step === 'confirm' && (
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Relationship summary */}
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 space-y-2">
                  <p className="text-xs font-semibold text-red-700 dark:text-red-400 uppercase tracking-wide mb-1">
                    Relationships to remove
                  </p>
                  <div className="text-sm space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap text-gray-900 dark:text-white">
                      <span className="font-medium">{synagogueName}</span>
                      <span className="text-red-600 dark:text-red-400">
                        {relationship.relationship_type.replace(/_/g, ' ')}
                      </span>
                      <span className="font-medium">{relatedName}</span>
                      {relationship.relationship_year && (
                        <span className="text-gray-500 dark:text-gray-400">{yearStr}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap text-gray-500 dark:text-gray-400 text-xs">
                      <span className="font-medium">{relatedName}</span>
                      <span>{reverseType.replace(/_/g, ' ')}</span>
                      <span className="font-medium">{synagogueName}</span>
                      {relationship.relationship_year && <span>{yearStr}</span>}
                      <span className="italic">(reverse, also removed)</span>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-3 py-2 rounded-lg">
                    {error}
                  </div>
                )}

                {/* Reason */}
                <div>
                  <label htmlFor="del-reason" className={labelClass}>
                    Why should this relationship be removed?{' '}
                    <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="del-reason"
                    rows={3}
                    autoFocus
                    required
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    className={inputClass}
                    placeholder="e.g. 'This relationship is incorrect — the congregations never merged.'"
                  />
                </div>

                <p className="text-xs text-gray-400 dark:text-gray-500">
                  This will create a proposal for editor review. Both the forward and reverse relationships will be removed when approved.
                </p>

                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 px-4 rounded-lg font-medium text-sm transition"
                  >
                    {loading ? 'Submitting…' : 'Propose Deletion'}
                  </button>
                </div>
              </form>
            )}

            {/* ── Success ─────────────────────────────────────────── */}
            {step === 'success' && (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-900 dark:text-white font-semibold">Proposal Submitted</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your deletion proposal has been submitted for editor review. Both the forward and reverse relationships will be removed when approved.
                </p>
                <button
                  onClick={() => { onSuccess(); onClose() }}
                  className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-medium text-sm transition"
                >
                  Close
                </button>
              </div>
            )}

          </div>
        </div>
      </div>

      <AuthModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        initialView="login"
      />
    </>
  )
}
