import { useEffect, useState } from 'react'
import { ArrowRight, ArrowUpRight, BrainCircuit, Check, ChevronDown, ChevronRight, FileCheck2, FileSearch, FileSpreadsheet, FileText, Layers, Paperclip, Undo2 } from 'lucide-react'
import whatsappIcon from '../assets/WhatsApp_Official.svg'
import { compactFindings, compactFinding } from '../data/compactFindings'
import { syntheticCase } from '../data/syntheticCase'
import { sourceReasons, storySources } from '../data/storySources'
import { contact, whatsappHref } from '../data/contact'
import { type FindingScreen } from '../lib/story'
import { SourceText } from './FindingComparison'
import { ProductDialog } from './ProductDialog'

const resultSummaries: Record<FindingScreen, { value: string; unit: string }> = {
  price: { value: `${syntheticCase.edp.lines[0].unitPrice} → ${compactFinding('price').right.replace('USD ', '')}`, unit: 'USD / día' },
  quantity: { value: `${compactFinding('quantity').left.replace(' m³', '')} → ${compactFinding('quantity').right.replace(' m³', '')}`, unit: 'm³' },
  support: { value: 'Acta no encontrada', unit: 'En el paquete' },
  change: { value: 'Sin aprobación', unit: 'En el paquete' },
}
const docs = [
  { title: 'Estado de Pago', ref: 'Agosto 2026', format: 'XLSX', Icon: FileSpreadsheet, kind: 'edp' },
  { title: 'Contrato', ref: 'Orden OS-2407', format: 'PDF', Icon: FileText, kind: 'contract' },
  { title: 'Adenda', ref: 'Adenda 01', format: 'PDF', Icon: Layers, kind: 'addendum' },
  { title: 'Respaldos', ref: 'Actas, informes y fotos', format: 'PDF + JPG', Icon: Paperclip, kind: 'support' },
]
const processing = ['Leyendo contrato…', 'Comparando ítems…', 'Revisando adendas…', 'Buscando respaldos…']
const hashToFinding: Record<string, FindingScreen> = { '#precio': 'price', '#cantidad': 'quantity', '#respaldo': 'support', '#adicional': 'change' }

function AIProcess() {
  const [step, setStep] = useState(0)
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(media.matches)
    update(); media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  useEffect(() => {
    if (reduced) return
    const timer = window.setInterval(() => setStep(current => (current + 1) % processing.length), 2600)
    return () => window.clearInterval(timer)
  }, [reduced])
  return <div className="ai-process">
    <div className="neural-map" aria-label="AI conecta los documentos y compara el mismo ítem entre fuentes">
      <svg className="circuit-traces" viewBox="0 0 340 310" fill="none" aria-hidden="true">
        <g className="trace-base" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M0 85H40V116H105M0 145H65V148H105M0 205H40V181H105M0 265H72V213H112" />
          <path d="M235 116H292V85H340M235 148H270V145H340M235 181H292V205H340M228 213H265V265H340" />
          <path d="M52 46V68H122V95M288 46V68H218V95" />
        </g>
        <g className="trace-active" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M0 145H65V148H105M235 148H270V145H340" />
        </g>
        <g className="trace-nodes" fill="currentColor">
          <circle cx="40" cy="116" r="3"/><circle cx="65" cy="148" r="3"/><circle cx="40" cy="181" r="3"/><circle cx="72" cy="213" r="3"/>
          <circle cx="292" cy="116" r="3"/><circle cx="270" cy="148" r="3"/><circle cx="292" cy="181" r="3"/><circle cx="265" cy="213" r="3"/>
        </g>
      </svg>
      <div className="fragment-token token-edp"><span>EDP · ÍTEM 01</span><strong>USD 120</strong></div>
      <div className="fragment-token token-adenda"><span>ADENDA 01</span><strong>USD 135</strong></div>
      <div className="brain-block"><BrainCircuit className="brain-icon" size={130} strokeWidth={1.05} aria-hidden /><strong>AI</strong></div>
      <p className="ai-verbs">COMPARA <span>·</span> CONTRASTA <span>·</span> DETECTA</p>
    </div>
    <div className="processing-status" aria-hidden="true"><span className="processing-dot" />{reduced ? 'Lectura y comparación documental' : processing[step]}</div>
    <small>Secuencia ilustrativa</small>
  </div>
}

