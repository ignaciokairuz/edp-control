type EventName =
  | 'hero_demo_click'
  | 'demo_run'
  | 'exception_open'
  | 'upload_started'
  | 'upload_success'
  | 'implementation_view'
  | 'discovery_started'
  | 'discovery_whatsapp'
  | 'discovery_email'
  | 'calendar_click'
  | 'whatsapp_click'
  | 'email_click'
  | 'linkedin_click'

type EventMetadata = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    gtag?: (
      command: 'event',
      name: string,
      params?: Record<string, unknown>,
    ) => void
  }
}

export function trackEvent(name: EventName, metadata: EventMetadata = {}) {
  const safe = Object.fromEntries(
    Object.entries(metadata).filter(([, value]) => value !== undefined),
  )

  if (import.meta.env.DEV) {
    console.debug('[analytics]', name, safe)
  }

  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, safe)
  }
}
