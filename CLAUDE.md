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
  rabbis/
    page.tsx                      # Leadership directory (server component, force-dynamic)
    [slug]/
      page.tsx                    # Leader profile page (server component, force-dynamic)
  leadership/
    page.tsx                      # Alias → /rabbis page
    [slug]/
      page.tsx                    # Alias → /rabbis/[slug] page
  contributions/
    page.tsx                      # My contributions (authenticated users)
    ContributionsClient.tsx
  admin/
    page.tsx                      # Admin dashboard (editor+ only)
    AdminClient.tsx
    users/
      page.tsx                    # User management (super_admin only)
      UsersClient.tsx
    migration/
      page.tsx                    # Migration verification dashboard (admin+ only)
  api/
    synagogues/[id]/full-details/route.ts
    synagogues/[id]/merge-suggestions/route.ts
    rabbis/[id]/route.ts
    rabbis/[id]/merge-suggestions/route.ts
    rabbi-profiles/[id]/route.ts
    images/[id]/route.ts
    addresses/[id]/route.ts
    history/[id]/route.ts
    history/reorder/route.ts
    proposals/[id]/approve/route.ts
    users/[id]/promote/route.ts
    users/[id]/demote/route.ts
    admin/generate-slugs/route.ts
    admin/delete-test-data/route.ts
  test/
    page.tsx                      # Legacy DB connection test (can be deleted)
  test-data/
    page.tsx                      # Legacy data/geocoding test (can be deleted)

components/
  layout/
    AppHeader.tsx                 # Mobile-responsive site header with hamburger nav
  map/
    MapClient.tsx                 # Interactive Google Maps client component (see below)
    MiniMap.tsx                   # Non-interactive mini-map for detail page hero
  synagogues/
    SynagoguesClient.tsx          # Browse page with search/filter UI
    SynagogueDetail.tsx           # Detail page UI with leadership sections, history, images
    HistoryList.tsx               # Sortable history timeline component
  rabbis/
    RabbisClient.tsx              # Leadership directory with search
    RabbiDetail.tsx               # Leader profile layout
  auth/
    NavAuth.tsx                   # Top-nav auth dropdown
    AuthModal.tsx                 # Login/signup modal
    LoginForm.tsx                 # Login form with password reset
    SignupForm.tsx                # Registration form
  edit/                           # Proposal/create/merge/split/delete buttons + forms
    SuggestEdit{Button,Form}.tsx
    SuggestAddress{Button,Form}.tsx
    SuggestRabbi{Button,Form}.tsx
    SuggestHistory{Button,Form}.tsx
    SuggestRabbiProfile{Button,Form}.tsx
    Create{Synagogue,Rabbi}{Button,Form}.tsx
    Merge{Synagogue,Rabbi}Button.tsx
    Split{Synagogue,Rabbi}Button.tsx
    Delete{Synagogue,Rabbi}Button.tsx
    AddRabbiAffiliationButton.tsx   # Multi-step: search clergy → add affiliation details
    AddSynagogueAffiliationButton.tsx
    AddLayLeaderButton.tsx          # Add lay leader to synagogue
    AddStaffButton.tsx              # Add staff member to synagogue
    EditAffiliationButton.tsx       # Edit existing affiliation; can convert rabbi → chazzan
    AddRelationshipButton.tsx       # Typed organizational relationships between synagogues
    AddLinkButton.tsx               # External links for synagogues and rabbi profiles
    DeleteRelationshipModal.tsx
  photos/
    PhotoUploadButton.tsx
    PhotoUploadForm.tsx
  common/
    ConfirmDialog.tsx
    LinksSection.tsx              # Renders approved links for any entity

lib/
  supabase/
    client.ts                     # Shared Supabase client + TS type definitions (legacy; used by test pages only)
    server.ts                     # Server-side auth helpers
  types/
    database.types.ts             # Auto-generated Supabase TypeScript types (full schema)
    leadership.ts                 # PersonProfile and Affiliation types + predefined role lists
  queries/
    leadership.ts                 # Database queries for person_profiles and affiliations
  hooks/
    useUserRole.ts                # Role-checking hook

middleware.ts                     # Auth session refresh on every request

supabase/
  migrations/                     # SQL migration files for schema changes
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

### rabbis *(legacy — read-only)*
Original 373 records imported from source Excel data. Superseded by `person_profiles` + `affiliations`.
- `synagogue_id` → synagogues.id
- `name`, `title`, `start_year`, `end_year`, `notes`
- `approved` (boolean)

