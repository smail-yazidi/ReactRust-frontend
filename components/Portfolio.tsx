"use client"

import { useState, useEffect } from "react"
import Loading from "@/components/Loading"
import Header from "@/components/Header"
import HeroSection from "@/components/HeroSection"
import SkillsSection from "@/components/SkillsSection"
import ProjectsSection from "@/components/ProjectsSection"
import ExperienceSection from "@/components/ExperienceSection"
import AboutSection from "@/components/AboutSection"
import ServicesSection from "@/components/ServicesSection"
import ContactSection from "@/components/ContactSection"
import Footer from "@/components/Footer"
import SearchResults from "@/components/SearchResults"
import FloatingChat from "@/components/FloatingChat"

const translations = {
  fr: {
    home: "Accueil",
    services: "Services",
    experience: "Parcours",
    skills: "Compétences",
    projects: "Projets",
    about: "À Propos",
    contact: "Contact",
    hireMe: "Me Contacter",
    viewJourney: "Voir Mon CV",
    servicesTitle: "Services",
    journeyTitle: "Parcours Professionnel & Éducatif",
    skillsTitle: "Mes Compétences",
    myProjects: "Mes Projets",
    aboutTitle: "À Propos de Moi",
    interests: "Centres d'Intérêt",
    rightsReserved: "Tous droits réservés",
    // Chat specific translations
    aiAssistant: "Assistant IA",
    askAnything: "Demandez-moi n'importe quoi...",
    thinking: "Réflexion...",
    retry: "Réessayer",
    welcomeMessage: "Bonjour ! Je suis l'assistant de Smail. Comment puis-je vous aider aujourd'hui ?",
    tooManyRequests: "Je reçois trop de demandes maintenant. Veuillez attendre environ 30 secondes avant de poser une autre question.",
    serviceUnavailable: "Le service IA est temporairement occupé. Veuillez réessayer dans un moment.",
    requestTimeout: "La demande a expiré. Veuillez essayer de poser une question plus courte.",
    networkError: "Problème de connexion réseau. Veuillez vérifier votre connexion internet et réessayer.",
    generalError: "Désolé, j'ai des difficultés en ce moment. Veuillez réessayer dans quelques instants."
  },
  en: {
    home: "Home",
    services: "Services",
    experience: "Journey",
    skills: "Skills",
    projects: "Projects",
    about: "About",
    contact: "Contact",
    hireMe: "Hire Me",
    interests: "Interests",
    viewJourney: "View My CV",
    servicesTitle: "Services",
    journeyTitle: "Work Experience & Education Timeline",
    skillsTitle: "My Skills",
    myProjects: "My Projects",
    aboutTitle: "About Me",
    rightsReserved: "All rights reserved",
    // Chat specific translations
    aiAssistant: "AI Assistant",
    askAnything: "Ask me anything...",
    thinking: "Thinking...",
    retry: "Retry",
    welcomeMessage: "Hello! I'm Smail's assistant. How can I help you today?",
    tooManyRequests: "I'm getting too many requests right now. Please wait about 30 seconds before asking another question.",
    serviceUnavailable: "The AI service is temporarily busy. Please try again in a moment.",
    requestTimeout: "The request timed out. Please try asking a shorter question.",
    networkError: "Network connection issue. Please check your internet connection and try again.",
    generalError: "Sorry, I'm having trouble right now. Please try again in a few moments."
  },
  ar: {
    home: "الرئيسية",
    services: "الخدمات",
    experience: "المسيرة المهنية",
    skills: "المهارات",
    projects: "المشاريع",
    about: "عنّي",
    contact: "التواصل",
    hireMe: "وظفني",
    interests: "الاهتمامات",
    viewJourney: "عرض سيرتي الذاتية",
    servicesTitle: "الخدمات",
    journeyTitle: "المسيرة المهنية والتعليمية",
    skillsTitle: "مهاراتي",
    myProjects: "مشاريعي",
    aboutTitle: "نبذة عني",
    rightsReserved: "جميع الحقوق محفوظة",
    // Chat specific translations
    aiAssistant: "المساعد الذكي",
    askAnything: "اسألني أي شيء...",
    thinking: "أفكر...",
    retry: "إعادة المحاولة",
    welcomeMessage: "مرحباً! أنا مساعد سمائل. كيف يمكنني مساعدتك اليوم؟",
    tooManyRequests: "أتلقى الكثير من الطلبات الآن. يرجى الانتظار حوالي 30 ثانية قبل طرح سؤال آخر.",
    serviceUnavailable: "خدمة الذكاء الاصطناعي مشغولة مؤقتاً. يرجى المحاولة مرة أخرى بعد قليل.",
    requestTimeout: "انتهت مهلة الطلب. يرجى محاولة طرح سؤال أقصر.",
    networkError: "مشكلة في الاتصال بالشبكة. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.",
    generalError: "عذراً، أواجه صعوبة الآن. يرجى المحاولة مرة أخرى بعد بضع لحظات."
  },
}
const baseMockData = {
  username: { name: { fr: "", en: "", ar: "" } },
  hero: {},
  services: { servicesList: [] },
  education: { education: [], experience: [] },
  skills: { skills: [] },
  projets: { projects: [] },
  about_me: {
    aboutDescription: {},
    personalInfo: [],
    languages: {},
    interests: [],
  },
  contact: {
    contactTitle: {},
    contactDescription: {},
    contactInfo: [],
    contactButton: {},
  },
  photo: { url: "" },
}

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [mockData, setMockData] = useState(baseMockData)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [currentLang, setCurrentLang] = useState<"fr" | "en" | "ar">(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("language")
      return saved !== null ? (saved as "fr" | "en" | "ar") : "fr"
    }
    return "fr"
  })

  const t = translations[currentLang]

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("darkMode")
      return saved !== null ? JSON.parse(saved) : true
    }
    return true
  })

  const navItems = [
    { id: "skills", label: t.skills },
    { id: "projects", label: t.projects },
    { id: "experience", label: t.experience },
    { id: "about", label: t.about },
    { id: "services", label: t.services },
    { id: "contact", label: t.contact },
  ]

  const languageOptions = [
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "ar", label: "العربية", flag: "🇸🇦" },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  useEffect(() => {
    sessionStorage.setItem("darkMode", JSON.stringify(isDarkMode))
  }, [isDarkMode])

  useEffect(() => {
    sessionStorage.setItem("language", currentLang)
    document.documentElement.lang = currentLang
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr"
  }, [currentLang])

  const toggleTheme = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    sessionStorage.setItem("darkMode", JSON.stringify(newMode))
  }

  const changeLanguage = (lang: "fr" | "en" | "ar") => {
    setCurrentLang(lang)
    setIsLangMenuOpen(false)
    sessionStorage.setItem("language", lang)
  }

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([])
      return
    }

    const term = searchTerm.toLowerCase()
    const results: any[] = []

    try {
      // Search in projects - updated path
      if (mockData.projets?.projects) {
        mockData.projets.projects.forEach((project) => {
          if (
            project.title?.[currentLang]?.toLowerCase().includes(term) ||
            project.description?.[currentLang]?.toLowerCase().includes(term)
          ) {
            results.push({ type: "Project", item: project })
          }
        })
      }

      // Search in skills
      if (mockData.skills?.skills) {
        mockData.skills.skills.forEach((category) => {
          if (category.items) {
            category.items.forEach((skill) => {
              if (
                skill.name?.[currentLang]?.toLowerCase().includes(term) ||
                skill.examples?.some((ex) => ex?.[currentLang]?.toLowerCase().includes(term))
              ) {
                results.push({ type: "Skill", item: skill })
              }
            })
          }
        })
      }

      // Search in about - updated path
      if (mockData.about_me?.aboutDescription?.[currentLang]?.toLowerCase().includes(term)) {
        results.push({ type: "About", item: { description: mockData.about_me.aboutDescription } })
      }

      setSearchResults(results)
    } catch (error) {
      console.error(" Error during search:", error)
      setSearchResults([])
    }
  }, [searchTerm, currentLang, mockData])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "experience", "skills", "projects", "about", "contact"]
      const scrollPosition = window.scrollY + 110
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            if (activeSection !== section) {
              setActiveSection(section)
            }
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeSection])

 const fetchUserData = async () => {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const res = await fetch(`${backendUrl}/api/userdata`);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    setMockData(data);
  } catch (err) {
    console.error("Failed to fetch user data:", err);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchUserData()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest(".language-menu")) {
        if (isLangMenuOpen) {
          setIsLangMenuOpen(false)
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isLangMenuOpen])

  // Theme classes
  const themeClasses = {
    background: isDarkMode ? "bg-black" : "bg-[#f5f5dc]",
    surface: isDarkMode ? "bg-black/40" : "bg-white/40",
    surfaceSolid: isDarkMode ? "bg-black" : "bg-white",
    text: isDarkMode ? "text-white" : "text-gray-900",
    textMuted: isDarkMode ? "text-gray-400" : "text-gray-600",
    accent: isDarkMode ? "text-[#00BFFF]" : "text-[#0A2647]",
    accentBg: isDarkMode ? "bg-[#3A6EA5]" : "bg-[#0A2647]",
    accentBorder: isDarkMode ? "border-[#3A6EA5]" : "border-[#0A2647]",
    glassDark: isDarkMode
      ? "bg-black/40 border border-white/20 shadow-xl"
      : "bg-white/40 border border-black/20 shadow-xl",
    shadow: "shadow-xl",
  }

  if (loading) return <Loading />

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${themeClasses.background} ${themeClasses.text} ${
        currentLang === "ar" ? "font-arabic" : ""
      }`}
      style={{ direction: currentLang === "ar" ? "rtl" : "ltr" }}
    >
      <Header
        currentLang={currentLang}
        isDarkMode={isDarkMode}
        themeClasses={themeClasses}
        translations={translations}
        mockData={mockData}
        activeSection={activeSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isLangMenuOpen={isLangMenuOpen}
        setIsLangMenuOpen={setIsLangMenuOpen}
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        setSearchTerm={setSearchTerm}
        toggleTheme={toggleTheme}
        changeLanguage={changeLanguage}
        scrollToSection={scrollToSection}
        navItems={navItems}
        languageOptions={languageOptions}
      />

      <HeroSection
        currentLang={currentLang}
        isDarkMode={isDarkMode}
        themeClasses={themeClasses}
        translations={translations}
        mockData={mockData}
        scrollToSection={scrollToSection}
      />

      <SkillsSection
        currentLang={currentLang}
        themeClasses={themeClasses}
        translations={translations}
        mockData={mockData}
      />

      <ProjectsSection
        currentLang={currentLang}
        themeClasses={themeClasses}
        translations={translations}
        mockData={mockData}
      />

      <ExperienceSection
        currentLang={currentLang}
        isDarkMode={isDarkMode}
        themeClasses={themeClasses}
        translations={translations}
        mockData={mockData}
      />

      <AboutSection
        currentLang={currentLang}
        isDarkMode={isDarkMode}
        themeClasses={themeClasses}
        translations={translations}
        mockData={mockData}
      />

      <ServicesSection
        currentLang={currentLang}
        themeClasses={themeClasses}
        translations={translations}
        mockData={mockData}
      />

      <ContactSection
        currentLang={currentLang}
        themeClasses={themeClasses}
        translations={translations}
        mockData={mockData}
        scrollToSection={scrollToSection}
        isDarkMode={isDarkMode}
      />

      <Footer
        currentLang={currentLang}
        isDarkMode={isDarkMode}
        themeClasses={themeClasses}
        translations={translations}
        mockData={mockData}
      />

      <FloatingChat 
        isDarkMode={isDarkMode}
        currentLang={currentLang}
        translations={translations}/>
        
      {searchTerm && (
        <SearchResults
          searchTerm={searchTerm}
          searchResults={searchResults}
          currentLang={currentLang}
          themeClasses={themeClasses}
          mockData={mockData}
        />
      )}
    </div>
  )
}
