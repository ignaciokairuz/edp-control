export const screenHashes = {
  hero: '#inicio', edp: '#como-funciona', sources: '#fuentes', compare: '#comparacion',
  source: '#fuente', overview: '#demo', price: '#precio', quantity: '#cantidad',
  support: '#respaldo', change: '#adicional', summary: '#resumen', contact: '#probar', faq: '#preguntas',
} as const

export type Screen = keyof typeof screenHashes
export type FindingScreen = 'price' | 'quantity' | 'support' | 'change'
export const findingScreens: FindingScreen[] = ['price', 'quantity', 'support', 'change']
export const storyScreens: Screen[] = ['edp', 'sources', 'compare', 'source']

export function screenForHash(hash: string): Screen {
  const found = (Object.keys(screenHashes) as Screen[]).find(key => screenHashes[key] === hash)
  if (found) return found
  // Preserve links shared from the previous commercial page.
  if (hash === '#detecta') return 'overview'
  if (hash === '#lector') return 'contact'
  return 'hero'
}

export function isFinding(screen: Screen): screen is FindingScreen {
  return findingScreens.includes(screen as FindingScreen)
}

export function landingForHash(hash: string): { section: 'inicio' | 'producto' | 'probar' | 'contacto'; finding: FindingScreen | null; source: boolean } {
  if (hash === '#contacto') return { section: 'contacto', finding: null, source: false }
  if (hash === '#producto' || ['#demo', '#detecta'].includes(hash)) return { section: 'producto', finding: null, source: false }
  if (['#probar', '#lector', '#resumen'].includes(hash)) return { section: 'probar', finding: null, source: false }
  const old = screenForHash(hash)
  return { section: 'inicio', finding: old === 'source' ? 'price' : isFinding(old) ? old : null, source: old === 'source' }
}
