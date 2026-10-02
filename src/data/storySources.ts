import { syntheticCase } from './syntheticCase.ts'
import type { FindingScreen } from '../lib/story.ts'

export type SourceFragment = { label: string; reference: string; text: string; highlights: string[]; index?: boolean }

function fromDocument(id: string, label: string, reference: string, clause?: string): SourceFragment {
  const document = syntheticCase.documents.find(doc => doc.id === id)!
  if (!('sources' in document)) throw new Error('El documento no tiene extractos: ' + id)
  const source = document.sources.find(item => !clause || item.ref.includes(clause))!
  return { label, reference, text: source.excerpt, highlights: 'highlight' in source ? [...source.highlight] : [] }
}

export const storySources: Record<FindingScreen, SourceFragment[]> = {
  price: [fromDocument('AD-01', 'Adenda', 'Adenda 01 · pág. 1 · ítem 01')],
  quantity: [fromDocument('ACT-08', 'Acta de avance', 'ACT-08 · pág. 1 · ítem 02')],
  support: [
    fromDocument('INF-03', 'Informe', 'INF-03 · pág. 1 · informe técnico'),
    { ...fromDocument('OS-2407', 'Condición', 'OS-2407 · pág. 4 · cláusula 6.3', '6.3'), highlights: ['acta de aceptación del usuario técnico'] },
    { label: 'Paquete', reference: 'IDX-08 · índice del paquete · ítem 03', index: true,
      text: 'Informe técnico: presente. Registro fotográfico: presente. Acta de aceptación del usuario técnico: no encontrada en el paquete.', highlights: ['no encontrada en el paquete'] },
  ],
  change: [
    { ...fromDocument('SC-02', 'Solicitud', 'SC-02 · pág. 1 · solicitud de cambio'), highlights: ['Estado: borrador', 'Aprobación: sin completar'] },
    { ...fromDocument('OS-2407', 'Condición', 'OS-2407 · pág. 5 · cláusula 8.2', '8.2'), highlights: ['modificación aprobada'] },
    { label: 'Paquete', reference: 'IDX-08 · índice del paquete · ítem 04', index: true,
      text: 'Documento recibido: SC-02. Modificación aprobada: no encontrada en el paquete.', highlights: ['no encontrada en el paquete'] },
  ],
}

export const sourceReasons: Record<FindingScreen, string> = {
  price: 'Agosto está dentro de la vigencia de la adenda. Por eso se marcó esta línea.',
  quantity: 'El EDP muestra 128 m³ y el acta registra 112 m³. La diferencia requiere revisión humana.',
  support: 'El índice IDX-08 incluye informe y fotos. No lista el acta de aceptación. Esto no prueba que el acta no exista.',
  change: 'SC-02 propone 2 turnos nocturnos. Está en borrador y la aprobación está vacía. IDX-08 no incluye una modificación aprobada. Puede haber una autorización por otro canal.',
}
