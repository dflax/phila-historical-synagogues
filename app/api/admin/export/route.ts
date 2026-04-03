import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import ExcelJS from 'exceljs'

const EDITOR_ROLES = ['editor', 'admin', 'super_admin']

export async function GET(req: NextRequest) {
  // ── 1. Auth ───────────────────────────────────────────────────────────────
  const supabase = createRouteHandlerClient({ cookies })
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // ── 2. Role check ─────────────────────────────────────────────────────────
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle()

  if (!profile || !EDITOR_ROLES.includes(profile.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // ── 3. Parse requested types ──────────────────────────────────────────────
  const typesParam = req.nextUrl.searchParams.get('types') ?? ''
  const requested = new Set(
    typesParam.split(',').map(t => t.trim()).filter(Boolean)
  )

  const validTypes = new Set(['synagogues', 'addresses', 'clergy'])
  for (const t of requested) {
    if (!validTypes.has(t)) {
      return NextResponse.json({ error: `Unknown export type: ${t}` }, { status: 400 })
    }
  }

  if (requested.size === 0) {
    return NextResponse.json({ error: 'No export types specified' }, { status: 400 })
  }

  // Service-role client to bypass RLS for full data read
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  try {
    const workbook = new ExcelJS.Workbook()
    workbook.creator = 'Philadelphia Historical Synagogues'
    workbook.created = new Date()

    // ── Synagogues sheet ────────────────────────────────────────────────────
    if (requested.has('synagogues')) {
      const { data: synagogues, error } = await supabaseAdmin
        .from('synagogues')
        .select('id, name, status, founded_year, founded_text, closed_year, closed_text, approved')
        .eq('approved', true)
        .order('name')

      if (error) {
        console.error('Export: synagogues query error', error)
        throw new Error('Failed to query synagogues')
      }

      const sheet = workbook.addWorksheet('Synagogues')

      sheet.columns = [
        { header: 'id',           key: 'id',           width: 38 },
        { header: 'name',         key: 'name',         width: 50 },
        { header: 'status',       key: 'status',       width: 12 },
        { header: 'founded_year', key: 'founded_year', width: 14 },
        { header: 'founded_text', key: 'founded_text', width: 30 },
        { header: 'closed_year',  key: 'closed_year',  width: 13 },
        { header: 'closed_text',  key: 'closed_text',  width: 30 },
        { header: 'approved',     key: 'approved',     width: 10 },
      ]

      applyHeaderStyle(sheet)

      for (const row of synagogues ?? []) {
        sheet.addRow({
          id:           row.id,
          name:         row.name,
          status:       row.status,
          founded_year: row.founded_year,
          founded_text: row.founded_text,
          closed_year:  row.closed_year,
          closed_text:  row.closed_text,
          approved:     row.approved,
        })
      }
    }

    // ── Addresses sheet ─────────────────────────────────────────────────────
    if (requested.has('addresses')) {
      // Fetch addresses joined to synagogue names; filter to approved synagogues
      const { data: addresses, error } = await supabaseAdmin
        .from('addresses')
        .select(`
          id,
          synagogue_id,
          street_address,
          neighborhood,
          city,
          state,
          zip_code,
          latitude,
          longitude,
          is_current,
          start_year,
          end_year,
          geocode_quality,
          address_order,
          synagogues!inner ( name, approved )
        `)
        .eq('synagogues.approved', true)
        .order('address_order')

      if (error) {
        console.error('Export: addresses query error', error)
        throw new Error('Failed to query addresses')
      }

      const sheet = workbook.addWorksheet('Addresses')

      sheet.columns = [
        { header: 'id',             key: 'id',             width: 38 },
        { header: 'synagogue_id',   key: 'synagogue_id',   width: 38 },
        { header: 'synagogue_name', key: 'synagogue_name', width: 50 },
        { header: 'street_address', key: 'street_address', width: 40 },
        { header: 'neighborhood',   key: 'neighborhood',   width: 22 },
        { header: 'city',           key: 'city',           width: 18 },
        { header: 'state',          key: 'state',          width: 8  },
        { header: 'zip_code',       key: 'zip_code',       width: 10 },
        { header: 'latitude',       key: 'latitude',       width: 14 },
        { header: 'longitude',      key: 'longitude',      width: 14 },
        { header: 'is_current',     key: 'is_current',     width: 11 },
        { header: 'start_year',     key: 'start_year',     width: 12 },
        { header: 'end_year',       key: 'end_year',       width: 12 },
        { header: 'geocode_quality',key: 'geocode_quality',width: 18 },
      ]

      applyHeaderStyle(sheet)

      // Sort by synagogue name then address_order in-memory (join doesn't order by joined col)
      const sorted = (addresses ?? []).slice().sort((a, b) => {
        const synA = (a.synagogues as unknown as { name: string } | null)?.name ?? ''
        const synB = (b.synagogues as unknown as { name: string } | null)?.name ?? ''
        if (synA < synB) return -1
        if (synA > synB) return 1
        return (a.address_order ?? 0) - (b.address_order ?? 0)
      })

      for (const row of sorted) {
        const syn = row.synagogues as unknown as { name: string } | null
        sheet.addRow({
          id:             row.id,
          synagogue_id:   row.synagogue_id,
          synagogue_name: syn?.name ?? '',
          street_address: row.street_address,
          neighborhood:   row.neighborhood,
          city:           row.city,
          state:          row.state,
          zip_code:       row.zip_code,
          latitude:       row.latitude,
          longitude:      row.longitude,
          is_current:     row.is_current,
          start_year:     row.start_year,
          end_year:       row.end_year,
          geocode_quality:row.geocode_quality,
        })
      }
    }

    // ── Clergy sheet ────────────────────────────────────────────────────────
    if (requested.has('clergy')) {
      // Fetch all approved, non-deleted clergy profiles
      const { data: profiles, error: profilesError } = await supabaseAdmin
        .from('person_profiles')
        .select('id, canonical_name, person_type, birth_year, death_year, denomination, seminary, ordination_year, approved')
        .in('person_type', ['rabbi', 'chazzan'])
        .eq('approved', true)
        .or('deleted.is.null,deleted.eq.false')
        .order('canonical_name')

      if (profilesError) {
        console.error('Export: person_profiles query error', profilesError)
        throw new Error('Failed to query clergy profiles')
      }

      // Fetch all approved affiliations with synagogue names in a single query
      const { data: allAffiliations, error: affiliationsError } = await supabaseAdmin
        .from('affiliations')
        .select(`
          person_profile_id,
          role_title,
          start_year,
          end_year,
          synagogues ( name )
        `)
        .eq('approved', true)
        .order('start_year', { ascending: true, nullsFirst: false })

      if (affiliationsError) {
        console.error('Export: affiliations query error', affiliationsError)
        throw new Error('Failed to query affiliations')
      }

      // Build a map of person_profile_id → formatted affiliations string
      const affiliationsByPerson = new Map<string, string[]>()
      for (const aff of allAffiliations ?? []) {
        const pid = aff.person_profile_id as string
        if (!pid) continue

        const syn = aff.synagogues as unknown as { name: string } | null
        const synName = syn?.name ?? 'Unknown Synagogue'
        const role = (aff.role_title as string | null) ?? 'Clergy'
        const start = (aff.start_year as number | null) != null ? String(aff.start_year) : '?'
        const end   = (aff.end_year   as number | null) != null ? String(aff.end_year)   : 'present'
        const entry = `${synName} (${role}, ${start}–${end})`

        if (!affiliationsByPerson.has(pid)) affiliationsByPerson.set(pid, [])
        affiliationsByPerson.get(pid)!.push(entry)
      }

      const sheet = workbook.addWorksheet('Clergy')

      sheet.columns = [
        { header: 'id',              key: 'id',              width: 38 },
        { header: 'canonical_name',  key: 'canonical_name',  width: 40 },
        { header: 'person_type',     key: 'person_type',     width: 12 },
        { header: 'birth_year',      key: 'birth_year',      width: 12 },
        { header: 'death_year',      key: 'death_year',      width: 12 },
        { header: 'denomination',    key: 'denomination',    width: 22 },
        { header: 'seminary',        key: 'seminary',        width: 30 },
        { header: 'ordination_year', key: 'ordination_year', width: 16 },
        { header: 'approved',        key: 'approved',        width: 10 },
        { header: 'affiliations',    key: 'affiliations',    width: 80 },
      ]

      applyHeaderStyle(sheet)

      for (const person of profiles ?? []) {
        const affiliations = affiliationsByPerson.get(person.id as string) ?? []
        sheet.addRow({
          id:              person.id,
          canonical_name:  person.canonical_name,
          person_type:     person.person_type,
          birth_year:      person.birth_year,
          death_year:      person.death_year,
          denomination:    person.denomination,
          seminary:        person.seminary,
          ordination_year: person.ordination_year,
          approved:        person.approved,
          affiliations:    affiliations.join('; '),
        })
      }
    }

    // ── Serialize workbook ──────────────────────────────────────────────────
    const buffer = await workbook.xlsx.writeBuffer()

    const dateStr = new Date().toISOString().slice(0, 10)
    const filename = `phila-synagogues-export-${dateStr}.xlsx`

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    console.error('Export route error:', err)
    const message = err instanceof Error ? err.message : 'Export generation failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function applyHeaderStyle(sheet: ExcelJS.Worksheet) {
  const headerRow = sheet.getRow(1)

  // Bold + light blue fill on header cells
  headerRow.eachCell(cell => {
    cell.font = { bold: true }
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFD0E4FF' },
    }
    cell.border = {
      bottom: { style: 'thin', color: { argb: 'FF93BFEF' } },
    }
  })

  // Freeze header row
  sheet.views = [{ state: 'frozen', ySplit: 1 }]

  // Auto-filter on all columns
  sheet.autoFilter = {
    from: { row: 1, column: 1 },
    to:   { row: 1, column: sheet.columnCount },
  }
}
