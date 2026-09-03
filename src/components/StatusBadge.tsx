import { Check, CircleAlert, Scale, ShieldAlert, Wrench } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

type Tone = 'ok' | 'correctable' | 'review' | 'block' | 'evidence'

const styles: Record<Tone, string> = {
  ok: 'bg-ok-bg text-ok',
  correctable: 'bg-review-bg text-review',
  review: 'bg-review-bg text-review',
  block: 'bg-block-bg text-block',
  evidence: 'bg-evidence-bg text-evidence',
}

const icons: Record<Tone, ReactNode> = {
  ok: <Check size={13} strokeWidth={2.4} aria-hidden />,
  correctable: <Wrench size={13} strokeWidth={2.2} aria-hidden />,
  review: <Scale size={13} strokeWidth={2.2} aria-hidden />,
  block: <ShieldAlert size={13} strokeWidth={2.2} aria-hidden />,
  evidence: <CircleAlert size={13} strokeWidth={2.2} aria-hidden />,
}

export function StatusBadge({
  tone,
  label,
  compact = false,
}: {
  tone: Tone
  label: string
  compact?: boolean
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium',
        compact ? 'px-1.5 py-0.5 text-[11px]' : 'px-2 py-1 text-xs',
        styles[tone],
      )}
    >
      {icons[tone]}
      {label}
    </span>
  )
}
