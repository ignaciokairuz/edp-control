const steps = [
  'Se prepara el EDP',
  'Se cruza contra contrato / orden',
  'Se revisan cambios y acumulados',
  'Se adjunta respaldo',
  'Se envía',
  'Aparece una observación',
  'Se corrige',
  'Se reenvía',
]

export function ProblemWorkflow() {
  return (
    <section className="py-16 md:py-20">
      <div className="wrap">
        <p className="eyebrow">El trabajo de hoy</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-medium tracking-tight md:text-4xl">
          Un error pequeño puede generar otra vuelta de revisión.
        </h2>
        <p className="mt-4 max-w-2xl text-[17px] leading-7 text-ink-2">
          Un contratista arma el Estado de Pago con cantidades, precios,
          acumulados, cambios y evidencia. Si algo no cierra, vuelve a revisión
          antes de llegar a facturar.
        </p>

        <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step} className="border border-line bg-surface p-4">
              <span className="font-mono text-[11px] text-copper">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="mt-2 text-sm leading-6 text-ink">{step}</p>
            </li>
          ))}
        </ol>

        <p className="mt-8 max-w-2xl border-l-2 border-copper bg-copper-soft/40 px-4 py-3 text-[15px] leading-6 text-ink-2">
          EDP Control apunta a mover parte de esa revisión hacia antes del envío.
        </p>
      </div>
    </section>
  )
}
