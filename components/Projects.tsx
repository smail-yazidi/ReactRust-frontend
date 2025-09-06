interface Props {
  userData: any;
  currentLang: "fr" | "en" | "ar";
  isDarkMode?: boolean;
}

const Projects: React.FC<Props> = ({ userData, currentLang }) => {
  return (
    <section id="projects">
      <div>
        <h2>Projects</h2>
        <div>
          {userData.projets?.projects?.map((project: any, i: number) => (
            <div key={i}>
              <h3>{project.title[currentLang]}</h3>
              <p>{project.description[currentLang]}</p>
              {project.button?.link && (
                <a
                  href={project.button.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.button.label[currentLang]}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
