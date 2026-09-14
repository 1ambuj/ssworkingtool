import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthContext'

export function LoginPage() {
  const { isAuthenticated, isLoading, login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    try {
      await login({ email, password })
      navigate('/', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.')
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-brand-100/80 blur-3xl" />
        <div className="absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-amber-100/60 blur-3xl" />
      </div>

      <header className="relative z-10 border-b border-border/60 bg-panel/70 px-6 py-5 backdrop-blur-md md:px-10">
        <div className="mx-auto flex max-w-5xl items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-xs font-bold text-white">
            CW
          </div>
          <div>
            <p className="font-display text-base font-semibold tracking-tight text-ink">
              CoreWorkspace
            </p>
            <p className="text-xs text-muted">Firm tools in one place</p>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex flex-1 items-center justify-center px-4 py-12">
        <div className="animate-fade-up grid w-full max-w-5xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="hidden lg:block">
            <p className="text-sm font-medium tracking-[0.18em] text-brand-700 uppercase">
              Welcome
            </p>
            <h1 className="font-display mt-4 text-4xl leading-tight font-semibold tracking-tight text-ink xl:text-5xl">
              Welcome to your tools. Please explore what the firm has ready.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
              Sign in once with your SSA Intersoft account. From here you can open
              Timesheet, Learning, and more — without signing in again for each app.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-ink">
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                SSA Intersoft for timesheets and client work
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                Learning portal for courses on the firm network
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                Documents, PDF merge, and more coming later
              </li>
            </ul>
          </div>

          <div className="w-full rounded-3xl border border-border/80 bg-panel/95 p-8 shadow-lg backdrop-blur-sm md:p-9">
            <div className="mb-8 lg:hidden">
              <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">
                Welcome to CoreWorkspace
              </h1>
              <p className="mt-2 text-sm text-muted">
                Please explore the tools after you sign in.
              </p>
            </div>
            <div className="mb-8 hidden lg:block">
              <h2 className="text-xl font-semibold tracking-tight text-ink">
                Sign in
              </h2>
              <p className="mt-2 text-sm text-muted">
                Use your SSA Intersoft email and password.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <label className="block space-y-1.5">
                <span className="text-sm font-medium text-ink">Email</span>
                <input
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-border bg-surface/50 px-3.5 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:bg-panel focus:ring-2 focus:ring-brand-100"
                  required
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-sm font-medium text-ink">Password</span>
                <input
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-border bg-surface/50 px-3.5 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:bg-panel focus:ring-2 focus:ring-brand-100"
                  required
                />
              </label>

              {error ? (
                <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? 'Signing in…' : 'Sign in & explore tools'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
