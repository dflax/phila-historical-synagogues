'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

type Address = {
  id: string
  street_address: string
  neighborhood: string | null
  latitude: number
  longitude: number
  geocode_quality: string
}

type Synagogue = {
  id: string
  name: string
  status: string
  founded_year: number | null
  closed_year: number | null
  addresses: Address[]
}

type MapClientProps = {
  synagogues: Synagogue[]
}

export default function MapClient({ synagogues }: MapClientProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const markersRef = useRef<google.maps.Marker[]>([])
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null)

  // Get year range
  const years = synagogues
    .map(s => s.founded_year)
    .filter((y): y is number => y !== null)
  const minYear = Math.min(...years, 1745)
  const maxYear = new Date().getFullYear()

  useEffect(() => {
    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
          version: 'weekly',
        })

        await loader.load()

        if (!mapRef.current) return

        // Center on Philadelphia
        const philadelphia = { lat: 39.9526, lng: -75.1652 }

        const mapInstance = new google.maps.Map(mapRef.current, {
          center: philadelphia,
          zoom: 11,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        })

        setMap(mapInstance)
        infoWindowRef.current = new google.maps.InfoWindow()
        setLoading(false)
      } catch (err) {
        setError('Failed to load Google Maps')
        setLoading(false)
        console.error(err)
      }
    }

    initMap()
  }, [])

  useEffect(() => {
    if (!map) return

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null))
    markersRef.current = []

    // Filter synagogues by selected year
    const filteredSynagogues = selectedYear
      ? synagogues.filter(syn => {
          if (!syn.founded_year) return false
          if (syn.founded_year > selectedYear) return false
          if (syn.closed_year && syn.closed_year < selectedYear) return false
          return true
        })
      : synagogues

    // Add markers for each synagogue
    filteredSynagogues.forEach(synagogue => {
      const address = synagogue.addresses[0]
      if (!address.latitude || !address.longitude) return

      // Different colors for different statuses
      const markerColor = 
        synagogue.status === 'active' ? '#22c55e' :  // green
        synagogue.status === 'closed' ? '#ef4444' :  // red
        synagogue.status === 'merged' ? '#f59e0b' :  // amber
        '#6b7280'  // gray

      const marker = new google.maps.Marker({
        position: { lat: address.latitude, lng: address.longitude },
        map: map,
        title: synagogue.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: markerColor,
          fillOpacity: 0.8,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        }
      })

      marker.addListener('click', () => {
        const content = `
          <div style="padding: 8px; max-width: 300px;">
            <h3 style="font-size: 16px; font-weight: bold; margin: 0 0 8px 0;">
              ${synagogue.name}
            </h3>
            <div style="font-size: 14px; color: #666; margin-bottom: 4px;">
              ${address.street_address}
              ${address.neighborhood ? `<br>${address.neighborhood}` : ''}
            </div>
            <div style="font-size: 12px; color: #888; margin-top: 8px;">
              <strong>Status:</strong> ${synagogue.status}
              ${synagogue.founded_year ? `<br><strong>Founded:</strong> ${synagogue.founded_year}` : ''}
              ${synagogue.closed_year ? `<br><strong>Closed:</strong> ${synagogue.closed_year}` : ''}
            </div>
            <a href="/synagogues/${synagogue.id}" 
               style="display: inline-block; margin-top: 8px; color: #2563eb; text-decoration: underline;">
              View Details →
            </a>
          </div>
        `
        infoWindowRef.current?.setContent(content)
        infoWindowRef.current?.open(map, marker)
      })

      markersRef.current.push(marker)
    })
  }, [map, synagogues, selectedYear])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  const activeCount = selectedYear
    ? synagogues.filter(syn => {
        if (!syn.founded_year) return false
        if (syn.founded_year > selectedYear) return false
        if (syn.closed_year && syn.closed_year < selectedYear) return false
        return true
      }).length
    : synagogues.length

  return (
    <div className="flex flex-col h-screen">
      {/* Header with controls */}
      <div className="bg-white border-b shadow-sm p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Philadelphia Historical Synagogues Map
              </h1>
              <p className="text-gray-600 mt-1">
                Showing {activeCount} of {synagogues.length} synagogues
                {selectedYear && ` in ${selectedYear}`}
              </p>
            </div>

            {/* Legend */}
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span>Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span>Closed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                <span>Merged</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gray-500"></div>
                <span>Unknown</span>
              </div>
            </div>
          </div>

          {/* Year filter */}
          <div className="mt-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">
                Filter by Year:
              </label>
              <input
                type="range"
                min={minYear}
                max={maxYear}
                value={selectedYear || maxYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="flex-1 max-w-md"
              />
              <span className="text-sm font-medium text-gray-900 w-16">
                {selectedYear || 'All'}
              </span>
              <button
                onClick={() => setSelectedYear(null)}
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div ref={mapRef} className="flex-1" />
    </div>
  )
}
