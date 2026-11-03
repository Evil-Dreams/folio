# VIBISHAN ANANDHAN — PREMIUM TECHNICAL PORTFOLIO
## Master Product Requirements Document (PRD), Design System, Content Specification, and Engineering Blueprint

**Purpose:** This document is the single source of truth for building a complete, premium, technically credible personal portfolio website for Vibishan Anandhan. Give this entire file to the coding agent in VS Code and ask it to implement the site end-to-end in the existing workspace.

**Primary outcome:** A polished, dark, editorial, engineering-first portfolio that feels like a high-end technology studio / AI systems engineer's personal site—not a generic student resume template, not a SaaS landing page, and not a flashy gaming page.

**Visual direction:** Near-black, deep navy, white, cool gray, and restrained electric-blue/cyan details. No lavender, pink, purple gradients, emoji, oversized glowing blobs, or generic AI stock art.

**Implementation preference:** TypeScript for the frontend and Go for the backend if a backend is actually needed. Do not introduce Rust merely for novelty. This is primarily a content-led portfolio; prefer a static-first architecture with a small Go service only for real features such as contact submissions. Avoid a database or backend if it does not provide real value.

---

# 1. Instructions to the Coding Agent

You are acting as a senior product designer, staff frontend engineer, backend engineer, accessibility specialist, and technical content editor. Build the finished portfolio—not just a mockup, a wireframe, or a plan.

## Required working method

1. Inspect the current repository before changing anything. Identify the framework, package manager, existing components, routing, assets, and run scripts.
2. Preserve useful existing code and configuration. Do not replace a working project wholesale without understanding it.
3. Create a short implementation plan, then proceed with implementation without stopping after the plan.
4. Build the whole experience: responsive navigation, all sections and routes, real project detail pages, responsive layouts, meaningful animations, interaction states, metadata, accessibility, and a polished footer.
5. Use real content from this PRD. Do not fill the site with lorem ipsum or fake achievements, fake client logos, invented metrics, fabricated testimonials, or made-up awards.
6. If a fact is explicitly marked “verify before publishing,” either omit it from the public-facing version or make it easy to update in one content file. Do not present it as confirmed.
7. If information is missing, use a clearly marked placeholder in a central content file rather than inventing details.
8. Run the available lint, type-check, test, and production build commands. Fix errors before finishing.
9. Verify at desktop, tablet, and mobile widths. Check keyboard navigation, focus states, contrast, reduced-motion behavior, and all links.
10. At completion, provide a concise implementation report: files created/changed, architecture, commands to run, build/test results, and any real secrets or deployment values still required.

## Quality bar

The website should look intentionally art-directed. Every spacing choice, type scale, border, animation, and content block should support clarity and hierarchy. Do not use a default portfolio template with only colors changed. Use restrained visual storytelling, excellent typography, carefully composed grids, meaningful technical details, and strong project case studies.

## Content and integrity rules

- Use the name **Vibishan Anandhan**.
- Do not label the website or its content “Expanded CV.”
- Do not add a “Research / Protocol Interests” section.
- Do not list C++ as a skill.
- Do not add a generic “Edge AI” skill/interests section. SENTIO-KAIRO may describe the actual Jetson Nano edge deployment work within its research case study.
- Do not mention the school academic recognition / gold coin.
- Do not publish internal notes, editorial comments, “accuracy notes,” or draft instructions.
- Do not claim a paper is accepted or published unless that status is verified.
- Do not claim that an application to a hackathon means participation or selection.
- Do not claim A2A implementation; it is an area of interest only and should not appear as a dedicated interest section.
- Never invent a proficiency level, project result, user count, customer, benchmark, certification, prize, or date.
- No emoji anywhere in the website copy or interface.
- No pink or lavender. No purple/pink gradient.
- No forced light theme. The design is dark-first.
- Avoid marketing claims such as “revolutionary,” “world-class,” “industry-leading,” or “10x” unless evidence exists.
- The portfolio must be usable and informative without requiring the visitor to download a resume.

---

# 2. Portfolio Identity and Positioning

## Name
**Vibishan Anandhan**

## Professional positioning
AI and software engineering student focused on building practical AI systems, backend integrations, small language model (SLM) workflows, retrieval-augmented generation, and developer-facing tools.

## Short positioning statement
“I build AI systems that connect models, software, and real operational workflows.”

## Expanded introduction
“I’m a B.Tech student in Artificial Intelligence and Data Science at Karpagam College of Engineering, Coimbatore. My work spans backend engineering, AI application development, small language model research, retrieval systems, workflow integrations, and industrial diagnostic prototypes. I enjoy turning complex systems into reliable, testable software—from API and OAuth integrations to local-model applications and research prototypes.”

## Tone
- Technically confident, direct, curious, and grounded.
- First person where appropriate.
- Explain complex engineering in understandable language without watering down the technical substance.
- No exaggerated personal-brand language.
- Make the work—not decoration—the centerpiece.

## Primary audience
1. AI/ML engineering recruiters.
2. Backend and platform engineering recruiters.
3. Research supervisors and technical reviewers.
4. Hackathon organizers and collaborators.
5. Engineers who want to inspect implementation details and project architecture.

## Primary visitor questions
- Who is Vibishan?
- What has he actually built?
- What did he personally contribute?
- What research is he working on?
- Which tools and systems has he used?
- Can I inspect code, papers, or project details?
- How can I contact him?

---

# 3. Visual Design Direction

## Design concept: “Midnight Systems Lab”

Think of a high-end technical journal mixed with an AI systems lab: dark, precise, tactile, spacious, and information-rich. The site should feel premium through typography, composition, and interaction—not through visual noise.

### Core palette — **Obsidian Navy**

Use CSS variables and keep colors centralized. This final palette is based on the supplied visual references: dark technical imagery, tactile charcoal surfaces, and layered navy/blue-gray neutrals.

- **Canvas / page background:** `#080B10`
- **Deep navy / hero background:** `#06141B`
- **Secondary surface:** `#11212D`
- **Elevated surface:** `#253745`
- **Muted surface:** `#1A2A35`
- **Primary text:** `#F5F7FA`
- **Secondary text:** `#B7C2C8`
- **Muted text:** `#81919B`
- **Borders:** `rgba(155, 168, 171, 0.16)`
- **Strong border:** `rgba(155, 168, 171, 0.28)`
- **Primary accent:** `#1598D4`
- **Secondary accent (rare):** `#69CDE8`
- **Success/status accent (rare):** `#83D6B0`
- **Focus ring:** `#69CDE8`, with a visible high-contrast outline

Blue/cyan should appear in small purposeful locations: active navigation indicators, diagram lines, selected metadata, focus states, technical visuals, and featured project details. Most of the page should remain near-black, deep navy, cool white, and blue-gray.

### Canonical CSS tokens

Use these tokens as the single source of truth. If the existing repository has a design-token convention, adapt these values to that convention rather than creating a competing styling system.

