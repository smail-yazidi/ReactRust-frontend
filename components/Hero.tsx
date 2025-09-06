import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getIcon } from "../utils/icons"; 

interface Props {
  userData: any;
  currentLang: "fr" | "en" | "ar";
  themeClasses: any;
  isDarkMode?: boolean;
}

const Hero: React.FC<Props> = ({ userData, currentLang, themeClasses, isDarkMode }) => {
  const hero = userData.hero;

  return (
    <section id="home" className={`pt-32 pb-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Text Section */}
          <div className="space-y-8">
            {hero.specialist?.[currentLang] && (
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-2xl">
                <Star className="h-5 w-5" />
                <span>{hero.specialist[currentLang]}</span>
              </div>
            )}

            {hero.heroTitle?.[currentLang] && (
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                {hero.heroTitle[currentLang].split(" ").map((word: string, index: number) => (
                  <span key={index}>{word} </span>
                ))}
              </h1>
            )}

            {hero.heroDescription?.[currentLang] && (
              <p className="text-lg md:text-xl max-w-2xl leading-relaxed">{hero.heroDescription[currentLang]}</p>
            )}

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              {/* Internal Link */}
              <Link
                href="/cv"
                className="px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition"
              >
                View Journey
              </Link>

              {/* External or dynamic buttons */}
              {hero.herobuttons?.map((button: any, index: number) => {
                const Icon = getIcon(button.icon);
                const isExternal = button.link?.startsWith("http");

                return isExternal ? (
                  <a
                    key={index}
                    href={button.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border rounded-2xl flex items-center gap-2 hover:bg-gray-200 transition"
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                    {button.text?.[currentLang]}
                  </a>
                ) : (
                  <Link
                    key={index}
                    href={button.link || "#"}
                    className="px-6 py-3 border rounded-2xl flex items-center gap-2 hover:bg-gray-200 transition"
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                    {button.text?.[currentLang]}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Image Section */}
          <div className="flex justify-center lg:justify-end">
            <div className={`relative rounded-2xl p-4 sm:p-6 md:p-8`}>
              <div className={
                isDarkMode 
                  ? "border border-white/20 w-48 h-48 sm:w-60 sm:h-60 md:w-80 md:h-80 rounded-2xl overflow-hidden" 
                  : "border border-black/20 w-48 h-48 sm:w-60 sm:h-60 md:w-80 md:h-80 rounded-2xl overflow-hidden"
              }>
                <Image
                  src={userData.photo?.url || "https://woxgxzelncuqwury.public.blob.vercel-storage.com/free.png"}
                  alt="Profile photo"
                  width={400}
                  height={400}
                  priority
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                />
                <div className='absolute inset-0 bg-gradient-to-t from-[#0A2647]/20 to-transparent'></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
