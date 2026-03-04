'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

interface MiniMapProps {
  lat: number
  lng: number
  status: string
  mapUrl: string
}

const STATUS_COLORS: Record<string, string> = {
  active: '#22c55e',
  closed: '#ef4444',
  merged: '#f59e0b',
  unknown: '#6b7280',
}

const STATUS_BORDER_COLORS: Record<string, string> = {
  active: '#15803d',
  closed: '#991b1b',
  merged: '#92400e',
  unknown: '#1f2937',
}

const DARK_MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
  { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#263c3f' }] },
  { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#6b9a76' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#38414e' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#212a37' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#9ca5b3' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#746855' }] },
  { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#1f2835' }] },
  { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#f3d19c' }] },
  { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#2f3948' }] },
  { featureType: 'transit.station', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#17263c' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#515c6d' }] },
  { featureType: 'water', elementType: 'labels.text.stroke', stylers: [{ color: '#17263c' }] },
]

export default function MiniMap({ lat, lng, status, mapUrl }: MiniMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  // Load (or reuse) the Google Maps script
  useEffect(() => {
    if (!apiKey) return

    if (window.google?.maps) {
      setIsLoaded(true)
      return
    }

    if (document.getElementById('google-maps-script')) {
      const check = setInterval(() => {
        if (window.google?.maps) {
          setIsLoaded(true)
          clearInterval(check)
        }
      }, 100)
      return () => clearInterval(check)
    }

    const script = document.createElement('script')
    script.id = 'google-maps-script'
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker`
    script.async = true
    script.defer = true
    script.onload = () => setIsLoaded(true)
    document.head.appendChild(script)
  }, [apiKey])

  // Initialize map once script is ready
  useEffect(() => {
    if (!isLoaded || !mapRef.current) return

    const color = STATUS_COLORS[status] ?? STATUS_COLORS.unknown
    const borderColor = STATUS_BORDER_COLORS[status] ?? STATUS_BORDER_COLORS.unknown
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat, lng },
      zoom: 16,
      disableDefaultUI: true,
      gestureHandling: 'none',
      clickableIcons: false,
      keyboardShortcuts: false,
      styles: isDark ? DARK_MAP_STYLES : [],
    })

    new window.google.maps.Marker({
      position: { lat, lng },
      map,
      icon: {
        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">` +
          `<circle cx="16" cy="16" r="14" fill="${color}" stroke="${borderColor}" stroke-width="3"/>` +
          `<text x="16" y="16" font-size="11" text-anchor="middle" dominant-baseline="central" font-family="sans-serif">✡️</text>` +
          `</svg>`
        )}`,
        scaledSize: new window.google.maps.Size(32, 32),
        anchor: new window.google.maps.Point(16, 16),
      },
    })
  }, [isLoaded, lat, lng, status])

  return (
    <Link
      href={mapUrl}
      className="block relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 flex-shrink-0 w-52 h-40 group shadow-sm"
      title="View on map"
    >
      {/* Map renders into this div — always mounted so the ref is stable */}
      <div ref={mapRef} className="w-full h-full bg-gray-100 dark:bg-gray-800" />

      {/* Loading spinner shown until map is ready */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />
        </div>
      )}

      {/* "View on Map" bar at the bottom */}
      <div className="absolute bottom-0 inset-x-0 bg-blue-600/90 text-white text-xs font-semibold py-1.5 text-center group-hover:bg-blue-700 transition">
        🗺️ View on Map
      </div>
    </Link>
  )
}
