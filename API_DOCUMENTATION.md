# API Documentation

Complete reference for all backend API endpoints.

## Base URL

Development: `http://localhost:3000/api`
Production: `https://your-backend-domain.com/api`

## Authentication

All endpoints (except health check) require JWT authentication via the `Authorization` header:

```
Authorization: Bearer <your-jwt-token>
```

Obtain tokens via Supabase Auth in the frontend.

## Health Check

### `GET /health`

Check if the server is running.

**No authentication required**

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-02-04T10:30:00.000Z"
}
```

---

## Transcripts

### `POST /api/transcripts`

Create a new transcript.

**Authentication:** Required

**Request Body:**
```json
{
  "text": "Your transcribed speech text",
  "language": "en"
}
```

**Parameters:**
- `text` (string, required): The transcribed text (1-10000 chars)
- `language` (string, required): Language code ("en" or "hi")

**Response (201 Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "user_id": "550e8400-e29b-41d4-a716-446655440001",
  "text": "Your transcribed speech text",
  "language": "en",
  "created_at": "2025-02-04T10:30:00.000Z",
  "updated_at": "2025-02-04T10:30:00.000Z"
}
```

**Error Response (400):**
```json
{
  "error": "Validation error",
  "details": [
    {
      "field": "text",
      "message": "Text is required"
    }
  ]
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/transcripts \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello, this is my speech",
    "language": "en"
  }'
```

---

### `GET /api/transcripts`

Retrieve all transcripts for the authenticated user.

**Authentication:** Required

**Query Parameters:** None

**Response (200 OK):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "user_id": "550e8400-e29b-41d4-a716-446655440001",
    "text": "First transcript",
    "language": "en",
    "created_at": "2025-02-04T10:30:00.000Z",
    "updated_at": "2025-02-04T10:30:00.000Z"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "user_id": "550e8400-e29b-41d4-a716-446655440001",
    "text": "Second transcript",
    "language": "hi",
    "created_at": "2025-02-04T09:30:00.000Z",
    "updated_at": "2025-02-04T09:30:00.000Z"
  }
]
```

**Error Response (401):**
```json
{
  "error": "Invalid or expired token"
}
```

**Example:**
```bash
curl -X GET http://localhost:3000/api/transcripts \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

### `GET /api/transcripts/:id`

Retrieve a specific transcript by ID.

**Authentication:** Required

**Path Parameters:**
- `id` (string, required): The transcript UUID

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "user_id": "550e8400-e29b-41d4-a716-446655440001",
  "text": "My transcript",
  "language": "en",
  "created_at": "2025-02-04T10:30:00.000Z",
  "updated_at": "2025-02-04T10:30:00.000Z"
}
```

**Error Response (404):**
```json
{
  "error": "Transcript not found"
}
```

**Example:**
```bash
curl -X GET http://localhost:3000/api/transcripts/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

### `PATCH /api/transcripts/:id`

Update an existing transcript.

**Authentication:** Required

**Path Parameters:**
- `id` (string, required): The transcript UUID

**Request Body:**
```json
{
  "text": "Updated transcript text",
  "language": "en"
}
```

**Parameters:**
- `text` (string, optional): Updated text (1-10000 chars)
- `language` (string, optional): Language code ("en" or "hi")

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "user_id": "550e8400-e29b-41d4-a716-446655440001",
  "text": "Updated transcript text",
  "language": "en",
  "created_at": "2025-02-04T10:30:00.000Z",
  "updated_at": "2025-02-04T10:35:00.000Z"
}
```

**Error Response (404):**
```json
{
  "error": "Transcript not found"
}
```

**Example:**
```bash
curl -X PATCH http://localhost:3000/api/transcripts/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Updated content here"
  }'
```

---

### `DELETE /api/transcripts/:id`

Delete a transcript.

**Authentication:** Required

**Path Parameters:**
- `id` (string, required): The transcript UUID

**Response (204 No Content):**
Empty response body

**Error Response (404):**
```json
{
  "error": "Transcript not found"
}
```

**Example:**
```bash
curl -X DELETE http://localhost:3000/api/transcripts/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Error Handling

### Common Error Responses

**401 Unauthorized**
```json
{
  "error": "Missing authorization header"
}
```

**400 Bad Request**
```json
{
  "error": "Validation error",
  "details": [
    {
      "field": "language",
      "message": "Invalid language code"
    }
  ]
}
```

**500 Internal Server Error**
```json
{
  "error": "Internal server error"
}
```

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - New resource created |
| 204 | No Content - Delete successful |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing/invalid token |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Error - Server error |

---

## Rate Limiting

Currently, no rate limiting is implemented. For production, consider adding:

```bash
# Example: 100 requests per 15 minutes per IP
npm install express-rate-limit
```

---

## Pagination

Currently not implemented. For large datasets, consider adding:

```typescript
// Example query parameters
GET /api/transcripts?page=1&limit=20&sort=created_at
```

---

## Frontend Integration

### Using the API Client

```typescript
import { api } from '@/lib/api';

// Create transcript
const transcript = await api.createTranscript(
  "Your speech text",
  "en"
);

// Get all transcripts
const transcripts = await api.getTranscripts();

// Get specific transcript
const transcript = await api.getTranscript("transcript-id");

// Update transcript
await api.updateTranscript("transcript-id", "Updated text", "en");

// Delete transcript
await api.deleteTranscript("transcript-id");
```

### Fetch API Example

```typescript
const token = await getAuthToken(); // From Supabase

const response = await fetch('http://localhost:3000/api/transcripts', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

const transcripts = await response.json();
```

---

## WebSocket Support

Not currently implemented. Consider for real-time updates:

```typescript
// Future enhancement
const ws = new WebSocket('ws://localhost:3000/ws');
ws.onmessage = (event) => {
  console.log('Real-time update:', event.data);
};
```

---

## Versioning

Current API version: `v1` (implicit)

Future versions can be supported via `/api/v2/...`

---

## CORS

Configured to allow requests from:
- Localhost: `http://localhost:5173`
- Production: Set via `FRONTEND_URL` environment variable

Allowed methods: GET, POST, PATCH, DELETE, OPTIONS
Allowed headers: Content-Type, Authorization

---

## Testing

### Using Postman

1. Create environment with variables:
   - `base_url`: http://localhost:3000/api
   - `token`: Your JWT token

2. Import requests and use `{{base_url}}` and `{{token}}` variables

### Using cURL

See examples in each endpoint section above.

### Using Node.js

```bash
npm install node-fetch
```

```javascript
import fetch from 'node-fetch';

const response = await fetch(
  'http://localhost:3000/api/transcripts',
  {
    headers: {
      'Authorization': 'Bearer YOUR_TOKEN'
    }
  }
);

const data = await response.json();
console.log(data);
```
