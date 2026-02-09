"use client"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/translations"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const technologies = [
  { name: "Cisco", category: "networks" },
  { name: "Linux", category: "systems" },
  { name: "Windows", category: "systems" },
  { name: "Windows Server", category: "systems" },
  { name: "PowerShell", category: "scripting" },
  { name: "VirtualBox", category: "virtualization" },
  { name: "VMware", category: "virtualization" },
  { name: "Active Directory", category: "systems" },
  { name: "TCP/IP", category: "networks" },
  { name: "Nginx", category: "services" },
]

const certifications = [
  {
    name: "CISCO Introduction to Cybersecurity",
    organization: "Cisco",
    date: "Janvier 2025",
    url: "https://www.credly.com/badges/eeabc401-7e9a-4723-935c-d00540be0b70",
    status: "obtained",
  },
  {
    name: "MOOC ANSSI",
    organization: "ANSSI",
    date: "Juin 2025",
    url: "https://formations.francetransfo.gouv.fr/programmes-solista/271AZ-26-0000002/mooc-anssi-cybersecurite-accueil?distancecours=HYBRID",
    status: "obtained",
  },
  {
    name: "MOOC CNIL",
    organization: "CNIL",
    date: "En cours",
    url: "https://www.cnil.fr/fr/le-mooc-de-la-cnil-est-de-retour-dans-une-nouvelle-version-enrichie",
    status: "in-progress",
  },
]

export function Skills() {
  const { language } = useLanguage()
  const t = translations[language].skills
  const { ref, isVisible } = useScrollAnimation()

  const categories = ["networks", "systems", "virtualization", "scripting", "services"] as const

  return (
    <section id="skills" className="py-24 scroll-mt-16 bg-muted/30">
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

          {/* Technologies */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">{t.techTitle}</h3>
            <div className="space-y-4">
              {categories.map((category) => (
                <div key={category} className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{t.categories[category]}</p>
                  <div className="flex flex-wrap gap-2">
                    {technologies
                      .filter((tech) => tech.category === category)
                      .map((tech) => (
                        <Badge key={tech.name} variant="secondary" className="text-sm">
                          {tech.name}
                        </Badge>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">{t.certTitle}</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {certifications.map((cert) => (
                <Card
                  key={cert.name}
                  className="p-6 space-y-4 border-border/40 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold leading-tight text-balance">{cert.name}</h4>
                      {cert.status === "obtained" && (
                        <Badge variant="default" className="text-xs shrink-0">
                          {t.obtained}
                        </Badge>
                      )}
                      {cert.status === "in-progress" && (
                        <Badge variant="outline" className="text-xs shrink-0">
                          {t.inProgress}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{cert.organization}</p>
                    <p className="text-xs text-muted-foreground">{cert.date}</p>
                  </div>
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    {t.viewCert}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
