import { useState } from 'react'
import { Apple, Download, Monitor } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  PDF_STUDIO_MAC_URL,
  PDF_STUDIO_WINDOWS_URL,
} from '@/features/apps/pdf-studio-downloads'

type OsChoice = 'windows' | 'mac'

export function OsDownloadPicker({ compact = false }: { compact?: boolean }) {
  const [os, setOs] = useState<OsChoice>('windows')
  const macReady = Boolean(PDF_STUDIO_MAC_URL)

  function select(next: OsChoice) {
    if (next === 'mac' && !macReady) return
    setOs(next)
  }

  return (
    <div className={compact ? 'space-y-3' : 'space-y-4'}>
      <div className="inline-flex rounded-xl border border-border bg-surface/80 p-1">
        <button
          type="button"
          onClick={() => select('windows')}
          className={cn(
            'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition',
            os === 'windows'
              ? 'bg-panel text-ink shadow-sm'
              : 'text-muted hover:text-ink',
          )}
        >
          <Monitor className="h-4 w-4" />
          Windows
        </button>
        <button
          type="button"
          onClick={() => select('mac')}
          disabled={!macReady}
          className={cn(
            'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition',
            os === 'mac'
              ? 'bg-panel text-ink shadow-sm'
              : 'text-muted hover:text-ink',
            !macReady && 'cursor-not-allowed opacity-50',
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
          className={cn(buttonVariants({ size: compact ? 'default' : 'lg' }), 'rounded-xl')}
        >
          <Download className="h-4 w-4" />
          Download SSA-PDF-Studio-Setup.exe
        </a>
      ) : macReady ? (
        <a
          href={PDF_STUDIO_MAC_URL}
          download
          rel="noopener noreferrer"
          className={cn(buttonVariants({ size: compact ? 'default' : 'lg' }), 'rounded-xl')}
        >
          <Download className="h-4 w-4" />
          Download for Mac
        </a>
      ) : (
        <p className="text-sm text-muted">
          Mac installer is not published yet. Use Windows for now, or check back
          after the next release.
        </p>
      )}
    </div>
  )
}
