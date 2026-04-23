# Philadelphia Historical Synagogues — Project Context

> **Last updated**: 2026-04-23 (session 7.4)
> **Status**: Production (deployed to Vercel, auto-deploys from GitHub `master`)

A web application documenting hundreds of synagogues in the Philadelphia area, spanning from 1745 to the present day. Built to preserve Jewish heritage through interactive mapping, community contributions, and detailed historical records.

---

## Quick Links

| Route | Purpose |
|-------|---------|
| `/` | Homepage with stats and navigation |
| `/map` | Full-screen Google Maps with search, filters, year slider |
| `/synagogues` | Browseable list with search/filter |
| `/synagogues/[id]` | Synagogue detail: addresses, leaders, history, photos, links |
| `/rabbis` | Clergy directory (rabbis + chazzanim) |
| `/rabbis/[slug]` | Clergy profile page |
| `/leadership`, `/leadership/[slug]` | Alias routes → `/rabbis` |
| `/contributions` | User's own submitted proposals |
| `/admin` | Editor/admin proposal review queue |
| `/admin/users` | Role management (super_admin only) |
| `/admin/migration` | Data migration verification dashboard |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS (`darkMode: 'media'`) |
| UI Primitives | Radix UI (Dialog, Dropdown, Select, Slider, Tabs, Toast) |
| Database | Supabase (PostgreSQL) with RLS |
| Auth | Supabase Auth + `@supabase/auth-helpers-nextjs` |
| Maps | Google Maps JavaScript API (manual script injection, `AdvancedMarkerElement`) |
| Icons | Lucide React |
| Drag & Drop | `@dnd-kit` (history reordering) |
| Validation | Zod |
| Hosting | Vercel (auto-deploys from `master`) |
| Font | Inter (Google Fonts) |

---

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # server-side admin ops only
```

---

## Project Structure

```
app/
  layout.tsx                        # Root layout (Inter font, metadata, favicon)
  page.tsx                          # Homepage: stats, hero, CTAs
  globals.css                       # Global styles + dual-range slider CSS (.range-input)
  map/page.tsx                      # Map page (server, force-dynamic)
  synagogues/
    page.tsx                        # Browse/list (server, force-dynamic)
    [id]/page.tsx                   # Detail page (server, force-dynamic)
  rabbis/
    page.tsx                        # Clergy directory (server, force-dynamic)
    [slug]/page.tsx                 # Clergy profile (server, force-dynamic)
  leadership/
    page.tsx                        # Re-exports → /rabbis
    [slug]/page.tsx                 # Re-exports → /rabbis/[slug]
  contributions/
    page.tsx
    ContributionsClient.tsx
  admin/
    page.tsx                        # Editor+ only
    AdminClient.tsx
    users/
      page.tsx                      # super_admin only
      UsersClient.tsx
    migration/page.tsx              # Data integrity dashboard
  api/
    proposals/[id]/approve/route.ts
    addresses/[id]/route.ts
    history/[id]/route.ts
    history/reorder/route.ts
    images/[id]/route.ts
    rabbis/[id]/route.ts
    rabbis/[id]/merge-suggestions/route.ts
    rabbi-profiles/[id]/route.ts    # LEGACY — still queries old table
    synagogues/[id]/full-details/route.ts
    synagogues/[id]/merge-suggestions/route.ts
    users/[id]/promote/route.ts
    users/[id]/demote/route.ts
    admin/generate-slugs/route.ts
    admin/delete-test-data/route.ts

components/
  layout/AppHeader.tsx              # Responsive header with hamburger nav
  map/
    MapClient.tsx                   # Full-screen interactive map
    MiniMap.tsx                     # Non-interactive detail-page map preview
  synagogues/
    SynagogueDetail.tsx             # Main detail page UI
    SynagoguesClient.tsx            # Browse page UI with filters
    HistoryList.tsx                 # Sortable history timeline
  rabbis/
    RabbisClient.tsx                # Clergy directory UI
    RabbiDetail.tsx                 # Clergy profile UI
  auth/
    NavAuth.tsx / AuthModal.tsx / LoginForm.tsx / SignupForm.tsx
  edit/                             # 28 proposal/edit components (see below)
  photos/
    PhotoUploadButton.tsx / PhotoUploadForm.tsx
  common/
    ConfirmDialog.tsx / LinksSection.tsx
    ClergyCategorySelect.tsx          # Reusable clergy type dropdown (rabbi/chazzan)
  admin/
    MigrationDashboard.tsx

