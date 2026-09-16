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
  token?: string
  user?: PsmLoginUser
}

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

  let response: Response
  try {
    response = await fetch(`${PSM_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        login_type: 'employee',
      }),
    })
  } catch {
    throw new Error(
      `Cannot reach Timesheet login API at ${PSM_API_URL}. Start the Timesheet API and try again.`,
    )
  }

  const data = (await response.json().catch(() => null)) as PsmLoginResponse | null

  if (!response.ok || !data?.success || !data.token || !data.user) {
    throw new Error(data?.message || 'Invalid email or password.')
  }

  return {
    token: data.token,
    user: mapPsmUser(data.user),
  }
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
