const modules = [
  {
    n: '01',
    title: 'Precios y unidades',
    text: 'Compara el precio y la unidad del EDP con el contrato o la adenda vigente.',
  },
  {
    n: '02',
    title: 'Cantidades y acumulados',
    text: 'Controla límites, cantidades acumuladas y valores autorizados.',
  },
  {
    n: '03',
    title: 'Cambios contractuales',
    text: 'Marca líneas asociadas a adendas o change orders cuya vigencia debe confirmarse.',
  },
  {
    n: '04',
    title: 'Evidencia',
    text: 'Verifica si el respaldo esperado está presente en el paquete del período.',
  },
  {
    n: '05',
    title: 'Consistencia documental',
    text: 'Detecta referencias y campos incompatibles entre archivos: moneda, unidad, códigos.',
  },
  {
    n: '06',
    title: 'Excepciones',
    text: 'Deja fuera de la automatización los casos que requieren decisión humana.',
  },
]

export function DetectionCapabilities() {
  return (
    <section id="detecta" className="scroll-mt-24 bg-paper-2/50 py-16 md:py-24">
      <div className="wrap">
        <p className="eyebrow">Alcance del control</p>
        <h2 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">
          Qué tipo de controles puede automatizar
        </h2>
        <p className="mt-3 max-w-2xl text-[17px] leading-7 text-ink-2">
          No todo se automatiza. El valor está en las reglas repetibles y en
          dejar explícito qué sigue siendo una decisión de Contracts o Finanzas.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((item) => (
            <article key={item.n} className="border border-line bg-surface p-5">
              <p className="font-mono text-[11px] text-copper">{item.n}</p>
              <h3 className="mt-2 text-lg font-medium">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-2">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