function HeroDocumentContext() {
  return <div className="hero-document-context" aria-hidden="true"><div>ESTADO DE PAGO <span>AGOSTO 2026</span></div><table><thead><tr><th>Concepto</th><th>Cant.</th><th>USD</th></tr></thead><tbody>{syntheticCase.edp.lines.slice(0, 3).map(line => <tr key={line.lineId}><td>{line.description}</td><td>{line.quantityPeriod}</td><td>{line.unitPrice}</td></tr>)}</tbody></table></div>
}

function Comparison({ findingKey, reviewed, sourceSeen, onReview, onUndo, onSource, onNext }: {
  findingKey: FindingScreen; reviewed: boolean; sourceSeen: boolean; onReview: () => void; onUndo: () => void; onSource: () => void; onNext?: () => void
}) {
  const finding = compactFinding(findingKey)
  const index = compactFindings.findIndex(item => item.key === findingKey) + 1
  const line = syntheticCase.edp.lines.find(item => item.lineId === `0${index}`)!
  const priceDifference = syntheticCase.preparedFindings[0].arithmetic!.differenceAtSameQuantity
  const quantityDifference = syntheticCase.edp.lines[1].quantityPeriod - Number(compactFinding('quantity').right.replace(' m³', ''))
  const numeric = findingKey === 'price' || findingKey === 'quantity'
  const leftValue = findingKey === 'support' ? `${line.quantityPeriod} hito` : finding.left.replace('USD ', '').replace(' m³', '').replace(' turnos', '')
  const rightValue = findingKey === 'support' ? 'Acta de aceptación' : finding.right.replace('USD ', '').replace(' m³', '')
  const leftUnit = findingKey === 'price' ? 'USD / día' : findingKey === 'quantity' ? 'm³ presentados' : findingKey === 'support' ? 'Montaje presentado' : 'turnos adicionales'
  const rightUnit = findingKey === 'price' ? 'USD / día' : findingKey === 'quantity' ? 'm³ registrados' : findingKey === 'support' ? 'Requerida por la orden' : 'Solicitud sin aprobar'
  return <article className={`comparison-panel ${numeric ? 'numeric-comparison' : 'document-comparison'}`} aria-labelledby="selected-subject">
    <div className="finding-kicker"><span className="finding-index">0{index}</span>{finding.label}</div>
    <h3 id="selected-subject" tabIndex={-1}>{finding.subject}</h3>
    <div className="comparison-pair">
      <div className="comparison-side"><span className="value-label">Estado de Pago</span><strong>{leftValue}</strong><span className="value-unit">{leftUnit}</span></div>
      <ArrowRight className="comparison-arrow" size={30} aria-hidden />
      <div className="comparison-side source-side"><span className="value-label">{findingKey === 'support' ? 'Orden OS-2407' : finding.rightLabel}</span><strong>{rightValue}</strong><span className="value-unit">{rightUnit}</span></div>
    </div>
    <div className="difference-result">
      {findingKey === 'price' ? <><strong><span>USD</span> {priceDifference}</strong><span>PARA REVISAR</span></> : findingKey === 'quantity' ? <><strong>{quantityDifference} <span>m³</span></strong><span>DE DIFERENCIA</span></> : findingKey === 'support' ? <><strong>Acta no encontrada</strong><span>EN ESTE PAQUETE</span></> : <><strong>Aprobación por confirmar</strong><span>NO FIGURA EN ESTE PAQUETE</span></>}
    </div>
    <div className="comparison-actions">
      <button className={`button ${!sourceSeen && !reviewed ? 'button-primary' : 'button-source'}`} onClick={onSource}><FileSearch size={18} aria-hidden />Ver fuente{sourceSeen ? <Check size={16} aria-label="Fuente vista" /> : <ArrowUpRight size={17} aria-hidden />}</button>
      {!reviewed ? <button className={`button review-button ${sourceSeen ? 'button-primary' : 'button-source'}`} onClick={onReview}><Check size={18} aria-hidden />Marcar revisado</button> : onNext ? <button className="button button-primary next-finding" onClick={onNext}>Siguiente hallazgo<ArrowRight size={18} aria-hidden /></button> : null}
    </div>
    <div className={`review-state ${reviewed ? 'is-reviewed' : ''}`} role="status">{reviewed ? <><span><Check size={15} aria-hidden />{onNext ? 'Revisado en esta demo.' : 'Todo revisado en esta demo.'}</span><button className="undo-link" onClick={onUndo}><Undo2 size={13} aria-hidden />Deshacer</button></> : 'Tu revisión queda sólo en esta demo.'}</div>
  </article>
}

