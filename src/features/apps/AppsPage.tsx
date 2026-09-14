import { AppCard } from '@/features/apps/AppCard'
import { getAllowedApps } from '@/features/apps/catalog'
import { useAuth } from '@/features/auth/AuthContext'

export function AppsPage() {
  const { user } = useAuth()
  const apps = getAllowedApps(user?.allowedApps)

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-ink">Apps</h1>
        <p className="mt-2 max-w-xl text-sm text-muted md:text-base">
          Everything assigned to you. Click a card to open it.
        </p>
      </header>

      {apps.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-panel/70 p-10 text-center">
          <p className="text-sm font-medium text-ink">No apps assigned</p>
          <p className="mt-1 text-sm text-muted">
            Ask an admin to grant software access.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => (
            <AppCard key={app.id} {...app} />
          ))}
        </div>
      )}
    </div>
  )
}
