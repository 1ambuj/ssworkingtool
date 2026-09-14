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
    <div className="mx-auto max-w-2xl space-y-8">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-ink">
          Settings
        </h1>
        <p className="mt-2 text-sm text-muted md:text-base">
          Profile details from your SSA Intersoft session. Employee data is not edited
          here.
        </p>
      </header>

      <section className="overflow-hidden rounded-2xl border border-border/80 bg-panel shadow-sm">
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
