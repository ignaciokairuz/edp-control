import { ArrowDown, ArrowLeft, ArrowRight, Check, FileCheck2, FilePenLine, FileSpreadsheet, FileText, FolderOpen, Menu, Paperclip, Send, TriangleAlert, UserRound } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import minePhoto from '../assets/mine-1280.webp'
import mineSmallPhoto from '../assets/mine-640.webp'
import reviewPhoto from '../assets/review-1280.webp'
import reviewSmallPhoto from '../assets/review-640.webp'
import whatsappMark from '../assets/WhatsApp_Official.svg'
import { storyFaq } from '../data/storyFaq'
import { sourceReasons, storySources } from '../data/storySources'
import { syntheticCase } from '../data/syntheticCase'
import { findingScreens, isFinding, screenForHash, screenHashes, storyScreens, type FindingScreen, type Screen } from '../lib/story'
import { trackEvent } from '../lib/analytics'
import { usePrivacy } from '../lib/privacy'
import { ContactLink } from './ContactLink'
import { FindingComparison, SourceText } from './FindingComparison'
import { ProductDialog } from './ProductDialog'

const findingLabels = ['Precio distinto', 'Cantidad a revisar', 'Falta respaldo', 'Confirmar cambio']
const findingNames = ['Camioneta 4x4', 'Movimiento de suelo', 'Montaje de tablero', 'Turno nocturno']
const lineNames = [...findingNames, 'Supervisión', 'Generador', 'Topografía', 'Retiro de residuos']
const steps = { edp: 2, sources: 3, compare: 4, source: 5 } as const
const money = (amount: number) => 'USD ' + amount.toLocaleString('es-AR')

function RouteLink({ to, children, className = '', onClick }: { to: Screen; children: ReactNode; className?: string; onClick?: () => void }) {
  return <a href={screenHashes[to]} className={className} onClick={onClick}>{children}</a>
}

function PrimaryLink({ to, label, onClick }: { to: Screen; label: string; onClick?: () => void }) {
  return <RouteLink to={to} className="btn btn-primary" onClick={onClick}>{label}<ArrowRight size={20} aria-hidden /></RouteLink>
}

function WhatsAppAction({ source, large = false }: { source: string; large?: boolean }) {
  return <ContactLink source={source} ariaLabel="Escribir por WhatsApp" iconOnly className={`whatsapp-action ${large ? 'whatsapp-large' : ''}`}><img src={whatsappMark} alt="" width={large ? 46 : 36} height={large ? 46 : 36} /></ContactLink>
}

function ContextPhoto({ kind, className = '' }: { kind: 'mine' | 'review'; className?: string }) {
  const review = kind === 'review'
  return <figure className={`context-photo ${className}`}><img src={review ? reviewPhoto : minePhoto} srcSet={`${review ? reviewSmallPhoto : mineSmallPhoto} 640w, ${review ? reviewPhoto : minePhoto} 1280w`} sizes="(max-width: 699px) calc(100vw - 48px), (max-width: 1023px) 45vw, 600px"
    alt={review ? 'Profesionales revisando planos y documentos en un entorno industrial.' : 'Excavadora trabajando en una explotación minera.'}
    width={1600} height={1067} loading={className.includes('hero') ? 'eager' : 'lazy'} />
    <figcaption>Foto de contexto · <a href={review ? 'https://www.pexels.com/photo/engineers-looking-at-blueprint-3862135/' : 'https://www.pexels.com/photo/excavator-in-mine-15138925/'} target="_blank" rel="noopener noreferrer">Pexels</a></figcaption></figure>
}

function DocumentCard({ kind }: { kind: 'edp' | 'addendum' }) {
  const edp = kind === 'edp'
  return <article className={`document-card ${edp ? '' : 'addendum-card'}`} aria-label={edp ? 'Estado de Pago del ejemplo' : 'Adenda vigente del ejemplo'}>
    <p className="document-label">{edp ? <FileSpreadsheet size={20} aria-hidden /> : <FilePenLine size={20} aria-hidden />}{edp ? 'Estado de Pago' : 'Adenda 01'}</p>
    <p className="document-period">{edp ? 'Agosto 2026 · caso ficticio' : 'Vigente desde 01/08/2026'}</p>
    <div className="document-line"><p>01 · Camioneta 4x4</p>{edp ? <><p>15 días × USD 120/día</p><strong>USD 1.800</strong></> : <><strong>USD 135</strong><p>por día</p></>}</div>
    <p className="caption">{edp ? 'EDP-02 · revisión 0' : 'Adenda 01 · pág. 1 · ítem 01'}</p>
  </article>
}

