# Project Structure

Complete overview of the Speech-to-Text application architecture.

## Directory Layout

```
project/
├── frontend/                           # React frontend
│   ├── src/
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx        # Authentication state & hooks
│   │   ├── hooks/
│   │   │   └── useSpeechRecognition.ts # Web Speech API hook
│   │   ├── lib/
│   │   │   ├── supabase.ts            # Supabase client setup
│   │   │   └── api.ts                 # API client for backend
│   │   ├── pages/
│   │   │   ├── Login.tsx              # Login page
│   │   │   ├── Signup.tsx             # Registration page
│   │   │   └── Dashboard.tsx          # Main app interface
│   │   ├── App.tsx                    # Root component with routing
│   │   ├── main.tsx                   # Entry point
│   │   └── index.css                  # Global styles
│   ├── index.html                     # HTML template
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts                 # Vite configuration
│   └── tailwind.config.js             # Tailwind CSS config
│
├── backend/                            # Express backend
│   ├── src/
│   │   ├── config/
│   │   │   └── supabase.ts            # Supabase client setup
│   │   ├── controllers/
│   │   │   └── transcriptController.ts # Request handlers
│   │   ├── middleware/
│   │   │   ├── auth.ts                # JWT verification
│   │   │   └── errorHandler.ts        # Error handling
│   │   ├── routes/
│   │   │   └── transcripts.ts         # API routes
│   │   ├── utils/
│   │   │   └── validation.ts          # Zod schemas
│   │   └── index.ts                   # Express server
│   ├── dist/                          # Compiled JavaScript (built)
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── README.md
│
├── supabase/
│   └── migrations/
│       └── 20260203063917_create_transcripts_table.sql
│
├── .env                               # Environment variables
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── DEPLOYMENT.md                      # Deployment guide
└── PROJECT_STRUCTURE.md               # This file
```

## Technology Stack

### Frontend
- **Framework**: React 18.3
- **Language**: TypeScript 5.5
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React 0.344
- **Backend Integration**: @supabase/supabase-js 2.57
- **Build Tool**: Vite 5.4

### Backend
- **Runtime**: Node.js 20+
- **Framework**: Express 4.18
- **Language**: TypeScript 5.5
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Validation**: Zod 3.22
- **Security**: Helmet 7.1, CORS 2.8

### Database
- **Provider**: Supabase
- **Engine**: PostgreSQL
- **ORM**: Supabase JS Client
- **Authentication**: Supabase Auth (JWT-based)

## Data Models

### User (Supabase Auth)
```typescript
{
  id: string;                    // UUID from auth.users
  email: string;
  user_metadata: {
    name: string;
  };
  created_at: timestamp;
}
```

### Transcript
```typescript
{
  id: string;                    // UUID, primary key
  user_id: string;               // FK to auth.users
  text: string;                  // Transcribed text
  language: 'en' | 'hi';         // Language code
  created_at: timestamp;         // Creation time
  updated_at: timestamp;         // Last modification
}
```

## API Endpoints

### Health Check
```
GET /health
```

### Transcripts
All require `Authorization: Bearer <token>` header

```
POST   /api/transcripts          # Create transcript
GET    /api/transcripts          # List user's transcripts
GET    /api/transcripts/:id      # Get specific transcript
PATCH  /api/transcripts/:id      # Update transcript
DELETE /api/transcripts/:id      # Delete transcript
```

## Authentication Flow

1. User signs up/logs in with email + password
2. Supabase returns JWT token
3. Token stored in browser session
4. All API requests include token in Authorization header
5. Backend verifies token using Supabase Admin API
6. User isolation enforced via Row Level Security (RLS)

## Security Architecture

### Frontend
- JWT tokens stored in secure session storage
- CORS-protected API calls
- Input validation before sending to server
- Sensitive operations require authentication

### Backend
- JWT token verification on every protected route
- Input validation with Zod schemas
- Helmet security headers
- CORS restricted to frontend domain
- Database-level RLS policies

### Database
- Row Level Security policies on all tables
- Users can only access their own data
- Automatic user ID enforcement
- Indexes on frequently queried columns

## Build & Deployment

### Development
```bash
# Frontend
npm run dev

# Backend
cd backend
npm run dev
```

### Production Build
```bash
# Frontend
npm run build

# Backend
cd backend
npm run build
npm start
```

## Key Features

### Speech Recognition
- Uses Web Speech API for real-time transcription
- Supports English and Hindi
- Fallback error handling
- Continuous listening mode

### Transcript Management
- Create, read, update, delete operations
- Edit existing transcripts
- Automatic timestamp tracking
- Language tracking per transcript

### User Management
- Secure registration
- Email/password authentication
- Session management
- User isolation

### Error Handling
- Comprehensive validation
- User-friendly error messages
- Error logging for debugging
- Graceful fallbacks

## Performance Optimization

### Frontend
- Code splitting via Vite
- Image optimization (using Pexels URLs)
- CSS minification (Tailwind)
- Tree shaking of unused code

### Backend
- Database indexing
- Connection pooling (Supabase)
- Request validation early in pipeline
- Efficient query design

## Testing Strategy

### Manual Testing
- User authentication flow
- Speech recognition functionality
- CRUD operations on transcripts
- Error scenarios

### Recommended Tools
- Jest for unit tests
- Supertest for API integration tests
- Cypress for end-to-end tests

## Development Guidelines

### Code Organization
- Single Responsibility Principle for files
- Clear separation of concerns
- Meaningful naming conventions
- Consistent error handling

### TypeScript Usage
- Strict mode enabled
- Explicit type annotations where needed
- Reusable types for API responses
- Discriminated unions for variants

### Component Structure
- Functional components with hooks
- Custom hooks for logic extraction
- Context for global state
- Props drilling minimized

## Monitoring & Logging

### Frontend
- Console logging for development
- Error boundary recommendations
- User action tracking

### Backend
- Console logs for all requests
- Error logging with context
- Environment-based logging levels
- Stack traces in development

## Scaling Considerations

### Frontend
- Lazy loading for routes
- Virtual scrolling for large lists
- Memoization for expensive computations

### Backend
- Pagination for large result sets
- Caching layer recommendations
- Rate limiting implementation
- Load balancing ready

## Security Best Practices

1. Keep dependencies updated
2. Use environment variables for secrets
3. Validate all user input
4. Enforce HTTPS in production
5. Regular security audits
6. Database backups enabled
7. Rate limiting active
8. CORS properly configured
