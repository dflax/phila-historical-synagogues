'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { User } from '@supabase/supabase-js'
import AuthModal from '@/components/auth/AuthModal'

// ── Types ─────────────────────────────────────────────────────────────────────

interface Props {
  entityType: 'synagogue' | 'rabbi'
  entityId:   string
  entityName: string
}

// ── Link type options ─────────────────────────────────────────────────────────

const LINK_TYPES = [
  { value: 'website',        icon: '🌐', label: 'Website' },
  { value: 'wikipedia',      icon: '📖', label: 'Wikipedia' },
  { value: 'findagrave',     icon: '🪦', label: 'Find a Grave' },
  { value: 'youtube',        icon: '📺', label: 'YouTube' },
  { value: 'vimeo',          icon: '🎬', label: 'Vimeo' },
  { value: 'documentary',    icon: '🎥', label: 'Documentary' },
  { value: 'virtual_tour',   icon: '🏛️', label: 'Virtual Tour' },
  { value: 'historical_doc', icon: '📄', label: 'Historical Document' },
  { value: 'news_article',   icon: '📰', label: 'News Article' },
  { value: 'podcast',        icon: '🎙️', label: 'Podcast' },
  { value: 'interview',      icon: '🎤', label: 'Interview' },
  { value: 'obituary',       icon: '📜', label: 'Obituary' },
  { value: 'sermon',         icon: '📖', label: 'Sermon' },
  { value: 'publication',    icon: '📚', label: 'Publication' },
  { value: 'facebook',       icon: '📘', label: 'Facebook' },
  { value: 'instagram',      icon: '📷', label: 'Instagram' },
  { value: 'twitter',        icon: '🐦', label: 'Twitter / X' },
  { value: 'other',          icon: '🔗', label: 'Other' },
]

// ── Style helpers ─────────────────────────────────────────────────────────────

const inputClass =
  'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm'

const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

// ── Component ─────────────────────────────────────────────────────────────────

