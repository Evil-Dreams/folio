import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { award, certifications, experience, experienceAddenda, experienceImpact, hackathons, homeTechnologies, leadership, principles, profile, projects, type Project } from './content'
import { ProjectArtwork } from './components/ProjectArtwork'
import { InfinityMark } from './components/InfinityMark'

const nav = [['Home', '/'], ['About', '/about'], ['Research', '/research'], ['Projects', '/work'], ['Experience', '/experience'], ['Contact', '/contact']]
const categories = ['All', 'AI / ML', 'Systems', 'Web', 'Industrial'] as const

function matchesProjectFilter(project: Project, filter: (typeof categories)[number]) {
  if (filter === 'All') return true
  if (filter === 'AI / ML') return ['AI / LLM Systems', 'Research', 'Computer Vision'].includes(project.category)
  if (filter === 'Systems') return ['Backend / Platform', 'Simulation / Industrial Systems'].includes(project.category)
  if (filter === 'Web') return ['Backend / Platform', 'Education Technology'].includes(project.category)
  return project.category === 'Simulation / Industrial Systems' || project.category === 'Research'
}

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = `${title} — ${profile.name}`
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.append(meta) }
    meta.content = description
    let og = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
    if (!og) { og = document.createElement('meta'); og.setAttribute('property', 'og:title'); document.head.append(og) }
    og.content = document.title
    let ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]')
    if (!ogDescription) { ogDescription = document.createElement('meta'); ogDescription.setAttribute('property', 'og:description'); document.head.append(ogDescription) }
    ogDescription.content = description
    const base = import.meta.env.VITE_SITE_URL?.trim().replace(/\/$/, '')
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (base) {
      if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical) }
      canonical.href = new URL(window.location.pathname, base).href
    } else {
      canonical?.remove()
    }
  }, [title, description])
}

function Header() {
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
      if (event.key === 'Escape' && open) { setOpen(false); buttonRef.current?.focus(); return }
      if (event.key === 'Tab' && open) {
        const links = [...document.querySelectorAll<HTMLAnchorElement>('#mobile-navigation a')]
        const first = links[0], last = links.at(-1)
        if (event.shiftKey && (document.activeElement === first || document.activeElement === buttonRef.current)) { event.preventDefault(); last?.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('keydown', onKey) }
  }, [open])
  useLayoutEffect(() => {
    document.body.classList.toggle('menu-open', open)
    const timer = open ? window.setTimeout(() => document.querySelector<HTMLAnchorElement>('#mobile-navigation a')?.focus(), 0) : undefined
    return () => { if (timer) window.clearTimeout(timer); document.body.classList.remove('menu-open') }
  }, [open])
  return <header id="top" className={`site-header ${scrolled ? 'scrolled' : ''}`}>
    <div className="header-inner wrap">
      <Link to="/" className="wordmark" aria-label="Vibishan Anandhan, home"><InfinityMark /><span className="wordmark-short">Vibi.</span></Link>
      <nav className="desktop-nav" aria-label="Primary navigation">{nav.map(([label, to]) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{label}</NavLink>)}</nav>
      <ResumeAction className="header-cta">Resume <span aria-hidden="true">↗</span></ResumeAction>
      <button ref={buttonRef} className="menu-toggle" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => {
        const next = !open
        setOpen(next)
        if (next) window.setTimeout(() => document.querySelector<HTMLAnchorElement>('#mobile-navigation a')?.focus(), 60)
      }}><span /><span /></button>
    </div>
    <nav id="mobile-navigation" className={`mobile-nav ${open ? 'open' : ''}`} aria-label="Mobile navigation" aria-hidden={!open} inert={!open}>
      {nav.map(([label, to]) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>{label}</NavLink>)}
      <ResumeAction className="mobile-resume" onClick={() => setOpen(false)}>Resume <span aria-hidden="true">↗</span></ResumeAction>
      <div className="mobile-nav-note">AI systems · Backend engineering · SLM research</div>
    </nav>
  </header>
}

function ResumeAction({ className, children, onClick }: { className: string; children: React.ReactNode; onClick?: () => void }) {
  if (profile.resumeUrl) return <a className={className} href={profile.resumeUrl} download="Vibishan-Anandhan-Resume.docx" onClick={onClick}>{children}</a>
  return <button className={`${className} resume-unavailable`} type="button" disabled title="Resume file is not available yet" aria-label="Resume file is not available yet" onClick={onClick}>{children}</button>
}

