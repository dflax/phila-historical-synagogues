'use client'

import { useEffect, useState } from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

interface Props {
  isOpen: boolean
  onClose: () => void
  initialView?: 'login' | 'signup'
}

export default function AuthModal({ isOpen, onClose, initialView = 'login' }: Props) {
  const [view, setView] = useState<'login' | 'signup'>(initialView)

  // Sync to initialView each time the modal opens
  useEffect(() => {
    if (isOpen) setView(initialView)
  }, [isOpen, initialView])

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  // Prevent background scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={view === 'login' ? 'Sign in' : 'Create account'}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {view === 'login' ? 'Welcome back' : 'Join the project'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Philadelphia Historical Synagogues
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            aria-label="Close"
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Tab toggle */}
        <div className="flex mx-6 mt-5 bg-gray-100 dark:bg-gray-700/60 rounded-lg p-1 gap-1">
          <button
            onClick={() => setView('login')}
            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition ${
              view === 'login'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Sign in
          </button>
          <button
            onClick={() => setView('signup')}
            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition ${
              view === 'signup'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Create account
          </button>
        </div>

        {/* Form body */}
        <div className="px-6 py-5">
          {view === 'login' ? (
            <LoginForm onSuccess={onClose} onSwitchToSignup={() => setView('signup')} />
          ) : (
            <SignupForm onSuccess={onClose} onSwitchToLogin={() => setView('login')} />
          )}
        </div>
      </div>
    </div>
  )
}
