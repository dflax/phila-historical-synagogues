# Philadelphia Historical Synagogues

An interactive web application documenting **562 synagogues** in the Philadelphia area, spanning from 1745 to the present day. Built to preserve and explore Jewish heritage through interactive mapping, temporal filtering, and detailed historical records.

**Live site:** [phila-historical-synagogues.vercel.app](https://phila-historical-synagogues.vercel.app)

---

## Features

### Interactive Map (`/map`)
- **Full-screen Google Map** with color-coded Star of David markers (green = active, red = closed, amber = merged, gray = unknown)
- **Collapsible sidebar** — open by default on desktop, collapsed on mobile with a hamburger toggle
  - Search by synagogue name or rabbi name
  - Filter by neighborhood (dropdown)
  - Results list with status badges — click any result to pan and zoom to its marker
  - Detail panel showing status, founded/closed years, address, rabbi list, Street View link, and link to full history page
- **Dual-range year filter** — drag two thumbs to set a start and end year; the map shows all synagogues active during any part of that range
- **Street View** — drag the pegman onto any street, or use the Street View link in the detail panel
- **Marker infowindows** — click any marker for a quick summary with a "View Details in Sidebar" button
- Arriving from a detail page via "View on Map" auto-populates the sidebar with that synagogue's details

### Browse Directory (`/synagogues`)
- Searchable, sortable table of all 562 synagogues
- Filter by status (active / closed / merged / unknown)
- Year range filter
- Expandable rows with address preview

### Synagogue Detail Pages (`/synagogues/[id]`)
- Hero section with name, status badge, founding/closing years, neighborhood
- **Mini-map** — non-interactive Google Maps preview in the hero box, links to full map
- All historical addresses with years at each location
- Full rabbi list with tenures
- History timeline (events, mergers, building notes, ethnic origin)
- Photo gallery (schema ready — no photos imported yet)

### Homepage (`/`)
- Summary statistics: 562 synagogues, 83 active, 280+ year span
- Navigation to map, browse, and detail views

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 14](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Database | [Supabase](https://supabase.com) (PostgreSQL) |
| Maps | Google Maps JavaScript API |
| Styling | [Tailwind CSS](https://tailwindcss.com) |
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
   ```bash
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
4. Add the three environment variables (Settings → Environment Variables):
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
| `synagogues` | 562 | Core records with name, status, founded/closed years |
| `addresses` | 424 | Geocoded locations (lat/lng), multiple per synagogue |
| `history_entries` | 325 | Timeline events, mergers, building notes, ethnic origins |
| `rabbis` | 373 | Rabbi names, titles, tenures |
| `images` | 0 | Schema ready — no photos imported yet |
| `edit_proposals` | 0 | Schema ready — no submission UI yet |

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
  page.tsx                  # Homepage
  layout.tsx                # Root layout (Inter font, metadata)
  globals.css               # Global styles + dual-range slider CSS
  map/
    page.tsx                # Map page — fetches synagogues + addresses + rabbis
  synagogues/
    page.tsx                # Browse/list page
    [id]/
      page.tsx              # Detail page

components/
  map/
    MapClient.tsx           # Full map UI (sidebar, markers, filters, Street View)
    MiniMap.tsx             # Non-interactive mini-map for detail page hero
  synagogues/
    SynagoguesClient.tsx    # Browse page search/filter UI
    SynagogueDetail.tsx     # Detail page layout
```

All data-fetching pages are server components with `force-dynamic` to prevent stale caching. Google Maps is loaded via manual script injection (not a library) and reused across components via a shared script tag ID.

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
- [ ] Image upload workflow (Supabase Storage bucket is ready)
- [ ] Community edit proposals UI (`edit_proposals` table is ready)
- [ ] Authentication / admin approval dashboard
- [ ] Migrate Google Maps markers to `AdvancedMarkerElement` (current `Marker` is deprecated)
- [ ] Full-text search using `search_vector` tsvector column

---

## Data Source

Original data compiled from historical records into an Excel file (`20260221_Phila_Synagogue_Data.xlsx`) covering 562 synagogues across 875 rows. Imported in two SQL phases:

1. Synagogues + primary geocoded addresses
2. History entries, rabbis, and historical addresses

---

## License

MIT — feel free to adapt this for similar historical preservation projects.

---

*Built to preserve Philadelphia's Jewish heritage.*
