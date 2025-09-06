"use client"
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Services from "@/components/Services";
import Contact from "@/components/Contact";

const defaultUserData = {
  username: { fr: "", en: "", ar: "" },
  hero: {
    specialist: { fr: "", en: "", ar: "" },
    heroTitle: { fr: "", en: "", ar: "" },
    heroDescription: { fr: "", en: "", ar: "" },
    heroButtons: [],
  },
  photoUrl: "",
  skills: { skills: [] },
  projects: { projects: [] },
  education: { education: [], experience: [] },
  about: {
    aboutDescription: { fr: "", en: "", ar: "" },
    personalInfo: [],
    languages: { title: { fr: "", en: "", ar: "" }, list: [], levels: {} },
    interests: [],
  },
  services: { servicesList: [] },
  contact: {
    contactTitle: { fr: "", en: "", ar: "" },
    contactDescription: { fr: "", en: "", ar: "" },
    contactInfo: [],
    contactButton: { startProject: { fr: "", en: "", ar: "" } },
  },
};

function App() {
  const [userData, setUserData] = useState(defaultUserData);
  const [loading, setLoading] = useState(true);
  const [currentLang, setCurrentLang] = useState<"fr" | "en" | "ar">("en");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const fetchUserData = async () => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const res = await fetch(`${backendUrl}/api/userdata`);
      const data = await res.json();
      setUserData(data);
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className={'min-h-screen transition-all duration-500 bg-black text-white'}>
      <Header 
        currentLang={currentLang} 
        setCurrentLang={setCurrentLang} 
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode} 
      />
      <Hero userData={userData} currentLang={currentLang} isDarkMode={isDarkMode} />
      <Skills userData={userData} currentLang={currentLang} isDarkMode={isDarkMode} />
      <Projects userData={userData} currentLang={currentLang} isDarkMode={isDarkMode} />
      <Education userData={userData} currentLang={currentLang} isDarkMode={isDarkMode} />
      <Experience userData={userData} currentLang={currentLang} isDarkMode={isDarkMode} />
      <Services userData={userData} currentLang={currentLang} isDarkMode={isDarkMode} />
      <Contact userData={userData} currentLang={currentLang} isDarkMode={isDarkMode} />
      <About userData={userData} currentLang={currentLang} isDarkMode={isDarkMode} />
      <Footer currentLang={currentLang} isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;