"use client"

import { useState, useEffect, useCallback } from "react"
import { Presentation, X, ChevronLeft, ChevronRight, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  { id: "hero", title: "Accueil" },
  { id: "about", title: "A propos" },
  { id: "skills", title: "Competences" },
  { id: "projects", title: "Projets" },
  { id: "experience", title: "Experience" },
  { id: "timeline", title: "Parcours" },
  { id: "veille", title: "Veille" },
  { id: "labs", title: "Labs" },
  { id: "contact", title: "Contact" },
]

export function PresentationMode() {
  const [isPresenting, setIsPresenting] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [presentationStartTime, setPresentationStartTime] = useState<number>(0)
  const [elapsedTime, setElapsedTime] = useState<number>(0)

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < slides.length) {
      setCurrentSlide(index)
      const element = document.getElementById(slides[index].id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }, [])

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1)
  }, [currentSlide, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1)
  }, [currentSlide, goToSlide])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    if (!isPresenting) return

    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - presentationStartTime) / 1000))
    }, 1000)

    return () => clearInterval(interval)
  }, [isPresenting, presentationStartTime])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isPresenting) {
        exitPresentation()
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "p") {
        e.preventDefault()
        togglePresentation()
      }
      if (isPresenting) {
        if (e.key === "ArrowRight" || e.key === " ") {
          e.preventDefault()
          nextSlide()
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault()
          prevSlide()
        }
        if (e.key === "Home") {
          e.preventDefault()
          goToSlide(0)
        }
        if (e.key === "End") {
          e.preventDefault()
          goToSlide(slides.length - 1)
        }
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [isPresenting, nextSlide, prevSlide, goToSlide])

  const enterPresentation = () => {
    setIsPresenting(true)
    setCurrentSlide(0)
    setPresentationStartTime(Date.now())
    setElapsedTime(0)
    
    // Hide interactive elements
    document.querySelectorAll("[data-presentation-hide]").forEach((el) => {
      (el as HTMLElement).style.display = "none"
    })

    // Scroll to first section
    const firstSection = document.getElementById("hero")
    if (firstSection) {
      firstSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    // Request fullscreen
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {})
    }
  }

  const exitPresentation = () => {
    setIsPresenting(false)
    setElapsedTime(0)
    
    // Show hidden elements
    document.querySelectorAll("[data-presentation-hide]").forEach((el) => {
      (el as HTMLElement).style.display = ""
    })

    // Exit fullscreen
    if (document.fullscreenElement) {
      document.exitFullscreen()
    }
  }

  const togglePresentation = () => {
    if (isPresenting) {
      exitPresentation()
    } else {
      enterPresentation()
    }
  }

  return (
    <>
      {!isPresenting && (
        <Button
          onClick={enterPresentation}
          className="fixed top-4 right-4 z-50 h-10 px-4 rounded-lg shadow-lg bg-primary/90 hover:bg-primary"
          title="Mode Presentation (Ctrl+P)"
        >
          <Presentation className="h-4 w-4 mr-2" />
          <span className="text-sm">Presentation</span>
        </Button>
      )}

      {isPresenting && (
        <>
          {/* Timer */}
          <div className="fixed top-4 right-20 z-[100] bg-background/80 backdrop-blur-sm border border-border rounded-lg px-3 py-1.5 shadow-lg">
            <span className="text-xs font-mono text-muted-foreground">{formatTime(elapsedTime)}</span>
          </div>

          {/* Exit button */}
          <Button
            onClick={exitPresentation}
            className="fixed top-4 right-4 z-[100] h-10 w-10 rounded-lg shadow-lg bg-red-500 hover:bg-red-600"
            size="icon"
            title="Quitter (ESC)"
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Navigation bar */}
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 bg-background/95 backdrop-blur-sm border border-border rounded-xl px-4 py-2 shadow-xl">
            <Button
              onClick={() => goToSlide(0)}
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              disabled={currentSlide === 0}
            >
              <Home className="h-4 w-4" />
            </Button>
            
            <Button
              onClick={prevSlide}
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-1 px-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide 
                      ? "bg-primary w-6" 
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  title={slide.title}
                />
              ))}
            </div>

            <Button
              onClick={nextSlide}
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              disabled={currentSlide === slides.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            <span className="text-xs text-muted-foreground ml-2 min-w-[80px]">
              {currentSlide + 1} / {slides.length}
            </span>
          </div>

          {/* Current slide title */}
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-background/95 backdrop-blur-sm border border-border rounded-lg px-4 py-2 shadow-lg">
            <span className="text-sm font-medium">{slides[currentSlide].title}</span>
          </div>
        </>
      )}
    </>
  )
}