lib/
  supabase/
    client.ts                       # Shared Supabase client (legacy test pages only)
    server.ts                       # Server-side auth helpers
  types/
    database.types.ts               # Auto-generated Supabase TypeScript types
    leadership.ts                   # PersonProfile, Affiliation types + role lists
  queries/
    leadership.ts                   # DB queries: person_profiles, affiliations
  geocoding.ts                      # Google Maps geocoding utilities

hooks/
  useUserRole.ts                    # Role-checking hook

middleware.ts                       # Supabase session refresh on every request

supabase/
  migrations/                       # SQL migration files
  schema.sql / seed.sql
```

---

## Database Schema

All tables use UUID primary keys. RLS enabled on all tables. All imported records have `approved = true`.

### Primary Tables (Active)

#### `synagogues` — 562 records
- `id`, `name`, `status` (`active` | `closed` | `merged` | `unknown`)
- `founded_year`, `founded_text`, `closed_year`, `closed_text`
- `approved` (boolean), `search_vector` (tsvector, not yet used)

#### `addresses` — 424 geocoded records
- `synagogue_id` → synagogues
- `street_address`, `neighborhood`, `city`, `state`, `zip_code`
- `latitude`, `longitude` (numeric)
- `is_current`, `address_order` (0 = primary), `start_year`, `end_year`
- `geocode_quality` (`exact` | `approximate` | `low_confidence`)

#### `person_profiles` — Active primary leadership table
Replaced `rabbi_profiles`. All queries now use this table.
- `id`, `slug` (clergy only), `canonical_name`
- `person_type`: `rabbi` | `chazzan` | `lay_leader` | `staff` | `other`
- `birth_year`, `circa_birth`, `death_year`, `circa_death`
- `biography`, `birthplace`, `death_place`, `seminary`, `ordination_year`
- `denomination`, `languages`, `publications`, `achievements`
- `approved`, `deleted`, `deleted_by`, `deleted_at`, `created_at`, `updated_at`

#### `affiliations` — Active primary affiliation table
Replaced `rabbis`. Links person_profiles to synagogues.
- `synagogue_id` → synagogues, `person_profile_id` → person_profiles
- `affiliation_category`: `clergy` | `lay_leader` | `staff` | `other`
- `role_title`, `start_year`, `end_year`, `notes`
- `approved`

#### `history_entries` — 325 records
- `synagogue_id` → synagogues
- `entry_type`: `ethnic_origin` | `rabbi` | `event` | `building` | `merger` | `general`
- `content`, `year`, `year_range_start`, `year_range_end`, `circa`
- `source`, `source_url`, `display_order`, `approved`

#### `images`
- `synagogue_id` (or linked to person via entity fields)
- `url`, `storage_path`, `caption`, `description`, `year`, `circa_year`
- `is_primary`, `display_order`, `photographer`, `source`, `credit_line`
- `people_names` (array), `people_metadata` (jsonb)
- `approved`

#### `links`
- `entity_type` (`synagogue` | `rabbi_profile`), `entity_id`
- `link_type` (e.g., `website`, `wikipedia`, `findagrave`)
- `url`, `title`, `description`, `display_order`
- `approved`, `deleted`

#### `synagogue_relationships`
- `synagogue_id`, `related_synagogue_id`
- `relationship_type`: `merged_into` | `merged_from` | `split_into` | `split_from` | `predecessor` | `successor` | `parent_organization` | `branch_of`
- `relationship_year`, `notes`, `approved`, `deleted`

#### `edit_proposals`
- `proposal_type` (23 types — see below)
- `proposed_data`, `current_data` (JSON)
- `submitter_note`, `review_notes`
- `created_by` (user ID), `status`: `pending` | `approved` | `rejected`

### Legacy Tables (Read-Only, Do Not Write)
- `rabbis` — Original 373 import records; superseded by `affiliations`
- `rabbi_profiles` — Original canonical bios; superseded by `person_profiles`

### Support Tables
- `user_profiles` — User metadata and roles
- `storage_config` — Storage provider base URLs
- `person_relationships` — Inter-person relationships (future, no UI yet)

---

## Leadership Data Model

The Phase 6 cutover is complete. All queries use `person_profiles` + `affiliations`.

### Person Types
| Type | Slug | Profile Page |
|------|------|-------------|
| `rabbi` | Yes (`rabbi-<name>`) | `/rabbis/[slug]` |
| `chazzan` | Yes (`chazzan-<name>`) | `/rabbis/[slug]` |
| `lay_leader` | No | Display only in synagogue detail |
| `staff` | No | Display only in synagogue detail |
| `other` | No | Display only in synagogue detail |

### Predefined Role Lists (`lib/types/leadership.ts`)
- **CLERGY_ROLES**: Rabbi, Senior Rabbi, Lead Rabbi, Associate Rabbi, Assistant Rabbi, Rabbi Emeritus, Cantor, Chazzan, Senior Cantor, Cantor Emeritus, Other
- **LAY_LEADER_ROLES**: President, VP, Treasurer, Secretary, Facilities/Security/Membership/Education/Social Action/Ritual/Community Engagement/Philanthropy Chair, Other
- **STAFF_ROLES**: Executive Director, Education Director, Youth Director, Administrator, Office Manager, Other

### Slug Format
`rabbi-<canonical-name-slugified>` or `chazzan-<canonical-name-slugified>`  
Generated via `generateSlug()` in `lib/types/leadership.ts`.  
Batch regeneration: `POST /api/admin/generate-slugs`

### Database Queries (`lib/queries/leadership.ts`)
- `getAllPersonProfiles()` — all approved, non-deleted profiles
- `getPersonProfileBySlug(slug)` — by slug
- `getPersonProfileById(id)` — by ID
- `getAffiliationsBySynagogue(synagogueId)` — all for a synagogue
- `getAffiliationsByPerson(personProfileId)` — all for a person

---

## Proposal Workflow

All leadership changes go through `edit_proposals` before applying to live tables.

| Proposal Type | Description |
|--------------|-------------|
| `rabbi_affiliation_new` | Add clergy affiliation to synagogue |
| `lay_leader_affiliation_new` | Add lay leader to synagogue |
| `staff_affiliation_new` | Add staff member to synagogue |
| `affiliation_edit` | Modify existing affiliation; `new_person_type` field handles rabbi↔chazzan conversion in either direction |
| `rabbi_profile_new` | Create new person profile |
| `rabbi_profile_edit` | Modify person profile |
| `rabbi_profile_delete` | Soft-delete person profile |
| `rabbi_profile_merge` | Merge two profiles into one |
| `rabbi_profile_split` | Split one profile into two |
| `synagogue_edit` | Modify synagogue fields |
| `synagogue_new` | Create new synagogue |
| `synagogue_delete` | Soft-delete synagogue |
| `synagogue_merge` | Merge two synagogues |
| `synagogue_split` | Split one synagogue into two |
| `address_edit` | Modify address |
| `address_new` | Add new address |
| `history_edit` | Modify history entry |
| `history_new` | Add history entry |
| `image_upload` | Photo upload |
| `link_add` | Add external link |
| `relationship_add` | Add synagogue relationship |
| `relationship_delete` | Remove synagogue relationship |

Editors approve/reject from `/admin`. Approved proposals write to the live tables.

---

## Edit/Proposal Components (`components/edit/`)

28 components total:

| Component | Purpose |
|-----------|---------|
| `AddRabbiAffiliationButton` | Multi-step: search clergy → add affiliation details |
| `AddSynagogueAffiliationButton` | Add synagogue to clergy profile |
| `AddLayLeaderButton` | Add lay leader to synagogue |
| `AddStaffButton` | Add staff member to synagogue |
| `EditAffiliationButton` | Edit existing affiliation; dropdown to change type (rabbi↔chazzan, both directions) |
| `AddLinkButton` | Add external link to synagogue or rabbi profile |
| `AddRelationshipButton` | Add typed relationship between synagogues |
| `DeleteRelationshipModal` | Remove synagogue relationship |
| `SuggestEditButton/Form` | Propose field edits to synagogue |
| `SuggestAddressButton/Form` | Propose new address |
| `SuggestHistoryButton/Form` | Propose history entry |
| `SuggestRabbiButton/Form` | Propose new clergy leader from synagogue detail page; creates `rabbi_profile_new` proposal with affiliation pre-linked to that synagogue |
| `SuggestRabbiProfileButton/Form` | Propose clergy profile edit |
| `CreateRabbiButton/Form` | Create new clergy profile |
| `CreateSynagogueButton/Form` | Create new synagogue |
| `DeleteRabbiButton` | Soft-delete clergy profile |
| `DeleteSynagogueButton` | Soft-delete synagogue |
| `MergeRabbiButton` | Merge duplicate clergy profiles |
| `MergeSynagogueButton` | Merge duplicate synagogues |
| `SplitRabbiButton` | Split clergy profile into two |
| `SplitSynagogueButton` | Split synagogue into two |

---

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/proposals/[id]/approve` | Approve/reject edit proposal (editor+) |
| DELETE | `/api/addresses/[id]` | Soft-delete address |
| DELETE | `/api/history/[id]` | Soft-delete history entry |
| POST | `/api/history/reorder` | Reorder history display_order |
| DELETE | `/api/images/[id]` | Delete or unapprove image |
| DELETE | `/api/rabbis/[id]` | Soft-delete rabbi (legacy) |
| GET | `/api/rabbis/[id]/merge-suggestions` | Get duplicate clergy candidates |
| PUT | `/api/rabbi-profiles/[id]` | Update rabbi profile (LEGACY — old table) |
| GET | `/api/synagogues/[id]/full-details` | Summary counts for a synagogue |
| GET | `/api/synagogues/[id]/merge-suggestions` | Duplicate synagogue candidates |
| POST | `/api/users/[id]/promote` | Upgrade user role |
| POST | `/api/users/[id]/demote` | Downgrade user role |
| POST | `/api/admin/generate-slugs` | Batch generate person profile slugs |
| POST | `/api/admin/delete-test-data` | Clean up test records |