function SourceView({ findingKey, onClose }: { findingKey: FindingScreen; onClose: () => void }) {
  const initial = findingKey === 'support' ? 1 : 0
  const [selectedSource, setSelectedSource] = useState(initial)
  const fragments = storySources[findingKey]
  const source = fragments[selectedSource]
  return <ProductDialog title="Dónde lo encontramos" onClose={onClose} className="source-dialog">
    <div className="source-view">
      <p className="source-context">{compactFinding(findingKey).subject} <span>· Documento ficticio</span></p>
      {fragments.length > 1 ? <div className="source-tabs" aria-label="Documentos de respaldo">{fragments.map((fragment, index) => <button key={fragment.label} aria-pressed={selectedSource === index} onClick={() => setSelectedSource(index)}>{fragment.label}</button>)}</div> : null}
      <div className="document-excerpt"><div className="excerpt-reference"><FileText size={19} aria-hidden />{source.reference}</div><blockquote><SourceText text={source.text} phrases={findingKey === 'price' ? ['USD 120', 'USD 135 por día'] : source.highlights} /></blockquote></div>
      <details className="why-details"><summary>¿Por qué lo marcó?<ChevronDown size={17} aria-hidden /></summary><div><p>{sourceReasons[findingKey]}</p>{findingKey === 'price' ? <p className="source-calculation">(USD 135 − USD 120) × 15 días = <strong>USD 225 para revisar.</strong></p> : null}</div></details>
      <button className="button button-source return-button" onClick={onClose}>Volver a la comparación<ArrowRight size={17} aria-hidden /></button>
    </div>
  </ProductDialog>
}

const primaryFaq = [
  ['¿Qué necesito para probarlo?', 'La demo ya tiene un caso cargado. Para una prueba real, elegimos juntos un EDP o una plantilla anonimizada.'],
  ['¿Qué pasa con mis documentos?', 'Esta demo no recibe tus archivos. Antes de una prueba real acordamos accesos, procesamiento y eliminación.'],
  ['¿Cuánto cuesta?', 'Todavía no hay un precio definido. Acordamos alcance y precio antes de empezar.'],
]
const secondaryFaq = [
  ['¿Qué formatos acepta?', 'La demo representa un EDP en Excel y fuentes documentales preparadas. Los formatos de una prueba real se acuerdan según tu caso.'],
  ['¿Reemplaza a mi ERP?', 'La propuesta es revisar el EDP antes de enviarlo, dentro de tu proceso actual.'],
  ['¿Se adapta a nuestros controles?', 'Podemos conversar sobre tu plantilla, documentos y controles antes de definir una prueba.'],
  ['¿Puedo firmar un NDA?', 'Escribime y acordamos la confidencialidad antes de compartir documentación real.'],
]
function FaqItem({ question, answer }: { question: string; answer: string }) {
  return <details className="faq-item"><summary>{question}<span className="faq-toggle" aria-hidden>+</span></summary><p>{answer}</p></details>
}

