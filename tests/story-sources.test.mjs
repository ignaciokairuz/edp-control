import test from 'node:test'
import assert from 'node:assert/strict'
import { syntheticCase as data } from '../src/data/syntheticCase.ts'
import { storySources } from '../src/data/storySources.ts'
import { screenForHash, screenHashes } from '../src/lib/story.ts'

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