---

## Key Implementation Patterns

### Supabase Client — Server Components
All server components create their own client directly. Never use the shared browser client in server components:
```ts
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```
`lib/supabase/client.ts` is for legacy test pages only.

### force-dynamic
All data-fetching pages use:
```ts
export const dynamic = 'force-dynamic'
export const revalidate = 0
```

### Soft Deletes
All entities have `deleted`, `deleted_by`, `deleted_at` fields. Queries filter with:
```ts
.or('deleted.is.null,deleted.eq.false')
```

### Image Storage URL Resolution
Images store a `storage_path`. The full URL is constructed by looking up the base URL from the `storage_config` table (`provider='supabase'`), falling back to `NEXT_PUBLIC_SUPABASE_URL`.

### Auth & Roles
- `middleware.ts` refreshes Supabase session on every request
- Roles (ascending): `viewer` → `contributor` → `editor` → `admin` → `super_admin`
- `useUserRole()` hook for client components
- Admin endpoints use `SUPABASE_SERVICE_ROLE_KEY` for privileged ops (e.g., fetching user emails)
- All editing UI is hidden for unauthenticated visitors

### Google Maps
- Loaded via manual script tag injection (not `@react-google-maps/api`)
- Requires `@types/google.maps` dev dependency
- Env var: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- Uses `google.maps.marker.AdvancedMarkerElement` (migrated from deprecated `Marker` — requires `mapId`)
- `MapClient` wrapped in `<Suspense>` (required by `useSearchParams()`)
- Dark mode: `DARK_MAP_STYLES` applied when `prefers-color-scheme: dark`; `matchMedia` listener updates dynamically

