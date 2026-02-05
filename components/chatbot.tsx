"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MessageCircle, X, Send } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/translations"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { language } = useLanguage()
  const t = translations[language].chatbot

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ role: "assistant", content: t.welcome }])
    }
  }, [isOpen, messages.length, t.welcome])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const portfolioKnowledge = {
    fr: {
      name: "Quentin SILVA",
      formation: "BTS SIO SISR 2ème année à l'IPSSI",
      specialization: "Cybersécurité, administration système Windows/Linux, virtualisation",
      certifications: "Cisco Introduction to Cybersecurity, MOOC ANSSI, MOOC CNIL (en cours)",
      skills: [
        "Linux",
        "Windows Server",
        "Virtualisation",
        "Cisco",
        "Routing",
        "Switching",
        "VPN",
        "Pare-feu",
        "IDS/IPS",
        "Pentesting",
        "Bash",
        "Python",
        "PowerShell",
        "Active Directory",
        "TCP/IP",
        "Nginx",
      ],
      projects: [
        "Infrastructure réseau sécurisée avec Cisco",
        "Automatisation de sauvegardes avec PowerShell et VBS",
        "Configuration de serveur web Nginx sécurisé",
      ],
      experience:
        "Stage en maintenance informatique et automatisation des sauvegardes chez un prestataire IT. Expérience préalable comme manager et vendeur dans le secteur commercial, développant des compétences en gestion d'équipe et relation client.",
      hobbies:
        "Passionné par les sports de combat (MMA, UFC), la veille technologique en cybersécurité, et les labs pratiques sur des environnements virtualisés.",
      goals:
        "Devenir expert en sécurité offensive et défensive, obtenir des certifications avancées (OSCP, CEH), et travailler sur des projets de pentest et de sécurisation d'infrastructures critiques.",
      contact: "Email: quentinsilvapro@gmail.com, LinkedIn: /in/quentin-silva",
      languages: "Français (natif), Anglais (professionnel)",
      portfolio:
        "Ce portfolio a été développé avec Next.js, React et Tailwind CSS. Il inclut un terminal interactif, un chatbot intelligent, et plusieurs easter eggs cachés.",
    },
    en: {
      name: "Quentin SILVA",
      formation: "IT Systems & Networks 2nd year at IPSSI",
      specialization: "Cybersecurity, Windows/Linux system administration, virtualization",
      certifications: "Cisco Introduction to Cybersecurity, ANSSI MOOC, CNIL MOOC (in progress)",
      skills: [
        "Linux",
        "Windows Server",
        "Virtualization",
        "Cisco",
        "Routing",
        "Switching",
        "VPN",
        "Firewall",
        "IDS/IPS",
        "Pentesting",
        "Bash",
        "Python",
        "PowerShell",
        "Active Directory",
        "TCP/IP",
        "Nginx",
      ],
      projects: [
        "Secure network infrastructure with Cisco",
        "Backup automation with PowerShell and VBS",
        "Secure Nginx web server configuration",
      ],
      experience:
        "Internship in IT maintenance and backup automation at an IT service provider. Prior experience as manager and salesperson in the commercial sector, developing team management and customer relations skills.",
      hobbies:
        "Passionate about combat sports (MMA, UFC), cybersecurity monitoring, and hands-on labs in virtualized environments.",
      goals:
        "Become an expert in offensive and defensive security, obtain advanced certifications (OSCP, CEH), and work on pentest projects and securing critical infrastructures.",
      contact: "Email: quentinsilvapro@gmail.com, LinkedIn: /in/quentin-silva",
      languages: "French (native), English (professional)",
      portfolio:
        "This portfolio was developed with Next.js, React and Tailwind CSS. It includes an interactive terminal, an intelligent chatbot, and several hidden easter eggs.",
    },
  }

  const getResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    const knowledge = portfolioKnowledge[language]

    if (
      input.includes("nom") ||
      input.includes("name") ||
      input.includes("qui es") ||
      input.includes("who are") ||
      input.includes("appelle") ||
      input.includes("called")
    ) {
      return `Je m'appelle ${knowledge.name}. ${language === "fr" ? "Je suis étudiant en cybersécurité et administration systèmes réseaux." : "I am a cybersecurity and network systems administration student."}`
    }

    if (
      input.includes("formation") ||
      input.includes("étude") ||
      input.includes("education") ||
      input.includes("study") ||
      input.includes("école") ||
      input.includes("school") ||
      input.includes("diplôme") ||
      input.includes("degree")
    ) {
      return knowledge.formation
    }

    if (
      input.includes("compétence") ||
      input.includes("skill") ||
      input.includes("technologie") ||
      input.includes("savoir") ||
      input.includes("maitrise")
    ) {
      return `${language === "fr" ? "Mes compétences techniques incluent" : "My technical skills include"}: ${knowledge.skills.join(", ")}`
    }

    if (
      input.includes("projet") ||
      input.includes("project") ||
      input.includes("réalisation") ||
      input.includes("travaux")
    ) {
      return `${language === "fr" ? "Voici mes projets principaux" : "Here are my main projects"}: ${knowledge.projects.join(" | ")}`
    }

    if (
      input.includes("expérience") ||
      input.includes("experience") ||
      input.includes("stage") ||
      input.includes("internship") ||
      input.includes("travail") ||
      input.includes("work")
    ) {
      return knowledge.experience
    }

    if (
      input.includes("contact") ||
      input.includes("email") ||
      input.includes("linkedin") ||
      input.includes("joindre") ||
      input.includes("reach")
    ) {
      return knowledge.contact
    }

    if (input.includes("certif")) {
      return `${language === "fr" ? "Mes certifications" : "My certifications"}: ${knowledge.certifications}`
    }

    if (input.includes("spécialis") || input.includes("specializ") || input.includes("domaine")) {
      return knowledge.specialization
    }

    if (
      input.includes("objectif") ||
      input.includes("goal") ||
      input.includes("but") ||
      input.includes("ambition") ||
      input.includes("futur") ||
      input.includes("future")
    ) {
      return knowledge.goals
    }

    if (
      input.includes("hobby") ||
      input.includes("hobbies") ||
      input.includes("passion") ||
      input.includes("intérêt") ||
      input.includes("interest") ||
      input.includes("loisir") ||
      input.includes("aime")
    ) {
      return knowledge.hobbies
    }

    if (input.includes("langue") || input.includes("language") || input.includes("parle") || input.includes("speak")) {
      return knowledge.languages
    }

    if (
      input.includes("site") ||
      input.includes("portfolio") ||
      input.includes("website") ||
      input.includes("développé") ||
      input.includes("developed") ||
      input.includes("créé")
    ) {
      return knowledge.portfolio
    }

    if (
      input.includes("bonjour") ||
      input.includes("hello") ||
      input.includes("salut") ||
      input.includes("hi") ||
      input.includes("hey")
    ) {
      return language === "fr"
        ? "Bonjour! Je suis le chatbot assistant de Quentin. Posez-moi des questions sur son parcours, ses compétences ou ses projets!"
        : "Hello! I'm Quentin's assistant chatbot. Ask me questions about his background, skills or projects!"
    }

    if (input.includes("merci") || input.includes("thank")) {
      return language === "fr"
        ? "De rien! N'hésitez pas si vous avez d'autres questions."
        : "You're welcome! Don't hesitate if you have other questions."
    }

    if (input.includes("aide") || input.includes("help") || input.includes("quoi") || input.includes("what can")) {
      return language === "fr"
        ? "Je peux vous renseigner sur: le parcours de Quentin, ses compétences techniques, ses projets, son expérience professionnelle, ses certifications, ses objectifs, ses passions, ou comment le contacter."
        : "I can inform you about: Quentin's background, technical skills, projects, professional experience, certifications, goals, passions, or how to contact him."
    }

    return language === "fr"
      ? "Je suis désolé, je ne suis pas préparé pour répondre à cette question. Posez-moi des questions sur le parcours, les compétences, les projets, l'expérience, les objectifs ou les passions de Quentin. Vous pouvez aussi demander 'aide' pour voir les sujets disponibles."
      : "I'm sorry, I'm not prepared to answer that question. Ask me about Quentin's background, skills, projects, experience, goals or passions. You can also ask 'help' to see available topics."
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { role: "user", content: input }
    const assistantMessage: Message = { role: "assistant", content: getResponse(input) }

    setMessages([...messages, userMessage, assistantMessage])
    setInput("")
  }

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
          size="icon"
          data-presentation-hide
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <Card
          className="fixed bottom-6 right-6 w-full max-w-md h-[500px] z-50 flex flex-col shadow-2xl"
          data-presentation-hide
        >
          <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between rounded-t-lg">
            <div>
              <h3 className="font-semibold">{t.title}</h3>
              <p className="text-xs opacity-90">{t.subtitle}</p>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="hover:bg-primary-foreground/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.placeholder}
                className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </Card>
      )}
    </>
  )
}
