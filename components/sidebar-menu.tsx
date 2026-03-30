"use client"

import { useState } from "react"
import { Menu, X, Home, User, Code, Briefcase, FileText, Mail, Lightbulb, FlaskConical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/translations"
import { cn } from "@/lib/utils"

export function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { language } = useLanguage()
  const t = translations[language]

  const navItems = [
    { label: t.nav.home, href: "#hero", icon: Home },
    { label: t.nav.about, href: "#about", icon: User },
    { label: t.nav.skills, href: "#skills", icon: Code },
    { label: t.nav.projects, href: "#projects", icon: Briefcase },
    { label: t.nav.experience, href: "#experience", icon: FileText },
    { label: t.nav.veille, href: "#veille", icon: Lightbulb },
    { label: "Labs", href: "#labs", icon: FlaskConical },
    { label: t.nav.contact, href: "#contact", icon: Mail },
  ]

  const handleClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Menu Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 h-12 w-12 rounded-full shadow-lg bg-background border-2 border-primary/50 hover:border-primary"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-80 bg-background border-r border-border shadow-2xl z-50 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full p-6">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Quentin SILVA</h2>
            <p className="text-sm text-muted-foreground">Cybersecurity Specialist</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.href}
                  onClick={() => handleClick(item.href)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-all hover:bg-primary/10 hover:text-primary group"
                >
                  <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Settings Section */}
          <div className="border-t border-border pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Language</span>
              <LanguageSelector />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
