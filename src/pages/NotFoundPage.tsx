import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { Eyebrow } from '../components/ui/Eyebrow'

export function NotFoundPage() {
  usePageMeta('Page not found', 'The requested page could not be found.')
  return (
    <div className="wrap not-found">
      <Eyebrow>404 / NOT FOUND</Eyebrow>
      <h1>This path doesn’t resolve.</h1>
      <p>The page may have moved, or its address may be incorrect.</p>
      <Link className="button button-primary" to="/">
        Return home <span>↗</span>
      </Link>
    </div>
  )
}