### Map URL Params
```
/map?lat=40.07&lng=-75.13&id=<uuid>
```
Centers map at zoom 16, renders focused marker in yellow/bouncing, auto-populates sidebar panel.

### Overlapping Markers
`computeDisplayCoords()` in `MapClient.tsx` offsets markers at the same coordinates into a small radial circle (radius `0.0003°` ≈ 33m). Focused marker stays at real coords. Invisible at zoom ≤13, clearly distinct at zoom 16+.

### Dark Mode
Automatic via CSS `prefers-color-scheme` — no JS toggle needed.
- `tailwind.config.js`: `darkMode: 'media'`
- CSS variables declared in `@media (prefers-color-scheme: dark)` block in `globals.css`
- All components use `dark:` Tailwind variants

---

## SynagogueDetail — Leadership Sections

Three separate sections rendered in `components/synagogues/SynagogueDetail.tsx`:

1. **Leadership (Clergy)** — rabbis + chazzanim; links to profile pages; "Add Existing Leader" search; `EditAffiliationButton`
2. **Lay Leaders** — with "Add Lay Leader" button; no profile pages
3. **Staff** — with "Add Staff" button; no profile pages

Each row shows: role title, years, notes, edit button (editor+ only).

---

## MapClient.tsx — Full Feature Set

