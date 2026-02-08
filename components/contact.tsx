"use client"

import { Card } from "@/components/ui/card"
import { Mail, Linkedin } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/translations"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { ContactForm } from "@/components/contact-form"

export function Contact() {
  const { language } = useLanguage()
  console.log("Language:", language)
  console.log("Translations:", translations)
  console.log("Contact data:", translations[language]?.contact)
  const t = translations[language].contact
  const { ref, isVisible } = useScrollAnimation()


  return (
    <section id="contact" className="py-24 scroll-mt-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`max-w-3xl mx-auto space-y-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="space-y-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-balance">{t.title}</h2>
            <div className="h-1 w-20 bg-primary rounded-full mx-auto" />
            <p className="text-muted-foreground leading-relaxed">{t.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-6 space-y-4 border-border/40 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="font-semibold">{t.email}</h3>
                  <a href="mailto:quentinsilvapro@gmail.com" className="text-sm text-primary hover:underline break-all">
                    quentinsilvapro@gmail.com
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6 space-y-4 border-border/40 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Linkedin className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="font-semibold">{t.linkedin}</h3>
                  <a
                    href="https://www.linkedin.com/in/quentin-silva"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    linkedin.com/in/quentin-silva
                  </a>
                </div>
              </div>
            </Card>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  )
}
