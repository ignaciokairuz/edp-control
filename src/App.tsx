import { BoundariesSection } from './components/BoundariesSection'
import { DemoWorkspace } from './components/DemoWorkspace'
import { DetectionCapabilities } from './components/DetectionCapabilities'
import { DiscoveryForm } from './components/DiscoveryForm'
import { FinalCTA } from './components/FinalCTA'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { ImplementationSection } from './components/ImplementationSection'
import { Navbar } from './components/Navbar'
import { PilotSection } from './components/PilotSection'
import { PrivacyProvider } from './components/PrivacyModal'
import { ProblemWorkflow } from './components/ProblemWorkflow'
import { SourcesSection } from './components/SourcesSection'
import { SystemFitDiagram } from './components/SystemFitDiagram'

export default function App() {
  return (
    <PrivacyProvider>
      <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-surface focus:px-3 focus:py-2">
        Saltar al contenido
      </a>
      <div id="top">
        <Navbar />
        <main id="contenido">
          <Hero />
          <ProblemWorkflow />
          <DemoWorkspace />
          <DetectionCapabilities />
          <SystemFitDiagram />
          <ImplementationSection />
          <PilotSection />
          <BoundariesSection />
          <DiscoveryForm />
          <SourcesSection />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </PrivacyProvider>
  )
}
