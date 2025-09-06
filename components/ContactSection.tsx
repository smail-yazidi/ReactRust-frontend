"use client"
import { Send } from "lucide-react"
import type React from "react"

import * as LucideIcons from "lucide-react"
import { useState } from "react"

interface ContactSectionProps {
  currentLang: "fr" | "en" | "ar"
  themeClasses: any
  translations: any
  mockData: any
  scrollToSection: (section: string) => void
  isDarkMode: boolean
}

export default function ContactSection({
  currentLang,
  themeClasses,
  translations,
  mockData,
  scrollToSection,
  isDarkMode,
}: ContactSectionProps) {
  const t = translations?.[currentLang]

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSendingMessage, setIsSendingMessage] = useState(false)
  const [isMessageSent, setIsMessageSent] = useState(false)
  const [isLimitReached, setIsLimitReached] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLimitReached || isSendingMessage) return

    setIsSendingMessage(true)

    try {
      const response = await fetch("https://reactrust-backend-production.up.railway.app/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsMessageSent(true)
        setFormData({ name: "", email: "", message: "" })
        setTimeout(() => setIsMessageSent(false), 5000)
      } else if (response.status === 429) {
        setIsLimitReached(true)
        setTimeout(() => setIsLimitReached(false), 60000) // 1 minute cooldown
      }
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setIsSendingMessage(false)
    }
  }

  const getIcon = (iconName?: string) => {
    if (!iconName) return null
    const pascalCase = iconName.charAt(0).toUpperCase() + iconName.slice(1)
    return LucideIcons[pascalCase] || null
  }

  return (
    <section id="contact" className={`py-20 ${themeClasses.background}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-3xl md:text-4xl font-bold mb-4 text-center ${themeClasses.text}`}>
          {mockData.contact?.contactTitle?.[currentLang]}
        </h2>
        <p className={`text-lg ${themeClasses.textMuted} mb-12 text-center`}>
          {mockData.contact?.contactDescription?.[currentLang]}
        </p>
        <div className="flex flex-col lg:flex-row lg:gap-8 space-y-12 lg:space-y-0">
          {/* Contact Info */}
          <div className={`${themeClasses.glassDark} border rounded-2xl p-8 ${themeClasses.shadow} flex-1 space-y-6`}>
            {mockData.contact?.contactInfo?.map((info, index) => {
              const IconComponent = getIcon(info.icon)
              return (
                <div key={index} className="flex items-start gap-4">
                  <div
                    className={`${themeClasses.accentBg} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}
                  >
                    {IconComponent && <IconComponent className="h-6 w-6 text-white" />}
                  </div>
                  <div>
                    <h3 className={`font-semibold text-lg ${themeClasses.text}`}>{info.label?.[currentLang]}</h3>
                    <p className={`${themeClasses.textMuted}`}>
                      {info.link ? (
                        <a
                          href={info.link}
                          target={info.link.startsWith("http") ? "_blank" : "_self"}
                          rel={info.link.startsWith("http") ? "noopener noreferrer" : ""}
                          className={`hover:${themeClasses.accent} transition-colors duration-300`}
                        >
                          {typeof info.value === "object" ? info.value[currentLang] : info.value}
                        </a>
                      ) : typeof info.value === "object" ? (
                        info.value[currentLang]
                      ) : (
                        info.value
                      )}
                    </p>
                  </div>
                </div>
              )
            })}
            <div className="flex justify-center mt-6">
              <a
                href={mockData.contact?.contactButton?.link || "#contact-form"}
                className={`inline-flex items-center justify-center ${themeClasses.accentBg} hover:opacity-90 text-white px-6 py-3 rounded-xl ${themeClasses.shadow} transition-all duration-300`}
              >
                <Send className={`h-5 w-5 ${currentLang === "ar" ? "ml-2" : "mr-2"}`} />
                {mockData.contact?.contactButton?.startProject?.[currentLang]}
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`${themeClasses.glassDark} border rounded-2xl p-8 ${themeClasses.shadow} flex-1`}>
            <h3 className={`text-2xl font-bold mb-6 text-center ${themeClasses.text}`}>
              {currentLang === "en" ? "Contact Me" : currentLang === "fr" ? "Contactez-moi" : "اتصل بي"}
            </h3>
            <form id="contact-form" className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={currentLang === "en" ? "Your name" : currentLang === "fr" ? "Votre nom" : "اسمك"}
                className={`w-full px-4 py-3 rounded-xl border ${isDarkMode ? "bg-gray-800 text-white border-gray-600 placeholder-gray-400" : "bg-white text-black border-gray-300 placeholder-gray-500"}`}
                required
                disabled={isLimitReached}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={
                  currentLang === "en" ? "Your email" : currentLang === "fr" ? "Votre email" : "بريدك الإلكتروني"
                }
                className={`w-full px-4 py-3 rounded-xl border ${isDarkMode ? "bg-gray-800 text-white border-gray-600 placeholder-gray-400" : "bg-white text-black border-gray-300 placeholder-gray-500"}`}
                required
                disabled={isLimitReached}
              />
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder={
                  currentLang === "en"
                    ? "Write your message..."
                    : currentLang === "fr"
                      ? "Écrivez votre message..."
                      : "اكتب رسالتك..."
                }
                className={`w-full px-4 py-3 rounded-xl border ${isDarkMode ? "bg-gray-800 text-white border-gray-600 placeholder-gray-400" : "bg-white text-black border-gray-300 placeholder-gray-500"}`}
                required
                disabled={isLimitReached}
              ></textarea>
              <button
                type="submit"
                disabled={isSendingMessage || isLimitReached}
                className={`w-full flex justify-center items-center gap-2 px-8 py-3 rounded-xl text-lg font-semibold ${
                  isLimitReached
                    ? "bg-gray-400 cursor-not-allowed"
                    : `${themeClasses.accentBg} hover:opacity-90 text-white`
                }`}
              >
                {isLimitReached
                  ? currentLang === "en"
                    ? "Try later"
                    : currentLang === "fr"
                      ? "Réessayez plus tard"
                      : "حاول لاحقًا"
                  : isSendingMessage
                    ? currentLang === "en"
                      ? "Sending..."
                      : currentLang === "fr"
                        ? "Envoi..."
                        : "جارٍ الإرسال..."
                    : currentLang === "en"
                      ? "Send Message"
                      : currentLang === "fr"
                        ? "Envoyer le message"
                        : "إرسال الرسالة"}
              </button>
              {isMessageSent && (
                <p
                  className={`font-semibold mt-2 p-2 rounded border transition-colors duration-300 ${isDarkMode ? "bg-green-800 text-green-400 border-green-600" : "bg-green-100 text-green-600 border-green-300"}`}
                  dir={currentLang === "ar" ? "rtl" : "ltr"}
                >
                  {currentLang === "en"
                    ? "Message sent successfully!"
                    : currentLang === "fr"
                      ? "Message envoyé avec succès !"
                      : "تم إرسال الرسالة بنجاح!"}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
