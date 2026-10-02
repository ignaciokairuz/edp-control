import { useEffect, useId, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'

export function ProductDialog({ title, children, onClose, className = '' }: {
  title: string; children: ReactNode; onClose: () => void; className?: string
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  useEffect(() => {
    const dialog = ref.current!
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const overflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    dialog.querySelector<HTMLElement>('h2')?.focus()
    return () => {
      dialog.close()
      document.body.style.overflow = overflow
      if (trigger?.isConnected) trigger.focus({ preventScroll: true })
    }
  }, [])

  return <dialog ref={ref} className={`product-dialog ${className}`} aria-modal="true" aria-labelledby={titleId}
    onCancel={event => { event.preventDefault(); onClose() }}
    onClick={event => { if (event.target === event.currentTarget) onClose() }}
    onKeyDown={event => {
      if (event.key !== 'Tab') return
      const controls = [...event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]')].filter(node => node.tabIndex >= 0 && node.getClientRects().length > 0)
      const first = controls[0], last = controls.at(-1)
      if (event.shiftKey && (document.activeElement === first || document.activeElement?.tagName === 'H2')) { event.preventDefault(); last?.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }}>
    <div className="dialog-shell">
      <header className="dialog-header"><h2 id={titleId} tabIndex={-1}>{title}</h2><button type="button" className="quiet-action" onClick={onClose} aria-label={`Cerrar ${title.toLowerCase()}`}>Cerrar <X size={20} aria-hidden /></button></header>
      {children}
    </div>
  </dialog>
}
