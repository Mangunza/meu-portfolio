import React from "react";
import avatar from "../../../assets/j-mangunza.jpg";
import { ABOUT_TEXTS } from "./about.texts";
import "./Style/about.sass";
import { Helmet } from "react-helmet";

const About = () => (
  <section className="about-section" id="sobremim">
    {/* johnnydurao1802@gmail.com */}
    <Helmet>
      <title>Inicio | JM Tech</title>
    </Helmet>
    <div className="container">
      <div className="row justify-content-end">
        <div className="col-lg-6 col-md-8 mt-lg-5 text-lg-end">
          <div className="section-title">
            <h5>Sobre</h5>
            <h2>
              Sobre <span>mim</span>
            </h2>
          </div>
        </div>
      </div>
    </div>

    <div className="about-wrapper">
      <div className="col-image">
        <figure className="about-image-box">
          <img
            src={avatar}
            alt="Johnny Durão – Fullstack Developer"
            className="about-image"
            loading="lazy"
          />
          <figcaption className="image-caption">Fullstack Developer</figcaption>
        </figure>
      </div>

      <div className="col-text">
        <section className="bio-section">
          <div className="bio-content">
            {ABOUT_TEXTS.map((text, index) => (
              <p
                key={`about-text-${index}`}
                className="bio-paragraph"
                style={{ "--delay": `${index * 0.4}s` }}
              >
                {text}
              </p>
            ))}
          </div>
        </section>
      </div>
    </div>

    <canvas className="particles-canvas" />
  </section>
);

export default React.memo(About);
