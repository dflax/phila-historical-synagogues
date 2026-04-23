'use client';

import { useState, useEffect, useRef, Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface Address {
  id: string;
  street_address: string | null;
  neighborhood: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  latitude: number | null;  // null for non-geocoded addresses
  longitude: number | null; // null for non-geocoded addresses
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
  clergy: string[];
}

interface MapClientProps {
  synagogues: Synagogue[];
  minYear: number;
  maxYear: number;
}

const STATUS_COLORS: Record<string, string> = {
  active: '#22c55e',   // green
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

const STATUS_LABELS: Record<string, string> = {
  active: 'Active',
  closed: 'Closed',
  merged: 'Merged',
  unknown: 'Unknown',
};

const STATUS_BADGE: Record<string, string> = {
  active: 'text-green-700 bg-green-50 dark:text-green-400 dark:bg-green-900/20',
  closed: 'text-red-700 bg-red-50 dark:text-red-400 dark:bg-red-900/20',
  merged: 'text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/20',
  unknown: 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-700',
};

// ── Year-filter mode ──────────────────────────────────────────────────────────
// 'synagogue': show ALL address markers for a synagogue if the synagogue's
//              founded–closed range overlaps the selected year range.
// 'address':   show only markers whose own start_year–end_year overlaps.
// Change this one constant to switch behavior without touching the filter logic.
const YEAR_FILTER_MODE: 'synagogue' | 'address' = 'synagogue'

// Applied in both light and dark mode: suppress Google's POI and transit clutter
// so synagogue markers read as the primary layer on the map.
const BASE_MAP_STYLES: google.maps.MapTypeStyle[] = [
  { featureType: 'poi',              elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi',              elementType: 'labels.text', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit.station',  elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
];

// Google Maps night-mode style
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
];

/**
 * Formats the address for the map marker popup.
 * Omits "Philadelphia" and "PA" since that's the implied context.
 * For non-Philadelphia locations, includes city and state.
 * Always includes zip when available.
 *   Philadelphia:  "1234 Broad St, 19147"
 *   Outside city:  "456 Old York Rd, Cheltenham, PA 19012"
 */
function formatPopupAddress(addr: Address): string {
  const parts: string[] = [];
  if (addr.street_address) parts.push(addr.street_address);
  const isPhilly = !addr.city || addr.city.toLowerCase() === 'philadelphia';
  if (!isPhilly) {
    if (addr.city) parts.push(addr.city);
    if (addr.state) parts.push(addr.state);
  }
  if (addr.zip_code) parts.push(addr.zip_code);
  return parts.join(', ');
}

/** "1920–1945", "1920–present", or null if no years on the address. */
function formatAddressYears(addr: Address): string | null {
  if (addr.start_year == null && addr.end_year == null) return null;
  const start = addr.start_year != null ? String(addr.start_year) : '?';
  const end   = addr.end_year   != null ? String(addr.end_year)   : 'present';
  return `${start}–${end}`;
}

// ── Per-address marker helpers ────────────────────────────────────────────────

/** Most-recent geocoded address: null end_year = still active (sorted highest). */
function getPrimaryGeocodedAddress(syn: Synagogue): Address | undefined {
  const geocoded = syn.addresses.filter(a => a.latitude != null && a.longitude != null);
  if (geocoded.length === 0) return undefined;
  return [...geocoded].sort((a, b) => {
    const aEnd = a.end_year ?? Number.MAX_SAFE_INTEGER;
    const bEnd = b.end_year ?? Number.MAX_SAFE_INTEGER;
    if (bEnd !== aEnd) return bEnd - aEnd;
    return (b.start_year ?? 0) - (a.start_year ?? 0);
  })[0];
}

interface MarkerData {
  key:       string;     // `${synagogueId}|${addressId}` — unique per address
  synagogue: Synagogue;
  address:   Address;
  isPrimary: boolean;    // most-recent geocoded address → full opacity; others → 50%
}

/** Expand synagogues into one MarkerData per geocoded address. */
function buildMarkers(synagogues: Synagogue[]): MarkerData[] {
  const markers: MarkerData[] = [];
  for (const syn of synagogues) {
    const primary = getPrimaryGeocodedAddress(syn);
    for (const addr of syn.addresses) {
      if (addr.latitude == null || addr.longitude == null) continue;
      markers.push({
        key:       `${syn.id}|${addr.id}`,
        synagogue: syn,
        address:   addr,
        isPrimary: primary?.id === addr.id,
      });
    }
  }
  return markers;
}

function markerPassesYearFilter(
  marker: MarkerData,
  startYear: number,
  endYear: number,
): boolean {
  if (YEAR_FILTER_MODE === 'synagogue') {
    const founded = marker.synagogue.founded_year ?? 0;
    const closed  = marker.synagogue.closed_year  ?? 9999;
    return founded <= endYear && closed >= startYear;
  } else {
    const addrStart = marker.address.start_year ?? marker.synagogue.founded_year ?? 0;
    const addrEnd   = marker.address.end_year   ?? marker.synagogue.closed_year  ?? 9999;
    return addrStart <= endYear && addrEnd >= startYear;
  }
}

/**
 * For markers sharing the exact same lat/lng, distribute them in a small circle
 * (radius ≈ 33m) so each is visually distinct when zoomed in.
 * The primary marker for the focused synagogue stays at real coords.
 */
function computeDisplayCoords(
  markers: MarkerData[],
  focusSynId: string | null,
): Map<string, { lat: number; lng: number }> {
  const RADIUS = 0.0003; // ~33 metres — invisible at zoom ≤13, distinct at zoom 15+
  const groupMap = new Map<string, string[]>(); // "lat,lng" → [markerKey, ...]

  markers.forEach(m => {
    const coordKey = `${m.address.latitude},${m.address.longitude}`;
    if (!groupMap.has(coordKey)) groupMap.set(coordKey, []);
    groupMap.get(coordKey)!.push(m.key);
  });

  const displayCoords = new Map<string, { lat: number; lng: number }>();
  markers.forEach(m => {
    displayCoords.set(m.key, { lat: m.address.latitude!, lng: m.address.longitude! });
  });

  groupMap.forEach((keys, coordKey) => {
    if (keys.length <= 1) return;
    const [lat, lng] = coordKey.split(',').map(Number);
    keys.forEach((key, i) => {
      // Keep the primary marker for the focused synagogue at its real coords
      const marker = markers.find(m => m.key === key);
      if (marker?.isPrimary && marker.synagogue.id === focusSynId) return;
      const angle = (i / keys.length) * 2 * Math.PI;
      displayCoords.set(key, {
        lat: lat + RADIUS * Math.sin(angle),
        lng: lng + RADIUS * Math.cos(angle),
      });
    });
  });

  return displayCoords;
}

function StatusBadge({ status }: { status: string | null }) {
  const s = status ?? 'unknown';
  const label = STATUS_LABELS[s] ?? s;
  const classes = STATUS_BADGE[s] ?? STATUS_BADGE.unknown;
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${classes}`}>
      {label}
    </span>
  );
}

/** Google Street View pegman icon in Google yellow. */
function PegmanIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" aria-hidden="true">
      <circle cx="7" cy="3.5" r="3"   fill="#FBBC04" />
      <rect   x="3" y="8"    width="8" height="8" rx="2" fill="#FBBC04" />
    </svg>
  );
}

function SynagoguePanel({
  syn,
  onClose,
  onAddressClick,
}: {
  syn: Synagogue;
  onClose: () => void;
  onAddressClick: (lat: number, lng: number) => void;
}) {
  const primaryAddr = getPrimaryGeocodedAddress(syn);

  // Sort addresses most-recent first (null end_year = active, treated as highest).
  const sortedAddresses = [...syn.addresses].sort((a, b) => {
    const aEnd = a.end_year ?? Number.MAX_SAFE_INTEGER;
    const bEnd = b.end_year ?? Number.MAX_SAFE_INTEGER;
    if (bEnd !== aEnd) return bEnd - aEnd;
    return (b.start_year ?? 0) - (a.start_year ?? 0);
  });

  const displayClergy = syn.clergy.slice(0, 5);
  const extraClergy   = syn.clergy.length - displayClergy.length;

  return (
    <div className="p-4 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        {/* Clicking the name zooms to the most-recent geocoded address */}
        <button
          onClick={() => primaryAddr && onAddressClick(primaryAddr.latitude!, primaryAddr.longitude!)}
          className="text-base font-semibold text-gray-900 dark:text-white leading-snug text-left hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {syn.name}
        </button>
        <button
          onClick={onClose}
          className="flex-shrink-0 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xl leading-none mt-0.5"
          aria-label="Close panel"
        >
          ×
        </button>
      </div>

      <StatusBadge status={syn.status} />

      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
        {syn.founded_year && (
          <p><span className="font-medium">Founded:</span> {syn.founded_year}</p>
        )}
        {syn.closed_year && (
          <p><span className="font-medium">Closed:</span> {syn.closed_year}</p>
        )}
      </div>

      {/* Addresses — each geocoded address is a clickable zoom link */}
      {sortedAddresses.length > 0 && (
        <div className="text-sm space-y-2">
          <p className="font-medium text-gray-700 dark:text-gray-300">
            {sortedAddresses.length === 1 ? 'Location' : 'Locations'}
          </p>
          {sortedAddresses.map(addr => {
            const hasCoords  = addr.latitude != null && addr.longitude != null;
            const streetViewUrl = hasCoords
              ? `https://www.google.com/maps?q=&layer=c&cbll=${addr.latitude},${addr.longitude}`
              : null;
            const yearRange  = formatAddressYears(addr);
            const addrText   = formatPopupAddress(addr);

            return (
              <div key={addr.id} className="flex items-start gap-2">
                <div className="flex-1 min-w-0">
                  {hasCoords ? (
                    <button
                      onClick={() => onAddressClick(addr.latitude!, addr.longitude!)}
                      className="text-blue-600 dark:text-blue-400 hover:underline text-left leading-snug"
                    >
                      {addrText}
                    </button>
                  ) : (
                    <span className="text-gray-600 dark:text-gray-400 leading-snug">{addrText}</span>
                  )}
                  {addr.neighborhood && (
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">{addr.neighborhood}</div>
                  )}
                  {yearRange && (
                    <div className="text-xs text-gray-400 dark:text-gray-500">{yearRange}</div>
                  )}
                </div>
                {streetViewUrl && (
                  <a
                    href={streetViewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Street View"
                    className="flex-shrink-0 mt-0.5 hover:opacity-70 transition-opacity"
                  >
                    <PegmanIcon />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      )}

      {syn.clergy.length > 0 && (
        <div className="text-sm">
          <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">Clergy</p>
          <ul className="text-gray-600 dark:text-gray-400 space-y-0.5">
            {displayClergy.map((r, i) => (
              <li key={i} className="truncate">{r}</li>
            ))}
          </ul>
          {extraClergy > 0 && (
            <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">+ {extraClergy} more</p>
          )}
        </div>
      )}

      <div className="pt-1">
        <Link
          href={`/synagogues/${syn.id}`}
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
        >
          View full history →
        </Link>
      </div>
    </div>
  );
}

function RangeSlider({
  min,
  max,
  start,
  end,
  onStartChange,
  onEndChange,
}: {
  min: number;
  max: number;
  start: number;
  end: number;
  onStartChange: (v: number) => void;
  onEndChange: (v: number) => void;
}) {
  const range = max - min;
  const startPct = ((start - min) / range) * 100;
  const endPct = ((end - min) / range) * 100;

  return (
    <div className="relative h-5 flex items-center">
      {/* Gray track */}
      <div className="absolute inset-x-0 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700" />
      {/* Blue active range */}
      <div
        className="absolute h-1.5 bg-blue-500 rounded-full"
        style={{ left: `${startPct}%`, right: `${100 - endPct}%` }}
      />
      {/* Start thumb — raise z-index when pushed to the right so user can drag it back left */}
      <input
        type="range"
        min={min}
        max={max}
        value={start}
        onChange={e => onStartChange(Math.min(Number(e.target.value), end))}
        className="range-input"
        style={{ zIndex: start >= end ? 5 : 3 }}
      />
      {/* End thumb */}
      <input
        type="range"
        min={min}
        max={max}
        value={end}
        onChange={e => onEndChange(Math.max(Number(e.target.value), start))}
        className="range-input"
        style={{ zIndex: 4 }}
      />
    </div>
  );
}

function MapClientInner({ synagogues, minYear, maxYear }: MapClientProps) {
  const mapRef          = useRef<HTMLDivElement>(null);
  const mapInstanceRef  = useRef<google.maps.Map | null>(null);
  const markersRef      = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const infoWindowRef   = useRef<google.maps.InfoWindow | null>(null);

  const [isLoaded,       setIsLoaded]       = useState(false);
  const [loadError,      setLoadError]      = useState<string | null>(null);
  const [startYear,      setStartYear]      = useState<number>(minYear);
  const [endYear,        setEndYear]        = useState<number>(maxYear);
  const [visibleCount,   setVisibleCount]   = useState(0);
  const [hiddenStatuses, setHiddenStatuses] = useState<Set<string>>(new Set());

  const apiKey       = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const searchParams = useSearchParams();
  const focusLat  = searchParams ? parseFloat(searchParams.get('lat') || '') : NaN;
  const focusLng  = searchParams ? parseFloat(searchParams.get('lng') || '') : NaN;
  const focusId   = searchParams ? (searchParams.get('id') || null) : null;
  const hasFocus  = !isNaN(focusLat) && !isNaN(focusLng);

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 640 : true
  );
  const [searchQuery,       setSearchQuery]       = useState('');
  const [neighborhoodFilter, setNeighborhoodFilter] = useState<string | null>(null);
  const [selectedId,         setSelectedId]         = useState<string | null>(focusId);

  // Flat list of one MarkerData per geocoded address across all synagogues
  const allMarkers = useMemo(() => buildMarkers(synagogues), [synagogues]);

  // Unique sorted neighborhoods collected from all addresses (not just primary)
  const neighborhoods = useMemo(() => {
    const set = new Set<string>();
    synagogues.forEach(syn => {
      syn.addresses.forEach(a => { if (a.neighborhood) set.add(a.neighborhood); });
    });
    return Array.from(set).sort();
  }, [synagogues]);

  // Filter matching synagogue IDs — null means "show all"
  // Neighborhood: synagogue appears if ANY of its addresses is in the selected neighborhood.
  const filteredIds = useMemo(() => {
    const hasSearch       = searchQuery.trim().length > 0;
    const hasNeighborhood = neighborhoodFilter !== null;
    if (!hasSearch && !hasNeighborhood) return null;

    const q   = searchQuery.trim().toLowerCase();
    const ids = new Set<string>();
    synagogues.forEach(s => {
      const neighborhoodMatch =
        !hasNeighborhood ||
        s.addresses.some(a => a.neighborhood === neighborhoodFilter);
      if (!neighborhoodMatch) return;

      if (!hasSearch) {
        ids.add(s.id);
        return;
      }

      const nameMatch   = s.name.toLowerCase().includes(q);
      const clergyMatch = s.clergy.some(r => r.toLowerCase().includes(q));
      if (nameMatch || clergyMatch) ids.add(s.id);
    });
    return ids;
  }, [searchQuery, neighborhoodFilter, synagogues]);

  const filteredSynagogues = useMemo(() => {
    if (filteredIds === null) return synagogues;
    return synagogues.filter(s => filteredIds.has(s.id));
  }, [filteredIds, synagogues]);

  const selectedSynagogue = useMemo(() => {
    if (!selectedId) return null;
    return synagogues.find(s => s.id === selectedId) ?? null;
  }, [selectedId, synagogues]);

  const hasFilters = searchQuery.trim().length > 0 || neighborhoodFilter !== null;

  // Global callback so infowindow buttons (plain HTML) can trigger React state
  useEffect(() => {
    (window as any).__selectSynagogue = (id: string) => {
      setSelectedId(id);
      setSidebarOpen(true);
      infoWindowRef.current?.close();
    };
    return () => { delete (window as any).__selectSynagogue; };
  }, []);

  // Load Google Maps script
  useEffect(() => {
    if (!apiKey) {
      setLoadError(
        'Google Maps API key is missing. Check NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable.'
      );
      return;
    }

    if (window.google?.maps) { setIsLoaded(true); return; }

    if (document.getElementById('google-maps-script')) {
      const checkLoaded = setInterval(() => {
        if (window.google?.maps) { setIsLoaded(true); clearInterval(checkLoaded); }
      }, 100);
      return () => clearInterval(checkLoaded);
    }

    // loading=async in the URL is Google's recommended flag for async loading.
    // It requires a &callback parameter — the callback fires once all libraries
    // are fully initialised (unlike onload, which fires before sub-modules are ready).
    ;(window as any).__mapsCallback = () => {
      setIsLoaded(true);
      delete (window as any).__mapsCallback;
    };

    const script = document.createElement('script');
    script.id  = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker&loading=async&callback=__mapsCallback`;
    script.async = true;
    script.onerror = () => {
      delete (window as any).__mapsCallback;
      setLoadError('Failed to load Google Maps script. Check your API key and network connection.');
    };
    document.head.appendChild(script);

    return () => { delete (window as any).__mapsCallback; };
  }, [apiKey]);

  // Initialize map once script is loaded
  useEffect(() => {
    if (!isLoaded || !mapRef.current || mapInstanceRef.current) return;
    if (!window.google?.maps) return;

    mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
      center: hasFocus ? { lat: focusLat, lng: focusLng } : { lat: 39.9526, lng: -75.1652 },
      zoom: hasFocus ? 16 : 12,
      mapTypeControl: false,
      streetViewControl: true,
      fullscreenControl: true,
      // mapId is required for AdvancedMarkerElement.
      mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID ?? 'DEMO_MAP_ID',
    });

    infoWindowRef.current = new window.google.maps.InfoWindow();
  }, [isLoaded]);

  // Render markers whenever map, data, or filters change
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(m => { m.map = null; });
    markersRef.current = [];

    // Apply all filters to produce the set of markers to render.
    // Neighbourhood filter is applied per-marker (point 5): only show the specific
    // address markers that match, even if the synagogue has other addresses elsewhere.
    const visibleMarkers = allMarkers.filter(m => {
      if (filteredIds !== null && !filteredIds.has(m.synagogue.id)) return false;
      if (hiddenStatuses.has(m.synagogue.status ?? 'unknown'))       return false;
      if (!markerPassesYearFilter(m, startYear, endYear))            return false;
      if (neighborhoodFilter !== null && m.address.neighborhood !== neighborhoodFilter) return false;
      return true;
    });

    // Compute display coords — offsets markers sharing the exact same lat/lng
    const displayCoords = computeDisplayCoords(visibleMarkers, focusId);

    // Inject bounce-animation CSS once
    if (!document.getElementById('gm-marker-styles')) {
      const style = document.createElement('style');
      style.id = 'gm-marker-styles';
      style.textContent = `
        @keyframes gm-bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-10px); }
        }
        .gm-marker-bounce { animation: gm-bounce 0.6s ease-in-out infinite; }
      `;
      document.head.appendChild(style);
    }

    visibleMarkers.forEach(m => {
      const { synagogue: s, address: addr, isPrimary } = m;
      const status      = s.status ?? 'unknown';
      const color       = STATUS_COLORS[status]        ?? STATUS_COLORS.unknown;
      const borderColor = STATUS_BORDER_COLORS[status] ?? STATUS_BORDER_COLORS.unknown;
      // Bounce only the primary (most-recent) marker for the focused synagogue
      const isFocused   = focusId ? (s.id === focusId && isPrimary) : false;
      const display     = displayCoords.get(m.key) ?? { lat: addr.latitude!, lng: addr.longitude! };

      const markerEl = document.createElement('div');
      markerEl.style.cursor = 'pointer';

      if (isFocused) {
        markerEl.innerHTML =
          `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">` +
          `<circle cx="24" cy="24" r="22" fill="#facc15" stroke="#92400e" stroke-width="3"/>` +
          `<text x="24" y="24" font-size="20" text-anchor="middle" dominant-baseline="central" font-family="sans-serif">✡️</text>` +
          `</svg>`;
        markerEl.classList.add('gm-marker-bounce');
      } else {
        // Historical (non-primary) markers render at 50% opacity
        const opacity = isPrimary ? '1' : '0.5';
        markerEl.style.opacity = opacity;
        markerEl.innerHTML =
          `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">` +
          `<defs><filter id="s" x="-30%" y="-30%" width="160%" height="160%">` +
          `<feDropShadow dx="0" dy="1.5" stdDeviation="2" flood-color="#000" flood-opacity="0.35"/></filter></defs>` +
          `<circle cx="18" cy="18" r="15" fill="${color}" stroke="${borderColor}" stroke-width="2.5" filter="url(#s)"/>` +
          `<text x="18" y="18" font-size="12" text-anchor="middle" dominant-baseline="central" font-family="sans-serif">✡️</text>` +
          `</svg>`;
      }

      const marker = new window.google.maps.marker.AdvancedMarkerElement({
        position:     display,
        map:          mapInstanceRef.current!,
        title:        s.name,
        content:      markerEl,
        zIndex:       isFocused ? 9999 : (isPrimary ? 2 : 1),
        gmpClickable: true,
      });

      const addrLine  = formatPopupAddress(addr);
      const yearRange = formatAddressYears(addr);
      const infoContent = `
        <div style="max-width:220px;font-family:sans-serif;color:#111;">
          <h3 style="margin:0 0 4px;font-size:14px;font-weight:600;color:#111;">${s.name}</h3>
          ${addrLine  ? `<p style="margin:0 0 2px;font-size:12px;color:#555;">${addrLine}</p>` : ''}
          ${yearRange ? `<p style="margin:0 0 4px;font-size:11px;color:#888;">${yearRange}</p>` : ''}
          <p style="margin:0;font-size:12px;color:#333;">
            ${s.founded_year ? `Founded: ${s.founded_year}` : ''}
            ${s.founded_year && s.closed_year ? ' · ' : ''}
            ${s.closed_year ? `Closed: ${s.closed_year}` : ''}
          </p>
          ${addr.neighborhood ? `<p style="margin:4px 0 0;font-size:12px;color:#777;">${addr.neighborhood}</p>` : ''}
          <p style="margin:4px 0 0;font-size:11px;color:#333;">
            <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${color};margin-right:4px;vertical-align:middle;"></span>
            ${status.charAt(0).toUpperCase() + status.slice(1)}
          </p>
          <button
            onclick="window.__selectSynagogue('${s.id}')"
            style="margin-top:8px;width:100%;padding:4px 8px;background:#2563eb;color:white;border:none;border-radius:4px;font-size:12px;cursor:pointer;"
          >
            View Details in Sidebar
          </button>
        </div>
      `;

      marker.addListener('gmp-click', () => {
        infoWindowRef.current?.setContent(infoContent);
        infoWindowRef.current?.open(mapInstanceRef.current!, marker);
      });

      if (isFocused) {
        infoWindowRef.current?.setContent(infoContent);
        infoWindowRef.current?.open(mapInstanceRef.current!, marker);
        setTimeout(() => markerEl.classList.remove('gm-marker-bounce'), 3000);
      }

      markersRef.current.push(marker);
    });

    // Count unique synagogues with visible markers
    const uniqueSynIds = new Set(visibleMarkers.map(m => m.synagogue.id));
    setVisibleCount(uniqueSynIds.size);
  }, [isLoaded, allMarkers, startYear, endYear, filteredIds, hiddenStatuses, neighborhoodFilter]);

  function toggleStatus(status: string) {
    setHiddenStatuses(prev => {
      const next = new Set(prev);
      if (next.has(status)) next.delete(status);
      else next.add(status);
      return next;
    });
  }

  /** Pan/zoom the map to a specific lat/lng (used by address-row clicks in the panel). */
  function focusOnAddress(lat: number, lng: number) {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.panTo({ lat, lng });
    mapInstanceRef.current.setZoom(16);
  }

  /** Pan to the most-recent geocoded address for a synagogue (used by search result clicks). */
  function focusOnSynagogue(syn: Synagogue) {
    const primary = getPrimaryGeocodedAddress(syn);
    if (!primary || !mapInstanceRef.current) return;
    mapInstanceRef.current.panTo({ lat: primary.latitude!, lng: primary.longitude! });
    mapInstanceRef.current.setZoom(16);
  }

  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-red-50 dark:bg-red-950 rounded-lg p-8 text-center">
        <div className="text-red-500 dark:text-red-400 text-xl mb-2">⚠️ Map Error</div>
        <p className="text-red-700 dark:text-red-300 text-sm max-w-md">{loadError}</p>
        <p className="text-gray-500 dark:text-gray-400 text-xs mt-4">
          API Key present: {apiKey ? 'Yes (' + apiKey.substring(0, 8) + '...)' : 'No'}
        </p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-50 dark:bg-gray-900 rounded-lg">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-3"></div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Loading map...</p>
        <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">
          API Key: {apiKey ? apiKey.substring(0, 10) + '...' : 'MISSING'}
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex h-full">
      {/* Mobile backdrop — tapping it closes the sidebar */}
      {sidebarOpen && (
        <div
          className="absolute inset-0 bg-black/30 z-10 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar
          Mobile:  absolute overlay (z-20), slides in/out via width
          Desktop: inline flex item (sm:relative), pushes map
      */}
      <div
        className={[
          'flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex overflow-hidden',
          'transition-[width] duration-300 ease-in-out',
          'absolute inset-y-0 left-0 z-20',
          'sm:relative sm:z-auto sm:flex-shrink-0',
          sidebarOpen ? 'w-80' : 'w-0',
        ].join(' ')}
      >
        {/* Fixed header: search + neighborhood filter */}
        <div className="p-3 border-b border-gray-100 dark:border-gray-700 space-y-2 flex-shrink-0">
          {/* Mobile-only close button */}
          <div className="flex items-center justify-between sm:hidden">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Search</span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400"
              aria-label="Close sidebar"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <input
            type="text"
            placeholder="Search by name or clergy..."
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setSelectedId(null); }}
            className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />
          <select
            value={neighborhoodFilter ?? ''}
            onChange={e => { setNeighborhoodFilter(e.target.value || null); setSelectedId(null); }}
            className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="">All neighborhoods</option>
            {neighborhoods.map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          {hasFilters && (
            <button
              onClick={() => { setSearchQuery(''); setNeighborhoodFilter(null); setSelectedId(null); }}
              className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto">
          {selectedSynagogue ? (
            <SynagoguePanel
              syn={selectedSynagogue}
              onClose={() => setSelectedId(null)}
              onAddressClick={focusOnAddress}
            />
          ) : hasFilters && filteredSynagogues.length > 0 ? (
            <div>
              <p className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
                {filteredSynagogues.length} result{filteredSynagogues.length !== 1 ? 's' : ''}
              </p>
              <ul>
                {filteredSynagogues.map(s => {
                  const primary = getPrimaryGeocodedAddress(s);
                  return (
                    <li key={s.id}>
                      <button
                        onClick={() => { setSelectedId(s.id); focusOnSynagogue(s); }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-700 transition-colors"
                      >
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{s.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <StatusBadge status={s.status} />
                          {primary?.neighborhood && (
                            <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {primary.neighborhood}
                            </span>
                          )}
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : hasFilters && filteredSynagogues.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm">No synagogues match your search.</p>
              <button
                onClick={() => { setSearchQuery(''); setNeighborhoodFilter(null); }}
                className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="px-4 py-8 text-center text-gray-400 dark:text-gray-500">
              <p className="text-sm">Search by name or clergy, or filter by neighborhood.</p>
              <p className="text-xs mt-2">Or click any marker on the map.</p>
            </div>
          )}
        </div>
      </div>

      {/* Map — fills remaining width */}
      <div className="relative flex-1">
        <div ref={mapRef} className="w-full h-full" />

        {/* Sidebar toggle button — always visible top-left of map area */}
        <button
          onClick={() => setSidebarOpen(o => !o)}
          className="absolute top-3 left-3 z-10 bg-white dark:bg-gray-800 rounded-lg shadow-md w-9 h-9 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
          aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {sidebarOpen ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
              <path d="M0 1h18M0 7h18M0 13h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </button>

        {/* Year range filter overlay */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-900 rounded-xl shadow-lg px-4 py-3 z-10 min-w-[320px] border border-transparent dark:border-gray-700">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 tabular-nums">{startYear}</span>
            <span className="text-xs text-gray-400 dark:text-gray-500">{visibleCount} synagogues</span>
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 tabular-nums">{endYear}</span>
          </div>
          <RangeSlider
            min={minYear}
            max={maxYear}
            start={startYear}
            end={endYear}
            onStartChange={setStartYear}
            onEndChange={setEndYear}
          />
          <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-2">
            <span>{minYear}</span>
            <span>{maxYear}</span>
          </div>
        </div>

        {/* Legend overlay — each row is a toggle button */}
        <div className="absolute top-4 right-4 bg-white dark:bg-gray-900 rounded-lg shadow-md px-3 py-2 z-10 text-xs border border-transparent dark:border-gray-700">
          <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Status</p>
          {Object.entries(STATUS_COLORS).map(([status, color]) => {
            const isHidden = hiddenStatuses.has(status);
            return (
              <button
                key={status}
                onClick={() => toggleStatus(status)}
                title={isHidden ? `Show ${STATUS_LABELS[status]}` : `Hide ${STATUS_LABELS[status]}`}
                className={`flex items-center gap-2 mb-1 w-full text-left rounded px-1 py-0.5 transition-opacity hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer${isHidden ? ' opacity-40' : ''}`}
              >
                <span
                  style={{ background: isHidden ? '#9ca3af' : color }}
                  className="inline-block w-3 h-3 rounded-full flex-shrink-0"
                />
                <span className={`capitalize${isHidden ? ' line-through text-gray-400 dark:text-gray-600' : ' text-gray-600 dark:text-gray-400'}`}>
                  {status}
                </span>
              </button>
            );
          })}
          {hiddenStatuses.size > 0 && (
            <button
              onClick={() => setHiddenStatuses(new Set())}
              className="mt-1 w-full text-left text-blue-600 dark:text-blue-400 hover:underline"
            >
              Show all
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MapClient({ synagogues, minYear, maxYear }: MapClientProps) {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center h-full bg-gray-50 dark:bg-gray-900 rounded-lg">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-3"></div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Loading map...</p>
        </div>
      }
    >
      <MapClientInner synagogues={synagogues} minYear={minYear} maxYear={maxYear} />
    </Suspense>
  );
}
