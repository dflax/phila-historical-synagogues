import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  const { data: synagogue } = await supabase
    .from('synagogues')
    .select('id, name, status, founded_year, closed_year')
    .eq('id', params.id)
    .eq('approved', true)
    .or('deleted.is.null,deleted.eq.false')
    .maybeSingle()

  if (!synagogue) {
    return NextResponse.json({ error: 'Synagogue not found' }, { status: 404 })
  }

  // Primary address (for neighbourhood display)
  const { data: primaryAddr } = await supabase
    .from('addresses')
    .select('neighborhood')
    .eq('synagogue_id', params.id)
    .order('address_order', { ascending: true })
    .limit(1)
    .maybeSingle()

  const { count: addressesCount } = await supabase
    .from('addresses')
    .select('*', { count: 'exact', head: true })
    .eq('synagogue_id', params.id)

  const { count: rabbisCount } = await supabase
    .from('rabbis')
    .select('*', { count: 'exact', head: true })
    .eq('synagogue_id', params.id)
    .or('deleted.is.null,deleted.eq.false')

  const { count: historyCount } = await supabase
    .from('history_entries')
    .select('*', { count: 'exact', head: true })
    .eq('synagogue_id', params.id)
    .eq('approved', true)

  const { count: photosCount } = await supabase
    .from('images')
    .select('*', { count: 'exact', head: true })
    .eq('synagogue_id', params.id)
    .eq('approved', true)

  return NextResponse.json({
    synagogue: {
      ...synagogue,
      neighborhood: primaryAddr?.neighborhood ?? null,
    },
    addresses_count: addressesCount ?? 0,
    rabbis_count:    rabbisCount    ?? 0,
    history_count:   historyCount   ?? 0,
    photos_count:    photosCount    ?? 0,
  })
}
