import { useParams, Link } from 'react-router-dom'

function ProjectDetail({ projects }) {
  const { projectId } = useParams()
  const project = projects.find((p) => p.id === projectId)

  if (!project) {
    return (
      <section className="not-found-section">
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Project Not Found</h2>
        <p className="not-found-text">The project you're looking for doesn't exist.</p>
        <Link to="/projects" className="btn btn-primary">Back to Projects</Link>
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

        <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-md)', color: 'var(--text-primary)' }}>
          Key Highlights
        </h3>
        <ul className="project-detail-highlights">
          {project.highlights.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-md)', color: 'var(--text-primary)' }}>
          Tech Stack
        </h3>
        <div className="project-detail-stack">
          {project.stack.map((tech) => (
            <span key={tech} className="stack-item">{tech}</span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
          <a
            href={project.link}
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Live Project →
          </a>
          <Link to="/projects" className="btn btn-secondary">
            ← Back to Projects
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ProjectDetail
