import { Link } from 'react-router-dom'
import { award, projects } from '../content'
import { usePageMeta } from '../hooks/usePageMeta'
import { Eyebrow } from '../components/ui/Eyebrow'
import { ProjectArtwork } from '../components/ProjectArtwork'

function ResearchOrbit() {
  return (
    <div className="research-orbit" aria-hidden="true">
      <img src="/images/focus-alignment-loop.webp" alt="" loading="lazy" />
    </div>
  )
}

export function ResearchPage() {
  usePageMeta(
    'Research',
    'Research projects on industrial diagnostic systems and small language model alignment, with their reported context and limitations.'
  )
  const research = projects.filter(p => p.category === 'Research')

  return (
    <>
      <div className="page-intro wrap with-visual">
        <div className="page-intro-copy">
          <Eyebrow>Research</Eyebrow>
          <h1>Research for Practical Intelligence</h1>
          <p>
            Focused on making language models efficient, aligned, and reliable for real-world systems.
          </p>
        </div>
        <div className="page-intro-visual">
          <ResearchOrbit />
        </div>
      </div>
      <section className="wrap research-page-list">
        {research.map((p, i) => (
          <article className="research-feature" key={p.slug}>
            <div className="research-feature-copy">
              <div className="research-feature-top">
                <Eyebrow index={`0${i + 1}`}>{p.status}</Eyebrow>
                <span>RESEARCH / {String(i + 1).padStart(2, '0')}</span>
              </div>
              <h2>{p.title}</h2>
              <p>{p.summary}</p>
              <ul className="research-highlights">
                {p.approach.slice(0, 2).map((item, j) => (
                  <li key={item}>
                    <span>0{j + 1}</span>
                    {item}
                  </li>
                ))}
              </ul>
              {p.slug === 'sentio-kairo' ? (
                <div className="award-panel compact">
                  <span className="award-mark">R</span>
                  <div>
                    <h3>{award.title}</h3>
                    <p>
                      {award.event} · {award.date}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="research-quick-results">
                  {p.outcomes?.slice(0, 3).map(([label, value]) => (
                    <div key={label}>
                      <small>{label}</small>
                      <strong>{value}</strong>
                    </div>
                  ))}
                </div>
              )}
              <Link className="text-link" to={`/work/${p.slug}`}>
                View full case study <span>→</span>
              </Link>
            </div>
            <div className="research-feature-art">
              <ProjectArtwork project={p} size="case" />
            </div>
          </article>
        ))}
      </section>
    </>
  )
}

