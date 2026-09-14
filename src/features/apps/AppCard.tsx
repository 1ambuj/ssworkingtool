import { ArrowUpRight } from 'lucide-react'
import { buildTimesheetOpenUrl } from '@/lib/timesheet-handoff'
import { useAuth } from '@/features/auth/AuthContext'
import type { CatalogApp } from '@/features/apps/catalog'

export function AppCard({ id, name, tagline, description, url, status }: CatalogApp) {
  const { token } = useAuth()
  const isReady = status === 'live' && url !== '#'

  const openUrl =
    id === 'psm' && token ? buildTimesheetOpenUrl(token) : url

  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-ink">{name}</h3>
        {!isReady ? (
          <span className="text-[11px] font-medium text-muted uppercase">
            Soon
          </span>
        ) : (
          <ArrowUpRight className="h-4 w-4 text-muted opacity-0 transition group-hover:opacity-100" />
        )}
      </div>
      <p className="mt-1 text-sm font-medium text-brand-700">{tagline}</p>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
        {description}
      </p>
      <p className="mt-4 text-sm font-semibold text-brand-700">
        {isReady ? 'Open' : 'Not available yet'}
      </p>
    </>
  )

  const className =
    'group flex h-full flex-col rounded-lg border border-border bg-panel p-5 transition hover:border-brand-500/50'

  if (!isReady) {
    return <article className={`${className} opacity-75`}>{content}</article>
  }

  return (
    <a
      href={openUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {content}
    </a>
  )
}