export function CommercialPage() {
  const [selected, setSelected] = useState<FindingScreen>(() => hashToFinding[window.location.hash] ?? 'price')
  const [reviewed, setReviewed] = useState<Set<FindingScreen>>(new Set())
  const [sourceSeen, setSourceSeen] = useState<Set<FindingScreen>>(new Set())
  const [source, setSource] = useState<FindingScreen | null>(null)
  const [moreFaq, setMoreFaq] = useState(false)
  const remaining = compactFindings.length - reviewed.size
  const selectedIndex = compactFindings.findIndex(finding => finding.key === selected)
  const next = [...compactFindings.slice(selectedIndex + 1), ...compactFindings.slice(0, selectedIndex)].find(finding => !reviewed.has(finding.key))
  function choose(key: FindingScreen, scroll = false, focus = false) {
    setSelected(key)
    if (scroll || focus) window.requestAnimationFrame(() => {
      if (scroll) document.querySelector('.product-app')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
      document.getElementById('selected-subject')?.focus({ preventScroll: true })
    })
  }
  useEffect(() => {
    const key = hashToFinding[window.location.hash]
    if (key || ['#producto', '#demo'].includes(window.location.hash)) document.getElementById('producto')?.scrollIntoView()
  }, [])
  function openSource() { setSourceSeen(current => new Set(current).add(selected)); setSource(selected) }
  function markReviewed() { setReviewed(current => new Set(current).add(selected)) }
  function undo() { setReviewed(current => { const updated = new Set(current); updated.delete(selected); return updated }) }
  return <>
    <a href="#producto" className="skip-link">Ir al producto</a>
    <header className="site-header page-width"><a href="#inicio" className="brand" aria-label="EDP Control, inicio"><strong>EDP</strong><span>CONTROL</span></a></header>
    <main>
      <section id="inicio" className="hero page-width">
        <div className="hero-copy"><HeroDocumentContext /><p className="eyebrow">PARA CONTRATISTAS MINEROS</p>
          <h1>¿Cansado de revisar Estados de Pago que no cierran con lo acordado?</h1>
          <p className="hero-lead">Hacé el último control antes de enviarlo.</p>
          <p className="hero-description">AI contrasta tu EDP con el contrato, las adendas y los respaldos.</p>
        </div>
        <div className="workflow">
          <div className="workflow-input"><h2 className="stage-label">LO QUE SUBÍS</h2><div className="paper-stack">{docs.map(({ title, ref, format, Icon, kind }) => <div className={`paper-document ${kind}`} key={title}><div className="paper-format"><Icon size={25} aria-hidden /><span>{format}</span></div><h3>{title}</h3><p>{ref}</p>{kind === 'edp' ? <div className="paper-item"><span>01 · Camioneta 4x4</span><strong>USD 120 / día</strong></div> : <div className="paper-lines" aria-hidden="true"><span/><span/><span/></div>}</div>)}</div></div>
          <ArrowRight className="workflow-arrow" size={32} aria-hidden />
          <div className="workflow-center"><h2 className="stage-label">INTELIGENCIA DOCUMENTAL</h2><AIProcess /></div>
          <ArrowRight className="workflow-arrow" size={32} aria-hidden />
          <div className="workflow-output"><h2 className="stage-label">LO QUE RECIBÍS</h2><div className="result-tiles">{compactFindings.map((finding, index) => <button key={finding.key} className={`result-tile result-${finding.key}`} onClick={() => choose(finding.key, true)} aria-label={`0${index + 1} ${finding.label}: ${resultSummaries[finding.key].value} ${resultSummaries[finding.key].unit}`}><span className="result-id">0{index + 1}</span><strong className="result-title">{finding.label}</strong><span className="result-value">{resultSummaries[finding.key].value}</span><span className="result-unit">{resultSummaries[finding.key].unit}</span><ChevronRight className="result-open" size={18} aria-hidden /></button>)}</div></div>
        </div>
        <p className="workflow-footnote">Caso ficticio · sin análisis de archivos reales.</p>
      </section>
      <section className="demo-section" id="producto">
        <div className="page-width"><div className="product-bridge"><p className="benefit-line">Revisá las diferencias,<br className="benefit-break" /> no todo de nuevo.</p><p>Precio, cantidad, respaldos y cambios: encontrá dónde mirar antes de enviar el EDP.</p></div><div className="demo-intro"><h2>¿Cómo sería usarlo?</h2></div>
          <div className="product-app">
            <header className="app-header"><div className="app-document"><FileSpreadsheet size={21} aria-hidden /><strong>EDP Agosto 2026</strong></div><span className="demo-badge">DEMO FICTICIA</span><div className="pending-count" aria-live="polite"><span>{remaining}</span> pendientes</div></header>
            <div className="app-workspace"><aside className="findings-rail" aria-label="Lista de hallazgos"><div className="rail-heading"><strong>4 hallazgos</strong></div><div className="finding-choices">{compactFindings.map((finding, index) => <button key={finding.key} className={`finding-choice ${selected === finding.key ? 'is-selected' : ''} ${reviewed.has(finding.key) ? 'is-reviewed' : ''}`} aria-pressed={selected === finding.key} aria-controls="comparison-detail" onClick={() => choose(finding.key)}><span className="rail-index">0{index + 1}</span><span className="rail-copy"><strong>{finding.label}</strong><small>{finding.subject}</small></span>{reviewed.has(finding.key) ? <Check size={18} className="review-check" aria-label="Revisado" /> : <ChevronRight size={17} aria-hidden />}</button>)}</div><p className="rail-note"><FileCheck2 size={16} aria-hidden />Vos revisás. Tu equipo decide.</p></aside>
              <div id="comparison-detail" className="comparison-detail" key={selected}><Comparison findingKey={selected} reviewed={reviewed.has(selected)} sourceSeen={sourceSeen.has(selected)} onReview={markReviewed} onUndo={undo} onSource={openSource} onNext={next ? () => choose(next.key, false, true) : undefined} /></div>
            </div>
          </div>
        </div>
      </section>
      <section className="faq-section page-width" id="preguntas"><div className="faq-heading"><p className="eyebrow">ANTES DE EMPEZAR</p><h2>Preguntas frecuentes.</h2></div><div className="faq-list">{primaryFaq.map(([question, answer]) => <FaqItem key={question} question={question} answer={answer} />)}<div id="additional-questions" hidden={!moreFaq}>{secondaryFaq.map(([question, answer]) => <FaqItem key={question} question={question} answer={answer} />)}</div><button className="text-link more-faq" aria-expanded={moreFaq} aria-controls="additional-questions" onClick={() => setMoreFaq(value => !value)}>{moreFaq ? 'Menos preguntas' : 'Más preguntas'}<ChevronDown className={moreFaq ? 'rotated' : ''} size={17} aria-hidden /></button></div></section>
      <section className="contact-section page-width" id="contacto"><div><h2>No te quedes<br />con preguntas.</h2><p>Preguntá todo lo que necesites, sin compromiso.</p></div><div className="contact-action"><a className="button button-primary" href={whatsappHref()} target="_blank" rel="noreferrer"><img src={whatsappIcon} alt="" width={23} height={23} />Hacer una consulta<ArrowUpRight size={18} aria-hidden /></a></div></section>
    </main>
    <footer className="site-footer page-width"><p>Ignacio Kairuz <span className="trust-dot">·</span><a href={contact.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn<ArrowUpRight size={15} aria-hidden /></a></p></footer>
    <a className="floating-whatsapp" href={whatsappHref()} target="_blank" rel="noreferrer" aria-label="Hacer una consulta por WhatsApp"><img src={whatsappIcon} alt="" width={27} height={27} /><span>¿Una consulta?</span></a>
    {source ? <SourceView key={source} findingKey={source} onClose={() => setSource(null)} /> : null}
  </>
}
