import { X } from 'lucide-react'
import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react'

import { PrivacyContext } from '../lib/privacy'

export function PrivacyProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const openPrivacy = useCallback(() => setOpen(true), [])
  const closePrivacy = useCallback(() => setOpen(false), [])
  return <PrivacyContext.Provider value={{ openPrivacy }}>{children}<PrivacyModal open={open} onClose={closePrivacy} /></PrivacyContext.Provider>
}

function PrivacyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  useEffect(() => {
    const dialog = dialogRef.current
    if (!open || !dialog) return
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      trigger?.focus()
    }
  }, [open])
  return <dialog ref={dialogRef} className="privacy-dialog" aria-labelledby={titleId} onKeyDown={event => {
    if (event.key !== 'Tab') return
    const controls = [...event.currentTarget.querySelectorAll<HTMLElement>('button, a[href], input, select, textarea, [tabindex="0"]')]
    const first = controls[0]
    const last = controls.at(-1)
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
  }} onCancel={event => { event.preventDefault(); onClose() }} onClick={event => { if (event.target === event.currentTarget) onClose() }}><div className="privacy-content"><div className="privacy-heading"><h2 id={titleId}>Qué pasa con los archivos</h2><button type="button" className="menu-toggle dialog-close" onClick={onClose} aria-label="Cerrar privacidad" autoFocus><X size={20} aria-hidden /></button></div><h3>En el lector de esta web</h3><p>Una plantilla seleccionada se lee en este navegador. Este lector no envía el contenido a un servidor ni lo guarda en la aplicación. Quitar el archivo limpia la vista de esta sesión.</p><h3>Para una prueba con datos reales</h3><p>Antes de recibir documentación real acordamos el canal, las personas con acceso, el lugar de procesamiento, los proveedores que intervengan y el plazo de eliminación. Esa configuración no está definida para todos los casos.</p><p>Podemos empezar con una plantilla vacía o datos ficticios. No hace falta enviar contratos para la primera conversación.</p></div></dialog>
}
