import { Play, RotateCcw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { demoEdp, processSteps, type DemoException } from '../data/demoEdp'
import { trackEvent } from '../lib/analytics'
import { usePrefersReducedMotion } from '../lib/motion'
import { ExceptionDrawer } from './ExceptionDrawer'
import { ExceptionTable } from './ExceptionTable'
import { FileTile } from './FileTile'
import { ProcessingStepper } from './ProcessingStepper'
import { ResultSummary } from './ResultSummary'
import { TemplateMapper } from './TemplateMapper'

type Phase = 'idle' | 'running' | 'done'

export function DemoWorkspace() {
  const reduced = usePrefersReducedMotion()
  const [phase, setPhase] = useState<Phase>('idle')
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState<DemoException | null>(null)

  useEffect(() => {
    if (phase !== 'running') return
    if (reduced) {
      setStep(processSteps.length - 1)
      setPhase('done')
      return
    }

    const interval = window.setInterval(() => {
      setStep((current) => {
        if (current >= processSteps.length - 1) {
          window.clearInterval(interval)
          window.setTimeout(() => setPhase('done'), 280)
          return current
        }
        return current + 1
      })
    }, 340)

    return () => window.clearInterval(interval)
  }, [phase, reduced])

  function runDemo() {
    trackEvent('demo_run')
    setSelected(null)
    setStep(0)
    setPhase('running')
  }

  function resetDemo() {
    setSelected(null)
    setStep(0)
    setPhase('idle')
  }

  return (
    <section id="demo" className="scroll-mt-24 py-16 md:py-24">
      <div className="wrap-wide">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <p className="eyebrow">Demo operativa</p>
            <span className="border border-line bg-review-bg px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-review">
              Datos simulados
            </span>
          </div>
          <h2 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">
            Probalo sobre un caso de ejemplo
          </h2>
          <p className="mt-3 max-w-2xl text-[17px] leading-7 text-ink-2">
            Los documentos y empresas de esta demostración son sintéticos. El
            workflow representa un caso plausible de administración contractual
            minera.
          </p>
        </div>

        <div className="mt-8 border border-line bg-surface">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                Paquete · {demoEdp.contractor}
              </p>
              <p className="mt-1 text-sm text-ink-2">
                {demoEdp.project} · {demoEdp.contract.id} · {demoEdp.period}
              </p>
            </div>
            <p className="text-xs text-muted">synthetic: true</p>
          </div>

          <div className="space-y-6 p-5 md:p-6">
            <div>
              <h3 className="text-lg font-medium">Paso 1 — Archivos</h3>
              <p className="mt-1 text-sm text-muted">
                EDP, contrato, adenda y evidencias del período. Nada de esto se
                envía a un servidor.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {demoEdp.files.map((file) => (
                  <FileTile
                    key={file.id}
                    name={file.name}
                    kind={file.kind}
                    meta={file.meta}
                    ext={file.ext}
                  />
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={runDemo}
                  disabled={phase === 'running'}
                >
                  <Play size={16} aria-hidden />
                  {phase === 'running' ? 'Ejecutando…' : 'Ejecutar precontrol'}
                </button>
                {phase !== 'idle' ? (
                  <button type="button" className="btn btn-secondary" onClick={resetDemo}>
                    <RotateCcw size={16} aria-hidden />
                    Volver a archivos
                  </button>
                ) : null}
              </div>
            </div>

            {phase !== 'idle' ? (
              <div>
                <h3 className="mb-3 text-lg font-medium">Procesamiento</h3>
                <ProcessingStepper
                  activeIndex={step}
                  done={phase === 'done'}
                />
                <p className="sr-only" role="status" aria-live="polite">
                  {phase === 'done'
                    ? 'Precontrol finalizado. 28 líneas revisadas, 5 excepciones.'
                    : processSteps[step]}
                </p>
              </div>
            ) : null}

            {phase === 'done' ? (
              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 text-lg font-medium">Paso 2 — Resumen</h3>
                  <ResultSummary />
                </div>
                <div>
                  <ExceptionTable
                    onOpen={(item) => {
                      trackEvent('exception_open', { line: item.lineId })
                      setSelected(item)
                    }}
                  />
                </div>
              </div>
            ) : null}

            <p className="text-xs leading-5 text-muted">
              Los archivos de esta demo se procesan localmente en tu navegador y
              no se almacenan.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <TemplateMapper />
        </div>
      </div>

      <ExceptionDrawer item={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
