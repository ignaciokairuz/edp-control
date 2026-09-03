import { Mail, MessageCircle } from 'lucide-react'
import { useMemo, useState } from 'react'
import { contact, mailtoHref, whatsappHref } from '../data/contact'
import { trackEvent } from '../lib/analytics'

const empty = {
  edp: '',
  frequency: '',
  review: '',
  rework: '',
  outside: '',
  share: '',
  name: '',
  company: '',
  role: '',
  email: '',
}

export function DiscoveryForm() {
  const [form, setForm] = useState(empty)
  const [started, setStarted] = useState(false)

  function update(key: keyof typeof empty, value: string) {
    if (!started) {
      setStarted(true)
      trackEvent('discovery_started')
    }
    setForm((current) => ({ ...current, [key]: value }))
  }

  const message = useMemo(() => buildMessage(form), [form])

  return (
    <section id="preguntas" className="scroll-mt-24 py-16 md:py-24">
      <div className="wrap">
        <p className="eyebrow">Discovery</p>
        <h2 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">
          ¿Esto refleja cómo trabajan hoy?
        </h2>
        <p className="mt-3 max-w-2xl text-[17px] leading-7 text-ink-2">
          Estamos validando qué parte de este control merece convertirse en
          software recurrente.
        </p>

        <form
          className="mt-10 space-y-8 border border-line bg-surface p-5 md:p-8"
          onSubmit={(event) => event.preventDefault()}
        >
          <Choice
            legend="¿Preparan Estados de Pago o certificaciones periódicas?"
            name="edp"
            value={form.edp}
            onChange={(value) => update('edp', value)}
            options={['Sí', 'No', 'Similar']}
          />
          <Choice
            legend="¿Con qué frecuencia?"
            name="frequency"
            value={form.frequency}
            onChange={(value) => update('frequency', value)}
            options={['Mensual', 'Quincenal', 'Por hito', 'Otra']}
          />
          <Choice
            legend="Antes de enviarlo, ¿se revisa contra contrato o adendas?"
            name="review"
            value={form.review}
            onChange={(value) => update('review', value)}
            options={['Sí', 'No', 'Depende']}
          />
          <Choice
            legend="¿Qué genera más retrabajo?"
            name="rework"
            value={form.rework}
            onChange={(value) => update('rework', value)}
            options={[
              'Precios/cantidades',
              'Cambios contractuales',
              'Evidencia',
              'Acumulados',
              'Formato',
              'Otro',
            ]}
          />

          <label className="grid gap-2">
            <span className="text-sm font-medium">
              ¿Qué parte del proceso sigue fuera de su ERP/portal?
            </span>
            <textarea
              className="min-h-24 border border-line bg-paper px-3 py-2 text-sm"
              value={form.outside}
              onChange={(event) => update('outside', event.target.value)}
            />
          </label>

          <Choice
            legend="¿Podrías compartir una plantilla o ejemplo anonimizado?"
            name="share"
            value={form.share}
            onChange={(value) => update('share', value)}
            options={['Sí', 'Tal vez', 'No']}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Nombre" value={form.name} onChange={(v) => update('name', v)} />
            <Field label="Empresa" value={form.company} onChange={(v) => update('company', v)} />
            <Field label="Rol" value={form.role} onChange={(v) => update('role', v)} />
            <Field
              label="Email"
              type="email"
              value={form.email}
              onChange={(v) => update('email', v)}
            />
          </div>
          <p className="text-xs text-muted">
            Nombre, empresa, rol y email son opcionales hasta que quieras enviar.
            Las respuestas no se transmiten solas: se abren WhatsApp o el correo
            de tu equipo.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              className="btn btn-primary"
              href={whatsappHref(message)}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent('discovery_whatsapp')}
            >
              <MessageCircle size={16} aria-hidden />
              Enviar respuestas por WhatsApp
            </a>
            <a
              className="btn btn-secondary"
              href={mailtoHref(message)}
              onClick={() => trackEvent('discovery_email')}
            >
              <Mail size={16} aria-hidden />
              Enviar respuestas por email
            </a>
          </div>
          <p className="text-xs text-muted">
            Se abrirá un mensaje dirigido a {contact.email} o al WhatsApp de
            Ignacio. Revisalo antes de enviarlo.
          </p>
        </form>
      </div>
    </section>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
}) {
  const id = label.toLowerCase()
  return (
    <label className="grid gap-1 text-sm" htmlFor={id}>
      <span>{label}</span>
      <input
        id={id}
        type={type}
        className="min-h-11 border border-line bg-paper px-3"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}

function Choice({
  legend,
  name,
  value,
  onChange,
  options,
}: {
  legend: string
  name: string
  value: string
  onChange: (value: string) => void
  options: string[]
}) {
  return (
    <fieldset>
      <legend className="text-sm font-medium">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = value === option
          return (
            <label
              key={option}
              className={
                selected
                  ? 'cursor-pointer border border-ink bg-ink px-3 py-2 text-sm text-surface'
                  : 'cursor-pointer border border-line bg-paper px-3 py-2 text-sm'
              }
            >
              <input
                type="radio"
                className="sr-only"
                name={name}
                value={option}
                checked={selected}
                onChange={() => onChange(option)}
              />
              {option}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

function buildMessage(form: typeof empty) {
  return [
    'Consulta — Precontrol de Estados de Pago',
    '',
    `¿Preparan EDP o certificaciones?: ${form.edp || '—'}`,
    `Frecuencia: ${form.frequency || '—'}`,
    `¿Se revisa contra contrato/adendas?: ${form.review || '—'}`,
    `Mayor retrabajo: ${form.rework || '—'}`,
    `Fuera del ERP/portal: ${form.outside || '—'}`,
    `¿Puede compartir plantilla anonimizada?: ${form.share || '—'}`,
    '',
    `Nombre: ${form.name || '—'}`,
    `Empresa: ${form.company || '—'}`,
    `Rol: ${form.role || '—'}`,
    `Email: ${form.email || '—'}`,
  ].join('\n')
}
