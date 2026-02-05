"use client"

import type React from "react"

import { useState } from "react"
import { Send, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"

export function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { language } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: "", email: "", message: "" })

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const labels = {
    fr: {
      title: "Envoyez-moi un message",
      name: "Nom",
      email: "Email",
      message: "Message",
      send: "Envoyer",
      sending: "Envoi...",
      success: "Message envoyé avec succès !",
    },
    en: {
      title: "Send me a message",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send",
      sending: "Sending...",
      success: "Message sent successfully!",
    },
    es: {
      title: "Envíame un mensaje",
      name: "Nombre",
      email: "Email",
      message: "Mensaje",
      send: "Enviar",
      sending: "Enviando...",
      success: "¡Mensaje enviado con éxito!",
    },
    ar: {
      title: "أرسل لي رسالة",
      name: "الاسم",
      email: "البريد الإلكتروني",
      message: "الرسالة",
      send: "إرسال",
      sending: "جارٍ الإرسال...",
      success: "تم إرسال الرسالة بنجاح!",
    },
    pt: {
      title: "Envie-me uma mensagem",
      name: "Nome",
      email: "Email",
      message: "Mensagem",
      send: "Enviar",
      sending: "Enviando...",
      success: "Mensagem enviada com sucesso!",
    },
  }

  const t = labels[language as keyof typeof labels]

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6">{t.title}</h3>

      {isSubmitted && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <span className="text-green-500 font-medium">{t.success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder={t.name}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full"
          />
        </div>

        <div>
          <Input
            type="email"
            placeholder={t.email}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="w-full"
          />
        </div>

        <div>
          <Textarea
            placeholder={t.message}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            rows={6}
            className="w-full resize-none"
          />
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full gap-2">
          {isSubmitting ? (
            <>
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              {t.sending}
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              {t.send}
            </>
          )}
        </Button>
      </form>
    </Card>
  )
}