```css
:root {
  --color-background: #080B10;
  --color-background-deep: #06141B;
  --color-surface: #11212D;
  --color-surface-raised: #253745;
  --color-surface-muted: #1A2A35;
  --color-border: rgba(155, 168, 171, 0.16);
  --color-border-strong: rgba(155, 168, 171, 0.28);
  --color-text-primary: #F5F7FA;
  --color-text-secondary: #B7C2C8;
  --color-text-muted: #81919B;
  --color-accent: #1598D4;
  --color-accent-bright: #69CDE8;
  --color-focus: #69CDE8;
}
```

Apply the palette with restraint: approximately 70% dark canvas, 20% blue-gray surfaces, 8% text/highlights, and 2% accent color as a rough visual guide—not a rigid measurement. Maintain WCAG AA contrast for text and controls.

**Reference interpretation**
- The first supplied image informs restrained cyan lighting, clear white typography, and custom technical illustrations. Do not copy its blockchain content, pricing cards, or business model.
- The second image informs tactile depth, quiet shadows, and tonal contrast between near-black and muted gray. Translate this into subtle card elevation and section separation; do not fill the page with large empty capsule shapes.
- The third image is the main palette reference for deep navy, blue-gray, steel-gray, and cool-white surfaces.
- These references establish visual language, not a requirement to reproduce their exact page layouts. The portfolio must remain centered on Vibishan's real work.

### Explicitly prohibited visual choices

- Lavender, pink, magenta, violet or purple-led palettes.
- Neon gradients across whole sections.
- Glowing orbs behind every heading.
- Glassmorphism on every card.
- Huge meaningless animated blobs.
- Emoji in headings, cards, or buttons.
- Fake terminal text that serves no purpose.
- Constantly moving backgrounds.
- Excessive rounded pill components.
- Generic “AI brain” stock imagery.
- Fake GitHub contribution graphs or fabricated live statistics.
- Fake counters such as “50+ projects” or “99.9% uptime.”

### Typography

Use a strong, modern sans-serif for body and headings, with an optional restrained monospace for labels, technical metadata, IDs, and code-like details.

Recommended:
- Main type: `Inter`, `Geist`, or a well-supported system fallback.
- Monospace: `JetBrains Mono` or `Geist Mono`.
- Use a clear scale: compact uppercase eyebrow labels, large but not oversized hero headline, 16–18px body text, comfortable line-height, and readable technical descriptions.
- Avoid very thin text weights on dark backgrounds.
- Use `clamp()` for fluid headline and spacing sizes.

### Layout principles

- Maximum content width around 1180–1280px.
- Wide gutters on desktop; reduced but intentional gutters on mobile.
- Strong vertical rhythm.
- Sections separated by spacing and fine borders, not huge empty gaps.
- Use asymmetry sparingly: a left-aligned text block balanced with a right-side technical visual or compact profile panel.
- Prefer editorial grids and carefully structured content over endless identical cards.
- Keep project cards consistent, but let featured case studies have distinct layouts.
- The header should be compact and useful, not a giant banner.

### Surface treatments

- Thin cool-gray borders.
- Very subtle navy surface differences.
- Small top-edge highlights only where useful.
- Gentle hover elevation or border shift.
- Avoid heavy shadows; use shadows only to establish depth.
- Use a faint grid or technical coordinate motif only in one or two places, at very low opacity.
- Optional decorative “signal line” or system-node motif can be created with CSS/SVG, but it must not compete with the text.

---

# 4. Information Architecture and Routes

Build a multi-section home page plus dedicated project case-study routes. A visitor should be able to share a link to an individual project.

## Required routes

- `/` — Home / portfolio overview
- `/work` — Project index with filters
- `/work/sentio-kairo` — SENTIO-KAIRO research case study
- `/work/rlhf-for-slm` — RLHF for Small Language Models research case study
- `/work/guider` — Guider career guidance platform
- `/work/iblis` — Iblis personal AI assistant
- `/work/multimodal-reasoning-engine` — Multimodal AI Reasoning Engine
- `/work/b2b-enterprise-intelligence-engine` — B2B Enterprise Intelligence Engine
- `/work/ai-model-router` — AI Model Router Chatbot
- `/work/cnc-digital-twin` — CNC Digital Twin
- `/work/neonatal-jaundice-monitoring` — Neonatal Jaundice Monitoring
- `/work/forme` — FormE
- `/work/education-paper-recommender` — Education Paper Recommender
- `/work/lung-cancer-prediction` — Lung Cancer Prediction
- `/work/facial-recognition-attendance` — Facial Recognition Attendance System
- `/experience` — Work experience
- `/research` — Research and technical publications/presentations (only verified statuses)
- `/about` — About, approach, and background
- `/contact` — Contact details and form
- `/resume` or a prominent resume download action — optional, only if a final verified PDF is present

If the project framework is not well suited to a large number of separate pages, implement reusable case-study templates and load content from typed data files. Do not duplicate page markup for each project.

## Global navigation

Desktop navigation:
- Home
- Work
- Research
- Experience
- About
- Contact

Include a compact CTA: **Get in touch**. If a verified resume PDF is present, add **Resume** as a secondary action. Do not create a fake download link.

Mobile navigation:
- Accessible menu button with clear open/close states.
- Close menu after selecting a route.
- Lock body scroll only while the menu is open.
- Support Escape key and focus management.
- Do not let the menu cover content in a confusing way.

## Footer

Include:
- Vibishan Anandhan
- “AI systems · Backend engineering · SLM research”
- LinkedIn and GitHub links
- Email link
- Current year generated dynamically
- A simple back-to-top link
- No fake social links or unnecessary footer columns

---

# 5. Home Page — Full UX Specification

## 5.1 Header

- Sticky or fixed header with a subtle dark translucent surface only after scroll.
- At page top, keep it visually integrated with the canvas.
- Small typographic wordmark: `VIBISHAN ANANDHAN` or `VA / SYSTEMS`.
- Active section/route indicator should be subtle, using a blue line or small dot.
- Header should shrink slightly after scrolling, but not jump.
- Add a visible keyboard focus style and accessible labels.

## 5.2 Hero section

The first viewport should communicate the person and the work immediately.

### Suggested content

Eyebrow:
`AI SYSTEMS / BACKEND ENGINEERING / RESEARCH`

Main headline:
**Building practical AI systems from models to real workflows.**

Supporting paragraph:
“I work across AI application development, backend systems, integrations, retrieval pipelines, and small language model research. My projects explore how models can reason over domain context, interact with software, and operate within practical constraints.”

Primary CTA:
`Explore selected work`

Secondary CTA:
`Contact`

Optional tertiary text link:
`View résumé` — only if a real final résumé file exists.

### Hero visual

Create a custom, restrained technical visual—not a stock image. Options:
- A layered system diagram: `INPUT → CONTEXT → MODEL → TOOLS → OUTPUT`.
- A small animated graph of connected nodes representing software, retrieval, model, and tools.
- A “systems map” with labels such as `SLM`, `RAG`, `API`, `MCP`, `EDGE` only where supported by actual experience.
- A compact featured research panel for SENTIO-KAIRO.

Requirements:
- Use inline SVG/CSS or a lightweight diagram library already installed.
- Animation should be slow and purposeful.
- Respect `prefers-reduced-motion`.
- The diagram must remain understandable when animation is disabled.
- Do not pretend it is a live telemetry dashboard or show fake runtime metrics.

