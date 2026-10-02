import test from 'node:test'
import assert from 'node:assert/strict'
import { syntheticCase as data } from '../src/data/syntheticCase.ts'
import { guessMapping, parseSpreadsheet } from '../src/lib/parseSpreadsheet.ts'

// Financial consistency matters even when this is explicitly a prepared demo.
test('line subtotals, package total and references are internally consistent', () => {
  const ids = new Set(data.documents.map(doc => doc.id))
  assert.equal(data.edp.lines.reduce((total, line) => {
    assert.equal(line.lineSubtotal, line.quantityPeriod * line.unitPrice)
    line.sourceRefs.forEach(ref => assert.ok(ids.has(ref)))
    return total + line.lineSubtotal
  }, 0), data.edp.subtotal)
  for (const finding of data.preparedFindings) {
    assert.ok(data.edp.lines.some(line => line.lineId === finding.lineId))
    finding.sourceRefs.forEach(ref => assert.ok(ids.has(ref)))
  }
})

test('differences agree with the period and cited source values', () => {
  const adenda = data.documents.find(doc => doc.id === 'AD-01')
  const acta = data.documents.find(doc => doc.id === 'ACT-08')
  const price = data.preparedFindings.find(f => f.id === 'F-01').arithmetic
  const quantity = data.preparedFindings.find(f => f.id === 'F-02').arithmetic
  assert.ok(adenda.effectiveFrom <= data.edp.periodStart)
  assert.equal(price.unitPriceDifference, adenda.newPrice - data.edp.lines[0].unitPrice)
  assert.equal(price.differenceAtSameQuantity, price.unitPriceDifference * price.quantity)
  assert.equal(price.subtotalAtSourcePrice, adenda.newPrice * price.quantity)
  assert.equal(quantity.quantityDifference, data.edp.lines[1].quantityPeriod - acta.quantityPeriod)
  assert.equal(quantity.amountAssociatedWithDifference, quantity.quantityDifference * quantity.unitPrice)
})

test('unflagged lines agree with both base price and period records', () => {
  const parts = data.documents.find(doc => doc.id === 'PART-08')
  const order = data.documents.find(doc => doc.id === 'OS-2407')
  const flagged = new Set(data.preparedFindings.map(f => f.lineId))
  for (const id of data.coverage.noDifferencesInShownChecks) {
    const line = data.edp.lines.find(l => l.lineId === id)
    assert.ok(!flagged.has(id))
    assert.equal(parts.rows.find(row => row.itemCode === id).quantityPeriod, line.quantityPeriod)
    assert.ok(order.sources[0].excerpt.includes(`USD ${line.unitPrice}/`))
  }
  assert.equal(flagged.size, data.coverage.flaggedLines)
})

test('reading duplicate headings preserves both cell values', async () => {
  const file = new File(['Descripción,Precio,Precio\nCamioneta,120,135'], 'plantilla.csv', { type: 'text/csv' })
  const parsed = await parseSpreadsheet(file)
  assert.equal(new Set(parsed.columns).size, parsed.columns.length)
  assert.equal(parsed.rowCount, 1)
  assert.equal(parsed.previewRows[0].Precio, '120')
  assert.equal(parsed.previewRows[0]['Precio (2)'], '135')
  assert.equal(guessMapping(parsed.columns).description, 'Descripción')
})

test('reader rejects unsupported and oversized files before parsing', async () => {
  await assert.rejects(parseSpreadsheet(new File(['content'], 'contrato.pdf')))
  await assert.rejects(parseSpreadsheet(new File([new Uint8Array(5 * 1024 * 1024 + 1)], 'grande.csv')))
})

test('short mapping hints and colliding labels keep columns separate', async () => {
  const mapping = guessMapping(['Moneda', 'Acumulado', 'Descripción', 'Precio'])
  assert.equal(mapping.line, '')
  assert.equal(mapping.unit, '')
  assert.equal(mapping.currency, 'Moneda')
  assert.equal(mapping.accum, 'Acumulado')
  const parsed = await parseSpreadsheet(new File(['Precio,Precio,Precio (2),Descripción\n120,135,140,Camioneta'], 'ficticio.csv'))
  assert.equal(new Set(parsed.columns).size, 4)
  assert.deepEqual(Object.values(parsed.previewRows[0]), ['120', '135', '140', 'Camioneta'])
})