function Hero() {
  return <section className="hero-screen screen-layout" aria-labelledby="screen-title">
    <div className="screen-copy"><p className="eyebrow">Para contratistas mineros</p><h1 id="screen-title" tabIndex={-1}>Antes de enviar tu Estado de Pago, encontrá lo que no cierra.</h1>
      <p className="lead">Tu EDP dice qué hiciste y cuánto esperás cobrar. Lo comparamos con lo acordado y sus respaldos, antes del envío.</p></div>
    <div className="hero-visual"><div className="hero-comparison"><p className="document-label">Camioneta 4x4 · caso ficticio</p><div className="hero-values"><div><span>En el EDP</span><strong>USD 120</strong><small>por día</small></div><span className="unequal" aria-label="no coincide con">≠</span><div><span>Adenda vigente</span><strong>USD 135</strong><small>por día</small></div></div></div><ContextPhoto kind="mine" className="hero-photo" /></div>
    <div className="hero-action-area"><RouteLink to="overview" className="quiet-action expert-link" onClick={() => trackEvent('hero_demo_click', { source: 'expert-shortcut' })}>Ya preparo Estados de Pago <ArrowRight size={16} aria-hidden /> ver el ejemplo</RouteLink>
      <PrimaryLink to="edp" label="Ver cómo funciona" onClick={() => trackEvent('guide_start')} /><p className="caption">Pre-revisión. Vos revisás y tu equipo decide.</p></div>
  </section>
}

function WorkSequence() {
  return <ol className="work-sequence" aria-label="Lugar de EDP Control en el proceso">{[
    { icon: UserRound, label: 'Trabajo realizado' }, { icon: FileSpreadsheet, label: 'Estado de Pago' },
    { icon: FileCheck2, label: 'Revisión previa' }, { icon: Send, label: 'Envío' },
  ].map((step, i) => <li key={step.label}><step.icon size={20} aria-hidden /><span>{step.label}</span>{i < 3 ? <ArrowRight className="sequence-arrow" size={16} aria-hidden /> : null}</li>)}</ol>
}

function EdpExplanation() {
  return <section className="edp-screen screen-layout" aria-labelledby="screen-title"><div className="screen-copy"><p className="eyebrow">El trabajo se presenta para cobrar</p><h1 id="screen-title" tabIndex={-1}>Primero armás lo que querés presentar para cobrar.</h1><p className="lead">El Estado de Pago reúne lo que hiciste en el período, cuánto corresponde cobrar y los documentos que lo respaldan.</p><WorkSequence /></div>
    <div className="edp-visual"><ContextPhoto kind="review" className="review-strip" /><DocumentCard kind="edp" /></div></section>
}

function SourcesExplanation() {
  return <section className="sources-screen screen-layout" aria-labelledby="screen-title"><div className="screen-copy"><p className="eyebrow">Lo presentado tiene otras fuentes</p><h1 id="screen-title" tabIndex={-1}>Pero el EDP no vive solo.</h1><p className="lead">Se revisa junto con lo acordado y con los documentos del trabajo.</p>
    <ul className="source-list"><li><FileText size={22} aria-hidden /><span>Orden de servicio<small>El alcance y las condiciones</small></span></li><li><FilePenLine size={22} aria-hidden /><span>Adenda 01<small>Un cambio vigente desde 01/08</small></span></li><li><Paperclip size={22} aria-hidden /><span>Respaldos<small>Actas, partes, informes y fotos</small></span></li></ul></div>
    <div className="sources-visual"><div className="persistent-edp"><FileSpreadsheet size={20} aria-hidden /><span>En el EDP: <strong>USD 120/día</strong></span></div><div className="causal-arrow"><ArrowDown size={24} aria-hidden /><span>Miramos la adenda del período</span></div><DocumentCard kind="addendum" /></div></section>
}

