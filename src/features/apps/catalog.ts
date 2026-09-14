import type { AppId } from '@/types/auth'
import { PSM_APP_URL } from '@/lib/psm-config'

export interface CatalogApp {
  id: AppId
  name: string
  description: string
  url: string
}

export const catalog: CatalogApp[] = [
  {
    id: 'psm',
    name: 'SSA Intersoft',
    description: 'Timesheets, client work, and day-to-day firm workflows.',
    url: PSM_APP_URL,
  },
  {
    id: 'learning',
    name: 'Learning',
    description: 'Assigned courses and skill development for your role.',
    url: 'http://192.168.1.198:8000/',
  },
  {
    id: 'task-tracker',
    name: 'Task Tracker',
    description: 'Track assigned work and delivery status across teams.',
    url: '#',
  },
  {
    id: 'documents',
    name: 'Documents',
    description: 'Firm documents and shared files in one place.',
    url: '#',
  },
  {
    id: 'ai-assistant',
    name: 'AI Assistant',
    description: 'Drafting and research support for everyday tasks.',
    url: '#',
  },
]

export function getAllowedApps(allowedApps: AppId[] | undefined): CatalogApp[] {
  if (!allowedApps?.length) return []
  return catalog.filter((app) => allowedApps.includes(app.id))
}