**Left sidebar (320px, collapsible)**
- Search by synagogue name or leader name
- Neighborhood dropdown filter
- Results list (click → pan + zoom)
- `SynagoguePanel`: status badge, years, address, up to 5 leaders, Street View link, detail page link
- `window.__selectSynagogue(id)` global callback bridges infowindow HTML → React state

**Sidebar collapse behavior**
- Desktop (≥640px): open by default, collapses inline (map expands)
- Mobile (<640px): closed by default, slides in as absolute overlay with backdrop

**Dual-range year filter** (bottom overlay)
- Two thumbs, blue fill shows active range
- Filter logic: `founded <= endYear && closed >= startYear` (overlap)
- Default: full range 1745–2024

**Status legend** — top-right overlay

**Marker style** — SVG circle color-coded by status with ✡ emoji; focused marker is yellow/bouncing

---

## MiniMap.tsx

Non-interactive preview embedded in synagogue detail hero:
- Props: `lat`, `lng`, `status`, `mapUrl`
- `disableDefaultUI: true`, `gestureHandling: 'none'`
- Same SVG marker style, color-coded by status
- Entire component is a `<Link>` — clicking opens full map centered on synagogue
- Falls back to plain button link when no coordinates exist

---

## Current Issues / Known Limitations

| Issue | Notes |
|-------|-------|
| `GET /api/rabbi-profiles/[id]` | Still queries old `rabbi_profiles` table — needs migration to `person_profiles` |
| Historical addresses | Non-geocoded addresses display on detail page but don't appear as map markers |
| `/about` page | Not yet created; no nav link |
| Full-text search | `search_vector` column exists but not yet wired to UI |
| `person_relationships` table | Exists in DB, no UI |
| Legacy pages | `app/test/`, `app/test-data/`, `app/page.20260221-1.tsx` can be deleted |

---

## RLS Policies (Public Read Access)

| Table | Policy |
|-------|--------|
| `synagogues` | `approved = true` |
| `addresses` | synagogue must be approved |
| `history_entries` | `approved = true` |
| `person_profiles` | `approved = true AND deleted = false` |
| `affiliations` | `approved = true` |
| `images` | `approved = true` |

---

## Data Source

Original data from `20260221_Phila_Synagogue_Data.xlsx` (875 rows → 562 synagogues).

Import phases:
1. `import_data_fixed.sql` — synagogues + primary addresses (with geocoded lat/lng)
2. `import_history_rabbis.sql` — history_entries, rabbis, historical addresses

---

## Recent Work History

### 2026-04-23 (Most Recent Session)

