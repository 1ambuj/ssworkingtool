import { cn } from '@/lib/utils'
import logoUrl from '@/assets/img/coreworkspace-logo.svg'

type BrandLogoProps = {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showWordmark?: boolean
  /** Hide wordmark below sm (icon still shows) */
  hideWordmarkOnMobile?: boolean
  tagline?: string
  tone?: 'brand' | 'light'
}

const sizeClass = {
  sm: 'h-8 w-8',
  md: 'h-9 w-9',
  lg: 'h-11 w-11',
} as const

export function BrandLogo({
  className,
  size = 'md',
  showWordmark = false,
  hideWordmarkOnMobile = false,
  tagline,
  tone = 'brand',
}: BrandLogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <img
        src={logoUrl}
        alt=""
        width={44}
        height={44}
        className={cn(
          'shrink-0 rounded-[22%]',
          sizeClass[size],
        )}
        aria-hidden
      />

      {showWordmark ? (
        <span
          className={cn(
            'min-w-0',
            hideWordmarkOnMobile && 'hidden sm:block',
          )}
        >
          <span
            className={cn(
              'font-display block text-base font-semibold tracking-tight',
              tone === 'light' ? 'text-[#f3eee4]' : 'text-ink',
            )}
          >
            CoreWorkspace
          </span>
          {tagline ? (
            <span
              className={cn(
                'block text-xs',
                tone === 'light' ? 'text-white/40' : 'text-muted',
              )}
            >
              {tagline}
            </span>
          ) : null}
        </span>
      ) : null}

      {!showWordmark ? (
        <span className="sr-only">CoreWorkspace</span>
      ) : null}
    </span>
  )
}
