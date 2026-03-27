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
- **Database**: Supabase (PostgreSQL + Storage)
- **Auth**: Supabase Auth + `@supabase/auth-helpers-nextjs`
- **Maps**: Google Maps JavaScript API
- **Styling**: Tailwind CSS + Radix UI primitives
- **Language**: TypeScript
- **Font**: Inter (Google Fonts)

## Project Structure

```
app/
  page.tsx                        # Homepage with stats and navigation
  layout.tsx                      # Root layout (Inter font, metadata, NavAuth)
  globals.css                     # Global styles + dual-range slider CSS (.range-input)
  admin/
    page.tsx                      # Admin dashboard (server, role-gated: editor+)
    AdminClient.tsx               # Pending proposals + pending images review UI
    UsersClient.tsx               # User list with promote/demote controls
    users/
      page.tsx                    # User administration (server, role-gated: admin+)
  api/
    addresses/[id]/route.ts       # DELETE address (soft delete, editor+)
    history/[id]/route.ts         # DELETE history entry (soft delete, editor+)
    images/[id]/route.ts          # DELETE image (soft delete + storage cleanup, editor+)
    rabbis/[id]/route.ts          # DELETE rabbi (soft delete, editor+)
    proposals/[id]/approve/
      route.ts                    # POST approve edit proposal (applies changes, editor+)
    users/[id]/
      promote/route.ts            # POST promote user role (admin+; super_admin for beyond editor)
      demote/route.ts             # POST demote user role (super_admin only)
  contributions/
    page.tsx                      # "My Contributions" page (server, auth-gated)
    ContributionsClient.tsx       # Lists user's own proposals and photo uploads
  map/
    page.tsx                      # Map page (server component, force-dynamic)
  synagogues/
    page.tsx                      # Browse/list page (server component, force-dynamic)
    [id]/
      page.tsx                    # Detail page (server component, force-dynamic)
  page.20260221-1.tsx             # Dated backup of homepage (can be deleted)
  test/
    page.tsx                      # Legacy DB connection test (can be deleted)
  test-data/
    page.tsx                      # Legacy data/geocoding test (can be deleted)

components/
  auth/
    AuthModal.tsx                 # Login/signup modal (tab-switching, Escape-to-close)
    LoginForm.tsx                 # Email/password login form
    SignupForm.tsx                # Email/password signup form
    NavAuth.tsx                   # Nav bar auth widget (avatar + dropdown: admin, contributions, sign out)
  common/
    ConfirmDialog.tsx             # Reusable confirmation dialog
  edit/
    SuggestEditButton.tsx         # Opens SuggestEditForm modal (requires login)
    SuggestEditForm.tsx           # Edit proposal form (name, years, status, neighborhood)
    SuggestAddressButton.tsx      # Opens SuggestAddressForm modal
    SuggestAddressForm.tsx        # New address proposal form
    SuggestHistoryButton.tsx      # Opens SuggestHistoryForm modal
    SuggestHistoryForm.tsx        # New history entry proposal form
    SuggestRabbiButton.tsx        # Opens SuggestRabbiForm modal
    SuggestRabbiForm.tsx          # New rabbi proposal form
  map/
    MapClient.tsx                 # Interactive Google Maps client component (see below)
    MiniMap.tsx                   # Non-interactive mini-map for detail page hero
  photos/
    PhotoUploadButton.tsx         # Opens PhotoUploadForm modal (requires login)
    PhotoUploadForm.tsx           # Photo upload: file validation, Supabase Storage upload, DB insert
  synagogues/
    SynagoguesClient.tsx          # Browse page with search/filter UI
    SynagogueDetail.tsx           # Detail page UI with history, rabbis, images, edit/upload buttons

lib/
  supabase/
    client.ts                     # Shared Supabase client + TS type definitions (legacy; used by test pages only)
    server.ts                     # Auth-aware server client: createServerSupabase(), getCurrentUserProfile()
```

## Database Schema (Supabase)

All tables use UUID primary keys. RLS is enabled on all tables.

### synagogues
Core table. 562 records imported.
- `id`, `name`, `status` (active/closed/merged/unknown)
- `founded_year`, `founded_text`, `closed_year`, `closed_text`
- `approved` (boolean) — all current records are approved=true
- `approved_by`, `approved_at`, `created_by`
- `search_vector` (tsvector, for future full-text search)

### addresses
424 geocoded records. Multiple addresses per synagogue (historical locations).
- `synagogue_id` → synagogues.id
- `street_address`, `neighborhood`, `city`, `state`, `zip_code`
- `latitude`, `longitude` (numeric)
- `is_current` (boolean), `address_order` (integer, 0=primary)
- `start_year`, `end_year` (years at this address)
- `geocode_quality` (exact/approximate/low_confidence)
- `approved` (boolean), `approved_by`, `created_by`
- `deleted` (boolean), `deleted_by`, `deleted_at` — soft delete fields

