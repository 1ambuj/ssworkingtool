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
  const timesheetUrl = timesheet ? openUrlFor(timesheet, token) : null
  const hasLearning = apps.some((a) => a.id === 'learning')

  return (
    <div>
      <section className="relative overflow-hidden px-6 py-20 md:px-8 md:py-28 lg:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand-100/80 blur-3xl" />
          <div className="absolute right-0 top-8 h-80 w-80 rounded-full bg-amber-100/50 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <p className="text-sm font-medium tracking-[0.18em] text-brand-700 uppercase md:text-base">
            CoreWorkspace
          </p>
          <h1 className="font-display mt-5 max-w-4xl text-5xl leading-[1.05] font-semibold tracking-tight text-ink md:text-6xl lg:text-[4.25rem]">
            Welcome, {firstName}. Explore your firm tools.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
            One sign-in for SSA Intersoft and Learning. Desktop installers live
            under Tools.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            {timesheetUrl ? (
              <a
                href={timesheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-brand-700"
              >
                Open SSA Intersoft
                <ArrowUpRight className="h-5 w-5" />
              </a>
            ) : null}
            <Link
              to="/tools"
              className="inline-flex items-center gap-2 text-base font-semibold text-brand-700 transition hover:text-brand-600"
            >
              Browse tools
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {timesheet && live.some((a) => a.id === 'psm') ? (
        <section className="px-6 py-20 md:px-8 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
            <div>
              <p className="text-sm font-medium tracking-[0.16em] text-brand-700 uppercase md:text-base">
                Featured
              </p>
              <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                {timesheet.name}
              </h2>
              <p className="mt-3 text-xl text-brand-700">{timesheet.tagline}</p>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                {timesheet.description}
              </p>
              <ul className="mt-8 space-y-4">
                {(timesheet.actions.length
                  ? timesheet.actions
                  : timesheet.details
                ).map((item) => (
                  <li key={item} className="flex gap-3 text-base text-ink">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                    {item}
                  </li>
                ))}
              </ul>
              {timesheetUrl ? (
                <a
                  href={timesheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-10 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-brand-700"
                >
                  Launch Timesheet
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              ) : null}
            </div>
            <div className="animate-float-soft">
              <TimesheetPreview />
            </div>
          </div>
        </section>
      ) : null}

      {learning && hasLearning ? (
        <section className="px-6 py-20 md:px-8 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:gap-16">
            <div className="order-2 lg:order-1 lg:pr-2">
              <LearningPreview />
            </div>
            <div className="order-1 lg:order-2 lg:pl-2">
              <p className="text-sm font-medium tracking-[0.16em] text-brand-700 uppercase md:text-base">
                Next up
              </p>
              <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                {learning.name}
              </h2>
              <p className="mt-3 text-xl text-brand-700">{learning.tagline}</p>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                {learning.description}
              </p>
              <ul className="mt-8 space-y-4">
                {(learning.actions.length
                  ? learning.actions
                  : learning.details
                ).map((item) => (
                  <li key={item} className="flex gap-3 text-base text-ink">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={learning.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-2 text-base font-semibold text-brand-700 transition hover:text-brand-600"
              >
                Open Learning (LAN)
                <ArrowUpRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  )
}
