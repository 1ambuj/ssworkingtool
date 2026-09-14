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
    <div className="flex min-h-screen flex-col bg-[#f4f6f5]">
      <header className="border-b border-border bg-panel">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-2.5 px-5 md:px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-600 text-[11px] font-bold text-white">
            CW
          </div>
          <span className="text-sm font-semibold tracking-tight text-ink">
            CoreWorkspace
          </span>
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="grid w-full max-w-4xl gap-10 lg:grid-cols-2 lg:items-center">
          <div className="hidden lg:block">
            <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
              Firm tools. One sign-in.
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
              Use your SSA Intersoft email and password. After login you can open
              Timesheet and other firm apps without signing in again.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-ink">
              <li className="flex gap-2">
                <span className="text-brand-600">·</span>
                SSA Intersoft for daily timesheets and client work
              </li>
              <li className="flex gap-2">
                <span className="text-brand-600">·</span>
                Learning on the firm LAN
              </li>
              <li className="flex gap-2">
                <span className="text-brand-600">·</span>
                More tools added to this portal over time
              </li>
            </ul>
          </div>

          <div className="w-full rounded-lg border border-border bg-panel p-7 shadow-sm">
            <h2 className="text-lg font-semibold tracking-tight text-ink">
              Sign in
            </h2>
            <p className="mt-1 text-sm text-muted lg:hidden">
              SSA Intersoft email and password
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <label className="block space-y-1.5">
                <span className="text-sm font-medium text-ink">Email</span>
                <input
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-border bg-panel px-3 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
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
                  className="w-full rounded-md border border-border bg-panel px-3 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                  required
                />
              </label>

              {error ? (
                <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-md bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
