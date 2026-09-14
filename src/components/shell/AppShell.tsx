import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/shell/Sidebar'

export function AppShell() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="min-w-0 flex-1 overflow-auto p-6 md:p-10">
        <div className="animate-fade-up">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
