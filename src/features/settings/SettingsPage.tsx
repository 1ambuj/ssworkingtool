import { useState } from 'react'
import {
  Briefcase,
  Building2,
  Check,
  Copy,
  IdCard,
  Mail,
  Shield,
  UserRound,
} from 'lucide-react'
import { useAuth } from '@/features/auth/AuthContext'

function initialsFrom(name: string | undefined) {
  if (!name?.trim()) return '?'
  const parts = name.trim().split(/\s+/).slice(0, 2)
  return parts.map((p) => p[0]?.toUpperCase() ?? '').join('')
}

function roleLabel(role: string | undefined) {
  if (!role) return '—'
  return role.charAt(0).toUpperCase() + role.slice(1)
}

export function SettingsPage() {
  const { user } = useAuth()
  const [copied, setCopied] = useState(false)

  const fields = [
    {
      label: 'Employee ID',
      value: user?.employeeId || 'Not linked',
      icon: IdCard,
      hint: 'Linked from SSA Intersoft',
    },
    {
      label: 'Department',
      value: user?.department && user.department !== '—' ? user.department : '—',
      icon: Building2,
      hint: 'Team or practice area',
    },
    {
      label: 'Role',
      value: roleLabel(user?.role),
      icon: Shield,
      hint: 'Access level in CoreWorkspace',
    },
    {
      label: 'Manager',
      value: user?.manager ?? '—',
      icon: Briefcase,
      hint: 'Reporting line',
    },
  ]

  async function copyEmail() {
    if (!user?.email) return
    try {
      await navigator.clipboard.writeText(user.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard may be blocked */
    }
  }

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-blob absolute -left-16 top-10 h-64 w-64 rounded-full bg-brand-100/50 blur-3xl" />
        <div className="animate-blob-slow absolute right-0 top-24 h-72 w-72 rounded-full bg-amber-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 py-10 md:px-8 md:py-14">
        <header className="animate-fade-up">
          <p className="text-sm font-medium tracking-[0.18em] text-brand-700 uppercase">
            Account
          </p>
          <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Settings
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted md:text-base">
            Profile details from your SSA Intersoft session.
          </p>
        </header>

        {/* Profile hero */}
        <section className="animate-fade-up-delay group mt-8 overflow-hidden rounded-2xl border border-border/80 bg-panel shadow-sm transition hover:border-brand-100 hover:shadow-md">
          <div className="relative px-5 py-6 sm:px-7 sm:py-8">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-brand-50/80 to-transparent" />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-2xl font-semibold tracking-tight text-white shadow-lg shadow-brand-600/25 ring-4 ring-brand-50 transition duration-300 group-hover:scale-[1.03]">
                {initialsFrom(user?.name)}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h2 className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                    {user?.name || 'Employee'}
                  </h2>
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-brand-700 ring-1 ring-brand-100 capitalize">
                    <UserRound className="h-3 w-3" />
                    {roleLabel(user?.role)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={copyEmail}
                  className="mt-2 inline-flex max-w-full items-center gap-2 rounded-lg px-1.5 py-1 text-sm text-muted transition hover:bg-brand-50/80 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
                  title="Copy email"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{user?.email || '—'}</span>
                  {copied ? (
                    <Check className="h-3.5 w-3.5 shrink-0 text-brand-600" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 shrink-0 opacity-50" />
                  )}
                  <span className="sr-only">
                    {copied ? 'Copied' : 'Copy email'}
                  </span>
                </button>

                <p className="mt-3 text-xs text-muted">
                  Synced from SSA Intersoft · read-only in CoreWorkspace
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Detail tiles */}
        <section className="animate-fade-up-delay-2 mt-5 grid gap-3 sm:grid-cols-2">
          {fields.map((field) => {
            const Icon = field.icon
            return (
              <article
                key={field.label}
                tabIndex={0}
                className="group/tile rounded-2xl border border-border/80 bg-panel p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-brand-100 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/30 sm:p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 transition group-hover/tile:bg-brand-600 group-hover/tile:text-white group-hover/tile:ring-brand-600">
                    <Icon className="h-[18px] w-[18px]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium tracking-wide text-muted uppercase">
                      {field.label}
                    </p>
                    <p className="mt-1 truncate text-base font-semibold text-ink capitalize">
                      {field.value}
                    </p>
                    <p className="mt-1 text-xs text-muted opacity-0 transition group-hover/tile:opacity-100">
                      {field.hint}
                    </p>
                  </div>
                </div>
              </article>
            )
          })}
        </section>
      </div>
    </div>
  )
}
