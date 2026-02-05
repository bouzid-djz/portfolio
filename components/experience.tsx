"use client"

import { Card } from "@/components/ui/card"
import { Briefcase, BookOpen } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/translations"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function Experience() {
  const { language } = useLanguage()
  const t = translations[language].experience
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="experience" className="py-24 scroll-mt-16 bg-muted/30">
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

          <div className="space-y-8">
            <Card className="p-6 space-y-4 border-border/40 bg-card/50 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold">{t.education}</h3>
                      <p className="text-sm text-muted-foreground">{t.educationOrg}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">2024 - 2025</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.educationDesc}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 space-y-4 border-border/40 bg-card/50 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold">{t.internTitle}</h3>
                      <p className="text-sm text-muted-foreground">{t.internOrg}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">2024</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.internDesc}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 space-y-4 border-border/40 bg-card/50 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold">{t.salesTitle}</h3>
                      <p className="text-sm text-muted-foreground">{t.salesOrg}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{t.salesDate}</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.salesDesc}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
