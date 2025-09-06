import React from "react";

interface Props {
  currentLang: "fr" | "en" | "ar";
  isDarkMode?: boolean;
}

const Footer: React.FC<Props> = ({ currentLang }) => {
  return (
    <footer>
      <p>
        © {new Date().getFullYear()} – My Portfolio ({currentLang.toUpperCase()})
      </p>
    </footer>
  );
};

export default Footer;
