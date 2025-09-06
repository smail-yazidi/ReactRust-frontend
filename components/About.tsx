import React from "react";
import * as LucideIcons from "lucide-react";

interface Props {
  userData: any;
  currentLang: "fr" | "en" | "ar";
  isDarkMode: boolean;
}

const About: React.FC<Props> = ({ userData, currentLang }) => {
  const about = userData?.about_me;
  const personalInfo = about?.personalInfo || [];
  const languages = about?.languages || { title: {}, list: [], levels: {} };
  const interests = about?.interests || [];

  const levelPercentages: Record<string, number> = {
    a1: 10,
    a2: 30,
    b1: 50,
    b2: 70,
    c1: 85,
    c2: 95,
    native: 100,
  };

  const getIcon = (
    iconName?: string
  ): React.ComponentType<React.SVGProps<SVGSVGElement>> | null => {
    if (!iconName) return null;

    const pascalCase = iconName.charAt(0).toUpperCase() + iconName.slice(1);

    const IconComponent = (LucideIcons as unknown as Record<
      string,
      React.ComponentType<React.SVGProps<SVGSVGElement>>
    >)[pascalCase];

    return IconComponent || null;
  };

  return (
    <section id="about">
      <div>
        <h2>
          {userData?.username?.name?.[currentLang]}
        </h2>

        <p>
          {about?.aboutDescription?.[currentLang]}
        </p>

        <div>
          {personalInfo.map((info: any, index: number) => {
            const IconComponent = getIcon(info.icon);
            return (
              <div key={index}>
                {IconComponent && (
                  <div>
                    <IconComponent />
                  </div>
                )}
                <div>
                  <p>
                    {info.label?.[currentLang]}
                  </p>
                  <p>
                    {info.value?.[currentLang]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <h3>
            {languages.title?.[currentLang]}
          </h3>
          {languages.list?.map((lang: any, index: number) => {
            const levelKey = lang.level.toLowerCase();
            const levelText = languages.levels?.[levelKey]?.[currentLang] || "";
            const levelPercentage = levelPercentages[levelKey] || 0;

            return (
              <div key={index}>
                <div>
                  <span>{lang.name?.[currentLang]}</span>
                  <span>{levelText}</span>
                </div>
                <div>
                  <div
                    style={{ width: `${levelPercentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <h3>
            Interests
          </h3>
          <div>
            {interests.map((interest: any, index: number) => {
              const IconComponent = getIcon(interest.icon);
              return (
                <span key={index}>
                  {IconComponent && <IconComponent />}
                  {interest.name?.[currentLang]}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;