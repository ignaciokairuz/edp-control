import { ChevronRight } from 'lucide-react'
import type { DemoException } from '../data/demoEdp'
import { demoEdp } from '../data/demoEdp'
import { StatusBadge } from './StatusBadge'

export function ExceptionTable({
  onOpen,
}: {
  onOpen: (item: DemoException) => void
}) {
  return (
    <section aria-labelledby="exceptions-title">
      <div className="mb-3">
        <h3 id="exceptions-title" className="text-xl font-medium tracking-tight">
          Paso 3 — Tabla de excepciones
        </h3>
        <p className="mt-1 text-sm text-muted">
          Cinco diferencias sobre el caso de ejemplo. Hacé clic para ver la
          fuente utilizada.
        </p>
      </div>

      <div className="hidden overflow-x-auto border border-line bg-surface md:block">
        <table className="w-full min-w-[980px] border-collapse text-left text-sm">
          <thead className="bg-paper-2/80 text-[11px] uppercase tracking-[0.12em] text-muted">
            <tr>
              <th className="px-3 py-3 font-medium">Línea</th>
              <th className="px-3 py-3 font-medium">Concepto</th>
              <th className="px-3 py-3 font-medium">Valor EDP</th>
              <th className="px-3 py-3 font-medium">Valor fuente</th>
              <th className="px-3 py-3 font-medium">Regla</th>
              <th className="px-3 py-3 font-medium">Estado</th>
              <th className="px-3 py-3 font-medium">Acción</th>
            </tr>
          </thead>
          <tbody>
            {demoEdp.exceptions.map((item) => (
              <tr
                key={item.id}
                className="cursor-pointer border-t border-line align-top hover:bg-paper/80"
                onClick={() => onOpen(item)}
              >
                <td className="px-3 py-3 font-mono text-xs text-ink">{item.lineId}</td>
                <td className="px-3 py-3 text-ink">{item.concept}</td>
                <td className="px-3 py-3 font-mono text-xs">{item.edpValue}</td>
                <td className="px-3 py-3 font-mono text-xs">{item.sourceValue}</td>
                <td className="px-3 py-3 text-ink-2">{item.rule}</td>
                <td className="px-3 py-3">
                  <StatusBadge tone={item.tone} label={item.statusLabel} compact />
                </td>
                <td className="px-3 py-3">
                  <p className="max-w-[220px] text-xs leading-5 text-ink-2">{item.action}</p>
                  <button
                    type="button"
                    className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-copper hover:underline"
                    onClick={(event) => {
                      event.stopPropagation()
                      onOpen(item)
                    }}
                  >
                    Ver trazabilidad
                    <ChevronRight size={14} aria-hidden />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="grid gap-3 md:hidden">
        {demoEdp.exceptions.map((item) => (
          <li key={item.id} className="border border-line bg-surface p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="font-mono text-xs text-muted">Línea {item.lineId}</p>
              <StatusBadge tone={item.tone} label={item.statusLabel} compact />
            </div>
            <p className="mt-2 font-medium text-ink">{item.concept}</p>
            <dl className="mt-3 space-y-1.5 text-sm">
              <div>
                <dt className="text-muted">Valor EDP</dt>
                <dd className="font-mono text-xs">{item.edpValue}</dd>
              </div>
              <div>
                <dt className="text-muted">Valor fuente</dt>
                <dd className="font-mono text-xs">{item.sourceValue}</dd>
              </div>
              <div>
                <dt className="text-muted">Regla</dt>
                <dd>{item.rule}</dd>
              </div>
              <div>
                <dt className="text-muted">Acción</dt>
                <dd>{item.action}</dd>
              </div>
            </dl>
            <p className="mt-3 text-sm text-ink-2">{item.message}</p>
            <button
              type="button"
              className="btn btn-secondary mt-4 w-full"
              onClick={() => onOpen(item)}
            >
              Ver trazabilidad
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
