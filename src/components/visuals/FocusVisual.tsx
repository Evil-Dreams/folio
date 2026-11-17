const images: Record<string, [string, string]> = {
  slm: ['/images/focus-slm-cubes.webp', 'Cluster of translucent blue cubes representing small language models'],
  alignment: ['/images/focus-alignment-loop.webp', 'Interwoven glass loop representing model alignment'],
  retrieval: ['/images/focus-retrieval-layers.webp', 'Stacked blue glass layers representing retrieval systems'],
  industrial: ['/images/focus-edge-chip.webp', 'Blue illuminated edge AI processor'],
}

export function FocusVisual({ kind }: { kind: string }) {
  const [src, alt] = images[kind] || ['/images/focus-slm-cubes.webp', 'Research focus visual']
  return (
    <div className={`focus-visual focus-visual-${kind}`}>
      <img src={src} alt={alt} loading="lazy" />
    </div>
  )
}

