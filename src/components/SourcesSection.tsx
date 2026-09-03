import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export function SourcesSection() {
  const [open, setOpen] = useState(false)

  return (
    <section className="pb-16">
      <div className="wrap">
        <div className="border border-line bg-surface">
          <button
            type="button"
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="font-medium">Fuentes y alcance de la demo</span>
            <ChevronDown
              size={18}
              className={open ? 'rotate-180 text-muted' : 'text-muted'}
              aria-hidden
            />
          </button>
          {open ? (
            <div className="space-y-4 border-t border-line px-5 py-5 text-sm leading-6 text-ink-2">
              <p>
                La hipótesis de producto nace de workflows públicos del sector
                donde un Estado de Pago puede requerir revisión contra contrato,
                cantidades, precios, acumulados, cambios y evidencia antes de
                autorizar facturación.
              </p>
              <p>
                La existencia de ese workflow no demuestra por sí sola
                willingness-to-pay ni que todas las empresas trabajen igual.
              </p>
              <p>La demo utiliza datos completamente sintéticos.</p>
              <p>Referencias públicas, sin afiliación:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  <a
                    className="text-copper underline underline-offset-2"
                    href="https://vicuna.com/soy-proveedor-contratista/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Vicuña — Soy proveedor/contratista
                  </a>
                </li>
                <li>
                  <a
                    className="text-copper underline underline-offset-2"
                    href="https://vicuna.com/portal-coupa/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Vicuña — información pública sobre portal/procesos Coupa
                  </a>
                </li>
              </ul>
              <p>
                Las plataformas empresariales pueden absorber partes de estos
                workflows. El objetivo del piloto es identificar qué
                validaciones específicas permanecen fuera del sistema existente
                y si automatizarlas genera valor suficiente.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
