import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Quentin SILVA - Portfolio BTS SIO SISR",
  description:
    "Portfolio de Quentin SILVA, étudiant en BTS SIO SISR spécialisé en cybersécurité, systèmes et réseaux. Découvrez mes projets, compétences et certifications.",
  generator: "v0.app",
  keywords: ["BTS SIO", "SISR", "Cybersécurité", "Systèmes", "Réseaux", "Portfolio", "IT", "Infrastructure"],
  authors: [{ name: "Quentin SILVA" }],
  icons: {
    icon: [
      {
        url: "/image-removebg-preview.png",
        type: "image/png",
      },
    ],
    apple: "/image-removebg-preview.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
<body className={`${geist.className} antialiased`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
