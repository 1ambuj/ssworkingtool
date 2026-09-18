import { Apple, ArrowLeft, Download, ExternalLink, Monitor } from 'lucide-react'
import { Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import youtubeLogo from '@/assets/img/youtube_logo.svg'
import {
  YOUTUBE_DOWNLOADER_FEATURES,
  YOUTUBE_DOWNLOADER_MAC_URL,
  YOUTUBE_DOWNLOADER_RELEASES_PAGE,
  YOUTUBE_DOWNLOADER_WINDOWS_URL,
} from '@/features/apps/youtube-downloader-downloads'
import { getCatalogApp } from '@/features/apps/catalog'
import { useAuth } from '@/features/auth/AuthContext'

type OsChoice = 'windows' | 'mac'

export function YoutubeDownloaderPage() {
  const { user } = useAuth()
  const app = getCatalogApp('youtube-downloader')
  const allowed = user?.allowedApps.includes('youtube-downloader')
  const [os, setOs] = useState<OsChoice>('windows')
  const macReady = Boolean(YOUTUBE_DOWNLOADER_MAC_URL)

  if (!allowed) {
    return <Navigate to="/tools" replace />
  }

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand-100/45 blur-3xl" />
        <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-amber-100/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-10 sm:px-6 md:px-8 md:py-14 lg:py-16">
        <Link
          to="/tools"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Tools
        </Link>

        <div className="mt-8 grid gap-12 lg:mt-12 lg:grid-cols-[1fr_0.95fr] lg:items-start lg:gap-16">
          <div className="animate-fade-up">
            <div className="flex items-center gap-4">
              <img
                src={youtubeLogo}
                alt="YouTube Downloader logo"
                className="h-12 w-12 rounded-xl shadow-sm sm:h-14 sm:w-14"
              />
              <div>
                <p className="text-sm font-medium tracking-[0.18em] text-brand-700 uppercase">
                  Desktop software
                </p>
                <h1 className="font-display mt-1 text-3xl leading-[1.05] font-semibold tracking-tight text-ink sm:text-4xl md:text-5xl">
                  {app?.name ?? 'YouTube Downloader'}
                </h1>
              </div>
            </div>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
              {app?.description ??
                'Download YouTube videos to your computer. Install once on Windows.'}
            </p>

            <ol className="mt-10 space-y-0 border-t border-border/70">
              {YOUTUBE_DOWNLOADER_FEATURES.map((feature, index) => (
                <li
                  key={feature}
                  className="flex gap-4 border-b border-border/70 py-3.5 text-sm text-ink"
                >
                  <span className="w-6 shrink-0 font-mono text-xs text-muted tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {feature}
                </li>
              ))}
            </ol>
          </div>

          <div className="animate-fade-up-delay">
            <div className="overflow-hidden rounded-[1.75rem] border border-border/70 bg-panel shadow-[0_30px_80px_-48px_rgba(28,25,23,0.5)] lg:rounded-[2rem]">
              <div className="border-b border-brand-700/40 bg-brand-600 px-6 py-6 sm:px-8">
                <p className="text-xs font-medium tracking-[0.16em] text-white/45 uppercase">
                  Installer
                </p>
                <p className="mt-2 font-display text-xl font-semibold text-[#f3eee4]">
                  Choose your system
                </p>
                <p className="mt-1.5 text-sm text-white/50">
                  Official release · portal login is not attached to the file
                </p>
              </div>

              <div className="space-y-5 p-6 sm:p-8">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setOs('windows')}
                    className={cn(
                      'flex items-center gap-3 rounded-2xl border px-4 py-4 text-left transition',
                      os === 'windows'
                        ? 'border-brand-600 bg-brand-50/80 ring-1 ring-brand-600/20'
                        : 'border-border/80 bg-surface/50 hover:border-brand-200',
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-xl',
                        os === 'windows'
                          ? 'bg-brand-600 text-white'
                          : 'bg-panel text-muted ring-1 ring-border',
                      )}
                    >
                      <Monitor className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-ink">
                        Windows
                      </span>
                      <span className="block text-xs text-muted">.exe setup</span>
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOs('mac')}
                    className={cn(
                      'flex items-center gap-3 rounded-2xl border px-4 py-4 text-left transition',
                      os === 'mac'
                        ? 'border-brand-600 bg-brand-50/80 ring-1 ring-brand-600/20'
                        : 'border-border/80 bg-surface/50 hover:border-brand-200',
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-xl',
                        os === 'mac'
                          ? 'bg-brand-600 text-white'
                          : 'bg-panel text-muted ring-1 ring-border',
                      )}
                    >
                      <Apple className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-ink">
                        Mac
                      </span>
                      <span className="block text-xs text-muted">
                        {macReady ? '.dmg install' : 'Coming soon'}
                      </span>
                    </span>
                  </button>
                </div>

                {os === 'windows' ? (
                  <a
                    href={YOUTUBE_DOWNLOADER_WINDOWS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
                  >
                    <Download className="h-4 w-4" />
                    Download for Windows
                  </a>
                ) : macReady ? (
                  <a
                    href={YOUTUBE_DOWNLOADER_MAC_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
                  >
                    <Download className="h-4 w-4" />
                    Download for Mac
                  </a>
                ) : (
                  <div className="rounded-xl border border-dashed border-border bg-surface/60 px-4 py-4">
                    <p className="text-sm font-medium text-ink">
                      Mac build not published yet
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">
                      Use Windows for now, or check back after the next release.
                    </p>
                  </div>
                )}

                <div className="flex flex-col gap-3 border-t border-border/60 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs leading-relaxed text-muted">
                    After install, open{' '}
                    <span className="font-medium text-ink">
                      YouTube Downloader
                    </span>{' '}
                    from the Start menu.
                  </p>
                  <a
                    href={YOUTUBE_DOWNLOADER_RELEASES_PAGE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-brand-700 hover:text-brand-600"
                  >
                    Release notes
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
