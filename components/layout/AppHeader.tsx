'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import NavAuth from '@/components/auth/NavAuth'
import ExportDataModal from '@/components/admin/ExportDataModal'
import { useUserRole } from '@/hooks/useUserRole'

const NAV_LINKS = [
  { href: '/',           label: 'Home' },
  { href: '/map',        label: 'Map' },
  { href: '/synagogues', label: 'Synagogues' },
  { href: '/leadership', label: 'Leadership' },
] as const

interface Props {
  sticky?: boolean
}

export default function AppHeader({ sticky = false }: Props) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [exportOpen, setExportOpen] = useState(false)
  const { isEditor } = useUserRole()

  // Close on Escape; lock body scroll while open
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  function isActive(href: string) {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const desktopLinkClass = (href: string) =>
    isActive(href)
      ? 'text-blue-600 dark:text-blue-400 font-medium border-b-2 border-blue-600 dark:border-blue-400 pb-0.5'
      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition'

  const mobileLinkClass = (href: string) =>
    isActive(href)
      ? 'block px-4 py-3 rounded-lg text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900/20'
      : 'block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium transition'

  return (
    <>
      <nav className={`bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-700 flex-shrink-0${sticky ? ' sticky top-0 z-20' : ''}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
              Philadelphia Historical Synagogues
            </Link>

            {/* Desktop nav — hidden on mobile */}
            <div className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map(({ href, label }) => (
                <Link key={href} href={href} className={desktopLinkClass(href)}>
                  {label}
                </Link>
              ))}
              {isEditor && (
                <button
                  onClick={() => setExportOpen(true)}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Export Data
                </button>
              )}
              <NavAuth />
            </div>

            {/* Hamburger — visible on mobile only */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

          </div>
        </div>
      </nav>

      {/* Mobile menu — rendered outside nav so it's not constrained */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer */}
          <div
            className="fixed inset-y-0 right-0 w-72 bg-white dark:bg-gray-900 z-50 shadow-xl flex flex-col md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 dark:border-gray-700">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Menu
              </span>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={mobileLinkClass(href)}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              ))}
              {isEditor && (
                <button
                  onClick={() => { setOpen(false); setExportOpen(true) }}
                  className="w-full flex items-center gap-2 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium transition"
                >
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Export Data
                </button>
              )}
            </nav>

            {/* Auth section at bottom */}
            <div className="px-4 py-4 border-t border-gray-100 dark:border-gray-700">
              <NavAuth />
            </div>
          </div>
        </>
      )}

      <ExportDataModal isOpen={exportOpen} onClose={() => setExportOpen(false)} />
    </>
  )
}
