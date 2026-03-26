import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  const supabase = createServerSupabase()

  // Check authentication and admin role
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle()

  if (!profile || !['admin', 'super_admin'].includes(profile.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Get service role client
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  try {
    const body = await request.json()
    const idsToDelete = body.ids as string[]

    if (!idsToDelete || idsToDelete.length === 0) {
      return NextResponse.json({ error: 'No IDs provided' }, { status: 400 })
    }

    // Delete from all tables where these IDs might exist.
    // Use allSettled so a miss on one table doesn't abort the others.
    await Promise.allSettled([
      // Old tables
      supabaseAdmin.from('rabbi_profiles').delete().in('id', idsToDelete),
      supabaseAdmin.from('rabbis').delete().in('id', idsToDelete),
      supabaseAdmin.from('rabbis').delete().in('profile_id', idsToDelete),
      // New tables
      supabaseAdmin.from('person_profiles').delete().in('id', idsToDelete),
      supabaseAdmin.from('affiliations').delete().in('id', idsToDelete),
      supabaseAdmin.from('affiliations').delete().in('person_profile_id', idsToDelete),
    ])

    return NextResponse.json({
      message: `Deleted ${idsToDelete.length} test records`,
      deleted: idsToDelete.length,
      ids: idsToDelete,
    })
  } catch (error: any) {
    console.error('Error deleting test data:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete test data' },
      { status: 500 }
    )
  }
}
