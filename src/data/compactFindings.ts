import { syntheticCase } from './syntheticCase.ts'
import type { FindingScreen } from '../lib/story.ts'

export type CompactFinding = {
  key: FindingScreen; label: string; subject: string;
  leftLabel: string; left: string; leftNote: string;
  rightLabel: string; right: string; rightNote: string;
  note: string; action?: string;
}

// Presentation of the existing fictitious fixture. These are prepared results,
// not findings computed from a visitor's documents.
export const compactFindings: CompactFinding[] = [
  { key: 'price', label: 'Precio distinto', subject: 'Camioneta 4x4',
    leftLabel: 'EDP', left: 'USD 120', leftNote: 'por día · 15 días',
    rightLabel: 'Adenda 01', right: 'USD 135', rightNote: 'por día · desde 01/08',
    note: `USD ${syntheticCase.preparedFindings[0].arithmetic!.differenceAtSameQuantity} para revisar en 15 días.` },
  { key: 'quantity', label: 'Cantidad distinta', subject: 'Movimiento de suelo',
    leftLabel: 'EDP', left: '128 m³', leftNote: 'cantidad presentada',
    rightLabel: 'Acta de avance', right: '112 m³', rightNote: 'cantidad registrada',
    note: syntheticCase.preparedFindings[1].message },
  { key: 'support', label: 'Falta respaldo', subject: 'Montaje de tablero',
    leftLabel: 'En el paquete', left: 'Informe + fotos', leftNote: 'montaje terminado',
    rightLabel: 'La orden pide', right: 'Acta de aceptación', rightNote: 'además del informe y las fotos',
    note: 'No aparece el acta requerida en este paquete.' },
  { key: 'change', label: 'Cambio para confirmar', subject: 'Turno nocturno',
    leftLabel: 'EDP', left: '2 turnos', leftNote: 'adicionales · nocturnos',
    rightLabel: 'Solicitud de cambio', right: 'Borrador', rightNote: 'sin aprobación en el paquete',
    note: 'No encontramos una modificación aprobada en los archivos disponibles.',
    action: 'Confirmar con Contratos.' },
]

export function compactFinding(key: FindingScreen): CompactFinding {
  return compactFindings.find(finding => finding.key === key)!
}