- **Photo upload approval workflow** — contributor photo uploads (`PhotoUploadForm.tsx`) now go through the standard `edit_proposals` queue with `proposal_type: 'image_upload'`; editors/admins still get auto-approved direct insert; on approval the `approve/route.ts` creates the `images` row; on rejection the storage file is cleaned up from the `synagogue-images` bucket
- **Photo thumbnail in Admin Dashboard** — `ProposalCard` in `AdminClient.tsx` renders a photo summary block for `image_upload` proposals: thumbnail preview, caption, entity name, photographer, dimensions, file size; `IMAGE_UPLOAD_HIDE_FIELDS` prevents raw metadata fields from appearing in the generic diff table; `storageBaseUrl` prop flows from `admin/page.tsx` → `AdminClient` → `ProposalCard`
- **`images` table: added `person_profile_id` column** — FK → `person_profiles(id) ON DELETE SET NULL`; required running migration `supabase/migrations/add_person_profile_id_to_images.sql` which also updates `images_entity_check` constraint (now allows `person_profile_id` as a valid entity) and expands `edit_proposals.proposal_type` check constraint to include `image_upload` and all other newer types
- **Leader photo display fixed** — `app/rabbis/[slug]/page.tsx` now queries images with `.or('rabbi_profile_id.eq.X,person_profile_id.eq.X')` so both legacy and new uploads appear on the leadership profile page; same fix applied to photo count in `app/api/rabbi-profiles/[id]/route.ts`
- **Success message wording fixed** — `PhotoUploadButton.tsx` now says "leadership page" instead of "rabbi page" for leader photo uploads
- **Full legacy table migration completed** — all remaining `rabbi_profiles`/`rabbis` table references replaced with `person_profiles`/`affiliations` across: `admin/page.tsx` (rabbi name resolution), `MergeRabbiButton.tsx` (candidate list), `rabbis/[id]/merge-suggestions/route.ts` (scoring, now uses `affiliations` join), `rabbis/[id]/route.ts` (soft-delete), `approve/route.ts` image operations (delete uses `.or()` across both columns; merge and split update both columns)
- **Fixed "Add New Leader" modal on Synagogue Detail page** — `SuggestRabbiForm` was using `proposal_type: 'rabbi_new'` which tried to write to the deleted `rabbis` table on approval; changed to `rabbi_profile_new`, renamed `name`→`canonical_name`, added person type dropdown, and included affiliation fields in `proposed_data`; fixed all "rabbi"-specific label text
- **Approval route auto-creates affiliation** — when a `rabbi_profile_new` proposal includes `synagogue_id`, the approval handler pre-generates the person_profile UUID and immediately creates an `affiliations` record linking the new person to that synagogue
- **`ClergyCategorySelect` reusable component** — `components/common/ClergyCategorySelect.tsx` is the single source of truth for clergy type options (rabbi/chazzan); to add a new clergy category, update only this file; used by `EditAffiliationButton`, `CreateRabbiForm`, and `SuggestRabbiForm`
- **`EditAffiliationButton` type conversion redesigned** — replaced the "convert to cantor" checkbox with a `ClergyCategorySelect` dropdown; works in both directions; uses `new_person_type` in `proposed_data` (backward compat with `convert_to_cantor` preserved)
- **Approval route generalized for type conversion** — `affiliation_edit` handler reads `new_person_type` (preferred) with fallback to legacy `convert_to_cantor`; slug prefix: `chazzan-<name>` for cantors, `<name>` for rabbis

### 2026-04-17
- **Geocode lat/lng on address approval** — `address_new` proposal approval now calls `geocodeAddress()` (single API call) to populate `latitude` and `longitude` on the inserted address row; without this, newly-added addresses had null coords and the mini-map fell back to a plain "View on Map" button; neighborhood is still derived from the same call, eliminating the prior duplicate geocoding API call
- **Map page shows newly-created synagogues** — fixed `app/map/page.tsx` filter which checked `addresses[0].latitude` only; if the first returned address had null coords the whole synagogue was excluded; now uses `.some()` to check any address, and sorts geocoded addresses to index 0 so `MapClient` (which always uses `addresses[0]`) gets valid coords
- **Multi-location map markers** — `MapClient.tsx` now places one marker per geocoded address (not one per synagogue); historical markers render at 50% opacity; year filter uses `YEAR_FILTER_MODE = 'synagogue'` constant (one-line switch to per-address filtering later); neighborhood filter now hides individual markers that don't match (not whole synagogues); `SynagoguePanel` lists all addresses with year ranges, geocoded addresses are clickable zoom links, each has a Street View pegman icon button, synagogue name click zooms to most-recent geocoded address; infowindow includes address + year range; `map/page.tsx` now fetches `start_year`, `end_year`, `is_current`, `address_order` and passes all addresses (not just geocoded) so sidebar can show complete location history

