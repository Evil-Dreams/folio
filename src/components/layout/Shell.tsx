import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'

export function Shell({ children }: { children: ReactNode }) {
  const location = useLocation()
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <div key={location.pathname} className="page-enter">
          {children}
        </div>
      </main>
      <Footer />
    </>
  )
}

