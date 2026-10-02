import { ArrowRight, FileSearch, UserRound } from 'lucide-react'
import { syntheticCase } from '../data/syntheticCase'
import { trackEvent } from '../lib/analytics'

const clauseForFinding: Record<string, string> = { 'F-02': '6.1', 'F-03': '6.3', 'F-04': '8.2' }

function SourceText({ text, phrases }: { text: string; phrases: readonly string[] }) {
  const match = phrases.map(phrase => ({ phrase, index: text.indexOf(phrase) })).filter(item => item.index >= 0).sort((a, b) => a.index - b.index)[0]
  if (!match) return <>{text}</>
  return <>{text.slice(0, match.index)}<mark>{match.phrase}</mark><SourceText text={text.slice(match.index + match.phrase.length)} phrases={phrases} /></>
}

export type Finding = typeof syntheticCase.preparedFindings[number]

export function FindingComparison({ finding }: { finding: Finding }) {
  const line = syntheticCase.edp.lines.find(item => item.lineId === finding.lineId)!
  const documents = syntheticCase.documents.filter(doc => (finding.sourceRefs as readonly string[]).includes(doc.id))
  return <article className="finding-detail" aria-labelledby={`finding-${finding.id}`}>
    <div className="detail-heading"><span className="reference">LÍNEA {finding.lineId} · AGOSTO 2026</span><span className="review-tag">Para revisar</span></div>
    <h3 id={`finding-${finding.id}`}>{line.description}</h3>
    <div className="comparison-grid">
      <div className="comparison-value"><span>Qué dice el EDP</span><strong>{finding.edpValue}</strong><small>EDP-02 · Rev. 0 · fila {line.xlsxRow}</small></div>
      <ArrowRight className="compare-arrow" size={22} aria-hidden />
      <div className="comparison-value source-value"><span>Qué dice la fuente</span><strong>{finding.sourceValue}</strong><small>{finding.reference}</small></div>
    </div>
    <div className="finding-message"><span className="eyebrow">Qué encontramos</span><p>{finding.message}</p>{finding.id === 'F-01' ? <small>A igual cantidad: USD 1.800 en el EDP; USD 2.025 con el precio de la adenda. Diferencia: USD 225. No es un importe aprobado.</small> : null}{finding.id === 'F-02' ? <small>16 m³ × USD 22 = USD 352 asociados a la diferencia. Hay que confirmar el respaldo; no se modifica la cantidad.</small> : null}</div>
    <details className="source-details" onToggle={event => { if (event.currentTarget.open) trackEvent('source_open', { finding: finding.id }) }}>
      <summary><FileSearch size={19} aria-hidden />Ver la fuente<span className="details-plus" aria-hidden>+</span></summary>
      <div className="source-body"><p className="caption">Fragmentos ficticios preparados para este ejemplo. La demo no lee estos PDF.</p>
        {documents.map(doc => <div className="source-fragment" key={doc.id}><p className="reference">{doc.name} · {doc.id}</p>{'sources' in doc ? doc.sources.filter(source => doc.id !== 'OS-2407' || source.ref.includes(clauseForFinding[finding.id])).map((source, index) => <div key={index}><small>{source.ref}</small><blockquote><SourceText text={source.excerpt} phrases={'highlight' in source ? source.highlight : [finding.id === 'F-03' ? 'acta de aceptación del usuario técnico' : finding.id === 'F-04' ? 'modificación aprobada' : 'mismo ítem y período']} /></blockquote></div>) : 'entries' in doc ? <ul>{doc.entries.filter(entry => entry.itemCode === finding.lineId).map((entry, i) => <li key={i}>{entry.expected}: <strong>{entry.present ? 'presente' : 'no encontrado en el paquete'}</strong> · ítem {entry.itemCode}</li>)}</ul> : 'count' in doc ? <p>{doc.count} fotografías recibidas · ítem {doc.itemCode}.</p> : null}</div>)}
      </div>
    </details>
    <div className="human-review"><UserRound size={20} aria-hidden /><div><strong>Qué conviene revisar</strong><p>{finding.review}</p>{'limitation' in finding ? <small>{finding.limitation}</small> : null}</div></div>
    <p className="caption">Ver un hallazgo no cambia el EDP ni confirma que esté aprobado.</p>
  </article>
}
