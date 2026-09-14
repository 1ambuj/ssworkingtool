import { Link } from 'react-router-dom'
import { AppCard } from '@/features/apps/AppCard'
import { getAllowedApps } from '@/features/apps/catalog'
import { useAuth } from '@/features/auth/AuthContext'

export function HomePage() {
  const { user } = useAuth()
  const allApps = getAllowedApps(user?.allowedApps)
  const apps = allApps.slice(0, 3)
  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-panel p-7 shadow-sm md:p-9">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-100/70 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 left-20 h-36 w-36 rounded-full bg-amber-100/50 blur-2xl" />

        <p className="text-xs font-medium tracking-wide text-muted uppercase">
          {today}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          Hello, {user?.name?.split(' ')[0]}
        </h1>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted md:text-base">
          One place for every firm tool. Open what you need — access follows your
          SSA Intersoft permissions.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
            {allApps.length} apps available
          </span>
          <span className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-muted">
            {user?.department}
          </span>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-ink">Quick launch</h2>
            <p className="mt-0.5 text-sm text-muted">Your most used tools</p>
          </div>
          <Link
            to="/apps"
            className="text-sm font-medium text-brand-600 transition hover:text-brand-700"
          >
            View all
          </Link>
        </div>

        {apps.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-panel/70 p-8 text-center">
            <p className="text-sm text-muted">No apps assigned yet.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((app) => (
              <AppCard key={app.id} {...app} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
