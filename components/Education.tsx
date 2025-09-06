import React from "react";

interface Props {
  userData: any;
  currentLang: "fr" | "en" | "ar";
  isDarkMode?: boolean;
}

const Education: React.FC<Props> = ({
  userData,
  currentLang,
}) => {
  const educations = userData?.education?.education || [];

  return (
    <div>
      <h2>Education</h2>

      {educations.map((edu: any, i: number) => (
        <div key={i}>
          <h3>{edu.title?.[currentLang]}</h3>
          <p>{edu.institution?.[currentLang]}</p>
          <p>{edu.year?.[currentLang]}</p>

          {edu.description?.[currentLang] && (
            <p>{edu.description[currentLang]}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Education;
