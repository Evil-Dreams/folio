import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { InfinityMark } from '../InfinityMark'
import { ResumeAction } from '../ui/ResumeAction'

const nav = [
  ['Home', '/'],
  ['About', '/about'],
  ['Research', '/research'],
  ['Projects', '/work'],
  ['Experience', '/experience'],
  ['Contact', '/contact'],
] as const

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const location = useLocation()
  const previousPath = useRef(location.pathname)

  useEffect(() => {
    if (previousPath.current !== location.pathname) {
      previousPath.current = location.pathname
      setOpen(false)
      window.scrollTo(0, 0)
      requestAnimationFrame(() => {
        const heading = document.querySelector<HTMLElement>('#main h1')
        heading?.setAttribute('tabindex', '-1')
        heading?.focus()
      })
    }
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        setOpen(false)
        buttonRef.current?.focus()
        return
      }
      if (event.key === 'Tab' && open) {
        const links = [...document.querySelectorAll<HTMLAnchorElement>('#mobile-navigation a')]
        const first = links[0]
        const last = links.at(-1)
        if (event.shiftKey && (document.activeElement === first || document.activeElement === buttonRef.current)) {
          event.preventDefault()
          last?.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first?.focus()
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  useLayoutEffect(() => {
    document.body.classList.toggle('menu-open', open)
    const timer = open
      ? window.setTimeout(() => document.querySelector<HTMLAnchorElement>('#mobile-navigation a')?.focus(), 0)
      : undefined
    return () => {
      if (timer) window.clearTimeout(timer)
      document.body.classList.remove('menu-open')
    }
  }, [open])

  return (
    <header id="top" className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner wrap">
        <Link to="/" className="wordmark" aria-label="Vibishan Anandhan, home">
          <InfinityMark />
          <span className="wordmark-short">Vibi.</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map(([label, to]) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <ResumeAction className="header-cta">
          Resume <span aria-hidden="true">↗</span>
        </ResumeAction>
        <button
          ref={buttonRef}
          className="menu-toggle"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => {
            const next = !open
            setOpen(next)
            if (next) window.setTimeout(() => document.querySelector<HTMLAnchorElement>('#mobile-navigation a')?.focus(), 60)
          }}
        >
          <span />
          <span />
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className={`mobile-nav ${open ? 'open' : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!open}
        inert={!open}
      >
        {nav.map(([label, to]) => (
          <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>
            {label}
          </NavLink>
        ))}
        <ResumeAction className="mobile-resume" onClick={() => setOpen(false)}>
          Resume <span aria-hidden="true">↗</span>
        </ResumeAction>
        <div className="mobile-nav-note">AI systems · Backend engineering · SLM research</div>
      </nav>
    </header>
  )
}

