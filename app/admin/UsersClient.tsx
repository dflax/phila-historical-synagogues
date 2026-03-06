'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import NavAuth from '@/components/auth/NavAuth'
import { useUserRole } from '@/hooks/useUserRole'

// ── Types ──────────────────────────────────────────────────────────────────────

export interface UserWithStats {
  id: string
  email: string
  full_name: string | null
  role: string
  total_proposals: number
  approved_proposals: number
  rejected_proposals: number
  total_photos: number
  approved_photos: number
  last_login: string | null
  created_at: string
}

interface Props {
  users: UserWithStats[]
  currentUserId: string
}

type ConfirmDialog = {
  userId: string
  userName: string
  currentRole: string
  action: 'promote' | 'demote'
  targetRole: string
  level: 'normal' | 'warning' | 'critical'
}

// ── Config ─────────────────────────────────────────────────────────────────────

const ROLE_ORDER = ['contributor', 'editor', 'admin', 'super_admin']

const ROLE_BADGE: Record<string, { label: string; className: string }> = {
  contributor: {
    label:     'Contributor',
    className: 'text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600',
  },
  editor: {
    label:     'Editor',
    className: 'text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800',
  },
  admin: {
    label:     'Admin',
    className: 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800',
  },
  super_admin: {
    label:     'Super Admin',
    className: 'text-violet-700 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800',
  },
}

