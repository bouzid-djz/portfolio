import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Certifications } from "@/components/certifications" // Import Certifications component
import { Projects } from "@/components/projects"
import { Experience } from "@/components/experience"
import { Timeline } from "@/components/timeline"
import { Veille } from "@/components/veille"
import { Labs } from "@/components/labs"
import { Contact } from "@/components/contact"
import { SidebarMenu } from "@/components/sidebar-menu"
import { GridBackground } from "@/components/grid-background"
import { Terminal } from "@/components/terminal"
import { ScrollProgress } from "@/components/scroll-progress"
import { KonamiEasterEgg } from "@/components/konami-easter-egg"
import { PresentationMode } from "@/components/presentation-mode"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      <ScrollProgress />
      <GridBackground />
      <SidebarMenu />
      <PresentationMode />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Timeline />
        <Veille />
        <Labs />
        <Contact />
      </main>
      <footer className="border-t border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-sm text-muted-foreground">© 2025 Quentin SILVA - Tous droits réservés</p>
        </div>
      </footer>
      <Terminal />
      <KonamiEasterEgg />
    </div>
  )
}
