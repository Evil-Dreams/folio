import type { ReactNode } from 'react'
import { profile } from '../../content'

export function ResumeAction({
  className,
  children,
  onClick,
}: {
  className: string
  children: ReactNode
  onClick?: () => void
}) {
  if (profile.resumeUrl) {
    const isExternal = profile.resumeUrl.startsWith('http')
    return (
      <a
        className={className}
        href={profile.resumeUrl}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noreferrer' : undefined}
        download={isExternal ? undefined : 'Vibishan-Anandhan-Resume.docx'}
        onClick={onClick}
      >
        {children}
      </a>
    )
  }
  return (
    <button
      className={`${className} resume-unavailable`}
      type="button"
      disabled
      title="Resume file is not available yet"
      aria-label="Resume file is not available yet"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
