"use client"

import { Badge } from "@/components/ui/badge"
import { LanguagesIcon, Heart } from "lucide-react"
import * as LucideIcons from "lucide-react"

interface AboutSectionProps {
  currentLang: "fr" | "en" | "ar"
  isDarkMode: boolean
  themeClasses: any
  translations: any
  mockData: any
}

export default function AboutSection({
  currentLang,
  isDarkMode,
  themeClasses,
  translations,
  mockData,
}: AboutSectionProps) {
  const t = translations?.[currentLang]

  const getIcon = (iconName?: string) => {
    if (!iconName) return null
    const pascalCase = iconName.charAt(0).toUpperCase() + iconName.slice(1)
    return LucideIcons[pascalCase] || null
  }

  return (
    <section id="about" className={`py-20 ${themeClasses.background}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-16 ${themeClasses.text}`}>
          {t.aboutTitle}
          <span className={`block w-20 h-1 ${themeClasses.accentBg} mx-auto mt-4 rounded-full`}></span>
        </h2>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div
            className={`${themeClasses.glassDark} rounded-2xl p-8 ${themeClasses.shadow} transition-all duration-300 sm:hover:scale-105`}
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-8 ${themeClasses.text}`}>
              {mockData.username?.name?.[currentLang]}
            </h2>
            <p className={`${themeClasses.textMuted} text-lg leading-relaxed mb-8`}>
              {mockData.about_me?.aboutDescription?.[currentLang]}
            </p>
            <div className="space-y-6">
              {mockData.about_me?.personalInfo?.map((info, index) => {
                const IconComponent = getIcon(info.icon)
                return (
                  <div
                    key={index}
                    className={`flex items-center ${currentLang === "ar" ? "space-x-reverse space-x-4" : "space-x-4"}`}
                  >
                    {IconComponent && (
                      <div className={`${themeClasses.accentBg} p-3 rounded-2xl`}>
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                    )}
                    <div>
                      <p className={`font-medium ${themeClasses.text}`}>{info.label?.[currentLang]}</p>
                      <p className={`${themeClasses.textMuted}`}>{info.value?.[currentLang]}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="space-y-8">
            {/* Languages */}
            <div
              className={`${themeClasses.glassDark} rounded-2xl p-8 ${themeClasses.shadow} transition-all duration-300 sm:hover:scale-105`}
            >
              <h3 className={`text-2xl font-semibold mb-6 ${themeClasses.text} flex items-center`}>
                <LanguagesIcon className={`h-6 w-6 ${themeClasses.accent} ${currentLang === "ar" ? "ml-3" : "mr-3"}`} />
                {mockData.about_me?.languages?.title?.[currentLang]}
              </h3>
              <div className="space-y-4">
                {mockData.about_me?.languages?.list?.map((lang, index) => {
                  const levelKey = lang.level?.toLowerCase() || "a1"
                  const levelText = mockData.about_me?.languages?.levels?.[levelKey]?.[currentLang] || ""
                  const levelPercentages = { a1: 10, a2: 30, b1: 50, b2: 70, c1: 85, c2: 95, native: 100 }
                  const levelPercentage = levelPercentages[levelKey] || 0
                  return (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className={`font-medium ${themeClasses.text}`}>{lang.name?.[currentLang]}</span>
                        <span className={`text-sm ${themeClasses.textMuted}`}>{levelText}</span>
                      </div>
                      <div className={`h-2 ${isDarkMode ? "bg-gray-800" : "bg-gray-200"} rounded-full overflow-hidden`}>
                        <div
                          className={`h-full ${themeClasses.accentBg} rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${levelPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Interests */}
            <div
              className={`${themeClasses.glassDark} rounded-2xl p-8 ${themeClasses.shadow} transition-all duration-300 sm:hover:scale-105`}
            >
              <h3 className={`text-2xl font-semibold mb-6 ${themeClasses.text} flex items-center`}>
                <Heart className={`h-6 w-6 ${themeClasses.accent} ${currentLang === "ar" ? "ml-3" : "mr-3"}`} />
                {t.interests}
              </h3>
              <div className="flex flex-wrap gap-3">
                {mockData.about_me?.interests?.map((interest, index) => {
                  const IconComponent = getIcon(interest.icon)
                  return (
                    <Badge
                      key={index}
                      className={`${themeClasses.glassDark} ${themeClasses.text} border border-white/20 px-4 py-2 rounded-2xl hover:${themeClasses.accentBg} transition-all duration-300 sm:hover:scale-105`}
                    >
                      {IconComponent && (
                        <IconComponent className={`h-4 w-4 ${currentLang === "ar" ? "ml-2" : "mr-2"}`} />
                      )}
                      {interest.name?.[currentLang]}
                    </Badge>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
