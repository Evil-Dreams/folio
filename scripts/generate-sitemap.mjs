import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const base = (process.env.VITE_SITE_URL || process.env.RENDER_EXTERNAL_URL)?.trim().replace(/\/$/, '')
if (!base) {
  console.info('VITE_SITE_URL is not set; skipping sitemap generation.')
  process.exit(0)
}

const contentPath = path.resolve('src/content.ts')
const content = await readFile(contentPath, 'utf8')
const projectSlugs = [...content.matchAll(/slug:\s*'([^']+)'/g)].map(match => match[1])

if (!projectSlugs.length) {
  throw new Error('No project slugs found in src/content.ts')
}

const staticRoutes = ['/', '/work', '/experience', '/research', '/about', '/contact']
const dynamicRoutes = projectSlugs.map(slug => `/work/${slug}`)
const routes = [...staticRoutes.slice(0, 2), ...dynamicRoutes, ...staticRoutes.slice(2)]

const urls = routes.map(route => `  <url><loc>${base}${route}</loc></url>`).join('\n')
await mkdir('dist', { recursive: true })
await writeFile(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
)
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`)
console.info(`Generated sitemap for ${routes.length} routes (${projectSlugs.length} projects) at ${base}.`)
