import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

beforeEach(() => vi.spyOn(window, 'scrollTo').mockImplementation(() => {}))
afterEach(() => { cleanup(); vi.restoreAllMocks() })

function renderAt(path = '/') {
  return render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>)
}

describe('reference portfolio experience', () => {
  it('renders the home composition, real counts, and reference artwork', () => {
    renderAt()
    expect(screen.getByRole('heading', { name: /building intelligent systems from model to deployment/i })).toBeInTheDocument()
    expect(document.querySelector('.hero-cube-art')).toHaveAttribute('src', '/images/hero-cube-reference.webp')
    expect(screen.getByText('13')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /my research & engineering focus/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /view resume/i })).toHaveAttribute('href', '/resume/Vibishan-Anandhan-Resume.docx')
  })

  it('navigates to Projects and filters the project cards', async () => {
    const user = userEvent.setup()
    renderAt()
    await user.click(screen.getByRole('link', { name: /explore my work/i }))
    expect(await screen.findByRole('heading', { name: 'Selected Projects' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /industrial/i }))
    expect(screen.getByRole('heading', { name: 'CNC Digital Twin' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Guider' })).not.toBeInTheDocument()
  })

  it('changes the featured research item with the carousel controls', async () => {
    const user = userEvent.setup()
    renderAt()
    const panel = screen.getByRole('region', { name: 'Featured research' })
    expect(within(panel).getByRole('heading', { name: 'SENTIO-KAIRO' })).toBeInTheDocument()
    await user.click(within(panel).getByRole('button', { name: 'Show next research project' }))
    expect(within(panel).getByRole('heading', { name: 'RLHF for Small Language Models' })).toBeInTheDocument()
  })

  it.each([
    ['/research', 'Research for Practical Intelligence'],
    ['/about', 'Vibishan Anandhan'],
    ['/experience', 'Internship Experience'],
    ['/contact', 'something impactful.'],
    ['/work/sentio-kairo', 'SENTIO-KAIRO'],
  ])('loads the %s route and its real page content', (path, heading) => {
    renderAt(path)
    expect(document.querySelector('#main h1')?.textContent).toContain(heading)
  })

  it('expands actual role details on the Experience page', async () => {
    const user = userEvent.setup()
    renderAt('/experience')
    const summary = screen.getAllByText(/Role details/)[0]
    const details = summary.closest('details')!
    expect(details).not.toHaveAttribute('open')
    await user.click(summary)
    expect(details).toHaveAttribute('open')
    expect(within(details).getByText(/Evolution API MCP server/i)).toBeInTheDocument()
  })

  it('keeps verified email and social destinations on Contact', () => {
    renderAt('/contact')
    expect(screen.getByRole('link', { name: /vibishan.anandhan.m@gmail.com/i })).toHaveAttribute('href', 'mailto:vibishan.anandhan.m@gmail.com')
    expect(screen.getByRole('link', { name: 'GitHub profile' })).toHaveAttribute('href', 'https://github.com/Evil-Dreams')
    expect(screen.getByRole('link', { name: 'LinkedIn profile' })).toHaveAttribute('href', 'https://www.linkedin.com/in/evil-dreams/')
  })

  it('closes the mobile navigation after activating the resume link', async () => {
    const user = userEvent.setup()
    renderAt()
    await user.click(screen.getByRole('button', { name: 'Open navigation menu' }))
    const mobileNavigation = document.querySelector<HTMLElement>('#mobile-navigation')!
    expect(mobileNavigation).toHaveAttribute('aria-hidden', 'false')
    await user.click(within(mobileNavigation).getByRole('link', { name: /resume/i }))
    expect(mobileNavigation).toHaveAttribute('aria-hidden', 'true')
    expect(document.body).not.toHaveClass('menu-open')
  })
})
