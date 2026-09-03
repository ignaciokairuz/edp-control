import { Eraser, Upload } from 'lucide-react'
import { useRef, useState } from 'react'
import { usePrivacy } from './PrivacyModal'
import { trackEvent } from '../lib/analytics'
import { scrollToId } from '../lib/scroll'
import {
  guessMapping,
  mappingFields,
  parseSpreadsheet,
  type ColumnMapping,
  type ParsedSheet,
} from '../lib/parseSpreadsheet'

export function TemplateMapper() {
  const { openPrivacy } = usePrivacy()
  const inputRef = useRef<HTMLInputElement>(null)
  const [parsed, setParsed] = useState<ParsedSheet | null>(null)
  const [mapping, setMapping] = useState<ColumnMapping | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function onFile(file: File | undefined) {
    if (!file) return
    setError(null)
    setBusy(true)
    trackEvent('upload_started', { type: file.type || file.name.split('.').pop() })
    try {
      const result = await parseSpreadsheet(file)
      if (!result.columns.length) {
        setError('No se pudieron leer columnas en la primera hoja.')
        setParsed(null)
        setMapping(null)
        return
      }
      setParsed(result)
      setMapping(guessMapping(result.columns))
      trackEvent('upload_success', { rows: result.rowCount, cols: result.columns.length })
    } catch {
      setError('No se pudo leer el archivo. Probá un XLSX o CSV con encabezados en la primera fila.')
      setParsed(null)
      setMapping(null)
    } finally {
      setBusy(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  function clearFile() {
    setParsed(null)
    setMapping(null)
    setError(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <section className="border border-line bg-surface p-5 md:p-6" aria-labelledby="mapper-title">
      <p className="eyebrow">Plantilla propia</p>
      <h3 id="mapper-title" className="mt-2 text-xl font-medium tracking-tight">
        ¿Querés ver cómo mapearía tu plantilla?
      </h3>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-2">
        Podés cargar un XLSX o CSV. Se lee localmente en tu navegador: no se
        envía ni se almacena. Esta vista solo reconoce columnas; no corre un
        precontrol completo sin contrato.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept=".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
          className="sr-only"
          onChange={(event) => void onFile(event.target.files?.[0])}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
        >
          <Upload size={16} aria-hidden />
          {busy ? 'Leyendo archivo…' : 'Elegir XLSX o CSV'}
        </button>
        {parsed ? (
          <button type="button" className="btn btn-secondary" onClick={clearFile}>
            <Eraser size={16} aria-hidden />
            Eliminar archivo
          </button>
        ) : null}
        <button type="button" className="text-sm text-muted underline underline-offset-2" onClick={openPrivacy}>
          Privacidad de la demo
        </button>
      </div>

      {error ? (
        <p className="mt-4 border border-block/30 bg-block-bg px-3 py-2 text-sm text-block" role="alert">
          {error}
        </p>
      ) : null}

      {parsed && mapping ? (
        <div className="mt-6 space-y-5">
          <p className="text-sm text-ink-2">
            Archivo <span className="font-mono text-xs">{parsed.fileName}</span> ·
            hoja {parsed.sheetName} · {parsed.rowCount} filas leídas · se muestran
            las primeras {parsed.previewRows.length}.
          </p>

          <fieldset>
            <legend className="mb-3 text-sm font-medium">Mapear columnas</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {mappingFields.map((field) => (
                <label key={field.id} className="grid gap-1 text-sm">
                  <span>{field.label}</span>
                  <select
                    className="min-h-11 border border-line bg-paper px-3"
                    value={mapping[field.id]}
                    onChange={(event) =>
                      setMapping({ ...mapping, [field.id]: event.target.value })
                    }
                  >
                    <option value="">Sin asignar</option>
                    {parsed.columns.map((col) => (
                      <option key={col} value={col}>
                        {col}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="overflow-x-auto border border-line">
            <table className="w-full min-w-[640px] border-collapse text-left text-xs">
              <thead className="bg-paper-2 text-muted">
                <tr>
                  {parsed.columns.map((col) => (
                    <th key={col} className="px-2 py-2 font-medium">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {parsed.previewRows.map((row, index) => (
                  <tr key={index} className="border-t border-line">
                    {parsed.columns.map((col) => (
                      <td key={col} className="max-w-[180px] truncate px-2 py-2">
                        {row[col]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-l-2 border-copper bg-copper-soft/40 px-4 py-3 text-sm leading-6 text-ink-2">
            Tu archivo puede procesarse. Para realizar un precontrol real
            necesitamos asociarlo al contrato y sus modificaciones.
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => scrollToId('preguntas')}
          >
            Evaluar un caso anonimizado
          </button>
        </div>
      ) : null}
    </section>
  )
}
