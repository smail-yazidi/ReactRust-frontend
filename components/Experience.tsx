import React from "react";

interface Props {
  userData: any;
  currentLang: "fr" | "en" | "ar";
  isDarkMode?: boolean;
}

const Experience: React.FC<Props> = ({ userData, currentLang }) => {
 const experiences = userData?.education?.experience || [];

  return (
    <section id="experience">
      <div>
        <h2>Experience</h2>
        <div>
          {experiences.map((exp: any, i: number) => (
            <div key={i}>
              <h3>{exp.title?.[currentLang]}</h3>
              <p>{exp.institution?.[currentLang]}</p>
              <p>{exp.year?.[currentLang]}</p>
              {exp.description?.[currentLang] && (
                <p>{exp.description[currentLang]}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
