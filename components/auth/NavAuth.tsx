'use client'

import { useEffect, useRef, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { User } from '@supabase/supabase-js'
import Link from 'next/link'
import AuthModal from './AuthModal'

export default function NavAuth() {
  const supabase = createClientComponentClient()
  const [user,         setUser]         = useState<User | null>(null)
  const [fullName,     setFullName]     = useState<string | null>(null)
  const [modalOpen,    setModalOpen]    = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hydrate initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // Keep in sync with auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (!session) setFullName(null)
      if (session) setModalOpen(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  // Fetch full_name from user_profiles whenever the logged-in user changes
  useEffect(() => {
    if (!user) return
    supabase
      .from('user_profiles')
      .select('full_name')
      .eq('id', user.id)
      .maybeSingle()
      .then(({ data }) => setFullName(data?.full_name ?? null))
  }, [user, supabase])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    if (dropdownOpen) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [dropdownOpen])

  async function handleSignOut() {
    await supabase.auth.signOut()
    setDropdownOpen(false)
  }

  // ── Logged out ────────────────────────────────────────────────────────────
  if (!user) {
    return (
      <>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition shadow-sm"
        >
          Sign in
        </button>
        <AuthModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </>
    )
  }

  // ── Logged in ─────────────────────────────────────────────────────────────
  // Prefer profile full_name; fall back to auth metadata then email
  const displayName = fullName ?? user.user_metadata?.full_name ?? user.email ?? 'Account'
  const initial = displayName[0].toUpperCase()

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen(v => !v)}
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
        className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
      >
        {/* Avatar circle */}
        <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
          {initial}
        </span>
        {/* Name — hidden on small screens */}
        <span className="hidden sm:inline max-w-[140px] truncate">{displayName}</span>
        {/* Chevron */}
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-40 py-1">
          {/* Identity header */}
          <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-700">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {fullName ?? user.user_metadata?.full_name ?? user.email}
            </p>
            {(fullName ?? user.user_metadata?.full_name) && (
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{user.email}</p>
            )}
          </div>

          <Link
            href="/contributions"
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            onClick={() => setDropdownOpen(false)}
          >
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            My Contributions
          </Link>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
          >
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}
