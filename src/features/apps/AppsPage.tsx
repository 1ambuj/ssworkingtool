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
        <div className="animate-blob absolute -left-16 top-0 h-72 w-72 rounded-full bg-[#f37920]/25 blur-3xl" />
        <div className="animate-blob-slow absolute right-0 top-24 h-80 w-80 rounded-full bg-sky-300/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-28">
        <header className="animate-fade-up max-w-2xl">
          <p className="text-sm font-medium tracking-[0.18em] text-[#f37920] uppercase md:text-base">
            Tools
          </p>
          <h1 className="font-display mt-5 text-[30px] leading-[1.2] font-bold tracking-tight text-ink">
            Install on your computer
          </h1>
          <p className="mt-6 text-base leading-[1.7] text-muted">
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
            {tools.map((tool, index) => {
              const purple = {
                card: 'border-purple-200 bg-purple-50 shadow-[0_24px_50px_-28px_rgba(126,34,206,0.4)]',
                badge: 'bg-purple-100 text-purple-800',
                line: 'text-purple-700',
                dot: 'bg-purple-500',
                button: 'bg-purple-600 hover:bg-purple-700',
              }
              const red = {
                card: 'border-red-200 bg-red-50 shadow-[0_24px_50px_-28px_rgba(220,38,38,0.35)]',
                badge: 'bg-red-100 text-red-700',
                line: 'text-red-600',
                dot: 'bg-red-500',
                button: 'bg-red-600 hover:bg-red-700',
              }
              const orange = {
                card: 'border-[#f37920]/25 bg-white shadow-[0_24px_50px_-28px_rgba(243,121,32,0.45)]',
                badge: 'bg-[#fff0e4] text-[#d96512]',
                line: 'text-[#d96512]',
                dot: 'bg-[#f37920]',
                button: 'bg-[#f37920] hover:bg-[#e06812]',
              }
              const navy = {
                card: 'border-[#0b2545]/30 bg-[#e8eef6] shadow-[0_24px_50px_-28px_rgba(11,37,69,0.45)]',
                badge: 'bg-[#0b2545] text-white',
                line: 'text-[#0b2545]',
                dot: 'bg-[#0b2545]',
                button: 'bg-[#0b2545] hover:bg-[#081a32]',
              }
              const tone =
                tool.id === 'youtube-downloader'
                  ? red
                  : tool.id === 'pdf-studio'
                    ? navy
                    : tool.id === 'pdf-redaction'
                      ? purple
                      : orange

              return (
              <li
                key={tool.id}
                className={
                  index % 2 === 0
                    ? 'animate-fade-up-delay h-full'
                    : 'animate-fade-up-delay-2 h-full'
                }
              >
                <article className={`hover-lift flex h-full flex-col overflow-hidden rounded-2xl border p-5 sm:p-6 ${tone.card}`}>
                  <div className="flex items-start gap-4">
                    <ToolIcon tool={tool} />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-display text-lg font-bold tracking-tight text-ink sm:text-xl">
                          {tool.name}
                        </h2>
                        <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium ${tone.badge}`}>
                          <Monitor className="h-3 w-3" />
                          Desktop
                        </span>
                      </div>
                      <p className={`mt-1 text-sm font-medium ${tone.line}`}>
                        {tool.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 flex-1 text-base leading-[1.7] text-muted">
                    {tool.description}
                  </p>

                  {tool.actions.length > 0 ? (
                    <ul className="mt-4 space-y-1.5">
                      {tool.actions.slice(0, 3).map((action) => (
                        <li
                          key={action}
                          className="flex items-center gap-2 text-sm text-muted"
                        >
                          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${tone.dot}`} />
                          {action}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <Link
                    to={tool.url}
                    className={`group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-base font-semibold text-white shadow-sm transition ${tone.button}`}
                  >
                    Get installer
                    <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </article>
              </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
