import { ArrowDown } from 'lucide-react'
import { demoEdp } from '../data/demoEdp'
import { trackEvent } from '../lib/analytics'
import { scrollToId } from '../lib/scroll'
import { StatusBadge } from './StatusBadge'

export function Hero() {
  return (
    <section className="bg-graphite text-[#f3efe8]">
      <div className="wrap-wide grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-copper-2">
            Precontrol de Estados de Pago
          </p>
          <h1 className="mt-4 max-w-xl text-4xl font-medium leading-[1.12] tracking-tight md:text-5xl">
            Encontrá diferencias antes de enviar tu Estado de Pago.
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-7 text-[#c8c2b8]">
            Contrastá EDP, contrato, adendas y respaldo técnico para detectar
            inconsistencias antes de entrar en otro ciclo de revisión.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              className="btn btn-on-dark"
              onClick={() => {
                trackEvent('hero_demo_click')
                scrollToId('demo')
              }}
            >
              Probar con un ejemplo
              <ArrowDown size={16} aria-hidden />
            </button>
            <button
              type="button"
              className="btn btn-ghost-dark"
              onClick={() => {
                trackEvent('implementation_view', { source: 'hero' })
                scrollToId('implementacion')
              }}
            >
              Ver qué hace falta para implementarlo
            </button>
          </div>
          <p className="mt-5 max-w-lg text-sm leading-6 text-[#9aa3ad]">
            Sin reemplazar tu ERP. Sin credenciales del portal. El primer piloto
            puede realizarse sobre archivos que ya utilizás.
          </p>
        </div>

        <HeroPreview />
      </div>
    </section>
  )
}

function HeroPreview() {
  const { summary } = demoEdp
  const preview = demoEdp.exceptions.slice(0, 2)

  return (
    <div className="border border-white/10 bg-graphite-2 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.35)] md:p-5">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-copper-2">
            Precontrol · OS-184
          </p>
          <p className="mt-1 text-sm text-[#d8d2c8]">Andes Servicios · agosto 2026</p>
        </div>
        <span className="border border-white/15 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#c8c2b8]">
          Datos simulados
        </span>
      </div>

      <p className="mt-5 font-mono text-3xl tracking-tight">
        {summary.reviewed}{' '}
        <span className="text-base text-[#9aa3ad]">líneas revisadas</span>
      </p>

      <div
        className="mt-4 flex h-2 overflow-hidden bg-white/10"
        role="img"
        aria-label="Resumen visual del precontrol"
      >
        <span className="bg-[#3d8f68]" style={{ width: `${(summary.ok / summary.reviewed) * 100}%` }} />
        <span className="bg-copper-2" style={{ width: `${(summary.correctable / summary.reviewed) * 100}%` }} />
        <span className="bg-[#c45a5a]" style={{ width: `${(summary.review / summary.reviewed) * 100}%` }} />
      </div>

      <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <MiniStat value={summary.ok} label="Sin observaciones detectadas" />
        <MiniStat value={summary.correctable} label="Corregibles" />
        <MiniStat value={summary.review} label="Requieren revisión" />
      </ul>

      <div className="mt-5 border border-white/10">
        {preview.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between gap-3 border-b border-white/10 px-3 py-3 last:border-b-0"
          >
            <div className="min-w-0">
              <p className="font-mono text-[11px] text-[#9aa3ad]">Línea {item.lineId}</p>
              <p className="truncate text-sm">{item.concept}</p>
              <p className="mt-1 font-mono text-[11px] text-[#c8c2b8]">
                {item.edpValue} → {item.sourceValue}
              </p>
            </div>
            <StatusBadge tone={item.tone} label={item.statusLabel} compact />
          </div>
        ))}
      </div>
    </div>
  )
}

function MiniStat({ value, label }: { value: number; label: string }) {
  return (
    <li className="border border-white/10 px-2 py-3 text-left">
      <p className="font-mono text-2xl">{value}</p>
      <p className="mt-1 text-[11px] leading-4 text-[#9aa3ad]">{label}</p>
    </li>
  )
}
