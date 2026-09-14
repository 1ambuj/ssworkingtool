import { Outlet } from 'react-router-dom'
import { Footer } from '@/components/shell/Footer'
import { TopBar } from '@/components/shell/TopBar'

export function AppShell() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <main className="min-w-0 flex-1">
        <div className="animate-fade-up">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}
