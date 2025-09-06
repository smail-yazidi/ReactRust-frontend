import React from "react";

interface Props {
  userData: any;
  currentLang: "fr" | "en" | "ar";
    isDarkMode: boolean;
}

const Contact: React.FC<Props> = ({ userData, currentLang }) => {
  const contact = userData.contact;
  
  return (
    <section id="contact">
      <div>
        <h2>
          {contact.contactTitle[currentLang] || "Contact"}
        </h2>
        <p>
          {contact.contactDescription[currentLang]}
        </p>
        <ul>
          {contact.contactInfo.map((info: any, i: number) => (
            <li key={i}>
              {info.label[currentLang]}: {info.value}
            </li>
          ))}
        </ul>
        <button>
          {contact.contactButton.startProject[currentLang]}
        </button>
      </div>
    </section>
  );
};

export default Contact;