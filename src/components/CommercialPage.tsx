import { ArrowDown, ArrowLeft, ArrowRight, Check, ChevronDown, CircleHelp, FilePenLine, FileSpreadsheet, FileText, Paperclip, ScanLine, TriangleAlert } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import whatsappMark from '../assets/WhatsApp_Official.svg'
import reviewPhoto from '../assets/review-1280.webp'
import reviewSmallPhoto from '../assets/review-640.webp'
import { compactFinding, compactFindings } from '../data/compactFindings'
import { sourceReasons, storySources } from '../data/storySources'
import { syntheticCase } from '../data/syntheticCase'
import { landingForHash, type FindingScreen } from '../lib/story'
import { trackEvent } from '../lib/analytics'
import { usePrivacy } from '../lib/privacy'
import { ContactLink } from './ContactLink'
import { SourceText } from './FindingComparison'
import { ProductDialog } from './ProductDialog'

function WhatsAppAction({ source, large = false }: { source: string; large?: boolean }) {
  return <ContactLink source={source} ariaLabel="Escribir por WhatsApp" iconOnly className={`whatsapp-action ${large ? 'whatsapp-large' : ''}`}><img src={whatsappMark} alt="" width={large ? 44 : 36} height={large ? 44 : 36} /></ContactLink>
}
function FindingIcon({ finding, size = 20 }: { finding: FindingScreen; size?: number }) {
  return finding === 'change' ? <CircleHelp size={size} aria-hidden /> : finding === 'support' ? <Paperclip size={size} aria-hidden /> : <TriangleAlert size={size} aria-hidden />
}
function InputOutput({ onFinding }: { onFinding: (finding: FindingScreen) => void }) {
  return <figure className="product-poster" aria-label="Tus documentos entran a EDP Control; salen cuatro cosas para mirar en el caso ficticio."><div className="poster-flow">
    <div className="poster-input"><p className="stage-label">Le das</p><ul>
      <li><FileSpreadsheet size={25} aria-hidden /><span>Estado de Pago<small>Trabajo + importe a cobrar</small></span></li>
      <li><FileText size={25} aria-hidden /><span>Contrato / Orden</span></li>
      <li><FilePenLine size={25} aria-hidden /><span>Adendas</span></li>
      <li><Paperclip size={25} aria-hidden /><span>Respaldos</span></li>
    </ul></div><ArrowRight className="flow-arrow" size={34} aria-hidden />
    <div className="poster-process"><ScanLine size={30} aria-hidden /><div><strong>EDP Control</strong><span>Revisa y compara</span></div></div><ArrowRight className="flow-arrow" size={34} aria-hidden />
    <div className="poster-output"><p className="stage-label">Recibís</p><h2>4 cosas para mirar</h2><ul>{compactFindings.map(finding => <li key={finding.key}><button type="button" onClick={() => onFinding(finding.key)} aria-haspopup="dialog"><FindingIcon finding={finding.key} /><span>{finding.label}</span><ArrowRight size={18} aria-hidden /></button></li>)}</ul></div>
  </div><figcaption>Caso ficticio. Tu equipo decide.</figcaption></figure>
}
function CompactComparison({ finding }: { finding: FindingScreen }) {
  const item = compactFinding(finding)
  return <div className={`compact-comparison comparison-${finding}`}><div><span>{item.leftLabel}</span><strong>{item.left}</strong><small>{item.leftNote}</small></div><ArrowRight className="compare-arrow" size={20} aria-label="comparado con" /><div><span>{item.rightLabel}</span><strong>{item.right}</strong><small>{item.rightNote}</small></div></div>
}
function FindingSheet({ finding, initialSource = false, onClose }: { finding: FindingScreen; initialSource?: boolean; onClose: () => void }) {
  const item = compactFinding(finding)
  const [sourceOpen, setSourceOpen] = useState(initialSource)
  const [tab, setTab] = useState(finding === 'support' ? 1 : 0)
  const sourceButton = useRef<HTMLButtonElement>(null), sourceTitle = useRef<HTMLHeadingElement>(null)
  const fragments = storySources[finding], fragment = fragments[tab]
  useEffect(() => { if (sourceOpen) sourceTitle.current?.focus() }, [sourceOpen])
  const backToExample = () => { setSourceOpen(false); requestAnimationFrame(() => sourceButton.current?.focus()) }
  return <ProductDialog title={item.label} onClose={onClose} className={`finding-sheet ${sourceOpen ? 'showing-source' : ''}`}><div className="sheet-content"><p className="eyebrow">{item.subject} · caso ficticio</p>
    {sourceOpen ? <><button type="button" className="quiet-action source-back" onClick={backToExample}><ArrowLeft size={17} aria-hidden />Volver al ejemplo</button>
      {fragments.length > 1 ? <div className="source-tabs" role="tablist" aria-label="Documentos del hallazgo">{fragments.map((source, i) => <button key={source.label} type="button" role="tab" id={`source-tab-${i}`} aria-controls="source-excerpt" aria-selected={tab === i} tabIndex={tab === i ? 0 : -1} onClick={() => setTab(i)} onKeyDown={event => {
        const next = event.key === 'ArrowRight' ? (tab + 1) % fragments.length : event.key === 'ArrowLeft' ? (tab + fragments.length - 1) % fragments.length : event.key === 'Home' ? 0 : event.key === 'End' ? fragments.length - 1 : null
        if (next !== null) { event.preventDefault(); setTab(next); event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('button')[next]?.focus() }
      }}>{source.label}</button>)}</div> : null}
      <article className="source-paper" id="source-excerpt" role={fragments.length > 1 ? 'tabpanel' : undefined} aria-labelledby={fragments.length > 1 ? `source-tab-${tab}` : undefined} tabIndex={fragments.length > 1 ? 0 : undefined}><h3 ref={sourceTitle} tabIndex={-1}><FileText size={20} aria-hidden />{fragment.reference}</h3><blockquote><SourceText text={fragment.text} phrases={fragment.highlights} /></blockquote></article><p className="source-reason">{sourceReasons[finding]}</p>
    </> : <><CompactComparison finding={finding} /><p className="example-note">{item.note}</p>{item.action ? <p className="example-action">{item.action}</p> : null}<button ref={sourceButton} type="button" className="source-link" onClick={() => { setSourceOpen(true); trackEvent('source_open', { finding }) }}><FileText size={19} aria-hidden />Ver fuente<ArrowRight size={19} aria-hidden /></button></>}
    <p className="human-note">Vos revisás. Tu equipo decide.</p></div></ProductDialog>
}
function ProductView({ onFinding, onSource }: { onFinding: (finding: FindingScreen) => void; onSource: (finding: FindingScreen) => void }) {
  const [selected, setSelected] = useState<FindingScreen>('price')
  const item = compactFinding(selected)
  const select = (finding: FindingScreen) => { if (window.matchMedia('(max-width: 699px)').matches) onFinding(finding); else setSelected(finding) }
  return <div className="mini-product"><div className="app-toolbar"><span className="app-wordmark">EDP CONTROL</span><span>Caso ficticio</span></div><div className="app-title"><FileSpreadsheet size={24} aria-hidden /><div><h3>EDP Agosto 2026</h3><p>8 líneas · <strong>4 para mirar</strong></p></div></div>
    <div className="app-body"><div className="app-lines"><ul>{compactFindings.map((finding, index) => <li key={finding.key}><button type="button" className={selected === finding.key ? 'app-finding is-selected' : 'app-finding'} aria-pressed={selected === finding.key} onClick={() => select(finding.key)}><span className="row-number">0{index + 1}</span><span className="row-copy"><strong>{finding.subject}</strong><small><FindingIcon finding={finding.key} size={16} />{finding.label}</small></span><ArrowRight size={18} aria-hidden /></button></li>)}</ul>
      <details className="remaining-lines"><summary><Check size={17} aria-hidden /><span>4 líneas sin diferencias en estos controles</span><ChevronDown size={16} aria-hidden /></summary><ul>{syntheticCase.edp.lines.slice(4).map(line => <li key={line.lineId}><span>{line.lineId}</span><span>{line.description}</span></li>)}</ul></details>
    </div><div className="product-proof-panel" aria-live="polite"><p className="eyebrow">{item.label}</p><h4>{item.subject}</h4><CompactComparison finding={selected} /><p className="example-note">{item.note}</p>{item.action ? <p className="example-action">{item.action}</p> : null}<button type="button" className="source-link" onClick={() => onSource(selected)}><FileText size={18} aria-hidden />Ver fuente<ArrowRight size={18} aria-hidden /></button><p className="human-note">Vos revisás. Tu equipo decide.</p></div></div>
  </div>
}
export function CommercialPage() {
  const initial = landingForHash(window.location.hash)
  const [finding, setFinding] = useState<FindingScreen | null>(initial.finding)
  const [sourceOpen, setSourceOpen] = useState(initial.source)
  const [productPassed, setProductPassed] = useState(false), [contactVisible, setContactVisible] = useState(false)
  const productRef = useRef<HTMLElement>(null), contactRef = useRef<HTMLElement>(null)
  const { openPrivacy } = usePrivacy()
  const closeFinding = useCallback(() => setFinding(null), [])
  const openFinding = (key: FindingScreen, source = false) => { setSourceOpen(source); setFinding(key); trackEvent('finding_select', { finding: key }) }
  useEffect(() => {
    const scrollToSection = (section: string) => { if (section === 'inicio') window.scrollTo({ top: 0, behavior: 'instant' }); else document.getElementById(section)?.scrollIntoView({ behavior: 'instant' }) }
    const goToHash = () => { const target = landingForHash(window.location.hash); setFinding(target.finding); setSourceOpen(target.source); scrollToSection(target.section) }
    window.addEventListener('hashchange', goToHash)
    const frame = requestAnimationFrame(() => { if (window.location.hash) scrollToSection(landingForHash(window.location.hash).section) })
    return () => { window.removeEventListener('hashchange', goToHash); cancelAnimationFrame(frame) }
  }, [])
  useEffect(() => {
    const observer = new IntersectionObserver(entries => { for (const entry of entries) {
      if (entry.target === productRef.current) setProductPassed(!entry.isIntersecting && entry.boundingClientRect.bottom < 0)
      if (entry.target === contactRef.current) setContactVisible(entry.isIntersecting)
    } }, { threshold: 0 })
    if (productRef.current) observer.observe(productRef.current)
    if (contactRef.current) observer.observe(contactRef.current)
    return () => observer.disconnect()
  }, [])
  return <div className="simple-landing"><a className="skip-link" href="#inicio">Saltar al contenido</a><header className="site-header site-container"><a className="brand" href="#inicio"><strong>EDP</strong><span>CONTROL</span></a><a className="quiet-action" href="#producto">Ver producto<ArrowDown size={17} aria-hidden /></a></header><main>
    <section className="poster-section site-container" id="inicio" aria-labelledby="poster-title" tabIndex={-1}><p className="eyebrow">Para contratistas mineros</p><h1 id="poster-title">Encontramos lo que no cierra<br className="desktop-break" /> antes de que lo mandes.</h1><InputOutput onFinding={key => openFinding(key)} /></section>
    <section className="product-section site-container" id="producto" ref={productRef} aria-labelledby="product-title" tabIndex={-1}><h2 id="product-title">Así lo ves.</h2><ProductView onFinding={key => openFinding(key)} onSource={key => openFinding(key, true)} /><details className="how-it-works"><summary>¿Cómo funciona?</summary><p>Esta demo muestra comparaciones y fuentes preparadas de un caso ficticio. No recibe ni analiza tus archivos.</p></details></section>
    <div className="trial-contact site-container"><section id="probar" className="trial-section" aria-labelledby="trial-title" tabIndex={-1}><div className="trial-copy"><h2 id="trial-title">Empezamos con un EDP.</h2><p className="trial-promise">Si realmente te ahorra trabajo, seguimos.</p>
      {/* Reserved for a validated pilot scope and price. No price claim is rendered. */}<div className="pilot-price" hidden aria-hidden="true" />
      <ul className="reassurance-list"><li><Check size={18} aria-hidden />No reemplaza tu ERP para probarlo.</li><li><Check size={18} aria-hidden />Partimos de tus archivos y controles.</li><li><Check size={18} aria-hidden />Tu equipo sigue tomando la decisión.</li></ul>
    </div><figure className="context-photo"><img src={reviewPhoto} srcSet={`${reviewSmallPhoto} 640w, ${reviewPhoto} 1280w`} sizes="(max-width: 699px) calc(100vw - 48px), 420px" alt="Profesionales revisando documentación en un entorno industrial." width={1600} height={1067} loading="lazy" /><figcaption>Foto de contexto · <a href="https://www.pexels.com/photo/engineers-looking-at-blueprint-3862135/" target="_blank" rel="noopener noreferrer">Pexels</a> · no es nuestro equipo</figcaption></figure></section>
    <section id="contacto" ref={contactRef} className="contact-section" aria-labelledby="contact-title" tabIndex={-1}><div><h2 id="contact-title">¿Querés ver si sirve<br /> para tu proceso?</h2><p className="founder-line">Lo vemos con Ignacio Kairuz.</p></div><WhatsAppAction source="contact" large /></section></div>
  </main><footer className="site-meta site-container"><span>EDP Control · Ignacio Kairuz</span><button type="button" onClick={openPrivacy}>Datos y privacidad</button></footer>
    {productPassed && !contactVisible && !finding ? <div className="mobile-whatsapp"><WhatsAppAction source="mobile-floating" /></div> : null}
    {finding ? <FindingSheet key={`${finding}-${sourceOpen}`} finding={finding} initialSource={sourceOpen} onClose={closeFinding} /> : null}
  </div>
}