function Footer() {
  return <footer className="site-footer"><div className="wrap footer-main">
    <div><Link to="/" className="footer-name">Vibishan Anandhan</Link><p>AI systems · Backend engineering · SLM research</p></div>
    <div className="footer-links"><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a><a href={profile.github} target="_blank" rel="noreferrer">GitHub <span>↗</span></a><a href={`mailto:${profile.email}`}>Email <span>↗</span></a><a href="#top">Back to top ↑</a></div>
  </div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} {profile.name}</span><span>Built for clarity, with care.</span></div></footer>
}

function Shell({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  return <><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main" tabIndex={-1}><div key={location.pathname} className="page-enter">{children}</div></main><Footer /></>
}

function Eyebrow({ children, index }: { children: React.ReactNode; index?: string }) { return <div className="eyebrow">{index && <span className="eyebrow-index">{index}</span>}<span>{children}</span></div> }
function SectionHeading({ eyebrow, title, copy, action }: { eyebrow: string; title: string; copy?: string; action?: React.ReactNode }) { return <div className="section-heading"><div><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2>{copy && <p>{copy}</p>}</div>{action && <div className="section-action">{action}</div>}</div> }
function TagList({ items }: { items: string[] }) { return <ul className="tag-list">{items.map(x => <li key={x}>{x}</li>)}</ul> }

function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return <Link to={`/work/${project.slug}`} className={`project-card ${project.featured ? 'featured-card' : ''}`}>
    <div className="project-card-top"><span className="project-number">{String(index + 1).padStart(2, '0')}</span></div>
    <ProjectArtwork project={project} />
    <div className="project-card-copy"><p className="project-category">{project.category}</p><h3>{project.title}</h3><p className="project-summary">{project.summary}</p>
      {project.stack.length > 0 && <TagList items={project.stack.slice(0, 3)} />}<span className="read-link">Read case study <span aria-hidden="true">→</span></span></div>
  </Link>
}

function SystemsMap() {
  return <div className="systems-map" aria-hidden="true">
    <div className="cosmic-stars" />
    <span className="hero-orbit hero-orbit-secondary" />
    <span className="orbit-signal orbit-signal-one" />
    <span className="orbit-signal orbit-signal-two" />
    <img className="hero-cube-art" src="/images/hero-cube-reference.webp" alt="" fetchPriority="high" />
  </div>
}

function HomeFactStrip() {
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
    if (!element || !('IntersectionObserver' in window)) { setVisible(true); return }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
    }, { threshold: .25 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  return <div ref={stripRef} className={`facts-strip wrap ${visible ? 'is-visible' : ''}`} aria-label="Portfolio overview">
    {facts.map(([value,label],index)=><div className="fact-item" key={label}><FactIcon index={index}/><strong>{value}</strong><small>{label}</small></div>)}
  </div>
}

function FactIcon({ index }: { index: number }) {
  return <svg className="fact-icon" viewBox="0 0 30 30" aria-hidden="true">
    {index===0&&<><rect x="5" y="5" width="17" height="17" rx="2"/><rect x="9" y="9" width="16" height="16" rx="2"/><path d="M13 13h8m-8 4h6"/></>}
    {index===1&&<><rect x="4" y="9" width="22" height="16" rx="2"/><path d="M10 9V6h10v3M4 15h22m-13 0v3h4v-3"/></>}
    {index===2&&<><circle cx="15" cy="6" r="3"/><circle cx="7" cy="23" r="3"/><circle cx="23" cy="23" r="3"/><path d="M13.5 8.5 8.5 20m8-11.5 5 11.5M10 23h10"/></>}
    {index===3&&<><path d="M15 4l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/><path d="M5 25l-2 2m22-2 2 2"/></>}
  </svg>
}

function FeaturedResearchCarousel() {
  const research = projects.filter(project => project.category === 'Research')
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [interacting, setInteracting] = useState(false)
  const project = research[active]
  const previous = () => setActive(value => (value - 1 + research.length) % research.length)
  const next = () => setActive(value => (value + 1) % research.length)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    if (paused || interacting || research.length < 2 || prefersReducedMotion) return
    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') setActive(value => (value + 1) % research.length)
    }, 10000)
    return () => window.clearInterval(timer)
  }, [interacting, paused, research.length])
  return <section id="featured-research" className="featured-research wrap" aria-roledescription="carousel" aria-label="Featured research" onPointerEnter={() => setInteracting(true)} onPointerLeave={() => setInteracting(false)} onFocusCapture={() => setInteracting(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setInteracting(false) }}>
    <div className="featured-research-frame">
      <div className="featured-copy" key={`${project.slug}-copy`}>
        <Eyebrow><span className="signal-dot" /> Featured research</Eyebrow>
        <h2>{project.title}</h2>
        <p>{project.summary}</p>
        <p className="featured-context">{project.context}</p>
        <Link className="text-link" to={`/work/${project.slug}`}>View research <span>→</span></Link>
      </div>
      <div className="featured-art" key={`${project.slug}-art`}><ProjectArtwork project={project} size="case" /></div>
      <div className="featured-meta"><span>{project.status}</span><span>{String(active+1).padStart(2,'0')} / {String(research.length).padStart(2,'0')}</span></div>
      <div className="featured-controls">
        <button type="button" onClick={previous} aria-label="Show previous research project">←</button>
        <div className="featured-pagination" role="group" aria-label="Select featured research">
          {research.map((item,index)=><button key={item.slug} type="button" aria-label={`Show ${item.title}`} aria-pressed={active===index} className={active===index?'active':''} onClick={()=>setActive(index)} />)}
        </div>
        <button type="button" onClick={next} aria-label="Show next research project">→</button>
        <button type="button" className="carousel-pause" aria-label={paused ? 'Resume featured research rotation' : 'Pause featured research rotation'} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? '▶' : 'Ⅱ'}</button>
      </div>
    </div>
  </section>
}