### rabbi_profiles *(legacy — read-only)*
Original canonical rabbi biographies. Superseded by `person_profiles`.
- `id`, `slug`, `canonical_name`
- `birth_year`, `circa_birth`, `death_year`, `circa_death`, `biography`
- `approved` (boolean), `deleted` (boolean)

### person_profiles *(active — primary leadership table)*
Unified leader profiles replacing `rabbi_profiles`. All queries now use this table.
- `id`, `slug` (only set for clergy: rabbi/chazzan), `canonical_name`
- `person_type`: `rabbi` | `chazzan` | `lay_leader` | `staff` | `other`
- `birth_year`, `circa_birth`, `death_year`, `circa_death`, `biography`, `birthplace`, `death_place`
- `seminary`, `ordination_year`, `denomination`, `languages`, `publications`, `achievements`
- `approved` (boolean), `deleted` (boolean), `deleted_by`, `deleted_at`, `created_at`, `updated_at`

### affiliations *(active — primary affiliation table)*
Links person_profiles to synagogues. Replaces `rabbis` table.
- `synagogue_id` → synagogues.id, `person_profile_id` → person_profiles.id
- `affiliation_category`: `clergy` | `lay_leader` | `staff` | `other`
- `role_title`, `start_year`, `end_year`, `notes`
- `approved` (boolean)

### images
Schema ready for photo uploads; upload workflow is live for rabbis and synagogues.
- `synagogue_id` → synagogues.id
- `url`, `caption`, `description`, `year`, `circa_year`
- `is_primary`, `display_order`
- `photographer`, `source`, `credit_line`
- `people_names` (array), `people_metadata` (jsonb)
- `approved` (boolean)

### links
External links attached to any entity (synagogue or person profile). Added via proposal workflow.
- `entity_type` (`synagogue` | `rabbi_profile`), `entity_id`
- `link_type` (e.g. `website`, `wikipedia`, `findagrave`, etc.)
- `url`, `title`, `description`, `display_order`
- `approved` (boolean), `deleted` (boolean)

### synagogue_relationships
Typed directional relationships between synagogues (e.g. predecessor/successor, merger, branch).
- `synagogue_id`, `related_synagogue_id`
- `relationship_type`: one of `merged_into`, `merged_from`, `split_into`, `split_from`, `predecessor`, `successor`, `parent_organization`, `branch_of`
- `relationship_year`, `notes`
- `approved` (boolean), `deleted` (boolean)

### edit_proposals
Community contribution queue; also used for admin operations (merge, split, delete, links, relationships).
- `proposal_type`: covers all operations (see Proposal Workflow section)
- `proposed_data`, `current_data` — new vs old values
- `submitter_note` — contributor's reason/source
- `created_by` — user ID (contributor tracking)
- `status`: `pending` | `approved` | `rejected`

## Leadership Data Model

The app uses a generalized leadership model (`person_profiles` + `affiliations`) that replaced the original rabbi-only model. **Phase 6 cutover is complete — all queries now use the new tables.**

### Person Types
- `rabbi` — has slug, has profile page at `/rabbis/[slug]`
- `chazzan` — has slug, has profile page at `/rabbis/[slug]`
- `lay_leader` — no slug, display-only in synagogue detail
- `staff` — no slug, display-only in synagogue detail
- `other` — no slug, display-only in synagogue detail

### Predefined Role Lists (lib/types/leadership.ts)
- **CLERGY_ROLES**: Rabbi, Senior Rabbi, Lead Rabbi, Associate Rabbi, Assistant Rabbi, Rabbi Emeritus, Cantor, Chazzan, Senior Cantor, Cantor Emeritus, Other
- **LAY_LEADER_ROLES**: President, Vice President, Treasurer, Secretary, Facilities Chair, Security Chair, Membership Chair, Education Chair, Social Action Chair, Ritual Chair, Community Engagement Chair, Philanthropy Chair, Other
- **STAFF_ROLES**: Executive Director, Education Director, Youth Director, Administrator, Office Manager, Other

### Slug Generation
- Only clergy (rabbi/chazzan) get slugs
- Format: `rabbi-<canonical-name>` or `chazzan-<canonical-name>` (slugified)
- Generated via `generateSlug()` helper in `lib/types/leadership.ts`
- Batch slug generation available via `POST /api/admin/generate-slugs`

