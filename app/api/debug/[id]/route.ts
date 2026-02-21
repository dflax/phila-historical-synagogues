import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { data, error } = await supabase
    .from('synagogues')
    .select(`
      id, name,
      history_entries ( id, entry_type, content ),
      rabbis ( id, name, start_year, end_year )
    `)
    .eq('id', params.id)
    .single()

  return NextResponse.json({ data, error })
}
