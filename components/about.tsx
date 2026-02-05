"use client"

import { Card } from "@/components/ui/card"
import { GraduationCap, Shield, Users } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/translations"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function About() {
  const { language } = useLanguage()
  const t = translations[language].about
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="about" className="py-24 scroll-mt-16 bg-gradient-to-b from-muted/30 to-background">
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

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 space-y-4 border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:border-primary/50">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{t.formationTitle}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.formationDesc}</p>
            </Card>

            <Card className="p-6 space-y-4 border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:border-primary/50">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{t.specialTitle}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.specialDesc}</p>
            </Card>

            <Card className="p-6 space-y-4 border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:border-primary/50">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{t.expTitle}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.expDesc}</p>
            </Card>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              {t.p1} <strong className="text-foreground">{t.p1Bold}</strong>.
            </p>
            <p className="text-muted-foreground leading-relaxed">{t.p2}</p>
            <p className="text-muted-foreground leading-relaxed">{t.p3}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
