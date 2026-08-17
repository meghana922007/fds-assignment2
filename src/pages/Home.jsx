import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [loading, setLoading] = useState(true)

  // useEffect: simulate loading sequence on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    // Cleanup timer to prevent memory leaks
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <section className="loading-screen" aria-live="polite">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading portfolio...</p>
      </section>
    )
  }

  return (
    <section className="hero-section">
      <div className="container hero-grid">
        <div className="hero-content">
          <p className="hero-greeting">Hey there, I'm</p>
          <h1 className="hero-name">Pinikeshi Meghana</h1>
          <p className="hero-tagline">
            B.Tech CSE @ <span className="accent-text">NIT Warangal</span>. 
            I build things that live on the web - from AI search engines to rental platforms.
          </p>

          <div className="hero-meta">
            <span className="meta-tag">Roll No. 24CSB0A54</span>
            <span className="meta-tag">Full Stack Developer</span>
          </div>

          <div className="hero-actions">
            <Link to="/projects" className="btn btn-primary">See My Work</Link>
            <Link to="/contact" className="btn btn-secondary">Say Hello</Link>
          </div>

          <div className="social-links" aria-label="Social media links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub Profile">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn Profile">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="mailto:meghanareddypinikeshi@gmail.com" className="social-link" aria-label="Send Email">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="photo-frame">
            <div className="photo-container">
              <img src="Image.png" alt="Pinikeshi Meghana" className="profile-photo" />
            </div>
            <div className="photo-badge badge-1">NIT Warangal</div>
            <div className="photo-badge badge-2">CSE '28</div>
          </div>
        </div>
      </div>

      <div className="scroll-hint" aria-hidden="true">
        <span className="scroll-line"></span>
      </div>
    </section>
  )
}

export default Home
