import type { AppId } from '@/types/auth'
import { PSM_APP_URL } from '@/lib/psm-config'

export interface CatalogApp {
  id: AppId
  name: string
  tagline: string
  description: string
  /** Concrete things an employee can do today */
  actions: string[]
  details: string[]
  url: string
  status: 'live' | 'soon'
  /** Web opens in browser; desktop uses download page in portal */
  kind: 'web' | 'desktop'
  accessNote?: string
}

/** Live firm tools only — placeholders removed to avoid duplicate PDF messaging */
export const catalog: CatalogApp[] = [
  {
    id: 'psm',
    name: 'SSA Intersoft',
    tagline: 'Daily firm work',
    description:
      'Log time, update client work, and follow tasks — your main day-to-day system.',
    actions: [
      'Fill or update today’s timesheet',
      'Check client / engagement status',
      'See assigned tasks and deadlines',
    ],
    details: [
      'Opens already signed in from CoreWorkspace',
      'Same SSA Intersoft email and password',
    ],
    url: PSM_APP_URL,
    status: 'live',
    kind: 'web',
    accessNote: 'Single sign-on',
  },
  {
    id: 'pdf-studio',
    name: 'SSA PDF Studio',
    tagline: 'Merge, convert & compress',
    description:
      'Desktop PDF toolkit for merge, split, Word/Excel export, compression, and batch jobs.',
    actions: [
      'Merge multiple PDFs',
      'Convert to Word or Excel',
      'Compress and split files',
    ],
    details: [
      'Install once on Windows (Mac build coming)',
      'Download from CoreWorkspace — no second login',
    ],
    url: '/apps/pdf-studio',
    status: 'live',
    kind: 'desktop',
    accessNote: 'Desktop download',
  },
  {
    id: 'learning',
    name: 'Learning',
    tagline: 'Courses for your role',
    description:
      'Open assigned courses and continue skill training on the firm network.',
    actions: [
      'Open courses assigned to your role',
      'Continue unfinished learning paths',
      'Track progress on the LAN portal',
    ],
    details: [
      'Works on the office / LAN network',
      'SSO from CoreWorkspace coming next',
    ],
    url: 'http://192.168.1.198:8000/',
    status: 'live',
    kind: 'web',
    accessNote: 'LAN access',
  },
]

export const DEFAULT_ALLOWED_APPS: AppId[] = ['psm', 'pdf-studio', 'learning']

export function getAllowedApps(allowedApps: AppId[] | undefined): CatalogApp[] {
  if (!allowedApps?.length) return []
  return catalog.filter((app) => allowedApps.includes(app.id))
}

export function getCatalogApp(id: AppId) {
  return catalog.find((app) => app.id === id)
}
