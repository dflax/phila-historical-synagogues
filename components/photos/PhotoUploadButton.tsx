'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { User } from '@supabase/supabase-js'
import AuthModal from '@/components/auth/AuthModal'
import PhotoUploadForm from './PhotoUploadForm'

interface Props {
  synagogueId: string
  synagogueName: string
}

export default function PhotoUploadButton({ synagogueId, synagogueName }: Props) {
  const supabase = createClientComponentClient()
  const [user,      setUser]      = useState<User | null>(null)
  const [authReady, setAuthReady] = useState(false)
  const [uploadOpen,setUploadOpen]= useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [approved,  setApproved]  = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setAuthReady(true)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      // After login via the prompt, open the upload modal
      if (session && loginOpen) {
        setLoginOpen(false)
        setUploadOpen(true)
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase]) // eslint-disable-line react-hooks/exhaustive-deps

  // Escape key + body scroll lock
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeUploadModal()
    }
    if (uploadOpen) {
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [uploadOpen])

  function closeUploadModal() {
    setUploadOpen(false)
    setSubmitted(false)
  }

  function handleSuccess(wasApproved: boolean) {
    setApproved(wasApproved)
    setSubmitted(true)
    setTimeout(() => closeUploadModal(), 4000)
  }

  if (!authReady) return null

  return (
    <>
      {/* ── Trigger button ─────────────────────────────────────────────────── */}
      {user ? (
        <button
          onClick={() => { setSubmitted(false); setUploadOpen(true) }}
          className="flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
          Upload Photo
        </button>
      ) : (
        <button
          onClick={() => setLoginOpen(true)}
          className="flex items-center gap-1.5 text-sm text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
          Sign in to upload photos
        </button>
      )}

      {/* ── Upload modal ───────────────────────────────────────────────────── */}
      {uploadOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeUploadModal}
          role="dialog"
          aria-modal="true"
          aria-label="Upload a photo"
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Upload Photo</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">{synagogueName}</p>
              </div>
              <button
                onClick={closeUploadModal}
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
                // ── Success state ────────────────────────────────────────────
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-900 dark:text-white font-semibold">
                    {approved ? 'Photo uploaded and approved!' : 'Photo uploaded!'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {approved
                      ? 'Your photo is now visible on the synagogue page.'
                      : 'Your photo is pending approval from our editors.'}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">This window will close automatically…</p>
                </div>
              ) : (
                <PhotoUploadForm
                  synagogueId={synagogueId}
                  userId={user!.id}
                  onSuccess={handleSuccess}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Login prompt ───────────────────────────────────────────────────── */}
      <AuthModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        initialView="login"
      />
    </>
  )
}
