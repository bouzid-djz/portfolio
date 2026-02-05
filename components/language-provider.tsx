"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Language } from "@/lib/translations"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr")

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language
    if (saved && ["fr", "en", "es", "ar", "pt"].includes(saved)) {
      setLanguageState(saved)

      if (saved === "ar") {
        document.documentElement.setAttribute("dir", "rtl")
      } else {
        document.documentElement.setAttribute("dir", "ltr")
      }
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)

    if (lang === "ar") {
      document.documentElement.setAttribute("dir", "rtl")
    } else {
      document.documentElement.setAttribute("dir", "ltr")
    }
  }

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