function Comparison() {
  return <section className="comparison-screen screen-layout" aria-labelledby="screen-title"><div className="screen-copy"><p className="eyebrow">Camioneta 4x4 · agosto 2026</p><h1 id="screen-title" tabIndex={-1}>El precio no coincide.</h1><p className="lead desktop-only">El EDP usa una tarifa distinta de la adenda vigente. Ahora podés ver la diferencia.</p></div>
    <div className="comparison-visual"><div className="big-comparison"><div><p className="document-label"><FileSpreadsheet size={20} aria-hidden />En el Estado de Pago</p><strong>USD 120</strong><p>por día · 15 días</p></div><span className="unequal" aria-label="no coincide con">≠</span><div><p className="document-label"><FilePenLine size={20} aria-hidden />En la adenda vigente</p><strong>USD 135</strong><p>por día · desde 01/08</p></div></div>
      <p className="difference-note"><TriangleAlert size={20} aria-hidden />Diferencia para revisar en 15 días: USD 225</p><p className="caption">Caso ficticio. La diferencia necesita revisión.</p></div></section>
}

function ProductOverview({ onPackage, onNeutral }: { onPackage: () => void; onNeutral: () => void }) {
  return <section className="product-screen" aria-labelledby="screen-title"><div className="product-intro"><div><p className="eyebrow">Así sería usarlo · caso ficticio</p><h1 id="screen-title" tabIndex={-1}>EDP Agosto 2026</h1><p className="lead">8 líneas · <strong>4 para revisar</strong></p></div><button type="button" className="quiet-action" onClick={onPackage}><FolderOpen size={20} aria-hidden />Ver el paquete</button></div>
    <div className="mini-application"><aside className="product-inputs"><p className="document-label">Documentos del ejemplo</p><ul>{[
      { icon: FileSpreadsheet, label: 'Estado de Pago', ref: 'EDP-02 · 8 líneas' }, { icon: FileText, label: 'Orden de servicio', ref: 'OS-2407' },
      { icon: FilePenLine, label: 'Adenda 01', ref: 'Desde 01/08' }, { icon: Paperclip, label: 'Respaldos', ref: 'Actas, partes, informe y fotos' },
    ].map(doc => <li key={doc.label}><doc.icon size={22} aria-hidden /><span>{doc.label}<small>{doc.ref}</small></span></li>)}</ul><p className="caption">El paquete y los hallazgos están precargados. La demo no analiza archivos reales.</p></aside>
      <div className="edp-rows"><p className="rows-label">Línea / concepto <span>Controles mostrados</span></p><ul>{syntheticCase.edp.lines.map((line, i) => <li key={line.lineId}>{i < 4 ? <RouteLink to={findingScreens[i]} className="finding-row review-row" onClick={() => trackEvent('finding_select', { finding: syntheticCase.preparedFindings[i].id })}><span className="row-number">{line.lineId}</span><span className="row-copy"><strong>{lineNames[i]}</strong><span className="row-status"><TriangleAlert size={16} aria-hidden />{findingLabels[i]}</span></span><ArrowRight size={20} aria-hidden /></RouteLink> : <button type="button" className="finding-row neutral-row" onClick={onNeutral}><span className="row-number">{line.lineId}</span><span className="row-copy"><strong>{lineNames[i]}</strong><span className="row-status"><Check size={16} aria-hidden />Sin diferencias en los controles mostrados</span></span></button>}</li>)}</ul></div></div>
    <p className="caption product-note">Abrí una línea para ver qué dice el EDP, qué dice la fuente y qué conviene revisar. Vos decidís.</p>
  </section>
}

function FindingDetail({ screen, onSource }: { screen: FindingScreen; onSource: () => void }) {
  const index = findingScreens.indexOf(screen)
  const finding = syntheticCase.preparedFindings[index]
  return <section className="detail-screen screen-layout" aria-labelledby="screen-title"><div className="screen-copy"><p className="eyebrow">EDP Agosto 2026 · caso ficticio</p><h1 id="screen-title" tabIndex={-1}>{findingNames[index]}</h1><p className="lead">Una marca para revisar, con su fuente.</p><RouteLink to="overview" className="quiet-action detail-back"><ArrowLeft size={18} aria-hidden />Volver a las 8 líneas</RouteLink></div><FindingComparison finding={finding} onOpenSource={onSource} /></section>
}

