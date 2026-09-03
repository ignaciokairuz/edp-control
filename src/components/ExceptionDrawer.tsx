import { X } from 'lucide-react'
import { useEffect, useId, useRef } from 'react'
import type { DemoException } from '../data/demoEdp'
import { DocumentEvidencePanel } from './DocumentEvidencePanel'
import { StatusBadge } from './StatusBadge'

export function ExceptionDrawer({
  item,
  onClose,
}: {
  item: DemoException | null
  onClose: () => void
}) {
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!item) return
    const previous = document.activeElement
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      if (previous instanceof HTMLElement) previous.focus()
    }
  }, [item, onClose])

  if (!item) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-ink/40"
        aria-label="Cerrar panel de trazabilidad"
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex h-full w-full max-w-xl flex-col overflow-y-auto border-l border-line bg-surface shadow-2xl"
      >
        <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-surface px-5 py-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              Trazabilidad · línea {item.lineId}
            </p>
            <h3 id={titleId} className="mt-1 text-lg font-medium tracking-tight">
              Por qué se marcó
            </h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="btn btn-secondary px-2.5"
            onClick={onClose}
            aria-label="Cerrar"
          >
            <X size={16} />
          </button>
        </header>

        <div className="space-y-5 px-5 py-5">
          <StatusBadge tone={item.tone} label={item.statusLabel} />
          <p className="text-[15px] leading-6 text-ink-2">{item.why}</p>

          <dl className="grid gap-3 border border-line bg-paper/70 p-4 text-sm">
            <Row term="Regla" value={item.rule} />
            <Row term="EDP" value={item.edpValue} />
            <Row term="Fuente" value={item.sourceLabel} />
            <Row term="Valor encontrado" value={item.sourceValue} />
            <Row term="Confianza" value={item.confidence} />
            <Row term="Documento" value={item.documentName} />
            <Row term="Referencia" value={item.reference} />
          </dl>

          <DocumentEvidencePanel item={item} />

          <div className="border-l-2 border-copper bg-copper-soft/50 px-4 py-3 text-sm text-ink-2">
            Acción sugerida: {item.action}
          </div>

          <p className="text-xs leading-5 text-muted">
            Esta demo no determina aprobación contractual. Presenta diferencias
            para revisión humana. El documento mostrado es sintético y no
            corresponde a un contrato real.
          </p>
        </div>
      </aside>
    </div>
  )
}

function Row({ term, value }: { term: string; value: string }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-4">
      <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
        {term}
      </dt>
      <dd className="text-ink">{value}</dd>
    </div>
  )
}
