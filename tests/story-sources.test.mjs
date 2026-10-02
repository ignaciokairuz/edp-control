import test from 'node:test'
import assert from 'node:assert/strict'
import { syntheticCase as data } from '../src/data/syntheticCase.ts'
import { storySources } from '../src/data/storySources.ts'
import { landingForHash, screenForHash, screenHashes } from '../src/lib/story.ts'
import { compactFindings } from '../src/data/compactFindings.ts'

test('story links survive reload and older shared URLs remain useful', () => {
  for (const [screen, hash] of Object.entries(screenHashes)) assert.equal(screenForHash(hash), screen)
  assert.equal(screenForHash('#detecta'), 'overview')
  assert.equal(screenForHash('#lector'), 'contact')
  assert.equal(screenForHash('#top'), 'hero')
  assert.equal(screenForHash('#unknown'), 'hero')
})

test('each quoted source is an actual excerpt of the fictitious package', () => {
  const excerpts = data.documents.flatMap(doc => 'sources' in doc ? doc.sources.map(source => source.excerpt) : [])
  for (const fragments of Object.values(storySources)) for (const fragment of fragments) {
    if (!fragment.index) assert.ok(excerpts.includes(fragment.text), fragment.reference)
    for (const highlighted of fragment.highlights) assert.ok(fragment.text.includes(highlighted), highlighted)
  }
})

test('the missing-support and change views preserve available-package limits', () => {
  const index = data.documents.find(doc => doc.id === 'IDX-08')
  assert.equal(index.entries.find(entry => entry.itemCode === '03' && entry.expected.startsWith('Acta')).present, false)
  assert.equal(index.entries.find(entry => entry.itemCode === '04').present, false)
  assert.match(storySources.support[2].text, /no encontrada en el paquete/)
  assert.match(storySources.change[2].text, /no encontrada en el paquete/)
  assert.match(storySources.change[0].text, /Estado: borrador/)
  assert.equal(storySources.support[1].reference, 'OS-2407 · pág. 4 · cláusula 6.3')
  assert.equal(storySources.change[1].reference, 'OS-2407 · pág. 5 · cláusula 8.2')
})

test('simplified landing preserves shared findings while removing the mandatory tutorial', () => {
  assert.deepEqual(landingForHash('#fuente'), { section: 'inicio', finding: 'price', source: true })
  assert.equal(landingForHash('#precio').finding, 'price')
  assert.equal(landingForHash('#cantidad').finding, 'quantity')
  assert.equal(landingForHash('#respaldo').finding, 'support')
  assert.equal(landingForHash('#adicional').finding, 'change')
  for (const hash of ['#producto', '#demo', '#detecta']) assert.equal(landingForHash(hash).section, 'producto')
  for (const hash of ['#probar', '#lector', '#resumen']) assert.equal(landingForHash(hash).section, 'probar')
  for (const hash of ['#como-funciona', '#fuentes', '#comparacion', '#preguntas']) assert.deepEqual(landingForHash(hash), { section: 'inicio', finding: null, source: false })
})

test('compact examples retain fixture values and available-package limits', () => {
  assert.equal(compactFindings.length, data.preparedFindings.length)
  assert.equal(compactFindings[0].left, 'USD ' + data.edp.lines[0].unitPrice)
  assert.equal(compactFindings[0].right, 'USD 135')
  assert.match(compactFindings[0].note, /225 para revisar/)
  assert.equal(compactFindings[1].left, data.edp.lines[1].quantityPeriod + ' m³')
  assert.match(compactFindings[2].note, /en este paquete/)
  assert.match(compactFindings[3].note, /archivos disponibles/)
  assert.equal(compactFindings[3].action, 'Confirmar con Contratos.')
})
