"use client"

import { Card, CardContent } from "@/components/ui/card"
import * as ReactIcons from "react-icons/si"

interface SkillsSectionProps {
  currentLang: "fr" | "en" | "ar"
  themeClasses: any
  translations: any
  mockData: any
}

export default function SkillsSection({ currentLang, themeClasses, translations, mockData }: SkillsSectionProps) {
  const t = translations?.[currentLang]

  const getIconfa = (iconName?: string) => {
    if (!iconName) return null
    const pascalCase = iconName.charAt(0).toUpperCase() + iconName.slice(1)
    return ReactIcons[pascalCase] || null
  }

  return (
    <section id="skills" className={`py-20 ${themeClasses.background}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-16 ${themeClasses.text}`}>
          {t.skillsTitle 
          }
        
          <span className={`block w-20 h-1 ${themeClasses.accentBg} mx-auto mt-4 rounded-full`}></span>
        </h2>
        <div
          className={`${themeClasses.glassDark} rounded-2xl p-8 ${themeClasses.shadow} transition-all duration-300 sm:hover:scale-105 space-y-12`}
        >
          {mockData.skills?.skills?.map((category, catIndex) => (
            <div key={`cat-${catIndex}`}>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {category.items?.map((skill, skillIndex) => {
                  const SkillIcon = getIconfa(skill.icon)
                  return (
                    <Card
                      key={`cat-${catIndex}-skill-${skillIndex}`}
                      className={`${themeClasses.glassDark} border-white/10 rounded-2xl transition-all duration-300 sm:hover:scale-105 hover:shadow-lg group ${themeClasses.shadow}`}
                    >
                      <CardContent className="p-6 text-center">
                        {SkillIcon && (
                          <SkillIcon
                            className={`h-8 w-8 mx-auto ${themeClasses.accent} mb-4 group-hover:scale-110 transition-transform duration-300`}
                          />
                        )}
                        <h4
                          className={`relative overflow-hidden whitespace-nowrap text-lg font-semibold mb-3 ${themeClasses.text} group-hover:${themeClasses.accent} transition-colors duration-300`}
                        >
                          <span className="inline-block animate-marquee sm:animate-none">
                            {skill.name?.[currentLang]}
                          </span>
                        </h4>
                        {skill.examples?.length > 0 && (
                          <ul className={`space-y-1 ${themeClasses.textMuted} text-sm text-left`}>
                            {skill.examples.map((ex, exIndex) => (
                              <li
                                key={`cat-${catIndex}-skill-${skillIndex}-ex-${exIndex}`}
                                className="flex items-center"
                              >
                                <span
                                  className={`w-2 h-2 ${themeClasses.accentBg} rounded-full ${
                                    currentLang === "ar" ? "ml-2" : "mr-2"
                                  }`}
                                ></span>
                                {ex?.[currentLang]}
                              </li>
                            ))}
                          </ul>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
