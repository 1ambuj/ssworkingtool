const SESSION_KEY = 'coreworkspace.session'
const TIMESHEET_TOKEN_KEY = 'ts_token'
const TIMESHEET_USER_KEY = 'ts_user'

export const PSM_API_URL =
  import.meta.env.VITE_PSM_API_URL || 'http://localhost:5000/api'

const DEPLOYED_INTERSOFT_URL = 'https://ssa-time-sheet.vercel.app'
const configuredAppUrl = import.meta.env.VITE_PSM_APP_URL
export const PSM_APP_URL =
  configuredAppUrl && !configuredAppUrl.includes('localhost')
    ? configuredAppUrl
    : DEPLOYED_INTERSOFT_URL

export { SESSION_KEY, TIMESHEET_TOKEN_KEY, TIMESHEET_USER_KEY }
