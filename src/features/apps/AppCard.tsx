import { ArrowUpRight } from 'lucide-react'
import { buildTimesheetOpenUrl } from '@/lib/timesheet-handoff'
import { useAuth } from '@/features/auth/AuthContext'
import type { CatalogApp } from '@/features/apps/catalog'

export function AppCard({ id, name, description, url }: CatalogApp) {
  const { token } = useAuth()
  const isReady = url !== '#'

  const openUrl =
    id === 'psm' && token ? buildTimesheetOpenUrl(token) : url

  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-sm font-semibold text-brand-700 ring-1 ring-brand-100">
          {name.charAt(0)}
        </div>
        {!isReady ? (
          <span className="rounded-full bg-surface px-2.5 py-1 text-[11px] font-medium text-muted">
            Soon
          </span>
        ) : (
          <ArrowUpRight className="h-4 w-4 text-muted opacity-0 transition group-hover:opacity-100" />
        )}
      </div>

      <h3 className="mt-4 text-base font-semibold text-ink">{name}</h3>
      <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
        {description}
      </p>

      <p className="mt-5 text-sm font-medium text-brand-600">
        {isReady ? 'Open app' : 'Coming soon'}
      </p>
    </>
  )

  const className =
    'group flex h-full flex-col rounded-2xl border border-border/80 bg-panel p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-brand-100 hover:shadow-md'

  if (!isReady) {
    return <article className={`${className} opacity-80`}>{content}</article>
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
