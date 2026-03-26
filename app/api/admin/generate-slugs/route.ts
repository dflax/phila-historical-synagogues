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

  // Get service role client for admin operations
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  try {
    const body = await request.json()
    const personId = body.person_id as string | undefined

    // Find clergy without slugs
    let query = supabaseAdmin
      .from('person_profiles')
      .select('id, canonical_name, person_type, slug')
      .in('person_type', ['rabbi', 'chazzan'])
      .is('slug', null)

    if (personId) {
      query = query.eq('id', personId)
    }

    const { data: clergyWithoutSlugs, error: fetchError } = await query

    if (fetchError) throw fetchError

    if (!clergyWithoutSlugs || clergyWithoutSlugs.length === 0) {
      return NextResponse.json({
        message: 'No clergy without slugs found',
        updated: 0,
      })
    }

    // Generate and update slugs
    const updates = []
    for (const person of clergyWithoutSlugs) {
      const baseName = person.canonical_name
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()

      let newSlug = baseName
      let counter = 1

      // Ensure uniqueness
      while (true) {
        const { data: existing } = await supabaseAdmin
          .from('person_profiles')
          .select('id')
          .eq('slug', newSlug)
          .neq('id', person.id)
          .maybeSingle()

        if (!existing) break
        newSlug = `${baseName}-${counter}`
        counter++
      }

      // Update both tables
      await Promise.all([
        supabaseAdmin
          .from('rabbi_profiles')
          .update({ slug: newSlug })
          .eq('id', person.id),
        supabaseAdmin
          .from('person_profiles')
          .update({ slug: newSlug })
          .eq('id', person.id),
      ])

      updates.push({
        id: person.id,
        name: person.canonical_name,
        slug: newSlug,
      })
    }

    return NextResponse.json({
      message: `Generated slugs for ${updates.length} clergy`,
      updated: updates.length,
      slugs: updates,
    })
  } catch (error: any) {
    console.error('Error generating slugs:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate slugs' },
      { status: 500 }
    )
  }
}
