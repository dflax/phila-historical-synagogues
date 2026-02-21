# Philadelphia Historical Synagogues

An interactive web application for exploring the history of Philadelphia-area synagogues, featuring mapping, temporal search, and community-driven data enrichment.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- A GitHub account
- A Supabase account (free tier is fine)
- A Google Maps API key

### Local Development Setup

1. **Clone this repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/philly-synagogues.git
   cd philly-synagogues
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
   
   Then edit `.env.local` with your values (see Configuration section below).

4. **Set up Supabase database**
   
   - Go to [supabase.com](https://supabase.com) and create a new project
   - Wait for the database to be ready (~2 minutes)
   - Go to SQL Editor in Supabase dashboard
   - Copy and paste the contents of `supabase/schema.sql`
   - Run the SQL to create all tables and functions
   - Copy and paste the contents of `supabase/seed.sql`
   - Run to import initial synagogue data

5. **Run the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. Push this code to a GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js settings
6. Add environment variables (see Configuration below)
7. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

Follow the prompts. Vercel will ask you to add environment variables.

## ⚙️ Configuration

### Required Environment Variables

Create a `.env.local` file (for local development) or add these to Vercel:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Google Maps API Key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# NextAuth Configuration (for authentication)
NEXTAUTH_URL=http://localhost:3000  # Change to your domain in production
NEXTAUTH_SECRET=your-random-secret-string  # Generate with: openssl rand -base64 32

# Email Configuration (for password reset, optional for MVP)
EMAIL_SERVER_HOST=smtp.example.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@example.com
EMAIL_SERVER_PASSWORD=your-password
EMAIL_FROM=noreply@yourdomain.com
```

### How to Get API Keys

#### Supabase Keys
1. Go to your Supabase project dashboard
2. Click on "Settings" (gear icon) → "API"
3. Copy the `URL` and `anon/public` key

#### Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable these APIs:
   - Maps JavaScript API
   - Geocoding API
   - Places API
4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Restrict the key to your domain (in production)

#### NextAuth Secret
Generate a random secret:
```bash
openssl rand -base64 32
```

## 📁 Project Structure

```
philly-synagogues/
├── app/                      # Next.js 14 app directory
│   ├── (auth)/              # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── api/                 # API routes
│   │   ├── auth/           # NextAuth endpoints
│   │   ├── synagogues/     # Synagogue CRUD
│   │   ├── images/         # Image upload/management
│   │   └── proposals/      # Edit proposals
│   ├── map/                # Main map view
│   ├── synagogues/         # Synagogue list & detail pages
│   │   └── [id]/          # Individual synagogue page
│   ├── admin/              # Admin dashboard
│   ├── contribute/         # Community contribution pages
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/              # React components
│   ├── map/
│   │   ├── MapView.tsx
│   │   ├── SynagogueMarker.tsx
│   │   └── InfoWindow.tsx
│   ├── synagogue/
│   │   ├── SynagogueCard.tsx
│   │   ├── SynagogueDetail.tsx
│   │   └── SynagogueTimeline.tsx
│   ├── search/
│   │   ├── LocationSearch.tsx
│   │   └── TemporalFilter.tsx
│   ├── images/
│   │   ├── ImageGallery.tsx
│   │   └── ImageUpload.tsx
│   └── ui/                 # Reusable UI components (shadcn/ui)
├── lib/                     # Utility functions
│   ├── supabase/
│   │   ├── client.ts       # Supabase client
│   │   └── queries.ts      # Database queries
│   ├── google-maps/
│   │   └── config.ts
│   └── utils.ts
├── supabase/               # Database files
│   ├── schema.sql          # Database schema
│   ├── seed.sql            # Initial data import
│   └── migrations/         # Future schema changes
├── public/                 # Static files
│   ├── images/
│   └── icons/
├── data/                   # Source data files
│   ├── synagogues_structured.json
│   └── geocoded_addresses.csv
├── .env.example            # Environment variables template
├── .gitignore
├── next.config.js          # Next.js configuration
├── package.json
├── tailwind.config.js      # Tailwind CSS config
└── tsconfig.json           # TypeScript config
```

## 🗄️ Database Setup

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up / log in
3. Click "New Project"
4. Choose organization and project name
5. Generate a secure database password (save it!)
6. Select region (choose closest to Philadelphia for better performance)
7. Wait ~2 minutes for project to be ready

### Step 2: Run Schema Migration
1. In Supabase dashboard, go to "SQL Editor"
2. Click "New Query"
3. Copy entire contents of `supabase/schema.sql`
4. Paste and click "Run"
5. Verify tables were created in "Table Editor"

### Step 3: Import Initial Data
1. Still in SQL Editor, create another new query
2. Copy entire contents of `supabase/seed.sql`
3. Paste and click "Run"
4. Check "Table Editor" → "synagogues" to see imported data

### Step 4: Set Up Storage for Images
1. Go to "Storage" in Supabase dashboard
2. Click "Create a new bucket"
3. Name it `synagogue-images`
4. Make it Public
5. Set file size limit to 5MB
6. Click "Create bucket"

### Step 5: Enable Row Level Security (RLS)
This is done automatically by the schema.sql file, but verify:
1. Go to "Authentication" → "Policies"
2. You should see policies for each table
3. If not, re-run the schema.sql file

## 🎨 Features

### Phase 1 (MVP - Current)
- ✅ Interactive map with all synagogues
- ✅ Click markers to see basic info
- ✅ Search by location
- ✅ Filter by year (temporal search)
- ✅ Synagogue detail pages
- ✅ Image galleries
- ✅ Basic authentication

### Phase 2 (Coming Soon)
- ⏳ Community editing workflow
- ⏳ Admin approval dashboard
- ⏳ Advanced search (by name, neighborhood, rabbi)
- ⏳ User profiles and contribution history
- ⏳ Export data to CSV/PDF

### Phase 3 (Future)
- 📋 Mobile app
- 📋 Oral history integration
- 📋 Timeline visualization
- 📋 Comparison tool (side-by-side synagogues)

## 🧪 Testing

```bash
# Run type checking
npm run type-check

# Run linter
npm run lint

# Run tests (when added)
npm test
```

## 📝 Contributing Data

### Adding a New Synagogue
1. Log in to the application
2. Click "Contribute" in navigation
3. Fill out the synagogue form
4. Submit for review
5. An editor will approve or request changes

### Adding Images
1. Navigate to a synagogue detail page
2. Click "Add Image"
3. Choose to upload or link external image
4. Add metadata (year, people, caption)
5. Submit for approval

### Data Standards
- **Addresses**: Use full street addresses when possible
- **Years**: Use 4-digit years (YYYY)
- **Names**: Use full official names when known
- **Images**: Minimum 800px width recommended
- **Sources**: Always cite sources in notes

## 🔒 Security

- Row Level Security (RLS) enabled on all Supabase tables
- Authentication required for data editing
- Admin approval required for all contributions
- API keys restricted by domain in production
- HTTPS enforced in production

## 📊 Data Sources

Initial data compiled from:
- Philadelphia Jewish Archives Center
- Historical Society of Pennsylvania
- Community contributions
- Historical newspaper archives

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (via Supabase) with PostGIS
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS + shadcn/ui
- **Maps**: Google Maps JavaScript API
- **Hosting**: Vercel
- **Storage**: Supabase Storage

## 🐛 Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Database connection issues
- Verify Supabase URL and keys in `.env.local`
- Check if Supabase project is paused (free tier auto-pauses after inactivity)
- Verify you ran the schema.sql file

### Map not loading
- Check Google Maps API key is valid
- Verify these APIs are enabled:
  - Maps JavaScript API
  - Geocoding API
  - Places API
- Check browser console for errors

### Build errors on Vercel
- Verify all environment variables are set in Vercel dashboard
- Check build logs for specific errors
- Ensure Node.js version is 18+ in Vercel settings

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/philly-synagogues/issues)
- **Email**: your-email@example.com
- **Documentation**: See `/docs` folder for detailed guides

## 📄 License

MIT License - feel free to use this project as a template for similar historical preservation projects.

## 🙏 Acknowledgments

- Philadelphia Jewish community for preserving this history
- Contributors and volunteers
- Historical societies and archives

---

**Built with ❤️ for Philadelphia's Jewish heritage**
