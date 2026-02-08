"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { X, Minimize2, Maximize2, TerminalIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/translations"

interface Command {
  input: string
  output: string[]
}

export function Terminal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<Command[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const { language } = useLanguage()
  const t = translations[language].terminal

  useEffect(() => {
    setHistory([
      {
        input: "",
        output: [t.welcome, t.welcomeHelp, ""],
      },
    ])
  }, [language, t.welcome, t.welcomeHelp])

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, isMinimized])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const executeCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase()
    let output: string[] = []

    switch (command) {
      case "help":
        output = [
          t.helpTitle,
          `  help        ${t.helpTitle}`,
          `  about       ${t.helpAbout}`,
          `  skills      ${t.helpSkills}`,
          `  projects    ${t.helpProjects}`,
          `  contact     ${t.helpContact}`,
          `  whoami      ${t.helpWhoami}`,
          `  ls          ${t.helpLs}`,
          `  clear       ${t.helpClear}`,
          "",
        ]
        break

      case "whoami":
        output = [t.whoamiTitle, t.whoamiRole, t.whoamiSpec, ""]
        break

      case "about":
        output = [t.aboutText, ""]
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
        break

      case "skills":
        output = [t.skillsTitle, t.skillsInfra, t.skillsNet, t.skillsSec, t.skillsScript, ""]
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })
        break

      case "projects":
        output = [t.projectsTitle, t.project1, t.project2, t.project3, t.project4, ""]
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
        break

      case "contact":
        output = [t.contactTitle, "  📧 Email : quentinsilvapro@gmail.com", "  💼 LinkedIn : /in/quentin-silva", ""]
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
        break

      case "ls":
      case "ls -la":
        output = [
          "drwxr-xr-x  hero/",
          "drwxr-xr-x  about/",
          "drwxr-xr-x  skills/",
          "drwxr-xr-x  projects/",
          "drwxr-xr-x  experience/",
          "drwxr-xr-x  veille/",
          "drwxr-xr-x  contact/",
          "",
        ]
        break

      case "clear":
        setHistory([])
        return

      default:
        if (command.startsWith("cat ")) {
          output = [`cat: ${command.slice(4)}: No such file or directory`, ""]
        } else {
          output = [t.notFound + `: ${command}`, t.typeHelp, ""]
        }
    }

    setHistory([...history, { input: cmd, output }])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      executeCommand(input)
      setInput("")
    }
  }

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 h-14 w-14 rounded-full shadow-lg z-50"
          size="icon"
          data-presentation-hide
        >
          <TerminalIcon className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <div
          className={`fixed z-50 transition-all ${
            isMinimized ? "bottom-6 left-6 w-64" : "bottom-6 left-6 w-full max-w-2xl"
          }`}
          data-presentation-hide
        >
          <div className="bg-card border border-border rounded-lg shadow-2xl overflow-hidden">
            <div className="bg-secondary px-4 py-2 flex items-center justify-between border-b border-border">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-sm font-mono text-foreground ml-2">quentin@portfolio:~$</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <div className="bg-background/95 backdrop-blur-sm">
                <div ref={terminalRef} className="font-mono text-sm p-4 h-96 overflow-y-auto space-y-2">
                  {history.map((cmd, i) => (
                    <div key={i}>
                      {cmd.input && (
                        <div className="flex gap-2">
                          <span className="text-primary">❯</span>
                          <span className="text-foreground">{cmd.input}</span>
                        </div>
                      )}
                      {cmd.output.map((line, j) => (
                        <div key={j} className="text-muted-foreground pl-4">
                          {line}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="border-t border-border p-4">
                  <div className="flex gap-2 items-center font-mono text-sm">
                    <span className="text-primary">❯</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="flex-1 bg-transparent outline-none text-foreground"
                      placeholder={t.placeholder}
                      autoComplete="off"
                    />
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