const focusAreas = [
  { title: 'Small Language Models (SLM)', copy: 'I study compact, domain-specific models that can run with practical memory and latency constraints.', visual: 'slm' },
  { title: 'RLHF & Alignment', copy: 'I compare preference-tuning methods and report both improvements and regressions instead of hiding trade-offs.', visual: 'alignment' },
  { title: 'Retrieval & Knowledge Systems', copy: 'I connect models to evidence through retrieval, reranking, and source-aware context construction.', visual: 'retrieval' },
  { title: 'Edge & Industrial AI', copy: 'I explore on-device inference for diagnostic workflows where hardware, latency, and reliability matter.', visual: 'industrial' },
]

function FocusVisual({ kind }: { kind: string }) {
  const images: Record<string, [string, string]> = {
    slm: ['/images/focus-slm-cubes.webp', 'Cluster of translucent blue cubes representing small language models'],
    alignment: ['/images/focus-alignment-loop.webp', 'Interwoven glass loop representing model alignment'],
    retrieval: ['/images/focus-retrieval-layers.webp', 'Stacked blue glass layers representing retrieval systems'],
    industrial: ['/images/focus-edge-chip.webp', 'Blue illuminated edge AI processor'],
  }
  const [src, alt] = images[kind]
  return <div className={`focus-visual focus-visual-${kind}`}>
    <img src={src} alt={alt} loading="lazy" />
  </div>
}

function ResearchFocusSection() {
  return <section className="section focus-section">
    <div className="wrap">
      <div className="focus-heading"><div><Eyebrow>Research focus</Eyebrow><h2>My Research &amp; Engineering Focus</h2></div><p>From model alignment to industrial intelligence, I build, fine-tune, and deploy reliable AI systems for real-world environments.</p></div>
      <div className="focus-grid">{focusAreas.map((area,index)=><article className={`focus-card focus-card-${index % 2 ? 'right' : 'left'}`} key={area.title}><div className="focus-card-copy"><span className="focus-index">0{index+1}</span><h3>{area.title}</h3><p>{area.copy}</p></div><FocusVisual kind={area.visual}/></article>)}</div>
      <div className="focus-award"><span className="award-mark">R</span><div><small>RECOGNITION / SENTIO-KAIRO</small><strong>{award.title}</strong><span>{award.event} · {award.date}</span></div></div>
    </div>
  </section>
}

