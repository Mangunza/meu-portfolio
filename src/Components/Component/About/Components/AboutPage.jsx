import React from "react";

import Header from "../../../Header/Header";
import Footer from "../../../Footer/Footer";

import avatar from "../../../../assets/JM.png";
import btnArrow from "./../../../../assets/btn-arrow.svg";

import { TIMELINE, SOFT_SKILLS } from "./aboutpage.data";
import "./Style/aboutpage.sass";
import { Link } from "react-router-dom";

const AboutPage = () => (
  <>
    <Header />
    <main className="about-page">
      <header className="projects-header">
        <div className="large-section test-section position-relative pt-5">
          <div className="container py-5 text-white">
            <div className="row section-head py-5 align-items-center">
              <div className="col-lg-6">
                <div className="section-title">
                  <h5>Portfólio</h5>
                  <h1>
                    Aqui algumas <span>Abilidades em TI</span>
                  </h1>
                  <p className="lead">
                    Descubra projetos que combinam criatividade, tecnologia e
                    resultados reais.
                    <strong> Teste, explore e inspire-se!</strong>
                  </p>
                </div>
              </div>

              <div className="col-lg-6 d-flex justify-content-end align-items-end">
                <div className="btn-1">
                  <Link to="/contact" className="btn">
                    Fale Comigo
                    <img src={btnArrow} alt="arrow" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="about-hero">
        <div className="hero-content">
          <div className="hero-avatar-wrapper">
            <img
              src={avatar}
              alt="Johnny Durão Mujito Mangunza"
              className="hero-avatar"
              loading="lazy"
            />
          </div>
          <h1 className="hero-title">Johnny Durão Mujito Mangunza</h1>
          <p className="hero-subtitle">
            Engenheiro de Informática · Desenvolvedor Fullstack · Soluções Web &
            Sistemas
          </p>
        </div>
      </section>

      {/* ================= PILARES ================= */}
      <section className="about-pillars">
        <article className="pillar">
          <h3>Missão</h3>
          <p>
            Projetar e desenvolver soluções tecnológicas robustas, escaláveis e
            seguras, focadas em resolver problemas reais e gerar impacto
            positivo para pessoas e organizações.
          </p>
        </article>

        <article className="pillar">
          <h3>Visão</h3>
          <p>
            Ser reconhecido como um profissional confiável, capaz de transformar
            desafios complexos em soluções digitais claras e sustentáveis.
          </p>
        </article>

        <article className="pillar">
          <h3>Valores</h3>
          <p>
            Ética profissional, responsabilidade, excelência técnica,
            aprendizagem contínua e compromisso total com a qualidade e os
            resultados entregues.
          </p>
        </article>
      </section>

      {/* ================= TIMELINE ================= */}
      <section className="about-timeline">
        <h2 className="section-title">Percurso Profissional</h2>

        <div className="timeline">
          {TIMELINE.map((item) => (
            <div
              className={`timeline-item ${
                item.year.includes("+") ? "is-current" : ""
              }`}
              key={item.id}
            >
              <span className="timeline-year">{item.year}</span>

              <div className="timeline-content">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SOFT SKILLS ================= */}
      <section className="about-skills">
        <h2 className="section-title">Soft Skills</h2>

        <ul className="skills-list">
          {SOFT_SKILLS.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>
    </main>

    <Footer />
  </>
);

export default React.memo(AboutPage);
