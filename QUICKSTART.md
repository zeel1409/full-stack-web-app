# Quick Start Guide

Get the Speech-to-Text application running locally in minutes.

## Prerequisites

- Node.js 16+ installed
- npm or yarn
- A Supabase account (free tier available at supabase.com)
- A code editor (VSCode recommended)

## Step 1: Clone or Setup

If you have the project ready, navigate to the project directory:

```bash
cd project
```

## Step 2: Frontend Setup

### Install Dependencies
```bash
npm install
```

### Environment Variables

The `.env` file is already configured with Supabase credentials:

```
VITE_SUPABASE_URL=https://brkaboejewwlxehmwgcl.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJya2Fib2VqZXd3bHhlaG13Z2NsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwODMwNjcsImV4cCI6MjA4NTY1OTA2N30.R0qntiNlFWo9IE6cQT7_oIUQ1etT8SUlCFcLMSuuokU
```

If you want to use a different Supabase project:
1. Create a project at https://supabase.com
2. Get your URL and ANON KEY from Settings > API
3. Update the `.env` file

### Run Frontend

```bash
npm run dev
```

The app will open at `http://localhost:5173`

## Step 3: Backend Setup

### Install Dependencies
```bash
cd backend
npm install
```

### Environment Variables

Copy the example file:
```bash
cp .env.example .env
```

Update `.env` with your Supabase credentials:
```
NODE_ENV=development
PORT=3000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
FRONTEND_URL=http://localhost:5173
```

To get the SERVICE_ROLE_KEY:
1. Go to Supabase Dashboard
2. Settings > API Keys
3. Copy the "service_role" secret key

### Run Backend

```bash
npm run dev
```

The API will run at `http://localhost:3000`

## Step 4: Test the Application

1. Open http://localhost:5173 in your browser
2. Click "Sign Up" to create an account
3. Enter email, password, and name
4. Log in with your credentials
5. Click the microphone button to record speech
6. Your speech will be transcribed in real-time
7. Click "Save Transcript" to store it
8. View, edit, or delete saved transcripts

## Step 5: Test with Backend

If you want to use the Express backend instead of direct Supabase:

Update frontend `.env`:
```
VITE_API_URL=http://localhost:3000/api
```

Restart frontend with `npm run dev`

Now all transcript operations will go through your backend API.

## Troubleshooting

### Speech Recognition Not Working

- **Issue**: "Browser does not support speech recognition"
  - **Solution**: Use Chrome, Edge, or Safari. Firefox has limited support.

- **Issue**: Microphone not working
  - **Solution**: Check browser permissions. Go to Settings > Privacy > Microphone.

### Backend Not Connecting

- **Issue**: "Failed to save transcript"
  - **Solution**: Check backend is running on port 3000. Verify CORS settings.

- **Issue**: "Invalid or expired token"
  - **Solution**: Log out and log back in. Tokens expire after time.

### Database Issues

- **Issue**: "Failed to load transcripts"
  - **Solution**: Check Supabase URL and ANON_KEY in `.env`

- **Issue**: "Row Level Security" errors
  - **Solution**: The database migration may not have been applied. Check Supabase SQL Editor for the `transcripts` table.

### Port Already in Use

- **Frontend**: If port 5173 is in use, Vite will use the next available port
- **Backend**: Change PORT in `.env` if 3000 is in use

## Project Structure

```
project/
├── src/                          # Frontend React code
│   ├── pages/                    # Login, Signup, Dashboard
│   ├── contexts/                 # Authentication state
│   ├── hooks/                    # Speech recognition hook
│   └── lib/                      # Supabase & API clients
├── backend/                      # Express backend
│   ├── src/                      # Server code
│   └── dist/                     # Compiled output
├── supabase/                     # Database migrations
└── .env                          # Environment variables
```

## Next Steps

1. **Customize the UI**: Edit components in `src/pages/` and `src/components/`
2. **Add Features**: Implement pagination, search, or export functionality
3. **Deploy**: See `DEPLOYMENT.md` for production deployment
4. **Add Tests**: Use Jest and Cypress for testing
5. **Monitor**: Set up error tracking and analytics

## Documentation

- `PROJECT_STRUCTURE.md` - Complete architecture overview
- `API_DOCUMENTATION.md` - REST API reference
- `DEPLOYMENT.md` - Production deployment guide
- `backend/README.md` - Backend-specific documentation

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review error messages in browser console (F12)
3. Check backend logs in terminal
4. Visit Supabase documentation: https://supabase.com/docs
5. Check Web Speech API docs: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API

## Quick Commands Reference

```bash
# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run typecheck    # Check TypeScript errors
npm run lint         # Run ESLint

# Backend
cd backend
npm run dev          # Start development server
npm run build        # Build TypeScript
npm start            # Run production build
npm run lint         # Run ESLint
```

## Environment Variables Checklist

### Frontend (.env)
- [ ] VITE_SUPABASE_URL set
- [ ] VITE_SUPABASE_ANON_KEY set
- [ ] VITE_API_URL set (optional, for backend)

### Backend (backend/.env)
- [ ] NODE_ENV set to development
- [ ] PORT set (default: 3000)
- [ ] SUPABASE_URL set
- [ ] SUPABASE_ANON_KEY set
- [ ] SUPABASE_SERVICE_ROLE_KEY set
- [ ] FRONTEND_URL set to http://localhost:5173

## Success Checklist

- [ ] Frontend runs on http://localhost:5173
- [ ] Backend runs on http://localhost:3000
- [ ] Can sign up with email/password
- [ ] Can log in
- [ ] Microphone button starts recording
- [ ] Speech is transcribed in real-time
- [ ] Can save transcripts
- [ ] Can view saved transcripts
- [ ] Can edit transcripts
- [ ] Can delete transcripts
- [ ] Can switch between English and Hindi

You're all set! Start building amazing transcription experiences.
