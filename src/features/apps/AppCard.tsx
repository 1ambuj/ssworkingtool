import { ArrowUpRight, Globe, Monitor } from 'lucide-react'
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
  const { name, tagline, description, status, kind, accessNote, actions } =
    props
  const { token } = useAuth()
  const isReady = status === 'live' && props.url !== '#'
  const target = hrefFor(props, token)
  const isInternal = kind === 'desktop' || target.startsWith('/')

  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-base font-bold text-white shadow-sm">
          {name.charAt(0)}
        </div>
        <span
          className={[
            'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium',
            kind === 'desktop'
              ? 'bg-surface text-muted'
              : 'bg-brand-50 text-brand-700',
          ].join(' ')}
        >
          {kind === 'desktop' ? (
            <Monitor className="h-3 w-3" />
          ) : (
            <Globe className="h-3 w-3" />
          )}
          {kind === 'desktop' ? 'Desktop' : 'Web app'}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-semibold text-ink">{name}</h3>
      <p className="mt-0.5 text-sm font-medium text-brand-700">{tagline}</p>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
        {description}
      </p>

      {actions.length > 0 ? (
        <ul className="mt-4 space-y-1.5 border-t border-border/60 pt-4">
          {actions.slice(0, 3).map((item) => (
            <li key={item} className="text-xs text-muted">
              · {item}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-5 flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-brand-600">
          {kind === 'desktop' ? 'Choose Windows or Mac' : 'Open'}
        </p>
        {isReady ? (
          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition group-hover:text-brand-700" />
        ) : null}
      </div>

      {accessNote ? (
        <p className="mt-1 text-[11px] text-muted">{accessNote}</p>
      ) : null}
    </>
  )

  const className =
    'group flex h-full flex-col rounded-2xl border border-border/80 bg-panel p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md'

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
