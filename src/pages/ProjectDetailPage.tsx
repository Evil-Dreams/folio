import { Link, useParams } from 'react-router-dom'
import { award, projects, type Project } from '../content'
import { usePageMeta } from '../hooks/usePageMeta'
import { Eyebrow } from '../components/ui/Eyebrow'
import { TagList } from '../components/ui/TagList'
import { ProjectArtwork } from '../components/ProjectArtwork'
import { ContactCallout } from '../components/home/ContactCallout'
import { NotFoundPage } from './NotFoundPage'

function ProjectVisual({ project }: { project: Project }) {
  const pipeline =
    project.slug === 'sentio-kairo'
      ? ['MACHINE / LOGS', 'CONTEXT', 'RETRIEVAL', 'FINE-TUNED SLM', 'DIAGNOSTIC', 'VOICE / OPERATOR']
      : project.slug === 'rlhf-for-slm'
      ? ['SCENARIOS', 'BASE MODEL', 'PREFERENCE ALIGNMENT', 'EVALUATION', 'TRADE-OFFS']
      : project.slug === 'guider'
      ? ['STUDENT PROFILE', 'INTENT', 'RETRIEVAL', 'RERANKING', 'GUIDANCE']
      : project.slug === 'multimodal-reasoning-engine'
      ? ['EXPAND', 'SCORE', 'AGGREGATE', 'PRUNE']
      : ['INPUT', 'PROCESS', 'OUTPUT']

  return (
    <div className={`case-artwork case-artwork-${project.slug}`}>
      <ProjectArtwork project={project} size="case" />
      <div className="architecture">
        <div className="architecture-label">
          <span>DOCUMENTED FLOW</span>
          <span>{project.slug === 'sentio-kairo' ? 'EDGE PATH / JETSON NANO' : 'SYSTEM VIEW'}</span>
        </div>
        <ol className="architecture-flow" aria-label={`Conceptual process for ${project.title}`}>
          {pipeline.map((s, i) => (
            <li className="architecture-node" key={s}>
              <small>0{i + 1}</small>
              <strong>{s}</strong>
            </li>
          ))}
        </ol>
        <p>Conceptual view of the documented project scope</p>
      </div>
    </div>
  )
}

function ProjectDetail({ project }: { project: Project }) {
  usePageMeta(project.title, project.summary)
  const index = projects.indexOf(project)
  const prev = projects[(index + projects.length - 1) % projects.length]
  const next = projects[(index + 1) % projects.length]

  return (
    <>
      <div className="wrap breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/work">Work</Link>
        <span>/</span>
        <span>{project.title}</span>
      </div>
      <header className="case-hero wrap">
        <div className="case-copy">
          <Eyebrow index={String(index + 1).padStart(2, '0')}>{project.category}</Eyebrow>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
          <div className="case-meta">
            {project.status && (
              <span>
                <small>STATUS</small>
                {project.status}
              </span>
            )}
            {project.role && (
              <span>
                <small>ROLE</small>
                {project.role}
              </span>
            )}
          </div>
        </div>
        <ProjectVisual project={project} />
      </header>
      <div className="wrap case-body">
        <aside className="case-aside">
          <div>
            <span className="aside-label">IN THIS CASE STUDY</span>
            <a href="#context">Context</a>
            <a href="#approach">Approach</a>
            {project.outcomes && <a href="#results">Results</a>}
            {project.limitations && <a href="#limits">Limitations</a>}
          </div>
          <Link className="text-link" to="/contact">
            Discuss this work <span>↗</span>
          </Link>
        </aside>
        <article className="case-content">
          <section id="context" className="case-section">
            <Eyebrow index="01">Problem / context</Eyebrow>
            <h2>Why this work exists</h2>
            <p>{project.context}</p>
          </section>
          <section id="approach" className="case-section">
            <Eyebrow index="02">System / approach</Eyebrow>
            <h2>How the system is framed</h2>
            <ul className="detail-list">
              {project.approach.map((s, i) => (
                <li key={s}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {s}
                </li>
              ))}
            </ul>
          </section>
          {project.outcomes && (
            <section id="results" className="case-section">
              <Eyebrow index="03">Evaluation / results</Eyebrow>
              <h2>
                {project.slug === 'rlhf-for-slm'
                  ? 'A mixed result, reported in full.'
                  : 'Reported testbed results'}
              </h2>
              {project.slug === 'rlhf-for-slm' && (
                <p className="table-note">
                  Base Phi-3 Mini compared with DPO-LoRA-adapted Phi-3 Mini. Values are shown as base → adapted.
                </p>
              )}
              <div className="outcome-grid">
                {project.outcomes.map(([label, value]) => (
                  <div className="outcome" key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
              {project.slug === 'sentio-kairo' && (
                <p className="table-note">
                  These results refer to the reported Kairo-Logs testbed and evaluation setup, not broad real-world industrial validation. Latency definitions were not specified.
                </p>
              )}
            </section>
          )}
          {project.stack.length > 0 && (
            <section className="case-section">
              <Eyebrow index="04">Tools / techniques</Eyebrow>
              <h2>Technical scope</h2>
              <TagList items={project.stack} />
            </section>
          )}
          {project.limitations && (
            <section id="limits" className="case-section">
              <Eyebrow index="05">Limitations</Eyebrow>
              <h2>What this does not establish</h2>
              <ul className="limit-list">
                {project.limitations.map(x => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </section>
          )}
          {project.slug === 'sentio-kairo' && (
            <section className="award-panel">
              <span className="award-mark">R</span>
              <div>
                <Eyebrow>Recognition</Eyebrow>
                <h3>{award.title}</h3>
                <p>
                  {award.event}
                  <br />
                  {award.date}
                </p>
                <small>Presentation award associated with SENTIO-KAIRO.</small>
              </div>
            </section>
          )}
        </article>
      </div>
      <section className="related wrap">
        <div className="related-heading">
          <Eyebrow>Continue exploring</Eyebrow>
          <h2>More work</h2>
        </div>
        <div className="next-projects">
          <Link to={`/work/${prev.slug}`}>
            <small>PREVIOUS</small>
            <strong>← {prev.title}</strong>
          </Link>
          <Link to={`/work/${next.slug}`}>
            <small>NEXT</small>
            <strong>{next.title} →</strong>
          </Link>
        </div>
      </section>
      <ContactCallout />
    </>
  )
}

export function ProjectDetailPage() {
  const { slug = '' } = useParams()
  const project = projects.find(p => p.slug === slug)
  if (!project) return <NotFoundPage />
  return <ProjectDetail project={project} />
}

