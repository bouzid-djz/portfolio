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

  const tableRows = [
    { label: t.btsRow1Label, sisr: t.btsRow1Sisr, slam: t.btsRow1Slam },
    { label: t.btsRow2Label, sisr: t.btsRow2Sisr, slam: t.btsRow2Slam },
    { label: t.btsRow3Label, sisr: t.btsRow3Sisr, slam: t.btsRow3Slam },
    { label: t.btsRow4Label, sisr: t.btsRow4Sisr, slam: t.btsRow4Slam },
    { label: t.btsRow5Label, sisr: t.btsRow5Sisr, slam: t.btsRow5Slam },
    { label: t.btsRow6Label, sisr: t.btsRow6Sisr, slam: t.btsRow6Slam },
  ]

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

          {/* Section BTS SIO */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-2xl font-bold">{t.btsTitle}</h3>
              <div className="h-1 w-12 bg-primary rounded-full" />
              <p className="text-muted-foreground leading-relaxed">{t.btsDesc}</p>
            </div>

            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-foreground">{t.btsTableTitle}</h4>
              <div className="overflow-x-auto rounded-xl border border-border/40">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-primary/10 border-b border-border/40">
                      <th className="text-left px-4 py-3 font-semibold text-foreground w-1/4">{t.btsCol1}</th>
                      <th className="text-left px-4 py-3 font-semibold text-primary w-[37.5%]">{t.btsCol2}</th>
                      <th className="text-left px-4 py-3 font-semibold text-blue-500 w-[37.5%]">{t.btsCol3}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.map((row, index) => (
                      <tr
                        key={index}
                        className={`border-b border-border/20 transition-colors hover:bg-muted/30 ${
                          index % 2 === 0 ? "bg-card/30" : "bg-card/10"
                        }`}
                      >
                        <td className="px-4 py-3 font-medium text-foreground">{row.label}</td>
                        <td className="px-4 py-3 text-muted-foreground">{row.sisr}</td>
                        <td className="px-4 py-3 text-muted-foreground">{row.slam}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
