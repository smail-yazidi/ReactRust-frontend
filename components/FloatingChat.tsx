"use client"

import { useState, useEffect } from "react"
import { TbMessageChatbotFilled } from "react-icons/tb"
import { IoSend } from "react-icons/io5"

interface FloatingChatProps {
  isDarkMode: boolean;
  currentLang: "fr" | "en" | "ar";
  translations: any
}

export default function FloatingChat({ isDarkMode, currentLang ,translations}: FloatingChatProps) {
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState("")
   const t = translations?.[currentLang]
 
  
  // Initialize with localized welcome message
  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: t.welcomeMessage,
    },
  ])
  const [loadingask, setLoadingask] = useState(false)

  // Update the welcome message when language changes and there's only one message
  useEffect(() => {
    if (messages.length === 1 && messages[0].type === "ai") {
      setMessages([
        {
          type: "ai",
          text: t.welcomeMessage,
        },
      ])
    }
  }, [currentLang, t.welcomeMessage])
  
  const themeClasses = {
    background: isDarkMode ? "bg-black" : "bg-[#f5f5dc]",
    surface: isDarkMode ? "bg-black" : "bg-white",
    surfacee: isDarkMode ? "bg-[#2d2d2d]" : "bg-white",
    surfaceSolid: isDarkMode ? "bg-black" : "bg-white",
    text: isDarkMode ? "text-white" : "text-gray-900",
    textMuted: isDarkMode ? "text-gray-400" : "text-gray-600",
    accent: isDarkMode ? "text-[#00BFFF]" : "text-[#0A2647]",
    accentBg: isDarkMode ? "bg-[#3A6EA5]" : "bg-[#0A2647]",
    accentBorder: isDarkMode ? "border-[#3A6EA5]" : "border-[#0A2647]",
    glassDark: isDarkMode
      ? "bg-black/40 border border-white/50 shadow-xl"
      : "bg-white/40 border border-black/20 shadow-xl",
    shadow: "shadow-xl",
  }
  
  const askQuestion = async () => {
    if (!question.trim()) return
    
    // Add user message immediately
    const userMessage = { type: "user", text: question }
    setMessages((prev) => [...prev, userMessage])
    const currentQuestion = question
    setQuestion("")
    setLoadingask(true)
    
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: currentQuestion }),
      })
      
      if (!res.ok) {
        // Try to get error details from response
        let errorDetails
        try {
          errorDetails = await res.json()
        } catch (parseError) {
          errorDetails = { error: `HTTP ${res.status}` }
        }
        
        // Handle specific error cases
        if (res.status === 429) {
          throw new Error(errorDetails.error || t.tooManyRequests)
        } else if (res.status === 503) {
          throw new Error(errorDetails.error || t.serviceUnavailable)
        } else if (res.status === 500) {
          throw new Error(errorDetails.error || t.generalError)
        } else {
          throw new Error(errorDetails.error || `Request failed with status ${res.status}`)
        }
      }
      
      const data = await res.json()
      if (data.error) {
        throw new Error(data.error)
      }
      
      const aiMessage = { type: "ai", text: data.answer || "No response received." }
      setMessages((prev) => [...prev, aiMessage])
    } catch (err: any) {
      // More specific error messages with translations
      let errorMessage
      if (err.message.includes("429") || err.message.includes("Too many requests")) {
        errorMessage = t.tooManyRequests
      } else if (err.message.includes("503") || err.message.includes("unavailable")) {
        errorMessage = t.serviceUnavailable
      } else if (err.message.includes("timeout") || err.message.includes("408")) {
        errorMessage = t.requestTimeout
      } else if (err.message.includes("network") || err.name === "TypeError") {
        errorMessage = t.networkError
      } else {
        errorMessage = err.message || t.generalError
      }
      
      const errorMsg = {
        type: "ai",
        text: errorMessage,
      }
      setMessages((prev) => [...prev, errorMsg])
    } finally {
      setLoadingask(false)
    }
  }
  
  // Add retry functionality
  const retryLastQuestion = () => {
    const lastUserMessage = messages.filter((msg) => msg.type === "user").pop()
    if (lastUserMessage) {
      setQuestion(lastUserMessage.text)
    }
  }
  
  // RTL support for Arabic
  const isRTL = currentLang === "ar"
  const rtlClasses = isRTL ? "rtl" : "ltr"
  const directionClasses = isRTL ? "flex-row-reverse" : "flex-row"
  
  return (
    <>
      {/* Floating Button */}
      <div className={`fixed top-[7.5rem] z-50 ${isRTL ? "left-6 md:left-[200px]" : "right-6 md:right-[200px]"}`}>
        <button
          onClick={() => setOpen(!open)}
          className={`
            w-12 h-12 flex items-center justify-center
            text-white rounded-full border-[2px] border-[rgb(10,38,71)]
            ${themeClasses.shadow} hover:scale-110 transition-transform
            ${themeClasses.accentBg} hover:bg-[#0A2647]/90
            relative overflow-visible
          `}
        >
          <TbMessageChatbotFilled className="text-2xl relative z-10" />
        </button>
      </div>

      {/* Chat Window */}
      {open && (
        <div
          className={`fixed top-[11rem] md:top-[12rem] z-50 w-80 sm:w-96 h-[460px] sm:h-[530px] ${themeClasses.glassDark} ${themeClasses.shadow} rounded-xl flex flex-col overflow-hidden transition-all duration-300 ${isRTL ? "left-6 md:left-[200px]" : "right-6 md:right-[200px]"}`}
          dir={rtlClasses}
        >
          {/* Header */}
          <div className={`p-4 flex justify-between items-center ${themeClasses.accentBg} text-white rounded-t-xl ${directionClasses}`}>
            <div className={`flex items-center gap-2 ${directionClasses}`}>
              <TbMessageChatbotFilled className="text-2xl" />
              <span className="font-semibold text-lg">{t.aiAssistant}</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-2xl font-bold hover:text-gray-300 transition">
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            className={`flex-1 p-4 overflow-y-auto ${themeClasses.background} ${themeClasses.text} flex flex-col gap-2`}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[75%] px-3 py-2 rounded-xl shadow-sm ${
                  msg.type === "user"
                    ? isDarkMode
                      ? `${isRTL ? "self-start rounded-bl-none" : "self-end rounded-br-none"} bg-[#2c598a] text-white`
                      : `${isRTL ? "self-start rounded-bl-none" : "self-end rounded-br-none"} bg-gray-600 text-white`
                    : isDarkMode
                    ? `${isRTL ? "self-end rounded-br-none" : "self-start rounded-bl-none"} bg-gray-800 text-white`
                    : `${isRTL ? "self-end rounded-br-none" : "self-start rounded-bl-none"} bg-gray-200 text-gray-900`
                }`}
              >
                {msg.text}
                {/* Add retry button for error messages */}
                {msg.type === "ai" &&
                  (msg.text.includes(t.generalError) || msg.text.includes("error") || msg.text.includes("trouble") || 
                   msg.text.includes(t.tooManyRequests) || msg.text.includes(t.serviceUnavailable) ||
                   msg.text.includes(t.requestTimeout) || msg.text.includes(t.networkError)) && (
                    <button
                      onClick={retryLastQuestion}
                      className="mt-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded hover:bg-blue-200 transition"
                    >
                      {t.retry}
                    </button>
                  )}
              </div>
            ))}
            {loadingask && (
              <div
                className={`px-3 py-2 rounded-xl shadow-sm text-sm animate-pulse ${
                  isDarkMode
                    ? `${isRTL ? "self-end rounded-br-none" : "self-start rounded-bl-none"} bg-gray-800 text-white`
                    : `${isRTL ? "self-end rounded-br-none" : "self-start rounded-bl-none"} bg-gray-200 text-gray-900`
                }`}
              >
                {t.thinking}
              </div>
            )}
          </div>

          {/* Input */}
          <div className={`p-2 sm:p-4 ${themeClasses.surface} relative`}>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={t.askAnything}
              className={`w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"
              } ${isRTL ? "pr-4 pl-10 text-right" : "pr-10 pl-4 text-left"}`}
              onKeyDown={(e) => e.key === "Enter" && !loadingask && askQuestion()}
              disabled={loadingask}
              dir={rtlClasses}
            />
            <button
              onClick={askQuestion}
              disabled={loadingask || !question.trim()}
              className={`absolute top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full flex items-center justify-center hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed ${
                isRTL ? "left-[22px]" : "right-[22px]"
              }`}
            >
              <IoSend className={`text-base sm:text-lg ${isRTL ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}