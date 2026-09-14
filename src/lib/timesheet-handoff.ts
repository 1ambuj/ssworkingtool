import { PSM_APP_URL, TIMESHEET_TOKEN_KEY, TIMESHEET_USER_KEY } from '@/lib/psm-config'
import type { AuthUser } from '@/types/auth'

/**
 * Timesheet already reads these keys (`ts_token`, `ts_user`).
 * Same browser + same origin would be enough. Different ports need the hash handoff.
 */
export function handoffTimesheetSession(token: string, user: AuthUser) {
  const payload = {
    email: user.email,
    full_name: user.name,
    employee_id: user.employeeId ? Number(user.employeeId) : null,
    role_code: user.role.toUpperCase(),
    isAdmin: user.role === 'admin',
  }

  localStorage.setItem(TIMESHEET_TOKEN_KEY, token)
  localStorage.setItem(TIMESHEET_USER_KEY, JSON.stringify(payload))
}

export function clearTimesheetSession() {
  localStorage.removeItem(TIMESHEET_TOKEN_KEY)
  localStorage.removeItem(TIMESHEET_USER_KEY)
}

export function buildTimesheetOpenUrl(token: string) {
  const base = PSM_APP_URL.replace(/\/$/, '')
  return `${base}/dashboard#sso=${encodeURIComponent(token)}`
}
