"use client"

import { Briefcase, GraduationCap, Award } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/translations"

export function Timeline() {
  const { ref, isVisible } = useScrollAnimation()
  const { language } = useLanguage()
  const t = translations[language]

  const timelineItems = [
    {
      year: "2024 - 2026",
      title:
        language === "fr"
          ? "BTS SIO option SISR"
          : "BTS SIO option SISR",
      description: t.experience.educationDesc,
      icon: GraduationCap,
      type: "education",
    },
    {
      year: "2025",
      title: t.experience.internTitle,
      description: t.experience.internDesc,
      icon: Briefcase,
      type: "work",
    },
    {
      year: "2025",
      title:
        language === "fr"
          ? "Certifications en cybersécurité"
          : "Cybersecurity Certifications",
      description:
        language === "fr"
          ? "Obtention de certifications en cybersécurité"
          : "Obtained cybersecurity certifications",
      icon: Award,
      type: "certification",
    },
    {
      year: "2020 - 2024",
      title: t.experience.salesTitle,
      description: t.experience.salesDesc,
      icon: Briefcase,
      type: "work",
    },
  ]

  return (
    <section id="timeline" className="py-12 scroll-mt-16 relative bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h3 className="text-2xl font-bold mb-8 text-center">
            {language === "fr" && "Parcours chronologique"}
            {language === "en" && "Career Timeline"}
            {language === "es" && "Trayectoria cronológica"}
            {language === "ar" && "المسار الزمني للمهنة"}
            {language === "pt" && "Trajetória cronológica"}
          </h3>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border" />

            <div className="space-y-12">
              {timelineItems.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex items-start gap-4 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Icon */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-primary/20 border-4 border-background flex items-center justify-center z-10">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>

                  {/* Content */}
                  <div
                    className={`w-full md:w-[calc(50%-3rem)] ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"} pl-24 md:pl-0`}
                  >
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold text-primary">{item.year}</span>
                      </div>
                      <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
