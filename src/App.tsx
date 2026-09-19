import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '@/components/shell/AppShell'
import { PlaceholderPage } from '@/components/PlaceholderPage'
import { AppsPage } from '@/features/apps/AppsPage'
import { PdfStudioPage } from '@/features/apps/PdfStudioPage'
import { YoutubeDownloaderPage } from '@/features/apps/YoutubeDownloaderPage'
import { PdfRedactionPage } from '@/features/apps/PdfRedactionPage'
import { AuthProvider } from '@/features/auth/AuthContext'
import { LoginPage } from '@/features/auth/LoginPage'
import { ProtectedRoute } from '@/features/auth/ProtectedRoute'
import { HomePage } from '@/features/dashboard/HomePage'
import { SettingsPage } from '@/features/settings/SettingsPage'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<AppShell />}>
              <Route index element={<HomePage />} />
              <Route path="tools" element={<AppsPage />} />
              <Route path="tools/pdf-studio" element={<PdfStudioPage />} />
              <Route
                path="tools/youtube-downloader"
                element={<YoutubeDownloaderPage />}
              />
              <Route
                path="tools/pdf-redaction"
                element={<PdfRedactionPage />}
              />
              <Route path="apps" element={<Navigate to="/tools" replace />} />
              <Route
                path="apps/pdf-studio"
                element={<Navigate to="/tools/pdf-studio" replace />}
              />
              <Route
                path="apps/youtube-downloader"
                element={<Navigate to="/tools/youtube-downloader" replace />}
              />
              <Route
                path="apps/pdf-redaction"
                element={<Navigate to="/tools/pdf-redaction" replace />}
              />
              <Route path="settings" element={<SettingsPage />} />
              <Route
                path="admin/registry"
                element={
                  <PlaceholderPage
                    title="Software Registry"
                    description="Admin area for managing company apps. We will build this next."
                  />
                }
              />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
