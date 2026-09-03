const cards = [
  'No aprueba contractualmente un EDP.',
  'No reemplaza a Contracts, Finanzas ni al usuario técnico.',
  'No necesita ingresar a portales con las credenciales del cliente para el piloto.',
  'No certifica que una factura vaya a ser pagada.',
  'No reemplaza SAP, Coupa, Ariba, DocuSign u otros sistemas.',
  'No toma decisiones contractuales de forma automática.',
]

export function BoundariesSection() {
  return (
    <section className="bg-paper-2/60 py-16 md:py-24">
      <div className="wrap">
        <p className="eyebrow">Límites</p>
        <h2 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">
          Qué no pretende hacer
        </h2>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {cards.map((card) => (
            <article key={card} className="border border-line bg-surface px-5 py-4 text-[15px] leading-6">
              {card}
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-2xl border-l-2 border-ink bg-surface px-4 py-3 text-[15px] leading-6">
          Las excepciones sensibles quedan siempre bajo revisión humana.
        </p>
      </div>
    </section>
  )
}
