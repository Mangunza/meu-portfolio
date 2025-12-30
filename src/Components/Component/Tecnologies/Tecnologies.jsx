import React from "react";
import "./tecnologies.sass";
import { TECNOLOGIES_DATA } from "./tecnologies.data";

const TechnologyCard = ({ tech }) => {
  return (
    <div className="col-6 col-md-4 col-lg-3">
      <article className={`technology-card ${tech.id}`}>
        <div className="technology-icon">
          <tech.icon />
        </div>

        <div className="technology-info">
          <h3>{tech.name}</h3>
          <p>{tech.desc}</p>
        </div>
      </article>
    </div>
  );
};

const Tecnologies = () => {
  return (
    <section className="technologies-container container">
      <header className="technologies-header">
        <h5>Tecnologias</h5>

        <h1>
          Algumas <span>tecnologias</span>
        </h1>

        <p>
          Ferramentas e frameworks que utilizo para criar soluções modernas,
          escaláveis e eficientes.
        </p>
      </header>

      <div className="technologies-cards-wrapper">
        <div className="row g-4">
          {TECNOLOGIES_DATA.map((tech) => (
            <TechnologyCard key={tech.id} tech={tech} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Tecnologies);
