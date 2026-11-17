import { profile } from '../../content'
import { Eyebrow } from '../ui/Eyebrow'

export function ContactCallout() {
  return (
    <section className="contact-callout">
      <div className="wrap callout-inner">
        <div>
          <Eyebrow>Next step</Eyebrow>
          <h2>
            Have a research, engineering,
            <br />
            or collaboration idea?
          </h2>
          <p>
            I’m open to conversations about AI engineering, backend systems, research collaboration, and technically ambitious projects.
          </p>
        </div>
        <div className="callout-visual" aria-hidden="true">
          <img src="/images/retrieval-network.webp" alt="" loading="lazy" />
        </div>
        <div className="callout-links">
          <a href={`mailto:${profile.email}`}>
            Email <span>↗</span>
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn <span>↗</span>
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}