function HomePage() {
  usePageMeta('AI systems & backend engineering', profile.intro)
  const headlineCut = profile.headline.indexOf(' from ')
  const headlineLead = profile.headline.slice(0, headlineCut)
  const headlineTail = profile.headline.slice(headlineCut + 1)
  const [headlineFirst, ...headlineRest] = headlineLead.split(' ')
  return <>
    <section className="hero wrap">
      <div className="hero-copy"><Eyebrow>AI SYSTEMS · SLMs · INDUSTRIAL AI · BACKEND</Eyebrow><h1 aria-label={profile.headline}><span>{headlineFirst}<br />{headlineRest.join(' ')}</span><em>{headlineTail}</em></h1><p className="hero-intro">{profile.positioning}</p>
        <div className="hero-actions"><Link className="button button-primary" to="/work">Explore My Work <span>→</span></Link><ResumeAction className="button button-secondary">View Resume <span aria-hidden="true">↓</span></ResumeAction></div>
        
      </div>
      <div className="hero-visual"><SystemsMap /></div>
    </section>
    <HomeFactStrip />
    <FeaturedResearchCarousel />
    <HomeProjectShowcase />
    <ResearchFocusSection />
    <TechnologyMarquee />
    <HomeExperiencePreview />
    <ContactCallout />
  </>
}

const homeProjectSlugs = ['guider', 'iblis', 'multimodal-reasoning-engine', 'cnc-digital-twin']

function HomeProjectShowcase() {
  const selected = homeProjectSlugs.map(slug => projects.find(project => project.slug === slug)).filter((project): project is Project => Boolean(project))
  return <section className="home-projects wrap">
    <SectionHeading eyebrow="Selected projects" title="Systems built for real workflows." copy="A few projects across education technology, local AI, structured reasoning, and industrial simulation." action={<Link className="text-link" to="/work">Browse all projects <span aria-hidden="true">→</span></Link>} />
    <div className="home-project-grid">{selected.map((project, index) => <ProjectCard project={project} index={index} key={project.slug} />)}</div>
  </section>
}

function TechnologyMarquee() {
  return <section className="technology-marquee wrap" aria-label="Technologies used">
    <p>Tools I work with</p>
    <div className="technology-marquee-window"><div className="technology-marquee-track">
      {[0, 1].map(copy => <ul key={copy} aria-hidden={copy === 1}>{homeTechnologies.map(item => <li key={item}>{item}</li>)}</ul>)}
    </div></div>
  </section>
}

