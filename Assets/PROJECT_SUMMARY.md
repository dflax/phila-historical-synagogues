# Philadelphia Historical Synagogues Project - Complete Summary

## Project Status: Map Page Debugging in Progress

### What We've Accomplished

#### 1. Database Setup ✅
- **Supabase account created** with PostgreSQL + PostGIS
- **Schema deployed** (`schema.sql` already run)
- **562 synagogues imported** successfully
- **424 addresses imported** with geocoded lat/lon coordinates
- All data is live and accessible

#### 2. Application Deployed ✅
- **Next.js 14 app** created with App Router
- **Deployed to Vercel** at your custom domain
- **GitHub repository** set up with auto-deployment
- **Environment variables** configured:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

#### 3. Pages Built ✅
- **Homepage** (`app/page.tsx`) - Complete with navigation, stats, features
- **Map page** (`app/map/page.tsx`) - Server component that fetches data
- **Map client** (`components/map/MapClient.tsx`) - Interactive Google Map component
- **Test page** (`app/test-data/page.tsx`) - Database connection test (working)

### Current Issue: Map Not Loading 🔧

**Symptom:** Map page shows "Loading map..." spinner permanently

**Known Facts:**
- Page loads correctly
- Data fetches from Supabase successfully (test page confirms this)
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` environment variable is set in Vercel
- Browser console shows: "An error occurred trying to load the resource" when clicking on "map" in Sources tab
- Also shows 404 error for `/synagogues` route (expected - that page doesn't exist yet)

**Debugging Steps to Continue:**
1. Verify Google Maps JavaScript API is enabled in Google Cloud Console
2. Test API key directly: `https://maps.googleapis.com/maps/api/js?key=YOUR_KEY`
3. Check API key restrictions (HTTP referrers, API restrictions)
4. Add console logging to MapClient.tsx to verify key is being read
5. Ensure environment variable is set for all environments (Production, Preview, Development)

---

## Database Schema

### Tables Created:
1. **synagogues** - 562 records
   - id, name, status, founded_year, founded_text, closed_year, closed_text, approved, etc.
   
2. **addresses** - 424 records with geocoding
   - synagogue_id (foreign key), street_address, latitude, longitude, geocode_quality
   
3. **history_entries** - Not yet populated (626 records ready to import)
4. **rabbis** - Empty
5. **images** - Empty
6. **edit_proposals** - Empty

### Data Quality:
- 424 of 562 synagogues have geocoded addresses
- Geocode quality: 245 exact, rest approximate or low_confidence
- Status breakdown: 83 active, 148 closed, 2 merged, 329 unknown

---

## Project File Structure

```
philly-synagogues-app/
├── app/
│   ├── map/
│   │   └── page.tsx                    # Map page (server component)
│   ├── test-data/
│   │   └── page.tsx                    # Database test page
│   └── page.tsx                        # Homepage with navigation
├── components/
│   └── map/
│       └── MapClient.tsx               # Google Maps client component
├── lib/
│   └── supabase/
│       └── client.ts                   # Supabase client config
├── package.json
├── next.config.js
└── .env.local (for local development)
```

---

## SQL Import Files Created

All in `/mnt/user-data/outputs/`:

1. **import_data_fixed.sql** (138 KB)
   - 562 synagogue INSERT statements
   - Fixed date inconsistency (Fitzgerald Street Congregation)
   - Status: ✅ Successfully imported

2. **import_addresses.sql** (191 KB)
   - 424 address INSERT statements with lat/lon
   - Matches synagogues by name
   - Status: ✅ Successfully imported

3. **History entries** - Ready to import (626 records in original data)
   - Not yet converted to SQL
   - Available in `synagogues_structured.json`

---

## Next Steps After Fixing Map

### Immediate:
1. **Fix Google Maps loading issue** (current blocker)
2. **Build `/synagogues` list page** - Browse all synagogues
3. **Build `/synagogues/[id]` detail pages** - Individual synagogue info

### Medium Priority:
4. **Import history_entries table** - Add 626 historical records
5. **Add search functionality** - Search by name, address, year
6. **Add filters to map** - By neighborhood, status, year range

### Lower Priority:
7. **Import images** - Add historical photos
8. **Build submission form** - Allow public contributions
9. **Add rabbi information** - Import rabbi data
10. **Mobile optimization** - Improve mobile UX

---

## Key Code Snippets

### Supabase Client Configuration
Location: `lib/supabase/client.ts`
```typescript
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

### Fetching Synagogues with Addresses
```typescript
const { data: synagogues } = await supabase
  .from('synagogues')
  .select(`
    id,
    name,
    status,
    founded_year,
    closed_year,
    addresses (
      street_address,
      latitude,
      longitude
    )
  `)
  .not('addresses', 'is', null)
