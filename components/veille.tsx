"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Rss, Radio } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/translations"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function Veille() {
  const { language } = useLanguage()
  const t = translations[language].veille
  const { ref, isVisible } = useScrollAnimation()

  const sources = [
    {
      name: t.source1Name,
      type: t.source1Type,
      description: t.source1Desc,
      url: "https://www.it-connect.fr",
      icon: Rss,
    },
    {
      name: t.source2Name,
      type: t.source2Type,
      description: t.source2Desc,
      icon: Rss,
    },
    {
      name: t.source3Name,
      type: t.source3Type,
      description: t.source3Desc,
      icon: Radio,
    },
  ]

  const themes = [t.theme1, t.theme2, t.theme3, t.theme4, t.theme5]

  return (
    <section id="veille" className="py-24 scroll-mt-16 bg-gradient-to-b from-muted/30 to-background">
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
            <p className="text-muted-foreground leading-relaxed max-w-3xl">{t.description}</p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">{t.themesTitle}</h3>
            <div className="flex flex-wrap gap-2">
              {themes.map((theme) => (
                <Badge key={theme} variant="secondary" className="text-sm">
                  {theme}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">{t.sourcesTitle}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {sources.map((source) => {
                const Icon = source.icon
                return (
                  <Card
                    key={source.name}
                    className="p-6 space-y-4 border-border/40 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-2 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold">{source.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {source.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{source.description}</p>
                        {source.url && (
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                          >
                            {t.visit}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          <Card className="p-8 border-border/40 bg-primary/5 backdrop-blur-sm">
            <p className="text-muted-foreground leading-relaxed">{t.conclusion}</p>
          </Card>
        </div>
      </div>
    </section>
  )
}
