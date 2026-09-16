import { Link } from 'react-router-dom'

const upcoming = ['Task Tracker', 'AI Assistant']

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-border/70 bg-[#1c1917] text-[#f3eee4]">
      <div className="pointer-events-none absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-brand-600/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 top-0 h-36 w-36 rounded-full bg-amber-500/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-xs font-bold text-white">
              CW
            </div>
            <p className="font-display text-lg font-semibold tracking-tight">
              CoreWorkspace
            </p>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            One door into your firm software. Sign in once, open Timesheet,
            Learning, and every tool we connect next — without starting over.
          </p>
          <p className="mt-6 text-xs text-white/35">
            © {year} SSA Intersoft · Internal firm portal
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-white/45 uppercase">
            Navigate
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link to="/" className="text-white/75 transition hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/apps"
                className="text-white/75 transition hover:text-white"
              >
                Apps
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="text-white/75 transition hover:text-white"
              >
                Settings
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-white/45 uppercase">
            On the roadmap
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/75">
            {upcoming.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs leading-relaxed text-white/40">
            Same single sign-on when they arrive.
          </p>
        </div>
      </div>
    </footer>
  )
}
