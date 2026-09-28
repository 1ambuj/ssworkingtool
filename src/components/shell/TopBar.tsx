import { LogOut } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { BrandLogo } from '@/components/shell/BrandLogo'
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
    <header className="animate-fade-in sticky top-0 z-30 border-b border-border/70 bg-panel/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 md:px-8 md:py-5">
        <div className="flex min-w-0 items-center gap-6 md:gap-8">
          <NavLink to="/" className="flex shrink-0 items-center">
            <BrandLogo
              size="lg"
              showWordmark
              hideWordmarkOnMobile
              tagline="Firm portal"
            />
          </NavLink>

          <nav className="flex items-center gap-1.5 md:gap-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end ?? false}
                className={({ isActive }) =>
                  [
                    'rounded-md px-4 py-2 text-[15px] font-medium transition md:px-5',
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
            <p className="truncate text-[15px] font-medium text-ink">
              Welcome, {firstName}
            </p>
            <p className="truncate text-xs text-muted">{user?.email}</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-xl border border-border/80 px-3.5 py-2.5 text-sm text-muted transition hover:border-brand-200 hover:text-ink"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </div>
    </header>
  )
}
