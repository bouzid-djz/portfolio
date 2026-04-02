"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Download,
  ExternalLink,
  Play,
  Workflow,
  Network,
  Server,
  ChevronRight,
  X,
  Globe,
  CheckCircle2,
  Circle,
} from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/translations"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { BackupDemo } from "@/components/backup-demo"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type Project = {
  title: string
  description: string
  longDescription: string
  context: string
  technologies: string[]
  downloadUrl: string
  hasDemo: boolean
  icon: React.ElementType | null
  color: string
  category: string
  steps?: { label: string; done: boolean }[]
  highlight?: boolean
}

export function Projects() {
  const { language } = useLanguage()
  const t = translations[language].projects
  const { ref, isVisible } = useScrollAnimation()
  const [showBackupDemo, setShowBackupDemo] = useState(false)
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects: Project[] = [
    {
      title: t.project1Title,
      description: t.project1Desc,
      longDescription:
        language === "fr"
          ? "Proposition et mise en place complète d'un parc informatique et du réseau pour une entreprise pharmaceutique simulée. Le projet couvre l'architecture réseau (VLAN, routage inter-VLAN), le plan d'adressage IP, le câblage, et la sécurité de base (ACL, pare-feu). Réalisé en groupe dans le cadre du BTS SIO."
          : "Complete proposal and implementation of an IT and network infrastructure for a simulated pharmaceutical company. The project covers network architecture (VLANs, inter-VLAN routing), IP addressing plan, cabling, and basic security (ACL, firewall). Completed in a group as part of the BTS SIO program.",
      context: t.context,
      technologies: ["CISCO", "Packet Tracer", "VLAN", "ACL", "Routage"],
      downloadUrl: "/Projet.zip",
      hasDemo: false,
      icon: Network,
      color: "#4d8fff",
      category: "réseau",
      highlight: true,
      steps: [
        { label: language === "fr" ? "Analyse des besoins" : "Requirements analysis", done: true },
        { label: language === "fr" ? "Plan d'adressage IP" : "IP addressing plan", done: true },
        { label: language === "fr" ? "Configuration VLAN" : "VLAN configuration", done: true },
        { label: language === "fr" ? "Sécurisation (ACL)" : "Security (ACL)", done: true },
        { label: language === "fr" ? "Documentation" : "Documentation", done: true },
      ],
    },
    {
      title: t.project2Title,
      description: t.project2Desc,
      longDescription:
        language === "fr"
          ? "Système automatisé de sauvegarde quotidienne des fichiers critiques de l'entreprise, développé en stage. Le script PowerShell déclenche les sauvegardes à heure fixe, gère la rotation des fichiers, envoie un rapport par e-mail et journalise les opérations. Un script VBS complémentaire assure la compatibilité avec les postes anciens."
          : "Automated daily backup system for critical company files, developed during internship. The PowerShell script triggers backups at a fixed time, handles file rotation, sends an email report and logs operations. A complementary VBS script ensures compatibility with older workstations.",
      context: t.internship,
      technologies: ["PowerShell", "VBS", "Windows Task Scheduler", "SMTP"],
      downloadUrl: "/Projet2.zip",
      hasDemo: true,
      icon: Server,
      color: "#7ef473",
      category: "scripting",
      highlight: false,
      steps: [
        { label: language === "fr" ? "Analyse des besoins" : "Requirements analysis", done: true },
        { label: language === "fr" ? "Script PowerShell" : "PowerShell script", done: true },
        { label: language === "fr" ? "Planification tâche" : "Task scheduling", done: true },
        { label: language === "fr" ? "Rapport e-mail" : "Email report", done: true },
        { label: language === "fr" ? "Script VBS legacy" : "Legacy VBS script", done: true },
      ],
    },
    {
      title: t.project3Title,
      description: t.project3Desc,
      longDescription:
        language === "fr"
          ? "Conception et déploiement d'une infrastructure complète via Proxmox VE. Le lab intègre un contrôleur de domaine Active Directory sous Windows Server, un serveur de fichiers TrueNAS, une segmentation réseau par VLAN, et plusieurs VMs Ubuntu pour les services (DNS, DHCP, web). Entièrement documenté avec captures d'écran et schéma réseau."
          : "Design and deployment of a complete infrastructure using Proxmox VE. The lab integrates an Active Directory domain controller on Windows Server, a TrueNAS file server, network segmentation via VLANs, and several Ubuntu VMs for services (DNS, DHCP, web). Fully documented with screenshots and network diagram.",
      context: t.context,
      technologies: ["Proxmox", "Active Directory", "TrueNAS", "VLAN", "Windows Server", "Ubuntu"],
      downloadUrl: "#",
      hasDemo: false,
      icon: Server,
      color: "#f05100",
      category: "infrastructure",
      highlight: true,
      steps: [
        { label: language === "fr" ? "Installation Proxmox" : "Proxmox installation", done: true },
        { label: language === "fr" ? "Déploiement AD/DNS" : "AD/DNS deployment", done: true },
        { label: language === "fr" ? "Configuration TrueNAS" : "TrueNAS setup", done: true },
        { label: language === "fr" ? "Segmentation VLAN" : "VLAN segmentation", done: true },
        { label: language === "fr" ? "Documentation" : "Documentation", done: true },
      ],
    },
    {
      title: t.project4Title,
      description: t.project4Desc,
      longDescription:
        language === "fr"
          ? "Workflow d'automatisation n8n qui collecte chaque semaine les actualités tech depuis plusieurs sources RSS et sites web, les consolide, puis envoie un digest formaté par e-mail chaque dimanche matin. Le workflow tourne en self-hosted et est entièrement configurable sans écrire de code."
          : "n8n automation workflow that weekly collects tech news from multiple RSS sources and websites, consolidates them, then sends a formatted digest by email every Sunday morning. The workflow runs self-hosted and is fully configurable without writing any code.",
      context: t.personal,
      technologies: ["n8n", "RSS", "Automatisation", "E-mail", "Self-hosted"],
      downloadUrl: "#",
      hasDemo: false,
      icon: Workflow,
      color: "#ac4bff",
      category: "automatisation",
      highlight: false,
      steps: [
        { label: language === "fr" ? "Setup n8n self-hosted" : "n8n self-hosted setup", done: true },
        { label: language === "fr" ? "Collecte RSS" : "RSS collection", done: true },
        { label: language === "fr" ? "Filtrage & consolidation" : "Filtering & consolidation", done: true },
        { label: language === "fr" ? "Envoi e-mail digest" : "Email digest sending", done: true },
        { label: language === "fr" ? "Planification hebdo" : "Weekly scheduling", done: true },
      ],
    },
  ]

  const filters = [
    { key: "all", label: language === "fr" ? "Tous" : "All" },
    { key: "réseau", label: language === "fr" ? "Réseaux" : "Networks" },
    { key: "infrastructure", label: language === "fr" ? "Infrastructure" : "Infrastructure" },
    { key: "scripting", label: "Scripting" },
    { key: "automatisation", label: language === "fr" ? "Automation" : "Automation" },
  ]

  const filtered =
    activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter)

  return (
    <section id="projects" className="py-24 scroll-mt-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`max-w-5xl mx-auto space-y-10 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Header */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-balance">{t.title}</h2>
            <div className="h-1 w-20 bg-primary rounded-full" />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono border transition-all duration-200 ${
                  activeFilter === f.key
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent border-border/40 text-muted-foreground hover:border-primary/60 hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((project, index) => {
              const Icon = project.icon
              const isHighlight = project.highlight
              return (
                <Card
                  key={index}
                  onClick={() => setSelectedProject(project)}
                  className={`group relative overflow-hidden cursor-pointer border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    isHighlight ? "md:col-span-1" : ""
                  }`}
                  style={{
                    boxShadow: `0 0 0 0 ${project.color}00`,
                  }}
                >
                  {/* Colored top bar */}
                  <div
                    className="h-0.5 w-full absolute top-0 left-0 opacity-80"
                    style={{ background: project.color }}
                  />

                  <div className="p-6 space-y-4">
                    {/* Icon + Badge */}
                    <div className="flex items-start justify-between">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ background: `${project.color}18` }}
                      >
                        {Icon && <Icon className="w-5 h-5" style={{ color: project.color }} />}
                      </div>
                      <Badge variant="outline" className="text-xs font-mono">
                        {project.context}
                      </Badge>
                    </div>

                    {/* Title + Description */}
                    <div className="space-y-2">
                      <h3 className="text-base font-semibold leading-snug text-balance group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs font-mono px-2 py-0.5"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge variant="secondary" className="text-xs font-mono px-2 py-0.5 opacity-60">
                          +{project.technologies.length - 4}
                        </Badge>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-1">
                      <span
                        className="text-xs font-mono opacity-60"
                        style={{ color: project.color }}
                      >
                        {project.category}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1 group-hover:text-primary transition-colors">
                        {language === "fr" ? "Voir le détail" : "View details"}
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Project Detail Modal */}
          {selectedProject && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
              <Card
                className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto border-border/60 bg-card shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Top color bar */}
                <div
                  className="h-1 w-full rounded-t-lg"
                  style={{ background: selectedProject.color }}
                />
                <div className="p-6 md:p-8 space-y-6">
                  {/* Modal header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${selectedProject.color}1a` }}
                      >
                        {selectedProject.icon && (
                          <selectedProject.icon
                            className="w-6 h-6"
                            style={{ color: selectedProject.color }}
                          />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold leading-tight">{selectedProject.title}</h3>
                        <Badge variant="outline" className="mt-1 text-xs font-mono">
                          {selectedProject.context}
                        </Badge>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Long description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedProject.longDescription}
                  </p>

                  {/* Steps */}
                  {selectedProject.steps && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold font-mono uppercase tracking-wider text-muted-foreground">
                        {language === "fr" ? "Étapes réalisées" : "Completed steps"}
                      </h4>
                      <div className="space-y-2">
                        {selectedProject.steps.map((step, i) => (
                          <div key={i} className="flex items-center gap-2.5 text-sm">
                            {step.done ? (
                              <CheckCircle2
                                className="w-4 h-4 shrink-0"
                                style={{ color: selectedProject.color }}
                              />
                            ) : (
                              <Circle className="w-4 h-4 shrink-0 text-muted-foreground/40" />
                            )}
                            <span className={step.done ? "text-foreground" : "text-muted-foreground/60"}>
                              {step.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech stack */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold font-mono uppercase tracking-wider text-muted-foreground">
                      {language === "fr" ? "Stack technique" : "Tech stack"}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs font-mono"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    {selectedProject.hasDemo && (
                      <Dialog
                        open={showBackupDemo}
                        onOpenChange={setShowBackupDemo}
                      >
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <Play className="h-4 w-4 mr-2" />
                            {language === "fr" ? "Essayer la démo" : "Try demo"}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{language === "fr" ? "Démonstration Interactive" : "Interactive Demo"}</DialogTitle>
                            <DialogDescription>
                              {language === "fr"
                                ? "Testez le script de sauvegarde directement dans votre navigateur"
                                : "Test the backup script directly in your browser"}
                            </DialogDescription>
                          </DialogHeader>
                          <BackupDemo />
                        </DialogContent>
                      </Dialog>
                    )}
                    {selectedProject.downloadUrl !== "#" && (
                      <Button asChild variant="outline" size="sm">
                        <a href={selectedProject.downloadUrl} download>
                          <Download className="h-4 w-4 mr-2" />
                          {t.download}
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Documentation card */}
          <Card className="p-8 border-border/40 bg-primary/5 backdrop-blur-sm">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">{t.docsTitle}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.docsDesc}</p>
              <Button asChild>
                <a
                  href="https://bouzid-djz.github.io/portfolio/TableauS.pdf"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {t.viewDocs}
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
