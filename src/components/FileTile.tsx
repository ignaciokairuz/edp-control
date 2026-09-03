import { FileSpreadsheet, FileText, FolderArchive } from 'lucide-react'
import { cn } from '../lib/cn'

const icons = {
  xlsx: FileSpreadsheet,
  pdf: FileText,
  zip: FolderArchive,
} as const

type FileExt = keyof typeof icons

export function FileTile({
  name,
  kind,
  meta,
  ext,
  selected = true,
}: {
  name: string
  kind: string
  meta: string
  ext: string
  selected?: boolean
}) {
  const Icon = icons[(ext as FileExt) in icons ? (ext as FileExt) : 'pdf']

  return (
    <article
      className={cn(
        'flex min-h-[108px] flex-col justify-between border bg-surface p-4 text-left',
        selected ? 'border-ink/20' : 'border-line',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <Icon size={18} className="text-copper" aria-hidden />
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          {ext}
        </span>
      </div>
      <div>
        <p className="truncate font-mono text-[13px] text-ink">{name}</p>
        <p className="mt-1 text-xs text-muted">
          {kind} · {meta}
        </p>
      </div>
    </article>
  )
}
