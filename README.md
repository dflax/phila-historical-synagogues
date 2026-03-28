# Philadelphia Historical Synagogues

An interactive web application documenting **562 synagogues** in the Philadelphia area, spanning from 1745 to the present day. Built to preserve and explore Jewish heritage through interactive mapping, temporal filtering, detailed historical records, leader profiles, and community-contributed content.

**Live site:** [phila-historical-synagogues.vercel.app](https://phila-historical-synagogues.vercel.app)

---

## Features

### Interactive Map (`/map`)
- **Full-screen Google Map** with color-coded Star of David markers (green = active, red = closed, amber = merged, gray = unknown)
- **Collapsible sidebar** — open by default on desktop, collapsed on mobile with a hamburger toggle
  - Search by synagogue name or leader name
  - Filter by neighborhood (dropdown)
  - Results list with status badges — click any result to pan and zoom to its marker
  - Detail panel showing status, founded/closed years, address, leader list, Street View link, and link to full history page
- **Dual-range year filter** — drag two thumbs to set a start and end year; the map shows all synagogues active during any part of that range
- **Street View** — drag the pegman onto any street, or use the Street View link in the detail panel
- **Marker infowindows** — click any marker for a quick summary with a "View Details in Sidebar" button
- **Overlapping marker offset** — synagogues sharing an address are radially offset (~33m) so each marker is individually clickable
- **Dark mode map tiles** — night-mode Google Maps styles applied automatically based on OS preference, updating live if the user switches mid-session
- Arriving from a detail page via "View on Map" auto-populates the sidebar with that synagogue's details

### Browse Directory (`/synagogues`)
- Searchable, sortable table of all 562 synagogues
- Filter by status (active / closed / merged / unknown)
- Neighborhood dropdown and year range filter
- Expandable rows with address preview
- Authenticated users can create new synagogue records

### Synagogue Detail Pages (`/synagogues/[id]`)
- Hero section with name, status badge, founding/closing years, and neighborhood
- **Mini-map** — non-interactive Google Maps preview in the hero box, links to full map
- All historical addresses with years at each location
- **Leadership sections** — separate sections for clergy (rabbis, chazzanim), lay leaders, and staff; each with role title, service years, notes, and links to individual profiles
- Sortable history timeline (events, mergers, building notes, ethnic origin)
- **Organizational relationships** — typed links to related synagogues (predecessor/successor, merged into, split from, parent/branch); proposed by editors, displayed on both sides
- **External links** — curated links to Wikipedia, FindAGrave, JewishGen, and other resources; proposed by editors
- Photo gallery (upload workflow live)
- Authenticated users can suggest edits, add addresses, add leaders, add history entries, or upload photos
- Admins can merge, split, or soft-delete records

### Leadership Directory (`/rabbis` or `/leadership`)
- Alphabetically grouped list of all clergy profiles (rabbis and chazzanim)
- Search by name
- Each entry shows lifespan (with circa flags) and number of synagogue affiliations

### Leader Profiles (`/rabbis/[slug]` or `/leadership/[slug]`)
- Biography with birth/death years (circa-aware), birthplace, denomination, seminary
- All synagogue affiliations with title, service years, and notes
- Photo gallery for portraits
- **External links** — Wikipedia, FindAGrave, and other biographical resources; proposed by editors
- Editors can add synagogue affiliations directly from the profile page

### Homepage (`/`)
- Summary statistics: 562 synagogues, 83 active, 280+ year span
- Feature showcase and navigation

---

## Authentication & User Roles

Users can register and log in via Supabase Auth (email/password). Roles control access to contribution and admin features:

| Role | Capabilities |
|------|-------------|
| `contributor` | Submit edit proposals, upload photos |
| `editor` | Review and approve/reject proposals and photos |
| `admin` | Full admin dashboard access |
| `super_admin` | User role management |

All editing controls are hidden from unauthenticated visitors.

### My Contributions (`/contributions`)
Authenticated users can review all edit proposals and photo uploads they have submitted, see their approval status, and read any reviewer notes.

### Admin Dashboard (`/admin`)
Editors and admins have access to:
- **Pending edit proposals** queue with diff view (proposed vs. current data) — approve or reject with optional notes; covers all proposal types including leadership, affiliations, synagogue edits, images, links, and relationships
- **Pending image approvals** queue with image preview and metadata
- **User management** (super_admin only) — view all users, promote or demote roles
- **Migration verification** (`/admin/migration`) — data integrity dashboard showing old vs. new table counts, person type breakdowns, affiliation categories, and slug consistency checks

---

## Leadership Data Model

The app uses a generalized leadership model that supports rabbis, chazzanim, lay leaders, and staff — not just rabbis.

### Person Types
| Type | Profile Page | Description |
|------|-------------|-------------|
| `rabbi` | Yes (`/rabbis/[slug]`) | Rabbi with biographical profile |
| `chazzan` | Yes (`/rabbis/[slug]`) | Cantor/chazzan with biographical profile |
| `lay_leader` | No | President, treasurer, committee chairs, etc. |
| `staff` | No | Executive director, youth director, etc. |

### Adding Leaders to Synagogues
Editors can add leaders via the synagogue detail page:
- **Clergy** — search existing profiles or create new ones; multi-step modal (search → affiliation details → submit)
- **Lay leaders** — enter name, role (from predefined list), and years of service
- **Staff** — enter name, position (from predefined list), and years of service

All additions flow through the proposal workflow before appearing publicly.

### Editing Affiliations
Editors can modify existing affiliations, including converting a rabbi to a chazzan (updates the person type and regenerates the slug).

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 14](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Database | [Supabase](https://supabase.com) (PostgreSQL + RLS) |
| Auth | Supabase Auth + `@supabase/auth-helpers-nextjs` |
| Maps | Google Maps JavaScript API (AdvancedMarkerElement) |
| Styling | [Tailwind CSS](https://tailwindcss.com) (dark mode via OS preference) |
| Hosting | [Vercel](https://vercel.com) (auto-deploys from GitHub) |
| Font | Inter (Google Fonts) |

---

## Local Development

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project (free tier works)
- A [Google Maps API key](https://console.cloud.google.com/) with the **Maps JavaScript API** enabled

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/dflax/phila-historical-synagogues.git
   cd phila-historical-synagogues
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env.local` file** in the project root:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
   ```

4. **Set up the Supabase database** (see [Database Setup](#database-setup) below)

5. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

---

## Deployment to Vercel

### Option 1: Vercel Dashboard (recommended)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Vercel auto-detects Next.js — no build config needed
4. Add the environment variables (Settings → Environment Variables):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
5. Click Deploy

Every push to `master` triggers an automatic redeploy.

### Option 2: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## Database Setup

The app uses Supabase (PostgreSQL). All tables have Row Level Security (RLS) enabled with public read access for approved records.

### Tables

| Table | Records | Description |
|-------|---------|-------------|
| `synagogues` | 562 | Core records — name, status, founded/closed years |
| `addresses` | 424 | Geocoded locations (lat/lng), multiple per synagogue |
| `history_entries` | 325+ | Timeline events, mergers, building notes, ethnic origins |
| `person_profiles` | — | Unified leader profiles (rabbis, chazzanim, lay leaders, staff) |
| `affiliations` | — | Links person profiles to synagogues with role, years, and notes |
| `synagogue_relationships` | — | Typed directional links between synagogues (merger, split, predecessor, parent/branch) |
| `links` | — | External URLs attached to synagogues or leader profiles |
| `images` | — | Photos — upload workflow live |
| `edit_proposals` | — | All contributions and admin operations — pending/approved/rejected |
| `user_profiles` | — | Auth users with roles (contributor/editor/admin/super_admin) |
| `rabbis` | 373 | Legacy rabbi affiliations (read-only; superseded by `affiliations`) |
| `rabbi_profiles` | — | Legacy rabbi biographies (read-only; superseded by `person_profiles`) |

### Getting API Keys

**Supabase:**
1. [supabase.com](https://supabase.com) → your project → Settings → API
2. Copy the **URL** and **anon/public** key

**Google Maps:**
1. [Google Cloud Console](https://console.cloud.google.com/) → Enable **Maps JavaScript API**
2. Credentials → Create Credentials → API Key
3. In production, restrict the key to your Vercel domain

---

## Project Structure

```
app/
  layout.tsx                    # Root layout (Inter font, metadata)
  page.tsx                      # Homepage
  globals.css                   # Global styles + dual-range slider CSS
  map/
    page.tsx                    # Map page (server component, force-dynamic)
  synagogues/
    page.tsx                    # Browse/list page
    [id]/
      page.tsx                  # Detail page
  rabbis/
    page.tsx                    # Leadership directory
    [slug]/
      page.tsx                  # Leader profile page
  leadership/
    page.tsx                    # Alias → /rabbis
    [slug]/
      page.tsx                  # Alias → /rabbis/[slug]
  contributions/
    page.tsx                    # My contributions (authenticated)
    ContributionsClient.tsx
  admin/
    page.tsx                    # Admin dashboard (editor+ only)
    AdminClient.tsx
    users/
      page.tsx                  # User management (super_admin only)
      UsersClient.tsx
    migration/
      page.tsx                  # Migration verification dashboard
  api/
    synagogues/[id]/
      full-details/route.ts
      merge-suggestions/route.ts
    rabbis/[id]/
      route.ts
      merge-suggestions/route.ts
    rabbi-profiles/[id]/route.ts
    images/[id]/route.ts
    addresses/[id]/route.ts
    history/[id]/route.ts
    proposals/[id]/approve/route.ts
    users/[id]/
      promote/route.ts
      demote/route.ts
    admin/
      generate-slugs/route.ts
      delete-test-data/route.ts

components/
  layout/
    AppHeader.tsx               # Mobile-responsive site header with hamburger nav
  map/
    MapClient.tsx               # Full interactive map (sidebar, markers, filters)
    MiniMap.tsx                 # Non-interactive mini-map for detail pages
  synagogues/
    SynagoguesClient.tsx        # Browse page search/filter UI
    SynagogueDetail.tsx         # Detail page with leadership sections
    HistoryList.tsx             # Sortable history timeline
  rabbis/
    RabbisClient.tsx            # Directory page with search
    RabbiDetail.tsx             # Profile page layout
  auth/
    NavAuth.tsx                 # Top-nav auth dropdown
    AuthModal.tsx               # Login/signup modal
    LoginForm.tsx               # Login form with password reset
    SignupForm.tsx              # Registration form
  edit/                         # Proposal/create/merge/split/delete buttons and forms
    SuggestEdit{Button,Form}.tsx
    SuggestAddress{Button,Form}.tsx
    SuggestRabbi{Button,Form}.tsx
    SuggestHistory{Button,Form}.tsx
    SuggestRabbiProfile{Button,Form}.tsx
    Create{Synagogue,Rabbi}{Button,Form}.tsx
    Merge{Synagogue,Rabbi}Button.tsx
    Split{Synagogue,Rabbi}Button.tsx
    Delete{Synagogue,Rabbi}Button.tsx
    AddRabbiAffiliationButton.tsx   # Multi-step clergy affiliation modal
    AddSynagogueAffiliationButton.tsx
    AddLayLeaderButton.tsx           # Add lay leader affiliation
    AddStaffButton.tsx               # Add staff affiliation
    EditAffiliationButton.tsx        # Edit affiliation; supports rabbi→chazzan conversion
    AddRelationshipButton.tsx        # Typed org relationships between synagogues
    AddLinkButton.tsx                # External links for synagogues and leaders
    DeleteRelationshipModal.tsx
  photos/
    PhotoUploadButton.tsx
    PhotoUploadForm.tsx
  common/
    ConfirmDialog.tsx
    LinksSection.tsx            # Renders approved links for any entity

lib/
  supabase/
    client.ts                   # Shared client + TS types (legacy test pages only)
    server.ts                   # Server-side auth helpers
  types/
    database.types.ts           # Auto-generated Supabase TypeScript types
    leadership.ts               # PersonProfile and Affiliation types + role lists
  queries/
    leadership.ts               # Database queries for person_profiles and affiliations
  hooks/
    useUserRole.ts              # Role-checking hook

middleware.ts                   # Auth session refresh on every request

supabase/
  migrations/                   # SQL migration files for schema changes
```

All data-fetching pages are server components with `force-dynamic` to prevent stale caching. Google Maps is loaded via manual script injection and reused across components via a shared script tag ID.

---

## Useful Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run lint         # ESLint
npm run type-check   # TypeScript check (no emit)
```

---

## Roadmap

- [ ] `/about` page
- [ ] Full-text search using the `search_vector` tsvector column
- [ ] Surface non-geocoded historical addresses as map markers
- [ ] Public profile pages for lay leaders and staff
- [ ] Enhanced bulk admin operations

---

## Data Source

Original data compiled from historical records into an Excel file (`20260221_Phila_Synagogue_Data.xlsx`) covering 562 synagogues across 875 rows. Imported in two SQL phases:

1. Synagogues + primary geocoded addresses
2. History entries, rabbis, and historical addresses

---

*Built to preserve Philadelphia's Jewish heritage.*
