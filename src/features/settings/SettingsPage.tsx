import { useAuth } from '@/features/auth/AuthContext'

export function SettingsPage() {
  const { user } = useAuth()

  const rows = [
    { label: 'Name', value: user?.name },
    { label: 'Email', value: user?.email },
    { label: 'Employee ID', value: user?.employeeId || 'Not linked' },
    { label: 'Department', value: user?.department },
    { label: 'Role', value: user?.role },
    { label: 'Manager', value: user?.manager ?? '—' },
  ]

  return (
    <div className="mx-auto max-w-5xl px-5 py-8 md:px-6 md:py-10">
      <header className="border-b border-border pb-6">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">
          Settings
        </h1>
        <p className="mt-1.5 text-sm text-muted">
          Profile from your SSA Intersoft session. Not edited here.
        </p>
      </header>

      <section className="mt-7 overflow-hidden rounded-lg border border-border bg-panel">
        {rows.map((row, index) => (
          <div
            key={row.label}
            className={[
              'flex items-center justify-between gap-4 px-5 py-4',
              index < rows.length - 1 ? 'border-b border-border/70' : '',
            ].join(' ')}
          >
            <span className="text-sm text-muted">{row.label}</span>
            <span className="text-sm font-medium capitalize text-ink">
              {row.value}
            </span>
          </div>
        ))}
      </section>
    </div>
  )
}
