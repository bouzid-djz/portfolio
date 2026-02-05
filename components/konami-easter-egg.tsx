"use client"

import { useState } from "react"
import { useKonami } from "@/hooks/use-konami"
import { Sparkles } from "lucide-react"

export function KonamiEasterEgg() {
  const [activated, setActivated] = useState(false)

  useKonami(() => {
    setActivated(true)
    setTimeout(() => setActivated(false), 10000)
  })

  if (!activated) return null

  return (
    <>
      {/* Matrix rain effect */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 text-primary/30 font-mono text-sm animate-matrix-rain whitespace-nowrap"
            style={{
              left: `${i * 5}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: "3s",
            }}
          >
            01010011 01000101 01000011 01010101 01010010 01001001 01010100 01011001
          </div>
        ))}
      </div>

      {/* Center message */}
      <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
        <div className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-8 py-6 rounded-lg shadow-2xl animate-bounce">
          <div className="flex items-center gap-3">
            <Sparkles className="h-8 w-8 animate-spin" />
            <div>
              <p className="text-2xl font-bold">KONAMI CODE ACTIVATED!</p>
              <p className="text-sm opacity-90">You found the secret! 🎮</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