### history_entries
325 records imported from source Excel data.
- `synagogue_id` → synagogues.id
- `entry_type`: must be one of `ethnic_origin`, `rabbi`, `event`, `building`, `merger`, `general`
- `content` (text), `year`, `year_range_start`, `year_range_end`, `circa` (boolean)
- `source`, `source_url`
- `approved` (boolean), `approved_by`, `created_by`
- `deleted` (boolean), `deleted_by`, `deleted_at` — soft delete fields

### rabbis
373 records imported and parsed from source Excel data.
- `synagogue_id` → synagogues.id
- `name`, `title`, `start_year`, `end_year`, `notes`
- `approved` (boolean), `approved_by`, `created_by`
- `deleted` (boolean), `deleted_by`, `deleted_at` — soft delete fields

### images
Used for photo uploads. Stored in Supabase Storage bucket `synagogue-images`.
- `synagogue_id` → synagogues.id
- `url`, `storage_path`, `storage_provider`, `original_filename`
- `caption`, `description`, `year`, `circa_year`, `date_taken`
- `width`, `height`
- `is_primary`, `display_order`
- `photographer`, `source`, `credit_line`
- `people_names` (array), `people_metadata` (jsonb)
- `approved` (boolean), `approved_by`, `approved_at`
- `uploaded_by` → references auth user
- `deleted` (boolean), `deleted_by`, `deleted_at` — soft delete fields

### edit_proposals
Community-submitted change proposals.
- `synagogue_id` → synagogues.id
- `proposal_type`: `synagogue_edit` | `synagogue_new` | `synagogue_delete` | `address_new` | `rabbi_new` | `history_new`
- `proposed_data` (jsonb) — the new values
- `current_data` (jsonb) — snapshot of existing values at submission time
- `submitter_note` (text) — required explanation from contributor
- `status`: `pending` | `approved` | `rejected`
- `created_by`, `reviewed_by`, `reviewed_at`, `reviewer_notes`

### user_profiles
Created automatically on signup via Supabase trigger.
- `id` → auth.users.id
- `full_name`, `role`
- `created_at`, `updated_at`
- Roles (ordered): `contributor` → `editor` → `admin` → `super_admin`

## Key Implementation Notes

### Supabase Client Pattern

**Server components** use the auth-aware helper from `lib/supabase/server.ts`:
```ts
import { createServerSupabase } from '@/lib/supabase/server'
const supabase = createServerSupabase()
const { data: { user } } = await supabase.auth.getUser()
```

**Client components** use:
```ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
const supabase = createClientComponentClient()
```

**Route handlers** use:
```ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
const supabase = createRouteHandlerClient({ cookies })
```

**Service role** (bypasses RLS — for admin user management only):
```ts
import { createClient } from '@supabase/supabase-js'
const serviceClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)
```

`lib/supabase/client.ts` (legacy singleton) is only used by the old test pages.

### force-dynamic
All data-fetching pages use:
```ts
export const dynamic = 'force-dynamic'
export const revalidate = 0
```
This prevents Next.js from statically caching pages at build time.

### Authentication & Roles

Auth is handled by Supabase Auth with email/password. `NavAuth` in the layout renders:
- Logged out: "Sign in" button → `AuthModal`
- Logged in: avatar with dropdown → Admin Dashboard (if editor+), My Contributions, Sign out

Role hierarchy: `contributor` < `editor` < `admin` < `super_admin`

- **contributor**: Can submit edit proposals and upload photos
- **editor**: Can approve/reject proposals, delete records they approved
- **admin**: Can also delete any record, promote contributors to editors
- **super_admin**: Full access; can promote/demote any role

Role guard pattern in server components:
```ts
const { data: profile } = await supabase.from('user_profiles').select('role').eq('id', user.id).maybeSingle()
if (!profile || !ADMIN_ROLES.includes(profile.role)) redirect('/')
```

### Edit Proposal Workflow

1. Logged-in user clicks "Suggest Edit" / "Add Rabbi" / etc. on a detail page
2. Form submits to `edit_proposals` table with `status: 'pending'`
3. Rate limit: 10 proposals per user per 24 hours (checked client-side via Supabase count)
4. Admin dashboard (`/admin`) shows pending proposals
5. Editor approves → `POST /api/proposals/[id]/approve` applies changes to target table and marks proposal `approved`
6. Editor rejects → proposal marked `rejected` with reviewer_notes

`proposal_type` values and what approval does:
- `synagogue_edit` → updates `synagogues` + primary `addresses` rows
- `synagogue_new` → inserts new approved synagogue
- `synagogue_delete` → soft-closes synagogue (status → 'closed')
- `address_new` → inserts new address row
- `rabbi_new` → inserts new rabbi row
- `history_new` → inserts new history_entry row

### Photo Upload Workflow

