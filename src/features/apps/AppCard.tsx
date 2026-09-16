import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { buildTimesheetOpenUrl } from '@/lib/timesheet-handoff'
import { useAuth } from '@/features/auth/AuthContext'
import type { CatalogApp } from '@/features/apps/catalog'

function hrefFor(app: CatalogApp, token: string | null) {
  if (app.kind === 'desktop') return app.url
  if (app.id === 'psm' && token) return buildTimesheetOpenUrl(token)
  return app.url
}

export function AppCard(props: CatalogApp) {
  const { name, tagline, description, status, kind } = props
  const { token } = useAuth()
  const isReady = status === 'live' && props.url !== '#'
  const target = hrefFor(props, token)
  const isInternal = kind === 'desktop' || target.startsWith('/')

  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-sm font-semibold text-brand-700 ring-1 ring-brand-100">
          {name.charAt(0)}
        </div>
        {!isReady ? (
          <span className="text-[11px] font-medium tracking-wide text-muted uppercase">
            Soon
          </span>
        ) : (
          <ArrowUpRight className="h-4 w-4 text-muted opacity-0 transition group-hover:opacity-100" />
        )}
      </div>

      <h3 className="mt-4 text-base font-semibold text-ink">{name}</h3>
      <p className="mt-1 text-sm font-medium text-brand-700">{tagline}</p>
      <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
        {description}
      </p>

      <p className="mt-5 text-sm font-medium text-brand-600">
        {isReady
          ? kind === 'desktop'
            ? 'Download & install'
            : 'Open tool'
          : 'Coming soon'}
      </p>
    </>
  )

  const className =
    'group flex h-full flex-col rounded-2xl border border-border/80 bg-panel p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-brand-100 hover:shadow-md'

  if (!isReady) {
    return <article className={`${className} opacity-80`}>{content}</article>
  }

  if (isInternal) {
    return (
      <Link to={target} className={className}>
        {content}
      </Link>
    )
  }

  return (
    <a
      href={target}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {content}
    </a>
  )
}
