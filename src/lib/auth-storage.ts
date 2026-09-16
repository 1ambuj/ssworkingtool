import type { AuthSession, AppId } from '@/types/auth'
import { DEFAULT_ALLOWED_APPS } from '@/features/apps/catalog'
import { SESSION_KEY } from '@/lib/psm-config'

function isValidSession(value: unknown): value is AuthSession {
  if (!value || typeof value !== 'object') return false
  const session = value as AuthSession
  return Boolean(
    typeof session.token === 'string' &&
      session.token.length > 0 &&
      session.user &&
      typeof session.user.email === 'string',
  )
}

/** Keep live tools in session even if an older login missed pdf-studio */
function normalizeAllowedApps(apps: AppId[] | undefined): AppId[] {
  const liveIds = new Set(DEFAULT_ALLOWED_APPS)
  const fromSession = (apps ?? []).filter((id) => liveIds.has(id))
  const merged = new Set<AppId>([...DEFAULT_ALLOWED_APPS, ...fromSession])
  return DEFAULT_ALLOWED_APPS.filter((id) => merged.has(id))
}

export function loadSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    if (!isValidSession(parsed)) {
      localStorage.removeItem(SESSION_KEY)
      return null
    }

    const normalized: AuthSession = {
      ...parsed,
      user: {
        ...parsed.user,
        allowedApps: normalizeAllowedApps(parsed.user.allowedApps),
      },
    }
    saveSession(normalized)
    return normalized
  } catch {
    localStorage.removeItem(SESSION_KEY)
    return null
  }
}

export function saveSession(session: AuthSession): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY)
}