function HomeExperiencePreview() {
  return <section className="home-experience wrap">
    <SectionHeading eyebrow="Experience" title="Engineering across the stack." copy="Product work, integration engineering, and data workflows, grounded in tracked changes and careful validation." action={<Link className="text-link" to="/experience">See the full experience <span aria-hidden="true">→</span></Link>} />
    <div className="home-impact-wide">{experienceImpact.map(metric => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div>
    <div className="home-experience-grid">{experience.map((item, index) => <article className="home-experience-card" key={item.role}>
      <div className="home-experience-top"><span>0{index + 1} / {index === 0 ? 'CURRENT' : 'INTERNSHIP'}</span><span>{item.period}</span></div>
      <h3>{item.role}</h3><strong>{item.organization}</strong><p>{item.summary}</p>
    </article>)}</div>
  </section>
}

function PageIntro({ eyebrow, title, copy, visual }: { eyebrow: string; title: string; copy: string; visual?: React.ReactNode }) { return <div className={`page-intro wrap ${visual ? 'with-visual' : ''}`}><div className="page-intro-copy"><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{copy}</p></div>{visual && <div className="page-intro-visual">{visual}</div>}</div> }

function ResearchOrbit() {
  return <div className="research-orbit" aria-hidden="true"><img src="/images/focus-alignment-loop.webp" alt="" loading="lazy" /></div>
}

function AboutPortrait() {
  return <div className="about-portrait"><img src="/images/about-profile.webp" alt="Blue glass profile silhouette with a glowing orbital path" loading="lazy" /><span className="portrait-caption">AI ENGINEERING · RESEARCH · SYSTEMS</span></div>
}

function WorkPage() {
  usePageMeta('Selected projects', 'Project case studies across AI systems, research, backend engineering, computer vision, and industrial simulation.')
  const [filter, setFilter] = useState<(typeof categories)[number]>('All')
  const visible = projects.filter(project => matchesProjectFilter(project, filter))
  return <><PageIntro eyebrow="Projects" title="Selected Projects" copy="A collection of end-to-end systems, research prototypes, and real-world applications." />
    <section className="wrap work-section"><div className="filter-list" role="group" aria-label="Filter projects by category">{categories.map(c => <button key={c} className={filter === c ? 'filter active' : 'filter'} aria-pressed={filter === c} onClick={() => setFilter(c)}>{c}<span>{projects.filter(project => matchesProjectFilter(project, c)).length}</span></button>)}</div>
      {visible.length ? <div className="project-grid">{visible.map(p => <ProjectCard project={p} index={projects.indexOf(p)} key={p.slug} />)}</div> : <p className="empty-state">No projects in this category yet.</p>}
      <p className="work-count">Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}</p>
    </section></>
}

function ProjectVisual({ project }: { project: Project }) {
  const pipeline = project.slug === 'sentio-kairo' ? ['MACHINE / LOGS', 'CONTEXT', 'RETRIEVAL', 'FINE-TUNED SLM', 'DIAGNOSTIC', 'VOICE / OPERATOR'] : project.slug === 'rlhf-for-slm' ? ['SCENARIOS', 'BASE MODEL', 'PREFERENCE ALIGNMENT', 'EVALUATION', 'TRADE-OFFS'] : project.slug === 'guider' ? ['STUDENT PROFILE', 'INTENT', 'RETRIEVAL', 'RERANKING', 'GUIDANCE'] : project.slug === 'multimodal-reasoning-engine' ? ['EXPAND', 'SCORE', 'AGGREGATE', 'PRUNE'] : ['INPUT', 'PROCESS', 'OUTPUT']
  return <div className={`case-artwork case-artwork-${project.slug}`}>
    <ProjectArtwork project={project} size="case" />
    <div className="architecture"><div className="architecture-label"><span>DOCUMENTED FLOW</span><span>{project.slug === 'sentio-kairo' ? 'EDGE PATH / JETSON NANO' : 'SYSTEM VIEW'}</span></div><ol className="architecture-flow" aria-label={`Conceptual process for ${project.title}`}>{pipeline.map((s, i) => <li className="architecture-node" key={s}><small>0{i + 1}</small><strong>{s}</strong></li>)}</ol><p>Conceptual view of the documented project scope</p></div>
  </div>
}

function ProjectPage() {
  const { slug = '' } = useParams()
  const project = projects.find(p => p.slug === slug)
  if (!project) return <NotFoundPage />
  return <ProjectDetail project={project} />
}

function ProjectDetail({ project }: { project: Project }) {
  usePageMeta(project.title, project.summary)
  const index = projects.indexOf(project)
  const prev = projects[(index + projects.length - 1) % projects.length]
  const next = projects[(index + 1) % projects.length]
  return <>
    <div className="wrap breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/work">Work</Link><span>/</span><span>{project.title}</span></div>
    <header className="case-hero wrap"><div className="case-copy"><Eyebrow index={String(index + 1).padStart(2, '0')}>{project.category}</Eyebrow><h1>{project.title}</h1><p>{project.description}</p><div className="case-meta">{project.status && <span><small>STATUS</small>{project.status}</span>}{project.role && <span><small>ROLE</small>{project.role}</span>}</div></div><ProjectVisual project={project} /></header>
    <div className="wrap case-body"><aside className="case-aside"><div><span className="aside-label">IN THIS CASE STUDY</span><a href="#context">Context</a><a href="#approach">Approach</a>{project.outcomes && <a href="#results">Results</a>}{project.limitations && <a href="#limits">Limitations</a>}</div><Link className="text-link" to="/contact">Discuss this work <span>↗</span></Link></aside>
      <article className="case-content"><section id="context" className="case-section"><Eyebrow index="01">Problem / context</Eyebrow><h2>Why this work exists</h2><p>{project.context}</p></section>
        <section id="approach" className="case-section"><Eyebrow index="02">System / approach</Eyebrow><h2>How the system is framed</h2><ul className="detail-list">{project.approach.map((s, i) => <li key={s}><span>{String(i + 1).padStart(2, '0')}</span>{s}</li>)}</ul></section>
        {project.outcomes && <section id="results" className="case-section"><Eyebrow index="03">Evaluation / results</Eyebrow><h2>{project.slug === 'rlhf-for-slm' ? 'A mixed result, reported in full.' : 'Reported testbed results'}</h2>{project.slug === 'rlhf-for-slm' && <p className="table-note">Base Phi-3 Mini compared with DPO-LoRA-adapted Phi-3 Mini. Values are shown as base → adapted.</p>}<div className="outcome-grid">{project.outcomes.map(([label, value]) => <div className="outcome" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>{project.slug === 'sentio-kairo' && <p className="table-note">These results refer to the reported Kairo-Logs testbed and evaluation setup, not broad real-world industrial validation. Latency definitions were not specified.</p>}</section>}
        {project.stack.length > 0 && <section className="case-section"><Eyebrow index="04">Tools / techniques</Eyebrow><h2>Technical scope</h2><TagList items={project.stack} /></section>}
        {project.limitations && <section id="limits" className="case-section"><Eyebrow index="05">Limitations</Eyebrow><h2>What this does not establish</h2><ul className="limit-list">{project.limitations.map(x => <li key={x}>{x}</li>)}</ul></section>}
        {project.slug === 'sentio-kairo' && <section className="award-panel"><span className="award-mark">R</span><div><Eyebrow>Recognition</Eyebrow><h3>{award.title}</h3><p>{award.event}<br />{award.date}</p><small>Presentation award associated with SENTIO-KAIRO.</small></div></section>}
      </article>
    </div>
    <section className="related wrap"><div className="related-heading"><Eyebrow>Continue exploring</Eyebrow><h2>More work</h2></div><div className="next-projects"><Link to={`/work/${prev.slug}`}><small>PREVIOUS</small><strong>← {prev.title}</strong></Link><Link to={`/work/${next.slug}`}><small>NEXT</small><strong>{next.title} →</strong></Link></div></section><ContactCallout />
  </>
}

function ResearchPage() {
  usePageMeta('Research', 'Research projects on industrial diagnostic systems and small language model alignment, with their reported context and limitations.')
  const research = projects.filter(p => p.category === 'Research')
  return <><PageIntro eyebrow="Research" title="Research for Practical Intelligence" copy="Focused on making language models efficient, aligned, and reliable for real-world systems." visual={<ResearchOrbit />} />
    <section className="wrap research-page-list">{research.map((p, i) => <article className="research-feature" key={p.slug}>
      <div className="research-feature-copy"><div className="research-feature-top"><Eyebrow index={`0${i + 1}`}>{p.status}</Eyebrow><span>RESEARCH / {String(i + 1).padStart(2, '0')}</span></div><h2>{p.title}</h2><p>{p.summary}</p>
        <ul className="research-highlights">{p.approach.slice(0, 2).map((item, j) => <li key={item}><span>0{j + 1}</span>{item}</li>)}</ul>
        {p.slug === 'sentio-kairo' ? <div className="award-panel compact"><span className="award-mark">R</span><div><h3>{award.title}</h3><p>{award.event} · {award.date}</p></div></div> : <div className="research-quick-results">{p.outcomes?.slice(0, 3).map(([label, value]) => <div key={label}><small>{label}</small><strong>{value}</strong></div>)}</div>}
        <Link className="text-link" to={`/work/${p.slug}`}>View full case study <span>→</span></Link>
      </div><div className="research-feature-art"><ProjectArtwork project={p} size="case" /></div>
    </article>)}</section>
  </>
}
function ExperienceImpactSummary() {
  return <section className="wrap experience-impact-summary">
    <div className="experience-impact-heading"><Eyebrow>Impact in my current role</Eyebrow><h2>Product work from interface to runtime.</h2><p>Tracked contribution figures describe work across a larger shared codebase, not sole ownership of the platform.</p></div>
    <div className="experience-impact-metrics">{experienceImpact.map(metric => <article key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></article>)}</div>
    <ul className="experience-scope-list">{experienceAddenda['Software Developer Intern'].map(item => <li key={item}>{item}</li>)}</ul>
  </section>
}

function ExperienceDetails({ item }: { item: (typeof experience)[number] }) {
  const details = [...item.details, ...(experienceAddenda[item.role] || [])]
  return <details className="timeline-details"><summary>Role details <span>{details.length}</span></summary><ul className="detail-list">{details.map((detail, index) => <li key={detail}><span>{String(index + 1).padStart(2, '0')}</span>{detail}</li>)}</ul></details>
}

function ExperiencePage() {
  usePageMeta('Experience', 'Work experience in software development, backend integrations, data workflows, and Python application development.')
  return <><PageIntro eyebrow="Experience" title="Internship Experience" copy="Production-oriented product engineering, integrations, research-driven tooling, data workflows, and Python development." />
    <ExperienceImpactSummary />
    <section className="wrap timeline">{experience.map((item, index) => <article className="timeline-item" key={item.role}>
      <span className="timeline-pin" aria-hidden="true" />
      <div className="timeline-main"><div className="timeline-head"><div>
        <Eyebrow>{item.team || 'Internship'} <span>· {String(index + 1).padStart(2, '0')}</span></Eyebrow>
        <h2>{item.role}</h2><h3>{item.organization}</h3>
      </div><span className="timeline-period">{item.period}</span></div>
      <p>{item.summary}</p><ExperienceDetails item={item} /><TagList items={item.skills} /></div>
    </article>)}</section>
  </>
}

const technologyGroups = [
  { title: 'AI / ML', items: ['Python', 'PyTorch', 'TensorFlow', 'scikit-learn', 'OpenCV', 'scikit-image', 'NumPy', 'Pandas', 'XGBoost', 'YOLOv8', 'SAM'] },
  { title: 'LLM / SLM', items: ['RAG', 'Embeddings', 'LoRA / QLoRA', 'DPO', 'KTO', 'PPO', 'GRPO', 'Ollama', 'Llama.cpp', 'ChromaDB', 'Phi-3 Mini'] },
  { title: 'Backend', items: ['Go', 'FastAPI', 'Flask', 'Node.js', 'Express', 'REST APIs', 'OAuth', 'Webhooks', 'Workflow runtimes'] },
  { title: 'Product UI', items: ['React', 'TypeScript', 'JavaScript', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'React Router', 'React Query', 'Zustand', 'React Native'] },
  { title: 'Data / Tools', items: ['SQL', 'SQLite', 'MySQL', 'MongoDB', 'PostgreSQL', 'MCP', 'AWS Textract', 'Google Sheets API', 'Meta Graph API', 'Git', 'Docker', 'Linux / WSL', 'Postman'] },
]

function TechStackPanel() {
  return <section className="section wrap skill-section" id="technology-stack">
    <SectionHeading eyebrow="Tech stack" title="Tools and Technologies" copy="A practical toolkit across AI systems, retrieval, backend integration, and product engineering." />
    <div className="tech-stack-panel">
      <div className="tech-stack-art" aria-hidden="true"><img src="/images/focus-retrieval-layers.webp" alt="" loading="lazy" /><span>AI</span></div>
      <div className="tech-rows">{technologyGroups.map(group => <div className="tech-row" key={group.title}><h3>{group.title}</h3><ul>{group.items.map(item => <li key={item}><span aria-hidden="true">{item === 'TypeScript' ? 'TS' : item === 'Python' ? 'Py' : item.slice(0, 2).toUpperCase()}</span>{item}</li>)}</ul></div>)}</div>
    </div>
  </section>
}

function AboutCredentials() {
  return <section className="credentials-section">
    <div className="wrap">
      <SectionHeading eyebrow="Credentials & community" title="Learning beyond the classroom." copy="Technical learning, professional communities, service, and team challenges alongside my degree and project work." />
      <div className="credentials-grid">
        <article className="credential-panel certification-panel"><Eyebrow>Certificates</Eyebrow><ul>{certifications.map(item => <li key={`${item.provider}-${item.name}`}><span>{item.provider}</span><strong>{item.name}</strong></li>)}</ul></article>
        <div className="community-column">
          <article className="credential-panel"><Eyebrow>Leadership & memberships</Eyebrow><ul>{leadership.map(item => <li key={item.organization}><strong>{item.organization}</strong><span>{item.role}</span></li>)}</ul></article>
          <article className="credential-panel"><Eyebrow>Hackathons & innovation challenges</Eyebrow><div className="challenge-pills">{hackathons.map(item => <span key={item}>{item}</span>)}</div><p>Second Prize at Idea Fusion.</p></article>
        </div>
      </div>
    </div>
  </section>
}

function AboutPage() {
  usePageMeta('About', 'About Vibishan Anandhan, an AI and Data Science undergraduate working across AI application engineering and backend systems.')
  const approaches = [ ['Model + system thinking', 'A model is one component; data flow, tool access, state, evaluation, and failure handling matter.'], ['Grounded AI', 'Source attribution and retrieval quality belong inside the system design.'], ['Integration engineering', 'Provider credentials, webhooks, payload validation, execution state, retries, and error handling shape reliability.'], ['Practical evaluation', 'Benchmark scope, hardware, and limitations give a score its meaning.'], ['Local-first exploration', 'Local models and constrained hardware help explore cost, latency, privacy, and deployment trade-offs.'] ]
  return <>
    <section className="wrap about-hero"><div className="about-hero-copy"><Eyebrow>About me</Eyebrow><h1>Hi, I'm<br />Vibishan Anandhan</h1><p>{profile.bio}</p></div><AboutPortrait /><div className="about-facts"><article><span className="about-fact-icon" aria-hidden="true">⌂</span><div><small>EDUCATION</small><strong>B.Tech · AI &amp; Data Science</strong><span>Karpagam College of Engineering</span></div></article><article><span className="about-fact-icon" aria-hidden="true">⌖</span><div><small>LOCATION</small><strong>Coimbatore</strong><span>Tamil Nadu, India</span></div></article><article><span className="about-fact-icon" aria-hidden="true">✧</span><div><small>RESEARCH</small><strong>SLM · RLHF</strong><span>AI, alignment, and industrial systems</span></div></article></div></section>
    <TechStackPanel />
    <section className="about-extras wrap"><div className="about-approach"><Eyebrow>Technical approach</Eyebrow>{approaches.map(([a,b],i)=><article key={a}><span>0{i+1}</span><div><h3>{a}</h3><p>{b}</p></div></article>)}</div></section>
    <section className="education-section"><div className="wrap"><SectionHeading eyebrow="Education" title="Learning through practice." /><div className="education-grid">{profile.education.map((e,i)=><article key={e.institution}><Eyebrow index={`0${i+1}`}>{e.period}</Eyebrow><h3>{e.institution}</h3><p>{e.qualification}</p><span>{e.location}</span>{'result' in e && <b>{e.result}</b>}</article>)}</div></div></section>
    <AboutCredentials />
    <section className="wrap principles-section"><SectionHeading eyebrow="How I work" title="A practical engineering loop." /><ol className="principle-list">{principles.map((p,i)=><li key={p}><span>0{i+1}</span>{p}</li>)}</ol></section>
  </>
}

function ContactArtwork() {
  return <div className="contact-art" aria-hidden="true"><span className="contact-glass contact-glass-one" /><span className="contact-glass contact-glass-two" /><span className="contact-glass contact-glass-three" /></div>
}

function ContactPage() {
  usePageMeta('Contact', 'Contact Vibishan Anandhan about AI engineering, backend systems, research collaboration, and technically ambitious projects.')
  return <section className="wrap contact-page"><div className="contact-copy">
    <Eyebrow>Get in touch</Eyebrow><h1>Let's build<br />something impactful.</h1>
    <p>Open to AI engineering roles, research collaboration, internships, and technically ambitious projects.</p>
    <div className="contact-details">
      <a href={`mailto:${profile.email}`}><span className="contact-detail-icon" aria-hidden="true">✉</span><strong>{profile.email}</strong></a>
      <a href={`tel:${profile.phone.replaceAll(' ', '')}`}><span className="contact-detail-icon" aria-hidden="true">☎</span><strong>{profile.phone}</strong></a>
      <div><span className="contact-detail-icon" aria-hidden="true">⌖</span><strong>{profile.location}</strong></div>
    </div>
    <div className="contact-socials"><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">GH</a><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">in</a></div>
  </div><ContactArtwork /></section>
}

function ContactCallout() { return <section className="contact-callout"><div className="wrap callout-inner"><div><Eyebrow>Next step</Eyebrow><h2>Have a research, engineering,<br />or collaboration idea?</h2><p>I’m open to conversations about AI engineering, backend systems, research collaboration, and technically ambitious projects.</p></div><div className="callout-visual" aria-hidden="true"><img src="/images/retrieval-network.webp" alt="" loading="lazy" /></div><div className="callout-links"><a href={`mailto:${profile.email}`}>Email <span>↗</span></a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a><a href={profile.github} target="_blank" rel="noreferrer">GitHub <span>↗</span></a></div></div></section> }

function NotFoundPage() { usePageMeta('Page not found', 'The requested page could not be found.'); return <div className="wrap not-found"><Eyebrow>404 / NOT FOUND</Eyebrow><h1>This path doesn’t resolve.</h1><p>The page may have moved, or its address may be incorrect.</p><Link className="button button-primary" to="/">Return home <span>↗</span></Link></div> }

export default function App() {
  return <Shell><Routes><Route path="/" element={<HomePage />} /><Route path="/work" element={<WorkPage />} /><Route path="/work/:slug" element={<ProjectPage />} /><Route path="/research" element={<ResearchPage />} /><Route path="/experience" element={<ExperiencePage />} /><Route path="/about" element={<AboutPage />} /><Route path="/contact" element={<ContactPage />} /><Route path="*" element={<NotFoundPage />} /></Routes></Shell>
}
