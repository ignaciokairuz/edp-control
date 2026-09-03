import { Calendar, Mail, MessageCircle } from 'lucide-react'
import { LinkedInIcon } from './LinkedInIcon'
import { contact, mailtoHref, whatsappHref } from '../data/contact'
import { trackEvent } from '../lib/analytics'
import { usePrivacy } from './PrivacyModal'

export function Footer() {
  const { openPrivacy } = usePrivacy()

  return (
    <footer id="contacto" className="scroll-mt-24 border-t border-line bg-surface py-14">
      <div className="wrap grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-sm font-medium">{contact.owner}</p>
          <p className="mt-1 text-lg font-medium">{contact.brand}</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-ink-2">
            {contact.brandDescriptor}
          </p>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted">
            {contact.footerLine}
          </p>
          <p className="mt-6 max-w-lg text-xs leading-5 text-muted">
            Proyecto independiente. No afiliado ni respaldado por ninguna
            operadora minera, plataforma de procurement o organismo público
            mencionado como referencia.
          </p>
        </div>

        <ul className="space-y-3 text-sm">
          <li>
            <a
              className="inline-flex items-center gap-2 hover:text-copper"
              href={mailtoHref()}
              onClick={() => trackEvent('email_click', { source: 'footer' })}
            >
              <Mail size={16} aria-hidden />
              {contact.email}
            </a>
          </li>
          <li>
            <a
              className="inline-flex items-center gap-2 hover:text-copper"
              href={whatsappHref()}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent('whatsapp_click', { source: 'footer' })}
            >
              <MessageCircle size={16} aria-hidden />
              WhatsApp {contact.whatsappDisplay}
            </a>
          </li>
          <li>
            <a
              className="inline-flex items-center gap-2 hover:text-copper"
              href={contact.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent('linkedin_click', { source: 'footer' })}
            >
              <LinkedInIcon />
              LinkedIn · {contact.linkedinLabel}
            </a>
          </li>
          <li>
            <a
              className="inline-flex items-center gap-2 hover:text-copper"
              href={contact.calendarUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent('calendar_click', { source: 'footer' })}
            >
              <Calendar size={16} aria-hidden />
              Agendar conversación
            </a>
          </li>
          <li>
            <button
              type="button"
              className="text-left text-muted underline underline-offset-2 hover:text-ink"
              onClick={openPrivacy}
            >
              Privacidad de la demo
            </button>
          </li>
        </ul>
      </div>
    </footer>
  )
}
