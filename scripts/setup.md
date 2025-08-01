# CV Maker Setup Guide

## Quick Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 3. Database Setup

**Step 1: Run the main schema**
Copy and run the contents of `lib/supabase/schema.sql` in your Supabase SQL editor.

**Step 2: Add RPC functions**
Copy and run the contents of `lib/supabase/functions.sql` in your Supabase SQL editor.

### 4. Authentication Setup (Optional)

**For Google OAuth:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Add your domain to authorized origins
4. Add to `.env.local`:
   ```env
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

**In Supabase:**
1. Go to Authentication > Providers
2. Enable Google provider
3. Add your Google OAuth credentials

### 5. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel

### 1. Deploy to Vercel
```bash
npx vercel --prod
```

### 2. Set Environment Variables
In Vercel dashboard, add the same environment variables from your `.env.local` file.

### 3. Update Supabase URLs
In Supabase Authentication settings:
- Add your Vercel domain to "Site URL"
- Add your Vercel domain to "Redirect URLs"

## Verification Checklist

- [ ] Dependencies installed successfully
- [ ] Environment variables configured
- [ ] Database schema created
- [ ] RPC functions added
- [ ] Authentication working (optional)
- [ ] Development server running
- [ ] Can create account and CV
- [ ] Templates displaying correctly
- [ ] PDF export working
- [ ] Public CV sharing working

## Troubleshooting

### Common Issues

**Database Connection Issues:**
- Verify Supabase URL and keys
- Check if RLS policies are active
- Ensure database schema was created

**Authentication Issues:**
- Check OAuth credentials
- Verify redirect URLs in Supabase
- Confirm Google OAuth setup

**Build Issues:**
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run build`

### Getting Help

1. Check the README.md for detailed documentation
2. Review error messages in browser console
3. Check Supabase logs for backend issues
4. Verify environment variables are set correctly

## Production Considerations

- [ ] Set up proper domain and SSL
- [ ] Configure production database
- [ ] Set up monitoring and error tracking
- [ ] Enable database backups
- [ ] Configure email templates in Supabase
- [ ] Set up proper CORS policies
- [ ] Review and adjust rate limiting
- [ ] Optimize images and assets