### Database Queries (lib/queries/leadership.ts)
- `getAllPersonProfiles()` — all approved, non-deleted profiles
- `getPersonProfileBySlug(slug)` — get profile by slug
- `getPersonProfileById(id)` — get profile by ID
- `getAffiliationsBySynagogue(synagogueId)` — all affiliations for a synagogue
- `getAffiliationsByPerson(personProfileId)` — all affiliations for a person

## Proposal Workflow

All leadership changes go through `edit_proposals` before applying. Proposal types:

| Type | Description |
|------|-------------|
| `rabbi_affiliation_new` | Add clergy affiliation to synagogue |
| `lay_leader_affiliation_new` | Add lay leader to synagogue |
| `staff_affiliation_new` | Add staff member to synagogue |
| `affiliation_edit` | Modify existing affiliation (also handles rabbi→chazzan conversion) |
| `rabbi_profile_new` | Create new person profile |
| `rabbi_profile_edit` | Modify person profile |
| `rabbi_profile_delete` | Soft-delete person profile |
| `rabbi_profile_merge` | Merge two profiles into one |
| `rabbi_profile_split` | Split one profile into two |
| `synagogue_edit` | Modify synagogue fields |
| `address_edit` | Modify address |
| `history_edit` | Modify history entry |
| `image_upload` | Photo upload |
| `link_add` | Add external link |
| `relationship_add` | Add synagogue relationship |

Editors approve/reject from the admin dashboard. Approved proposals write to the live tables.

## SynagogueDetail — Leadership Sections

The synagogue detail page (`components/synagogues/SynagogueDetail.tsx`) now renders three separate leadership sections:

1. **Leadership (Clergy)** — rabbis and chazzanim with edit buttons, "Add Existing Leader" search
2. **Lay Leaders** — lay leadership with "Add Lay Leader" button
3. **Staff** — staff members with "Add Staff" button

Each affiliation row shows role title, years, notes, and an edit button (editor+ only).

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
- Markers use `google.maps.marker.AdvancedMarkerElement` (migrated from deprecated `Marker` in March 2026 — requires `mapId` to be set)
- Marker style: SVG circle color-coded by status with ✡️ emoji center; focused marker is yellow/bouncing
- `streetViewControl: true` — pegman drag-to-streetview is enabled on the full map

### Map URL Params
The map page accepts query params for focused view:
- `?lat=40.07&lng=-75.13&id=<uuid>` — centers map, zooms to level 16, renders focused synagogue as a bouncing Star of David marker (yellow, high contrast for color blindness accessibility)
- Arriving from a detail page via this URL also auto-populates the sidebar with that synagogue's detail panel

### MapClient.tsx — Full Feature Set
The map page (`/map`) is a full-screen layout with:
- **Left sidebar (320px)** with collapsible toggle
  - Search by synagogue name or leader name
  - Neighborhood dropdown filter
  - Results list (click → pan + zoom to marker)
  - `SynagoguePanel` detail view: status badge, founded/closed years, address, leaders (up to 5 + overflow), Street View link, "View full history →" link
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
- `person_profiles`: `approved = true AND deleted = false`
- `affiliations`: `approved = true`
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
- `/about` page not yet created; nav does not include an About link yet
- Legacy pages `app/test/`, `app/test-data/`, and `app/page.20260221-1.tsx` can be deleted
- `GET /api/rabbi-profiles/[id]` still queries old `rabbi_profiles` table — needs migration to `person_profiles`
- `person_relationships` table exists in DB but has no UI
- Full-text search via `search_vector` column not yet implemented

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with stats (562 synagogues, 83 active, 280+ years) |
| `/map` | Full-screen map with collapsible sidebar (search, filters, detail panel), dual-range year filter, status legend, Street View |
| `/synagogues` | Browseable list with text search, status filter pills, neighborhood dropdown, year range filter, sortable columns, expandable rows |
| `/synagogues/[id]` | Detail page: hero with mini-map, all addresses, leadership sections (clergy/lay/staff), sorted history timeline, organizational relationships, external links, photo gallery |
| `/rabbis` | Directory of all clergy profiles (rabbis + chazzanim), alphabetically grouped, searchable |
| `/leadership` | Alias to `/rabbis` |
| `/rabbis/[slug]` | Clergy profile: biography, synagogue affiliations, photo gallery, external links; also accessible via `/leadership/[slug]` |
| `/contributions` | Authenticated users can review their submitted proposals and approval status |
| `/admin` | Editor/admin proposal review queue (all proposal types); super_admin user management |
| `/admin/users` | User role management (super_admin only) |
| `/admin/migration` | Data migration verification dashboard — counts, breakdowns, duplicate/integrity checks |
| `/about` | Not yet built — no nav link yet |

