"use client"

import { Server, Shield, Network, Container } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useLanguage } from "@/components/language-provider"

export function Labs() {
  const { ref, isVisible } = useScrollAnimation()
  const { language } = useLanguage()

  const labs = [
    {
      name: "Homelab Infrastructure",
      description: {
        fr: "Serveur personnel avec virtualisation, monitoring et services critiques",
        en: "Personal server with virtualization, monitoring and critical services",
        es: "Servidor personal con virtualización, monitoreo y servicios críticos",
        ar: "خادم شخصي مع المحاكاة الافتراضية والمراقبة والخدمات الحرجة",
        pt: "Servidor pessoal com virtualização, monitoramento e serviços críticos",
      },
      tech: ["VMware ESXi", "pfSense", "Zabbix"],
      icon: Server,
      status: "active",
    },
    {
      name: "Security Lab",
      description: {
        fr: "Environnement de test pour pentesting et analyse de vulnérabilités",
        en: "Testing environment for pentesting and vulnerability analysis",
        es: "Entorno de prueba para pentesting y análisis de vulnerabilidades",
        ar: "بيئة اختبار للاختبار الاختراقي وتحليل الثغرات الأمنية",
        pt: "Ambiente de teste para pentesting e análise de vulnerabilidades",
      },
      tech: ["Kali Linux", "Metasploit", "Wireshark"],
      icon: Shield,
      status: "active",
    },
    {
      name: "Network Simulation",
      description: {
        fr: "Topologies réseau complexes pour apprentissage et tests",
        en: "Complex network topologies for learning and testing",
        es: "Topologías de red complejas para aprendizaje y pruebas",
        ar: "طبولوجيات الشبكة المعقدة للتعلم والاختبار",
        pt: "Topologias de rede complexas para aprendizagem e testes",
      },
      tech: ["GNS3", "Cisco IOS", "VLANs"],
      icon: Network,
      status: "active",
    },
    {
      name: "Container Lab",
      description: {
        fr: "Déploiement et orchestration de conteneurs pour microservices",
        en: "Container deployment and orchestration for microservices",
        es: "Despliegue y orquestación de contenedores para microservicios",
        ar: "نشر وتنسيق الحاويات للخدمات المصغرة",
        pt: "Implantação e orquestração de contêineres para microsserviços",
      },
      tech: ["Docker", "Kubernetes", "Portainer"],
      icon: Container,
      status: "inProgress",
    },
  ]

  return (
    <section id="labs" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === "fr" && "Labs & Environnements"}
              {language === "en" && "Labs & Environments"}
              {language === "es" && "Labs y Entornos"}
              {language === "ar" && "المختبرات والبيئات"}
              {language === "pt" && "Labs e Ambientes"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === "fr" && "Mes environnements de test et d'apprentissage pratique"}
              {language === "en" && "My testing and hands-on learning environments"}
              {language === "es" && "Mis entornos de prueba y aprendizaje práctico"}
              {language === "ar" && "بيئات الاختبار والتعلم العملي الخاصة بي"}
              {language === "pt" && "Meus ambientes de teste e aprendizagem prática"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {labs.map((lab, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <lab.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{lab.name}</h3>
                      <Badge variant={lab.status === "active" ? "default" : "secondary"} className="text-xs">
                        {lab.status === "active"
                          ? language === "fr"
                            ? "Actif"
                            : language === "en"
                              ? "Active"
                              : language === "es"
                                ? "Activo"
                                : language === "ar"
                                  ? "نشط"
                                  : "Ativo"
                          : language === "fr"
                            ? "En cours"
                            : language === "en"
                              ? "In Progress"
                              : language === "es"
                                ? "En curso"
                                : language === "ar"
                                  ? "قيد التنفيذ"
                                  : "Em andamento"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {lab.description[language as keyof typeof lab.description]}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {lab.tech.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