1. User clicks "Upload Photo" on detail page
2. `PhotoUploadForm` validates file (JPEG/PNG/WebP, max 5MB), reads dimensions
3. Uploads to Supabase Storage bucket `synagogue-images` with sanitized filename
4. Inserts row in `images` table with `approved: false` (unless user is editor+, in which case `approved: true`)
5. Pending images appear in admin dashboard for review/deletion

### Soft Deletes

All content records (`addresses`, `history_entries`, `rabbis`, `images`) use soft deletes:
- API routes set `deleted: true`, `deleted_by`, `deleted_at`
- Queries must filter `deleted IS NULL OR deleted = false` to exclude soft-deleted records
- Image soft-delete also removes the file from Supabase Storage (best-effort)

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
  - Status visibility toggles
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
- `addresses`: synagogue must be approved; `deleted` must be false/null
- `history_entries`: `approved = true`; `deleted` must be false/null
- `rabbis`: `approved = true`; `deleted` must be false/null
- `images`: `approved = true`; `deleted` must be false/null

All imported records have `approved = true`.

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

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
SUPABASE_SERVICE_ROLE_KEY=          # Server-only; used by admin user management routes
```

## Data Source

Original data came from an Excel file (`20260221_Phila_Synagogue_Data.xlsx`) with 875 rows representing 562 synagogues. Each synagogue spans multiple rows in the source data:
- Row 0: name, primary address, neighborhood, founded year, closed year, history text
- Continuation rows: additional historical addresses, more history text, rabbi list (lines starting with `>`)

Import was done in two phases:
1. `import_data_fixed.sql` — synagogues + primary addresses (with geocoded lat/lng)
2. `import_history_rabbis.sql` — history_entries, rabbis, historical addresses (order 1+)

## Current Status & Known Issues

- Historical addresses (non-geocoded) display in detail pages but don't appear as map markers
- `google.maps.Marker` is deprecated — future migration to `AdvancedMarkerElement` recommended
- `/about` page not yet created; nav does not include an About link yet
- Legacy pages `app/test/`, `app/test-data/`, and `app/page.20260221-1.tsx` can be deleted

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with stats (562 synagogues, 83 active, 280+ years) |
| `/map` | Full-screen map with collapsible sidebar (search, filters, status toggles, detail panel), dual-range year filter, status legend, Street View |
| `/synagogues` | Browseable list with text search, status filter pills, year range filter, sortable columns, expandable rows |
| `/synagogues/[id]` | Detail page: hero with mini-map, all addresses, rabbi list, history timeline, photo grid, suggest-edit/upload buttons |
| `/contributions` | Auth-gated: user's submitted proposals and photo uploads with status |
| `/admin` | Role-gated (editor+): review pending proposals, review pending images, approve/reject/delete |
| `/admin/users` | Role-gated (admin+): list all users, promote/demote roles |
| `/about` | Not yet built — no nav link yet |

## Recent Work

### Session ending 2026-03-27

Updated CLAUDE.md to reflect full current state of the project.

### Sessions ending 2026-03-01 and before

- **Authentication** — Supabase Auth with email/password; `AuthModal`, `LoginForm`, `SignupForm`, `NavAuth` components; login/logout with redirect
- **User roles** — `user_profiles` table with `contributor`/`editor`/`admin`/`super_admin` hierarchy; `NavAuth` shows admin link for editor+
- **Admin dashboard** (`/admin`) — pending edit proposals with approve/reject, pending image uploads with delete; `AdminClient.tsx`
- **User administration** (`/admin/users`) — list all users, promote/demote roles; `UsersClient.tsx`; uses service role key to access auth.users
- **Edit proposals** — `SuggestEdit/Address/History/RabbiButton+Form` components on detail pages; rate-limited (10/day); stored in `edit_proposals`; approval applies changes via `/api/proposals/[id]/approve`
- **Photo uploads** — `PhotoUploadButton/Form`; uploads to Supabase Storage `synagogue-images`; editors auto-approved, contributors require review
- **Soft deletes** — all content records use `deleted/deleted_by/deleted_at` fields; API routes: `/api/addresses|history|rabbis|images/[id]` (DELETE)
- **My Contributions** (`/contributions`) — auth-gated page showing user's proposals and uploads with status badges
- **`lib/supabase/server.ts`** — `createServerSupabase()` and `getCurrentUserProfile()` helpers for server components
- **Dark mode** — full system-preference dark mode across all pages and components
- **Overlapping marker offset** — `computeDisplayCoords()` in `MapClient.tsx` radially offsets markers sharing the same primary address
- **Map sidebar** — search, neighborhood filter, status toggles, results list, `SynagoguePanel` detail view
- **Dual-range year filter** — shows synagogues active during any overlap with selected range
- **MiniMap on detail page** — non-interactive Google Maps preview in hero, links to full map