### Hero interaction

- CTA buttons have subtle hover/focus feedback.
- A short scroll cue may appear, but do not make scrolling mandatory.
- Avoid a full-screen loading animation.
- Do not block content behind a preloader.

## 5.3 Selected work section

Feature four projects:
1. **SENTIO-KAIRO** — voice-first industrial diagnostic assistant using fine-tuned SLMs and Jetson Nano deployment.
2. **RLHF for Small Language Models** — alignment experiments and evaluation trade-offs.
3. **Guider** — AI-first career guidance platform for students and parents.
4. **Iblis** — local-first personal AI assistant.

Use a 12-column editorial grid or an equivalent responsive grid:
- One featured project may span 7–8 columns.
- A second may span the remaining columns.
- Other projects can use a balanced two-column layout.
- Each card should show title, one-sentence purpose, contribution/role if known, tags, and a “Read case study” action.
- Do not display unverified metrics as decorative badges.
- Use restrained line-art or small architecture visuals rather than unrelated photos.

## 5.4 Research highlight

A clear research section should make the two main research efforts distinct and correctly ordered:

**01 — SENTIO-KAIRO**  
Research/presentation project: voice-first industrial diagnostic assistant using a fine-tuned small language model, Jetson Nano deployment, retrieval grounding, quantization, and CNC digital-twin/testbed scenarios. Best Paper Presentation Award at the MulticoreWare Annual R&D Symposium — Coimbatore Edition 2026, held 13 August 2026.

**02 — RLHF for Small Language Models**  
Ongoing research project investigating preference-based alignment approaches for small language models, including DPO, KTO, PPO, GRPO, and LoRA-based adaptation. The benchmark includes trade-offs between diagnostic accuracy and response structure/grounding.

Show status labels carefully:
- SENTIO-KAIRO: `Research project / presentation`
- RLHF for SLM: `Ongoing research`
Do not use `Published`, `Accepted`, or `Peer-reviewed` without verification.

## 5.5 Technical focus section

Title:
**Systems I work across**

Use a clean list/grid rather than oversized skill badges.

Categories:
- **AI application engineering:** Python, model integration, local-model workflows, prompt/context construction.
- **Retrieval and knowledge systems:** RAG pipelines, embeddings, vector search, reranking and source-grounded responses.
- **Backend and integration engineering:** Go, Python, REST APIs, OAuth/provider integration, webhooks, workflow runtimes.
- **Frontend engineering:** React, TypeScript, Vite, Tailwind CSS.
- **Agent and tool integrations:** MCP server development and tool registration.
- **Industrial AI prototypes:** CNC digital twin scenarios, diagnostic workflows, Jetson Nano deployment in SENTIO-KAIRO.
- **Data and ML foundations:** data processing, applied machine learning, computer vision, evaluation.

Only include skills supported by the user's experience or existing project stack. Avoid proficiency percentages or self-rated bars. Do not include C++.

## 5.6 Experience preview

Feature the current role first:
- Software Developer Intern — Shayr Omnichannel Pvt Ltd (Adya.ai), Technology Team
- Start date: 18 May 2026 — ongoing (update automatically only if the source content is maintained; do not invent an end date)
- Short summary: backend engineering, workflow execution, integrations, MCP, provider configuration, and AI orchestration.

Then include:
- Data Analyst Intern — Vbug Tech Pvt Ltd (February–June 2025; verify exact dates)
- Python Development Intern — Octanet Services Pvt Ltd (June–July 2024)

Provide a link to the full experience route.

## 5.7 About preview

Use a short paragraph, not an autobiography:
“I’m an AI and Data Science undergraduate who enjoys working at the intersection of models and software systems. I’ve worked on backend integrations, AI-driven applications, retrieval systems, and research prototypes for small language models. I care about clear architecture, measurable evaluation, and systems that can be inspected and improved.”

Add a “How I work” list:
- Build the smallest testable version first.
- Make system boundaries and data flow explicit.
- Evaluate behavior rather than relying on demos alone.
- Keep model and infrastructure constraints visible.
- Document assumptions, limitations, and trade-offs.

These are positioning statements, not claims of formal process certification.

## 5.8 Contact CTA

Heading:
**Have a research, engineering, or collaboration idea?**

Copy:
“I’m open to conversations about AI engineering, backend systems, research collaboration, and technically ambitious projects.”

Buttons:
- Email
- LinkedIn
- GitHub

No fake booking calendar, no sales funnel, no newsletter signup unless specifically implemented and useful.

---

# 6. About Page

Create an editorial, readable page with these sections.

## 6.1 Profile

Name: Vibishan Anandhan  
Location: Coimbatore, Tamil Nadu, India  
Education: B.Tech, Artificial Intelligence and Data Science, Karpagam College of Engineering  
Expected completion: March 2027

Use this as the main biography:
“I’m pursuing a B.Tech in Artificial Intelligence and Data Science at Karpagam College of Engineering. My technical work spans backend development, AI application engineering, local language-model workflows, retrieval-augmented generation, and research on small language models. I have also worked on workflow and provider integrations in a production-oriented platform environment. I’m especially interested in engineering systems that connect model behavior with tools, data, and real operational tasks.”

Do not publish age, date of birth, home address, or personal identifiers that are not needed for professional contact.

## 6.2 Technical approach

Write concise prose around:
- **Model + system thinking:** a model is one component; the surrounding data flow, tool access, state, evaluation, and failure handling matter.
- **Grounded AI:** source attribution and retrieval quality should be considered part of the system, not an afterthought.
- **Integration engineering:** provider credentials, webhooks, payload validation, execution state, retries, and error handling are important.
- **Practical evaluation:** report benchmark scope, hardware, and limitations rather than presenting a single score without context.
- **Local-first exploration:** local models and constrained hardware are useful environments for studying cost, latency, privacy, and deployment trade-offs.

## 6.3 Education

**Karpagam College of Engineering — Coimbatore, Tamil Nadu**  
B.Tech in Artificial Intelligence and Data Science  
September 2023 – expected March 2027

CGPA: the latest notes conflict between 7.9 and 8.0. **Do not publish a CGPA until the user verifies the current official value.** Keep it in a single content field set to `null` by default.

**Lingannamani Matriculation School — Tirupattur, Tamil Nadu**  
Higher Secondary Certificate (HSC), 2022–2023  
Reported overall score: 92%  
Subject scores previously supplied: Computer Science 100, Mathematics 90, Physics 95, Chemistry 99. Include subject scores only if useful and verified; prefer just the 92% overall score in the public portfolio.

Do not include the school gold-coin/recognition item. Do not include SSLC results.

---

# 7. Experience Page — Verified, Credible Detail

Use a timeline with role, organization, dates, scope, and selected work. Do not make every bullet sound like a separate full product if it was a contribution within a larger platform.

## 7.1 Software Developer Intern — Shayr Omnichannel Pvt Ltd (Adya.ai)
**Technology Team | 18 May 2026 – Present**

Summary:
“Contribute to backend and platform engineering across workflow execution, provider integrations, MCP tooling, and AI orchestration in the Vanij ecosystem.”

