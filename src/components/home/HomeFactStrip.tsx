import { useEffect, useRef, useState } from 'react'
import { award, experience, projects } from '../../content'

function FactIcon({ index }: { index: number }) {
  return (
    <svg className="fact-icon" viewBox="0 0 30 30" aria-hidden="true">
      {index === 0 && (
        <>
          <rect x="5" y="5" width="17" height="17" rx="2" />
          <rect x="9" y="9" width="16" height="16" rx="2" />
          <path d="M13 13h8m-8 4h6" />
        </>
      )}
      {index === 1 && (
        <>
          <rect x="4" y="9" width="22" height="16" rx="2" />
          <path d="M10 9V6h10v3M4 15h22m-13 0v3h4v-3" />
        </>
      )}
      {index === 2 && (
        <>
          <circle cx="15" cy="6" r="3" />
          <circle cx="7" cy="23" r="3" />
          <circle cx="23" cy="23" r="3" />
          <path d="M13.5 8.5 8.5 20m8-11.5 5 11.5M10 23h10" />
        </>
      )}
      {index === 3 && (
        <>
          <path d="M15 4l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
          <path d="M5 25l-2 2m22-2 2 2" />
        </>
      )}
    </svg>
  )
}

export function HomeFactStrip() {
  const [visible, setVisible] = useState(false)
  const stripRef = useRef<HTMLDivElement>(null)
  const researchCount = projects.filter(project => project.category === 'Research').length
  const facts = [
    [String(projects.length), 'Projects'],
    [String(experience.length), 'Internships'],
    [String(researchCount), 'Major Research Works'],
    [award ? '1' : '0', 'Best Paper Award'],
  ]

  useEffect(() => {
    const element = stripRef.current
    if (!element || !('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={stripRef}
      className={`facts-strip wrap ${visible ? 'is-visible' : ''}`}
      aria-label="Portfolio overview"
    >
      {facts.map(([value, label], index) => (
        <div className="fact-item" key={label}>
          <FactIcon index={index} />
          <div>
            <strong>{value}</strong>
            <small>{label}</small>
          </div>
        </div>
      ))}
    </div>
  )
}