const ROLE_LABELS: Record<string, string> = {
  contributor: 'Contributor',
  editor:      'Editor',
  admin:       'Admin',
  super_admin: 'Super Admin',
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function formatDate(iso: string | null | undefined): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

function displayName(u: UserWithStats): string {
  return u.full_name || u.email || u.id.slice(0, 8)
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function UsersClient({ users: initialUsers, currentUserId }: Props) {
  const { role: currentRole, isSuperAdmin, isAdmin } = useUserRole()

  const [users,       setUsers]       = useState<UserWithStats[]>(initialUsers)
  const [search,      setSearch]      = useState('')
  const [roleFilter,  setRoleFilter]  = useState('all')
  const [openMenuId,  setOpenMenuId]  = useState<string | null>(null)
  const [confirm,     setConfirm]     = useState<ConfirmDialog | null>(null)
  const [processing,  setProcessing]  = useState<Set<string>>(new Set())
  const [error,       setError]       = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // ESC closes confirm dialog
  useEffect(() => {
    if (!confirm) return
    function handleKey(e: KeyboardEvent) { if (e.key === 'Escape') setConfirm(null) }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [confirm])

  // ── Filtering ──────────────────────────────────────────────────────────────

  const filteredUsers = users.filter(u => {
    const matchesSearch = !search
      || displayName(u).toLowerCase().includes(search.toLowerCase())
      || u.email.toLowerCase().includes(search.toLowerCase())
    const matchesRole = roleFilter === 'all' || u.role === roleFilter
    return matchesSearch && matchesRole
  })

  // ── Actions ────────────────────────────────────────────────────────────────

  const addProcessing    = (id: string) => setProcessing(p => { const s = new Set(p); s.add(id);    return s })
  const removeProcessing = (id: string) => setProcessing(p => { const s = new Set(p); s.delete(id); return s })

  function openConfirm(u: UserWithStats, action: 'promote' | 'demote', targetRole: string) {
    const isCritical = targetRole === 'super_admin' || u.role === 'super_admin'
    const isWarning  = action === 'demote' && !isCritical
    setConfirm({
      userId:      u.id,
      userName:    displayName(u),
      currentRole: u.role,
      action,
      targetRole,
      level: isCritical ? 'critical' : isWarning ? 'warning' : 'normal',
    })
    setOpenMenuId(null)
  }

  async function executeAction() {
    if (!confirm) return
    const { userId, action, targetRole } = confirm
    addProcessing(userId)
    setError(null)
    setConfirm(null)

    try {
      const res  = await fetch(`/api/users/${userId}/${action}`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ targetRole }),
      })
      const body = await res.json()
      if (!res.ok) {
        setError(body.error ?? `${action} failed`)
        return
      }
      // Update local state
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: targetRole } : u))
    } catch {
      setError('Network error. Please try again.')
    } finally {
      removeProcessing(userId)
    }
  }

  // ── Actions available per user ─────────────────────────────────────────────

  function getActions(u: UserWithStats) {
    const actions: { label: string; action: 'promote' | 'demote'; targetRole: string }[] = []
    const idx = ROLE_ORDER.indexOf(u.role)
    if (idx === -1) return actions

    if (isAdmin) {
      // Promote contributor → editor (admin+)
      if (u.role === 'contributor') {
        actions.push({ label: 'Promote to Editor', action: 'promote', targetRole: 'editor' })
      }
    }

    if (isSuperAdmin) {
      // Promote editor → admin
      if (u.role === 'editor') {
        actions.push({ label: 'Promote to Admin', action: 'promote', targetRole: 'admin' })
      }
      // Promote admin → super_admin
      if (u.role === 'admin') {
        actions.push({ label: 'Make Super Admin', action: 'promote', targetRole: 'super_admin' })
      }

      // Demotion (super_admin only; cannot demote self)
      if (u.id !== currentUserId) {
        if (u.role === 'super_admin') {
          actions.push({ label: 'Remove Super Admin', action: 'demote', targetRole: 'admin' })
        }
        if (u.role === 'admin') {
          actions.push({ label: 'Demote to Editor', action: 'demote', targetRole: 'editor' })
        }
        if (u.role === 'editor') {
          actions.push({ label: 'Demote to Contributor', action: 'demote', targetRole: 'contributor' })
        }
      }
    }

    return actions
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* Nav */}
      <nav className="bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-700 sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
              Philadelphia Historical Synagogues
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">Home</Link>
              <Link href="/admin" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">Dashboard</Link>
              <NavAuth />
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-6xl">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link
            href="/admin"
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
            aria-label="Back to dashboard"
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Users</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              {users.length} account{users.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-4 flex items-start gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="flex-1">{error}</span>
            <button onClick={() => setError(null)} className="flex-shrink-0 hover:opacity-70">✕</button>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          {/* Search */}
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <input
              type="text"
              placeholder="Search by name or email…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Clear search"
              >
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>

          {/* Role filter */}
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="all">All roles</option>
            <option value="contributor">Contributor</option>
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
            <option value="super_admin">Super Admin</option>
          </select>
        </div>

        {/* Table */}
        {filteredUsers.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl">
            <p className="font-semibold text-gray-700 dark:text-gray-300">No users found</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              {search || roleFilter !== 'all' ? 'Try adjusting your filters.' : 'No accounts have been created yet.'}
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">User</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Role</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Proposals</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Photos</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Last Login</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Joined</th>
                    <th className="px-4 py-3" aria-label="Actions" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800" ref={menuRef}>
                  {filteredUsers.map(u => {
                    const badge   = ROLE_BADGE[u.role] ?? ROLE_BADGE.contributor
                    const actions = getActions(u)
                    const isSelf  = u.id === currentUserId
                    const busy    = processing.has(u.id)

                    return (
                      <tr
                        key={u.id}
                        className={`hover:bg-gray-50 dark:hover:bg-gray-800/40 transition ${busy ? 'opacity-60' : ''}`}
                      >
                        {/* Name / Email */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase select-none">
                              {(u.full_name || u.email || '?')[0]}
                            </div>
                            <div className="min-w-0">
                              {u.full_name && (
                                <p className="font-medium text-gray-900 dark:text-white truncate">
                                  {u.full_name}
                                  {isSelf && (
                                    <span className="ml-1.5 text-xs text-gray-400 dark:text-gray-500 font-normal">(you)</span>
                                  )}
                                </p>
                              )}
                              <p className="text-gray-500 dark:text-gray-400 truncate text-xs">
                                {u.email || <span className="italic">no email</span>}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Role badge */}
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${badge.className}`}>
                            {badge.label}
                          </span>
                        </td>

                        {/* Proposal stats */}
                        <td className="px-4 py-3">
                          {u.total_proposals === 0 ? (
                            <span className="text-gray-400 dark:text-gray-600">—</span>
                          ) : (
                            <span className="font-mono text-xs">
                              <span className="text-green-600 dark:text-green-400">{u.approved_proposals}</span>
                              <span className="text-gray-400 dark:text-gray-600">/{u.total_proposals}</span>
                            </span>
                          )}
                        </td>

                        {/* Photo stats */}
                        <td className="px-4 py-3">
                          {u.total_photos === 0 ? (
                            <span className="text-gray-400 dark:text-gray-600">—</span>
                          ) : (
                            <span className="font-mono text-xs">
                              <span className="text-green-600 dark:text-green-400">{u.approved_photos}</span>
                              <span className="text-gray-400 dark:text-gray-600">/{u.total_photos}</span>
                            </span>
                          )}
                        </td>

                        {/* Last login */}
                        <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          {formatDate(u.last_login)}
                        </td>

                        {/* Joined */}
                        <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          {formatDate(u.created_at)}
                        </td>

                        {/* Actions dropdown */}
                        <td className="px-4 py-3 text-right relative">
                          {busy ? (
                            <svg className="w-4 h-4 animate-spin text-gray-400 mx-auto" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                          ) : actions.length > 0 ? (
                            <div className="relative inline-block text-left">
                              <button
                                onClick={() => setOpenMenuId(openMenuId === u.id ? null : u.id)}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                aria-label="User actions"
                              >
                                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                </svg>
                              </button>

                              {openMenuId === u.id && (
                                <div className="absolute right-0 mt-1 w-52 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-10 py-1 overflow-hidden">
                                  {actions.map(a => (
                                    <button
                                      key={a.targetRole}
                                      onClick={() => openConfirm(u, a.action, a.targetRole)}
                                      className={`w-full text-left px-4 py-2.5 text-sm transition ${
                                        a.action === 'demote'
                                          ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                                      }`}
                                    >
                                      {a.label}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : null}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation dialog */}
      {confirm && (
        <ConfirmModal
          dialog={confirm}
          onConfirm={executeAction}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  )
}

// ── Confirmation modal ──────────────────────────────────────────────────────────

function ConfirmModal({
  dialog,
  onConfirm,
  onCancel,
}: {
  dialog: ConfirmDialog
  onConfirm: () => void
  onCancel: () => void
}) {
  const { userName, currentRole, action, targetRole, level } = dialog
  const targetLabel  = ROLE_LABELS[targetRole]  ?? targetRole
  const currentLabel = ROLE_LABELS[currentRole] ?? currentRole

  const title = action === 'promote'
    ? `Promote to ${targetLabel}`
    : targetRole === 'admin' ? 'Remove Super Admin' : `Demote to ${targetLabel}`

  const body = level === 'critical'
    ? action === 'promote'
      ? `CRITICAL: This will give ${userName} full Super Admin access, including the ability to demote any user and change all roles.`
      : `This will remove Super Admin privileges from ${userName}. They will be demoted to Admin.`
    : action === 'promote'
    ? `${userName} will be promoted to ${targetLabel} and gain the associated permissions.`
    : `${userName} will lose ${currentLabel} privileges and be downgraded to ${targetLabel}.`

  const confirmClass =
    level === 'critical' || action === 'demote'
      ? 'bg-red-600 hover:bg-red-700 text-white'
      : 'bg-blue-600 hover:bg-blue-700 text-white'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`px-5 py-4 border-b border-gray-100 dark:border-gray-800 ${
          level === 'critical' ? 'bg-red-50 dark:bg-red-900/20' :
          level === 'warning'  ? 'bg-amber-50 dark:bg-amber-900/20' : ''
        }`}>
          <div className="flex items-center gap-3">
            {level === 'critical' && (
              <svg className="w-5 h-5 flex-shrink-0 text-red-600 dark:text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
            {level === 'warning' && (
              <svg className="w-5 h-5 flex-shrink-0 text-amber-600 dark:text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
            <h2 className="font-semibold text-gray-900 dark:text-white">{title}</h2>
          </div>
        </div>

        {/* Body */}
        <div className="px-5 py-4">
          <p className="text-sm text-gray-700 dark:text-gray-300">{body}</p>
        </div>

        {/* Footer */}
        <div className="px-5 pb-5 flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${confirmClass}`}
          >
            {title}
          </button>
        </div>
      </div>
    </div>
  )
}
