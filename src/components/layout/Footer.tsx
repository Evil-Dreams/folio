import { Link } from 'react-router-dom'
import { profile } from '../../content'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-main">
        <div>
          <Link to="/" className="footer-name">
            Vibishan Anandhan
          </Link>
          <p>AI systems · Backend engineering · SLM research</p>
        </div>
        <div className="footer-links">
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn <span>↗</span>
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub <span>↗</span>
          </a>
          <a href={`mailto:${profile.email}`}>
            Email <span>↗</span>
          </a>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Built for clarity, with care.</span>
      </div>
    </footer>
  )
}

