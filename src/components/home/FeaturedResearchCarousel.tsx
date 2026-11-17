import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../../content'
import { Eyebrow } from '../ui/Eyebrow'
import { ProjectArtwork } from '../ProjectArtwork'

export function FeaturedResearchCarousel() {
  const research = projects.filter(project => project.category === 'Research')
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [interacting, setInteracting] = useState(false)
  const project = research[active]

  const previous = () => setActive(value => (value - 1 + research.length) % research.length)
  const next = () => setActive(value => (value + 1) % research.length)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    if (paused || interacting || research.length < 2 || prefersReducedMotion) return
    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        setActive(value => (value + 1) % research.length)
      }
    }, 10000)
    return () => window.clearInterval(timer)
  }, [interacting, paused, research.length])

  return (
    <section
      id="featured-research"
      className="featured-research wrap"
      aria-roledescription="carousel"
      aria-label="Featured research"
      onPointerEnter={() => setInteracting(true)}
      onPointerLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setInteracting(false)
        }
      }}
    >
      <div className="featured-research-frame">
        <div className="featured-copy" key={`${project.slug}-copy`}>
          <Eyebrow>
            <span className="signal-dot" /> Featured research
          </Eyebrow>
          <h2>{project.title}</h2>
          <p>{project.summary}</p>
          <p className="featured-context">{project.context}</p>
          <Link className="text-link" to={`/work/${project.slug}`}>
            View research <span>→</span>
          </Link>
        </div>
        <div className="featured-art" key={`${project.slug}-art`}>
          <ProjectArtwork project={project} size="case" />
        </div>
        <div className="featured-meta">
          <span>{project.status}</span>
          <span>
            {String(active + 1).padStart(2, '0')} / {String(research.length).padStart(2, '0')}
          </span>
        </div>
        <div className="featured-controls">
          <button type="button" onClick={previous} aria-label="Show previous research project">
            ←
          </button>
          <div className="featured-pagination" role="group" aria-label="Select featured research">
            {research.map((item, index) => (
              <button
                key={item.slug}
                type="button"
                aria-label={`Show ${item.title}`}
                aria-pressed={active === index}
                className={active === index ? 'active' : ''}
                onClick={() => setActive(index)}
              />
            ))}
          </div>
          <button type="button" onClick={next} aria-label="Show next research project">
            →
          </button>
          <button
            type="button"
            className="carousel-pause"
            aria-label={paused ? 'Resume featured research rotation' : 'Pause featured research rotation'}
            aria-pressed={paused}
            onClick={() => setPaused(value => !value)}
          >
            {paused ? '▶' : 'Ⅱ'}
          </button>
        </div>
      </div>
    </section>
  )
}