Potential bullets, phrased conservatively:
- Developed and maintained integration components and provider workflows across a multi-service platform.
- Implemented a reusable AWS Textract component for document text extraction and integrated it into the shared component library and V2 workflow execution path, including runtime configuration and provider setup.
- Built an Evolution API MCP server from scratch, including WhatsApp-related tool operations, MCP tool registration, dynamic credential-manager support, package setup, documentation, and gateway integration fixes.
- Worked on OAuth/provider configuration and credential resolution for integrations.
- Investigated and corrected workflow-runtime behavior involving webhook routing, flow navigation, payload handling, node validation, connection mapping, component dispatch, persistent state, and provider execution.
- Contributed to WhatsApp CPaaS functionality across frontend and backend areas, including forms/templates, flow builder and discovery, catalog/campaign workflows, simulator/developer tools, events/traces/usage/settings, and payment/order-related flows.
- Contributed to AI orchestrator behavior involving sub-agents, tool configuration, prompts, clarification handling, channel logic, and agent registry/supervisor-mode detection.
- Used local testing and API inspection workflows, including Postman, to validate behavior and troubleshoot integration issues.

Tech that may be displayed for this role:
Go, TypeScript, React, REST APIs, OAuth, webhooks, MCP, AWS Textract, Meta Graph API, MongoDB, provider integrations, workflow execution.

Important wording:
- Do not claim sole ownership of the whole Vanij platform.
- Do not claim all platform integrations were authored by the user.
- Do not claim production traffic/user numbers or performance improvements without evidence.
- If a particular contribution is not confirmed in the current repo, leave it out rather than inventing it.
- Do not show proprietary code or internal architecture details that the employer has not approved for public disclosure. Keep descriptions at a safe, high-level professional level.

## 7.2 Data Analyst Intern — Vbug Tech Pvt Ltd
**February–June 2025; exact dates should be verified**

- Worked on a facial-recognition data workflow and Google Sheets API integration.
- Supported data processing and database/query workflow improvements.
- Built or contributed to data handoff and reporting automation.

Avoid claiming quantified efficiency gains unless confirmed.

## 7.3 Python Development Intern — Octanet Services Pvt Ltd
**June–July 2024**

- Worked on Python application development, debugging, and maintenance tasks.
- Practiced implementing and validating application logic and handling errors.

The exact project title and specific deliverables are not verified. Keep the description general until the user provides evidence.

---

# 8. Research Case Study 01 — SENTIO-KAIRO

This should be the first and most visually prominent research case study.

## Official project title
**SENTIO-KAIRO: An Adaptive Edge AI Voice-Native Assistant for Predictive Maintenance Using Fine-Tuned Small Language Models**

## Short description
A voice-first industrial diagnostic assistant that explores how a fine-tuned small language model, retrieval-grounded context, and edge deployment can support diagnostic workflows for rotating machinery.

## Role and contributions
The user served as team lead/mentor and contributed primarily to SLM work, Jetson Nano deployment, quantization, retrieval/RAG, and system architecture. Present this as a team project and distinguish the user's work from the team's overall work.

## Technical scope
- Fine-tuned small language model for domain-specific industrial diagnostics.
- Voice-native interaction concept for industrial maintenance workflows.
- NVIDIA Jetson Nano edge deployment.
- Retrieval/context grounding for machine logs and diagnostic evidence.
- Quantization and model deployment considerations.
- CNC digital twin / Kairo-Logs testbed for repeatable scenario evaluation.
- Predictive-maintenance framing for rotating equipment, pumps, and compressors.

## Evaluation context
- Simulated 40 sessions across rotating equipment, pumps, and compressors using the Kairo-Logs testbed.
- Reported diagnostic accuracy increased from 74.10% to 90.20% across three adaptation cycles.
- Reported edge inference latency moved from 210 ms to 196 ms.
- Reported voice latency moved from 640 ms to 580 ms.

Display these numbers only with a note that they refer to the reported testbed and evaluation setup, not broad real-world industrial validation. Keep units and definitions beside the values. If the underlying report does not define precisely what each latency measures, label them “reported edge inference latency” and “reported voice latency,” not “end-to-end latency.”

## Award
**Best Paper Presentation Award**  
MulticoreWare Annual R&D Symposium — Coimbatore Edition 2026  
13 August 2026

This is an award for presentation, not a claim of journal publication or paper acceptance. Do not change the wording to “Best Paper Award” unless the certificate confirms that exact title.

## Suggested case-study structure
1. Problem and context.
2. Design goal.
3. System architecture diagram.
4. Model and retrieval pipeline.
5. Edge deployment approach.
6. Evaluation method and results.
7. User contribution.
8. Limitations and next steps.
9. Award and team acknowledgment.

## Architecture diagram
Create a clear diagram:
`Machine / Kairo-Logs input → Context preparation → Retrieval / evidence → Fine-tuned SLM → Diagnostic response → Voice interaction / operator`
Show the Jetson Nano as the deployment target for the edge path. Only draw components that match the actual implementation; mark conceptual components as such if they are not all deployed in one integrated runtime.

## Limitations
- Evaluation was based on simulated testbed sessions.
- A small scenario set does not establish generalization to all industrial equipment.
- Field validation, safety validation, and long-term reliability are separate future requirements.
- Latency depends on hardware, quantization, model configuration, and measurement method.

---

# 9. Research Case Study 02 — RLHF for Small Language Models

## Title
**RLHF (Reinforcement Learning from Human Feedback) for Small Language Models**

## Status
Ongoing research / project work. Do not label the paper published, accepted, or peer-reviewed unless later verified.

## Short description
A framework for exploring preference-based alignment and evaluation methods for small language models, with a CNC diagnostic scenario used as an industrial edge-style evaluation context.

## Motivation
Large language models can be expensive to run and deploy. Small language models are more resource-efficient but may need additional alignment and evaluation to produce reliable, structured, and context-grounded responses. This project investigates alignment techniques and evaluates their trade-offs rather than assuming adaptation always improves every metric.

## Methods and technical scope
- DPO (Direct Preference Optimization).
- KTO (Kahneman–Tversky Optimization).
- PPO (Proximal Policy Optimization).
- GRPO (Group Relative Policy Optimization).
- LoRA-based adaptation.
- Evaluation pipeline and benchmark management.
- FastAPI backend, operations console, automated tests, and CNC digital-twin example in the repository.
- Model registration/activation and health/readiness workflow in the application.

Do not imply all methods were run in the same final benchmark unless the implementation/results support that.

## Benchmark setup
- Base and DPO-LoRA-adapted Phi-3 Mini.
- 32 CNC diagnostic scenarios.
- NVIDIA GeForce RTX 3050 Laptop GPU, 6 GB VRAM.
- 16 GB system RAM.

## Reported results
Use a comparison table and explicitly label the columns `Base Phi-3 Mini` and `DPO-LoRA-adapted Phi-3 Mini`.

