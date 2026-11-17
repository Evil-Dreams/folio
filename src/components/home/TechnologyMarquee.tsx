import { homeTechnologies } from '../../content'

export function TechnologyMarquee() {
  return (
    <section className="technology-marquee wrap" aria-label="Technologies used">
      <p>Tools I work with</p>
      <div className="technology-marquee-window">
        <div className="technology-marquee-track">
          {[0, 1].map(copy => (
            <ul key={copy} aria-hidden={copy === 1}>
              {homeTechnologies.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}

