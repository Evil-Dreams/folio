import { Link } from 'react-router-dom'
import { experience, experienceImpact } from '../../content'
import { SectionHeading } from '../ui/SectionHeading'

export function HomeExperiencePreview() {
  return (
    <section className="home-experience wrap">
      <SectionHeading
        eyebrow="Experience"
        title="Engineering across the stack."
        copy="Product work, integration engineering, and data workflows, grounded in tracked changes and careful validation."
        action={
          <Link className="text-link" to="/experience">
            See the full experience <span aria-hidden="true">→</span>
          </Link>
        }
      />
      <div className="home-impact-wide">
        {experienceImpact.map(metric => (
          <div key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </div>
      <div className="home-experience-grid">
        {experience.map((item, index) => (
          <article className="home-experience-card" key={item.role}>
            <div className="home-experience-top">
              <span>
                0{index + 1} / {index === 0 ? 'CURRENT' : 'INTERNSHIP'}
              </span>
              <span>{item.period}</span>
            </div>
            <h3>{item.role}</h3>
            <strong>{item.organization}</strong>
            <p>{item.summary}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

