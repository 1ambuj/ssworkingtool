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
  accessNote?: string
}

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
    accessNote: 'Single sign-on',
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
    accessNote: 'LAN access',
  },
  {
    id: 'task-tracker',
    name: 'Task Tracker',
    tagline: 'Work status across teams',
    description: 'Track assigned delivery work in one place.',
    actions: [],
    details: [],
    url: '#',
    status: 'soon',
  },
  {
    id: 'documents',
    name: 'Documents',
    tagline: 'Files & PDF tools',
    description: 'Shared firm documents, PDF merge, and file helpers.',
    actions: [],
    details: [],
    url: '#',
    status: 'soon',
  },
  {
    id: 'ai-assistant',
    name: 'AI Assistant',
    tagline: 'Drafting help',
    description: 'Drafting and research support for everyday firm writing.',
    actions: [],
    details: [],
    url: '#',
    status: 'soon',
  },
]

export function getAllowedApps(allowedApps: AppId[] | undefined): CatalogApp[] {
  if (!allowedApps?.length) return []
  return catalog.filter((app) => allowedApps.includes(app.id))
}

export function getCatalogApp(id: AppId) {
  return catalog.find((app) => app.id === id)
}
