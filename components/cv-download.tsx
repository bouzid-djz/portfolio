"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

export function CVDownload() {
  const { language } = useLanguage()

  const handleDownload = () => {
    const cvContent = generateCVContent(language)
    const blob = new Blob([cvContent], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `CV_Quentin_SILVA_${language.toUpperCase()}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <Button onClick={handleDownload} variant="outline" size="lg" className="gap-2 bg-transparent">
      <Download className="h-5 w-5" />
      {language === "fr" && "Télécharger mon CV"}
      {language === "en" && "Download my CV"}
      {language === "es" && "Descargar mi CV"}
      {language === "ar" && "تحميل سيرتي الذاتية"}
      {language === "pt" && "Baixar meu CV"}
    </Button>
  )
}

function generateCVContent(language: string): string {
  const cvs: Record<string, string> = {
    fr: `
QUENTIN SILVA
Étudiant BTS SIO SISR - Spécialiste Cybersécurité

===== CONTACT =====
Email: quentin.silva@example.com
LinkedIn: linkedin.com/in/quentinsilva

===== FORMATION =====
BTS SIO SISR (2023-2025)
IPSSI - Spécialisation en Systèmes et Réseaux
Focus: Cybersécurité, Administration système, Virtualisation

===== CERTIFICATIONS =====
- Cisco Introduction to Cybersecurity (2024)
- MOOC ANSSI - SecNumAcadémie (2024)
- CompTIA Security+ (En cours)

===== COMPÉTENCES TECHNIQUES =====
Réseaux: Cisco, Routage, Switching, VPN, Pare-feu
Systèmes: Windows Server, Linux (Debian, Ubuntu), Active Directory
Virtualisation: VMware, Hyper-V, Docker
Scripting: PowerShell, Bash, Python
Services: DNS, DHCP, Web (Apache, Nginx)

===== EXPÉRIENCE PROFESSIONNELLE =====
Stage - Technicien Informatique
- Maintenance informatique et gestion du parc
- Automatisation des sauvegardes (PowerShell, VBS)
- Support utilisateur et résolution d'incidents
- Mise en place de solutions de sécurité

Manager & Vendeur - Secteur Commercial
- Direction d'équipe pendant 1 an
- Gestion de la relation client
- Développement de compétences en management

===== PROJETS =====
1. Infrastructure réseau entreprise pharmaceutique
   - Conception et déploiement complet
   - Sécurisation réseau et serveurs

2. Automatisation des sauvegardes
   - Scripts PowerShell personnalisés
   - Planification et monitoring

3. Serveur web sécurisé
   - Configuration HTTPS/SSL
   - Durcissement système

===== VEILLE TECHNOLOGIQUE =====
Thèmes: Cybersécurité, Administration système, Virtualisation
Sources: IT-Connect, Alertes Google, Podcasts tech
`,
    en: `
QUENTIN SILVA
IT Systems & Networks Student - Cybersecurity Specialist

===== CONTACT =====
Email: quentin.silva@example.com
LinkedIn: linkedin.com/in/quentinsilva

===== EDUCATION =====
IT Systems & Networks Degree (2023-2025)
IPSSI - Systems and Networks Specialization
Focus: Cybersecurity, System Administration, Virtualization

===== CERTIFICATIONS =====
- Cisco Introduction to Cybersecurity (2024)
- ANSSI MOOC - SecNumAcadémie (2024)
- CompTIA Security+ (In Progress)

===== TECHNICAL SKILLS =====
Networks: Cisco, Routing, Switching, VPN, Firewall
Systems: Windows Server, Linux (Debian, Ubuntu), Active Directory
Virtualization: VMware, Hyper-V, Docker
Scripting: PowerShell, Bash, Python
Services: DNS, DHCP, Web (Apache, Nginx)

===== PROFESSIONAL EXPERIENCE =====
Internship - IT Technician
- IT maintenance and fleet management
- Backup automation (PowerShell, VBS)
- User support and incident resolution
- Implementation of security solutions

Manager & Salesperson - Commercial Sector
- Team management for 1 year
- Customer relationship management
- Development of management skills

===== PROJECTS =====
1. Pharmaceutical company network infrastructure
   - Complete design and deployment
   - Network and server security

2. Backup automation
   - Custom PowerShell scripts
   - Scheduling and monitoring

3. Secure web server
   - HTTPS/SSL configuration
   - System hardening

===== TECHNOLOGY WATCH =====
Topics: Cybersecurity, System Administration, Virtualization
Sources: IT-Connect, Google Alerts, Tech Podcasts
`,
    es: `
QUENTIN SILVA
Estudiante de Sistemas y Redes IT - Especialista en Ciberseguridad

===== CONTACTO =====
Email: quentin.silva@example.com
LinkedIn: linkedin.com/in/quentinsilva

===== FORMACIÓN =====
Grado en Sistemas y Redes IT (2023-2025)
IPSSI - Especialización en Sistemas y Redes
Enfoque: Ciberseguridad, Administración de sistemas, Virtualización

===== CERTIFICACIONES =====
- Cisco Introduction to Cybersecurity (2024)
- MOOC ANSSI - SecNumAcadémie (2024)
- CompTIA Security+ (En curso)

===== COMPETENCIAS TÉCNICAS =====
Redes: Cisco, Enrutamiento, Conmutación, VPN, Firewall
Sistemas: Windows Server, Linux (Debian, Ubuntu), Active Directory
Virtualización: VMware, Hyper-V, Docker
Scripting: PowerShell, Bash, Python
Servicios: DNS, DHCP, Web (Apache, Nginx)

===== EXPERIENCIA PROFESIONAL =====
Prácticas - Técnico Informático
- Mantenimiento informático y gestión de parque
- Automatización de copias de seguridad (PowerShell, VBS)
- Soporte al usuario y resolución de incidentes
- Implementación de soluciones de seguridad

Gerente y Vendedor - Sector Comercial
- Dirección de equipo durante 1 año
- Gestión de relaciones con clientes
- Desarrollo de habilidades de gestión

===== PROYECTOS =====
1. Infraestructura de red empresa farmacéutica
   - Diseño e implementación completa
   - Seguridad de red y servidores

2. Automatización de copias de seguridad
   - Scripts PowerShell personalizados
   - Programación y monitoreo

3. Servidor web seguro
   - Configuración HTTPS/SSL
   - Hardening del sistema

===== VIGILANCIA TECNOLÓGICA =====
Temas: Ciberseguridad, Administración de sistemas, Virtualización
Fuentes: IT-Connect, Alertas de Google, Podcasts tech
`,
    ar: `
كونتين سيلفا
طالب أنظمة وشبكات تكنولوجيا المعلومات - متخصص في الأمن السيبراني

===== التواصل =====
البريد الإلكتروني: quentin.silva@example.com
لينكد إن: linkedin.com/in/quentinsilva

===== التعليم =====
درجة أنظمة وشبكات تكنولوجيا المعلومات (2023-2025)
IPSSI - تخصص الأنظمة والشبكات
التركيز: الأمن السيبراني، إدارة الأنظمة، المحاكاة الافتراضية

===== الشهادات =====
- Cisco مقدمة للأمن السيبراني (2024)
- ANSSI MOOC - SecNumAcadémie (2024)
- CompTIA Security+ (قيد التنفيذ)

===== المهارات التقنية =====
الشبكات: Cisco، التوجيه، التبديل، VPN، جدار الحماية
الأنظمة: Windows Server، Linux (Debian، Ubuntu)، Active Directory
المحاكاة الافتراضية: VMware، Hyper-V، Docker
البرمجة النصية: PowerShell، Bash، Python
الخدمات: DNS، DHCP، Web (Apache، Nginx)

===== الخبرة المهنية =====
تدريب - فني تكنولوجيا المعلومات
- صيانة تكنولوجيا المعلومات وإدارة الأسطول
- أتمتة النسخ الاحتياطي (PowerShell، VBS)
- دعم المستخدم وحل الحوادث
- تنفيذ حلول الأمان

مدير وبائع - القطاع التجاري
- إدارة الفريق لمدة سنة واحدة
- إدارة علاقات العملاء
- تطوير مهارات الإدارة

===== المشاريع =====
1. البنية التحتية لشبكة شركة أدوية
   - تصميم ونشر كامل
   - أمان الشبكة والخادم

2. أتمتة النسخ الاحتياطي
   - نصوص PowerShell مخصصة
   - الجدولة والمراقبة

3. خادم ويب آمن
   - تكوين HTTPS/SSL
   - تقوية النظام

===== المراقبة التكنولوجية =====
المواضيع: الأمن السيبراني، إدارة الأنظمة، المحاكاة الافتراضية
المصادر: IT-Connect، تنبيهات Google، البودكاست التقني
`,
    pt: `
QUENTIN SILVA
Estudante de Sistemas e Redes de TI - Especialista em Cibersegurança

===== CONTATO =====
Email: quentin.silva@example.com
LinkedIn: linkedin.com/in/quentinsilva

===== EDUCAÇÃO =====
Graduação em Sistemas e Redes de TI (2023-2025)
IPSSI - Especialização em Sistemas e Redes
Foco: Cibersegurança, Administração de Sistemas, Virtualização

===== CERTIFICAÇÕES =====
- Cisco Introduction to Cybersecurity (2024)
- MOOC ANSSI - SecNumAcadémie (2024)
- CompTIA Security+ (Em andamento)

===== COMPETÊNCIAS TÉCNICAS =====
Redes: Cisco, Roteamento, Comutação, VPN, Firewall
Sistemas: Windows Server, Linux (Debian, Ubuntu), Active Directory
Virtualização: VMware, Hyper-V, Docker
Scripting: PowerShell, Bash, Python
Serviços: DNS, DHCP, Web (Apache, Nginx)

===== EXPERIÊNCIA PROFISSIONAL =====
Estágio - Técnico de TI
- Manutenção de TI e gestão de frota
- Automação de backup (PowerShell, VBS)
- Suporte ao usuário e resolução de incidentes
- Implementação de soluções de segurança

Gerente e Vendedor - Setor Comercial
- Gestão de equipe por 1 ano
- Gestão de relacionamento com clientes
- Desenvolvimento de habilidades de gestão

===== PROJETOS =====
1. Infraestrutura de rede de empresa farmacêutica
   - Design e implantação completa
   - Segurança de rede e servidor

2. Automação de backup
   - Scripts PowerShell personalizados
   - Agendamento e monitoramento

3. Servidor web seguro
   - Configuração HTTPS/SSL
   - Hardening do sistema

===== VIGILÂNCIA TECNOLÓGICA =====
Tópicos: Cibersegurança, Administração de Sistemas, Virtualização
Fontes: IT-Connect, Alertas do Google, Podcasts de Tech
`,
  }

  return cvs[language] || cvs.fr
}
