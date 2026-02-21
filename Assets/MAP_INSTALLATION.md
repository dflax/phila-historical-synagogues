# Installing the Map Page

This guide will help you add the interactive map to your Philadelphia Historical Synagogues application.

## Files to Add

You need to add these files to your local project:

### 1. Map Page (Server Component)
**Location**: `app/map/page.tsx`
- Fetches synagogue data from Supabase
- Filters to only include synagogues with coordinates
- Passes data to the client-side map component

### 2. Map Client Component
**Location**: `components/map/MapClient.tsx`
- Client-side component that loads Google Maps
- Displays markers for each synagogue
- Color-coded by status (green=active, red=closed, amber=merged, gray=unknown)
- Temporal filtering with year slider
- Click markers to see info windows with details

## Installation Steps

### Step 1: Add the Files

In your local `philly-synagogues-app` project:

```bash
# Create the directories if they don't exist
mkdir -p app/map
mkdir -p components/map

# Copy the files from the outputs folder
# app/map/page.tsx → Your app/map/page.tsx
# components/map/MapClient.tsx → Your components/map/MapClient.tsx
```

### Step 2: Update Your Navigation

Add a link to the map in your main navigation. For example, in `app/page.tsx`:

```typescript
<Link
  href="/map"
  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
>
  Explore Map
</Link>
```

### Step 3: Verify Environment Variables

Make sure these are set in Vercel (or `.env.local` for local development):

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Step 4: Deploy

```bash
git add app/map components/map
git commit -m "Add interactive map page"
git push origin main
```

Vercel will auto-deploy in ~2-3 minutes.

### Step 5: Test

Visit: `https://your-site.vercel.app/map`

## Features

### 🗺️ Interactive Map
- Google Maps centered on Philadelphia
- Zoom, pan, and explore
- Marker clustering automatically handled by Google Maps

### 🎨 Color-Coded Markers
- **Green**: Active synagogues
- **Red**: Closed synagogues
- **Amber**: Merged synagogues
- **Gray**: Unknown status

### 📅 Temporal Filtering
- Year slider from 1745 (earliest) to present
- Dynamically shows which synagogues existed in a given year
- Filters based on `founded_year` and `closed_year`
- Counter shows how many synagogues are displayed

### 🔍 Info Windows
- Click any marker to see details:
  - Synagogue name
  - Address
  - Neighborhood
  - Status
  - Founded/Closed years
  - Link to detail page (to be built)

### 📊 Stats
- Shows total count of mapped synagogues
- Shows filtered count when year is selected
- Legend for marker colors

## How It Works

### Data Flow

1. **Server Component** (`app/map/page.tsx`):
   - Runs on the server
   - Fetches data from Supabase
   - Filters to synagogues with valid coordinates
   - Passes data to client component

2. **Client Component** (`components/map/MapClient.tsx`):
   - Runs in the browser (marked with `'use client'`)
   - Loads Google Maps JavaScript API
   - Creates map centered on Philadelphia
   - Adds markers for each synagogue
   - Handles temporal filtering
   - Manages info window popups

### Temporal Filtering Logic

When a year is selected:
```typescript
synagogue.founded_year <= selectedYear && 
(synagogue.closed_year > selectedYear || synagogue.closed_year === null)
```

This shows synagogues that:
- Were founded before or during the selected year
- AND either still open OR closed after the selected year

## Customization

### Change Map Center/Zoom

In `MapClient.tsx`, modify:
```typescript
const mapInstance = new google.maps.Map(mapRef.current, {
  center: { lat: 39.9526, lng: -75.1652 }, // Philadelphia coordinates
  zoom: 11, // Adjust zoom level (higher = more zoomed in)
})
```

### Change Marker Colors

In `MapClient.tsx`, modify:
```typescript
const markerColor = 
  synagogue.status === 'active' ? '#22c55e' :  // Change green color
  synagogue.status === 'closed' ? '#ef4444' :  // Change red color
  // etc.
```

### Add More Info to Popup

In `MapClient.tsx`, modify the `content` string in the marker click listener.

## Troubleshooting

### Map doesn't load
- Check browser console for errors (F12)
- Verify `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is set
- Verify Google Maps JavaScript API is enabled in Google Cloud Console

### Markers don't appear
- Check that addresses were imported correctly
- Run this query in Supabase:
  ```sql
  SELECT COUNT(*) FROM addresses WHERE latitude IS NOT NULL;
  ```
  Should return 424

### Year filter doesn't work
- Check that synagogues have `founded_year` data
- Most have this, but some may be NULL

### Info window doesn't open
- Check browser console for errors
- Make sure the marker click listener is being added

## Performance Notes

- **424 markers** is well within Google Maps performance limits
- No additional marker clustering library needed for this dataset
- Map loads on demand (client-side only)
- Server-side data fetching is fast with Supabase

## Next Steps

After the map is working:

1. **Build synagogue detail pages** (`/synagogues/[id]`)
   - So the "View Details →" links work

2. **Add search by location**
   - Search for an address
   - Show nearby synagogues

3. **Add filters**
   - Filter by neighborhood
   - Filter by status
   - Filter by founding year range

4. **Add synagogue images**
   - Show photos in info windows
   - Import the images table data

## Getting Help

If you run into issues:
1. Check browser console (F12) for JavaScript errors
2. Check Vercel deployment logs for build errors
3. Verify all environment variables are set
4. Test locally first with `npm run dev`

---

**Built with:**
- Next.js 14 (App Router)
- Google Maps JavaScript API
- Supabase PostgreSQL + PostGIS
- TypeScript + Tailwind CSS
