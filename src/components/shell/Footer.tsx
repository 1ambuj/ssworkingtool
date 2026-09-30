import { Link } from 'react-router-dom'

const upcoming = ['Task Tracker', 'AI Assistant']

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-[#0b2545] bg-[#0b2545] text-[#f4efe6]">
      <div className="pointer-events-none absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-[#f37920]/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 top-0 h-36 w-36 rounded-full bg-sky-400/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f37920] text-xs font-bold text-white">
              SS
            </div>
            <p className="font-display text-lg font-semibold tracking-tight">
              SS Workspace
            </p>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            Built by Sandeep Singla &amp; Associates for internal office use.
            One sign-in for Intersoft, Learning, and desktop tools.
          </p>
          <p className="mt-3 text-sm font-medium text-[#ffb07a]">
            Chartered Accountants · Audit, Tax &amp; Advisory
          </p>
          <a
            href="https://sspartners.in"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm font-medium text-[#ffb07a] underline-offset-4 hover:text-white hover:underline"
          >
            sspartners.in
          </a>
          <p className="mt-6 text-xs text-white/40">
            © {year} Sandeep Singla &amp; Associates · Internal firm portal
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-[#ffb07a] uppercase">
            Navigate
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link to="/" className="text-white/80 transition hover:text-[#f37920]">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/tools"
                className="text-white/80 transition hover:text-[#f37920]"
              >
                Tools
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="text-white/80 transition hover:text-[#f37920]"
              >
                Settings
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-[#ffb07a] uppercase">
            On the roadmap
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/80">
            {upcoming.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f37920]" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs leading-relaxed text-white/45">
            Same single sign-on when they arrive.
          </p>
        </div>
      </div>
    </footer>
  )
}