function SourcePanel({ finding, guided = false, onClose }: { finding: FindingScreen; guided?: boolean; onClose: () => void }) {
  const [tab, setTab] = useState(finding === 'support' ? 1 : 0)
  const sources = storySources[finding], source = sources[tab]
  return <ProductDialog title="Fuente" onClose={onClose} className="source-dialog"><div className="source-content">
    <p className="eyebrow">{guided ? '5 / 5 · la marca tiene una fuente' : 'EDP Agosto 2026 · caso ficticio'}</p><h3>{findingNames[findingScreens.indexOf(finding)]}</h3>
    {sources.length > 1 ? <div className="source-tabs" role="tablist" aria-label="Documentos que explican el hallazgo">{sources.map((item, i) => <button key={item.label} type="button" role="tab" id={`source-tab-${i}`} aria-controls="source-excerpt" aria-selected={tab === i} tabIndex={tab === i ? 0 : -1}
      onClick={() => setTab(i)} onKeyDown={event => {
        const next = event.key === 'ArrowRight' ? (tab + 1) % sources.length : event.key === 'ArrowLeft' ? (tab + sources.length - 1) % sources.length : event.key === 'Home' ? 0 : event.key === 'End' ? sources.length - 1 : null
        if (next !== null) { event.preventDefault(); setTab(next); event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('button')[next]?.focus() }
      }}>{item.label}</button>)}</div> : null}
    <article id="source-excerpt" className="source-paper" role={sources.length > 1 ? 'tabpanel' : undefined} aria-labelledby={sources.length > 1 ? `source-tab-${tab}` : undefined} tabIndex={sources.length > 1 ? 0 : undefined} key={tab}><p className="document-label"><FileText size={20} aria-hidden />{source.reference}</p><h4>{guided ? 'Cambio de tarifa' : source.label}</h4><blockquote><SourceText text={source.text} phrases={source.highlights} /></blockquote><p className="caption">{source.index ? 'Vista de los datos ficticios del índice' : 'Extracto del caso ficticio'}</p></article>
    <div className="source-explanation"><p className="document-label">Por qué se marcó</p><p>{sourceReasons[finding]}</p><p className="human-line"><UserRound size={20} aria-hidden />Vos decidís qué corregir o consultar.</p></div></div>
    <footer className="dialog-footer">{guided ? <PrimaryLink to="overview" label="Ver el producto" onClick={() => trackEvent('guide_complete')} /> : <button type="button" className="btn btn-primary" onClick={onClose}>Volver al hallazgo<ArrowLeft size={20} aria-hidden /></button>}</footer>
  </ProductDialog>
}

function Summary() {
  return <section className="summary-screen screen-layout" aria-labelledby="screen-title"><div className="screen-copy"><p className="eyebrow">Una revisión antes del envío</p><h1 id="screen-title" tabIndex={-1}>Encontrá.<br />Entendé.<br />Decidí.</h1><p className="lead">Menos búsqueda entre archivos. Más claridad sobre qué necesita revisión humana.</p></div>
    <div className="summary-visual"><ol className="summary-steps"><li><TriangleAlert size={24} aria-hidden /><div><strong>Encontrá.</strong><p>Qué no cierra.</p></div></li><li><FileText size={24} aria-hidden /><div><strong>Entendé.</strong><p>De dónde sale.</p></div></li><li><UserRound size={24} aria-hidden /><div><strong>Decidí.</strong><p>Qué corregir o consultar.</p></div></li></ol><ContextPhoto kind="mine" className="summary-photo" /></div></section>
}

function TrialContact() {
  return <section className="contact-screen screen-layout" aria-labelledby="screen-title"><div className="screen-copy"><p className="eyebrow">Una conversación · un caso</p><h1 id="screen-title" tabIndex={-1}>Probémoslo con un EDP.</h1><p className="lead">Podemos empezar con tu plantilla sin datos sensibles. No hace falta reemplazar tu ERP para probarlo.</p><ContextPhoto kind="review" className="contact-photo" /><p className="caption photo-disclosure">La fotografía muestra el contexto de trabajo; no es el equipo ni un cliente de EDP Control.</p></div>
    <div className="founder-area"><h2>Lo vemos directamente conmigo.</h2><div className="founder-byline"><span className="founder-initials" aria-hidden>IK</span><div><strong>Ignacio Kairuz</strong><p>Automatizaciones y sistemas de datos</p></div></div>
      <p>Cruzo información y encuentro diferencias. Con EDP Control quiero aplicar ese enfoque a revisar Estados de Pago antes de presentarlos.</p><p>Para empezar no hace falta implementar un sistema. Vemos un caso y comprobamos si realmente te ahorra trabajo.</p>
      <div className="contact-action"><WhatsAppAction source="contact" large /><div><p>Escribime. Lo vemos juntos.</p><span>WhatsApp · mensaje editable</span></div></div>
      <ContactLink source="contact" channel="calendar" className="quiet-action">Agendar 20 minutos</ContactLink><p className="caption">El tratamiento de datos se acuerda antes del piloto.</p><RouteLink to="faq" className="quiet-action">¿Tenés una pregunta?<ArrowRight size={18} aria-hidden /></RouteLink>
    </div></section>
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return <section className="faq-screen screen-layout" aria-labelledby="screen-title"><div className="screen-copy"><p className="eyebrow">Preguntas frecuentes</p><h1 id="screen-title" tabIndex={-1}>Lo necesario para empezar.</h1><p className="lead">Después del ejemplo, resolvemos las dudas para probar un caso.</p></div><div className="faq-list">{storyFaq.map((item, i) => <section className="faq-item" key={item.question}><h2><button type="button" aria-expanded={open === i} aria-controls={`faq-answer-${i}`} onClick={() => setOpen(open === i ? null : i)}>{item.question}<span aria-hidden>{open === i ? '−' : '+'}</span></button></h2><div id={`faq-answer-${i}`} className="faq-answer" hidden={open !== i}><p>{item.answer}</p></div></section>)}</div></section>
}

