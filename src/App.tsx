import { CommercialPage } from './components/CommercialPage'
import { PrivacyProvider } from './components/PrivacyModal'

export default function App() {
  return <PrivacyProvider><CommercialPage /></PrivacyProvider>
}
