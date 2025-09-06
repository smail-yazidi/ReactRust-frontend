"use client"

interface FooterProps {
  currentLang: "fr" | "en" | "ar"
  isDarkMode: boolean
  themeClasses: any
  translations: any
  mockData: any
}

export default function Footer({ currentLang, isDarkMode, themeClasses, translations, mockData }: FooterProps) {
  const t = translations

  return (
    <footer className={`${themeClasses.glassDark} border-t border-white/10`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <span className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-[#0A2647]"}`}>
              © 2025 {mockData.username?.name?.[currentLang]}
            </span>
          </div>
          <p className={`${themeClasses.textMuted}`}>{t.rightsReserved}</p>
        </div>
      </div>
    </footer>
  )
}