function PackagePanel({ neutral = false, onClose }: { neutral?: boolean; onClose: () => void }) {
  return <ProductDialog title={neutral ? 'Controles mostrados' : 'Paquete del ejemplo'} onClose={onClose}><div className="package-content"><p className="eyebrow">Caso ficticio · agosto 2026</p>{neutral ? <><h3>Sin diferencias en estos controles.</h3><p>Las líneas 05–08 coinciden en precio con el Anexo A de OS-2407 y en cantidad con Partes_Agosto.csv.</p><ul className="neutral-lines">{syntheticCase.edp.lines.slice(4).map((line, i) => <li key={line.lineId}><Check size={20} aria-hidden /><span>{line.lineId} · {lineNames[i + 4]}<small>{line.quantityPeriod} {line.unit} × {money(line.unitPrice)}</small></span></li>)}</ul><p>No se revisan acumulados, impuestos, retenciones ni la calidad técnica del trabajo en esta demostración.</p></> : <><h3>Qué entra a la revisión.</h3><p>Un EDP, lo acordado y los respaldos del período.</p><ul className="package-files"><li><FileSpreadsheet size={20} aria-hidden /><span>{syntheticCase.edp.fileName}<small>EDP-02 · revisión 0 · 8 líneas</small></span></li>{syntheticCase.documents.map(doc => <li key={doc.id}><FileText size={20} aria-hidden /><span>{doc.name}<small>{doc.id}{'count' in doc ? ' · 4 fotografías agrupadas' : ''}</small></span></li>)}</ul></>}<p className="context-note">Los resultados están preparados para mostrar el flujo. Verlos no aprueba ni modifica el EDP.</p></div><footer className="dialog-footer"><button type="button" className="btn btn-primary" onClick={onClose}>Volver al ejemplo<ArrowLeft size={20} aria-hidden /></button></footer></ProductDialog>
}

