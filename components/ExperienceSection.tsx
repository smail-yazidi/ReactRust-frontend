"use client"

import { Badge } from "@/components/ui/badge"
import { Briefcase, GraduationCap } from "lucide-react"

interface ExperienceSectionProps {
  currentLang: "fr" | "en" | "ar"
  isDarkMode: boolean
  themeClasses: any
  translations: any
  mockData: any
}

export default function ExperienceSection({
  currentLang,
  isDarkMode,
  themeClasses,
  translations,
  mockData,
}: ExperienceSectionProps) {
  const t = translations?.[currentLang]

  return (
    <section id="experience" className={`py-20 ${themeClasses.background}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-16 ${themeClasses.text}`}>
          {t.journeyTitle}
          <span className={`block w-20 h-1 ${themeClasses.accentBg} mx-auto mt-4 rounded-full`}></span>
        </h2>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <div
            className={`${themeClasses.glassDark} rounded-2xl p-8 ${themeClasses.shadow} transition-all duration-300 sm:hover:scale-105`}
          >
            <h3 className={`text-2xl font-semibold mb-8 ${themeClasses.text} flex items-center`}>
              <GraduationCap className={`h-6 w-6 ${themeClasses.accent} ${currentLang === "ar" ? "ml-3" : "mr-3"}`} />
              {currentLang === "fr" ? "Formation" : currentLang === "en" ? "Education" : "التعليم"}
            </h3>
            <div className="space-y-8">
              {mockData.education?.education
                ?.slice()
                .reverse()
                .map((event, index) => (
                  <div
                    key={index}
                    className={`relative ${
                      currentLang === "ar" ? "pr-8 border-r-2" : "pl-8 border-l-2"
                    } ${isDarkMode ? "border-white/30" : "border-[#0A2647]/30"}`}
                  >
                    <div
                      className={`absolute top-0 w-4 h-4 ${themeClasses.accentBg} rounded-full ${
                        currentLang === "ar" ? "-right-2" : "-left-2"
                      }`}
                    ></div>
                    <div
                      className={`absolute top-1 w-2 h-2 bg-white rounded-full ${
                        currentLang === "ar" ? "-right-1" : "-left-1"
                      }`}
                    ></div>
                    <p className={`text-sm ${themeClasses.accent} font-semibold mb-2`}>{event.year?.[currentLang]}</p>
                    <h4 className={`text-lg font-semibold mb-2 ${themeClasses.text}`}>{event.title?.[currentLang]}</h4>
                    <p className={`${themeClasses.textMuted} mb-2`}>{event.institution?.[currentLang]}</p>
                    {event.description && (
                      <p className={`${themeClasses.textMuted} text-sm`}>{event.description?.[currentLang]}</p>
                    )}
                  </div>
                ))}
            </div>
          </div>

          {/* Experience */}
          <div
            className={`${themeClasses.glassDark} rounded-2xl p-8 ${themeClasses.shadow} transition-all duration-300 sm:hover:scale-105`}
          >
            <h3 className={`text-2xl font-semibold mb-8 ${themeClasses.text} flex items-center`}>
              <Briefcase className={`h-6 w-6 ${themeClasses.accent} ${currentLang === "ar" ? "ml-3" : "mr-3"}`} />
              {currentLang === "fr" ? "Expérience" : currentLang === "en" ? "Experience" : "الخبرة"}
            </h3>
            <div className="space-y-8">
              {mockData.education?.experience
                ?.slice()
                .reverse()
                .map((event, index) => (
                  <div
                    key={index}
                    className={`relative ${
                      currentLang === "ar" ? "pr-8 border-r-2" : "pl-8 border-l-2"
                    } ${isDarkMode ? "border-white/30" : "border-[#0A2647]/30"}`}
                  >
                    <div
                      className={`absolute top-0 w-4 h-4 ${themeClasses.accentBg} rounded-full ${
                        currentLang === "ar" ? "-right-2" : "-left-2"
                      }`}
                    ></div>
                    <div
                      className={`absolute top-1 w-2 h-2 bg-white rounded-full ${
                        currentLang === "ar" ? "-right-1" : "-left-1"
                      }`}
                    ></div>
                    <div className="flex items-center gap-3 mb-2">
                      <p className={`text-sm ${themeClasses.accent} font-semibold`}>{event.year?.[currentLang]}</p>
                      {event.duration && (
                        <Badge className={`${themeClasses.accentBg} text-white text-xs`}>{event.duration}</Badge>
                      )}
                    </div>
                    <h4 className={`text-lg font-semibold mb-2 ${themeClasses.text}`}>{event.title?.[currentLang]}</h4>
                    <p className={`${themeClasses.textMuted} mb-2`}>{event.institution?.[currentLang]}</p>
                    {event.description && (
                      <p className={`${themeClasses.textMuted} text-sm`}>{event.description?.[currentLang]}</p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
