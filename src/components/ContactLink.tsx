import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { contact, mailtoHref, whatsappHref } from '../data/contact'
import { trackEvent } from '../lib/analytics'

export const contactDraft = 'Hola Ignacio. Vi EDP Control y quiero ver si puede servir para nuestro proceso de Estados de Pago.'
export const findingDraft = 'Hola Ignacio, vi el ejemplo de EDP Control. Tuvimos un caso parecido y quiero contarte qué nos hicieron corregir.'

export function ContactLink({ children, source, channel = 'whatsapp', draft = contactDraft, className = 'btn btn-primary', ariaLabel, iconOnly = false }: {
  children: ReactNode; source: string; channel?: 'whatsapp' | 'email' | 'calendar'; draft?: string; className?: string; ariaLabel?: string; iconOnly?: boolean
}) {
  const href = channel === 'calendar' ? contact.calendarUrl : channel === 'email' ? mailtoHref(draft) : whatsappHref(draft)
  return <a className={className} href={href} aria-label={ariaLabel} title={iconOnly ? 'WhatsApp' : undefined} target={channel === 'email' ? undefined : '_blank'} rel={channel === 'email' ? undefined : 'noopener noreferrer'} onClick={() => trackEvent(channel === 'calendar' ? 'calendar_click' : 'pilot_contact_click', { source, channel })}>
    {children}{iconOnly ? null : <ArrowUpRight size={17} aria-hidden />}
  </a>
}
