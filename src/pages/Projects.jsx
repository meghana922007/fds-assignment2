import { useState, useEffect } from 'react'
import ProjectCard from '../components/ProjectCard.jsx'

function ProjectsGrid({ projects }) {
  return (
    <div className="projects-grid">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          title={project.title}
          year={project.year}
          description={project.description}
          highlights={project.highlights}
          stack={project.stack}
          link={project.link}
          accent={project.accent}
          image={project.image}
        />
      ))}
    </div>
  )
}

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProjects = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/projects')
      if (!response.ok) {
        throw new Error(`Failed to load projects (HTTP ${response.status})`)
      }
      const data = await response.json()
      setProjects(data)
    } catch (err) {
      console.error('Error fetching projects:', err)
      setError(
        'Unable to connect to the backend API server. Please ensure the backend server is running.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return (
    <section className="projects-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">things I've built</span>
          <h2 className="section-title">Personal Projects</h2>
        </div>

        {loading && (
          <div className="loading-screen" style={{ minHeight: '300px' }} aria-live="polite">
            <div className="loading-spinner"></div>
            <p className="loading-text">Fetching projects from API server...</p>
          </div>
        )}

        {!loading && error && (
          <div
            className="error-container"
            style={{
              padding: 'var(--space-lg)',
              backgroundColor: 'var(--card-bg)',
              border: '1px solid #e53e3e',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center',
              margin: 'var(--space-lg) 0',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-xs)' }}>⚠️</div>
            <h3 style={{ color: '#e53e3e', marginBottom: 'var(--space-xs)' }}>
              Backend Connection Error
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-md)' }}>
              {error}
            </p>
            <button className="btn btn-primary" onClick={fetchProjects}>
              Retry Connection ↻
            </button>
          </div>
        )}

        {!loading && !error && <ProjectsGrid projects={projects} />}
      </div>
    </section>
  )
}

export default Projects
