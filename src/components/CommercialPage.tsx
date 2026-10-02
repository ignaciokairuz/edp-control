import { useEffect, useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronRight, FileCheck2, FileSearch, FileSpreadsheet, FileText, GitCompareArrows, Layers, MessageCircle, Paperclip, ScanLine, Undo2 } from 'lucide-react'
import { compactFindings, compactFinding } from '../data/compactFindings'
import { syntheticCase } from '../data/syntheticCase'
import { sourceReasons, storySources } from '../data/storySources'
import { contact, whatsappHref } from '../data/contact'
import { type FindingScreen } from '../lib/story'
import { SourceText } from './FindingComparison'
import { ProductDialog } from './ProductDialog'

const summaries: Record<FindingScreen, string> = {
  price: '120 → 135 USD / día', quantity: '128 → 112 m³',
  support: 'Acta no encontrada', change: 'Aprobación por confirmar',
}
const docs = [
  { title: 'Estado de Pago', ref: 'Agosto 2026 · XLSX', Icon: FileSpreadsheet, kind: 'edp' },
  { title: 'Contrato / Orden', ref: 'OS-2407 · PDF', Icon: FileText, kind: 'contract' },
  { title: 'Adendas', ref: 'Adenda 01 · PDF', Icon: Layers, kind: 'addendum' },
  { title: 'Respaldos', ref: 'Actas, informes y fotos', Icon: Paperclip, kind: 'support' },
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
    <div className="processing-map" aria-label="IA conecta el ítem del EDP con la tarifa de la adenda">
      <div className="document-node node-edp"><FileSpreadsheet size={15} aria-hidden /><span>Ítem 01 <strong>USD 120</strong></span></div>
      <div className="ai-core"><ScanLine size={22} aria-hidden /><strong>IA</strong><span>Contrasta documentos</span></div>
      <div className="document-node node-source"><FileText size={15} aria-hidden /><span>Adenda 01 <strong>USD 135</strong></span></div>
      <div className="match-node"><GitCompareArrows size={16} aria-hidden /> Mismo ítem · otra tarifa</div>
    </div>
    <div className="processing-status" aria-hidden="true"><span className="processing-dot" />{reduced ? 'Lectura y comparación documental' : processing[step]}</div>
    <small>Secuencia ilustrativa</small>
  </div>
}

