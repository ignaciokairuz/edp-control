export const contact = {
  owner: 'Ignacio Kairuz',
  brand: 'Kairuz Mining Systems',
  product: 'EDP Control',
  brandDescriptor:
    'Software para reducir trabajo manual y excepciones en workflows mineros.',
  footerLine: 'Software y automatización de workflows para minería.',
  email: 'jobs@ignaciokairuz.com.ar',
  whatsappDisplay: '+54 9 11 6787-8072',
  whatsappE164: '5491167878072',
  linkedinUrl: 'https://www.linkedin.com/in/ignaciokairuz/',
  linkedinLabel: 'Ignacio Kairuz',
  calendarUrl:
    'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ349d88JI9jA10sOxbtrVFbrO3eNR-mNfmjISd_8dyE9yVXpvAsbPrti2KOyly6nVv9s8OlKRaf',
  emailSubject: 'Consulta — Precontrol de Estados de Pago',
  siteUrl: 'https://ignaciokairuz.github.io/edp-control/',
} as const

export function whatsappHref(text?: string) {
  const base = `https://wa.me/${contact.whatsappE164}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

export function mailtoHref(body?: string) {
  const subject = encodeURIComponent(contact.emailSubject)
  const extra = body ? `&body=${encodeURIComponent(body)}` : ''
  return `mailto:${contact.email}?subject=${subject}${extra}`
}
