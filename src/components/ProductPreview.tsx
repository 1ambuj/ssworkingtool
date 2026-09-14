/** Built-in product previews — no external image files required. */

export function TimesheetPreview() {
  return (
    <figure className="animate-fade-up-delay overflow-hidden rounded-[1.5rem] border border-border/60 bg-[#1c1917] shadow-[0_24px_60px_-28px_rgba(28,25,23,0.55)]">
      <div className="grid grid-cols-[140px_1fr] gap-3 p-4 md:grid-cols-[160px_1fr] md:gap-4 md:p-5">
        <div className="space-y-3 rounded-2xl bg-white/5 p-3">
          <div className="h-2.5 w-16 rounded-full bg-brand-500" />
          <div className="h-2 w-20 rounded-full bg-white/15" />
          <div className="h-2 w-14 rounded-full bg-white/15" />
          <div className="h-2 w-16 rounded-full bg-white/15" />
          <div className="mt-6 space-y-2">
            <div className="h-8 rounded-lg bg-white/8" />
            <div className="h-8 rounded-lg bg-white/8" />
            <div className="h-8 rounded-lg bg-white/8" />
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
            <div className="h-3 w-36 rounded-full bg-[#f3eee4]/90" />
            <div className="h-7 w-20 rounded-lg bg-brand-600" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/5 p-4">
              <div className="h-2.5 w-24 rounded-full bg-brand-500" />
              <div className="mt-3 h-2 w-full rounded-full bg-white/12" />
              <div className="mt-2 h-2 w-[80%] rounded-full bg-white/12" />
              <div className="mt-4 h-8 w-24 rounded-lg bg-brand-600" />
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <div className="space-y-2.5">
                <div className="h-2.5 w-full rounded-full bg-white/12" />
                <div className="h-2.5 w-full rounded-full bg-white/12" />
                <div className="h-2.5 w-[66%] rounded-full bg-white/12" />
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/5 p-4">
            <div className="h-2.5 w-28 rounded-full bg-[#f3eee4]/70" />
            <div className="mt-4 space-y-2">
              <div className="h-2 w-full rounded-full bg-white/12" />
              <div className="h-2 w-[92%] rounded-full bg-white/12" />
              <div className="h-2 w-[85%] rounded-full bg-white/12" />
            </div>
          </div>
        </div>
      </div>
      <figcaption className="border-t border-white/10 px-4 py-3 text-xs text-white/55">
        SSA Intersoft — timesheets, clients, and firm workflows
      </figcaption>
    </figure>
  )
}

export function LearningPreview() {
  return (
    <figure className="animate-fade-up-delay overflow-hidden rounded-[1.5rem] border border-brand-700/30 bg-brand-700 shadow-[0_24px_60px_-28px_rgba(36,67,57,0.55)]">
      <div className="space-y-3 p-4 md:p-5">
        <div className="rounded-2xl bg-brand-600 px-4 py-4">
          <div className="h-3 w-40 rounded-full bg-brand-100" />
        </div>
        <div className="grid gap-3 sm:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-3 rounded-2xl bg-brand-600 p-4">
            <div className="h-2.5 w-28 rounded-full bg-brand-100" />
            <div className="h-16 rounded-xl bg-brand-500/80" />
            <div className="h-16 rounded-xl bg-brand-500/80" />
            <div className="h-16 rounded-xl bg-brand-500/80" />
          </div>
          <div className="rounded-2xl bg-brand-600 p-4">
            <div className="h-3 w-44 rounded-full bg-brand-100" />
            <div className="mt-4 h-2 w-full rounded-full bg-brand-500" />
            <div className="mt-2 h-2 w-[80%] rounded-full bg-brand-500" />
            <div className="mt-6 h-40 rounded-xl bg-brand-700/80" />
          </div>
        </div>
      </div>
      <figcaption className="border-t border-white/10 px-4 py-3 text-xs text-brand-100/70">
        Learning — course preview (replace with real screenshots anytime)
      </figcaption>
    </figure>
  )
}
