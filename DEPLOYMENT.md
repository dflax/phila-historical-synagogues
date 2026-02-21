# Step-by-Step Deployment Guide

## Complete Guide: From GitHub to Live Website

This guide will walk you through deploying the Philadelphia Historical Synagogues application from a GitHub repository to a live website on Vercel.

---

## Phase 1: Prepare Your GitHub Repository (5 minutes)

### Step 1: Create GitHub Repository
1. Go to [github.com](https://github.com)
2. Click the "+" icon → "New repository"
3. Repository settings:
   - Name: `philly-synagogues` (or your choice)
   - Description: "Interactive map of Philadelphia historical synagogues"
   - Visibility: **Public** (so Vercel free tier works)
   - ✅ Initialize with README (uncheck - we have our own)
4. Click "Create repository"

### Step 2: Upload Code to GitHub

**Option A: Using GitHub Desktop (Easiest)**
1. Download [GitHub Desktop](https://desktop.github.com/)
2. File → Clone Repository → Your new repository
3. Copy all files from this project into the cloned folder
4. In GitHub Desktop:
   - See all files listed
   - Add commit message: "Initial commit"
   - Click "Commit to main"
   - Click "Push origin"

**Option B: Using Command Line**
```bash
cd /path/to/philly-synagogues-app
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/philly-synagogues.git
git push -u origin main
```

✅ **Checkpoint**: Your code should now be visible on github.com/YOUR_USERNAME/philly-synagogues

---

## Phase 2: Set Up Supabase Database (10-15 minutes)

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" → Sign up (free)
3. Click "New project"
4. Fill in:
   - **Organization**: Create new or select existing
   - **Name**: `philly-synagogues`
   - **Database Password**: Generate strong password
     - ⚠️ **SAVE THIS PASSWORD** - you'll need it later
   - **Region**: Choose closest to Philadelphia (US East)
   - **Pricing Plan**: Free
5. Click "Create new project"
6. Wait ~2 minutes for database to provision

### Step 2: Run Database Schema
1. In Supabase dashboard, click "SQL Editor" (left sidebar)
2. Click "New query"
3. Open the file `supabase/schema.sql` from your project
4. Copy **entire contents** (Ctrl+A, Ctrl+C)
5. Paste into SQL Editor
6. Click "Run" (or press Ctrl+Enter)
7. Should see: "Success. No rows returned"
8. Verify: Click "Table Editor" → should see tables: synagogues, addresses, etc.

### Step 3: Get API Keys
1. In Supabase dashboard, click ⚙️ "Project Settings"
2. Click "API" in left menu
3. Find and copy these values (keep them safe):
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: Long string starting with `eyJ...`

✅ **Checkpoint**: You should have:
- ✅ Supabase project created
- ✅ Tables visible in Table Editor
- ✅ Project URL and API key saved

---

## Phase 3: Get Google Maps API Key (10 minutes)

### Step 1: Create Google Cloud Project
1. Go to [console.cloud.google.com](https://console.cloud.google.com/)
2. Sign in with Google account
3. Click project dropdown → "New Project"
4. Name: `Philly Synagogues`
5. Click "Create"

### Step 2: Enable Required APIs
1. In search bar, type "Maps JavaScript API"
2. Click on it → Click "Enable"
3. Repeat for:
   - "Geocoding API" → Enable
   - "Places API" → Enable

### Step 3: Create API Key
1. Navigate to "Credentials" (left menu)
2. Click "Create Credentials" → "API Key"
3. Copy the API key that appears
4. Click "Edit API key" (pencil icon)
5. Under "API restrictions":
   - Select "Restrict key"
   - Check: Maps JavaScript API, Geocoding API, Places API
6. Click "Save"

⚠️ **Security Note**: After deploying, come back and add "Website restrictions" with your Vercel domain

✅ **Checkpoint**: You have your Google Maps API key saved

---

## Phase 4: Deploy to Vercel (10 minutes)

### Step 1: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub

### Step 2: Import Project
1. Click "Add New..." → "Project"
2. Find your `philly-synagogues` repository
3. Click "Import"

### Step 3: Configure Project
Vercel will auto-detect Next.js settings. Just verify:
- **Framework Preset**: Next.js
- **Root Directory**: `./`
- **Build Command**: `npm run build`
- **Output Directory**: (leave default)

### Step 4: Add Environment Variables
Click "Environment Variables" to expand, then add:

```
NEXT_PUBLIC_SUPABASE_URL
Value: https://xxxxx.supabase.co (from Phase 2, Step 3)

NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJ... (from Phase 2, Step 3)

NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
Value: AIza... (from Phase 3, Step 3)

NEXTAUTH_SECRET
Value: (run this command to generate):
  openssl rand -base64 32
Or use: https://generate-secret.vercel.app/32

NEXTAUTH_URL
Value: https://your-project.vercel.app
(you'll get this after deploy - can add later)
```

### Step 5: Deploy
1. Click "Deploy"
2. Wait 2-3 minutes
3. Should see confetti 🎉
4. Click "Visit" to see your live site

✅ **Checkpoint**: Your site is live at https://your-project.vercel.app

---

## Phase 5: Import Synagogue Data (15 minutes)

Currently, your database is empty. You need to import the synagogue data.

### Option A: Use the Import Script (Recommended)

1. Clone your repo locally if you haven't:
   ```bash
   git clone https://github.com/YOUR_USERNAME/philly-synagogues.git
   cd philly-synagogues
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` with your credentials:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual values
   ```

4. Run the import script:
   ```bash
   npm run import-data
   ```

### Option B: Manual Import via Supabase Dashboard

1. In Supabase, go to Table Editor
2. Click "Insert" → "Insert row"
3. Manually add synagogues (tedious for 562 entries!)

### Option C: We'll create an admin import UI later

For now, I recommend Option A with the import script.

---

## Phase 6: Geocode Addresses (30-60 minutes)

Your addresses need latitude/longitude coordinates for the map.

### Step 1: Get Geocoded Data

**Option A: Use Google Geocoding API**
```bash
# In your local project directory
export GOOGLE_MAPS_API_KEY="your-key"
python3 scripts/geocode-addresses.py
```

**Option B: Use free batch geocoding service**
1. Upload `data/addresses_for_geocoding.csv` to [geocod.io](https://www.geocod.io)
2. Download results
3. Import via script

### Step 2: Import Geocoded Addresses
Once you have coordinates, the import script will handle this automatically.

---

## Phase 7: Verify Everything Works

### Checklist:
- [ ] Visit your Vercel URL
- [ ] Homepage loads
- [ ] Click "Explore Map"
- [ ] Map loads with Google Maps
- [ ] Markers appear (if data imported)
- [ ] Click a marker to see synagogue info
- [ ] Click "Browse List"
- [ ] Synagogues appear in list
- [ ] Click a synagogue to see detail page

### Troubleshooting Common Issues

**Map doesn't load**
- Check browser console (F12)
- Verify Google Maps API key is set in Vercel env variables
- Verify APIs are enabled in Google Cloud Console

**No synagogues showing**
- Data may not be imported yet
- Check Supabase Table Editor → synagogues table
- Should have rows with `approved = true`

**Database errors**
- Verify schema.sql ran successfully
- Check Supabase logs in dashboard

---

## Phase 8: Set Up Custom Domain (Optional)

### Step 1: Buy Domain
Buy from: Namecheap, Google Domains, Cloudflare, etc.
Example: `phillysyn agogues.org`

### Step 2: Connect to Vercel
1. In Vercel project, go to Settings → Domains
2. Add your domain
3. Follow DNS instructions
4. Wait for DNS propagation (can take 24-48 hours)

### Step 3: Update Environment Variables
1. In Vercel, update `NEXTAUTH_URL` to your custom domain
2. Redeploy

---

## Ongoing Maintenance

### Updating Code
1. Make changes locally
2. Test with `npm run dev`
3. Commit and push to GitHub
4. Vercel auto-deploys on push

### Managing Data
- Use Supabase dashboard to view/edit data
- Build admin panel for non-technical users
- Regular backups (Supabase provides this)

### Monitoring
- Vercel Analytics (free tier available)
- Check error logs in Vercel dashboard
- Monitor Supabase usage

---

## Cost Estimates

### Free Tier (Suitable for Most Projects)
- **Vercel**: Free for personal/hobby projects
- **Supabase**: Free tier: 500MB database, 2GB bandwidth
- **Google Maps**: $200/month credit = ~28,000 map loads

### If You Exceed Free Tiers
- **Vercel Pro**: $20/month (unlimited bandwidth, better performance)
- **Supabase Pro**: $25/month (8GB database, 100GB bandwidth)
- **Google Maps**: Pay as you go (unlikely to exceed free tier)

---

## Getting Help

**Issues with this codebase:**
- Open issue on GitHub
- Check README.md troubleshooting section

**Vercel issues:**
- [vercel.com/docs](https://vercel.com/docs)
- [vercel.com/support](https://vercel.com/support)

**Supabase issues:**
- [supabase.com/docs](https://supabase.com/docs)
- [Discord](https://discord.supabase.com)

**Google Maps issues:**
- [developers.google.com/maps](https://developers.google.com/maps)

---

## Next Steps

After deployment:
1. Import all synagogue data
2. Geocode all addresses
3. Build map page (next phase of development)
4. Add authentication for contributors
5. Build admin approval system
6. Add image upload functionality

---

## Success!

If you've completed all steps, you should have:
- ✅ Live website on Vercel
- ✅ Working database on Supabase
- ✅ Google Maps integration
- ✅ Foundation for all features

**Next**: Continue with development phases in PROJECT_PLAN.md
