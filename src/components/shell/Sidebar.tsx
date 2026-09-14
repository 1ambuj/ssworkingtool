import { Home, LayoutGrid, LogOut, Settings, Shield } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthContext'

const links = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/apps', label: 'Apps', icon: LayoutGrid },
  { to: '/settings', label: 'Settings', icon: Settings },
] as const

export function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const isAdmin = user?.role === 'admin'

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-border/80 bg-panel/90 backdrop-blur-sm">
      <div className="px-5 py-7">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-xs font-bold text-white">
            CW
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight text-ink">
              CoreWorkspace
            </p>
            <p className="text-[11px] text-muted">Firm portal</p>
          </div>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 px-3">
        {links.map((link) => (
          <SidebarLink key={link.to} {...link} />
        ))}

        {isAdmin ? (
          <>
            <p className="mt-6 mb-1 px-3 text-[11px] font-medium tracking-wide text-muted uppercase">
              Admin
            </p>
            <SidebarLink
              to="/admin/registry"
              label="Registry"
              icon={Shield}
            />
          </>
        ) : null}
      </nav>

      <div className="space-y-2 border-t border-border/80 px-4 py-4">
        <div className="flex items-center gap-3 rounded-xl bg-surface/70 px-2.5 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">
            {user?.name?.charAt(0) ?? '?'}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-ink">{user?.name}</p>
            <p className="truncate text-xs capitalize text-muted">{user?.role}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-muted transition hover:bg-surface hover:text-ink"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  )
}

function SidebarLink({
  to,
  label,
  icon: Icon,
  end,
}: {
  to: string
  label: string
  icon: typeof Home
  end?: boolean
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        [
          'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
          isActive
            ? 'bg-brand-600 text-white shadow-sm'
            : 'text-muted hover:bg-surface hover:text-ink',
        ].join(' ')
      }
    >
      <Icon className="h-4 w-4 shrink-0" />
      {label}
    </NavLink>
  )
}
