import { Link } from 'react-router-dom'
import type { Project } from '../../content'
import { ProjectArtwork } from '../ProjectArtwork'
import { TagList } from './TagList'

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <Link
      to={`/work/${project.slug}`}
      className={`project-card ${project.featured ? 'featured-card' : ''}`}
    >
      <div className="project-card-top">
        <span className="project-number">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <ProjectArtwork project={project} />
      <div className="project-card-copy">
        <p className="project-category">{project.category}</p>
        <h3>{project.title}</h3>
        <p className="project-summary">{project.summary}</p>
        {project.stack.length > 0 && <TagList items={project.stack.slice(0, 3)} />}
        <span className="read-link">
          Read case study <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  )
}

