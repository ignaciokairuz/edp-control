import { Calendar, Mail, MessageCircle } from 'lucide-react'
import { LinkedInIcon } from './LinkedInIcon'
import { contact, mailtoHref, whatsappHref } from '../data/contact'
import { trackEvent } from '../lib/analytics'
import { scrollToId } from '../lib/scroll'

export function FinalCTA() {
  return (
    <section className="bg-graphite py-16 text-[#f3efe8] md:py-20">
      <div className="wrap">
        <h2 className="max-w-3xl text-3xl font-medium tracking-tight md:text-4xl">
          Probemos el proceso, no una presentación.
        </h2>
        <p className="mt-4 max-w-2xl text-[17px] leading-7 text-[#c8c2b8]">
          Si administrás Estados de Pago, podemos empezar con una plantilla o
          paquete anonimizado y reconstruir juntos qué controles son
          automatizables.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            className="btn btn-on-dark"
            onClick={() => scrollToId('preguntas')}
          >
            Probar con un caso real
          </button>
          <a
            className="btn btn-ghost-dark"
            href={contact.calendarUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent('calendar_click', { source: 'final_cta' })}
          >
            <Calendar size={16} aria-hidden />
            Agendar 20 minutos
          </a>
        </div>
        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <a
            className="inline-flex items-center gap-2 text-[#d8d2c8] hover:text-white"
            href={whatsappHref('Hola Ignacio, quiero evaluar un caso anonimizado de precontrol de EDP.')}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent('whatsapp_click', { source: 'final_cta' })}
          >
            <MessageCircle size={16} aria-hidden />
            WhatsApp
          </a>
          <a
            className="inline-flex items-center gap-2 text-[#d8d2c8] hover:text-white"
            href={mailtoHref('Quiero evaluar un caso anonimizado de precontrol de EDP.')}
            onClick={() => trackEvent('email_click', { source: 'final_cta' })}
          >
            <Mail size={16} aria-hidden />
            Email
          </a>
          <a
            className="inline-flex items-center gap-2 text-[#d8d2c8] hover:text-white"
            href={contact.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent('linkedin_click', { source: 'final_cta' })}
          >
            <LinkedInIcon />
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
