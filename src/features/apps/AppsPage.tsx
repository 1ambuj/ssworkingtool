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
    'flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-surface shadow-sm ring-1 ring-border/60'

  if (tool.id === 'pdf-studio') {
    return (
      <div className={frameClass}>
        <img
          src={pdfStudioLogo}
          alt=""
          className="h-10 w-10 object-contain"
        />
      </div>
    )
  }

  if (tool.id === 'youtube-downloader') {
    return (
      <div className={frameClass}>
        <img src={youtubeLogo} alt="" className="h-10 w-10 object-contain" />
      </div>
    )
  }

  if (tool.id === 'pdf-redaction') {
    return (
      <div className={frameClass}>
        <img
          src={pdfRedactionLogo}
          alt=""
          className="h-10 w-10 object-contain"
        />
      </div>
    )
  }

  return (
    <div className={`${frameClass} bg-brand-600 text-white ring-0`}>
      <Monitor className="h-7 w-7" />
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

      <div className="relative mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-28">
        <header className="animate-fade-up max-w-2xl">
          <p className="text-sm font-medium tracking-[0.18em] text-brand-700 uppercase md:text-base">
            Tools
          </p>
          <h1 className="font-display mt-5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-5xl">
            Install on your computer
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
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
          <ul className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:gap-6">
            {tools.map((tool, index) => (
              <li
                key={tool.id}
                className={
                  index % 2 === 0
                    ? 'animate-fade-up-delay h-full'
                    : 'animate-fade-up-delay-2 h-full'
                }
              >
                <article className="hover-lift flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-panel p-5 shadow-sm sm:p-6">
                  <div className="flex items-start gap-4">
                    <ToolIcon tool={tool} />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-display text-lg font-semibold tracking-tight text-ink sm:text-xl">
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
                    </div>
                  </div>

                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                    {tool.description}
                  </p>

                  {tool.actions.length > 0 ? (
                    <ul className="mt-4 space-y-1.5">
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
                    className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
                  >
                    Get installer
                    <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
