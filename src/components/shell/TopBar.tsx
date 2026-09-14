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
    <header className="sticky top-0 z-30 border-b border-border bg-panel">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-5 md:px-6">
        <div className="flex min-w-0 items-center gap-8">
          <NavLink to="/" className="flex shrink-0 items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-600 text-[11px] font-bold tracking-wide text-white">
              CW
            </div>
            <span className="hidden text-sm font-semibold tracking-tight text-ink sm:inline">
              CoreWorkspace
            </span>
          </NavLink>

          <nav className="flex items-center gap-0.5">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={'end' in link ? link.end : false}
                className={({ isActive }) =>
                  [
                    'rounded-md px-3 py-1.5 text-sm transition',
                    isActive
                      ? 'bg-surface font-medium text-ink'
                      : 'text-muted hover:bg-surface/70 hover:text-ink',
                  ].join(' ')
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex min-w-0 items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="truncate text-sm font-medium text-ink">{firstName}</p>
            <p className="truncate text-xs text-muted">{user?.email}</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-sm text-muted transition hover:border-brand-500/40 hover:text-ink"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Sign out</span>
          </button>
        </div>
      </div>
    </header>
  )
}
