/**
 * Server-side geocoding utilities.
 *
 * Uses the Google Geocoding API (same key as the Maps JS API).
 * All functions return null on any failure — callers should treat neighborhood
 * as optional and continue without it.
 */

const GEOCODING_URL = 'https://maps.googleapis.com/maps/api/geocode/json'

/**
 * Given a lat/lng pair, return the neighborhood name (or null).
 * Used by the backfill script for addresses that already have coordinates.
 */
export async function getNeighborhoodFromCoordinates(
  lat: number,
  lng: number,
): Promise<string | null> {
  try {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    if (!key) {
      console.error('[geocoding] NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set')
      return null
    }

    const res  = await fetch(`${GEOCODING_URL}?latlng=${lat},${lng}&key=${key}`)
    const data = await res.json()

    if (data.status !== 'OK' || !data.results?.[0]) return null

    return extractNeighborhood(data.results[0].address_components)
  } catch (err) {
    console.error('[geocoding] getNeighborhoodFromCoordinates error:', err)
    return null
  }
}

/**
 * Given a street address string, return the neighborhood name (or null).
 * Used by the approve route when an address_new proposal is approved without
 * a neighborhood already filled in.
 */
export async function getNeighborhoodFromAddress(
  streetAddress: string,
  city = 'Philadelphia',
  state = 'PA',
): Promise<string | null> {
  const result = await geocodeAddress(streetAddress, city, state)
  return result?.neighborhood ?? null
}

/**
 * Given a street address, return lat/lng coordinates and neighborhood in one
 * API call. Returns null on any failure — callers should treat all fields as
 * optional and continue without them.
 */
export async function geocodeAddress(
  streetAddress: string,
  city = 'Philadelphia',
  state = 'PA',
): Promise<{ lat: number; lng: number; neighborhood: string | null } | null> {
  try {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    if (!key) {
      console.error('[geocoding] NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set')
      return null
    }

    const query = encodeURIComponent(`${streetAddress}, ${city}, ${state}`)
    const res   = await fetch(`${GEOCODING_URL}?address=${query}&key=${key}`)
    const data  = await res.json()

    if (data.status !== 'OK' || !data.results?.[0]) return null

    const location = data.results[0].geometry?.location
    if (!location) return null

    return {
      lat:          location.lat,
      lng:          location.lng,
      neighborhood: extractNeighborhood(data.results[0].address_components),
    }
  } catch (err) {
    console.error('[geocoding] geocodeAddress error:', err)
    return null
  }
}

/**
 * Pull the neighborhood / sublocality name out of a Google address_components
 * array. Returns null if neither component type is present.
 */
function extractNeighborhood(
  components: Array<{ types: string[]; long_name: string }> | undefined,
): string | null {
  if (!components) return null

  const match = components.find(c =>
    c.types.includes('neighborhood') ||
    c.types.includes('sublocality_level_1') ||
    c.types.includes('sublocality'),
  )

  return match?.long_name ?? null
}
