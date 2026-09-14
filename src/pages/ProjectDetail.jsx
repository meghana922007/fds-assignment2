import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

function ProjectDetail() {
  const { projectId } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [notFound, setNotFound] = useState(false)

  const fetchProjectDetail = async () => {
    setLoading(true)
    setError(null)
    setNotFound(false)
    try {
      const response = await fetch(`/api/projects/${projectId}`)
      if (response.status === 404) {
        setNotFound(true)
        return
      }
      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`)
      }
      const data = await response.json()
      setProject(data)
    } catch (err) {
      console.error('Error fetching project detail:', err)
      setError('Unable to fetch project details from backend API.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjectDetail()
  }, [projectId])

  if (loading) {
    return (
      <section className="loading-screen" style={{ minHeight: '300px' }} aria-live="polite">
        <div className="loading-spinner"></div>
        <p className="loading-text">Fetching project details from API...</p>
      </section>
    )
  }

  if (notFound) {
    return (
      <section className="not-found-section">
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Project Not Found</h2>
        <p className="not-found-text">The project you're looking for doesn't exist on the server.</p>
        <Link to="/projects" className="btn btn-primary">Back to Projects</Link>
      </section>
    )
  }

  if (error) {
    return (
      <section className="project-detail-section">
        <div className="container">
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
              Backend Error
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-md)' }}>
              {error}
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-sm)', justifyContent: 'center' }}>
              <button className="btn btn-primary" onClick={fetchProjectDetail}>
                Retry ↻
              </button>
              <Link to="/projects" className="btn btn-secondary">
                ← Back to Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="project-detail-section">
      <div className="container">
        <div className="project-detail-header">
          <div className="project-detail-accent" style={{ '--card-accent': project.accent }}></div>
          <span className="project-detail-year">{project.year}</span>
          <h1 className="project-detail-title">{project.title}</h1>
        </div>

        {project.image && (
          <div className="project-detail-image-wrapper">
            <img src={project.image} alt={project.title} className="project-detail-image" />
          </div>
        )}

        <p className="project-detail-desc">{project.description}</p>

        {project.highlights && project.highlights.length > 0 && (
          <>
            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-md)', color: 'var(--text-primary)' }}>
              Key Highlights
            </h3>
            <ul className="project-detail-highlights">
              {project.highlights.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </>
        )}

        {project.stack && project.stack.length > 0 && (
          <>
            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-md)', color: 'var(--text-primary)' }}>
              Tech Stack
            </h3>
            <div className="project-detail-stack">
              {project.stack.map((tech) => (
                <span key={tech} className="stack-item">{tech}</span>
              ))}
            </div>
          </>
        )}

        <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
          {project.link && project.link !== '#' && (
            <a
              href={project.link}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Live Project →
            </a>
          )}
          <Link to="/projects" className="btn btn-secondary">
            ← Back to Projects
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ProjectDetail
