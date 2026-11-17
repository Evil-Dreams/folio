import { profile } from '../content'
import { usePageMeta } from '../hooks/usePageMeta'
import { Eyebrow } from '../components/ui/Eyebrow'

function ContactArtwork() {
  return (
    <div className="contact-art" aria-hidden="true">
      <span className="contact-glass contact-glass-one" />
      <span className="contact-glass contact-glass-two" />
      <span className="contact-glass contact-glass-three" />
    </div>
  )
}

export function ContactPage() {
  usePageMeta(
    'Contact',
    'Contact Vibishan Anandhan about AI engineering, backend systems, research collaboration, and technically ambitious projects.'
  )

  return (
    <section className="wrap contact-page">
      <div className="contact-copy">
        <Eyebrow>Get in touch</Eyebrow>
        <h1>
          Let's build
          <br />
          something impactful.
        </h1>
        <p>
          Open to AI engineering roles, research collaboration, internships, and technically ambitious projects.
        </p>
        <div className="contact-details">
          <a href={`mailto:${profile.email}`}>
            <span className="contact-detail-icon" aria-hidden="true">
              ✉
            </span>
            <strong>{profile.email}</strong>
          </a>
          <a href={`tel:${profile.phone.replaceAll(' ', '')}`}>
            <span className="contact-detail-icon" aria-hidden="true">
              ☎
            </span>
            <strong>{profile.phone}</strong>
          </a>
          <div>
            <span className="contact-detail-icon" aria-hidden="true">
              ⌖
            </span>
            <strong>{profile.location}</strong>
          </div>
        </div>
        <div className="contact-socials">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
            GH
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
            in
          </a>
        </div>
      </div>
      <ContactArtwork />
    </section>
  )
}

