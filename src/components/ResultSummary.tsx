import { demoEdp } from '../data/demoEdp'

export function ResultSummary() {
  const { reviewed, ok, correctable, review } = demoEdp.summary
  const okPct = (ok / reviewed) * 100
  const corrPct = (correctable / reviewed) * 100
  const reviewPct = (review / reviewed) * 100

  return (
    <section aria-labelledby="demo-summary-title" className="border border-line bg-surface p-5 md:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            Resultado del precontrol
          </p>
          <h3 id="demo-summary-title" className="mt-1 text-2xl font-medium tracking-tight">
            {reviewed} líneas revisadas
          </h3>
        </div>
        <p className="max-w-sm text-sm text-muted">
          Este recuento no aprueba el Estado de Pago. Separa lo que no tiene
          observaciones detectadas de lo que conviene revisar antes de enviar.
        </p>
      </div>

      <div
        className="mt-5 flex h-3 overflow-hidden bg-paper-2"
        role="img"
        aria-label={`${ok} sin observaciones, ${correctable} corregibles, ${review} requieren revisión`}
      >
        <span className="bg-ok" style={{ width: `${okPct}%` }} />
        <span className="bg-copper" style={{ width: `${corrPct}%` }} />
        <span className="bg-block" style={{ width: `${reviewPct}%` }} />
      </div>

      <ul className="mt-5 grid gap-3 sm:grid-cols-3">
        <SummaryStat value={ok} label="Sin observaciones detectadas" tone="ok" />
        <SummaryStat value={correctable} label="Diferencias corregibles" tone="copper" />
        <SummaryStat value={review} label="Requieren revisión" tone="block" />
      </ul>
    </section>
  )
}

function SummaryStat({
  value,
  label,
  tone,
}: {
  value: number
  label: string
  tone: 'ok' | 'copper' | 'block'
}) {
  const bar = {
    ok: 'bg-ok',
    copper: 'bg-copper',
    block: 'bg-block',
  }[tone]

  return (
    <li className="border border-line bg-paper/50 px-4 py-3">
      <span className={cnDot(bar)} aria-hidden />
      <p className="mt-2 font-mono text-3xl tracking-tight text-ink">{value}</p>
      <p className="mt-1 text-sm text-ink-2">{label}</p>
    </li>
  )
}

function cnDot(color: string) {
  return `inline-block h-2 w-6 ${color}`
}