```

### Map Component Props
```typescript
type Synagogue = {
  id: string
  name: string
  status: string
  founded_year: number | null
  closed_year: number | null
  addresses: Address[]
}
```

---

## Environment Variables Checklist

### Vercel (Production)
- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ✅ `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` (set but needs verification)

### Local Development (.env.local)
Same three variables needed for local testing

**Note:** All must be prefixed with `NEXT_PUBLIC_` to be accessible in browser

---

## Google Cloud Console Checklist

### APIs to Enable:
1. ✅ **Geocoding API** - Used for address geocoding (already used)
2. ❓ **Maps JavaScript API** - REQUIRED for map display (needs verification)
3. ⬜ **Places API** - Optional for future features

### API Key Configuration:
- **Application restrictions:** None (for testing) OR HTTP referrers (for production)
- **API restrictions:** Should restrict to only needed APIs
- **Referrers (if using HTTP restriction):**
  - `https://your-vercel-domain.vercel.app/*`
  - `http://localhost:3000/*`

---

## Map Features Implemented

### ✅ Completed Features:
- Interactive Google Map centered on Philadelphia
- Color-coded markers by status (green=active, red=closed, amber=merged, gray=unknown)
- Temporal filtering with year slider (1745 to present)
- Info window popups on marker click
- Responsive design
- Legend showing marker colors
- Dynamic count showing filtered synagogues

### 🔧 Features In Progress:
- Map loading (debugging Google Maps API connection)

### ⬜ Future Features:
- Search by location/address
- Filter by neighborhood
- Filter by year range (start/end)
- Cluster markers when zoomed out
- Links to detail pages (when built)
- Show synagogue images in popups

---

## Common Commands

### Local Development
```bash
npm run dev              # Start dev server at localhost:3000
npm run build            # Test production build
```

### Git/Deployment
```bash
git add .
git commit -m "message"
git push origin main     # Auto-deploys to Vercel
```

### Supabase SQL Queries
```sql
-- Count synagogues
SELECT COUNT(*) FROM synagogues;

-- Count addresses with coordinates
SELECT COUNT(*) FROM addresses WHERE latitude IS NOT NULL;

-- View synagogues with addresses
SELECT s.name, a.street_address, a.latitude, a.longitude
FROM synagogues s
JOIN addresses a ON s.id = a.synagogue_id
LIMIT 10;
```

---

## Known Issues

### 1. Map Not Loading (ACTIVE)
- Permanent loading spinner
- Browser console: "error loading resource"
- Likely Google Maps API configuration issue

### 2. /synagogues Route 404 (EXPECTED)
- Page not built yet
- Links in navigation and info windows lead to 404
- Easy fix: build the list page

### 3. Temporal Filter Edge Cases
- Some synagogues have NULL founded_year (329 with "unknown" status)
- These are excluded from temporal filtering
- Could show with special handling

---

## Data Files Available

In `/mnt/user-data/uploads/`:
- `geocoded_by_geoapify-8_2_2024__10_43_48_PM.csv` - Geocoded addresses

In `/mnt/user-data/outputs/`:
- `import_data_fixed.sql` - Synagogue data import
- `import_addresses.sql` - Address data import
- `map-page.tsx` - Map page component
- `MapClient.tsx` - Map client component
- `page.tsx` - Homepage
- `MAP_INSTALLATION.md` - Installation guide
- `synagogues_structured.json` - Original structured data (562 records)

---

## Questions to Answer in New Conversation

1. **Is Maps JavaScript API enabled** in Google Cloud Console?
2. **What happens when testing** `https://maps.googleapis.com/maps/api/js?key=YOUR_KEY` directly?
3. **What are the API key restrictions** set to in Google Cloud Console?
4. **What console.log output** appears when adding debug logging to MapClient.tsx?
5. **Are environment variables set** for all three environments (Production, Preview, Development)?

---

## Quick Reference Links

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Supabase Dashboard:** https://supabase.com/dashboard
- **Google Cloud Console:** https://console.cloud.google.com/
- **GitHub Repository:** [Your repo URL]
- **Live Site:** [Your Vercel URL]

---

## Contact Points / Resources

- Original data: Excel spreadsheet with synagogue information
- Geocoded data: CSV from Geoapify (August 2024)
- Database: Supabase PostgreSQL with PostGIS extension
- Hosting: Vercel with automatic GitHub deployments
- Maps: Google Maps JavaScript API

---

**Last Updated:** Current debugging session
**Status:** Map page loading issue - needs Google Maps API configuration verification