export default function AddLinkButton({ entityType, entityId, entityName }: Props) {
  const supabase = createClientComponentClient()

  const [user,      setUser]      = useState<User | null>(null)
  const [authReady, setAuthReady] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)

  // 1 = form, 2 = success
  const [step, setStep] = useState(1)

  // Form state
  const [linkType,     setLinkType]     = useState('website')
  const [url,          setUrl]          = useState('')
  const [title,        setTitle]        = useState('')
  const [description,  setDescription]  = useState('')
  const [reason,       setReason]       = useState('')
  const [error,        setError]        = useState<string | null>(null)
  const [loading,      setLoading]      = useState(false)

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
        setModalOpen(true)
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Escape key + scroll lock ───────────────────────────────────────────────

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeModal()
    }
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

  // ── Helpers ───────────────────────────────────────────────────────────────

  function openModal() {
    setStep(1)
    setLinkType('website')
    setUrl('')
    setTitle('')
    setDescription('')
    setReason('')
    setError(null)
    setLoading(false)
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
  }

  // Ensure URL has a scheme when submitting
  function normalizeUrl(raw: string): string {
    const trimmed = raw.trim()
    if (!trimmed) return trimmed
    if (/^https?:\/\//i.test(trimmed)) return trimmed
    return `https://${trimmed}`
  }

  // ── Submit ────────────────────────────────────────────────────────────────

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const normalizedUrl = normalizeUrl(url)
    if (!normalizedUrl) {
      setError('Please enter a URL.')
      return
    }
    try {
      new URL(normalizedUrl)
    } catch {
      setError('Please enter a valid URL.')
      return
    }

    if (reason.trim().length < 10) {
      setError('Please provide a reason of at least 10 characters.')
      return
    }

    setLoading(true)

    const { data: canSubmit, error: rateLimitError } = await supabase
      .rpc('check_proposal_rate_limit', { user_id: user!.id })

    if (rateLimitError || !canSubmit) {
      setError("You've reached your daily proposal limit. Please try again tomorrow.")
      setLoading(false)
      return
    }

    const { error: insertError } = await supabase
      .from('edit_proposals')
      .insert({
        synagogue_id:  entityType === 'synagogue' ? entityId : null,
        entity_id:     entityType === 'rabbi'     ? entityId : null,
        proposal_type: 'link_new',
        proposed_data: {
          entity_type:  entityType,
          entity_id:    entityId,
          link_type:    linkType,
          url:          normalizedUrl,
          title:        title.trim() || null,
          description:  description.trim() || null,
        },
        current_data: {
          entity_name: entityName,
        },
        submitter_note: reason.trim(),
        created_by:     user!.id,
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

    setStep(2)
  }

  if (!authReady) return null

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Trigger button ──────────────────────────────────────────────── */}
      {user ? (
        <button
          onClick={openModal}
          className="flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition"
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Link
        </button>
      ) : (
        <button
          onClick={() => setLoginOpen(true)}
          className="flex items-center gap-1.5 text-sm text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Sign in to add links
        </button>
      )}

      {/* ── Modal ───────────────────────────────────────────────────────── */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Add link"
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-700">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  {step === 1 ? 'Add Link or Resource' : 'Proposal Submitted'}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">{entityName}</p>
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
            <div className="px-6 py-5">

              {/* ── Step 1: Form ─────────────────────────────────────────── */}
              {step === 1 && (
                <form onSubmit={handleSubmit} className="space-y-4">

                  {error && (
                    <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-3 py-2 rounded-lg">
                      {error}
                    </div>
                  )}

                  {/* Link type */}
                  <div>
                    <label htmlFor="link-type" className={labelClass}>Link type</label>
                    <select
                      id="link-type"
                      value={linkType}
                      onChange={e => setLinkType(e.target.value)}
                      className={inputClass}
                    >
                      {LINK_TYPES.map(t => (
                        <option key={t.value} value={t.value}>
                          {t.icon} {t.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* URL */}
                  <div>
                    <label htmlFor="link-url" className={labelClass}>
                      URL <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="link-url"
                      type="text"
                      autoFocus
                      value={url}
                      onChange={e => setUrl(e.target.value)}
                      className={inputClass}
                      placeholder="https://example.com/article"
                    />
                  </div>

                  {/* Title */}
                  <div>
                    <label htmlFor="link-title" className={labelClass}>
                      Title <span className="text-xs font-normal text-gray-400">(optional)</span>
                    </label>
                    <input
                      id="link-title"
                      type="text"
                      value={title}
                      onChange={e => setTitle(e.target.value.slice(0, 200))}
                      className={inputClass}
                      placeholder="Display name for this link"
                    />
                    {title.length > 180 && (
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{title.length}/200</p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="link-description" className={labelClass}>
                      Description <span className="text-xs font-normal text-gray-400">(optional)</span>
                    </label>
                    <textarea
                      id="link-description"
                      rows={2}
                      value={description}
                      onChange={e => setDescription(e.target.value.slice(0, 500))}
                      className={inputClass}
                      placeholder="Brief description of what this link contains"
                    />
                    {description.length > 450 && (
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{description.length}/500</p>
                    )}
                  </div>

                  {/* Reason (required) */}
                  <div>
                    <label htmlFor="link-reason" className={labelClass}>
                      Why are you adding this link?{' '}
                      <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="link-reason"
                      rows={2}
                      required
                      value={reason}
                      onChange={e => setReason(e.target.value)}
                      className={inputClass}
                      placeholder="e.g. 'This Wikipedia article covers the synagogue's founding and closure'"
                    />
                  </div>

                  {/* Footer */}
                  <div className="flex gap-3 pt-1">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 px-4 rounded-lg font-medium text-sm transition"
                    >
                      {loading ? 'Submitting…' : 'Submit Proposal'}
                    </button>
                  </div>

                  <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
                    Proposals are reviewed by editors before being applied.
                  </p>
                </form>
              )}

              {/* ── Step 2: Success ────────────────────────────────────── */}
              {step === 2 && (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-900 dark:text-white font-semibold">Proposal Submitted</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your link proposal for <span className="font-medium">{entityName}</span> has been submitted for review.
                  </p>
                  <button
                    onClick={closeModal}
                    className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-medium text-sm transition"
                  >
                    Close
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ── Login prompt ─────────────────────────────────────────────────── */}
      <AuthModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        initialView="login"
      />
    </>
  )
}
