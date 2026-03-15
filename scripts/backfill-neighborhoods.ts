/**
 * Backfill neighborhood field for all addresses that have coordinates but
 * no neighborhood set.
 *
 * Run with:
 *   NEXT_PUBLIC_SUPABASE_URL=... \
 *   SUPABASE_SERVICE_ROLE_KEY=... \
 *   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=... \
 *   npx ts-node --project tsconfig.json -e "require('./scripts/backfill-neighborhoods.ts')"
 *
 * Or compile first:
 *   npx tsc scripts/backfill-neighborhoods.ts --outDir dist --esModuleInterop
 *   node dist/scripts/backfill-neighborhoods.js
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY (not the anon key) so it can bypass RLS
 * and write to addresses. Get it from the Supabase dashboard → Settings → API.
 *
 * Rate: 100ms delay between requests → ~10 req/s, well within Google's 50 req/s
 * free-tier limit.
 */

import { createClient } from '@supabase/supabase-js'
import { getNeighborhoodFromCoordinates } from '../lib/geocoding'

const supabaseUrl      = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey   = process.env.SUPABASE_SERVICE_ROLE_KEY
const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

if (!supabaseUrl || !serviceRoleKey || !googleMapsApiKey) {
  console.error(
    'Missing required env vars:\n' +
    `  NEXT_PUBLIC_SUPABASE_URL      : ${supabaseUrl     ? '✓' : '✗ MISSING'}\n` +
    `  SUPABASE_SERVICE_ROLE_KEY     : ${serviceRoleKey  ? '✓' : '✗ MISSING'}\n` +
    `  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: ${googleMapsApiKey ? '✓' : '✗ MISSING'}`,
  )
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey)

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function main() {
  console.log('Fetching addresses without neighborhoods that have coordinates…')

  const { data: addresses, error } = await supabase
    .from('addresses')
    .select('id, latitude, longitude, street_address')
    .is('neighborhood', null)
    .not('latitude',  'is', null)
    .not('longitude', 'is', null)

  if (error) {
    console.error('Failed to fetch addresses:', error.message)
    process.exit(1)
  }

  if (!addresses || addresses.length === 0) {
    console.log('No addresses to backfill — all set!')
    return
  }

  console.log(`Found ${addresses.length} addresses to process.\n`)

  let updated = 0
  let skipped = 0
  let failed  = 0

  for (const addr of addresses) {
    const lat = addr.latitude  as number
    const lng = addr.longitude as number

    const neighborhood = await getNeighborhoodFromCoordinates(lat, lng)

    if (neighborhood) {
      const { error: updateError } = await supabase
        .from('addresses')
        .update({ neighborhood })
        .eq('id', addr.id)

      if (updateError) {
        console.error(`  ✗ ${addr.id} (${addr.street_address ?? 'no street'}): ${updateError.message}`)
        failed++
      } else {
        console.log(`  ✓ ${addr.id} (${addr.street_address ?? 'no street'}): "${neighborhood}"`)
        updated++
      }
    } else {
      console.log(`  – ${addr.id} (${addr.street_address ?? 'no street'}): no neighborhood found`)
      skipped++
    }

    // 100ms between requests → ~10 req/s (Google free tier allows 50 req/s)
    await sleep(100)
  }

  console.log(`\nDone. Updated: ${updated}, Skipped: ${skipped}, Failed: ${failed}`)
}

main().catch(err => {
  console.error('Unexpected error:', err)
  process.exit(1)
})
