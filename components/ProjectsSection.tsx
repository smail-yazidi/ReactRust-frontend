"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Link } from "lucide-react"

interface ProjectsSectionProps {
  currentLang: "fr" | "en" | "ar"
  themeClasses: any
  translations: any
  mockData: any
}

export default function ProjectsSection({ currentLang, themeClasses, translations, mockData }: ProjectsSectionProps) {
  const t = translations?.[currentLang]

  return (
    <section id="projects" className={`py-20 ${themeClasses.background}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-16 ${themeClasses.text}`}>
          {t.myProjects}
          <span className={`block w-20 h-1 ${themeClasses.accentBg} mx-auto mt-4 rounded-full`}></span>
        </h2>
        <div className="grid lg:grid-cols-2 gap-8">
          {mockData.projets?.projects?.map((project: any) => (
            <Card
              key={project._id || project.id || Math.random()}
              className={`rounded-2xl overflow-hidden transition-all duration-300 sm:hover:scale-105 hover:shadow-2xl group ${themeClasses.glassDark}`}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title?.[currentLang] || "Project"}
                  width={800}
                  height={450}
                  className="object-cover w-full h-full transition-transform duration-500 sm:group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
              </div>
              <CardContent className="p-8">
                <h3
                  className={`text-xl font-semibold mb-4 ${themeClasses.text} group-hover:${themeClasses.accent} transition-colors duration-300`}
                >
                  {project.title?.[currentLang]}
                </h3>
                <p className={`${themeClasses.textMuted} mb-6 leading-relaxed`}>{project.description?.[currentLang]}</p>
                {project.techStack?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech: string, techIndex: number) => (
                      <Badge
                        key={techIndex}
                        className={`${themeClasses.glassDark} ${themeClasses.textMuted} border border-white/20 hover:${themeClasses.accentBg} hover:text-white transition-all duration-300`}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
                {project.button && (
                  <div>
                    <Button
                      onClick={() => window.open(project.button.link, "_blank")}
                      className={`${themeClasses.accentBg} hover:bg-[#0A2647]/90 text-white rounded-2xl transition-all duration-300 sm:hover:scale-105`}
                    >
                      <Link className="mr-2 h-4 w-4" />
                      {project.button.label?.[currentLang] || "View Project"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
