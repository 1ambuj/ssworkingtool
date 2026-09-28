import { LogOut } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthContext'

const links: { to: string; label: string; end?: boolean }[] = [
  { to: '/', label: 'Home', end: true },
  { to: '/tools', label: 'Tools' },
  { to: '/settings', label: 'Settings' },
]

export function TopBar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const firstName = user?.name?.split(' ')[0] ?? 'there'

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="animate-fade-in sticky top-0 z-30 border-b border-[#f37920]/20 bg-[#fffaf6]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 md:px-8">
        <div className="flex min-w-0 items-center gap-6 md:gap-8">
          <NavLink to="/" className="flex shrink-0 items-center gap-3">
            <div className="flex h-11 w-14 items-center justify-center rounded-lg bg-[#f37920] text-sm font-bold text-white shadow-sm">
              SS
            </div>
            <div className="hidden sm:block">
              <p className="font-display text-base font-semibold tracking-tight text-ink">
                SS Workspace
              </p>
              <p className="text-xs text-muted">Sandeep Singla &amp; Associates</p>
            </div>
          </NavLink>

          <nav className="flex items-center gap-1.5 md:gap-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end ?? false}
                className={({ isActive }) =>
                  [
                    'rounded-lg px-4 py-2 font-display text-[18px] font-medium transition md:px-5',
                    isActive
                      ? 'bg-[#f37920] text-white shadow-sm'
                      : 'text-ink/70 hover:bg-[#fff0e4] hover:text-ink',
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
            <p className="truncate text-[15px] font-medium text-ink">
              Welcome, {firstName}
            </p>
            <p className="truncate text-xs text-muted">{user?.email}</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-xl border border-[#f37920]/30 px-3.5 py-2.5 text-sm text-ink transition hover:border-[#f37920] hover:bg-[#fff0e4]"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </div>
    </header>
  )
}