export function CommercialPage() {
  const [screen, setScreen] = useState<Screen>(() => screenForHash(window.location.hash))
  const [menu, setMenu] = useState(false)
  const [source, setSource] = useState<FindingScreen | null>(null)
  const [extra, setExtra] = useState<'package' | 'neutral' | null>(null)
  const [understood, setUnderstood] = useState(() => {
    const initial = screenForHash(window.location.hash)
    return initial === 'source' || isFinding(initial) || ['summary', 'contact'].includes(initial)
  })
  const firstRender = useRef(true)
  const { openPrivacy } = usePrivacy()
  const go = useCallback((next: Screen) => { window.location.hash = screenHashes[next] }, [])
  const closeSource = useCallback(() => { if (screen === 'source') go('compare'); else setSource(null) }, [screen, go])

  useEffect(() => {
    const sync = () => {
      const next = screenForHash(window.location.hash)
      setScreen(next); setMenu(false); setSource(null); setExtra(null)
      if (next === 'source' || isFinding(next) || ['summary', 'contact'].includes(next)) setUnderstood(true)
    }
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return }
    const frame = requestAnimationFrame(() => { if (screen !== 'source') { document.getElementById('screen-title')?.focus({ preventScroll: true }); window.scrollTo({ top: 0, behavior: 'instant' }) } })
    return () => cancelAnimationFrame(frame)
  }, [screen])

  const guided = storyScreens.includes(screen)
  const blockedByDialog = menu || source !== null || extra !== null || screen === 'source'
  const showWhatsApp = understood && !blockedByDialog && ['overview', 'summary', 'faq'].includes(screen)
  const page = screen === 'source' ? 'compare' : screen
  let view
  switch (page) {
    case 'hero': view = <Hero />; break
    case 'edp': view = <EdpExplanation />; break
    case 'sources': view = <SourcesExplanation />; break
    case 'compare': view = <Comparison />; break
    case 'overview': view = <ProductOverview onPackage={() => setExtra('package')} onNeutral={() => setExtra('neutral')} />; break
    case 'summary': view = <Summary />; break
    case 'contact': view = <TrialContact />; break
    case 'faq': view = <FAQ />; break
    default: view = isFinding(page) ? <FindingDetail screen={page} onSource={() => { setSource(page); setUnderstood(true); trackEvent('source_open', { finding: page }) }} /> : <Hero />
  }

  const bottom = page === 'edp' ? { previous: 'hero', next: 'sources', label: 'Siguiente' } : page === 'sources' ? { previous: 'edp', next: 'compare', label: 'Comparar' } : page === 'compare' ? { previous: 'sources', next: 'source', label: 'Ver de dónde sale' } : page === 'overview' ? { previous: 'hero', next: 'summary', label: 'Así de simple' } : page === 'summary' ? { previous: 'overview', next: 'contact', label: 'Probémoslo con un EDP' } : page === 'faq' ? { previous: 'contact', next: 'contact', label: 'Probar con un EDP' } : null

  return <div className={`product-story page-${page}`}>
    <a className="skip-link" href="#screen-title" onClick={event => { event.preventDefault(); document.getElementById('screen-title')?.focus() }}>Saltar al contenido</a>
    <header className="site-header"><div className="site-container header-row"><RouteLink to="hero" className="brand" ><strong>EDP</strong><span>CONTROL</span></RouteLink>{guided ? <RouteLink to="hero" className="quiet-action">Salir</RouteLink> : <button type="button" className="quiet-action" aria-haspopup="dialog" aria-expanded={menu} onClick={() => setMenu(true)}>Menú<Menu size={20} aria-hidden /></button>}</div></header>
    <main className="site-container main-content" key={page}>{guided ? <div className="story-progress"><span>{steps[screen as keyof typeof steps]} / 5</span><RouteLink to="overview" className="quiet-action">Ver el producto<ArrowRight size={16} aria-hidden /></RouteLink></div> : null}{view}</main>
    {bottom ? <footer className={`screen-footer ${showWhatsApp ? 'with-whatsapp' : ''}`}><div className="site-container screen-footer-row"><RouteLink to={bottom.previous as Screen} className="quiet-action back-link"><ArrowLeft size={18} aria-hidden />Volver</RouteLink><PrimaryLink to={bottom.next as Screen} label={bottom.label} />{showWhatsApp ? <WhatsAppAction source={screen} /> : null}</div></footer> : null}
    {!guided ? <footer className="site-meta site-container"><span>EDP Control · Ignacio Kairuz</span><nav aria-label="Información"><RouteLink to="faq">Preguntas</RouteLink><button type="button" onClick={openPrivacy}>Datos y privacidad</button></nav></footer> : null}
    {menu ? <ProductDialog title="Menú" className="menu-dialog" onClose={() => setMenu(false)}><nav className="menu-links" aria-label="Navegación principal">{[{ to: 'edp', label: 'Cómo funciona' }, { to: 'overview', label: 'Ver el ejemplo' }, { to: 'contact', label: 'Probar con un EDP' }, { to: 'faq', label: 'Preguntas frecuentes' }].map(link => <RouteLink key={link.to} to={link.to as Screen} onClick={() => setMenu(false)}>{link.label}<ArrowRight size={22} aria-hidden /></RouteLink>)}</nav><p className="caption menu-note">Una revisión antes del envío. La decisión sigue con tu equipo.</p></ProductDialog> : null}
    {screen === 'source' || source ? <SourcePanel key={screen === 'source' ? 'guided' : source} finding={screen === 'source' ? 'price' : source!} guided={screen === 'source'} onClose={closeSource} /> : null}
    {extra ? <PackagePanel neutral={extra === 'neutral'} onClose={() => setExtra(null)} /> : null}
    <span className="sr-only" aria-live="polite">{guided ? `Explicación, paso ${steps[screen as keyof typeof steps]} de 5.` : screen === 'overview' ? 'Ejemplo con ocho líneas y cuatro para revisar.' : ''}</span>
  </div>
}
