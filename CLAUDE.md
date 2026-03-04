# Philadelphia Historical Synagogues

A web application documenting 562 synagogues in the Philadelphia area, spanning from 1745 to the present day. Built to preserve Jewish heritage through interactive mapping and historical records.

## Working Style
- Work autonomously without asking for confirmation between steps
- Only ask questions if genuinely blocked and cannot proceed - only if you must, ask. Otherwise proceed with the assumed YES answer
- Complete tasks fully before reporting results
- Never commit or push to git. Make all code changes but leave committing and pushing to Daniel to do manually.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Hosting**: Vercel (auto-deploys from GitHub)
- **Database**: Supabase (PostgreSQL)
- **Maps**: Google Maps JavaScript API
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Font**: Inter (Google Fonts)

## Project Structure

```
app/
  page.tsx                        # Homepage with stats and navigation
  page.20260221-1.tsx             # Dated backup of homepage (can be deleted)
  layout.tsx                      # Root layout (Inter font, metadata)
  globals.css                     # Global styles + dual-range slider CSS (.range-input)
  map/
    page.tsx                      # Map page (server component, force-dynamic)
  synagogues/
    page.tsx                      # Browse/list page (server component, force-dynamic)
    [id]/
      page.tsx                    # Detail page (server component, force-dynamic)
  test/
    page.tsx                      # Legacy DB connection test (can be deleted)
  test-data/
    page.tsx                      # Legacy data/geocoding test (can be deleted)

components/
  map/
    MapClient.tsx                 # Interactive Google Maps client component (see below)
    MiniMap.tsx                   # Non-interactive mini-map for detail page hero
  synagogues/
    SynagoguesClient.tsx          # Browse page with search/filter UI
    SynagogueDetail.tsx           # Detail page UI with history, rabbis, images

lib/
  supabase/
    client.ts                     # Shared Supabase client + TS type definitions (legacy; used by test pages only)
```

## Database Schema (Supabase)

All tables use UUID primary keys. RLS is enabled on all tables.

### synagogues
Core table. 562 records imported.
- `id`, `name`, `status` (active/closed/merged/unknown)
- `founded_year`, `founded_text`, `closed_year`, `closed_text`
- `approved` (boolean) — all current records are approved=true
- `search_vector` (tsvector, for future full-text search)

### addresses
424 geocoded records. Multiple addresses per synagogue (historical locations).
- `synagogue_id` → synagogues.id
- `street_address`, `neighborhood`, `city`, `state`, `zip_code`
- `latitude`, `longitude` (numeric)
- `is_current` (boolean), `address_order` (integer, 0=primary)
- `start_year`, `end_year` (years at this address)
- `geocode_quality` (exact/approximate/low_confidence)

### history_entries
325 records imported from source Excel data.
- `synagogue_id` → synagogues.id
- `entry_type`: must be one of `ethnic_origin`, `rabbi`, `event`, `building`, `merger`, `general`
- `content` (text), `year`, `year_range_start`, `year_range_end`, `circa` (boolean)
- `source`, `source_url`
- `approved` (boolean)

### rabbis
373 records imported and parsed from source Excel data.
- `synagogue_id` → synagogues.id
- `name`, `title`, `start_year`, `end_year`, `notes`
- `approved` (boolean)

### images
Empty. Schema ready for future photo uploads.
- `synagogue_id` → synagogues.id
- `url`, `caption`, `description`, `year`, `circa_year`
- `is_primary`, `display_order`
- `photographer`, `source`, `credit_line`
- `people_names` (array), `people_metadata` (jsonb)
- `approved` (boolean)

### edit_proposals
Empty. Schema ready for community contributions.

## Key Implementation Notes

### Supabase Client Pattern
All server components create their own Supabase client directly — do NOT use a shared browser client for server components:
```ts
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

`lib/supabase/client.ts` exports a shared `supabase` singleton and TypeScript types (`Synagogue`, `Address`, `HistoryEntry`, `Image`). It is only used by the legacy test pages. Do not import it in new server components.

### force-dynamic
All data-fetching pages use:
```ts
export const dynamic = 'force-dynamic'
export const revalidate = 0
```
This prevents Next.js from statically caching pages at build time.

### Google Maps
- Loaded manually via script tag injection (not @react-google-maps/api)
- Requires `@types/google.maps` dev dependency
- API key: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` (set in Vercel environment variables)
- MapClient is wrapped in `<Suspense>` to satisfy Next.js useSearchParams() requirement
- Markers use `google.maps.Marker` (deprecated but functional — migration to AdvancedMarkerElement is a future task)
- Marker style: SVG circle color-coded by status with ✡️ emoji center; focused marker is yellow/bouncing
- `streetViewControl: true` — pegman drag-to-streetview is enabled on the full map

### Map URL Params
The map page accepts query params for focused view:
- `?lat=40.07&lng=-75.13&id=<uuid>` — centers map, zooms to level 16, renders focused synagogue as a bouncing Star of David marker (yellow, high contrast for color blindness accessibility)
- Arriving from a detail page via this URL also auto-populates the sidebar with that synagogue's detail panel

### MapClient.tsx — Full Feature Set
The map page (`/map`) is a full-screen layout with:
- **Left sidebar (320px)** with collapsible toggle
  - Search by synagogue name or rabbi name
  - Neighborhood dropdown filter
  - Results list (click → pan + zoom to marker)
  - `SynagoguePanel` detail view: status badge, founded/closed years, address, rabbis (up to 5 + overflow), Street View link, "View full history →" link
  - `window.__selectSynagogue(id)` global callback bridges infowindow HTML buttons → React state
