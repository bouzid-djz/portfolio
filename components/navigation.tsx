"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/translations"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const { language } = useLanguage()
  const t = translations[language]

  const navItems = [
    { label: t.nav.home, href: "#hero" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.skills, href: "#skills" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.experience, href: "#experience" },
    { label: t.nav.veille, href: "#veille" },
    { label: t.nav.contact, href: "#contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = navItems.map((item) => item.href.replace("#", ""))
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border/40" : "bg-transparent",
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => handleClick("#hero")}
              className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
            >
              QS
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleClick(item.href)}
                  className={cn(
                    "px-3 py-2 text-sm transition-colors rounded-md",
                    activeSection === item.href.replace("#", "")
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </button>
              ))}
              <LanguageSelector />
              <ThemeToggle />
            </div>

            {/* Mobile Menu Controls */}
            <div className="md:hidden flex items-center gap-2">
              <LanguageSelector />
              <ThemeToggle /> 
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md md:hidden pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleClick(item.href)}
                  className={cn(
                    "text-left px-4 py-3 text-lg transition-colors rounded-lg",
                    activeSection === item.href.replace("#", "")
                      ? "text-primary font-medium bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
