# Quick Reference

## Essential Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# Visit: http://localhost:3000

# Build for production
npm run build

# Start production server
npm start

# Type check
npm run type-check

# Lint code
npm run lint
```

## Essential Files to Configure

1. **`.env.local`** - Copy from `.env.example` and fill in:
   - Supabase URL and key
   - Google Maps API key
   - NextAuth secret

2. **`next.config.js`** - Update Supabase domain after creating project

3. **`supabase/schema.sql`** - Run in Supabase SQL Editor

## Folder Structure

```
app/          → Pages and routes
lib/          → Utilities and database client
components/   → React components
public/       → Static files
supabase/     → Database schema and seed data
data/         → Source data files
```

## API Routes (when built)

```
GET  /api/synagogues              → List all approved synagogues
GET  /api/synagogues/[id]         → Get single synagogue with details
GET  /api/synagogues/search       → Search synagogues
POST /api/synagogues              → Create new synagogue proposal
PUT  /api/synagogues/[id]         → Update synagogue (creates proposal)

GET  /api/images/[synagogueId]    → Get images for synagogue
POST /api/images                  → Upload new image

GET  /api/proposals               → List pending proposals
PUT  /api/proposals/[id]/approve  → Approve a proposal
PUT  /api/proposals/[id]/reject   → Reject a proposal
```

## Database Tables

- `users` - User accounts and roles
- `synagogues` - Main synagogue data
- `addresses` - Synagogue addresses (multiple per synagogue)
- `history_entries` - Historical facts and events
- `rabbis` - Rabbi information
- `images` - Photos and metadata
- `edit_proposals` - Community contribution queue

## Helpful Links

- **Your Local App**: http://localhost:3000
- **Supabase Dashboard**: https://app.supabase.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Google Cloud Console**: https://console.cloud.google.com

## Common Tasks

### Add Environment Variable
1. Add to `.env.local` for local development
2. Add to Vercel dashboard for production
3. Redeploy if needed

### Update Database Schema
1. Edit `supabase/schema.sql`
2. Create migration file in `supabase/migrations/`
3. Run in Supabase SQL Editor
4. Or use Supabase CLI: `supabase db push`

### Deploy Changes
1. Commit to GitHub
2. Push to main branch
3. Vercel auto-deploys

### View Logs
- **Vercel**: Dashboard → Your Project → Functions → Logs
- **Supabase**: Dashboard → Logs & Analytics

## Troubleshooting

**"Module not found"**
```bash
rm -rf node_modules package-lock.json
npm install
```

**"Missing environment variable"**
- Check `.env.local` exists
- Check all required variables are set
- Restart dev server after changes

**Database connection errors**
- Verify Supabase URL and key
- Check if project is paused (free tier auto-pauses)
- Verify RLS policies are set

**Map not showing**
- Check Google Maps API key
- Verify APIs are enabled in Google Cloud
- Check browser console for errors

## Development Workflow

1. Create feature branch
2. Make changes
3. Test locally with `npm run dev`
4. Commit changes
5. Push to GitHub
6. Create pull request
7. Review and merge to main
8. Vercel auto-deploys

## Security Checklist

- [ ] Environment variables not in GitHub
- [ ] `.env.local` in `.gitignore`
- [ ] Google Maps API key restricted
- [ ] Supabase RLS policies enabled
- [ ] User roles properly enforced
- [ ] Image uploads validated
- [ ] SQL injection prevented (using Supabase client)

## Performance Tips

- Use Next.js Image component for images
- Enable Vercel Analytics
- Monitor Supabase query performance
- Add database indexes for common queries
- Cache map tiles appropriately
- Lazy load images in galleries

## Support

- GitHub Issues: [Your repo]/issues
- Email: your-email@example.com
- Documentation: See README.md

---

**Remember**: This is an MVP starting point. Features will be added incrementally.
