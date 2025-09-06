interface Props {
  userData: any;
  currentLang: "fr" | "en" | "ar";
  isDarkMode?: boolean;
}

const Services: React.FC<Props> = ({ userData, currentLang }) => {
  const services = userData?.services?.servicesList || [];

  return (
    <section id="services">
      <div>
        <h2>Services</h2>
        <div>
          {services.map((service: any, i: number) => (
            <div key={i}>
              <h3>{service.title?.[currentLang]}</h3>
              <p>{service.description?.[currentLang]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
