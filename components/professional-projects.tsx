"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/translations"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function ProfessionalProjects() {
  const { language } = useLanguage()
  const t = translations[language].professionalProjects
  const { ref, isVisible } = useScrollAnimation()

  const projects = [
    {
      title: t.project1Title,
      description: t.project1Desc,
      context: t.project1Context,
      technologies: t.project1Techs ?? [],
      detailUrl: t.project1Url ?? "",
    },
  ]

  return (
    <section id="professional-projects" className="py-24 scroll-mt-16 bg-gradient-to-b from-background to-muted/10">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="p-6 flex flex-col border-border/40 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {project.context}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold leading-tight text-balance">{project.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {project.technologies.map((tech: string) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                {project.detailUrl && (
                  <div className="mt-auto pt-4">
                    <Button asChild variant="default" size="sm" className="w-full">
                      <a href={project.detailUrl} target="_blank" rel="noreferrer noopener">
                        <ArrowRight className="h-4 w-4 mr-2" />
                        {t.view}
                      </a>
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}