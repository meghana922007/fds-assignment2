import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="not-found-section">
      <h1 className="not-found-code">404</h1>
      <h2 className="not-found-title">Page Not Found</h2>
      <p className="not-found-text">
        Oops! The page you're looking for seems to have wandered off into the digital void.
      </p>
      <Link to="/" className="btn btn-primary">
        ← Back to Home
      </Link>
    </section>
  )
}

export default NotFound
