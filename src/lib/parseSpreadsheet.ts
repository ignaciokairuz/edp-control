
export type ParsedSheet = {
  fileName: string
  sheetName: string
  columns: string[]
  previewRows: Record<string, string>[]
  rowCount: number
}

export const mappingFields = [
  { id: 'line', label: 'Número de línea' },
  { id: 'description', label: 'Descripción' },
  { id: 'quantity', label: 'Cantidad' },
  { id: 'price', label: 'Precio' },
  { id: 'unit', label: 'Unidad' },
  { id: 'currency', label: 'Moneda' },
  { id: 'accum', label: 'Acumulado' },
  { id: 'reference', label: 'Referencia contractual' },
] as const

export type MappingFieldId = (typeof mappingFields)[number]['id']
export type ColumnMapping = Record<MappingFieldId, string>

const hints: Record<MappingFieldId, string[]> = {
  line: ['linea', 'línea', 'line', 'item', 'nro', 'n°', 'no'],
  description: ['descripcion', 'descripción', 'concepto', 'detalle', 'item'],
  quantity: ['cantidad', 'qty', 'cant', 'ejecutado'],
  price: ['precio', 'price', 'p.unit', 'unitario', 'tarifa'],
  unit: ['unidad', 'um', 'uom', 'und'],
  currency: ['moneda', 'currency', 'divisa'],
  accum: ['acumulado', 'acum', 'avance', '%', 'porcentaje'],
  reference: ['referencia', 'contrato', 'adenda', 'item contrato', 'codigo'],
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export function guessMapping(columns: string[]): ColumnMapping {
  const unused = [...columns]
  const mapping = {} as ColumnMapping

  for (const field of mappingFields) {
    const match = unused.find((col) =>
      hints[field.id].some((hint) => normalize(col).includes(hint)),
    )
    mapping[field.id] = match ?? ''
    if (match) {
      unused.splice(unused.indexOf(match), 1)
    }
  }

  return mapping
}

export async function parseSpreadsheet(file: File): Promise<ParsedSheet> {
  const XLSX = await import('xlsx')
  const buffer = await file.arrayBuffer()
  const workbook = XLSX.read(buffer, { type: 'array' })
  const sheetName = workbook.SheetNames[0] ?? 'Hoja1'
  const sheet = workbook.Sheets[sheetName]

  if (!sheet) {
    return {
      fileName: file.name,
      sheetName,
      columns: [],
      previewRows: [],
      rowCount: 0,
    }
  }

  const matrix = XLSX.utils.sheet_to_json<(string | number | boolean | null)[]>(
    sheet,
    {
      header: 1,
      defval: '',
      raw: false,
    },
  )

  const headerRow = (matrix[0] ?? []).map((cell, index) => {
    const label = String(cell ?? '').trim()
    return label || `Columna ${index + 1}`
  })

  const body = matrix.slice(1).filter((row) =>
    row.some((cell) => String(cell ?? '').trim() !== ''),
  )

  const previewRows = body.slice(0, 10).map((row) => {
    const record: Record<string, string> = {}
    headerRow.forEach((col, index) => {
      record[col] = String(row[index] ?? '')
    })
    return record
  })

  return {
    fileName: file.name,
    sheetName,
    columns: headerRow,
    previewRows,
    rowCount: body.length,
  }
}
