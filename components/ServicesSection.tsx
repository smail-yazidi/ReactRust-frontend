"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight } from "lucide-react"

interface ServicesSectionProps {
  currentLang: "fr" | "en" | "ar"
  themeClasses: any
  translations: any
  mockData: any
}

export default function ServicesSection({ currentLang, themeClasses, translations, mockData }: ServicesSectionProps) {
  const t = translations?.[currentLang]

  return (
    <section id="services" className={`py-20 ${themeClasses.background}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-16 ${themeClasses.text}`}>
          {t.servicesTitle}
          <span className={`block w-20 h-1 ${themeClasses.accentBg} mx-auto mt-4 rounded-full`}></span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockData.services?.servicesList?.map((service, index) => {
            const title = service.title?.[currentLang]
            const description = service.description?.[currentLang]
            return (
              <Card
                key={index}
                className={`${themeClasses.glassDark} border-white/10 rounded-2xl ${themeClasses.shadow} transition-all duration-300 sm:hover:scale-105 hover:shadow-2xl group`}
              >
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <span
                      className={`text-6xl font-bold ${themeClasses.accent} opacity-40 group-hover:opacity-60 transition-opacity duration-300`}
                    >
                      0{index + 1}
                    </span>
                    <ArrowUpRight
                      className={`h-6 w-6 ${themeClasses.accent} group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300`}
                    />
                  </div>
                  <h3
                    className={`text-xl font-semibold mb-4 ${themeClasses.text} group-hover:${themeClasses.accent} transition-colors duration-300`}
                  >
                    {title}
                  </h3>
                  {description && <p className={`${themeClasses.textMuted} leading-relaxed`}>{description}</p>}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
