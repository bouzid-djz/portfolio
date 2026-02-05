"use client"

import { useEffect, useState } from "react"

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
]

export function useKonami(callback: () => void) {
  const [keys, setKeys] = useState<string[]>([])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKeys((prevKeys) => {
        const newKeys = [...prevKeys, event.key].slice(-KONAMI_CODE.length)

        // Check if the sequence matches
        if (newKeys.length === KONAMI_CODE.length && newKeys.every((key, index) => key === KONAMI_CODE[index])) {
          callback()
          return []
        }

        return newKeys
      })
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [callback])
}
