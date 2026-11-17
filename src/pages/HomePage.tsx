import { Link } from 'react-router-dom'
import { profile } from '../content'
import { usePageMeta } from '../hooks/usePageMeta'
import { Eyebrow } from '../components/ui/Eyebrow'
import { ResumeAction } from '../components/ui/ResumeAction'
import { SystemsMap } from '../components/visuals/SystemsMap'
import { HomeFactStrip } from '../components/home/HomeFactStrip'
import { FeaturedResearchCarousel } from '../components/home/FeaturedResearchCarousel'
import { HomeProjectShowcase } from '../components/home/HomeProjectShowcase'
import { ResearchFocusSection } from '../components/home/ResearchFocusSection'
import { TechnologyMarquee } from '../components/home/TechnologyMarquee'
import { HomeExperiencePreview } from '../components/home/HomeExperiencePreview'
import { ContactCallout } from '../components/home/ContactCallout'

export function HomePage() {
  usePageMeta('AI systems & backend engineering', profile.intro)
  const headlineCut = profile.headline.indexOf(' from ')
  const headlineLead = profile.headline.slice(0, headlineCut)
  const headlineTail = profile.headline.slice(headlineCut + 1)
  const [headlineFirst, ...headlineRest] = headlineLead.split(' ')

  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <Eyebrow>AI SYSTEMS · SLMs · INDUSTRIAL AI · BACKEND</Eyebrow>
          <h1 aria-label={profile.headline}>
            <span>
              {headlineFirst}
              <br />
              {headlineRest.join(' ')}
            </span>
            <em>{headlineTail}</em>
          </h1>
          <p className="hero-intro">{profile.positioning}</p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/work">
              Explore My Work <span>→</span>
            </Link>
            <ResumeAction className="button button-secondary">
              View Resume <span aria-hidden="true">↓</span>
            </ResumeAction>
          </div>
        </div>
        <div className="hero-visual">
          <SystemsMap />
        </div>
      </section>
      <HomeFactStrip />
      <FeaturedResearchCarousel />
      <HomeProjectShowcase />
      <ResearchFocusSection />
      <TechnologyMarquee />
      <HomeExperiencePreview />
      <ContactCallout />
    </>
  )
}