## Recent Work

### Session ending 2026-03-27

- **Phase 6 cutover complete** — all queries migrated from old `rabbi_profiles`/`rabbis` tables to new `person_profiles`/`affiliations` tables; old code commented out for rollback reference
- **Chazzan support** — full support for chazzan as a distinct person type; chazzanim get slugs and profile pages; can convert rabbi → chazzan via `EditAffiliationButton`; admin interface handles chazzan proposal types
- **Lay leader + staff addition** — `AddLayLeaderButton` and `AddStaffButton` components for adding non-clergy affiliations to synagogues via proposal workflow
- **Edit affiliations** — `EditAffiliationButton` allows editors to modify any existing affiliation including rabbi→chazzan conversion; shows in all leadership sections
- **Leadership filter buttons** — filter UI on synagogue detail page to show all / clergy only / lay leaders / staff
- **Migration verification dashboard** — `/admin/migration` page with data integrity checks: old vs new table counts, person type breakdowns, affiliation category counts, slug consistency
- **Admin interface for all clergy types** — proposal review queue (`AdminClient.tsx`) handles all new proposal types with correct field labels and display

### Session ending 2026-03-22

- **Mobile navigation header** — `AppHeader.tsx` with responsive hamburger menu (Escape to close, body scroll lock); replaces per-page nav in all layouts
- **Sorting on detail pages** — sortable history timeline and leader lists on synagogue detail pages
- **Data model types (Steps 3A+3B)** — `lib/types/leadership.ts` defines `PersonProfile` and `Affiliation` types; `lib/types/database.types.ts` auto-generated from Supabase schema
- **Organizational relationships** — `AddRelationshipButton.tsx` allows editors to propose typed links between synagogues (merged_into, split_into, predecessor, parent_organization); stored in `synagogue_relationships` table; deletable via `DeleteRelationshipModal.tsx`
- **External links** — `AddLinkButton.tsx` allows editors to propose external URLs for synagogues and rabbis; stored in `links` table; rendered via `LinksSection.tsx`
- **Google Maps AdvancedMarkerElement migration** — `MapClient.tsx` and `MiniMap.tsx` migrated from deprecated `google.maps.Marker` to `google.maps.marker.AdvancedMarkerElement`; various performance improvements
- **Rabbi affiliation modals** — new UI for linking a clergy profile to a synagogue and vice versa (`AddRabbiAffiliationButton`, `AddSynagogueAffiliationButton`)
- **Merge/split for rabbis and synagogues** — full proposal workflows for merging two records or splitting one into two
- **Delete synagogue / rabbi** — soft-delete with role guard; deleted records hidden from browse and map
- **Create new synagogue / rabbi** — editors can create net-new records via modal forms; neighborhood auto-detected from address via Google Maps Geocoding API
- **Neighborhood filter** — new dropdown filter on `/synagogues` browse page; neighborhood links on detail pages filter to that neighborhood
- **Contributor tracking** — each edit proposal records the submitting user for admin review
- **Editing buttons hidden when logged out** — contribution UI is suppressed for unauthenticated visitors

### Session ending 2026-03-01

- **Dark mode** — full system-preference dark mode across all pages and components; Google Maps tiles switch to night style; `darkMode: 'media'` Tailwind strategy
- **Overlapping marker offset** — `computeDisplayCoords()` in `MapClient.tsx` radially offsets markers sharing the same primary address; focused marker stays at real coords

### Session ending 2026-02-22

All committed to `master` and deployed to Vercel:

- **Map sidebar** — search by name/leader, neighborhood dropdown, results list, `SynagoguePanel` detail view with Street View link
- **Sidebar collapse** — desktop open by default, mobile closed by default with hamburger toggle and backdrop
- **Dual-range year filter** — replaced single slider; shows synagogues active during any overlap with selected range
- **MiniMap on detail page** — non-interactive Google Maps preview in hero box, links to full map
- **Leaders on map** — `app/map/page.tsx` fetches leader data from Supabase so leader search works on the map sidebar
