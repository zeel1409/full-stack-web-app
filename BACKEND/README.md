# Speech-to-Text Backend

Production-ready Express.js backend for the Speech-to-Text application with Supabase integration.

## Features

- **JWT Authentication**: Secure token-based authentication using Supabase
- **Transcript Management**: Create, read, update, and delete transcripts
- **User Isolation**: Row-level security ensures users only access their own data
- **Input Validation**: Zod schema validation for all requests
- **Error Handling**: Comprehensive error handling with proper HTTP status codes
- **Security**: CORS, Helmet for security headers, environment variable management
- **TypeScript**: Full type safety throughout the application

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Fill in your Supabase credentials in `.env`

### Development

Start the development server:
```bash
npm run dev
```

The server will run on `http://localhost:3000`

### Production

Build the project:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## API Endpoints

### Health Check
- `GET /health` - Check server status

### Transcripts
All transcript endpoints require `Authorization: Bearer <token>` header

- `POST /api/transcripts` - Create a new transcript
  ```json
  {
    "text": "Your transcribed text",
    "language": "en" // "en" or "hi"
  }
  ```

- `GET /api/transcripts` - Get all user transcripts

- `GET /api/transcripts/:id` - Get a specific transcript

- `PATCH /api/transcripts/:id` - Update a transcript
  ```json
  {
    "text": "Updated text",
    "language": "en"
  }
  ```

- `DELETE /api/transcripts/:id` - Delete a transcript

## Environment Variables

- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 3000)
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:5173)

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── supabase.ts        # Supabase client setup
│   ├── controllers/
│   │   └── transcriptController.ts  # Request handlers
│   ├── middleware/
│   │   ├── auth.ts            # JWT authentication
│   │   └── errorHandler.ts    # Error handling
│   ├── routes/
│   │   └── transcripts.ts     # API routes
│   ├── utils/
│   │   └── validation.ts      # Zod schemas
│   └── index.ts               # Express app setup
├── dist/                      # Compiled JavaScript
├── package.json
├── tsconfig.json
└── .env.example
```

## Security Considerations

- All routes are protected with JWT authentication
- CORS is configured to only allow requests from the frontend
- Helmet provides security headers
- Input validation with Zod prevents invalid data
- Supabase RLS policies enforce data isolation
- Environment variables keep sensitive data secure

## Error Handling

The API returns consistent error responses:

```json
{
  "error": "Error message",
  "details": []  // Optional validation details
}
```

HTTP Status Codes:
- `200` - Success
- `201` - Created
- `204` - No Content (delete success)
- `400` - Bad Request / Validation Error
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error
