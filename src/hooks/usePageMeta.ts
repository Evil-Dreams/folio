import { useEffect } from 'react'
import { profile } from '../content'

export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = `${title} — ${profile.name}`
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.append(meta)
    }
    meta.content = description

    let og = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
    if (!og) {
      og = document.createElement('meta')
      og.setAttribute('property', 'og:title')
      document.head.append(og)
    }
    og.content = document.title

    let ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]')
    if (!ogDescription) {
      ogDescription = document.createElement('meta')
      ogDescription.setAttribute('property', 'og:description')
      document.head.append(ogDescription)
    }
    ogDescription.content = description

    const base = import.meta.env.VITE_SITE_URL?.trim().replace(/\/$/, '')
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (base) {
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.rel = 'canonical'
        document.head.append(canonical)
      }
      canonical.href = new URL(window.location.pathname, base).href
    } else {
      canonical?.remove()
    }
  }, [title, description])
}