function Comparison({ findingKey, reviewed = false, onReview, onUndo, onSource }: {
  findingKey: FindingScreen; reviewed?: boolean; onReview?: () => void; onUndo?: () => void; onSource: () => void
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
    <h3 id="selected-subject">{finding.subject}</h3>
    <div className="comparison-pair">
      <div className="comparison-side"><span className="value-label">Estado de Pago</span><strong>{leftValue}</strong><span className="value-unit">{leftUnit}</span></div>
      <ArrowRight className="comparison-arrow" size={30} aria-hidden />
      <div className="comparison-side source-side"><span className="value-label">{findingKey === 'support' ? 'Orden OS-2407' : finding.rightLabel}</span><strong>{rightValue}</strong><span className="value-unit">{rightUnit}</span></div>
    </div>
    <div className="difference-result">
      {findingKey === 'price' ? <><strong><span>USD</span> {priceDifference}</strong><span>PARA REVISAR</span></> : findingKey === 'quantity' ? <><strong>{quantityDifference} <span>m³</span></strong><span>DE DIFERENCIA</span></> : findingKey === 'support' ? <><strong>Acta no encontrada</strong><span>EN ESTE PAQUETE</span></> : <><strong>Aprobación por confirmar</strong><span>NO FIGURA EN ESTE PAQUETE</span></>}
    </div>
    <div className="comparison-actions"><button className="button button-source" onClick={onSource}><FileSearch size={18} aria-hidden />Ver fuente<ArrowUpRight size={17} aria-hidden /></button>
      {onReview && !reviewed ? <button className="button button-primary review-button" onClick={onReview}><Check size={18} aria-hidden />Marcar revisado</button> : null}
      {onUndo && reviewed ? <button className="button button-undo" onClick={onUndo}><Undo2 size={17} aria-hidden />Deshacer</button> : null}
    </div>
    {onReview ? <p className={`review-state ${reviewed ? 'is-reviewed' : ''}`} role="status">{reviewed ? <><Check size={15} aria-hidden />Revisado en esta demo.</> : 'Tu revisión queda sólo en esta demo.'}</p> : null}
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
  const [source, setSource] = useState<FindingScreen | null>(null)
  const [example, setExample] = useState(false)
  const [moreFaq, setMoreFaq] = useState(false)
  const remaining = compactFindings.length - reviewed.size
  function choose(key: FindingScreen, scroll = false) {
    setSelected(key)
    if (scroll) document.getElementById('producto')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }
  useEffect(() => {
    const key = hashToFinding[window.location.hash]
    if (key || ['#producto', '#demo'].includes(window.location.hash)) document.getElementById('producto')?.scrollIntoView()
  }, [])
  function markReviewed() { setReviewed(current => new Set(current).add(selected)) }
  function undo() { setReviewed(current => { const next = new Set(current); next.delete(selected); return next }) }
  return <>
    <a href="#producto" className="skip-link">Ir a la demo</a>
    <header className="site-header page-width"><a href="#inicio" className="brand" aria-label="EDP Control, inicio"><strong>EDP</strong><span>CONTROL</span></a><nav aria-label="Principal"><a href="#producto">Probar la demo<ArrowDown size={16} aria-hidden /></a><a className="header-contact" href={whatsappHref()} target="_blank" rel="noreferrer">Hablemos<ArrowUpRight size={16} aria-hidden /></a></nav></header>
    <main>
      <section id="inicio" className="hero page-width">
        <p className="eyebrow">PARA CONTRATISTAS MINEROS</p>
        <h1>¿Cansado de revisar Estados de Pago que no cierran con lo acordado?</h1>
        <p className="hero-lead">Hacé el último control antes de enviarlo.</p>
        <p className="hero-description">Tu EDP, el contrato y sus respaldos. Una IA que los contrasta para mostrarte <strong>qué no cierra y dónde revisarlo.</strong></p>
        <div className="hero-actions"><a className="button button-primary" href="#producto">Probar la demo<ArrowDown size={18} aria-hidden /></a><a className="text-link" href={whatsappHref()} target="_blank" rel="noreferrer">Hablar por WhatsApp<ArrowUpRight size={17} aria-hidden /></a></div>
        <div className="workflow">
          <div className="workflow-input"><h2 className="stage-label">LO QUE SUBÍS</h2><div className="document-stack">{docs.map(({ title, ref, Icon, kind }) => <div className={`input-document ${kind}`} key={title}><Icon size={24} aria-hidden /><div><strong>{title}</strong><span>{ref}</span></div></div>)}</div></div>
          <ArrowRight className="workflow-arrow" size={28} aria-hidden />
          <div className="workflow-center"><h2 className="stage-label">INTELIGENCIA DOCUMENTAL</h2><AIProcess /></div>
          <ArrowRight className="workflow-arrow" size={28} aria-hidden />
          <div className="workflow-output"><h2 className="stage-label">LO QUE RECIBÍS</h2><div className="output-findings">{compactFindings.map((finding, index) => <button key={finding.key} className="output-finding" onClick={() => choose(finding.key, true)}><span className="output-number">0{index + 1}</span><span><strong>{finding.label}</strong><small>{summaries[finding.key]}</small></span><ChevronRight size={17} aria-hidden /></button>)}</div></div>
        </div>
        <div className="workflow-foot"><p>Demo ficticia · sin análisis de archivos reales.</p><button className="text-link" onClick={() => setExample(true)}>Ver un ejemplo<ArrowRight size={19} aria-hidden /></button></div>
      </section>
      <section className="demo-section" id="producto">
        <div className="page-width"><div className="demo-intro"><div><p className="eyebrow">TOCÁ EL PRODUCTO</p><h2>¿Querés probarlo con un EDP?</h2></div><p>Elegí un hallazgo. Comprobá la fuente.<br />Marcá tu revisión.</p></div>
          <div className="product-app">
            <header className="app-header"><div className="app-document"><FileSpreadsheet size={21} aria-hidden /><strong>EDP Agosto 2026</strong></div><span className="demo-badge">DEMO FICTICIA</span><div className="pending-count" aria-live="polite"><span>{remaining}</span> pendientes</div></header>
            <div className="app-workspace"><aside className="findings-rail" aria-label="Lista de hallazgos"><div className="rail-heading"><span>HALLAZGOS</span><span>04</span></div><div className="finding-choices">{compactFindings.map((finding, index) => <button key={finding.key} className={`finding-choice ${selected === finding.key ? 'is-selected' : ''} ${reviewed.has(finding.key) ? 'is-reviewed' : ''}`} aria-pressed={selected === finding.key} aria-controls="comparison-detail" onClick={() => choose(finding.key)}><span className="rail-index">0{index + 1}</span><span className="rail-copy"><strong>{finding.label}</strong><small>{finding.subject}</small></span>{reviewed.has(finding.key) ? <Check size={18} className="review-check" aria-label="Revisado" /> : <ChevronRight size={17} aria-hidden />}</button>)}</div><p className="rail-note"><FileCheck2 size={16} aria-hidden />Vos revisás. Tu equipo decide.</p></aside>
              <div id="comparison-detail" className="comparison-detail" key={selected}><Comparison findingKey={selected} reviewed={reviewed.has(selected)} onReview={markReviewed} onUndo={undo} onSource={() => setSource(selected)} /></div>
            </div>
          </div>
        </div>
      </section>
      <section className="faq-section page-width" id="preguntas"><div className="faq-heading"><p className="eyebrow">ANTES DE EMPEZAR</p><h2>Preguntas frecuentes.</h2></div><div className="faq-list">{primaryFaq.map(([question, answer]) => <FaqItem key={question} question={question} answer={answer} />)}<div id="additional-questions" hidden={!moreFaq}>{secondaryFaq.map(([question, answer]) => <FaqItem key={question} question={question} answer={answer} />)}</div><button className="text-link more-faq" aria-expanded={moreFaq} aria-controls="additional-questions" onClick={() => setMoreFaq(value => !value)}>{moreFaq ? 'Menos preguntas' : 'Más preguntas'}<ChevronDown className={moreFaq ? 'rotated' : ''} size={17} aria-hidden /></button></div></section>
      <section className="contact-section page-width" id="contacto"><div><h2>¿Tenés una pregunta?<br />Escribime.</h2><p>Te respondo yo directamente.</p></div><div className="contact-action"><a className="button button-primary" href={whatsappHref()} target="_blank" rel="noreferrer"><MessageCircle size={20} aria-hidden />Hablar por WhatsApp<ArrowUpRight size={18} aria-hidden /></a><small>Toda pregunta es bienvenida.</small></div></section>
    </main>
    <footer className="site-footer page-width"><p>Desarrollado por <strong>Ignacio Kairuz</strong><a href={contact.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn<ArrowUpRight size={15} aria-hidden /></a></p><span>EDP CONTROL</span></footer>
    {example ? <ProductDialog title="Un precio que no coincide" className="example-dialog" onClose={() => { setExample(false); setSource(null) }}>{source ? <div className="example-source"><p className="excerpt-reference">{storySources.price[0].reference}</p><blockquote><SourceText text={storySources.price[0].text} phrases={['USD 120', 'USD 135 por día']} /></blockquote><button className="button button-source" onClick={() => setSource(null)}>Volver al ejemplo</button></div> : <><Comparison findingKey="price" onSource={() => setSource('price')} /><div className="example-next"><button className="text-link" onClick={() => { setExample(false); setSource(null); choose('price', true) }}>Probar la demo<ArrowRight size={18} aria-hidden /></button></div></>}</ProductDialog> : null}
    {source && !example ? <SourceView key={source} findingKey={source} onClose={() => setSource(null)} /> : null}
  </>
}
