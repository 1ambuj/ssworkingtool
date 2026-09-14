import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { clearSession, loadSession, saveSession } from '@/lib/auth-storage'
import { loginWithPsm } from '@/lib/psm-auth'
import { clearTimesheetSession, handoffTimesheetSession } from '@/lib/timesheet-handoff'
import type { AuthSession, AuthUser, LoginCredentials } from '@/types/auth'

interface AuthContextValue {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(() => loadSession())
  const [isLoading, setIsLoading] = useState(false)

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true)
    try {
      const next = await loginWithPsm(credentials)
      saveSession(next)
      handoffTimesheetSession(next.token, next.user)
      setSession(next)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    clearSession()
    clearTimesheetSession()
    setSession(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      token: session?.token ?? null,
      isAuthenticated: Boolean(session?.token),
      isLoading,
      login,
      logout,
    }),
    [session, isLoading, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return ctx
}
