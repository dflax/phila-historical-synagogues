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

function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\b(rabbi|rev|dr|mr|mrs|ms|jr|sr|iii|ii)\b\.?/g, '')
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

  // Fetch the current rabbi's data
  const { data: current } = await supabase
    .from('rabbi_profiles')
    .select(`
      id, canonical_name, birth_year, death_year, seminary, denomination,
      rabbis!rabbi_profile_id (synagogue_id)
    `)
    .eq('id', params.id)
    .eq('approved', true)
    .or('deleted.is.null,deleted.eq.false')
    .maybeSingle()

  if (!current) {
    return NextResponse.json({ error: 'Rabbi not found' }, { status: 404 })
  }

  const currentSynIds = new Set(
    (current.rabbis as { synagogue_id: string }[] ?? []).map(r => r.synagogue_id),
  )

  // Fetch all other approved, non-deleted rabbi profiles
  const { data: others } = await supabase
    .from('rabbi_profiles')
    .select(`
      id, canonical_name, birth_year, death_year, slug,
      seminary, denomination,
      rabbis!rabbi_profile_id (synagogue_id)
    `)
    .neq('id', params.id)
    .eq('approved', true)
    .or('deleted.is.null,deleted.eq.false')

  if (!others?.length) {
    return NextResponse.json({ suggestions: [] })
  }

  // Score each candidate
  const scored = others.map(rabbi => {
    let score = 0
    const reasons: string[] = []

    const nameResult = scoreNames(current.canonical_name, rabbi.canonical_name)
    score += nameResult.score
    reasons.push(...nameResult.reasons)

    // Shared synagogue affiliations
    const othSynIds = (rabbi.rabbis as { synagogue_id: string }[] ?? []).map(r => r.synagogue_id)
    const sharedCount = othSynIds.filter(id => currentSynIds.has(id)).length
    if (sharedCount > 0) {
      score += sharedCount * 20
      reasons.push(`Shared ${sharedCount} synagogue${sharedCount > 1 ? 's' : ''}`)
    }

    // Birth year within ±2
    if (current.birth_year && rabbi.birth_year) {
      if (Math.abs(current.birth_year - rabbi.birth_year) <= 2) {
        score += 10
        reasons.push('Birth year match')
      }
    }

    // Death year within ±2
    if (current.death_year && rabbi.death_year) {
      if (Math.abs(current.death_year - rabbi.death_year) <= 2) {
        score += 10
        reasons.push('Death year match')
      }
    }

    // Same seminary
    if (
      current.seminary && rabbi.seminary &&
      current.seminary.toLowerCase() === rabbi.seminary.toLowerCase()
    ) {
      score += 15
      reasons.push('Same seminary')
    }

    // Same denomination
    if (current.denomination && rabbi.denomination && current.denomination === rabbi.denomination) {
      score += 10
      reasons.push('Same denomination')
    }

    return {
      id:               rabbi.id,
      canonical_name:   rabbi.canonical_name,
      birth_year:       rabbi.birth_year,
      death_year:       rabbi.death_year,
      slug:             rabbi.slug,
      similarity_score: score,
      match_reasons:    reasons,
    }
  })

  const suggestions = scored
    .filter(r => r.similarity_score > 0)
    .sort((a, b) => b.similarity_score - a.similarity_score)
    .slice(0, 10)

  return NextResponse.json({ suggestions })
}
