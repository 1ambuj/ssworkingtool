import type { AuthSession, AuthUser, LoginCredentials, UserRole } from '@/types/auth'
import { DEFAULT_ALLOWED_APPS } from '@/features/apps/catalog'
import { PSM_API_URL } from '@/lib/psm-config'

interface PsmLoginUser {
  id?: string
  email?: string
  full_name?: string
  employee_id?: number | string | null
  role_code?: string | null
  rbac_role?: string | null
  isAdmin?: boolean
}

interface PsmLoginResponse {
  success?: boolean
  message?: string
  code?: string
  token?: string
  user?: PsmLoginUser
}

const LOGIN_TIMEOUT_MS = 45000
const MAX_ATTEMPTS = 3

/**
 * Login against the Timesheet / PSM auth API.
 * PSM remains the source of truth (Neon). CoreWorkspace only stores the session.
 */
export async function loginWithPsm(
  credentials: LoginCredentials,
): Promise<AuthSession> {
  const email = credentials.email.trim().toLowerCase()
  const password = credentials.password

  if (!email || !password) {
    throw new Error('Email and password are required.')
  }

  let lastNetworkError: unknown = null

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const controller = new AbortController()
    const timer = window.setTimeout(() => controller.abort(), LOGIN_TIMEOUT_MS)

    try {
      const response = await fetch(`${PSM_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          login_type: 'employee',
        }),
        signal: controller.signal,
      })

      const data = (await response.json().catch(() => null)) as PsmLoginResponse | null

      if (!response.ok || !data?.success || !data.token || !data.user) {
        if (data?.code === 'EMPLOYEE_NOT_LINKED') {
          throw new Error(
            data.message ||
              'This account is not linked to an employee in Timesheet. Ask admin to link it.',
          )
        }
        throw new Error(data?.message || 'Invalid email or password.')
      }

      if (data.user.employee_id == null || data.user.employee_id === '') {
        throw new Error(
          'Login succeeded but no employee record is linked. Timesheet data will be empty until admin links this user.',
        )
      }

      return {
        token: data.token,
        user: mapPsmUser(data.user),
      }
    } catch (err) {
      // Business errors (wrong password / not linked) — do not retry.
      if (err instanceof Error && !isNetworkLikeError(err)) {
        throw err
      }
      lastNetworkError = err
      if (attempt < MAX_ATTEMPTS) {
        await sleep(1200 * attempt)
        continue
      }
    } finally {
      window.clearTimeout(timer)
    }
  }

  throw new Error(describeNetworkFailure(lastNetworkError))
}

function isNetworkLikeError(err: Error) {
  return (
    err.name === 'AbortError' ||
    err.message.includes('Failed to fetch') ||
    err.message.includes('NetworkError') ||
    err.message.includes('Load failed')
  )
}

function describeNetworkFailure(err: unknown) {
  const aborted =
    err instanceof Error && (err.name === 'AbortError' || err.message.includes('aborted'))
  if (aborted) {
    return `Timesheet API at ${PSM_API_URL} timed out. Render may be waking up — wait 30s and try again.`
  }
  return `Cannot reach Timesheet login API at ${PSM_API_URL}. Check network/CORS, or wait if Render is cold-starting, then try again.`
}

function sleep(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}

function mapPsmUser(user: PsmLoginUser): AuthUser {
  const role = mapRole(user)
  return {
    employeeId:
      user.employee_id != null && String(user.employee_id) !== ''
        ? String(user.employee_id)
        : '',
    name: user.full_name?.trim() || user.email || 'Employee',
    email: user.email || '',
    role,
    department: '—',
    manager: null,
    allowedApps: [...DEFAULT_ALLOWED_APPS],
  }
}

function mapRole(user: PsmLoginUser): UserRole {
  const code = String(user.role_code || user.rbac_role || '').toUpperCase()
  if (user.isAdmin || code === 'ADMIN') return 'admin'
  if (code.includes('MANAGER')) return 'manager'
  return 'employee'
}
