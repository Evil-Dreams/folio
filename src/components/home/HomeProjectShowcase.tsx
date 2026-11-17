import { Link } from 'react-router-dom'
import { projects, type Project } from '../../content'
import { SectionHeading } from '../ui/SectionHeading'
import { ProjectCard } from '../ui/ProjectCard'

const homeProjectSlugs = ['guider', 'iblis', 'multimodal-reasoning-engine', 'cnc-digital-twin']

export function HomeProjectShowcase() {
  const selected = homeProjectSlugs
    .map(slug => projects.find(project => project.slug === slug))
    .filter((project): project is Project => Boolean(project))

  return (
    <section className="home-projects wrap">
      <SectionHeading
        eyebrow="Selected projects"
        title="Systems built for real workflows."
        copy="A few projects across education technology, local AI, structured reasoning, and industrial simulation."
        action={
          <Link className="text-link" to="/work">
            Browse all projects <span aria-hidden="true">→</span>
          </Link>
        }
      />
      <div className="home-project-grid">
        {selected.map((project, index) => (
          <ProjectCard project={project} index={index} key={project.slug} />
        ))}
      </div>
    </section>
  )
}

