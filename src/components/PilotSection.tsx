const timeline = [
  'Demo',
  'Caso anonimizado',
  'Piloto de 1–2 ciclos',
  'Comparación con baseline',
  'Decisión de implementación',
]

const metrics = [
  'Tiempo de preparación',
  'Tiempo de revisión',
  'Observaciones detectadas antes del envío',
  'Reenvíos preventibles',
  'Porcentaje de reglas automatizables',
  'Excepciones que siguen requiriendo una persona',
]

export function PilotSection() {
  return (
    <section id="piloto" className="scroll-mt-24 py-16 md:py-24">
      <div className="wrap">
        <p className="eyebrow">Piloto</p>
        <h2 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">
          De la demo a un caso medible
        </h2>
        <p className="mt-3 max-w-2xl text-[17px] leading-7 text-ink-2">
          El éxito del piloto no es que la interfaz se vea bien. Es demostrar que
          elimina trabajo repetitivo o detecta errores antes que el proceso
          actual.
        </p>

        <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {timeline.map((item, index) => (
            <li key={item} className="border border-line bg-surface p-4">
              <span className="font-mono text-[11px] text-copper">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="mt-2 text-sm font-medium">{item}</p>
            </li>
          ))}
        </ol>

        <h3 className="mt-10 text-xl font-medium">Qué mediríamos</h3>
        <ul className="mt-4 grid gap-2 md:grid-cols-2">
          {metrics.map((metric) => (
            <li key={metric} className="border border-line bg-surface px-4 py-3 text-sm">
              {metric}
            </li>
          ))}
        </ul>

        <p className="mt-6 max-w-2xl text-sm leading-6 text-muted">
          No usamos como promesa automática reducción de DSO, días de cobro,
          aumento de margen ni ROI en dólares, salvo que un cliente real provea
          baseline.
        </p>
      </div>
    </section>
  )
}
