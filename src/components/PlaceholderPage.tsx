type PlaceholderPageProps = {
  title: string
  description: string
  tip?: string
}

export function PlaceholderPage({
  title,
  description,
  tip,
}: PlaceholderPageProps) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-3xl border border-border/80 bg-panel p-8 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">
          {title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
        {tip ? (
          <p className="mt-4 rounded-xl bg-surface px-3 py-2 text-xs text-muted">
            {tip}
          </p>
        ) : null}
      </div>
    </div>
  )
}
