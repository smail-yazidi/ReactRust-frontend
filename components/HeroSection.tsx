"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Star } from "lucide-react"
import * as LucideIcons from "lucide-react"

interface HeroSectionProps {
  currentLang: "fr" | "en" | "ar"
  isDarkMode: boolean
  themeClasses: any
  translations: any
  mockData: any
  scrollToSection: (section: string) => void
}

export default function HeroSection({
  currentLang,
  isDarkMode,
  themeClasses,
  translations,
  mockData,
  scrollToSection,
}: HeroSectionProps) {
  const router = useRouter()
  const t = translations?.[currentLang]

  const getIcon = (iconName?: string) => {
    if (!iconName) return null
    const pascalCase = iconName.charAt(0).toUpperCase() + iconName.slice(1)
    return LucideIcons[pascalCase] || null
  }

  return (
    <section id="home" className={`pt-32 pb-20 ${themeClasses.background}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in duration-1000">
            {mockData.hero?.specialist?.[currentLang] && (
              <div
                className={`inline-flex items-center ${
                  currentLang === "ar" ? "space-x-reverse space-x-2" : "space-x-2"
                } ${themeClasses.glassDark} px-4 py-2 rounded-2xl ${themeClasses.shadow} transition-all duration-300 sm:hover:scale-105`}
              >
                <Star className={`h-5 w-5 ${themeClasses.accent}`} />
                <span className={`${themeClasses.textMuted} font-medium`}>{mockData.hero.specialist[currentLang]}</span>
              </div>
            )}
            {mockData.hero?.heroTitle?.[currentLang] && (
              <h1
                className={`text-4xl md:text-6xl font-bold leading-tight ${themeClasses.text} transition-all duration-500`}
              >
                {mockData.hero.heroTitle[currentLang]}
              </h1>
            )}
            {mockData.hero?.heroDescription?.[currentLang] && (
              <p className={`text-lg md:text-xl ${themeClasses.textMuted} max-w-2xl leading-relaxed font-sans`}>
                {mockData.hero.heroDescription[currentLang]}
              </p>
            )}
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => router.push("/cv")}
                className={`${themeClasses.accentBg} hover:bg-[#0A2647]/90 text-white rounded-2xl px-8 py-3 ${themeClasses.shadow} transition-all duration-300 sm:hover:scale-105 text-lg`}
              >
                {t.viewJourney}
              </Button>
              {mockData.hero?.heroButtons?.map((button, index) => {
                const Icon = getIcon(button.icon)
                const isExternal = button.link?.startsWith("http")
                return (
                  <Button
                    key={index}
                    variant="outline"
                    asChild
                    className={`${themeClasses.glassDark} border-white/20 ${themeClasses.text} hover:${themeClasses.accentBg} rounded-2xl px-8 py-3 transition-all duration-300 sm:hover:scale-105 text-lg`}
                  >
                    <a
                      href={button.link || "#"}
                      target={isExternal ? "_blank" : "_self"}
                      rel={isExternal ? "noopener noreferrer" : ""}
                    >
                      {Icon && <Icon className="mr-2 h-5 w-5 inline-block" />}
                      {button.text?.[currentLang]}
                    </a>
                  </Button>
                )
              })}
            </div>
          </div>
          <div className="flex justify-center lg:justify-end lg:animate-in lg:slide-in-from-right duration-1000">
            <div
              className={`relative ${themeClasses.glassDark} rounded-2xl p-4 sm:p-6 md:p-8 ${themeClasses.shadow} transition-all duration-300 sm:hover:scale-105`}
            >
              <div
                className={
                  isDarkMode
                    ? "relative border border-white/20 w-48 h-48 sm:w-60 sm:h-60 md:w-80 md:h-80 rounded-2xl overflow-hidden"
                    : "relative border border-black/20 w-48 h-48 sm:w-60 sm:h-60 md:w-80 md:h-80 rounded-2xl overflow-hidden"
                }
              >
                <Image
                  src={mockData.photo?.url || "https://woxgxzelncuqwury.public.blob.vercel-storage.com/free.png"}
                  alt="Profile photo"
                  width={400}
                  height={400}
                  priority
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2647]/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
