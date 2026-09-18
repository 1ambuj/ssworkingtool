import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

/**
 * Timesheet may have left a service worker on localhost:5173.
 * That can make the normal tab behave differently from Incognito.
 */
async function clearStaleWorkers() {
  if (!('serviceWorker' in navigator)) return
  const regs = await navigator.serviceWorker.getRegistrations()
  await Promise.all(regs.map((reg) => reg.unregister()))
  if ('caches' in window) {
    const keys = await caches.keys()
    await Promise.all(keys.map((key) => caches.delete(key)))
  }
}

async function start() {
  try {
    await clearStaleWorkers()
  } catch {
    // ignore — app should still boot
  }

  // Never treat the portal as an editable document
  document.designMode = 'off'
  document.body?.removeAttribute('contenteditable')

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

void start()