| Metric | Base model | DPO-LoRA-adapted model |
|---|---:|---:|
| Diagnostic accuracy | 90.6% | 87.5% |
| Benchmark pass rate | 46.9% | 37.5% |
| Evidence grounding | 84.4% | 93.8% |
| Structural adherence | 87.5% | 100% |
| Action completeness | 90.6% | 100% |
| Latency | 9.20 s | 15.97 s |
| Peak reserved GPU memory | 3,206 MB | 3,848 MB |

## Interpretation
The adapted model improved evidence grounding, structural adherence, and action completeness, but diagnostic accuracy and overall benchmark pass rate declined; latency and memory use increased. The website must preserve this mixed result. Do not create a “performance improved by X%” banner that hides the trade-offs.

## Case-study sections
1. Research question.
2. Why SLM alignment matters.
3. Methods and alignment algorithms.
4. Experimental setup and hardware constraints.
5. Results table.
6. Interpretation and trade-offs.
7. Limitations.
8. Next steps.

## Limitations to state
- Only 32 diagnostic scenarios were evaluated in the reported benchmark.
- The results should not be generalized beyond this setup without further experiments.
- The adapted model did not improve every metric.
- Additional seeds, repeated runs, broader datasets, preference-data analysis, and evaluation on more hardware configurations would strengthen the findings.

---

# 10. Project Portfolio — Complete Content Inventory

Implement a project registry in a central typed file, such as `src/content/projects.ts`. Each project object should support title, slug, category, summary, long description, role, status, stack, contributions, outcomes, limitations, links, featured status, and whether a case study is complete. If a field is unverified, leave it blank or mark it private; do not show placeholder text to visitors.

## 10.1 Guider — Career Guidance Platform
**Category:** AI application / education technology  
**Status:** Product/project; distinguish completed features from planned features.

Description:
“An AI-first career intelligence platform designed to help students and parents explore career domains, colleges, examinations, scholarships, and cutoff-related information through a profile-aware guidance experience.”

Potential features from project scope:
- AI chat for career guidance.
- Domain and career exploration.
- College listings.
- Examination information.
- Scholarship discovery.
- Cutoff calculator.
- Student profile and context-aware interactions.
- Parent-oriented support for multiple child profiles was part of the product concept; mark it as planned unless the implementation is confirmed.
- Mobile-first signup/login flow using a phone number, generated user ID, and DOB-based authentication was discussed as a design. Do not claim production security or deployed OTP authentication unless implemented and verified.

Stack associated with the project:
- Frontend: React, TypeScript, Vite, Tailwind CSS, shadcn/ui, React Router, React Query, Zustand.
- Backend: Node.js, Express, TypeScript.
- Data: SQLite and ChromaDB.
- Local models: Llama 3.1 8B for conversational responses, Qwen 3 for reasoning, nomic-embed-text for embeddings.
- Local inference via Ollama.

RAG architecture:
`Intent detection → Context construction → Vector/database/knowledge-base retrieval → Result aggregation → Reranking → Prompt construction → Model reasoning/generation → Source attribution`

Supported ingestion formats in the design:
PDF, DOCX, TXT, CSV, JSON, SQLite.

RAG behavior goal:
Responses should include source attribution and confidence information. Do not claim these are implemented in production unless verified.

Privacy/product positioning:
The platform is intended to be free for students and parents. Do not add a subscription/paywall strategy or SaaS upsell CTA.

Case-study visual:
A diagram showing a student profile and query entering the RAG pipeline, retrieving source documents, then returning a cited response.

## 10.2 Iblis — Personal AI Assistant
**Category:** Local-first AI / personal assistant

Description:
“A local-first personal AI assistant concept focused on conversational interaction, contextual retrieval, and task-oriented assistance using locally run models and retrieval components.”

Stack discussed:
- Ollama.
- Llama.cpp.
- ChromaDB.
- Llama 3.1 8B.
- Qwen 3.
- nomic-embed-text.

Potential capabilities discussed:
- Local model interaction.
- RAG and memory/context retrieval.
- Voice/text interaction and system-task support in the broader concept.

Do not present all potential capabilities as shipped features without checking the current code. Use a “current implementation” section based on repository evidence and a “planned” section only if helpful.

## 10.3 Multimodal AI Reasoning Engine
**Category:** AI reasoning / multimodal systems

Description:
“An experimental reasoning engine exploring multi-step candidate generation, scoring, aggregation, and pruning, with a Graph-of-Thoughts-style workflow and knowledge integration.”

Pipeline:
`EXPAND → SCORE → AGGREGATE → PRUNE`

Technical topics:
- Structured multi-step reasoning.
- Candidate evaluation and pruning.
- Knowledge integration / knowledge graph concepts.
- Multimodal reasoning as a project direction.

The exact modalities, datasets, measured performance, and production status are not verified. Do not invent image/audio/video support or benchmark results. If the current repository demonstrates only text, describe it as text-first and keep multimodal capabilities as an intended direction.

## 10.4 B2B Enterprise Intelligence Engine
**Category:** Enterprise AI / data intelligence

Description:
“An engineering project focused on collecting, extracting, normalizing, and structuring business information to support downstream enterprise intelligence workflows.”

Stack discussed:
Python, FastAPI, PostgreSQL, LLM integration, web crawling, and knowledge-graph concepts.

Do not claim broad live-web coverage, commercial deployment, or specific accuracy without evidence. Confirm actual data sources and implemented pipeline stages from the repository.

## 10.5 AI Model Router Chatbot
**Category:** AI application / model orchestration

Description:
“A chatbot and routing concept for directing user requests to appropriate model or backend paths.”

Possible scope to confirm in code:
- Request classification/routing.
- Multiple model/backend integration.
- Conversation interface.
- Error handling and response display.
- Caching or performance logic only if implemented.

Do not invent routing accuracy or latency benchmarks.

## 10.6 CNC Digital Twin
**Category:** Industrial simulation / developer tooling

Description:
“A 3D industrial machine simulation used to represent machine motion, kinematics, machining cycles, telemetry, and fault scenarios. It also provides a context for AI-assisted diagnostics and research evaluation.”

Components previously referenced:
- MachineMotion
- MachineKinematics
- MachiningCycle
- FaultEngine
- SpindleController
- MachineComponents
- ControlPanel
- TelemetryDisplay
- FaultPanel
- AIChatPanel
- ContextBuilder

Use the exact component names only where they exist in the current codebase. The project is a simulation/testbed, not a certified industrial controller. Avoid claims of physical CNC control or safety-certified operation.

## 10.7 Neonatal Jaundice Monitoring
**Category:** Computer vision / healthcare research prototype

Description:
“A computer-vision prototype exploring image-based analysis for neonatal jaundice monitoring, using image preprocessing and region-of-interest extraction.”

Technical context discussed:
- Python.
- OpenCV.
- scikit-image.
- Smartphone-image workflow.
- Colour normalization and ROI extraction.
- Mendeley dataset source was referenced.

Important limitation:
This is not a clinically validated diagnostic device. Do not make medical claims, imply clinician replacement, or display patient data. Mention that clinical validation would be required before real-world use.

## 10.8 FormE
**Category:** Document workflow / automation

Description:
“A form and document automation project exploring extraction of relevant information and assistance with filling structured forms.”

The exact stack and current implementation are not confirmed. Inspect repository before adding implementation-specific claims.

