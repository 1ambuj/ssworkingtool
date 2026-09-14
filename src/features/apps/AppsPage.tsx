import { AppCard } from '@/features/apps/AppCard'
import { getAllowedApps } from '@/features/apps/catalog'
import { useAuth } from '@/features/auth/AuthContext'

export function AppsPage() {
  const { user } = useAuth()
  const apps = getAllowedApps(user?.allowedApps)
  const live = apps.filter((app) => app.status === 'live')
  const soon = apps.filter((app) => app.status === 'soon')

  return (
    <div className="mx-auto max-w-5xl px-5 py-8 md:px-6 md:py-10">
      <header className="border-b border-border pb-6">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">
          Apps
        </h1>
        <p className="mt-1.5 text-sm text-muted">
          Tools assigned to your account. Live apps open in a new tab.
        </p>
      </header>

      <section className="pt-7">
        <h2 className="mb-3 text-sm font-semibold tracking-wide text-ink uppercase">
          Live
        </h2>
        {live.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-panel px-4 py-8 text-center text-sm text-muted">
            No live apps assigned.
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {live.map((app) => (
              <AppCard key={app.id} {...app} />
            ))}
          </div>
        )}
      </section>

      {soon.length > 0 ? (
        <section className="pt-10">
          <h2 className="mb-3 text-sm font-semibold tracking-wide text-muted uppercase">
            Coming soon
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {soon.map((app) => (
              <AppCard key={app.id} {...app} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
