"use client"

import { CheckCircle2, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/translations"

export function Certifications() {
  const { ref, isVisible } = useScrollAnimation()
  const { language } = useLanguage()
  const t = translations[language]

  const certifications = [
    {
      name: "Cisco Introduction to Cybersecurity",
      issuer: "Cisco Networking Academy",
      date: "2024",
      status: "obtained",
      logo: "🔒",
    },
    {
      name: "MOOC ANSSI - SecNumAcadémie",
      issuer: "ANSSI",
      date: "2024",
      status: "obtained",
      logo: "🛡️",
    },
    {
      name: "CompTIA Security+",
      issuer: "CompTIA",
      date: "En cours",
      status: "inProgress",
      logo: "🎯",
    },
  ]

  return (
    <section id="certifications" className="py-20 relative bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.skills.certTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === "fr" && "Formations et certifications professionnelles en cybersécurité"}
              {language === "en" && "Professional training and certifications in cybersecurity"}
              {language === "es" && "Formaciones y certificaciones profesionales en ciberseguridad"}
              {language === "ar" && "التدريب والشهادات المهنية في الأمن السيبراني"}
              {language === "pt" && "Formações e certificações profissionais em cibersegurança"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {certifications.map((cert, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 border-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{cert.logo}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-base leading-tight">{cert.name}</h3>
                      {cert.status === "obtained" ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <Clock className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{cert.issuer}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant={cert.status === "obtained" ? "default" : "secondary"} className="text-xs">
                        {cert.status === "obtained" ? t.skills.obtained : t.skills.inProgress}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{cert.date}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
