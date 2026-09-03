import { X } from 'lucide-react'
import { createContext, useContext, useEffect, useId, useState, type ReactNode } from 'react'

const PrivacyContext = createContext<{ openPrivacy: () => void } | null>(null)

export function usePrivacy() {
  const ctx = useContext(PrivacyContext)
  if (!ctx) {
    throw new Error('usePrivacy debe usarse dentro de PrivacyProvider')
  }
  return ctx
}

export function PrivacyProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <PrivacyContext.Provider value={{ openPrivacy: () => setOpen(true) }}>
      {children}
      <PrivacyModal open={open} onClose={() => setOpen(false)} />
    </PrivacyContext.Provider>
  )
}

function PrivacyModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const titleId = useId()

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-ink/45"
        aria-label="Cerrar privacidad"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-lg border border-line bg-surface p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-xl font-medium">
            Privacidad de la demo
          </h2>
          <button type="button" className="btn btn-secondary px-2.5" onClick={onClose} aria-label="Cerrar">
            <X size={16} />
          </button>
        </div>
        <p className="mt-4 text-sm leading-6 text-ink-2">
          Los archivos seleccionados en esta versión se procesan localmente en
          tu navegador. No se cargan automáticamente a un servidor ni se
          utilizan para entrenamiento. Para analizar un caso real fuera de la
          demo se acordará previamente el mecanismo de intercambio y
          tratamiento.
        </p>
      </div>
    </div>
  )
}
