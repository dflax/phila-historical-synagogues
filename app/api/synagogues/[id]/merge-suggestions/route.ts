import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// ── Levenshtein distance (memory-optimised, single-row) ───────────────────────

function levenshtein(a: string, b: string): number {
  const la = a.length, lb = b.length
  if (la === 0) return lb
  if (lb === 0) return la
  const dp: number[] = Array.from({ length: lb + 1 }, (_, i) => i)
  for (let i = 1; i <= la; i++) {
    let prev = dp[0]
    dp[0] = i
    for (let j = 1; j <= lb; j++) {
      const temp = dp[j]
      if (a[i - 1] === b[j - 1]) dp[j] = prev
      else dp[j] = 1 + Math.min(prev, dp[j], dp[j - 1])
      prev = temp
    }
  }
  return dp[lb]
}

// ── Name normalisation ────────────────────────────────────────────────────────

// Strip common synagogue prefixes/suffixes for cleaner comparison
function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\b(congregation|synagogue|temple|shul|adas|anshe|b'nai|bnai|ohev|agudath|agudas|chevra|keneseth|shaare|shaari)\b/g, '')
    .replace(/[^a-z\s]/g, '')
    .trim()
    .replace(/\s+/g, ' ')
}

function nameWords(name: string): string[] {
  return normalizeName(name).split(' ').filter(w => w.length > 2)
}

// ── Scoring ───────────────────────────────────────────────────────────────────

function scoreNames(name1: string, name2: string): { score: number; reasons: string[] } {
  const reasons: string[] = []
  let score = 0

  const n1 = normalizeName(name1)
  const n2 = normalizeName(name2)

  if (n1 === n2) {
    score += 50
    reasons.push('Exact name match')
  } else {
    const words1 = nameWords(name1)
    const words2 = nameWords(name2)
    const shared = words1.filter(w => words2.includes(w))
    if (shared.length >= 2) {
      score += 30
      reasons.push('Similar name')
    } else if (shared.length === 1) {
      score += 10
      reasons.push('Partial name match')
    }

    const maxLen = Math.max(n1.length, n2.length)
    if (maxLen > 0 && levenshtein(n1, n2) / maxLen < 0.2) {
      score += 10
      if (!reasons.some(r => r.includes('name'))) reasons.push('Similar name spelling')
    }
  }
  return { score, reasons }
}

// ── Route ─────────────────────────────────────────────────────────────────────

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  // Fetch current synagogue with its addresses and rabbi profile IDs
  const { data: current } = await supabase
    .from('synagogues')
    .select(`
      id, name, status, founded_year,
      addresses (id, neighborhood, latitude, longitude, address_order),
      rabbis (rabbi_profile_id)
    `)
    .eq('id', params.id)
    .eq('approved', true)
    .or('deleted.is.null,deleted.eq.false')
    .maybeSingle()

  if (!current) {
    return NextResponse.json({ error: 'Synagogue not found' }, { status: 404 })
  }

  // Primary address neighbourhood + coords for the current synagogue
  const currentAddresses = (current.addresses as { id: string; neighborhood: string | null; latitude: number | null; longitude: number | null; address_order: number | null }[] ?? [])
  const primaryAddr = currentAddresses.sort((a, b) => (a.address_order ?? 99) - (b.address_order ?? 99))[0] ?? null
  const currentNeighborhood = primaryAddr?.neighborhood?.toLowerCase() ?? null
  const currentLat = primaryAddr?.latitude ?? null
  const currentLng = primaryAddr?.longitude ?? null

  // Set of rabbi_profile_ids for shared-rabbi detection
  const currentRabbiIds = new Set(
    (current.rabbis as { rabbi_profile_id: string | null }[] ?? [])
      .map(r => r.rabbi_profile_id)
      .filter((id): id is string => id !== null),
  )

  // Fetch all other approved, non-deleted synagogues
  const { data: others } = await supabase
    .from('synagogues')
    .select(`
      id, name, status, founded_year,
      addresses (id, neighborhood, latitude, longitude, address_order),
      rabbis (rabbi_profile_id)
    `)
    .neq('id', params.id)
    .eq('approved', true)
    .or('deleted.is.null,deleted.eq.false')

  if (!others?.length) {
    return NextResponse.json({ suggestions: [] })
  }

  // Score each candidate
  const scored = others.map(syn => {
    let score = 0
    const reasons: string[] = []

    // Name similarity
    const nameResult = scoreNames(current.name, syn.name)
    score += nameResult.score
    reasons.push(...nameResult.reasons)

    // Primary address comparison
    const synAddresses = (syn.addresses as { neighborhood: string | null; latitude: number | null; longitude: number | null; address_order: number | null }[] ?? [])
    const synPrimary = synAddresses.sort((a, b) => (a.address_order ?? 99) - (b.address_order ?? 99))[0] ?? null
    const synNeighborhood = synPrimary?.neighborhood?.toLowerCase() ?? null
    const synLat = synPrimary?.latitude ?? null
    const synLng = synPrimary?.longitude ?? null

    // Same neighbourhood
    if (currentNeighborhood && synNeighborhood && currentNeighborhood === synNeighborhood) {
      score += 25
      reasons.push('Same neighborhood')
    }

    // Same address (within ~100m, 0.001 degrees ≈ 111m)
    if (currentLat !== null && currentLng !== null && synLat !== null && synLng !== null) {
      if (Math.abs(currentLat - synLat) < 0.001 && Math.abs(currentLng - synLng) < 0.001) {
        score += 40
        reasons.push('Same location')
      }
    }

    // Founded year within ±5
    if (current.founded_year && syn.founded_year) {
      if (Math.abs(current.founded_year - syn.founded_year) <= 5) {
        score += 15
        reasons.push('Similar founding year')
      }
    }

    // Same status
    if (current.status && syn.status && current.status === syn.status) {
      score += 10
      reasons.push('Same status')
    }

    // Shared rabbis (by profile_id)
    const synRabbiIds = (syn.rabbis as { rabbi_profile_id: string | null }[] ?? [])
      .map(r => r.rabbi_profile_id)
      .filter((id): id is string => id !== null)
    const sharedCount = synRabbiIds.filter(id => currentRabbiIds.has(id)).length
    if (sharedCount > 0) {
      score += sharedCount * 20
      reasons.push(`Shared ${sharedCount} rabbi${sharedCount > 1 ? 's' : ''}`)
    }

    return {
      id:               syn.id,
      name:             syn.name,
      status:           syn.status,
      founded_year:     syn.founded_year,
      neighborhood:     synPrimary?.neighborhood ?? null,
      similarity_score: score,
      match_reasons:    reasons,
    }
  })

  const suggestions = scored
    .filter(s => s.similarity_score > 0)
    .sort((a, b) => b.similarity_score - a.similarity_score)
    .slice(0, 10)

  return NextResponse.json({ suggestions })
}
