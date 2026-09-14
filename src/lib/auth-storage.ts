import type { AuthSession } from '@/types/auth'
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

export function loadSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    if (!isValidSession(parsed)) {
      localStorage.removeItem(SESSION_KEY)
      return null
    }
    return parsed
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
