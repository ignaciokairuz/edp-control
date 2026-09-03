import { trackEvent } from '../lib/analytics'
import { scrollToId } from '../lib/scroll'

const inputs = [
  {
    n: '01',
    title: 'Un Estado de Pago anonimizado',
    text: 'Puede ser un XLSX real con nombres o importes sensibles redactados si fuera necesario.',
  },
  {
    n: '02',
    title: 'Contrato u orden de servicio',
    text: 'Sólo las secciones necesarias para reconstruir reglas de validación.',
  },
  {
    n: '03',
    title: 'Adendas o cambios relevantes',
    text: 'Para entender cómo se versionan precios, cantidades y alcance.',
  },
  {
    n: '04',
    title: 'Estructura de la evidencia',
    text: 'No necesariamente archivos sensibles. Puede comenzar con un índice de respaldos esperados.',
  },
]

const stages = [
  {
    title: 'Etapa 1 — Reconstruimos el control actual',
    text: 'Identificamos qué reglas revisa hoy el equipo.',
  },
  {
    title: 'Etapa 2 — Corremos en paralelo',
    text: 'No modificamos el circuito oficial.',
  },
  {
    title: 'Etapa 3 — Medimos',
    text: 'Comparamos tiempo de preparación y revisión, observaciones preventibles, correcciones y casos que siguen pidiendo decisión humana.',
  },
  {
    title: 'Etapa 4 — Decidimos',
    text: 'Si el resultado justifica el costo, se define producto o integración.',
  },
  {
    title: 'Etapa 5 — Integramos sólo donde tenga ROI',
    text: 'ERP, procurement, documentos u otras fuentes mediante mecanismos autorizados.',
  },
]

export function ImplementationSection() {
  return (
    <section id="implementacion" className="scroll-mt-24 bg-graphite py-16 text-[#f3efe8] md:py-24">
      <div className="wrap">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-copper-2">
          Implementación
        </p>
        <h2 className="mt-3 max-w-3xl text-3xl font-medium tracking-tight md:text-4xl">
          ¿Qué hace falta para probarlo en tu empresa?
        </h2>
        <p className="mt-4 max-w-2xl text-[17px] leading-7 text-[#c8c2b8]">
          Para un primer piloto no necesitás cambiar tu ERP ni darnos acceso a
          sistemas.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {inputs.map((item) => (
            <article key={item.n} className="border border-white/10 bg-graphite-2 p-5">
              <p className="font-mono text-[11px] text-copper-2">{item.n}</p>
              <h3 className="mt-2 text-lg font-medium">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#c8c2b8]">{item.text}</p>
            </article>
          ))}
        </div>

        <ol className="mt-10 space-y-3">
          {stages.map((stage) => (
            <li key={stage.title} className="border border-white/10 px-5 py-4">
              <h3 className="font-medium">{stage.title}</h3>
              <p className="mt-1 text-sm leading-6 text-[#c8c2b8]">{stage.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10">
          <button
            type="button"
            className="btn btn-on-dark min-h-12 px-6 text-base"
            onClick={() => {
              trackEvent('implementation_view', { source: 'cta' })
              scrollToId('preguntas')
            }}
          >
            Quiero probarlo con un EDP real
          </button>
          <p className="mt-3 text-sm text-[#9aa3ad]">
            No hace falta compartir credenciales del portal para evaluar el
            primer caso.
          </p>
        </div>
      </div>
    </section>
  )
}
