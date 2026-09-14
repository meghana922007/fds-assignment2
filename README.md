# Pinikeshi Meghana — Interactive Full-Stack Portfolio

## 🎥 Demo & Assignment Link
- **Demo Video**: https://drive.google.com/drive/folders/1ro6N2AiwMb3mvI9XlDEMJNgsgn94S6sg?usp=drive_link


- **Project Structure**: React Frontend (`/src`) + Node.js/Express Backend (`/server`)

A full-stack web application extending Assignment 2 by integrating a live Express.js backend API. The static project data and client-side contact form are now served and handled dynamically by the backend API. All Assignment 2 features (client-side routing, dark mode toggle, layout, dynamic detail pages) continue to work seamlessly.

---

## 🚀 Setup & Run Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Running the Full-Stack Application

The application requires running two processes simultaneously:

#### 1. Start the Backend API Server
```bash
# Navigate to the server folder
cd server

# Install backend dependencies (express, cors, dotenv)
npm install

# Start the backend server (runs on port 5001)
npm start
# OR for development watching:
npm run dev
```

#### 2. Start the Frontend React App
```bash
# Open a new terminal window in the root directory
cd portfolio-react

# Install frontend dependencies (if not installed)
npm install

# Start the Vite development server (runs on port 5173 with proxy to 5001)
npm run dev
```

#### 3. Access in Browser
Navigate to `http://localhost:5173` in your web browser.

---

## 📁 Repository Structure

```
portfolio-react/
├── server/                        # Node.js/Express Backend
│   ├── data/
│   │   ├── projects.json          # Server-side project data storage
│   │   └── contacts.json          # Persistent contact submissions storage
│   ├── .env                       # Local environment variables
│   ├── .env.example               # Template environment variables
│   ├── package.json               # Backend dependencies & scripts
│   └── server.js                  # Main Express API server
├── public/
│   └── assets/                    # Public project image assets
├── src/
│   ├── components/
│   │   ├── ContactForm.jsx        # Submits contact data to POST /api/contact
│   │   ├── ProjectCard.jsx        # Renders individual project card
│   │   ├── Navbar.jsx             # Navigation & theme toggle
│   │   └── Layout.jsx             # Page layout wrapper
│   ├── pages/
│   │   ├── Projects.jsx           # Fetches GET /api/projects via useEffect
│   │   ├── ProjectDetail.jsx      # Fetches GET /api/projects/:id via useEffect
│   │   ├── Contact.jsx            # Contact page wrapper
│   │   └── Home.jsx               # Hero & landing page
│   ├── App.jsx                    # Top-level routing & theme state
│   └── App.css                    # Application styles
├── curl_commands.md               # cURL test suite for B1–B7 endpoints
├── portfolio_api.postman_collection.json # Exported Postman Collection
├── vite.config.js                 # Proxy configuration (/api -> http://localhost:5001)
└── README.md                      # Documentation
```

---

## ⚙️ Environment Configuration (`.env.example`)

The backend uses `dotenv` to load environment variables from `server/.env`. A `.env.example` template file is included:

```env
# Server Port Configuration
PORT=5001

# Allowed Origin for CORS
CLIENT_URL=http://localhost:5173

# Data File Paths
PROJECTS_FILE=./data/projects.json
CONTACTS_FILE=./data/contacts.json
```

> [!NOTE]
> `PORT` is set to `5001` to avoid port collisions with macOS AirPlay (which binds to port 5000 by default).

---

## 📡 API Endpoints Documentation (B1–B7)

### 1. Health Check Endpoint
- **Method & Path**: `GET /`
- **Description**: Confirms the backend API server is running.
- **Success Response (`200 OK`)**:
  ```json
  {
    "status": "ok",
    "message": "Portfolio API is running smoothly"
  }
  ```

### 2. List Projects Endpoint
- **Method & Path**: `GET /api/projects`
- **Description**: Returns array of all project objects.
- **Success Response (`200 OK`)**:
  ```json
  [
    {
      "id": "ai-video-search",
      "title": "AI Video Search Engine",
      "year": "2026",
      "description": "An AI-powered video search engine...",
      "highlights": ["Converted unstructured videos...", "Containerized microservice..."],
      "stack": ["Python", "FastAPI", "React", "Docker", "Qdrant", "Whisper"],
      "link": "https://github.com/SiddhantSangaonkar/ai-video-search",
      "accent": "var(--coral)",
      "image": "/assets/project-ai-video.png"
    }
  ]
  ```

### 3. Single Project Endpoint
- **Method & Path**: `GET /api/projects/:id`
- **Description**: Returns project details matching the given `id`.
- **Success Response (`200 OK`)**: Project object matching `id`.
- **Error Response (`404 Not Found`)**:
  ```json
  {
    "error": "Project not found"
  }
  ```

### 4. Submit Contact Form Endpoint
- **Method & Path**: `POST /api/contact`
- **Description**: Accepts contact submission `{ name, email, subject, message }`, validates input, and persists data.
- **Validation Rules**:
  - Missing `name`, `email`, or `message` -> `400 Bad Request` with field-specific error.
  - Invalid email format (missing `@` or domain) -> `400 Bad Request`.
- **Success Response (`201 Created`)**:
  ```json
  {
    "message": "Contact submission received successfully",
    "submission": {
      "id": "sub_1789389713639_dyim",
      "name": "Jane Developer",
      "email": "jane@example.com",
      "subject": "Collaboration",
      "message": "Hello!",
      "submittedAt": "2026-09-14T12:41:53.639Z"
    }
  }
  ```

### 5. List Contact Submissions Endpoint
- **Method & Path**: `GET /api/contact`
- **Description**: Returns JSON array of all stored contact form submissions.
- **Open Endpoint Notice**: As specified by assignment requirements, this endpoint requires no authentication to allow verification of submitted form data during evaluation.

### 6. Centralized Error & 404 Handling
- **Undefined Routes**: Any request to an unmapped path (e.g. `GET /api/doesnotexist`) returns `404 Not Found` with:
  ```json
  {
    "error": "Route /api/doesnotexist not found"
  }
  ```
- **Global Error Handler**: Unhandled errors trigger the Express error middleware `(err, req, res, next)` and return a JSON error response without crashing the server.

### 7. CORS & Storage Details
- **CORS Support**: Configured via the `cors` package to allow requests from the React development server (`http://localhost:5173`).
- **Data Persistence**: Stored server-side in JSON files (`server/data/projects.json` and `server/data/contacts.json`), ensuring submissions persist across server restarts without requiring heavy database setup.

---

## 🧪 Testing & Postman Deliverables

- **cURL Command Suite**: Available in [`curl_commands.md`](./curl_commands.md) with exact test commands for all endpoints (including valid and invalid validation cases).
- **Postman Collection**: Exported JSON collection available in [`portfolio_api.postman_collection.json`](./portfolio_api.postman_collection.json).

---

**Crafted with ♥ by Pinikeshi Meghana**  
Roll No. 24CSB0A54 · NIT Warangal · 2026
