import { ExternalLink } from 'lucide-react'
import { Navigate } from 'react-router-dom'
import { OsDownloadPicker } from '@/features/apps/OsDownloadPicker'
import {
  PDF_STUDIO_FEATURES,
  PDF_STUDIO_RELEASES_PAGE,
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
          Desktop software
        </p>
        <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          {app?.name ?? 'SSA PDF Studio'}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          {app?.description}
        </p>
      </header>

      <section className="rounded-2xl border border-border/80 bg-panel p-6 shadow-sm md:p-8">
        <h2 className="text-sm font-semibold tracking-wide text-ink uppercase">
          Install
        </h2>
        <p className="mt-2 text-sm text-muted">
          Select your computer type, then download the official installer from
          GitHub.
        </p>

        <div className="mt-6">
          <OsDownloadPicker />
        </div>

        <a
          href={PDF_STUDIO_RELEASES_PAGE}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:text-brand-600"
        >
          Release notes & older versions
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </section>

      <section>
        <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">
          Features
        </h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {PDF_STUDIO_FEATURES.map((feature) => (
            <li
              key={feature}
              className="rounded-xl border border-border/60 bg-panel/60 px-4 py-3 text-sm text-ink"
            >
              {feature}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