## 10.9 Education Paper Recommender
**Category:** Information retrieval / recommendation

Description:
“A research-paper discovery concept that explores matching a user's academic interests or query to relevant papers using semantic similarity and ranking.”

Dataset, embeddings, evaluation metrics, and exact stack are unverified. Do not invent them.

## 10.10 Lung Cancer Prediction
**Category:** Applied machine learning

Description:
“An applied machine-learning project focused on lung-cancer prediction/classification.”

The dataset, features, model, validation protocol, metrics, and clinical applicability are unverified. Do not claim diagnostic accuracy or clinical usefulness. Label as an educational ML project/prototype unless further evidence supports a stronger statement.

## 10.11 Facial Recognition Attendance System
**Category:** Computer vision / data workflow

Description:
“A facial-recognition attendance workflow involving computer vision and Google Sheets integration.”

Python/OpenCV and Google Sheets API are associated with the work. Avoid showing faces or personal biometric data. Confirm whether this is separate from the Vbug Tech internship work before publishing duplicate details.

## 10.12 Other portfolio projects
Only add additional projects if repository evidence or user confirmation supports them. Do not restore MedHub, Data Fusion Engine, or Student Management Portal unless the user explicitly asks to include them again.

---

# 11. Hackathons, Awards, and Leadership

Create a compact route/section titled **Recognition & Community**. Avoid making a list of event names look like a list of wins.

## 11.1 Confirmed award
**Best Paper Presentation Award**  
MulticoreWare Annual R&D Symposium — Coimbatore Edition 2026  
13 August 2026  
Associated research: SENTIO-KAIRO.

## 11.2 Other event participation
The user has referenced participation or involvement in AI-themed hackathons and innovation challenges including:
- Smart India Hackathon (SIH)
- MSME 5.0
- EY Techathon
- Tata Elxsi TELEPORT
- UWA Hack for Impact 2026
- Idea Fusion
- Among Us (exact event name/category should be verified)

The general statement may be:
“Participated in several national and international AI-focused hackathons and innovation challenges.”

However:
- Include each event as a participation entry only if participation is confirmed.
- Do not imply a win or finalist status for all listed events.
- UWA Hack for Impact 2026 was associated in prior notes with AUD 2,000, but the exact award/category/status is not confirmed. Do not display the amount until verified.
- Idea Fusion was previously associated with second prize. Verify the official event name and prize category before presenting it as an award.
- A Meta Global AI Developer Hackathon / Cerebral Valley application was prepared, with an Indie Dev Track project idea called ForgeOS. The user had planned/applied; do not state participation, selection, or a result unless confirmed.

## 11.3 ForgeOS (hackathon concept, not an awarded product)
Concept:
“A forward-deployed AI engineering platform for industrial companies, designed to connect domain-specific reasoning with operational tools and workflows. The concept combines a small language model for domain-specific reasoning with multimodal models for tasks that need them.”

Present only as a concept/application project if the user wants it included. Do not imply it was shipped or selected for the hackathon.

## 11.4 Leadership and communities
Previously referenced affiliations/roles:
- IEEE Member & Development Head.
- IAENG Member.
- NSS Volunteer.
- E-Cell IIT Bombay — Overall Communication Head.
- AI Innovation Club.
- Research Scholar Body.

Verify official titles, membership status, and dates before public display. If uncertain, use a small “Communities” list with only confirmed affiliations, not inflated leadership titles.

---

# 12. Skills and Technology Presentation

Do not use percentage bars or labels like “Expert 95%.” Use categorized text lists with a restrained layout.

Suggested categories:

### Programming and application development
- Python
- Go
- TypeScript / JavaScript
- SQL
- Rust only if the user later confirms actual proficiency; otherwise omit it.

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- React Query
- Zustand
- shadcn/ui

### Backend and integration
- FastAPI
- Flask
- Node.js
- Express
- REST APIs
- OAuth/provider integrations
- Webhooks
- Workflow execution

### AI / ML
- PyTorch
- TensorFlow
- scikit-learn
- OpenCV
- Pandas
- NumPy
- XGBoost
- YOLOv8 and SAM only if the user wants to represent them and can discuss practical usage.

### LLM and retrieval systems
- Ollama
- Llama.cpp
- ChromaDB
- Embeddings and semantic search
- Retrieval-augmented generation
- Reranking / source-grounded response design
- LoRA / DPO / KTO / PPO / GRPO as research techniques (do not imply equal depth or production implementation for all).

### Platform / infrastructure
- Docker
- Docker Compose
- Git
- Postman
- SQLite
- MongoDB
- PostgreSQL only if used in the relevant project.
- AWS Textract component integration
- MCP server development

Do not add technologies merely because they are popular. The content file should allow easy removal of anything not confidently supported.

---

# 13. Contact Page

Show:
- Email: `vibishan.anandhan.m@gmail.com`
- LinkedIn: `https://www.linkedin.com/in/evil-dreams/`
- GitHub: `https://github.com/Evil-Dreams`
- Location: Coimbatore, Tamil Nadu, India

Do not expose the phone number by default. Add it only if the user explicitly wants it public.

## Contact form
A functional contact form is optional. If implemented:
- Validate name, email, and message on client and server.
- Show accessible inline validation and submission states.
- Add a honeypot or reasonable spam protection.
- Never expose API secrets in frontend code.
- Do not claim a message was sent unless the backend actually accepts it.
- Provide a mailto fallback.
- If no mail provider is configured, show a clear “Email directly” action rather than a fake success message.
- Add rate limiting if the form is served by the Go backend.
- Store no personal messages in a database unless there is a real need and privacy notice.

---

# 14. Motion and Interaction System

Motion should communicate state and hierarchy. It should not be decoration for its own sake.

## Required animations
1. **Page entrance:** subtle opacity and vertical translation for the main content; keep duration short.
2. **Section reveal:** use IntersectionObserver or a small established library; animate once, not on every scroll in/out.
3. **Project card hover:** small border change, slight elevation, or a small arrow shift. No giant card zoom.
4. **Navigation:** active indicator moves or fades smoothly.
5. **Hero diagram:** slow node/line activity, optional low-amplitude movement, no continuous frantic animation.
6. **Buttons:** clear hover, pressed, disabled, and focus states.
7. **Filters:** quick transition when changing project categories; maintain a sensible layout.
8. **Project detail transitions:** keep navigation responsive; avoid long page-transition delays.
9. **Copy/link interactions:** if copy-to-clipboard is used, provide a visible status message and accessible announcement.
10. **Mobile navigation:** animate open/close while respecting reduced motion.

## Motion rules
- Respect `prefers-reduced-motion: reduce` globally.
- Do not animate large areas of text.
- Avoid scroll-jacking.
- Avoid auto-playing video or sound.
- Do not use a cursor-following spotlight that harms readability or performance.
- Keep animation durations generally around 150–450ms for UI transitions; slower ambient movement only in the hero diagram.
- Use transform and opacity when possible to avoid layout thrashing.
- Do not use a large animation library unless already installed or the interaction genuinely requires it.

## Interaction completeness
Every button, card link, filter, nav item, tab, and form control must have a real behavior. If an element is only decorative, do not style it as an interactive control.

