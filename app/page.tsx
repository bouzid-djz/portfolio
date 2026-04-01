import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Experience } from "@/components/experience"
import { Timeline } from "@/components/timeline"
import { Veille } from "@/components/veille"
import { Contact } from "@/components/contact"
import { SidebarMenu } from "@/components/sidebar-menu"
import { GridBackground } from "@/components/grid-background"
import { Terminal } from "@/components/terminal"
import { ScrollProgress } from "@/components/scroll-progress"
import { KonamiEasterEgg } from "@/components/konami-easter-egg"
import { PresentationMode } from "@/components/presentation-mode"

const funFacts = [
  "🐙 Les pieuvres ont trois cœurs et un sang bleu.",
  "🌍 La Terre tourne à environ 1 670 km/h à l'équateur.",
  "🧠 Le cerveau humain contient environ 86 milliards de neurones.",
  "🍯 Le miel ne périme jamais — on en a trouvé dans des tombes égyptiennes vieilles de 3000 ans.",
  "⚡ La foudre frappe la Terre environ 100 fois par seconde.",
  "🦷 Les empreintes dentaires sont aussi uniques que les empreintes digitales.",
  "🚀 Il faut environ 8 minutes à la lumière du soleil pour atteindre la Terre.",
  "🐧 Les pingouins sont monogames — ils choisissent un partenaire pour la vie.",
]

function getRandomFact() {
  return funFacts[Math.floor(Math.random() * funFacts.length)]
}

export default function Home() {
  const fact = getRandomFact()
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
        <Contact />
      </main>
      <footer className="border-t border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-sm text-muted-foreground">© 2026 Quentin SILVA - Tous droits réservés</p>
          <p className="mt-2 text-xs text-muted-foreground/70 italic">💡 Le saviez-vous ? {fact}</p>
        </div>
      </footer>
      <Terminal />
      <KonamiEasterEgg />
    </div>
  )
}
