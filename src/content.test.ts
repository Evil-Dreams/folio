import { describe, expect, it } from 'vitest'
import { award, experience, profile, projects, skillGroups } from './content'

describe('portfolio content registry', () => {
  it('contains every required project route exactly once', () => {
    const expected = ['sentio-kairo', 'rlhf-for-slm', 'guider', 'iblis', 'multimodal-reasoning-engine', 'b2b-enterprise-intelligence-engine', 'ai-model-router', 'cnc-digital-twin', 'neonatal-jaundice-monitoring', 'forme', 'education-paper-recommender', 'lung-cancer-prediction', 'facial-recognition-attendance']
    expect(projects.map(project => project.slug)).toEqual(expected)
    expect(new Set(projects.map(project => project.slug)).size).toBe(expected.length)
  })

  it('preserves confirmed identity, contact, education, and recognition details', () => {
    expect(profile.name).toBe('Vibishan Anandhan')
    expect(profile.email).toBe('vibishan.anandhan.m@gmail.com')
    expect(profile.cgpa).toBe(8.0)
    expect(award.title).toBe('Best Paper Presentation Award')
    expect(experience).toHaveLength(3)
  })

  it('keeps the reported RLHF trade-offs and SENTIO testbed caveat', () => {
    const rlhf = projects.find(project => project.slug === 'rlhf-for-slm')!
    expect(rlhf.outcomes).toContainEqual(['Diagnostic accuracy', '90.6% → 87.5%'])
    expect(rlhf.outcomes).toContainEqual(['Latency', '9.20 s → 15.97 s'])
    const sentio = projects.find(project => project.slug === 'sentio-kairo')!
    expect(sentio.limitations?.some(text => text.includes('real-world industrial validation'))).toBe(true)
  })

  it('does not list prohibited skills', () => {
    const allSkills = skillGroups.flatMap(group => [group.title, ...group.items]).join(' ').toLowerCase()
    expect(allSkills).not.toContain('c++')
    expect(allSkills).not.toContain('edge ai')
  })
})
