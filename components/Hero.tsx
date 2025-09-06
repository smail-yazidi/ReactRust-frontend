interface Props {
  userData: any;
  currentLang: "fr" | "en" | "ar";
  isDarkMode?: boolean;
}

const Hero: React.FC<Props> = ({ userData, currentLang }) => {
  const hero = userData.hero;

  return (
    <section id="home">
      {/* Text Section */}
      <div>
        {/* Specialist Badge */}
        {hero.specialist?.[currentLang] && (
          <div>
            <span>{hero.specialist[currentLang]}</span>
          </div>
        )}

        {/* Main Title */}
        {hero.heroTitle?.[currentLang] && (
            <h1>
          {hero.heroTitle[currentLang].split(' ').map((word: string, index: number) => (
            <span key={index}>{word} </span>
          ))}
            </h1>

        )}

        {/* Description */}
        {hero.heroDescription?.[currentLang] && (
          <p>{hero.heroDescription[currentLang]}</p>
        )}

        {/* Action Buttons */}
        <div>
          {hero.heroButtons?.map((button: any, index: number) => (
            <a
              key={index}
              href={button.link || "#"}
              target={button.link?.startsWith("http") ? "_blank" : "_self"}
              rel={button.link?.startsWith("http") ? "noopener noreferrer" : ""}
            >
              <span>{button.text?.[currentLang]}</span>
            </a>
          ))}

          {/* Download CV Button */}
          <a href="#">
            <span>
              {currentLang === "ar"
                ? "تحميل السيرة الذاتية"
                : currentLang === "fr"
                ? "Télécharger CV"
                : "Download CV"}
            </span>
          </a>
        </div>
      </div>

      {/* Image Section */}
      <div>
        <div>
          <img
            src={userData.photo?.url || "https://woxgxzelncuqwury.public.blob.vercel-storage.com/free.png"}
            alt="Profile photo"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
