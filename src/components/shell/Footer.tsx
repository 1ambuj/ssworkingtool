import { Link } from 'react-router-dom'
import { BrandLogo } from '@/components/shell/BrandLogo'
import { catalog, getCatalogApp } from '@/features/apps/catalog'
import { useAuth } from '@/features/auth/AuthContext'
import { buildTimesheetOpenUrl } from '@/lib/timesheet-handoff'

const portalLinks = [
  { to: '/', label: 'Home' },
  { to: '/tools', label: 'Tools' },
  { to: '/settings', label: 'Settings' },
] as const

const desktopTools = catalog.filter(
  (app) => app.kind === 'desktop' && app.status === 'live',
)

const webApps = catalog.filter(
  (app) => app.kind === 'web' && app.status === 'live',
)

export function Footer() {
  const year = new Date().getFullYear()
  const { token } = useAuth()
  const timesheet = getCatalogApp('psm')

  function webHref(appId: string, url: string) {
    if (appId === 'psm' && token && timesheet) {
      return buildTimesheetOpenUrl(token)
    }
    return url
  }

  return (
    <footer className="mt-auto border-t border-white/10 bg-[#111111] text-[#f3eee4]">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <BrandLogo size="sm" showWordmark tone="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              Firm portal for SSA Intersoft, Learning, ePDF book, and desktop
              installers.
            </p>
            <p className="mt-6 text-xs text-white/30">
              © {year} SSA Intersoft
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-white/40 uppercase">
              Portal
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {portalLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/70 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-white/40 uppercase">
              Web apps
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {webApps.map((app) => (
                <li key={app.id}>
                  <a
                    href={webHref(app.id, app.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 transition hover:text-white"
                  >
                    {app.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-white/40 uppercase">
              Desktop tools
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {desktopTools.map((app) => (
                <li key={app.id}>
                  <Link
                    to={app.url}
                    className="text-white/70 transition hover:text-white"
                  >
                    {app.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-xs leading-relaxed text-white/35">
            Sign in with your SSA Intersoft account. Desktop tools download from
            Tools. Learning needs the office / LAN network.
          </p>
        </div>
      </div>
    </footer>
  )
}
