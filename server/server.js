import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

// Load environment variables from .env file
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000
const CLIENT_URL = process.env.CLIENT_URL || '*'
const PROJECTS_FILE = process.env.PROJECTS_FILE
  ? path.resolve(__dirname, process.env.PROJECTS_FILE)
  : path.join(__dirname, 'data/projects.json')
const CONTACTS_FILE = process.env.CONTACTS_FILE
  ? path.resolve(__dirname, process.env.CONTACTS_FILE)
  : path.join(__dirname, 'data/contacts.json')

// Middleware setup
app.use(cors({ origin: CLIENT_URL }))
app.use(express.json())

// Helper functions for reading/writing JSON data files safely
async function readProjects() {
  try {
    const data = await fs.readFile(PROJECTS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading projects.json:', error)
    return []
  }
}

async function readContacts() {
  try {
    const data = await fs.readFile(CONTACTS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // If file doesn't exist yet, return empty array
    return []
  }
}

async function saveContacts(contacts) {
  await fs.mkdir(path.dirname(CONTACTS_FILE), { recursive: true })
  await fs.writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 2), 'utf-8')
}

// Helper email validation regex
function isValidEmail(email) {
  if (typeof email !== 'string') return false
  // Must contain @ and at least one dot after @
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

// B1: Health Check Endpoint
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Portfolio API is running smoothly' })
})

// B2: GET /api/projects - Serve Project List
app.get('/api/projects', async (req, res, next) => {
  try {
    const projects = await readProjects()
    res.status(200).json(projects)
  } catch (error) {
    next(error)
  }
})

// B3: GET /api/projects/:id - Serve a Single Project
app.get('/api/projects/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const projects = await readProjects()
    const project = projects.find((p) => p.id === id)

    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }

    res.status(200).json(project)
  } catch (error) {
    next(error)
  }
})

// B4: POST /api/contact - Handle Contact Form Submissions
app.post('/api/contact', async (req, res, next) => {
  try {
    const { name, email, message, subject } = req.body || {}

    // Validation: Missing fields
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'Name is required' })
    }
    if (!email || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({ error: 'Email is required' })
    }
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' })
    }

    // Validation: Invalid email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address format (missing @ or valid domain)' })
    }

    // Submission object creation
    const newSubmission = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      name: name.trim(),
      email: email.trim(),
      subject: subject ? subject.trim() : '',
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    }

    const contacts = await readContacts()
    contacts.push(newSubmission)
    await saveContacts(contacts)

    res.status(201).json({
      message: 'Contact submission received successfully',
      submission: newSubmission,
    })
  } catch (error) {
    next(error)
  }
})

// B5: GET /api/contact - List Submissions (for verification)
app.get('/api/contact', async (req, res, next) => {
  try {
    const contacts = await readContacts()
    res.status(200).json(contacts)
  } catch (error) {
    next(error)
  }
})

// B6: Centralized Error Handling & 404s
// Catch-all 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` })
})

// Global error-handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err)
  const statusCode = err.status || err.statusCode || 500
  res.status(statusCode).json({
    error: err.message || 'Internal Server Error',
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`)
})
