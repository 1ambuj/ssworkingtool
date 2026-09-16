import { Download, ExternalLink, Monitor, Apple } from 'lucide-react'
import { Navigate } from 'react-router-dom'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  PDF_STUDIO_FEATURES,
  PDF_STUDIO_MAC_URL,
  PDF_STUDIO_RELEASES_PAGE,
  PDF_STUDIO_WINDOWS_URL,
} from '@/features/apps/pdf-studio-downloads'
import { getCatalogApp } from '@/features/apps/catalog'
import { useAuth } from '@/features/auth/AuthContext'

export function PdfStudioPage() {
  const { user } = useAuth()
  const app = getCatalogApp('pdf-studio')
  const allowed = user?.allowedApps.includes('pdf-studio')

  if (!allowed) {
    return <Navigate to="/apps" replace />
  }

  return (
    <div className="mx-auto max-w-3xl space-y-10 px-6 py-10 md:px-8 md:py-12">
      <header>
        <p className="text-sm font-medium tracking-[0.16em] text-brand-700 uppercase">
          Desktop tool
        </p>
        <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          {app?.name ?? 'SSA PDF Studio'}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          {app?.description ??
            'Merge, convert, and compress PDFs on your computer. Install once, then open from the Start menu or Applications folder.'}
        </p>
      </header>

      <section className="rounded-2xl border border-border/80 bg-panel p-6 shadow-sm md:p-8">
        <h2 className="text-sm font-semibold tracking-wide text-ink uppercase">
          Download
        </h2>
        <p className="mt-2 text-sm text-muted">
          Files come from our official GitHub release. CoreWorkspace only links
          to them — your login is not sent to the installer.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={PDF_STUDIO_WINDOWS_URL}
            download
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: 'lg' }), 'rounded-xl')}
          >
            <Monitor className="h-4 w-4" />
            Download for Windows
          </a>

          {PDF_STUDIO_MAC_URL ? (
            <a
              href={PDF_STUDIO_MAC_URL}
              download
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'rounded-xl',
              )}
            >
              <Apple className="h-4 w-4" />
              Download for Mac
            </a>
          ) : (
            <div className="flex items-center gap-3 rounded-xl border border-dashed border-border bg-surface/80 px-4 py-3">
              <Apple className="h-5 w-5 shrink-0 text-muted" />
              <div>
                <p className="text-sm font-medium text-ink">Mac — coming soon</p>
                <p className="text-xs text-muted">
                  v1.0.0 is Windows only. Mac build will appear here when released.
                </p>
              </div>
            </div>
          )}
        </div>

        <a
          href={PDF_STUDIO_RELEASES_PAGE}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:text-brand-600"
        >
          All releases & release notes
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </section>

      <section>
        <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">
          What you can do
        </h2>
        <ul className="mt-4 space-y-3">
          {PDF_STUDIO_FEATURES.map((feature) => (
            <li
              key={feature}
              className="flex gap-3 rounded-xl border border-border/60 bg-panel/60 px-4 py-3 text-sm text-ink"
            >
              <Download className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              {feature}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl bg-surface/90 px-4 py-3 text-xs leading-relaxed text-muted">
        <p className="font-medium text-ink">After install</p>
        <p className="mt-1">
          Windows: run <span className="font-mono text-ink">SSA-PDF-Studio-Setup.exe</span>,
          then open <strong className="text-ink">SSA PDF Studio</strong> from the Start menu.
          Mac users: wait for the .dmg release or ask IT for the beta build.
        </p>
      </section>
    </div>
  )
}
