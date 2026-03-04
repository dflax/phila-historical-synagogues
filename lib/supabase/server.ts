import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

/**
 * Auth-aware Supabase client for server components.
 * Reads the session cookie set by middleware, so supabase.auth.getUser()
 * returns the currently logged-in user.
 *
 * Usage in any server component or server action:
 *   const supabase = createServerSupabase()
 *   const { data: { user } } = await supabase.auth.getUser()
 */
export function createServerSupabase() {
  return createServerComponentClient({ cookies })
}

/**
 * Fetch the current user's profile from user_profiles, or null if not signed in.
 * Roles: contributor | editor | admin | super_admin
 */
export async function getCurrentUserProfile() {
  const supabase = createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return data
}
