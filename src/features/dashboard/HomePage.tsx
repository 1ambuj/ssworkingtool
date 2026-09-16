import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LearningPreview, TimesheetPreview } from '@/components/ProductPreview'
import type { CatalogApp } from '@/features/apps/catalog'
import { getAllowedApps, getCatalogApp } from '@/features/apps/catalog'
import { useAuth } from '@/features/auth/AuthContext'
import { buildTimesheetOpenUrl } from '@/lib/timesheet-handoff'

function openUrlFor(app: CatalogApp, token: string | null) {
  if (app.kind === 'desktop') return app.url
  if (app.id === 'psm' && token) return buildTimesheetOpenUrl(token)
  return app.url
}

export function HomePage() {
  const { user, token } = useAuth()
  const firstName = user?.name?.split(' ')[0] ?? 'there'
  const apps = getAllowedApps(user?.allowedApps)
  const timesheet = getCatalogApp('psm')
  const learning = getCatalogApp('learning')
  const live = apps.filter((app) => app.status === 'live')
  const soon = apps.filter((app) => app.status === 'soon')
  const timesheetUrl = timesheet ? openUrlFor(timesheet, token) : null
  const hasLearning = apps.some((a) => a.id === 'learning')

  return (
    <div>
      {/* Hero — first-style welcome */}
      <section className="relative overflow-hidden border-b border-border/60 px-6 py-14 md:px-8 md:py-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand-100/80 blur-3xl" />
          <div className="absolute right-0 top-8 h-80 w-80 rounded-full bg-amber-100/50 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <p className="text-sm font-medium tracking-[0.18em] text-brand-700 uppercase">
            CoreWorkspace
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.08] font-semibold tracking-tight text-ink md:text-5xl">
            Welcome, {firstName}.{' '}
            <span className="brand-shimmer">Explore your firm tools.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            One sign-in for SSA Intersoft, Learning, and everything we add next.
            Start with Timesheet — stay signed in as you move between apps.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {timesheetUrl ? (
              <a
                href={timesheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
              >
                Open SSA Intersoft
                <ArrowUpRight className="h-4 w-4" />
              </a>
            ) : null}
            <a
              href="#tools"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition hover:text-brand-600"
            >
              Browse tools
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Featured Timesheet */}
      {timesheet && live.some((a) => a.id === 'psm') ? (
        <section className="border-b border-border/60 px-6 py-14 md:px-8 md:py-16">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="text-sm font-medium tracking-[0.16em] text-brand-700 uppercase">
                Featured
              </p>
              <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                {timesheet.name}
              </h2>
              <p className="mt-2 text-lg text-brand-700">{timesheet.tagline}</p>
              <p className="mt-4 text-base leading-relaxed text-muted">
                {timesheet.description}
              </p>
              <ul className="mt-6 space-y-3">
                {(timesheet.actions.length ? timesheet.actions : timesheet.details).map(
                  (item) => (
                    <li key={item} className="flex gap-3 text-sm text-ink">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                      {item}
                    </li>
                  ),
                )}
              </ul>
              {timesheetUrl ? (
                <a
                  href={timesheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
                >
                  Launch Timesheet
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : null}
            </div>
            <div className="animate-float-soft">
              <TimesheetPreview />
            </div>
          </div>
        </section>
      ) : null}

      {/* Learning */}
      {learning && hasLearning ? (
        <section className="border-b border-border/60 px-6 py-14 md:px-8 md:py-16">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="order-2 lg:order-1">
              <LearningPreview />
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-sm font-medium tracking-[0.16em] text-brand-700 uppercase">
                Next up
              </p>
              <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                {learning.name}
              </h2>
              <p className="mt-2 text-lg text-brand-700">{learning.tagline}</p>
              <p className="mt-4 text-base leading-relaxed text-muted">
                {learning.description}
              </p>
              <ul className="mt-6 space-y-3">
                {(learning.actions.length ? learning.actions : learning.details).map(
                  (item) => (
                    <li key={item} className="flex gap-3 text-sm text-ink">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                      {item}
                    </li>
                  ),
                )}
              </ul>
              <a
                href={learning.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition hover:text-brand-600"
              >
                Open Learning (LAN)
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      ) : null}

      {/* Tools directory */}
      <section id="tools" className="px-6 py-14 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
                Your tools
              </h2>
              <p className="mt-2 max-w-xl text-base text-muted">
                Live tools open in a new tab. More firm software lands here with
                the same login.
              </p>
            </div>
            <Link
              to="/apps"
              className="text-sm font-semibold text-brand-700 transition hover:text-brand-600"
            >
              Full apps page
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {live.map((app) => {
              const href = openUrlFor(app, token)
              const isInternal = app.kind === 'desktop' || href.startsWith('/')
              const className =
                'group flex items-start justify-between gap-4 rounded-2xl border border-border/80 bg-panel p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md'

              const inner = (
                <>
                  <div>
                    <p className="text-base font-semibold text-ink">{app.name}</p>
                    <p className="mt-1 text-sm text-brand-700">{app.tagline}</p>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                      {app.description}
                    </p>
                  </div>
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted transition group-hover:text-brand-700" />
                </>
              )

              return isInternal ? (
                <Link key={app.id} to={href} className={className}>
                  {inner}
                </Link>
              ) : (
                <a
                  key={app.id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {inner}
                </a>
              )
            })}
          </div>

          {soon.length > 0 ? (
            <div className="mt-14">
              <h3 className="text-sm font-medium tracking-[0.16em] text-muted uppercase">
                Coming later
              </h3>
              <ul className="mt-5 divide-y divide-border/70 border-y border-border/70">
                {soon.map((app) => (
                  <li
                    key={app.id}
                    className="flex flex-wrap items-baseline justify-between gap-2 py-4"
                  >
                    <div>
                      <p className="font-medium text-ink">{app.name}</p>
                      <p className="mt-1 text-sm text-muted">{app.tagline}</p>
                    </div>
                    <span className="text-xs tracking-wide text-muted uppercase">
                      Soon
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  )
}
