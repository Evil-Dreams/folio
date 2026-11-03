import { mkdir, writeFile } from 'node:fs/promises'

const base = (process.env.VITE_SITE_URL || process.env.RENDER_EXTERNAL_URL)?.trim().replace(/\/$/, '')
if (!base) {
  console.info('VITE_SITE_URL is not set; skipping sitemap generation.')
  process.exit(0)
}

const routes = [
  '/', '/work', '/work/sentio-kairo', '/work/rlhf-for-slm', '/work/guider', '/work/iblis',
  '/work/multimodal-reasoning-engine', '/work/b2b-enterprise-intelligence-engine', '/work/ai-model-router',
  '/work/cnc-digital-twin', '/work/neonatal-jaundice-monitoring', '/work/forme',
  '/work/education-paper-recommender', '/work/lung-cancer-prediction', '/work/facial-recognition-attendance',
  '/experience', '/research', '/about', '/contact',
]
const urls = routes.map(route => `  <url><loc>${base}${route}</loc></url>`).join('\n')
await mkdir('dist', { recursive: true })
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`)
console.info(`Generated sitemap for ${routes.length} routes at ${base}.`)
