interface Props {
  userData: any;
  currentLang: "fr" | "en" | "ar";
  isDarkMode?: boolean;
}

const Skills: React.FC<Props> = ({ userData, currentLang }) => {
  return (
    <section id="skills">
      <div>
        <h2>Skills</h2>

        {userData.skills.skills.map((skillCategory: any, i: number) => (
          <div key={i}>
            {/* Category title */}
            <h3>{skillCategory.title[currentLang]}</h3>

            {/* List of items */}
            <ul>
              {skillCategory.items.map((item: any, j: number) => (
                <li key={j}>{item.name[currentLang]}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
