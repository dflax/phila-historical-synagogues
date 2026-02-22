'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

interface Address {
  id: string;
  street_address: string | null;
  neighborhood: string | null;
  city: string | null;
  state: string | null;
  latitude: number;
  longitude: number;
  geocode_quality: string | null;
  start_year: number | null;
  end_year: number | null;
  is_current: boolean | null;
  address_order: number | null;
}

interface Synagogue {
  id: string;
  name: string;
  status: string | null;
  founded_year: number | null;
  closed_year: number | null;
  addresses: Address[];
}

interface MapClientProps {
  synagogues: Synagogue[];
}

const STATUS_COLORS: Record<string, string> = {
  active: '#22c55e',    // green
  closed: '#ef4444',   // red
  merged: '#f59e0b',   // amber
  unknown: '#6b7280',  // gray
};

const STATUS_BORDER_COLORS: Record<string, string> = {
  active: '#15803d',   // dark green
  closed: '#991b1b',   // dark red
  merged: '#92400e',   // dark amber
  unknown: '#1f2937',  // dark gray
};



function MapClientInner({ synagogues }: MapClientProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [yearFilter, setYearFilter] = useState<number>(2024);
  const [visibleCount, setVisibleCount] = useState(0);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const searchParams = useSearchParams();
  const focusLat = searchParams ? parseFloat(searchParams.get('lat') || '') : NaN;
  const focusLng = searchParams ? parseFloat(searchParams.get('lng') || '') : NaN;
  const focusId  = searchParams ? (searchParams.get('id') || null) : null;
  const hasFocus = !isNaN(focusLat) && !isNaN(focusLng);

  useEffect(() => {
    if (!apiKey) {
      setLoadError('Google Maps API key is missing. Check NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable.');
      return;
    }

    // If already loaded (e.g. hot reload), initialize immediately
    if (window.google?.maps) {
      setIsLoaded(true);
      return;
    }

    // Check if script already being added
    if (document.getElementById('google-maps-script')) {
      // Wait for it to load
      const checkLoaded = setInterval(() => {
        if (window.google?.maps) {
          setIsLoaded(true);
          clearInterval(checkLoaded);
        }
      }, 100);
      return () => clearInterval(checkLoaded);
    }

    // Load the script
    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker`;
    script.async = true;
    script.defer = true;

    script.onload = () => setIsLoaded(true);
    script.onerror = () => setLoadError('Failed to load Google Maps script. Check your API key and network connection.');

    document.head.appendChild(script);

    return () => {
      // Don't remove the script on unmount - causes issues with remounting
    };
  }, [apiKey]);

  // Initialize map once loaded
  useEffect(() => {
    if (!isLoaded || !mapRef.current || mapInstanceRef.current) return;

    mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
      center: hasFocus ? { lat: focusLat, lng: focusLng } : { lat: 39.9526, lng: -75.1652 },
      zoom: hasFocus ? 16 : 12, // zoom 16 ≈ 1 mile wide
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
    });

    infoWindowRef.current = new window.google.maps.InfoWindow();
  }, [isLoaded]);

  // Update markers when map is ready or year filter changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];

    const filtered = synagogues.filter(s => {
      const addr = s.addresses?.[0];
      if (!addr) return false;
      const founded = s.founded_year ?? 0;
      const closed = s.closed_year ?? 9999;
      return founded <= yearFilter && closed >= yearFilter;
    });

    filtered.forEach(s => {
      const addr = s.addresses?.[0];
      if (!addr) return;

      const status = s.status ?? 'unknown';
      const color = STATUS_COLORS[status] ?? STATUS_COLORS.unknown;
      const borderColor = STATUS_BORDER_COLORS[status] ?? STATUS_BORDER_COLORS.unknown;
      const isFocused = focusId ? s.id === focusId : false;

      const marker = new window.google.maps.Marker({
        position: { lat: addr.latitude, lng: addr.longitude },
        map: mapInstanceRef.current!,
        title: s.name,
        icon: isFocused ? {
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">` +
            `<circle cx="24" cy="24" r="22" fill="#facc15" stroke="#92400e" stroke-width="3"/>` +
            `<text x="24" y="24" font-size="20" text-anchor="middle" dominant-baseline="central" font-family="sans-serif">✡️</text>` +
            `</svg>`
          )}`,
          scaledSize: new window.google.maps.Size(48, 48),
          anchor: new window.google.maps.Point(24, 24),
        } : {
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">` +
            `<circle cx="16" cy="16" r="14" fill="${color}" stroke="${borderColor}" stroke-width="3"/>` +
            `<text x="16" y="16" font-size="11" text-anchor="middle" dominant-baseline="central" font-family="sans-serif">✡️</text>` +
            `</svg>`
          )}`,
          scaledSize: new window.google.maps.Size(32, 32),
          anchor: new window.google.maps.Point(16, 16),
        },
        zIndex: isFocused ? 9999 : 1,
        animation: isFocused ? window.google.maps.Animation.BOUNCE : undefined,
      });

      const infoContent = `
        <div style="max-width:220px;font-family:sans-serif;">
          <h3 style="margin:0 0 4px;font-size:14px;font-weight:600;">${s.name}</h3>
          ${addr.street_address ? `<p style="margin:0 0 4px;font-size:12px;color:#555;">${addr.street_address}</p>` : ''}
          <p style="margin:0;font-size:12px;">
            ${s.founded_year ? `Founded: ${s.founded_year}` : ''}
            ${s.founded_year && s.closed_year ? ' · ' : ''}
            ${s.closed_year ? `Closed: ${s.closed_year}` : ''}
          </p>
          ${addr.neighborhood ? `<p style="margin:4px 0 0;font-size:12px;color:#777;">${addr.neighborhood}</p>` : ''}
          <p style="margin:4px 0 0;font-size:11px;">
            <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${color};margin-right:4px;vertical-align:middle;"></span>
            ${status.charAt(0).toUpperCase() + status.slice(1)}
          </p>
        </div>
      `;

      marker.addListener('click', () => {
        infoWindowRef.current?.setContent(infoContent);
        infoWindowRef.current?.open(mapInstanceRef.current!, marker);
      });

      // Auto-open info window for focused marker, stop bouncing after 3s
      if (isFocused) {
        infoWindowRef.current?.setContent(infoContent);
        infoWindowRef.current?.open(mapInstanceRef.current!, marker);
        setTimeout(() => marker.setAnimation(null), 3000);
      }

      markersRef.current.push(marker);
    });

    setVisibleCount(filtered.length);
  }, [isLoaded, synagogues, yearFilter]);

  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-red-50 rounded-lg p-8 text-center">
        <div className="text-red-500 text-xl mb-2">⚠️ Map Error</div>
        <p className="text-red-700 text-sm max-w-md">{loadError}</p>
        <p className="text-gray-500 text-xs mt-4">
          API Key present: {apiKey ? 'Yes (' + apiKey.substring(0, 8) + '...)' : 'No'}
        </p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-50 rounded-lg">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-3"></div>
        <p className="text-gray-500 text-sm">Loading map...</p>
        <p className="text-gray-400 text-xs mt-2">
          API Key: {apiKey ? apiKey.substring(0, 10) + '...' : 'MISSING'}
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* Map container */}
      <div ref={mapRef} className="w-full h-full rounded-lg" />

      {/* Year filter */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg px-4 py-3 z-10 min-w-[300px]">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-medium text-gray-600">Year: {yearFilter}</span>
          <span className="text-xs text-gray-400">{visibleCount} synagogues</span>
        </div>
        <input
          type="range"
          min={1745}
          max={2024}
          value={yearFilter}
          onChange={e => setYearFilter(Number(e.target.value))}
          className="w-full accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>1745</span>
          <span>2024</span>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md px-3 py-2 z-10 text-xs">
        <p className="font-semibold text-gray-700 mb-1">Status</p>
        {Object.entries(STATUS_COLORS).map(([status, color]) => (
          <div key={status} className="flex items-center gap-2 mb-1">
            <span style={{ background: color }} className="inline-block w-3 h-3 rounded-full" />
            <span className="capitalize text-gray-600">{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MapClient({ synagogues }: MapClientProps) {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center h-full bg-gray-50 rounded-lg">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-3"></div>
        <p className="text-gray-500 text-sm">Loading map...</p>
      </div>
    }>
      <MapClientInner synagogues={synagogues} />
    </Suspense>
  );
}
