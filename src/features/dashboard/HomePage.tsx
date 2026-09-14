import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { CatalogApp } from '@/features/apps/catalog'
import { getAllowedApps } from '@/features/apps/catalog'
import { useAuth } from '@/features/auth/AuthContext'
import { buildTimesheetOpenUrl } from '@/lib/timesheet-handoff'

function openUrlFor(app: CatalogApp, token: string | null) {
  if (app.id === 'psm' && token) return buildTimesheetOpenUrl(token)
  return app.url
}

export function HomePage() {
  const { user, token } = useAuth()
  const firstName = user?.name?.split(' ')[0] ?? 'there'
  const apps = getAllowedApps(user?.allowedApps)
  const live = apps.filter((app) => app.status === 'live')
  const soon = apps.filter((app) => app.status === 'soon')
  const primary = live.find((app) => app.id === 'psm') ?? live[0]
  const primaryUrl = primary ? openUrlFor(primary, token) : null

  return (
    <div className="mx-auto max-w-5xl px-5 py-8 md:px-6 md:py-10">
      {/* Compact header block */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-semibold tracking-tight text-ink md:text-[1.75rem]">
            Good to see you, {firstName}
          </h1>
          <p className="mt-1.5 text-sm text-muted">
            Signed in once for all firm tools
            <span className="mx-1.5 text-border">·</span>
            <span className="capitalize text-ink">{user?.role}</span>
            {user?.department && user.department !== '—' ? (
              <>
                <span className="mx-1.5 text-border">·</span>
                {user.department}
              </>
            ) : null}
          </p>
        </div>

        {primaryUrl ? (
          <a
            href={primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Open {primary?.name}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        ) : null}
      </div>

      {/* Live tools */}
      <section className="pt-7">
        <div className="mb-4 flex items-baseline justify-between gap-3">
          <h2 className="text-sm font-semibold tracking-wide text-ink uppercase">
            Your tools
          </h2>
          <Link
            to="/apps"
            className="text-sm font-medium text-brand-700 transition hover:text-brand-600"
          >
            View all
          </Link>
        </div>

        {live.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-panel px-4 py-8 text-center text-sm text-muted">
            No tools assigned to your account yet.
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-border bg-panel">
            {live.map((app, index) => (
              <ToolRow
                key={app.id}
                app={app}
                href={openUrlFor(app, token)}
                isLast={index === live.length - 1}
              />
            ))}
          </div>
        )}
      </section>

      {/* Coming soon — quiet */}
      {soon.length > 0 ? (
        <section className="pt-10">
          <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">
            Coming soon
          </h2>
          <ul className="mt-3 divide-y divide-border border-y border-border">
            {soon.map((app) => (
              <li
                key={app.id}
                className="flex items-center justify-between gap-3 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-ink">{app.name}</p>
                  <p className="mt-0.5 text-sm text-muted">{app.tagline}</p>
                </div>
                <span className="shrink-0 text-xs text-muted">Soon</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <p className="mt-10 text-xs text-muted">
        One login opens SSA Intersoft with SSO. Learning runs on the firm LAN.
        Documents and PDF tools will join this portal later.
      </p>
    </div>
  )
}

function ToolRow({
  app,
  href,
  isLast,
}: {
  app: CatalogApp
  href: string
  isLast: boolean
}) {
  return (
    <div
      className={[
        'flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between',
        !isLast ? 'border-b border-border' : '',
      ].join(' ')}
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <h3 className="text-base font-semibold text-ink">{app.name}</h3>
          {app.accessNote ? (
            <span className="rounded bg-brand-50 px-1.5 py-0.5 text-[11px] font-medium text-brand-700">
              {app.accessNote}
            </span>
          ) : null}
        </div>
        <p className="mt-1 text-sm text-muted">{app.description}</p>
        {app.actions.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
            {app.actions.map((action) => (
              <li key={action} className="text-xs text-ink/80">
                <span className="mr-1 text-brand-600">·</span>
                {action}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full shrink-0 items-center justify-center gap-1.5 rounded-md border border-border bg-panel px-3.5 py-2 text-sm font-semibold text-ink transition hover:border-brand-500 hover:bg-brand-50 hover:text-brand-700 sm:w-auto"
      >
        Open
        <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
    </div>
  )
}
