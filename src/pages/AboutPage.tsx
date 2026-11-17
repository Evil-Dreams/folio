import { certifications, hackathons, leadership, principles, profile } from '../content'
import { usePageMeta } from '../hooks/usePageMeta'
import { Eyebrow } from '../components/ui/Eyebrow'
import { SectionHeading } from '../components/ui/SectionHeading'

const technologyGroups = [
  {
    title: 'AI / ML',
    items: ['Python', 'PyTorch', 'TensorFlow', 'scikit-learn', 'OpenCV', 'scikit-image', 'NumPy', 'Pandas', 'XGBoost', 'YOLOv8', 'SAM'],
  },
  {
    title: 'LLM / SLM',
    items: ['RAG', 'Embeddings', 'LoRA / QLoRA', 'DPO', 'KTO', 'PPO', 'GRPO', 'Ollama', 'Llama.cpp', 'ChromaDB', 'Phi-3 Mini'],
  },
  {
    title: 'Backend',
    items: ['Go', 'FastAPI', 'Flask', 'Node.js', 'Express', 'REST APIs', 'OAuth', 'Webhooks', 'Workflow runtimes'],
  },
  {
    title: 'Product UI',
    items: ['React', 'TypeScript', 'JavaScript', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'React Router', 'React Query', 'Zustand', 'React Native'],
  },
  {
    title: 'Data / Tools',
    items: ['SQL', 'SQLite', 'MySQL', 'MongoDB', 'PostgreSQL', 'MCP', 'AWS Textract', 'Google Sheets API', 'Meta Graph API', 'Git', 'Docker', 'Linux / WSL', 'Postman'],
  },
]

function TechStackPanel() {
  return (
    <section className="section wrap skill-section" id="technology-stack">
      <SectionHeading
        eyebrow="Tech stack"
        title="Tools and Technologies"
        copy="A practical toolkit across AI systems, retrieval, backend integration, and product engineering."
      />
      <div className="tech-stack-panel">
        <div className="tech-stack-art" aria-hidden="true">
          <img src="/images/focus-retrieval-layers.webp" alt="" loading="lazy" />
          <span>AI</span>
        </div>
        <div className="tech-rows">
          {technologyGroups.map(group => (
            <div className="tech-row" key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map(item => (
                  <li key={item}>
                    <span aria-hidden="true">
                      {item === 'TypeScript' ? 'TS' : item === 'Python' ? 'Py' : item.slice(0, 2).toUpperCase()}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutCredentials() {
  return (
    <section className="credentials-section">
      <div className="wrap">
        <SectionHeading
          eyebrow="Credentials & community"
          title="Learning beyond the classroom."
          copy="Technical learning, professional communities, service, and team challenges alongside my degree and project work."
        />
        <div className="credentials-grid">
          <article className="credential-panel certification-panel">
            <Eyebrow>Certificates</Eyebrow>
            <ul>
              {certifications.map(item => (
                <li key={`${item.provider}-${item.name}`}>
                  <span>{item.provider}</span>
                  <strong>{item.name}</strong>
                </li>
              ))}
            </ul>
          </article>
          <div className="community-column">
            <article className="credential-panel">
              <Eyebrow>Leadership & memberships</Eyebrow>
              <ul>
                {leadership.map(item => (
                  <li key={item.organization}>
                    <strong>{item.organization}</strong>
                    <span>{item.role}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="credential-panel">
              <Eyebrow>Hackathons & innovation challenges</Eyebrow>
              <div className="challenge-pills">
                {hackathons.map(item => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <p>Second Prize at Idea Fusion.</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}

export function AboutPage() {
  usePageMeta(
    'About',
    'About Vibishan Anandhan, an AI and Data Science undergraduate working across AI application engineering and backend systems.'
  )

  const approaches = [
    ['Model + system thinking', 'A model is one component; data flow, tool access, state, evaluation, and failure handling matter.'],
    ['Grounded AI', 'Source attribution and retrieval quality belong inside the system design.'],
    ['Integration engineering', 'Provider credentials, webhooks, payload validation, execution state, retries, and error handling shape reliability.'],
    ['Practical evaluation', 'Benchmark scope, hardware, and limitations give a score its meaning.'],
    ['Local-first exploration', 'Local models and constrained hardware help explore cost, latency, privacy, and deployment trade-offs.'],
  ]

  return (
    <>
      <section className="wrap about-hero">
        <div className="about-hero-copy">
          <Eyebrow>About me</Eyebrow>
          <h1>
            Hi, I'm
            <br />
            Vibishan Anandhan
          </h1>
          <p>{profile.bio}</p>
        </div>
        <div className="about-portrait">
          <img
            src="/images/about-profile.webp"
            alt="Blue glass profile silhouette with a glowing orbital path"
            loading="lazy"
          />
          <span className="portrait-caption">AI ENGINEERING · RESEARCH · SYSTEMS</span>
        </div>
        <div className="about-facts">
          <article>
            <span className="about-fact-icon" aria-hidden="true">
              ⌂
            </span>
            <div>
              <small>EDUCATION</small>
              <strong>B.Tech · AI &amp; Data Science</strong>
              <span>Karpagam College of Engineering</span>
            </div>
          </article>
          <article>
            <span className="about-fact-icon" aria-hidden="true">
              ⌖
            </span>
            <div>
              <small>LOCATION</small>
              <strong>Coimbatore</strong>
              <span>Tamil Nadu, India</span>
            </div>
          </article>
          <article>
            <span className="about-fact-icon" aria-hidden="true">
              ✧
            </span>
            <div>
              <small>RESEARCH</small>
              <strong>SLM · RLHF</strong>
              <span>AI, alignment, and industrial systems</span>
            </div>
          </article>
        </div>
      </section>
      <TechStackPanel />
      <section className="about-extras wrap">
        <div className="about-approach">
          <Eyebrow>Technical approach</Eyebrow>
          {approaches.map(([title, desc], i) => (
            <article key={title}>
              <span>0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="education-section">
        <div className="wrap">
          <SectionHeading eyebrow="Education" title="Learning through practice." />
          <div className="education-grid">
            {profile.education.map((e, i) => (
              <article key={e.institution}>
                <Eyebrow index={`0${i + 1}`}>{e.period}</Eyebrow>
                <h3>{e.institution}</h3>
                <p>{e.qualification}</p>
                <span>{e.location}</span>
                {'result' in e && <b>{e.result}</b>}
              </article>
            ))}
          </div>
        </div>
      </section>
      <AboutCredentials />
      <section className="wrap principles-section">
        <SectionHeading eyebrow="How I work" title="A practical engineering loop." />
        <ol className="principle-list">
          {principles.map((p, i) => (
            <li key={p}>
              <span>0{i + 1}</span>
              {p}
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}

