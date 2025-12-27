import React, { useRef } from "react";
import {
  DiHtml5,
  DiCss3,
  DiJsBadge,
  DiPhp,
  DiNodejsSmall,
  DiMysql,
  DiReact,
  DiLaravel,
} from "react-icons/di";
import "./tecnologies.sass";

import { TECNOLOGIES_DATA } from "./tecnologies.data";

const Tecnologies = () => {
  const handleMouseMove = (e, cardRef) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
  };

  const handleMouseLeave = (cardRef) => {
    const card = cardRef.current;
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <section className="technologies-container container">
      {/* RIGHT SIDE - Tecnologies */}
      <div className="col-lg-6 mt-lg-0 mt-5 ms-auto text-end">
        <div className="section-title faq-title mb-5">
          <h5>Tecnologias</h5>
          <h1>
            Abilidades <span>tecnológicas</span>
          </h1>
        </div>
      </div>
      <div className="technologies-cards-wrapper">
        <div className="row g-4">
          {TECNOLOGIES_DATA.map((tech) => {
            const cardRef = useRef(null);
            return (
              <div className="col-6 col-md-4 col-lg-3" key={tech.id}>
                <article
                  className={`technology-card ${tech.id}`}
                  ref={cardRef}
                  onMouseMove={(e) => handleMouseMove(e, cardRef)}
                  onMouseLeave={() => handleMouseLeave(cardRef)}
                >
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
          })}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Tecnologies);
