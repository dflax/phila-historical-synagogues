'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { User } from '@supabase/supabase-js'

type Role = 'contributor' | 'editor' | 'admin' | 'super_admin' | null

interface UserRoleData {
  role: Role
  loading: boolean
  error: Error | null
  isContributor: boolean
  isEditor: boolean
  isAdmin: boolean
  isSuperAdmin: boolean
  canEdit: boolean
}

export function useUserRole(): UserRoleData {
  const [role, setRole] = useState<Role>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    let mounted = true

    async function fetchRole() {
      try {
        setLoading(true)
        setError(null)

        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        
        if (userError) throw userError
        
        if (!user) {
          if (mounted) {
            setRole(null)
            setLoading(false)
          }
          return
        }

        // Fetch user profile with role
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('role')
          .eq('id', user.id)
          .single()

        if (profileError) throw profileError

        if (mounted) {
          setRole(profile?.role as Role || null)
          setLoading(false)
        }
      } catch (err) {
        if (mounted) {
          setError(err as Error)
          setLoading(false)
        }
      }
    }

    fetchRole()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
        fetchRole()
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [supabase])

  // Computed permission flags
  const isContributor = role === 'contributor' || role === 'editor' || role === 'admin' || role === 'super_admin'
  const isEditor = role === 'editor' || role === 'admin' || role === 'super_admin'
  const isAdmin = role === 'admin' || role === 'super_admin'
  const isSuperAdmin = role === 'super_admin'
  const canEdit = isEditor

  return {
    role,
    loading,
    error,
    isContributor,
    isEditor,
    isAdmin,
    isSuperAdmin,
    canEdit,
  }
}
