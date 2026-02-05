"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Mouse } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/translations"

export type CursorStyle = "classic" | "trail" | "glow" | "crosshair" | "none"

export function CursorSelector() {
  const [cursorStyle, setCursorStyle] = useState<CursorStyle>("trail")
  const { language } = useLanguage()
  const t = translations[language].cursor

  useEffect(() => {
    const saved = localStorage.getItem("cursorStyle") as CursorStyle
    if (saved) {
      setCursorStyle(saved)
    }
  }, [])

  const handleCursorChange = (style: CursorStyle) => {
    setCursorStyle(style)
    localStorage.setItem("cursorStyle", style)
    window.dispatchEvent(new CustomEvent("cursorStyleChange", { detail: style }))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" title={t.title}>
          <Mouse className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleCursorChange("classic")}
          className={cursorStyle === "classic" ? "bg-accent" : ""}
        >
          {t.classic}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleCursorChange("trail")}
          className={cursorStyle === "trail" ? "bg-accent" : ""}
        >
          {t.trail}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleCursorChange("glow")}
          className={cursorStyle === "glow" ? "bg-accent" : ""}
        >
          {t.glow}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleCursorChange("crosshair")}
          className={cursorStyle === "crosshair" ? "bg-accent" : ""}
        >
          {t.crosshair}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleCursorChange("none")}
          className={cursorStyle === "none" ? "bg-accent" : ""}
        >
          {t.none}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
