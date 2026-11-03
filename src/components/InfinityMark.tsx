type InfinityMarkProps = { className?: string }

export function InfinityMark({ className = '' }: InfinityMarkProps) {
  return <svg className={`infinity-mark ${className}`} viewBox="0 0 72 44" aria-hidden="true" focusable="false">
    <path className="infinity-halo" d="M5 22C5 9 20 6 29 18l7 9c9 12 24 9 31-1 7-11-2-21-12-20-8 0-13 6-19 15l-8 10C17 45 5 34 5 22Z" />
    <path className="infinity-trace" pathLength="1" d="M5 22C5 9 20 6 29 18l7 9c9 12 24 9 31-1 7-11-2-21-12-20-8 0-13 6-19 15l-8 10C17 45 5 34 5 22Z" />
    <circle className="infinity-signal" cx="36" cy="22" r="2.3" />
  </svg>
}