- **Sidebar collapse behavior**
  - Desktop (≥640px): open by default, collapses inline (map expands to fill)
  - Mobile (<640px): closed by default, slides in as absolute overlay with semi-transparent backdrop
  - Hamburger (☰) / close (✕) toggle button anchored top-left of map area
  - Mobile close button also lives inside the sidebar header (always reachable)
- **Dual-range year filter** overlay at bottom of map
  - Two thumbs on a shared track; blue fill shows active range
  - Filter logic: `founded <= endYear && closed >= startYear` (overlap, not point-in-time)
  - Defaults to full range (1745–2024) — all data visible
  - CSS for the custom dual-range slider is in `globals.css` (`.range-input` class)
- **Status legend** overlay top-right

### MiniMap.tsx
Non-interactive mini-map embedded in the detail page hero box:
- Props: `lat`, `lng`, `status`, `mapUrl`
- Loads the same Google Maps JS API (reuses script tag if already present)
- `disableDefaultUI: true`, `gestureHandling: 'none'` — pure preview, not interactive
- Same SVG marker style as the full map, color-coded by status
- Entire component is a `<Link>` — clicking navigates to full map focused on that synagogue
- Blue "🗺️ View on Map" bar overlaid at the bottom
- Falls back to a plain button link when no coordinates exist

### RLS Policies
Key policies for anonymous (public) read access:
- `synagogues`: `approved = true`
- `addresses`: synagogue must be approved
- `history_entries`: `approved = true`
- `rabbis`: `approved = true`
- `images`: `approved = true`

All imported records have `approved = true`.

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
```

## Data Source

Original data came from an Excel file (`20260221_Phila_Synagogue_Data.xlsx`) with 875 rows representing 562 synagogues. Each synagogue spans multiple rows in the source data:
- Row 0: name, primary address, neighborhood, founded year, closed year, history text
- Continuation rows: additional historical addresses, more history text, rabbi list (lines starting with `>`)

Import was done in two phases:
1. `import_data_fixed.sql` — synagogues + primary addresses (with geocoded lat/lng)
2. `import_history_rabbis.sql` — history_entries, rabbis, historical addresses (order 1+)

### Dark Mode

The app automatically matches the OS/device theme preference via CSS `prefers-color-scheme` media query. No JavaScript or manual toggle is needed.

- `tailwind.config.js`: `darkMode: 'media'` — Tailwind `dark:` variants respond directly to OS preference
- `app/globals.css`: CSS variables declared in `@media (prefers-color-scheme: dark) { :root { ... } }` block; slider thumb border also dark-adapted
- All page and component files use `dark:` Tailwind variants throughout
- Google Maps tiles: `DARK_MAP_STYLES` (standard night-mode style array) is applied when `prefers-color-scheme: dark` is detected on map initialization; a `matchMedia` change listener updates the style dynamically if the user switches mid-session
- `DARK_MAP_STYLES` is defined in both `MapClient.tsx` and `MiniMap.tsx`

### Overlapping Map Markers

Multiple synagogues at the same primary address are offset into a small circle so each marker is visually distinct when zoomed in.

- `computeDisplayCoords(synagogues, focusId)` — pure module-level function in `MapClient.tsx`
- Groups markers by exact `${lat},${lng}` key; for groups of n ≥ 2, distributes at `RADIUS = 0.0003°` (≈33m) using `sin/cos` radial offsets
- Focused marker always stays at original coords so the map centers correctly
- `focusOnSynagogue()` also pans to the real coordinates, not the display offset
- Offsets are invisible at zoom ≤ 13; visibly distinct at zoom 15+; clearly distinct at zoom 16+

## Current Status & Known Issues

- Historical addresses (non-geocoded) display in detail pages but don't appear as map markers
- `google.maps.Marker` is deprecated — future migration to `AdvancedMarkerElement` recommended
- No authentication UI built yet (Supabase Auth is configured but no login page exists)
- `edit_proposals` table is ready but no submission form built yet
- Images table is empty — no upload workflow built yet
- `/about` page not yet created; nav does not include an About link yet
- Legacy pages `app/test/`, `app/test-data/`, and `app/page.20260221-1.tsx` can be deleted

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with stats (562 synagogues, 83 active, 280+ years) |
| `/map` | Full-screen map with collapsible sidebar (search, filters, detail panel), dual-range year filter, status legend, Street View |
| `/synagogues` | Browseable list with text search, status filter pills, year range filter, sortable columns, expandable rows |
| `/synagogues/[id]` | Detail page: hero with mini-map, all addresses, rabbi list, history timeline, photo grid (empty) |
| `/about` | Not yet built — no nav link yet |

## Recent Work

### Session ending 2026-03-01

- **Dark mode** — full system-preference dark mode across all pages and components; Google Maps tiles switch to night style; `darkMode: 'media'` Tailwind strategy
- **Overlapping marker offset** — `computeDisplayCoords()` in `MapClient.tsx` radially offsets markers sharing the same primary address; focused marker stays at real coords

### Session ending 2026-02-22

All committed to `master` and deployed to Vercel:

- **Map sidebar** — search by name/rabbi, neighborhood dropdown, results list, `SynagoguePanel` detail view with Street View link
- **Sidebar collapse** — desktop open by default, mobile closed by default with hamburger toggle and backdrop
- **Dual-range year filter** — replaced single slider; shows synagogues active during any overlap with selected range
- **MiniMap on detail page** — non-interactive Google Maps preview in hero box, links to full map
- **Rabbis on map** — `app/map/page.tsx` now fetches `rabbis(name, title)` from Supabase so rabbi search works on the map sidebar
