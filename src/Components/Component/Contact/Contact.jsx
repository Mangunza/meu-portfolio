import React, { useRef, useState, useEffect } from "react";
import Header from "../../Header/Header";
import ContactForm from "../../Footer/Components/ContactForm";
import ContactCard from "../../Footer/Components/ContactCard";
import { FaLinkedin, FaGithub, FaDiscord } from "react-icons/fa";

import logo from "../../../../src/assets/JM_tech-logo.png";
import "./contact.sass";

const Contact = () => {
  const recaptchaRef = useRef(null);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("success");
  const [modalActive, setModalActive] = useState(false);

  const showModal = (msg, type = "success") => {
    setModalMessage(msg);
    setModalType(type);
    setModalActive(true);
    setTimeout(() => setModalActive(false), 4000);
  };

  // Fechar modal com ESC
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && setModalActive(false);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      <Header />
      <main className="contact-page">
        {/* ================= INTRO ================= */}
        <section className="contact-intro">
          <header className="projects-header">
            <div className="large-section test-section position-relative pt-5">
              <div className="container py-5 text-white d-flex align-items-center justify-content-between flex-wrap">
                {/* Texto */}
                <div className="col-lg-6">
                  <div className="section-title">
                    <h5>Contactos</h5>
                    <h1>
                      Soluções <span>Digitais</span>
                    </h1>
                    <p className="lead">
                      Preencha o formulário ou use minhas informações de
                      contato.
                      <strong> Teste, contacte-nos!</strong>
                    </p>
                  </div>
                </div>

                {/* Logo */}
                <div className="header-logo">
                  <img src={logo} alt="Logo" />
                </div>
              </div>
            </div>
          </header>
        </section>

        {/* ================= GRID: FORM + INFO ================= */}
        <section className="contact-grid">
          <div className="footer-col footer-message">
            <h3 className="section-title">Mensagem</h3>
            <ContactForm recaptchaRef={recaptchaRef} showModal={showModal} />
          </div>

          <div className="footer-col contact-info">
            <h3 className="section-title">Informações</h3>
            <hr className="mb-3" />
            <ul className="list-unstyled d-flex flex-column gap-3 mt-3">
              <ContactCard
                pin
                type="location"
                title="Localização"
                value="Luanda, Angola"
              />
              <ContactCard
                type="phone"
                title="Telefone"
                value="+244 934 226 674"
              />
              <ContactCard
                type="email"
                title="Email"
                value="johnnydurao180215@gmail.com"
              />
            </ul>

            {/* Redes sociais */}
            <div className="socials">
              <a
                href="https://www.linkedin.com/in/johnny-mangunza"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon linkedin"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/Mangunza"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon github"
              >
                <FaGithub />
              </a>
              <a
                href="https://discord.com/users/1021918036950794353"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon discord"
              >
                <FaDiscord />
              </a>
            </div>
          </div>
        </section>

        {/* ================= MODAL ================= */}
        <div
          className={`modal-message ${
            modalActive ? "active" : ""
          } ${modalType}`}
          role="alert"
          aria-live="assertive"
          onClick={() => setModalActive(false)}
        >
          {modalMessage}
        </div>
      </main>
    </>
  );
};

export default React.memo(Contact);
