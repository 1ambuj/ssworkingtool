import type { ReactNode } from 'react'
import { ArrowUpRight, BookOpen, Clock3, ShieldCheck } from 'lucide-react'
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
    <div className="pb-16">
      {/* Useful launcher hero — one job: start work */}
      <section className="relative overflow-hidden border-b border-border/60 px-6 py-10 md:px-8 md:py-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-brand-100/60 blur-3xl" />
          <div className="absolute right-10 top-8 h-56 w-56 rounded-full bg-amber-100/35 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <p className="text-sm font-medium tracking-[0.16em] text-brand-700 uppercase">
            CoreWorkspace
          </p>
          <h1 className="font-display mt-3 max-w-3xl text-3xl leading-tight font-semibold tracking-tight text-ink md:text-4xl">
            Hi {firstName} — pick a tool and get to work.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            You are signed in once. Open any live tool below without signing in
            again. Your role:{' '}
            <span className="font-medium capitalize text-ink">{user?.role}</span>
            {user?.department ? (
              <>
                {' '}
                · <span className="text-ink">{user.department}</span>
              </>
            ) : null}
          </p>

          {primaryUrl ? (
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={primaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
              >
                Continue in {primary?.name}
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#live-tools"
                className="text-sm font-semibold text-brand-700 transition hover:text-brand-600"
              >
                See all live tools
              </a>
            </div>
          ) : null}
        </div>
      </section>

      {/* Why this portal is useful — short, concrete */}
      <section className="border-b border-border/60 px-6 py-8 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          <ValuePoint
            icon={<ShieldCheck className="h-4 w-4" />}
            title="One login"
            text="Same SSA Intersoft account opens every connected firm tool."
          />
          <ValuePoint
            icon={<Clock3 className="h-4 w-4" />}
            title="Faster start"
            text="Jump straight into Timesheet or Learning — no second password."
          />
          <ValuePoint
            icon={<BookOpen className="h-4 w-4" />}
            title="Clear purpose"
            text="Each tool shows what you can do today, not just a product name."
          />
        </div>
      </section>

      {/* Live tools — the useful part */}
      <section id="live-tools" className="px-6 py-12 md:px-8 md:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                Ready to use
              </h2>
              <p className="mt-2 text-sm text-muted md:text-base">
                Open a tool to do real work. These are live for your account.
              </p>
            </div>
            <Link
              to="/apps"
              className="text-sm font-semibold text-brand-700 hover:text-brand-600"
            >
              Apps directory
            </Link>
          </div>

          {live.length === 0 ? (
            <p className="mt-8 text-sm text-muted">No live tools assigned yet.</p>
          ) : (
            <div className="mt-8 space-y-5">
              {live.map((app, index) => (
                <LiveToolPanel
                  key={app.id}
                  app={app}
                  href={openUrlFor(app, token)}
                  featured={index === 0}
                />
              ))}
            </div>
          )}

          {soon.length > 0 ? (
            <div className="mt-14">
              <h3 className="text-sm font-medium tracking-[0.14em] text-muted uppercase">
                Coming to the portal
              </h3>
              <p className="mt-2 max-w-2xl text-sm text-muted">
                Same single sign-on when these go live — including Documents / PDF
                merge later.
              </p>
              <ul className="mt-5 divide-y divide-border/70 border-y border-border/70">
                {soon.map((app) => (
                  <li
                    key={app.id}
                    className="flex flex-wrap items-baseline justify-between gap-2 py-3.5"
                  >
                    <div>
                      <p className="text-sm font-medium text-ink">{app.name}</p>
                      <p className="mt-0.5 text-sm text-muted">{app.description}</p>
                    </div>
                    <span className="text-[11px] tracking-wide text-muted uppercase">
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

function ValuePoint({
  icon,
  title,
  text,
}: {
  icon: ReactNode
  title: string
  text: string
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-ink">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
      </div>
    </div>
  )
}

function LiveToolPanel({
  app,
  href,
  featured,
}: {
  app: CatalogApp
  href: string
  featured?: boolean
}) {
  return (
    <article
      className={[
        'rounded-2xl border bg-panel/95 p-6 transition md:p-7',
        featured
          ? 'border-brand-200 shadow-sm'
          : 'border-border/70 hover:border-brand-200',
      ].join(' ')}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
              {app.name}
            </h3>
            {app.accessNote ? (
              <span className="text-xs font-medium text-brand-700">
                {app.accessNote}
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-sm font-medium text-brand-700">{app.tagline}</p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            {app.description}
          </p>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Open
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      {app.actions.length > 0 ? (
        <div className="mt-6 border-t border-border/60 pt-5">
          <p className="text-xs font-medium tracking-[0.14em] text-muted uppercase">
            What you can do here
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-3">
            {app.actions.map((action) => (
              <li
                key={action}
                className="text-sm leading-snug text-ink before:mr-2 before:text-brand-600 before:content-['→']"
              >
                {action}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  )
}
