import { experience, experienceAddenda, experienceImpact } from '../content'
import { usePageMeta } from '../hooks/usePageMeta'
import { Eyebrow } from '../components/ui/Eyebrow'
import { TagList } from '../components/ui/TagList'

function ExperienceImpactSummary() {
  return (
    <section className="wrap experience-impact-summary">
      <div className="experience-impact-heading">
        <Eyebrow>Impact in my current role</Eyebrow>
        <h2>Product work from interface to runtime.</h2>
        <p>
          Tracked contribution figures describe work across a larger shared codebase, not sole ownership of the platform.
        </p>
      </div>
      <div className="experience-impact-metrics">
        {experienceImpact.map(metric => (
          <article key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </article>
        ))}
      </div>
      <ul className="experience-scope-list">
        {experienceAddenda['Software Developer Intern'].map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}

function ExperienceDetails({ item }: { item: (typeof experience)[number] }) {
  const details = [...item.details, ...(experienceAddenda[item.role] || [])]
  return (
    <details className="timeline-details">
      <summary>
        Role details <span>{details.length}</span>
      </summary>
      <ul className="detail-list">
        {details.map((detail, index) => (
          <li key={detail}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            {detail}
          </li>
        ))}
      </ul>
    </details>
  )
}

export function ExperiencePage() {
  usePageMeta(
    'Experience',
    'Work experience in software development, backend integrations, data workflows, and Python application development.'
  )

  return (
    <>
      <div className="page-intro wrap">
        <div className="page-intro-copy">
          <Eyebrow>Experience</Eyebrow>
          <h1>Internship Experience</h1>
          <p>
            Production-oriented product engineering, integrations, research-driven tooling, data workflows, and Python development.
          </p>
        </div>
      </div>
      <ExperienceImpactSummary />
      <section className="wrap timeline">
        {experience.map((item, index) => (
          <article className="timeline-item" key={item.role}>
            <span className="timeline-pin" aria-hidden="true" />
            <div className="timeline-main">
              <div className="timeline-head">
                <div>
                  <Eyebrow>
                    {item.team || 'Internship'} <span>· {String(index + 1).padStart(2, '0')}</span>
                  </Eyebrow>
                  <h2>{item.role}</h2>
                  <h3>{item.organization}</h3>
                </div>
                <span className="timeline-period">{item.period}</span>
              </div>
              <p>{item.summary}</p>
              <ExperienceDetails item={item} />
              <TagList items={item.skills} />
            </div>
          </article>
        ))}
      </section>
    </>
  )
}