### 2026-04-16
- **Auto ZIP code lookup on address form** — `SuggestAddressForm.tsx` now auto-triggers a Google Geocoding API call (debounced 600 ms) whenever street address, city, and state are all populated; populates ZIP field with zip+4 if available; spinner shown inside the ZIP input during lookup; user can override freely; validation updated to accept `\d{5}` or `\d{5}-\d{4}` formats
- **Mini-map address selection fixed** — `SynagogueDetail.tsx` now picks the most recent address by `end_year` (null = still active, sorted highest priority) with `start_year` as tiebreaker, replacing the old `is_current` flag heuristic
- **CLAUDE.md updated** — added explicit "Commit, Push, and Update Docs After Every Build" workflow section with commit message convention

### 2026-03-27
- **Phase 6 cutover complete** — all queries migrated from `rabbi_profiles`/`rabbis` to `person_profiles`/`affiliations`
- **Chazzan support** — distinct person_type; slug generation; profile pages; rabbi→chazzan conversion via `EditAffiliationButton`
- **Lay leader + staff addition** — `AddLayLeaderButton` and `AddStaffButton` components
- **Edit affiliations** — `EditAffiliationButton` for all leadership sections
- **Leadership filter buttons** — show all / clergy / lay leaders / staff on synagogue detail page
- **Migration verification dashboard** — `/admin/migration` with integrity checks
- **Admin interface for all clergy types** — handles all new proposal types

### 2026-03-22
- **Mobile navigation header** — `AppHeader.tsx` with hamburger menu
- **Sortable history timeline + leader lists**
- **Data model types** — `lib/types/leadership.ts`, `lib/types/database.types.ts`
- **Organizational relationships** — `AddRelationshipButton`, `DeleteRelationshipModal`, `synagogue_relationships` table
- **External links** — `AddLinkButton`, `LinksSection`, `links` table
- **Google Maps AdvancedMarkerElement migration**
- **Merge/split workflows** for rabbis and synagogues
- **Soft-delete** for synagogues and rabbis
- **Create new synagogue/rabbi** — modal forms, neighborhood auto-detection via geocoding API
- **Neighborhood filter** on `/synagogues` browse page
- **Contributor tracking** on proposals

### 2026-03-01
- **Dark mode** — full system-preference support; Maps night style; `darkMode: 'media'`
- **Overlapping marker offset** — `computeDisplayCoords()` in `MapClient.tsx`

### 2026-02-22
- **Map sidebar** — search, neighborhood filter, results list, `SynagoguePanel`
- **Sidebar collapse** — desktop/mobile behavior
- **Dual-range year filter**
- **MiniMap** on detail pages
- **Leader data on map** — leader search works from map sidebar

---

## Git Info

- **Branch**: `master` (main and only branch; Vercel deploys from here)
- **Remote**: GitHub (auto-deploys to Vercel on push)
- **Most recent commit**: `Phase 7 Session 7.4: Migrate all remaining legacy rabbi_profiles/rabbis table references to person_profiles`

---

## What's Next (Potential Work)

1. Migrate `GET /api/rabbi-profiles/[id]` from legacy `rabbi_profiles` table to `person_profiles`
2. Wire `search_vector` to full-text search UI
3. Build `/about` page and add nav link
4. Clean up legacy pages (`app/test/`, `app/test-data/`, `app/page.20260221-1.tsx`)
5. Add UI for `person_relationships` table
6. Consider adding map markers for non-geocoded historical addresses
