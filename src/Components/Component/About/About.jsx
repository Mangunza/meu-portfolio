import React from "react";
import avatar from "../../../assets/JM.png";
import { ABOUT_TEXTS } from "./about.texts";
import "./Style/about.sass";

const About = () => (
  <section className="about-section" id="sobremim">
    {/* BACKGROUND */}
    <div className="background-base" />
    <div className="background-neon" />

    {/* HEADER - RIGHT SIDE */}
    <div className="container">
      <div className="row justify-content-end">
        <div className="col-lg-6 col-md-8 mt-lg-0 mt-5 text-lg-end text-center">
          <div className="section-title faq-title mb-5 mt-5">
            <h5>Sobre</h5>
            <h1>
              Sobre <span>mim</span>
            </h1>
          </div>
        </div>
      </div>
    </div>

    {/* MAIN CONTENT */}
    <div className="about-wrapper">
      {/* IMAGE */}
      <div className="col-image">
        <figure className="about-image-box">
          <img
            src={avatar}
            alt="Johnny Durão – Fullstack Developer"
            className="about-image"
            loading="lazy"
          />
          <figcaption className="image-caption">
            Fullstack Developer
          </figcaption>
        </figure>
      </div>

      {/* TEXT */}
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

    {/* PARTICLES */}
    <canvas className="particles-canvas" />
  </section>
);

export default React.memo(About);
