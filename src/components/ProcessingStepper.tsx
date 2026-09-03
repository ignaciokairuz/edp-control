import { Check } from 'lucide-react'
import { processSteps } from '../data/demoEdp'
import { cn } from '../lib/cn'

export function ProcessingStepper({
  activeIndex,
  done,
}: {
  activeIndex: number
  done: boolean
}) {
  return (
    <ol className="grid gap-2 sm:grid-cols-5" aria-label="Etapas del precontrol">
      {processSteps.map((step, index) => {
        const isDone = done || index < activeIndex
        const isActive = !done && index === activeIndex
        return (
          <li
            key={step}
            className={cn(
              'flex items-center gap-2 border px-3 py-2.5 text-sm',
              isActive && 'border-copper bg-copper-soft text-ink',
              isDone && 'border-line bg-ok-bg/60 text-ok',
              !isActive && !isDone && 'border-line bg-paper text-muted',
            )}
            aria-current={isActive ? 'step' : undefined}
          >
            <span
              className={cn(
                'grid h-5 w-5 shrink-0 place-items-center font-mono text-[10px]',
                isActive && 'bg-copper text-white',
                isDone && 'bg-ok text-white',
                !isActive && !isDone && 'bg-paper-2 text-muted',
              )}
            >
              {isDone ? <Check size={12} strokeWidth={2.6} aria-hidden /> : index + 1}
            </span>
            <span>{step}</span>
          </li>
        )
      })}
    </ol>
  )
}
