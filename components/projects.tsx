"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink, Play, X } from "lucide-react"
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

export function Projects() {
  const { language } = useLanguage()
  const t = translations[language].projects
  const { ref, isVisible } = useScrollAnimation()
  const [showBackupDemo, setShowBackupDemo] = useState(false)

  const projects = [
    {
      title: t.project1Title,
      description: t.project1Desc,
      context: t.context,
      technologies: ["CISCO", "Réseaux"],
      downloadUrl: "/Projet.zip",
      hasDemo: false,
    },
    {
      title: t.project2Title,
      description: t.project2Desc,
      context: t.internship,
      technologies: ["PowerShell", "VBS", "Automatisation"],
      downloadUrl: "/Projet2.zip",
      hasDemo: true,
    },
    {
      title: t.project3Title,
      description: t.project3Desc,
      context: t.context,
      technologies: ["Nginx", "Linux", "Sécurité"],
      downloadUrl: "/Projet3.pdf",
      hasDemo: false,
    },
  ]

  return (
    <section id="projects" className="py-24 scroll-mt-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`max-w-5xl mx-auto space-y-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-balance">{t.title}</h2>
            <div className="h-1 w-20 bg-primary rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="p-6 space-y-4 border-border/40 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <Badge variant="outline" className="text-xs">
                    {project.context}
                  </Badge>
                  <h3 className="text-lg font-semibold leading-tight text-balance">{project.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  {project.hasDemo && (
                    <Dialog open={showBackupDemo && index === 1} onOpenChange={setShowBackupDemo}>
                      <DialogTrigger asChild>
                        <Button variant="default" size="sm" className="flex-1">
                          <Play className="h-4 w-4 mr-2" />
                          Essayer
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Démonstration Interactive</DialogTitle>
                          <DialogDescription>
                            Testez le script de sauvegarde directement dans votre navigateur
                          </DialogDescription>
                        </DialogHeader>
                        <BackupDemo />
                      </DialogContent>
                    </Dialog>
                  )}
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className={`bg-transparent ${project.hasDemo ? "flex-1" : "w-full"}`}
                  >
                    <a href={project.downloadUrl} download>
                      <Download className="h-4 w-4 mr-2" />
                      {t.download}
                    </a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-8 border-border/40 bg-primary/5 backdrop-blur-sm">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">{t.docsTitle}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.docsDesc}</p>
              <Button asChild>
                <a href="/Tableau_de_synthèse.pdf" target="_blank" rel="noreferrer noopener">
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
