import { useState } from 'react'
import { Apple, Download, Monitor } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  PDF_STUDIO_MAC_URL,
  PDF_STUDIO_WINDOWS_URL,
} from '@/features/apps/pdf-studio-downloads'

type OsChoice = 'windows' | 'mac'

export function OsDownloadPicker({ compact = false }: { compact?: boolean }) {
  const [os, setOs] = useState<OsChoice>('windows')
  const macReady = Boolean(PDF_STUDIO_MAC_URL)

  return (
    <div className={compact ? 'space-y-3' : 'space-y-5'}>
      <div className="grid grid-cols-2 gap-2 rounded-2xl border border-border bg-surface/80 p-1.5 sm:inline-grid sm:w-auto sm:min-w-[280px]">
        <button
          type="button"
          onClick={() => setOs('windows')}
          className={cn(
            'inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition sm:px-4',
            os === 'windows'
              ? 'bg-panel text-ink shadow-sm ring-1 ring-border/80'
              : 'text-muted hover:text-ink',
          )}
        >
          <Monitor className="h-4 w-4" />
          Windows
        </button>
        <button
          type="button"
          onClick={() => setOs('mac')}
          className={cn(
            'inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition sm:px-4',
            os === 'mac'
              ? 'bg-panel text-ink shadow-sm ring-1 ring-border/80'
              : 'text-muted hover:text-ink',
          )}
        >
          <Apple className="h-4 w-4" />
          Mac
        </button>
      </div>

      {os === 'windows' ? (
        <a
          href={PDF_STUDIO_WINDOWS_URL}
          download
          rel="noopener noreferrer"
          className={cn(
            'inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 font-semibold text-white shadow-sm transition hover:bg-brand-700 sm:w-auto',
            compact ? 'py-2.5 text-sm' : 'py-3.5 text-sm sm:text-base',
          )}
        >
          <Download className="h-4 w-4 shrink-0" />
          <span className="truncate">Download for Windows</span>
        </a>
      ) : macReady ? (
        <a
          href={PDF_STUDIO_MAC_URL}
          download
          rel="noopener noreferrer"
          className={cn(
            'inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 font-semibold text-white shadow-sm transition hover:bg-brand-700 sm:w-auto',
            compact ? 'py-2.5 text-sm' : 'py-3.5 text-sm sm:text-base',
          )}
        >
          <Download className="h-4 w-4 shrink-0" />
          Download for Mac
        </a>
      ) : (
        <div className="rounded-xl border border-dashed border-border bg-surface/70 px-4 py-3.5">
          <p className="text-sm font-medium text-ink">Mac — coming soon</p>
          <p className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">
            The Mac installer is not published yet. Use Windows for now, or
            check back after the next release.
          </p>
        </div>
      )}
    </div>
  )
}
