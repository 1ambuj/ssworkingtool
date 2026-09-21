export type AppId =
  | 'psm'
  | 'learning'
  | 'epdf-book'
  | 'pdf-studio'
  | 'youtube-downloader'
  | 'pdf-redaction'
  | 'task-tracker'
  | 'documents'
  | 'ai-assistant'

export type UserRole = 'employee' | 'manager' | 'admin'

export interface AuthUser {
  employeeId: string
  name: string
  email: string
  role: UserRole
  department: string
  manager: string | null
  allowedApps: AppId[]
}

export interface AuthSession {
  token: string
  user: AuthUser
}

export interface LoginCredentials {
  email: string
  password: string
}
