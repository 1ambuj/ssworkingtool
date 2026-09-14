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
    <div className="relative flex min-h-screen items-center justify-center px-4">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-brand-100/80 blur-3xl" />
        <div className="absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-amber-100/60 blur-3xl" />
      </div>

      <div className="animate-fade-up relative w-full max-w-md rounded-3xl border border-border/80 bg-panel/95 p-8 shadow-lg backdrop-blur-sm md:p-9">
        <div className="mb-8">
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-sm font-bold text-white">
            CW
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-muted">
            Sign in with your SSA Intersoft email and password.
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
            {isLoading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-xs text-muted">
          Uses the SSA Intersoft login. Start that API on port 5000 before signing in.
        </p>
      </div>
    </div>
  )
}
