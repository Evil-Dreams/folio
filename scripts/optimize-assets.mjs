import { mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const source = path.resolve('src/assets/generated')
const destination = path.resolve('public/images')
await mkdir(destination, { recursive: true })

const files = (await readdir(source)).filter(file => file.endsWith('.png'))
for (const file of files) {
  const name = `${path.parse(file).name}.webp`
  const input = sharp(path.join(source, file))
  const { hasAlpha } = await input.metadata()
  await input
    .resize({ width: 1800, withoutEnlargement: true })
    .webp({ quality: 82, effort: 5, alphaQuality: 90 })
    .toFile(path.join(destination, name))
  console.info(`Optimized ${file} -> public/images/${name} (alpha: ${Boolean(hasAlpha)})`)
}
