import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { contact } from '../data/contact'
import { trackEvent } from '../lib/analytics'
import { scrollToId } from '../lib/scroll'

const links = [
  { id: 'demo', label: 'Demo' },
  { id: 'detecta', label: 'Qué detecta' },
  { id: 'implementacion', label: 'Cómo se implementa' },
  { id: 'piloto', label: 'Piloto' },
  { id: 'preguntas', label: 'Preguntas' },
  { id: 'contacto', label: 'Contacto' },
] as const

export function Navbar() {
  const [open, setOpen] = useState(false)

  function go(id: string) {
    if (id === 'implementacion') trackEvent('implementation_view')
    scrollToId(id)
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur-sm">
      <div className="h-0.5 bg-copper" />
      <div className="wrap-wide flex h-16 items-center justify-between gap-4">
        <a href="#top" className="min-w-0 leading-tight no-underline">
          <span className="block truncate text-[13px] font-medium text-ink">
            {contact.brand}
          </span>
          <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-copper">
            {contact.product}
          </span>
        </a>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Secciones">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              className="text-sm text-ink-2 hover:text-ink"
              onClick={() => go(link.id)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="btn btn-primary hidden sm:inline-flex"
            onClick={() => {
              trackEvent('hero_demo_click', { source: 'navbar' })
              go('demo')
            }}
          >
            Probar demo
          </button>
          <button
            type="button"
            className="btn btn-secondary px-2.5 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-line bg-surface px-4 py-3 lg:hidden"
          aria-label="Secciones móviles"
        >
          <div className="grid gap-1">
            {links.map((link) => (
              <button
                key={link.id}
                type="button"
                className="min-h-11 px-2 text-left text-sm"
                onClick={() => go(link.id)}
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              className="btn btn-primary mt-2"
              onClick={() => {
                trackEvent('hero_demo_click', { source: 'navbar_mobile' })
                go('demo')
              }}
            >
              Probar demo
            </button>
          </div>
        </nav>
      ) : null}
    </header>
  )
}
