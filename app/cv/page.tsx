"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Sun, Moon, Loader2, Download, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"
import Loading from "@/components/Loading"

export default function CvPage() {
  const router = useRouter()
  const [isDownloading, setIsDownloading] = useState(false)
  const [cvUrls, setCvUrls] = useState<{ fr?: string; en?: string }>({})
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)

  // Initialize with safe defaults
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [language, setLanguage] = useState<"fr" | "en">("fr") // only fr | en

  // Hydrate client-side state after mount
  useEffect(() => {
    setMounted(true)

    const savedDarkMode = sessionStorage.getItem("darkMode")
    const savedLanguage = sessionStorage.getItem("language")

    setIsDarkMode(savedDarkMode ? JSON.parse(savedDarkMode) : true)

    // Replace "ar" with "fr"; allow only "fr" or "en"
    if (savedLanguage === "en") {
      setLanguage("en")
    } else {
      setLanguage("fr") // "ar" or anything else becomes "fr"
    }
  }, [])

  // Persist preferences
  useEffect(() => {
    if (!mounted) return
    sessionStorage.setItem("darkMode", JSON.stringify(isDarkMode))
    document.documentElement.classList.toggle("dark", isDarkMode)
  }, [isDarkMode, mounted])

  useEffect(() => {
    if (!mounted) return
    sessionStorage.setItem("language", language)
  }, [language, mounted])

  // Fetch CV URLs
  useEffect(() => {
    const fetchCvUrls = async () => {
      try {
        const res = await fetch("/api/cv", {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_SECRET || "",
          },
        })

        if (!res.ok) throw new Error("Failed to fetch CV URLs")

        const data = await res.json()
        setCvUrls(data)
      } catch (err) {
        console.error("Failed to fetch CV URLs:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchCvUrls()
  }, [])

  const toggleTheme = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    sessionStorage.setItem("darkMode", JSON.stringify(newMode))
  }

  const handleDownloadPdf = async () => {
    if (!cvUrls[language]) return

    setIsDownloading(true)
    try {
      const link = document.createElement("a")
      link.href = cvUrls[language]!
      link.download = `cv_${language}.pdf`
      link.target = "_blank"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      console.error("Download failed:", err)
    } finally {
      setIsDownloading(false)
    }
  }

  const getGoogleViewerUrl = (pdfUrl: string) =>
    `https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true`

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

  const languageOptions = [
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "en", label: "English", flag: "🇺🇸" },
  ]

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    )
  }

  return (
    <div className={`flex flex-col h-screen ${themeClasses.background} ${themeClasses.text}`}>
      {/* Top controls fixed height */}
      <div className="flex flex-row flex-wrap items-center justify-between w-full max-w-4xl mx-auto gap-4 p-4">
        {/* Back Button */}
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/")}
            className={`
              ${themeClasses.glassDark} border-white/20 ${themeClasses.text} 
              hover:${themeClasses.accentBg} rounded-2xl px-8 py-3
              transition-all duration-300 sm:hover:scale-105 text-lg
            `}
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">{mounted && language === "fr" ? "Retour" : "Back"}</span>
          </Button>
        </div>

        {/* Language Selector */}
        <div className="flex items-center gap-4">
          <div className="relative language-menu">
            <Button
              variant="outline"
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className={`
                ${themeClasses.glassDark} border-white/20 ${themeClasses.text} 
                hover:${themeClasses.accent} rounded-2xl transition-all duration-300 sm:hover:scale-105
              `}
            >
              <span>{language.toUpperCase()}</span>
              <ChevronDown
                className={`ml-2 h-4 w-4 transition-transform duration-300 ${isLangMenuOpen ? "rotate-180" : ""}`}
              />
            </Button>

            {isLangMenuOpen && (
              <div
                className={`
                  absolute top-full right-0 mt-2 ${themeClasses.glassDark} 
                  rounded-2xl ${themeClasses.shadow} border border-white/10 
                  min-w-[150px] z-50 transition-all duration-300 animate-in slide-in-from-top-2
                `}
              >
                {languageOptions.map((option) => (
                  <button
                    key={option.code}
                    onClick={() => {
                      setLanguage(option.code as "fr" | "en")
                      setIsLangMenuOpen(!isLangMenuOpen)
                    }}
                    className="w-full px-4 py-3 text-left rounded-2xl transition-all duration-300 flex items-center space-x-3"
                  >
                    <span className="text-lg">{option.flag}</span>
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Download & Theme Buttons */}
        <div className="flex items-center gap-2">
          <Button
            onClick={handleDownloadPdf}
            className={`
              ${themeClasses.accentBg} hover:bg-[#0A2647]/90 text-white 
              rounded-2xl px-8 py-3 ${themeClasses.shadow} transition-all duration-300 sm:hover:scale-105 text-lg
            `}
            disabled={isDownloading || !cvUrls[language]}
          >
            {isDownloading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {language === "fr" ? "Téléchargement..." : "Downloading..."}
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                {language === "fr" ? "Télécharger" : "Download"}
              </>
            )}
          </Button>

          <Button
            variant="outline"
            onClick={toggleTheme}
            className={`
              ${themeClasses.glassDark} border-white/20 ${themeClasses.text} 
              rounded-xl sm:rounded-2xl px-2 py-1 sm:px-3 sm:py-2
            `}
          >
            {isDarkMode ? <Sun className="h-4 w-4 sm:h-5 sm:w-5" /> : <Moon className="h-4 w-4 sm:h-5 sm:w-5" />}
          </Button>
        </div>
      </div>

      {/* PDF Viewer: fill remaining space */}
      <section
        className={`
          flex-1 relative
          ${themeClasses.background} ${themeClasses.glassDark} ${themeClasses.shadow}
          w-full max-w-4xl md:max-w-[794px] mx-auto my-2 rounded-2xl
        `}
      >
        {cvUrls[language] ? (
          <>
            {/* Loader overlay */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10 rounded-2xl">
                <Loader2 className="w-10 h-10 animate-spin text-white" />
              </div>
            )}

            <iframe
              src={getGoogleViewerUrl(cvUrls[language])}
              className="w-full h-full rounded-2xl"
              title={`CV PDF (${language})`}
              allowFullScreen
              onLoad={() => setLoading(false)}
            />
          </>
        ) : (
          <div className="flex items-center justify-center w-full h-full text-center text-gray-400">
            {language === "fr" ? "CV non disponible" : "CV not available"}
          </div>
        )}
      </section>
    </div>
  )
}
