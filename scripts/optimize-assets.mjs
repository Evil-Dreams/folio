import { mkdir, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const source = path.resolve('src/assets/generated')
const destination = path.resolve('public/images')

try {
  await mkdir(destination, { recursive: true })
  const files = (await readdir(source)).filter(file => file.endsWith('.png'))
  for (const file of files) {
    const srcPath = path.join(source, file)
    const name = `${path.parse(file).name}.webp`
    const destPath = path.join(destination, name)

    try {
      const [srcStat, destStat] = await Promise.all([stat(srcPath), stat(destPath)])
      if (destStat.mtimeMs >= srcStat.mtimeMs) {
        continue // Binary already up-to-date
      }
    } catch {
      // Destination does not exist; proceed to encode
    }

    const input = sharp(srcPath)
    const { hasAlpha } = await input.metadata()
    await input
      .resize({ width: 1800, withoutEnlargement: true })
      .webp({ quality: 82, effort: 5, alphaQuality: 90 })
      .toFile(destPath)
    console.info(`Optimized ${file} -> public/images/${name} (alpha: ${Boolean(hasAlpha)})`)
  }
} catch (error) {
  if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
    console.warn('Source asset directory not found, skipping optimization.')
  } else {
    throw error
  }
}
