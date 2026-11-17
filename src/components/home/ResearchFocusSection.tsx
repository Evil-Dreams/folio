import { award } from '../../content'
import { Eyebrow } from '../ui/Eyebrow'
import { FocusVisual } from '../visuals/FocusVisual'

const focusAreas = [
  {
    title: 'Small Language Models (SLM)',
    copy: 'I study compact, domain-specific models that can run with practical memory and latency constraints.',
    visual: 'slm',
  },
  {
    title: 'RLHF & Alignment',
    copy: 'I compare preference-tuning methods and report both improvements and regressions instead of hiding trade-offs.',
    visual: 'alignment',
  },
  {
    title: 'Retrieval & Knowledge Systems',
    copy: 'I connect models to evidence through retrieval, reranking, and source-aware context construction.',
    visual: 'retrieval',
  },
  {
    title: 'Edge & Industrial AI',
    copy: 'I explore on-device inference for diagnostic workflows where hardware, latency, and reliability matter.',
    visual: 'industrial',
  },
]

export function ResearchFocusSection() {
  return (
    <section className="section focus-section">
      <div className="wrap">
        <div className="focus-heading">
          <div>
            <Eyebrow>Research focus</Eyebrow>
            <h2>My Research &amp; Engineering Focus</h2>
          </div>
          <p>
            From model alignment to industrial intelligence, I build, fine-tune, and deploy reliable AI systems for real-world environments.
          </p>
        </div>
        <div className="focus-grid">
          {focusAreas.map((area, index) => (
            <article className="focus-card" key={area.title}>
              <div className="focus-card-copy">
                <span className="focus-index">0{index + 1}</span>
                <h3>{area.title}</h3>
                <p>{area.copy}</p>
              </div>
              <FocusVisual kind={area.visual} />
            </article>
          ))}
        </div>
        <div className="focus-award">
          <span className="award-mark">R</span>
          <div>
            <small>RECOGNITION / SENTIO-KAIRO</small>
            <strong>{award.title}</strong>
            <span>
              {award.event} · {award.date}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

