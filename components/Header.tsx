"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Sun, Moon, ChevronDown, Search, X, Menu } from "lucide-react"

interface HeaderProps {
  currentLang: "fr" | "en" | "ar"
  isDarkMode: boolean
  themeClasses: any
  translations: any
  mockData: any
  activeSection: string
  isMenuOpen: boolean
  setIsMenuOpen: (open: boolean) => void
  isLangMenuOpen: boolean
  setIsLangMenuOpen: (open: boolean) => void
  isSearchOpen: boolean
  setIsSearchOpen: (open: boolean) => void
  setSearchTerm: (term: string) => void
  toggleTheme: () => void
  changeLanguage: (lang: "fr" | "en" | "ar") => void
  scrollToSection: (section: string) => void
  navItems: Array<{ id: string; label: string }>
  languageOptions: Array<{ code: string; label: string; flag: string }>
}

export default function Header({
  currentLang,
  isDarkMode,
  themeClasses,
  translations,
  mockData,
  activeSection,
  isMenuOpen,
  setIsMenuOpen,
  isLangMenuOpen,
  setIsLangMenuOpen,
  isSearchOpen,
  setIsSearchOpen,
  setSearchTerm,
  toggleTheme,
  changeLanguage,
  scrollToSection,
  navItems,
  languageOptions,
}: HeaderProps) {
  const router = useRouter()
  const t = translations?.[currentLang]

  return (
    <header
      className={`fixed top-0 w-full z-50 ${themeClasses.glassDark} backdrop-blur-lg ${themeClasses.shadow} transition-all duration-500`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div
              className={`${themeClasses.glassDark} backdrop-blur-lg ${isDarkMode ? "text-white" : "text-[#0A2647]"} border border-white/20 min-w-[30px] w-10 h-10 hover:${themeClasses.accent} rounded-full transition-all duration-300 sm:hover:scale-105 flex items-center justify-center text-2xl font-bold sm:hidden`}
            >
              <span>
                {(() => {
                  try {
                    const username = mockData.username?.name?.[currentLang] || "L"
                    const firstChar = username.trim().charAt(0) || "L"
                    return firstChar.toUpperCase()
                  } catch (error) {
                    return "L"
                  }
                })()}
              </span>
            </div>
            <div className={`hidden sm:block text-xl font-bold ${isDarkMode ? "text-white" : "text-[#0A2647]"}`}>
              <span>
                {(() => {
                  try {
                    const username = mockData.username?.name?.[currentLang] || "Loading..."
                    return username.toUpperCase()
                  } catch (error) {
                    return "LOADING..."
                  }
                })()}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 rounded-2xl transition-all duration-300 sm:hover:scale-105 ${
                  activeSection === item.id
                    ? `${themeClasses.accentBg} text-white ${themeClasses.shadow}`
                    : `${themeClasses.text} hover:${themeClasses.accent}`
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Controls */}
          <div
            className={`hidden xl:flex items-center ${
              currentLang === "ar" ? "space-x-reverse space-x-4" : "space-x-4"
            }`}
          >
            {/* Language Selector */}
            <div className="relative language-menu">
              <Button
                variant="outline"
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className={`${themeClasses.glassDark} backdrop-blur-lg border-white/20 ${themeClasses.text} hover:${themeClasses.accent} rounded-2xl transition-all duration-300 sm:hover:scale-105`}
              >
                <span>{currentLang.toUpperCase()}</span>
                <ChevronDown
                  className={`ml-2 h-4 w-4 transition-transform duration-300 ${isLangMenuOpen ? "rotate-180" : ""}`}
                />
              </Button>
              {isLangMenuOpen && (
                <div
                  className={`absolute top-full right-0 mt-2 ${themeClasses.glassDark} backdrop-blur-lg rounded-2xl ${themeClasses.shadow} border border-white/10 min-w-[150px] z-50 transition-all duration-300 animate-in slide-in-from-top-2`}
                >
                  {languageOptions.map((option) => (
                    <button
                      key={option.code}
                      onClick={() => changeLanguage(option.code as "fr" | "en" | "ar")}
                      className={`w-full px-4 py-3 text-left rounded-2xl transition-all duration-300 flex items-center ${
                        currentLang === "ar" ? "space-x-reverse space-x-3" : "space-x-3"
                      }`}
                    >
                      <span className="text-lg">{option.flag}</span>
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <Button
              variant="outline"
              onClick={toggleTheme}
              className={`${themeClasses.glassDark} backdrop-blur-lg border-white/20 ${themeClasses.text} hover:${themeClasses.accent} rounded-2xl transition-all duration-300 sm:hover:scale-105`}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Search Toggle */}
            <Button
              variant="outline"
              onClick={() => {
                setIsSearchOpen(!isSearchOpen)
                setSearchTerm("")
              }}
              className={`${themeClasses.glassDark} backdrop-blur-lg border-white/20 ${themeClasses.text} hover:${themeClasses.accent} rounded-2xl transition-all duration-300 sm:hover:scale-105`}
            >
              {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </Button>

            {/* Hire Me Button */}
            <Button
              onClick={() => scrollToSection("contact")}
              className={`${themeClasses.accentBg} hover:bg-[#0A2647]/90 text-white rounded-2xl px-6 py-2 ${themeClasses.shadow} transition-all duration-300 sm:hover:scale-105`}
            >
              {t.hireMe}
            </Button>
          </div>

          {/* Mobile & Tablet Controls */}
          <div
            className={`xl:hidden flex items-center ${
              currentLang === "ar"
                ? "space-x-reverse space-x-2 sm:space-x-2 md:space-x-3"
                : "space-x-2 sm:space-x-2 md:space-x-3"
            }`}
          >
            {/* Theme Toggle */}
            <Button
              variant="outline"
              onClick={toggleTheme}
              className={`${themeClasses.glassDark} backdrop-blur-lg border-white/20 ${themeClasses.text} rounded-xl sm:rounded-2xl px-2 py-1 sm:px-3 sm:py-2`}
            >
              {isDarkMode ? <Sun className="h-4 w-4 sm:h-5 sm:w-5" /> : <Moon className="h-4 w-4 sm:h-5 sm:w-5" />}
            </Button>

            {/* Language Menu */}
            <div className="relative language-menu">
              <Button
                variant="outline"
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className={`${themeClasses.glassDark} backdrop-blur-lg border-white/20 ${themeClasses.text} rounded-xl sm:rounded-2xl px-2 py-1 sm:px-3 sm:py-2`}
              >
                <span className="text-xs sm:text-sm">{currentLang.toUpperCase()}</span>
                <ChevronDown
                  className={`ml-1 h-3 w-3 sm:h-4 sm:w-4 ${
                    isLangMenuOpen ? "rotate-180" : ""
                  } transition-transform duration-300`}
                />
              </Button>
              {isLangMenuOpen && (
                <div
                  className={`absolute top-full right-0 mt-1 sm:mt-2 ${themeClasses.glassDark} backdrop-blur-lg rounded-xl sm:rounded-2xl ${themeClasses.shadow} border border-white/10 min-w-[100px] sm:min-w-[120px] z-50`}
                >
                  {languageOptions.map((option) => (
                    <button
                      key={option.code}
                      onClick={() => changeLanguage(option.code as "fr" | "en" | "ar")}
                      className={`w-full px-2 py-1 sm:px-3 sm:py-2 text-left rounded-xl sm:rounded-2xl transition-all duration-300 flex items-center ${
                        currentLang === "ar" ? "space-x-reverse space-x-1 sm:space-x-2" : "space-x-1 sm:space-x-2"
                      } text-xs sm:text-sm`}
                    >
                      <span>{option.flag}</span>
                      <span>{option.code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Button */}
            <Button
              variant="outline"
              onClick={() => {
                setIsSearchOpen(!isSearchOpen)
                setIsMenuOpen(false)
                setSearchTerm("")
              }}
              className={`${themeClasses.glassDark} backdrop-blur-lg border-white/20 ${themeClasses.text} rounded-xl sm:rounded-2xl px-2 py-1 sm:px-3 sm:py-2`}
            >
              {isSearchOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Search className="h-4 w-4 sm:h-5 sm:w-5" />}
            </Button>

            {/* Menu Toggle */}
            <button
              onClick={() => {
                setIsMenuOpen(!isMenuOpen)
                setIsSearchOpen(false)
                setSearchTerm("")
              }}
              className={`${themeClasses.text} hover:${themeClasses.accent} transition-colors duration-300`}
            >
              {isMenuOpen ? <X className="h-6 w-6 sm:h-6 sm:w-6" /> : <Menu className="h-6 w-6 sm:h-6 sm:w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className={`xl:hidden ${themeClasses.glassDark} backdrop-blur-lg rounded-2xl mb-4 p-4 ${themeClasses.shadow} transition-all duration-300 animate-in slide-in-from-top-2`}
            dir={currentLang === "ar" ? "rtl" : "ltr"}
          >
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-3 rounded-2xl transition-all duration-300 ${
                    currentLang === "ar" ? "text-right" : "text-left"
                  } ${
                    activeSection === item.id
                      ? `${themeClasses.accentBg} text-white`
                      : `${themeClasses.text} hover:${themeClasses.accentBg} hover:text-white`
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2">
                <Button
                  onClick={() => scrollToSection("contact")}
                  className={`w-full ${themeClasses.accentBg} hover:bg-[#0A2647]/90 text-white rounded-2xl`}
                >
                  {t.hireMe}
                </Button>
              </div>
            </nav>
          </div>
        )}

        {/* Search Bar */}
        {isSearchOpen && (
          <div
            className={`${themeClasses.glassDark} backdrop-blur-lg rounded-2xl mb-4 p-4 ${themeClasses.shadow} transition-all duration-300 animate-in slide-in-from-top-2`}
          >
            <div className="relative">
              <input
                type="text"
                placeholder={currentLang === "fr" ? "Rechercher..." : currentLang === "en" ? "Search..." : "البحث..."}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-4 py-3 ${themeClasses.glassDark} border border-white/20 rounded-2xl ${themeClasses.text} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0A2647] transition-all duration-300`}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
