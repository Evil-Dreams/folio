import type { ReactNode } from 'react'

export function Eyebrow({ children, index }: { children: ReactNode; index?: string }) {
  return (
    <div className="eyebrow">
      {index && <span className="eyebrow-index">{index}</span>}
      <span>{children}</span>
    </div>
  )
}

