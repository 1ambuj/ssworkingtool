import { AppCard } from '@/features/apps/AppCard'
import { getAllowedApps } from '@/features/apps/catalog'
import { useAuth } from '@/features/auth/AuthContext'

export function HomePage() {
  const { user } = useAuth()
  const firstName = user?.name?.split(' ')[0] ?? 'there'
  const live = getAllowedApps(user?.allowedApps).filter((app) => app.status === 'live')

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border/60 px-6 py-12 md:px-8 md:py-14">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand-100/80 blur-3xl" />
          <div className="absolute right-0 top-8 h-80 w-80 rounded-full bg-amber-100/50 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <p className="text-sm font-medium tracking-[0.18em] text-brand-700 uppercase">
            CoreWorkspace
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.08] font-semibold tracking-tight text-ink md:text-5xl">
            Welcome, {firstName}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            Your firm software in one place. Open web apps signed in, or install
            desktop tools for PDF work.
          </p>
        </div>
      </section>

      <section className="px-6 py-12 md:px-8 md:py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
            Your software
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted md:text-base">
            Only tools assigned to you. Web apps open in a new tab; desktop apps
            offer a Windows or Mac download.
          </p>

          {live.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-border bg-panel/70 p-10 text-center">
              <p className="text-sm font-medium text-ink">No software assigned</p>
              <p className="mt-1 text-sm text-muted">
                Ask an admin to grant access to your tools.
              </p>
            </div>
          ) : (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {live.map((app) => (
                <AppCard key={app.id} {...app} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