---

# 15. Responsive Behavior

## Desktop
- Strong two-column hero: text on one side, diagram/featured research on the other.
- Four-column or asymmetrical project grid where appropriate.
- Generous whitespace, clear alignment, and long-form readable line lengths.

## Tablet
- Collapse the hero to a balanced two-column or stacked layout depending on width.
- Reduce grid columns to two.
- Avoid cramped metadata rows.
- Keep project diagrams legible.

## Mobile
- Single-column layout.
- Keep headline concise and avoid awkward line breaks.
- Use 20–24px side padding on typical mobile screens where possible.
- Project tags wrap naturally.
- Make buttons touch-friendly (around 44px minimum target).
- No horizontal overflow.
- Tables, especially the RLHF results table, should be horizontally scrollable within a labeled container or transform into accessible stacked rows.
- Navigation menu should be keyboard and screen-reader accessible.
- Technical diagrams must reflow or have a mobile-friendly simplified rendering.
- Avoid sticky elements that occupy too much vertical space.

---

# 16. Accessibility, SEO, and Performance

## Accessibility
- Semantic HTML: header, nav, main, section, article, footer.
- One clear H1 per page and hierarchical H2/H3 structure.
- All images/diagrams have appropriate accessible names or are marked decorative.
- Keyboard support for every interactive element.
- Visible focus indicators.
- Color contrast should meet WCAG AA for normal text where feasible.
- Do not communicate status with color alone.
- Proper labels and error messages for forms.
- Focus management for mobile navigation and dialogs.
- Reduced-motion support.
- Do not use click handlers on non-semantic divs when a button or link is appropriate.

## SEO
- Unique title and description per route.
- Canonical URL configurable from a site URL environment/config value.
- Open Graph and social preview metadata.
- Favicon using a simple monogram or geometric mark.
- Sitemap and robots configuration if supported by the framework.
- Structured data for Person and CreativeWork only when accurate and useful.
- Good headings and meaningful internal links.
- No fabricated ratings, reviews, or professional endorsements.

## Performance
- Static-first pages and local content data.
- Lazy-load non-critical imagery and route components.
- Avoid huge background videos.
- Keep dependencies lean.
- Use SVG/CSS for diagrams when possible.
- Avoid layout shift by reserving image/diagram space.
- Optimize fonts and limit font weights.
- Target strong Core Web Vitals and a high Lighthouse score, but report actual test results rather than promising a score before measuring.

---

# 17. Engineering Architecture

## Architectural decision

This is primarily a personal portfolio and should not be turned into a complex SaaS application. Use the simplest architecture that supports the required experience.

### Recommended stack
- **Frontend:** React + TypeScript + Vite.
- **Styling:** Tailwind CSS if already installed; otherwise CSS Modules or a clean global design-token system. Avoid installing multiple styling systems.
- **Routing:** React Router if multi-route routing is needed.
- **Animation:** CSS transitions + IntersectionObserver; use Framer Motion only if already installed or genuinely beneficial.
- **Content:** typed TypeScript objects/MDX files, with a reusable project case-study template.
- **Backend:** Go only if implementing real server-side functionality (contact form, rate limiting, server-side validation, health endpoint). If no server feature is needed, ship a static frontend.
- **Data store:** none by default. Do not add PostgreSQL, MongoDB, or Redis for a portfolio that does not need them.
- **Deployment:** static hosting for frontend; small Go service deployed separately only if required.
- **Testing:** Vitest + React Testing Library if the project supports them; Playwright for key end-to-end flows if reasonable.

### Why Go rather than Rust here?
Go is a practical choice for a small, maintainable HTTP API and simple deployment. Rust is excellent for performance-critical systems, but a portfolio contact endpoint does not justify Rust's additional implementation overhead. Do not add Go or Rust solely to decorate the technology list; only display Go as a portfolio backend skill if the user can support that claim.

### Frontend structure (adapt to existing repo)
```text
src/
  app/
    App.tsx
    router.tsx
  components/
    layout/
      SiteHeader.tsx
      MobileNavigation.tsx
      SiteFooter.tsx
      PageContainer.tsx
    ui/
      Button.tsx
      SectionHeading.tsx
      Tag.tsx
      ProjectCard.tsx
      TimelineItem.tsx
      AccessibleTable.tsx
    motion/
      Reveal.tsx
      ReducedMotion.tsx
    diagrams/
      SystemsMap.tsx
      SentioArchitecture.tsx
      RAGPipeline.tsx
      RLHFResults.tsx
  pages/
    HomePage.tsx
    WorkPage.tsx
    ProjectPage.tsx
    ResearchPage.tsx
    ExperiencePage.tsx
    AboutPage.tsx
    ContactPage.tsx
    NotFoundPage.tsx
  content/
    profile.ts
    experience.ts
    projects.ts
    research.ts
    awards.ts
    skills.ts
  styles/
    tokens.css
    global.css
    typography.css
  lib/
    seo.ts
    analytics.ts   # omit unless analytics is deliberately configured
    contact.ts
  test/
```

The directory structure is a recommendation, not a reason to rewrite an existing well-structured repository. Match the existing conventions.

### Optional Go backend
Only build this if a working contact form or another real server-side feature is required.

Potential structure:
```text
server/
  cmd/
    portfolio-api/
      main.go
  internal/
    http/
      routes.go
      middleware.go
    contact/
      handler.go
      validation.go
    config/
      config.go
  go.mod
  Dockerfile
```

Potential endpoints:
- `GET /healthz` — health check.
- `POST /api/contact` — validated contact form submission, only if an email provider or delivery path is configured.

Backend requirements:
- Read configuration from environment variables.
- Never hardcode secrets.
- Apply request-size limits, input validation, rate limiting, and safe error responses.
- Do not log full message bodies or sensitive personal data.
- Add a timeout for outbound email-provider requests.
- Return clear HTTP status codes.
- Add tests for validation and failure cases.
- Include a local `.env.example` with placeholder names only; never include real secrets.
- Do not store contact messages persistently by default.

### API behavior
`POST /api/contact` input:
```json
{
  "name": "Visitor name",
  "email": "visitor@example.com",
  "message": "A message"
}
```
Validation:
- name required and length-limited.
- email must be syntactically valid.
- message required and length-limited.
- reject oversized requests.
- use a honeypot or equivalent spam mitigation.
- server must only return success after a real delivery mechanism confirms acceptance.
- if no delivery provider is configured, the frontend should use a mailto fallback instead of calling a fake endpoint.

### Content architecture
Keep all personal and project content in central data files. Avoid hardcoding the same project title or date in several components. Use TypeScript types to make content consistent and allow unverified fields to be omitted.

Example types:
```ts
type ProjectStatus = "ongoing" | "completed" | "prototype" | "concept";

type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  status?: ProjectStatus;
  role?: string;
  period?: string;
  stack: string[];
  contributions: string[];
  outcomes?: { label: string; value: string; context?: string }[];
  limitations?: string[];
  featured?: boolean;
  verified: boolean;
  links?: { label: string; href: string }[];
};
```
Do not display the `verified` property to visitors. Use it as a content-quality control.

