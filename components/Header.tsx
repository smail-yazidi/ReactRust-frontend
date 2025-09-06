import React, { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, Globe } from "lucide-react";

interface Props {
  currentLang: "fr" | "en" | "ar";
  setCurrentLang: (lang: "fr" | "en" | "ar") => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  themeClasses?: any; // optional now
}

const Header: React.FC<Props> = ({
  currentLang,
  setCurrentLang,
  isDarkMode,
  setIsDarkMode,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const navItems = [
    { href: "#home", label: { fr: "Accueil", en: "Home", ar: "الرئيسية" } },
    { href: "#skills", label: { fr: "Compétences", en: "Skills", ar: "المهارات" } },
    { href: "#projects", label: { fr: "Projets", en: "Projects", ar: "المشاريع" } },
    { href: "#education", label: { fr: "Formation", en: "Education", ar: "التعليم" } },
    { href: "#experience", label: { fr: "Expérience", en: "Experience", ar: "الخبرة" } },
    { href: "#services", label: { fr: "Services", en: "Services", ar: "الخدمات" } },
    { href: "#contact", label: { fr: "Contact", en: "Contact", ar: "اتصل بي" } },
  ];

  const languages = [
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ar", name: "العربية", flag: "🇲🇦" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentLanguage = languages.find((lang) => lang.code === currentLang);

  return (
    <>
      <header>
        <div>
          <div>
            {/* Logo */}
            <div>
              <div>
                <span>SY</span>
              </div>
              <span>Smail Yazidi</span>
            </div>

            {/* Desktop Navigation */}
            <nav>
              {navItems.map((item, index) => (
                <a key={index} href={item.href}>
                  {item.label[currentLang]}
                </a>
              ))}
            </nav>

            {/* Controls */}
            <div>
              {/* Language Selector */}
              <div>
                <button onClick={() => setIsLangOpen(!isLangOpen)}>
                  <Globe />
                  <span>
                    {currentLanguage?.flag} {currentLanguage?.name}
                  </span>
                </button>

                {isLangOpen && (
                  <div>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLang(lang.code as "fr" | "en" | "ar");
                          setIsLangOpen(false);
                        }}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun /> : <Moon />}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div>
            <nav>
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label[currentLang]}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Overlays */}
      {isMenuOpen && (
        <div onClick={() => setIsMenuOpen(false)} />
      )}

      {isLangOpen && (
        <div onClick={() => setIsLangOpen(false)} />
      )}
    </>
  );
};

export default Header;
