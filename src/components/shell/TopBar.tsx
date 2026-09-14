import { LogOut } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthContext'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/apps', label: 'Apps' },
  { to: '/settings', label: 'Settings' },
] as const

export function TopBar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const firstName = user?.name?.split(' ')[0] ?? 'there'

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-panel/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-3.5 md:px-8">
        <div className="flex min-w-0 items-center gap-6">
          <NavLink to="/" className="flex shrink-0 items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-xs font-bold text-white shadow-sm">
              CW
            </div>
            <div className="hidden sm:block">
              <p className="font-display text-sm font-semibold tracking-tight text-ink">
                CoreWorkspace
              </p>
              <p className="text-[11px] text-muted">Firm portal</p>
            </div>
          </NavLink>

          <nav className="flex items-center gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={'end' in link ? link.end : false}
                className={({ isActive }) =>
                  [
                    'rounded-xl px-3 py-2 text-sm font-medium transition',
                    isActive
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'text-muted hover:bg-surface hover:text-ink',
                  ].join(' ')
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex min-w-0 items-center gap-3">
          <div className="hidden text-right md:block">
            <p className="truncate text-sm font-medium text-ink">
              Welcome, {firstName}
            </p>
            <p className="truncate text-xs text-muted">{user?.email}</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-xl border border-border/80 px-3 py-2 text-sm text-muted transition hover:border-brand-200 hover:text-ink"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </div>
    </header>
  )
}
