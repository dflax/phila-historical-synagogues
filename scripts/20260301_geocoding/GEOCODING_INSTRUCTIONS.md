# GEOCODING INSTRUCTIONS

## What This Does

The `geocode_addresses.py` script will:
1. Read the 157 addresses from `addresses_to_geocode.csv`
2. Call Google Geocoding API for each address
3. Generate `geocoding_updates.sql` with UPDATE statements to add lat/lon to your database

## Prerequisites

You need:
- ✅ Python 3 installed (you have this)
- ✅ Google Maps API key (you already have this from your map)
- ✅ `requests` library: `pip install requests`

## Setup

### Step 1: Install Required Library

```bash
pip install requests
```

### Step 2: Edit the Script

Open `geocode_addresses.py` and replace this line:

```python
API_KEY = "YOUR_GOOGLE_API_KEY_HERE"
```

With your actual Google Maps API key:

```python
API_KEY = "AIza..."  # Your actual key
```

**Where to find your API key:**
- You already have one from setting up the map
- It's in your Vercel environment variables: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- Or get it from Google Cloud Console → Credentials

## Running the Script

### Step 1: Place Files

Put these files in the same folder:
- `geocode_addresses.py`
- `addresses_to_geocode.csv`

### Step 2: Run

```bash
python3 geocode_addresses.py
```

### Step 3: Watch Progress

You'll see output like:

```
Reading addresses_to_geocode.csv...
Found 157 addresses to geocode
Starting geocoding...

[1/157] Adath Israel of the Main Line
  Address: Montgomery and Wynnewood Avenues; Wynnewood, PA
  ✓ Success: 40.0123, -75.2456

[2/157] Adath Israel
  Address: Old Lancaster Road and Highland Avenue; Merion Station, PA
  ✓ Success: 40.0089, -75.2234

...
```

### Step 4: Results

After 15-20 minutes, you'll get:
- **`geocoding_updates.sql`** - SQL file with UPDATE statements

## What to Expect

### Success Rate Estimates

Based on address quality:

**High Success (~85 addresses):**
- Full street addresses with numbers
- Example: "7763 Old York Road; Elkins Park, PA 19027"
- Expected: 95%+ success

**Medium Success (~50 addresses):**
- Intersection addresses
- Example: "York and Ashbourne Roads; Elkins Park, PA"
- Expected: 70-80% success

**Low Success (~22 addresses):**
- Vague addresses or just street names
- Example: "Marshall and Ritner Streets"
- Expected: 40-50% success

**Overall expected:** ~120-130 successful geocodes out of 157

## After Geocoding

### Step 1: Review the SQL

Open `geocoding_updates.sql` and check:
- How many succeeded vs failed
- Spot-check a few coordinates (use Google Maps)

### Step 2: Run the SQL

In TablePlus or Supabase SQL Editor:
1. Open `geocoding_updates.sql`
2. Run the entire file
3. Should take ~30 seconds

### Step 3: Verify

```sql
-- Check how many addresses now have coordinates
SELECT COUNT(*) FROM addresses WHERE latitude IS NOT NULL;
-- Expected: ~575 (452 original + ~120 new)

-- Check today's geocoding
SELECT COUNT(*) FROM addresses 
WHERE latitude IS NOT NULL AND created_at >= '2026-03-01';
-- Expected: ~120-130
```

## Troubleshooting

### Error: "No module named 'requests'"

Install it:
```bash
pip install requests
```

### Error: "REQUEST_DENIED"

Your API key isn't valid or Geocoding API isn't enabled:
1. Go to Google Cloud Console
2. Enable "Geocoding API"
3. Check API key is correct

### Error: Rate limit exceeded

The script has a 0.1 second delay between requests. If you hit limits:
- Increase `DELAY_BETWEEN_REQUESTS` to 0.2 or 0.5
- Or run in smaller batches

### Some addresses fail to geocode

This is normal! Addresses like "32nd and Montgomery" are hard to geocode.

**For failed addresses**, you can:
1. Manually look them up in Google Maps
2. Add coordinates manually with UPDATE statements
3. Leave them without coordinates (they just won't show on map)

## Cost

Google Geocoding API pricing:
- First 40,000 requests/month: **FREE**
- After that: $5 per 1,000 requests

For 157 addresses = **FREE** ✅

## Next Steps

After running the geocoding SQL:

1. **Check your map** - Historical addresses should now appear
2. **Test temporal filtering** - Filter map by year
3. **Verify detail pages** - Should show all addresses with coordinates

---

**Ready to run?** Just:
1. `pip install requests`
2. Edit the API key in the script
3. `python3 geocode_addresses.py`
4. Wait ~15 minutes
5. Run the generated SQL

Let me know if you hit any issues!
