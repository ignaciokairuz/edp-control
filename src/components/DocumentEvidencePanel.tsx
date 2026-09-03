import type { DemoException } from '../data/demoEdp'

export function DocumentEvidencePanel({ item }: { item: DemoException }) {
  const parts = item.excerpt.body.split(item.excerpt.highlight)

  return (
    <figure className="border border-line bg-[#efe8dc]">
      <figcaption className="flex items-center justify-between gap-3 border-b border-line bg-paper-2 px-4 py-2 text-[11px] uppercase tracking-[0.12em] text-muted">
        <span className="font-mono">{item.documentName}</span>
        <span>Documento sintético</span>
      </figcaption>
      <div className="bg-surface px-5 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
        <div className="flex items-center justify-between gap-3 border-b border-dashed border-line pb-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            Andes Servicios Industriales S.A. · OS-184
          </p>
          <p className="font-mono text-[10px] text-muted">{item.excerpt.pageLabel}</p>
        </div>
        <p className="mt-4 font-mono text-[11px] text-copper">{item.excerpt.heading}</p>
        <p className="mt-3 text-[13.5px] leading-7 text-ink-2">
          {parts.map((part, index) => (
            <span key={`${part}-${index}`}>
              {part}
              {index < parts.length - 1 ? (
                <mark className="bg-copper-soft px-0.5 text-ink">
                  {item.excerpt.highlight}
                </mark>
              ) : null}
            </span>
          ))}
        </p>
        <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
          Fragmento de demostración · no es un contrato real
        </p>
      </div>
    </figure>
  )
}
