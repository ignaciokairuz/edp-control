import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { contact, mailtoHref, whatsappHref } from '../data/contact'
import { trackEvent } from '../lib/analytics'

export const contactDraft = 'Hola Ignacio, vi el ejemplo de EDP Control. Quiero ver si sirve para revisar nuestros Estados de Pago antes de enviarlos. Podemos empezar por una plantilla sin datos sensibles.'
export const findingDraft = 'Hola Ignacio, vi el ejemplo de EDP Control. Tuvimos un caso parecido y quiero contarte qué nos hicieron corregir.'

export function ContactLink({ children, source, channel = 'whatsapp', draft = contactDraft, className = 'btn btn-primary' }: {
  children: ReactNode; source: string; channel?: 'whatsapp' | 'email' | 'calendar'; draft?: string; className?: string
}) {
  const href = channel === 'calendar' ? contact.calendarUrl : channel === 'email' ? mailtoHref(draft) : whatsappHref(draft)
  return <a className={className} href={href} target={channel === 'email' ? undefined : '_blank'} rel={channel === 'email' ? undefined : 'noopener noreferrer'} onClick={() => trackEvent(channel === 'calendar' ? 'calendar_click' : 'pilot_contact_click', { source, channel })}>
    {children}<ArrowUpRight size={17} aria-hidden />
  </a>
}
