const sources = ['Excel / EDP', 'Contrato', 'Adendas', 'Documentación técnica']
const badges = ['ERP', 'Procurement', 'DMS', 'Excel', 'PDF']

export function SystemFitDiagram() {
  return (
    <section className="py-16 md:py-24">
      <div className="wrap">
        <p className="eyebrow">Encaje</p>
        <h2 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">
          No hace falta reemplazar tu sistema actual.
        </h2>
        <p className="mt-3 max-w-2xl text-[17px] leading-7 text-ink-2">
          Una capa de precontrol sobre el proceso que ya utilizás. El portal, el
          ERP y la autorización oficial siguen donde están.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Flow
            title="Hoy"
            afterSources={['Revisión manual', 'Portal / ERP / circuito del cliente']}
            highlight={-1}
          />
          <Flow
            title="Con EDP Control"
            afterSources={[
              'EDP Control',
              'Excepciones + trazabilidad',
              'Revisión humana',
              'Portal / ERP / circuito del cliente',
            ]}
            highlight={0}
          />
        </div>

        <p className="mt-8 max-w-2xl text-[15px] leading-6 text-ink-2">
          El primer objetivo es mejorar el precontrol. Una integración con ERP o
          procurement sólo se evalúa después de demostrar valor.
        </p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {badges.map((badge) => (
            <li
              key={badge}
              className="border border-line bg-surface px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] text-ink-2"
            >
              {badge}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Flow({
  title,
  afterSources,
  highlight,
}: {
  title: string
  afterSources: string[]
  highlight: number
}) {
  return (
    <div className="border border-line bg-surface p-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        {title}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {sources.map((source) => (
          <p
            key={`${title}-${source}`}
            className="border border-line bg-paper px-3 py-2 text-sm text-ink-2"
          >
            {source}
          </p>
        ))}
      </div>
      <ol className="mt-1">
        {afterSources.map((step, index) => (
          <li key={`${title}-${step}`}>
            <div className="flex justify-center py-1 text-line-strong" aria-hidden>
              ↓
            </div>
            <div
              className={
                index === highlight
                  ? 'border border-copper bg-copper-soft px-3 py-2 text-sm font-medium text-ink'
                  : 'border border-line bg-paper px-3 py-2 text-sm text-ink-2'
              }
            >
              {step}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
