'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { User } from '@supabase/supabase-js'
import AuthModal from '@/components/auth/AuthModal'
import SuggestAddressForm from './SuggestAddressForm'

interface Props {
  synagogueId: string
  synagogueName: string
}

export default function SuggestAddressButton({ synagogueId, synagogueName }: Props) {
  const supabase = createClientComponentClient()
  const [user,      setUser]      = useState<User | null>(null)
  const [authReady, setAuthReady] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
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
        setModalOpen(true)
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase]) // eslint-disable-line react-hooks/exhaustive-deps

  // Escape key + scroll lock
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

  function closeModal() {
    setModalOpen(false)
    setSubmitted(false)
  }

  function handleSuccess() {
    setSubmitted(true)
    setTimeout(() => closeModal(), 3000)
  }

  if (!authReady) return null

  return (
    <>
      {/* ── Button ──────────────────────────────────────────────────────── */}
      {user ? (
        <button
          onClick={() => { setSubmitted(false); setModalOpen(true) }}
          className="flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition"
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Address
        </button>
      ) : (
        <button
          onClick={() => setLoginOpen(true)}
          className="flex items-center gap-1.5 text-sm text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Sign in to add addresses
        </button>
      )}

      {/* ── Modal ───────────────────────────────────────────────────────── */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Add an address"
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-700">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Add an Address</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">{synagogueName}</p>
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
              {submitted ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-900 dark:text-white font-semibold">Thank you!</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your address proposal is pending review. Editors will evaluate and apply approved additions.
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">This window will close automatically…</p>
                </div>
              ) : (
                <SuggestAddressForm
                  synagogueId={synagogueId}
                  userId={user!.id}
                  onSuccess={handleSuccess}
                />
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
