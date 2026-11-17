import { useState } from 'react'
import { projects, type Project } from '../content'
import { usePageMeta } from '../hooks/usePageMeta'
import { Eyebrow } from '../components/ui/Eyebrow'
import { ProjectCard } from '../components/ui/ProjectCard'

const categories = ['All', 'AI / ML', 'Systems', 'Web', 'Industrial'] as const

function matchesProjectFilter(project: Project, filter: (typeof categories)[number]) {
  if (filter === 'All') return true
  if (filter === 'AI / ML') return ['AI / LLM Systems', 'Research', 'Computer Vision'].includes(project.category)
  if (filter === 'Systems') return ['Backend / Platform', 'Simulation / Industrial Systems'].includes(project.category)
  if (filter === 'Web') return ['Backend / Platform', 'Education Technology'].includes(project.category)
  return project.category === 'Simulation / Industrial Systems' || project.category === 'Research'
}

export function WorkPage() {
  usePageMeta(
    'Selected projects',
    'Project case studies across AI systems, research, backend engineering, computer vision, and industrial simulation.'
  )
  const [filter, setFilter] = useState<(typeof categories)[number]>('All')
  const visible = projects.filter(project => matchesProjectFilter(project, filter))

  return (
    <>
      <div className="page-intro wrap">
        <div className="page-intro-copy">
          <Eyebrow>Projects</Eyebrow>
          <h1>Selected Projects</h1>
          <p>A collection of end-to-end systems, research prototypes, and real-world applications.</p>
        </div>
      </div>
      <section className="wrap work-section">
        <div className="filter-list" role="group" aria-label="Filter projects by category">
          {categories.map(c => (
            <button
              key={c}
              className={filter === c ? 'filter active' : 'filter'}
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
            >
              {c}
              <span>{projects.filter(project => matchesProjectFilter(project, c)).length}</span>
            </button>
          ))}
        </div>
        {visible.length ? (
          <div className="project-grid">
            {visible.map(p => (
              <ProjectCard project={p} index={projects.indexOf(p)} key={p.slug} />
            ))}
          </div>
        ) : (
          <p className="empty-state">No projects in this category yet.</p>
        )}
        <p className="work-count">
          Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}
        </p>
      </section>
    </>
  )
}

