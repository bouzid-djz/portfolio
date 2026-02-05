"use client"

import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/translations"
import { useEffect, useState } from "react"
import { CVDownload } from "@/components/cv-download"

export function Hero() {
  const { language } = useLanguage()
  const t = translations[language].hero
  const [scrollY, setScrollY] = useState(0)
  const [isPsychedelic, setIsPsychedelic] = useState(false)
  const [memePositions, setMemePositions] = useState<Array<{ top: string; left: string; size: number }>>([])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const checkPsychedelic = () => {
      const hasPsychedelic = document.body.classList.contains("psychedelic-mode")
      setIsPsychedelic(hasPsychedelic)

      if (hasPsychedelic) {
        // Generate multiple random positions for memes
        const positions = Array.from({ length: 8 }, () => ({
          top: `${Math.random() * 80}%`,
          left: `${Math.random() * 80}%`,
          size: 100 + Math.random() * 200,
        }))
        setMemePositions(positions)

        // Update positions rapidly
        const interval = setInterval(() => {
          const newPositions = Array.from({ length: 8 }, () => ({
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 80}%`,
            size: 100 + Math.random() * 200,
          }))
          setMemePositions(newPositions)
        }, 500)

        return () => clearInterval(interval)
      } else {
        setMemePositions([])
      }
    }

    checkPsychedelic()
    const interval = setInterval(checkPsychedelic, 100)
    return () => clearInterval(interval)
  }, [])

  const handleScroll = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden bg-gradient-to-b from-background to-muted/30"
    >
      <div
        className="absolute inset-0 -z-10"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      </div>

      {isPsychedelic &&
        memePositions.map((pos, i) => (
          <img
            key={i}
            src="/images/ck.jpeg"
            alt=""
            className="psychedelic-image"
            style={{
              top: pos.top,
              left: pos.left,
              width: `${pos.size}px`,
              height: `${pos.size}px`,
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        ))}

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-wider text-primary font-medium animate-in fade-in slide-in-from-bottom-4 duration-700">
              {t.subtitle}
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-balance animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
              {t.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              {t.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <Button
              size="lg"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              {t.contactBtn}
            </Button>
            <CVDownload />
          </div>

          <button
            onClick={handleScroll}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mt-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500"
          >
            <span>{t.discover}</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  )
}
