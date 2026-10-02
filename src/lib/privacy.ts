import { createContext, useContext } from 'react'

export const PrivacyContext = createContext<{ openPrivacy: () => void } | null>(null)

export function usePrivacy() {
  const context = useContext(PrivacyContext)
  if (!context) throw new Error('usePrivacy requiere PrivacyProvider')
  return context
}

