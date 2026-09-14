# API Test Commands (cURL Suite)

This file documents curl commands for all seven backend endpoints (B1–B7), including both success cases and validation error / failure cases.

---

## B1: Health Check Endpoint (`GET /`)

### Success Case
```bash
curl -i -X GET http://localhost:5001/
```
**Expected Response (`200 OK`)**:
```json
{
  "status": "ok",
  "message": "Portfolio API is running smoothly"
}
```

---

## B2: Serve Project List (`GET /api/projects`)

### Success Case
```bash
curl -i -X GET http://localhost:5001/api/projects
```
**Expected Response (`200 OK`)**:
```json
[
  {
    "id": "ai-video-search",
    "title": "AI Video Search Engine",
    "year": "2026",
    "description": "An AI-powered video search engine enabling semantic text-based search...",
    "highlights": ["Converted unstructured videos...", "Containerized microservice..."],
    "stack": ["Python", "FastAPI", "React", "Docker", "Qdrant", "Whisper"],
    "link": "https://github.com/SiddhantSangaonkar/ai-video-search",
    "accent": "var(--coral)",
    "image": "/assets/project-ai-video.png"
  }
]
```

---

## B3: Serve Single Project (`GET /api/projects/:id`)

### Success Case (Valid Project ID)
```bash
curl -i -X GET http://localhost:5001/api/projects/ai-video-search
```
**Expected Response (`200 OK`)**:
```json
{
  "id": "ai-video-search",
  "title": "AI Video Search Engine",
  "year": "2026",
  "description": "An AI-powered video search engine enabling semantic text-based search...",
  "highlights": ["Converted unstructured videos..."],
  "stack": ["Python", "FastAPI", "React", "Docker"],
  "link": "https://github.com/SiddhantSangaonkar/ai-video-search",
  "accent": "var(--coral)",
  "image": "/assets/project-ai-video.png"
}
```

### Failure Case (Non-existent Project ID)
```bash
curl -i -X GET http://localhost:5001/api/projects/non-existent-project-id
```
**Expected Response (`404 Not Found`)**:
```json
{
  "error": "Project not found"
}
```

---

## B4: Handle Contact Submissions (`POST /api/contact`)

### Success Case (Valid Submission)
```bash
curl -i -X POST http://localhost:5001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Developer",
    "email": "jane@example.com",
    "subject": "Full Stack Role",
    "message": "Hi Meghana, we would love to connect with you regarding a software engineering role!"
  }'
```
**Expected Response (`201 Created`)**:
```json
{
  "message": "Contact submission received successfully",
  "submission": {
    "id": "sub_1789389713639_dyim",
    "name": "Jane Developer",
    "email": "jane@example.com",
    "subject": "Full Stack Role",
    "message": "Hi Meghana, we would love to connect with you regarding a software engineering role!",
    "submittedAt": "2026-09-14T12:41:53.639Z"
  }
}
```

### Failure Case 1: Missing Required Field (`message`)
```bash
curl -i -X POST http://localhost:5001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Developer",
    "email": "jane@example.com"
  }'
```
**Expected Response (`400 Bad Request`)**:
```json
{
  "error": "Message is required"
}
```

### Failure Case 2: Invalid Email Format (missing `@` or domain)
```bash
curl -i -X POST http://localhost:5001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Developer",
    "email": "janeatdomaindotcom",
    "message": "Hello there"
  }'
```
**Expected Response (`400 Bad Request`)**:
```json
{
  "error": "Invalid email address format (missing @ or valid domain)"
}
```

---

## B5: List Submissions (`GET /api/contact`)

### Success Case
```bash
curl -i -X GET http://localhost:5001/api/contact
```
**Expected Response (`200 OK`)**:
```json
[
  {
    "id": "sub_1789389713639_dyim",
    "name": "Jane Developer",
    "email": "jane@example.com",
    "subject": "Full Stack Role",
    "message": "Hi Meghana, we would love to connect with you regarding a software engineering role!",
    "submittedAt": "2026-09-14T12:41:53.639Z"
  }
]
```

---

## B6: Catch-All 404 Handler (`GET /api/undefined-route`)

### Failure Case (Undefined Route)
```bash
curl -i -X GET http://localhost:5001/api/undefined-route
```
**Expected Response (`404 Not Found`)**:
```json
{
  "error": "Route /api/undefined-route not found"
}
```

---

## B7: CORS Verification Header

### Options / Preflight Check
```bash
curl -i -X OPTIONS http://localhost:5001/api/projects \
  -H "Access-Control-Request-Method: GET" \
  -H "Origin: http://localhost:5173"
```
**Expected Response (`204 No Content` / `200 OK`)**:
```
Access-Control-Allow-Origin: http://localhost:5173
```
