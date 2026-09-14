import { AppCard } from '@/features/apps/AppCard'
import { getAllowedApps } from '@/features/apps/catalog'
import { useAuth } from '@/features/auth/AuthContext'

export function AppsPage() {
  const { user } = useAuth()
  const apps = getAllowedApps(user?.allowedApps)
  const live = apps.filter((app) => app.status === 'live')
  const soon = apps.filter((app) => app.status === 'soon')

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-6 py-10 md:px-8">
      <header>
        <p className="text-sm font-medium tracking-[0.16em] text-brand-700 uppercase">
          Directory
        </p>
        <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          All tools
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted">
          Open a live tool in a new tab. Coming-soon apps will use the same
          single sign-on once they are ready.
        </p>
      </header>

      {live.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-panel/70 p-10 text-center">
          <p className="text-sm font-medium text-ink">No apps assigned</p>
          <p className="mt-1 text-sm text-muted">
            Ask an admin to grant software access.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {live.map((app) => (
            <AppCard key={app.id} {...app} />
          ))}
        </div>
      )}

      {soon.length > 0 ? (
        <section>
          <h2 className="text-sm font-medium tracking-[0.16em] text-muted uppercase">
            Coming later
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {soon.map((app) => (
              <AppCard key={app.id} {...app} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
