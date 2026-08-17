import { useState } from 'react'
import { Link } from 'react-router-dom'

function ProjectCard({ id, title, year, description, highlights, stack, link, accent, image }) {
  // Independent state per card instance for "view details" toggle
  const [expanded, setExpanded] = useState(false)

  return (
    <article className="project-card" style={{ '--card-accent': accent }}>
      {image && (
        <div className="project-card-image-wrapper">
          <img src={image} alt={title} className="project-card-image" />
        </div>
      )}
      <div className="project-card-body">
        <div className="project-header">
          <span className="project-year">{year}</span>
          <div className="project-links">
            <a
              href={link}
              className="project-link"
              aria-label={`View ${title} project`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>

        <h3 className="project-name">
          <Link to={`/projects/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {title}
          </Link>
        </h3>

        <p className="project-desc">{description}</p>

        <button
          className="view-details-btn"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          {expanded ? 'Hide details ↑' : 'View details →'}
        </button>

        {expanded && (
          <ul className="project-highlights">
            {highlights.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )}

        <div className="project-stack">
          {stack.map((tech) => (
            <span key={tech} className="stack-item">{tech}</span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