---

# 18. Security and Privacy

- No API keys, access tokens, or private credentials in client bundles.
- No employer source code, internal repository URLs, customer information, or confidential architecture diagrams.
- No tracking scripts by default.
- If analytics are added, use a privacy-conscious setup and document it.
- No personal phone number displayed by default.
- No date of birth or home address.
- No biometric images or medical data from prototype projects.
- Use safe external link attributes where appropriate.
- Sanitize or safely render user-provided content.
- Contact form must not expose server errors, stack traces, or secrets.
- If a project is a simulation, prototype, or research evaluation, say so explicitly.

---

# 19. Content Data and Link Policy

All external links must be real and verified. Use:
- GitHub profile: `https://github.com/Evil-Dreams`
- LinkedIn profile: `https://www.linkedin.com/in/evil-dreams/`
- Email: `vibishan.anandhan.m@gmail.com`

For projects:
- Add repository links only if the repository is public and intended for sharing.
- Add paper links only if a legitimate public paper or repository URL is available.
- If a paper is not publicly available, omit the link rather than linking to a fabricated document.
- Do not create fake demo URLs.
- For proprietary internship work, use no code link unless public permission exists.
- External links should open in the same tab unless opening a new tab materially helps; if opening a new tab, use safe `rel` attributes.

---

# 20. Suggested Page-Level Content Details

## Work index filters
Filters:
- All
- AI / LLM Systems
- Research
- Backend / Platform
- Computer Vision
- Simulation / Industrial Systems
- Education Technology

Ensure each project is assigned to an accurate category. Filters should work, update results, and expose state accessibly. Include a clear empty state.

## Project detail page template
Each project page should include:
1. Breadcrumb: Home → Work → Project.
2. Project title and concise summary.
3. Status, role, and period when known.
4. Key technology list.
5. Problem / context.
6. Goals.
7. System architecture diagram.
8. Implementation and personal contributions.
9. Evaluation/results, if verified.
10. Limitations and lessons.
11. Links to public code/papers, if available.
12. Related projects.
13. Next/previous project navigation.
14. CTA to contact.

Do not force every project to have all sections. Hide empty sections rather than inserting filler.

## Research page
Order:
1. SENTIO-KAIRO.
2. RLHF for Small Language Models.

Include the Best Paper Presentation Award under SENTIO-KAIRO. Keep project research separate from formal publication status. Include a short research approach paragraph and the benchmark trade-off table for RLHF.

## Resume download
If a verified PDF résumé exists, make it downloadable. Otherwise, do not make a button that points to a missing file. A user can add `public/Vibishan_Anandhan_CV.pdf` later. Do not use the Word document as a PDF without conversion/verification.

---

# 21. Quality Assurance Checklist

Before declaring the work complete, verify each item.

## Visual
- [ ] Overall page uses the final Obsidian Navy palette: #080B10, #06141B, #11212D, #253745, cool white, and restrained #1598D4/#69CDE8 accents.
- [ ] No pink, lavender, or purple palette.
- [ ] No emoji.
- [ ] Hero hierarchy is clear and immediately communicates the user's focus.
- [ ] Projects are visually distinct but consistent.
- [ ] Long-form pages are readable and not too dense.
- [ ] No broken layouts at 360px, 768px, 1024px, and 1440px widths.
- [ ] No horizontal overflow.
- [ ] No generic fake stats or placeholder testimonials.
- [ ] No dead links or nonfunctional controls.

## Content
- [ ] SENTIO-KAIRO appears before RLHF for SLM in research.
- [ ] Best Paper Presentation Award is described accurately.
- [ ] RLHF results show both improvements and regressions.
- [ ] C++ is absent.
- [ ] No standalone Edge AI skill/interests section.
- [ ] No “Research / Protocol Interests” section.
- [ ] School recognition/gold coin is absent.
- [ ] No internal editorial/accuracy notes appear publicly.
- [ ] No claim of paper acceptance/publication without verification.
- [ ] No false claim of hackathon selection or winning.
- [ ] CGPA hidden until current value is verified.
- [ ] No phone number publicly displayed by default.
- [ ] All project status descriptions match actual code/repository evidence.

## Technical
- [ ] TypeScript checks pass.
- [ ] Lint passes.
- [ ] Production build passes.
- [ ] Tests pass or missing tests are clearly reported.
- [ ] Browser console is free of avoidable errors.
- [ ] Mobile menu works with keyboard.
- [ ] All animations respect reduced-motion preferences.
- [ ] Focus states are visible.
- [ ] SEO metadata is set per route.
- [ ] Images/diagrams do not cause layout shift.
- [ ] No secrets in the repository or frontend bundle.
- [ ] Contact form either truly works or uses an honest mailto fallback.

---

# 22. Implementation Plan

Execute in these phases, but continue through all phases in the same task if the environment allows.

### Phase 1 — Repository audit
- Inspect files and dependencies.
- Identify current app structure and how it runs.
- Report existing features briefly in the terminal or final summary.
- Preserve working configuration.

### Phase 2 — Design foundation
- Define color, spacing, typography, radius, border, and motion tokens.
- Set up responsive container and typography.
- Implement global focus and reduced-motion behavior.

### Phase 3 — Shared components and navigation
- Header, mobile menu, footer, buttons, tags, section heading, cards, timeline.
- Ensure keyboard support and responsive behavior.

### Phase 4 — Content registry
- Create typed content for profile, skills, experience, awards, research, and all projects.
- Centralize content so facts can be updated in one place.
- Do not add unverified facts.

### Phase 5 — Home page
- Hero.
- Systems map.
- Selected work.
- Research highlights.
- Technical focus.
- Experience preview.
- About preview.
- Contact CTA.

### Phase 6 — Detail pages
- Work index and filters.
- Reusable project case-study route.
- SENTIO-KAIRO and RLHF case studies with diagrams and verified results.
- Other project pages using only supported content.
- About, experience, research, contact, and not-found routes.

### Phase 7 — Motion and polish
- Add subtle motion and interaction states.
- Test reduced motion.
- Refine spacing, alignment, content rhythm, and mobile layouts.

### Phase 8 — SEO, accessibility, and QA
- Route metadata.
- Keyboard and screen-reader checks.
- Responsive checks.
- Build/test/lint.
- Fix all errors.

### Phase 9 — Delivery
Provide:
- What was implemented.
- Files and architecture overview.
- How to install and run locally.
- Build and test outcomes.
- Deployment instructions based on the actual platform chosen.
- Any details requiring user verification.

---

# 23. Final Command to the Coding Agent

Build the actual portfolio now using the existing repository and this PRD as the source of truth. Do not stop at a plan, do not return only code snippets, and do not ask me to manually create each page. Make reasonable engineering decisions, implement the complete experience, and validate it.

Prioritize in this order:
1. Accurate content and excellent information architecture.
2. Premium dark visual design and typography.
3. Complete responsive UX.
4. Reusable architecture and maintainable code.
5. Subtle, purposeful animation.
6. Accessibility, SEO, performance, and tests.

The final result should feel like a carefully designed portfolio for an AI systems engineer and researcher: calm, precise, technically rich, visually premium, and credible.
