import { Eraser, Upload } from 'lucide-react'
import { useRef, useState } from 'react'
import { usePrivacy } from '../lib/privacy'
import { trackEvent } from '../lib/analytics'
import { ContactLink } from './ContactLink'
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
    if (file.size > 5 * 1024 * 1024 || !/\.(xlsx|csv)$/i.test(file.name)) {
      setError('Elegí un XLSX o CSV de hasta 5 MB, con encabezados en la primera fila.')
      setParsed(null)
      setMapping(null)
      if (inputRef.current) inputRef.current.value = ''
      return
    }
    setBusy(true)
    trackEvent('upload_started', { format: /\.xlsx$/i.test(file.name) ? 'xlsx' : /\.csv$/i.test(file.name) ? 'csv' : 'unsupported' })
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
      setError('No pudimos leer columnas. Probá un XLSX o CSV de hasta 5 MB con encabezados en la primera fila.')
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
        ¿Podemos leer las columnas de tu plantilla?
      </h3>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-2">
        Usá una plantilla vacía o con datos ficticios. Este lector lee la primera hoja y muestra las columnas; no revisa precios, contratos ni respaldos. El contenido se lee en este navegador: este lector no lo envía a un servidor ni lo guarda en la aplicación.
      </p>

      <p className="mt-3 text-sm text-muted">XLSX o CSV, hasta 5 MB, con encabezados en la primera fila.</p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept=".xlsx,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
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
          {busy ? 'Leyendo columnas…' : 'Elegir una plantilla sin datos sensibles'}
        </button>
        {parsed ? (
          <button type="button" className="btn btn-secondary" onClick={clearFile}>
            <Eraser size={16} aria-hidden />
            Quitar de esta vista
          </button>
        ) : null}
        <button type="button" className="min-h-11 text-sm text-muted underline underline-offset-2" onClick={openPrivacy}>
          Qué pasa con los archivos
        </button>
      </div>

      <p className="sr-only" role="status">{busy ? 'Leyendo columnas…' : parsed ? 'Pudimos leer estas columnas. No revisamos el contenido del EDP.' : ''}</p>
      {error ? (
        <p className="mt-4 border border-review/30 bg-review-bg px-3 py-2 text-sm text-review" role="alert">
          {error}
        </p>
      ) : null}

      {parsed && mapping ? (
        <div className="mt-6 space-y-5">
          <p className="text-sm text-ink-2">
            Archivo <span className="break-all font-mono text-xs">{parsed.fileName}</span> ·
            hoja {parsed.sheetName} · {parsed.rowCount} filas leídas · se muestran
            las primeras {parsed.previewRows.length}.
          </p>

          <fieldset>
            <legend className="mb-3 text-sm font-medium">Qué columna corresponde a cada dato</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {mappingFields.map((field) => (
                <label key={field.id} className="grid gap-1 text-sm">
                  <span>{field.label}</span>
                  <select
                    className="min-h-11 w-full min-w-0 border border-line bg-paper px-3"
                    value={mapping[field.id]}
                    onChange={(event) =>
                      setMapping({ ...mapping, [field.id]: event.target.value })
                    }
                  >
                    <option value="">Elegí la columna</option>
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

          <div className="overflow-x-auto border border-line" tabIndex={0} role="region" aria-label="Vista previa de la plantilla, tabla desplazable">
            <table className="w-full min-w-[640px] border-collapse text-left text-xs">
              <caption className="sr-only">Primeras filas de la primera hoja; sólo lectura de columnas.</caption>
              <thead className="bg-paper-2 text-muted">
                <tr>
                  {parsed.columns.map((col) => (
                    <th scope="col" key={col} className="px-2 py-2 font-medium">
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
            Pudimos leer estas columnas. Todavía no revisamos el contenido del EDP. Leer la hoja no confirma que sus datos sean correctos.
          </div>

          <ContactLink source="template-reader">Consultar por esta plantilla</ContactLink>
        </div>
      ) : null}
    </section>
  )
}
