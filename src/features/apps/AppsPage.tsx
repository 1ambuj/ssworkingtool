import { ArrowUpRight, Monitor } from 'lucide-react'
import { Link } from 'react-router-dom'
import pdfStudioLogo from '@/assets/img/ssa_pdfstudio_logo.png'
import youtubeLogo from '@/assets/img/youtube_logo.svg'
import pdfRedactionLogo from '@/assets/img/pdf_redaction_logo.png'
import type { CatalogApp } from '@/features/apps/catalog'
import { getDesktopTools } from '@/features/apps/catalog'
import { useAuth } from '@/features/auth/AuthContext'

function ToolIcon({ tool }: { tool: CatalogApp }) {
  const frameClass =
    'mx-auto flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-surface shadow-sm ring-1 ring-border/60 sm:mx-0'

  if (tool.id === 'pdf-studio') {
    return (
      <div className={frameClass}>
        <img
          src={pdfStudioLogo}
          alt=""
          className="h-12 w-12 object-contain"
        />
      </div>
    )
  }

  if (tool.id === 'youtube-downloader') {
    return (
      <div className={frameClass}>
        <img src={youtubeLogo} alt="" className="h-12 w-12 object-contain" />
      </div>
    )
  }

  if (tool.id === 'pdf-redaction') {
    return (
      <div className={frameClass}>
        <img
          src={pdfRedactionLogo}
          alt=""
          className="h-12 w-12 object-contain"
        />
      </div>
    )
  }

  return (
    <div className={`${frameClass} bg-brand-600 text-white ring-0`}>
      <Monitor className="h-8 w-8" />
    </div>
  )
}

export function AppsPage() {
  const { user } = useAuth()
  const tools = getDesktopTools(user?.allowedApps)

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-blob absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-brand-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-5 py-12 sm:px-6 md:px-8 md:py-16">
        <header className="animate-fade-up max-w-lg">
          <p className="text-sm font-medium tracking-[0.2em] text-brand-700 uppercase">
            Tools
          </p>
          <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Install on your computer
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            Desktop software for firm work. Download once, use offline.
          </p>
        </header>

        {tools.length === 0 ? (
          <div className="mt-14 border-y border-border/70 py-16 text-center">
            <p className="text-sm font-medium text-ink">No tools available yet</p>
            <p className="mt-2 text-sm text-muted">
              Ask an admin when a desktop installer is ready for you.
            </p>
          </div>
        ) : (
          <ul className="mt-10 space-y-4 sm:mt-12">
            {tools.map((tool, index) => (
              <li
                key={tool.id}
                className={
                  index === 0
                    ? 'animate-fade-up-delay'
                    : 'animate-fade-up-delay-2'
                }
              >
                <article className="hover-lift overflow-hidden rounded-2xl border border-border/70 bg-panel shadow-sm">
                  <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
                    <ToolIcon tool={tool} />

                    <div className="min-w-0 flex-1 text-center sm:text-left">
                      <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                        <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
                          {tool.name}
                        </h2>
                        <span className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-0.5 text-[11px] font-medium text-brand-700">
                          <Monitor className="h-3 w-3" />
                          Desktop
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-medium text-brand-700">
                        {tool.tagline}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {tool.description}
                      </p>

                      {tool.actions.length > 0 ? (
                        <ul className="mt-3 hidden space-y-1 sm:block">
                          {tool.actions.slice(0, 3).map((action) => (
                            <li
                              key={action}
                              className="flex items-center gap-2 text-xs text-muted"
                            >
                              <span className="h-1 w-1 shrink-0 rounded-full bg-brand-600" />
                              {action}
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      <Link
                        to={tool.url}
                        className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 sm:w-auto"
                      >
                        Get installer
                        <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
