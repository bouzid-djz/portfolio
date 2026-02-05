"use client"

import { useEffect, useState, useRef } from "react"
import type { CursorStyle } from "./cursor-selector"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [cursorStyle, setCursorStyle] = useState<CursorStyle>("trail")
  const positionRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const handleStyleChange = (e: CustomEvent) => {
      setCursorStyle(e.detail)
    }

    const saved = localStorage.getItem("cursorStyle") as CursorStyle
    if (saved) {
      setCursorStyle(saved)
    }

    window.addEventListener("cursorStyleChange" as any, handleStyleChange)
    return () => window.removeEventListener("cursorStyleChange" as any, handleStyleChange)
  }, [])

  useEffect(() => {
    let trailId = 0

    const updatePosition = () => {
      setPosition({ x: positionRef.current.x, y: positionRef.current.y })
      rafRef.current = requestAnimationFrame(updatePosition)
    }

    const handleMouseMove = (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY }
      setIsVisible(true)

      if (cursorStyle === "trail" || cursorStyle === "glow") {
        setTrail((prevTrail) => {
          const newTrail = [...prevTrail, { x: e.clientX, y: e.clientY, id: trailId++ }].slice(-10)
          return newTrail
        })
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    rafRef.current = requestAnimationFrame(updatePosition)
    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [cursorStyle])

  useEffect(() => {
    if ("ontouchstart" in window) {
      setIsVisible(false)
    }
  }, [])

  if (!isVisible || cursorStyle === "none") return null

  return (
    <>
      {/* Main cursor */}
      {cursorStyle === "classic" && (
        <div
          className="fixed w-3 h-3 pointer-events-none z-[9999]"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-full h-full rounded-full bg-primary" />
        </div>
      )}

      {cursorStyle === "trail" && (
        <>
          <div
            className="fixed w-4 h-4 pointer-events-none z-[9999] mix-blend-difference"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="w-full h-full rounded-full border-2 border-primary bg-primary/20 backdrop-blur-sm" />
          </div>

          {trail.map((point, index) => (
            <div
              key={point.id}
              className="fixed w-1.5 h-1.5 pointer-events-none z-[9998] mix-blend-difference"
              style={{
                left: `${point.x}px`,
                top: `${point.y}px`,
                transform: "translate(-50%, -50%)",
                opacity: (index + 1) / trail.length,
              }}
            >
              <div className="w-full h-full rounded-full bg-primary" />
            </div>
          ))}
        </>
      )}

      {cursorStyle === "glow" && (
        <>
          <div
            className="fixed w-6 h-6 pointer-events-none z-[9999]"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="w-full h-full rounded-full bg-primary/30 blur-md" />
            <div className="absolute inset-1.5 rounded-full bg-primary" />
          </div>

          {trail.map((point, index) => (
            <div
              key={point.id}
              className="fixed w-3 h-3 pointer-events-none z-[9998]"
              style={{
                left: `${point.x}px`,
                top: `${point.y}px`,
                transform: "translate(-50%, -50%)",
                opacity: ((index + 1) / trail.length) * 0.5,
              }}
            >
              <div className="w-full h-full rounded-full bg-primary/50 blur-sm" />
            </div>
          ))}
        </>
      )}

      {cursorStyle === "crosshair" && (
        <div
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="relative w-6 h-6">
            <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-primary" />
            <div className="absolute top-0 bottom-0 left-1/2 w-[1.5px] bg-primary" />
            <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary" />
          </div>
        </div>
      )}
    </>
  )
}
