import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { EpdfBookPreview, LearningPreview, TimesheetPreview } from '@/components/ProductPreview'
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
  const epdfBook = getCatalogApp('epdf-book')
  const live = apps.filter((app) => app.status === 'live')
  const timesheetUrl = timesheet ? openUrlFor(timesheet, token) : null
  const hasLearning = apps.some((a) => a.id === 'learning')
  const hasEpdf = apps.some((a) => a.id === 'epdf-book')

  return (
    <div>
      <section className="relative overflow-hidden px-6 py-20 md:px-8 md:py-28 lg:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-blob absolute -left-24 top-0 h-80 w-80 rounded-full bg-[#f37920]/30 blur-3xl" />
          <div className="animate-blob-slow absolute right-0 top-10 h-96 w-96 rounded-full bg-sky-300/40 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <p className="animate-fade-up text-sm font-medium tracking-[0.22em] text-[#f37920] uppercase md:text-base">
            Sandeep Singla &amp; Associates
          </p>
          <h1 className="animate-fade-up-delay font-display mt-5 max-w-4xl text-[43px] leading-[1.1] font-bold tracking-tight text-ink">
            Welcome, {firstName}. This is SS Workspace.
          </h1>
          <p className="animate-fade-up-delay-2 mt-6 max-w-2xl text-base leading-[1.7] text-muted">
            Built by the firm for internal office use. One sign-in for SSA
            Intersoft and Learning. Desktop installers live under Tools.
          </p>
          <div className="animate-fade-up-delay-3 mt-10 flex flex-wrap items-center gap-4">
            {timesheetUrl ? (
              <a
                href={timesheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-lift inline-flex items-center gap-2 rounded-xl bg-[#f37920] px-6 py-3.5 text-base font-semibold text-white shadow-[0_12px_30px_-12px_rgba(243,121,32,0.8)] transition hover:bg-[#e06812]"
              >
                Open SSA Intersoft
                <ArrowUpRight className="h-5 w-5" />
              </a>
            ) : null}
            <Link
              to="/tools"
              className="inline-flex items-center gap-2 rounded-xl border border-sky-300 bg-sky-50 px-5 py-3.5 text-base font-semibold text-sky-800 transition hover:bg-sky-100"
            >
              Browse tools
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {timesheet && live.some((a) => a.id === 'psm') ? (
        <section className="px-6 pb-8 md:px-8">
          <div className="mx-auto grid max-w-6xl gap-12 rounded-[2rem] border border-[#f37920]/20 bg-white px-6 py-12 shadow-[0_24px_50px_-28px_rgba(243,121,32,0.45)] md:px-10 md:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
            <div className="animate-soft-rise">
              <p className="text-sm font-medium tracking-[0.16em] text-brand-700 uppercase md:text-base">
                Featured
              </p>
              <h2 className="font-display mt-4 text-[30px] leading-[1.2] font-bold tracking-tight text-ink">
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
                  className="hover-lift mt-10 inline-flex items-center gap-2 rounded-xl bg-[#f37920] px-6 py-3.5 text-base font-semibold text-white transition hover:bg-[#e06812]"
                >
                  Launch Timesheet
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              ) : null}
            </div>
            <div className="animate-fade-up-delay">
              <div className="animate-float-soft">
                <TimesheetPreview />
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {epdfBook && hasEpdf ? (
        <section className="px-6 py-8 md:px-8 md:py-10">
          <div className="mx-auto grid max-w-6xl gap-12 rounded-[2rem] border border-sky-200 bg-sky-50 px-6 py-12 shadow-[0_24px_50px_-28px_rgba(14,165,233,0.4)] md:px-10 md:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
            <div className="animate-soft-rise">
              <p className="text-sm font-medium tracking-[0.16em] text-sky-700 uppercase md:text-base">
                Create
              </p>
              <h2 className="font-display mt-4 text-[30px] leading-[1.2] font-bold tracking-tight text-ink">
                {epdfBook.name}
              </h2>
              <p className="mt-3 text-xl text-sky-700">{epdfBook.tagline}</p>
              <p className="mt-5 text-base leading-[1.7] text-muted">
                {epdfBook.description}
              </p>
              <ul className="mt-8 space-y-4">
                {(epdfBook.actions.length
                  ? epdfBook.actions
                  : epdfBook.details
                ).map((item) => (
                  <li key={item} className="flex gap-3 text-base text-ink">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={epdfBook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-lift mt-10 inline-flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-sky-700"
              >
                Open ePDF book
                <ArrowUpRight className="h-5 w-5" />
              </a>
            </div>
            <div className="animate-fade-up-delay">
              <a
                href={epdfBook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                aria-label={`Open ${epdfBook.name}`}
              >
                <div className="animate-float-soft">
                  <EpdfBookPreview />
                </div>
              </a>
            </div>
          </div>
        </section>
      ) : null}

      {learning && hasLearning ? (
        <section className="px-6 py-8 md:px-8 md:py-10">
          <div className="mx-auto grid max-w-6xl gap-12 rounded-[2rem] border border-emerald-200 bg-emerald-50 px-6 py-12 shadow-[0_24px_50px_-28px_rgba(16,120,80,0.35)] md:px-10 md:py-16 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:gap-16">
            <div className="animate-fade-up-delay order-2 lg:order-1 lg:pr-2">
              <LearningPreview />
            </div>
            <div className="animate-soft-rise order-1 lg:order-2 lg:pl-2">
              <p className="text-sm font-medium tracking-[0.16em] text-emerald-700 uppercase md:text-base">
                Next up
              </p>
              <h2 className="font-display mt-4 text-[30px] leading-[1.2] font-bold tracking-tight text-ink">
                {learning.name}
              </h2>
              <p className="mt-3 text-xl text-emerald-700">{learning.tagline}</p>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                {learning.description}
              </p>
              <ul className="mt-8 space-y-4">
                {(learning.actions.length
                  ? learning.actions
                  : learning.details
                ).map((item) => (
                  <li key={item} className="flex gap-3 text-base text-ink">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={learning.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-lift mt-10 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-emerald-700"
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
