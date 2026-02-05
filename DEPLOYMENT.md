# Deployment Guide

This document covers deployment for both the React frontend and Express backend.

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com) and sign in
3. Click "Add New Project" and select your repository
4. Configure environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_API_URL` (your backend URL)
5. Click "Deploy"

### Option 2: Netlify

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables
5. Deploy

## Backend Deployment

### Option 1: Railway (Recommended)

1. Push code to GitHub
2. Visit [railway.app](https://railway.app)
3. Create new project
4. Select "Deploy from GitHub"
5. Choose your repository
6. Add environment variables:
   - `NODE_ENV=production`
   - `PORT=3000`
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `FRONTEND_URL` (your frontend URL)
7. Deploy

### Option 2: Render

1. Sign in to [render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Configure:
   - Build Command: `npm run build`
   - Start Command: `npm start`
   - Add environment variables
5. Deploy

### Option 3: Docker + Any Cloud Provider

Create a `Dockerfile` in the backend directory:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist ./dist

EXPOSE 3000
CMD ["node", "dist/index.js"]
```

Build and deploy:
```bash
docker build -t speech-to-text-backend .
docker run -p 3000:3000 -e SUPABASE_URL=... speech-to-text-backend
```

## Environment Variables

### Frontend (.env)
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_URL=https://your-backend.com/api
```

### Backend (.env)
```
NODE_ENV=production
PORT=3000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
FRONTEND_URL=https://your-frontend.com
```

## Database Setup

Supabase is already configured. Ensure your database migrations are applied:

1. Log in to Supabase Dashboard
2. Go to SQL Editor
3. Run the migration from `supabase/migrations/` directory

Or use Supabase CLI:
```bash
supabase migration list
supabase migration up
```

## SSL/HTTPS

Both Vercel and Railway provide automatic HTTPS. For custom domains, use services like:
- Cloudflare
- AWS Route 53
- Namecheap

## Monitoring

### Frontend
- Sentry for error tracking
- Vercel Analytics

### Backend
- Papertrail for logs
- PM2+ for monitoring (if self-hosted)

## Scaling

### Frontend
- Automatically scales with Vercel/Netlify

### Backend
- Railway/Render handle automatic scaling
- Add caching layer (Redis) if needed
- Consider API rate limiting

## Security Checklist

- [ ] Set `NODE_ENV=production` on backend
- [ ] Enable HTTPS everywhere
- [ ] Rotate API keys regularly
- [ ] Set up CORS correctly
- [ ] Use strong JWT secrets
- [ ] Enable rate limiting on API
- [ ] Add WAF rules
- [ ] Set up database backups
- [ ] Monitor for suspicious activity
