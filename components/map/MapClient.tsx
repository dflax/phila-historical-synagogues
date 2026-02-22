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
  rabbis: string[];
}

interface MapClientProps {
  synagogues: Synagogue[];
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
  active: 'text-green-700 bg-green-50',
  closed: 'text-red-700 bg-red-50',
  merged: 'text-amber-700 bg-amber-50',
  unknown: 'text-gray-600 bg-gray-100',
};

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

function SynagoguePanel({
  syn,
  onClose,
}: {
  syn: Synagogue;
  onClose: () => void;
}) {
  const addr = syn.addresses[0];
  const lat = addr?.latitude;
  const lng = addr?.longitude;
  const streetViewUrl =
    lat && lng ? `https://www.google.com/maps?q=&layer=c&cbll=${lat},${lng}` : null;

  const displayRabbis = syn.rabbis.slice(0, 5);
  const extraRabbis = syn.rabbis.length - displayRabbis.length;

  return (
    <div className="p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-base font-semibold text-gray-900 leading-snug">{syn.name}</h2>
        <button
          onClick={onClose}
          className="flex-shrink-0 text-gray-400 hover:text-gray-700 text-xl leading-none mt-0.5"
          aria-label="Close panel"
        >
          ×
        </button>
      </div>

      <StatusBadge status={syn.status} />

      <div className="text-sm text-gray-600 space-y-1">
        {syn.founded_year && (
          <p><span className="font-medium">Founded:</span> {syn.founded_year}</p>
        )}
        {syn.closed_year && (
          <p><span className="font-medium">Closed:</span> {syn.closed_year}</p>
        )}
      </div>

      {addr && (
        <div className="text-sm text-gray-600">
          {addr.street_address && <p>{addr.street_address}</p>}
          {addr.neighborhood && <p className="text-gray-500">{addr.neighborhood}</p>}
        </div>
      )}

      {syn.rabbis.length > 0 && (
        <div className="text-sm">
          <p className="font-medium text-gray-700 mb-1">Rabbis</p>
          <ul className="text-gray-600 space-y-0.5">
            {displayRabbis.map((r, i) => (
              <li key={i} className="truncate">{r}</li>
            ))}
          </ul>
          {extraRabbis > 0 && (
            <p className="text-gray-400 text-xs mt-1">+ {extraRabbis} more</p>
          )}
        </div>
      )}

      <div className="flex flex-col gap-2 pt-1">
        {streetViewUrl && (
          <a
            href={streetViewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Street View ↗
          </a>
        )}
        <Link
          href={`/synagogues/${syn.id}`}
          className="text-sm text-blue-600 hover:text-blue-800 underline"
        >
          View full history →
        </Link>
      </div>
    </div>
  );
}

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
  const focusId = searchParams ? (searchParams.get('id') || null) : null;
  const hasFocus = !isNaN(focusLat) && !isNaN(focusLng);

  const [searchQuery, setSearchQuery] = useState('');
  const [neighborhoodFilter, setNeighborhoodFilter] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(focusId);

  // Unique sorted neighborhoods
  const neighborhoods = useMemo(() => {
    const set = new Set<string>();
    synagogues.forEach(s => {
      const n = s.addresses[0]?.neighborhood;
      if (n) set.add(n);
    });
    return Array.from(set).sort();
  }, [synagogues]);

  // Filter matching IDs — null means "show all"
  const filteredIds = useMemo(() => {
    const hasSearch = searchQuery.trim().length > 0;
    const hasNeighborhood = neighborhoodFilter !== null;
    if (!hasSearch && !hasNeighborhood) return null;

    const q = searchQuery.trim().toLowerCase();
    const ids = new Set<string>();
    synagogues.forEach(s => {
      const neighborhoodMatch =
        !hasNeighborhood || s.addresses[0]?.neighborhood === neighborhoodFilter;
      if (!neighborhoodMatch) return;

      if (!hasSearch) {
        ids.add(s.id);
        return;
      }

      const nameMatch = s.name.toLowerCase().includes(q);
      const rabbiMatch = s.rabbis.some(r => r.toLowerCase().includes(q));
      if (nameMatch || rabbiMatch) {
        ids.add(s.id);
      }
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
      infoWindowRef.current?.close();
    };
    return () => {
      delete (window as any).__selectSynagogue;
    };
  }, []);

  // Load Google Maps script
  useEffect(() => {
    if (!apiKey) {
      setLoadError(
        'Google Maps API key is missing. Check NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable.'
      );
      return;
    }

    if (window.google?.maps) {
      setIsLoaded(true);
      return;
    }

    if (document.getElementById('google-maps-script')) {
      const checkLoaded = setInterval(() => {
        if (window.google?.maps) {
          setIsLoaded(true);
          clearInterval(checkLoaded);
        }
      }, 100);
      return () => clearInterval(checkLoaded);
    }

    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker`;
    script.async = true;
    script.defer = true;

    script.onload = () => setIsLoaded(true);
    script.onerror = () =>
      setLoadError(
        'Failed to load Google Maps script. Check your API key and network connection.'
      );

    document.head.appendChild(script);

    return () => {
      // Don't remove the script on unmount — causes issues with remounting
    };
  }, [apiKey]);

  // Initialize map once script is loaded
  useEffect(() => {
    if (!isLoaded || !mapRef.current || mapInstanceRef.current) return;

    mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
      center: hasFocus ? { lat: focusLat, lng: focusLng } : { lat: 39.9526, lng: -75.1652 },
      zoom: hasFocus ? 16 : 12,
      mapTypeControl: false,
      streetViewControl: true,
      fullscreenControl: true,
    });

    infoWindowRef.current = new window.google.maps.InfoWindow();
  }, [isLoaded]);

  // Update markers when map is ready, year filter, or search filter changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];

    const filtered = synagogues.filter(s => {
      const addr = s.addresses?.[0];
      if (!addr) return false;
      if (filteredIds !== null && !filteredIds.has(s.id)) return false;
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
        icon: isFocused
          ? {
              url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
                `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">` +
                  `<circle cx="24" cy="24" r="22" fill="#facc15" stroke="#92400e" stroke-width="3"/>` +
                  `<text x="24" y="24" font-size="20" text-anchor="middle" dominant-baseline="central" font-family="sans-serif">✡️</text>` +
                  `</svg>`
              )}`,
              scaledSize: new window.google.maps.Size(48, 48),
              anchor: new window.google.maps.Point(24, 24),
            }
          : {
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
          <button
            onclick="window.__selectSynagogue('${s.id}')"
            style="margin-top:8px;width:100%;padding:4px 8px;background:#2563eb;color:white;border:none;border-radius:4px;font-size:12px;cursor:pointer;"
          >
            View Details in Sidebar
          </button>
        </div>
      `;

      marker.addListener('click', () => {
        infoWindowRef.current?.setContent(infoContent);
        infoWindowRef.current?.open(mapInstanceRef.current!, marker);
      });

      if (isFocused) {
        infoWindowRef.current?.setContent(infoContent);
        infoWindowRef.current?.open(mapInstanceRef.current!, marker);
        setTimeout(() => marker.setAnimation(null), 3000);
      }

      markersRef.current.push(marker);
    });

    setVisibleCount(filtered.length);
  }, [isLoaded, synagogues, yearFilter, filteredIds]);

  function focusOnSynagogue(syn: Synagogue) {
    const addr = syn.addresses[0];
    if (!addr || !mapInstanceRef.current) return;
    mapInstanceRef.current.panTo({ lat: addr.latitude, lng: addr.longitude });
    mapInstanceRef.current.setZoom(16);
  }

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
    <div className="flex h-full">
      {/* Sidebar — 320px fixed width */}
      <div className="w-80 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
        {/* Fixed header: search + neighborhood filter */}
        <div className="p-3 border-b border-gray-100 space-y-2 flex-shrink-0">
          <input
            type="text"
            placeholder="Search by name or rabbi..."
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              setSelectedId(null);
            }}
            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select
            value={neighborhoodFilter ?? ''}
            onChange={e => {
              setNeighborhoodFilter(e.target.value || null);
              setSelectedId(null);
            }}
            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">All neighborhoods</option>
            {neighborhoods.map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          {hasFilters && (
            <button
              onClick={() => {
                setSearchQuery('');
                setNeighborhoodFilter(null);
                setSelectedId(null);
              }}
              className="text-xs text-blue-600 hover:text-blue-800 underline"
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
            />
          ) : hasFilters && filteredSynagogues.length > 0 ? (
            <div>
              <p className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100">
                {filteredSynagogues.length} result{filteredSynagogues.length !== 1 ? 's' : ''}
              </p>
              <ul>
                {filteredSynagogues.map(s => (
                  <li key={s.id}>
                    <button
                      onClick={() => {
                        setSelectedId(s.id);
                        focusOnSynagogue(s);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 transition-colors"
                    >
                      <p className="text-sm font-medium text-gray-900 truncate">{s.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <StatusBadge status={s.status} />
                        {s.addresses[0]?.neighborhood && (
                          <span className="text-xs text-gray-500 truncate">
                            {s.addresses[0].neighborhood}
                          </span>
                        )}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : hasFilters && filteredSynagogues.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <p className="text-gray-500 text-sm">No synagogues match your search.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setNeighborhoodFilter(null);
                }}
                className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="px-4 py-8 text-center text-gray-400">
              <p className="text-sm">Search by name or rabbi, or filter by neighborhood.</p>
              <p className="text-xs mt-2">Or click any marker on the map.</p>
            </div>
          )}
        </div>
      </div>

      {/* Map — fills remaining width */}
      <div className="relative flex-1">
        <div ref={mapRef} className="w-full h-full" />

        {/* Year filter overlay */}
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

        {/* Legend overlay */}
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
    </div>
  );
}

export default function MapClient({ synagogues }: MapClientProps) {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center h-full bg-gray-50 rounded-lg">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-3"></div>
          <p className="text-gray-500 text-sm">Loading map...</p>
        </div>
      }
    >
      <MapClientInner synagogues={synagogues} />
    </Suspense>
  );
}
