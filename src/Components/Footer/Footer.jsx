import React, { useState, useRef, useEffect } from "react";
import ContactForm from "./Components/ContactForm";
import ContactCard from "./Components/ContactCard";
import SocialLinks from "./Components/SocialLinks";
import "./Style/footer.sass";
import "./Style/aboutfooter.sass";

const Footer = () => {
  const [modalMessage, setModalMessage] = useState("");
  const [modalActive, setModalActive] = useState(false);
  const [modalType, setModalType] = useState("success");
  const [infoModalActive, setInfoModalActive] = useState(false);
  const recaptchaRef = useRef(null);
  const infoModalRef = useRef(null);
  const modalTimeoutRef = useRef(null);

  // Função para mostrar modal de feedback
  const showModal = (msg, type = "success") => {
    setModalMessage(msg);
    setModalType(type);
    setModalActive(true);

    if (modalTimeoutRef.current) {
      clearTimeout(modalTimeoutRef.current);
    }

    modalTimeoutRef.current = setTimeout(() => {
      setModalActive(false);
    }, 4000);
  };

  // Fechar modais com ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setModalActive(false);
        setInfoModalActive(false);
      }
    };

    window.addEventListener("keydown", onKey);

    if (infoModalActive) {
      document.body.style.overflow = "hidden";
      infoModalRef.current?.focus();
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "auto";
    };
  }, [infoModalActive]);

  // Scroll suave para seções do Main
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (!section)
      return showModal(`Secção "${id}" não encontrada ❌`, "warning");
    section.scrollIntoView({ behavior: "smooth" });
  };

  const footerLinks = [
    { label: "Sobre Mim", id: "about" },
    { label: "Tecnologias", id: "technologies" },
    { label: "Testemunhos", id: "testimonial" },
    { label: "Faq", id: "faq" },
    { label: "Blog", id: "blog" },
  ];

  return (
    <>
      <footer id="footer" role="contentinfo" aria-label="Footer do Portfólio">
        <div className="footer-inner container">
          {/* Coluna de Contactos */}
          <div className="footer-col">
            <h3>Contactos</h3>
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
          </div>

          {/* Coluna de Navegação */}
          <div className="footer-col">
            <h3>Navegação</h3>
            <ul className="footer-links d-flex flex-column gap-3 mt-3">
              {footerLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    className="footer-link-btn"
                    onClick={() => scrollToSection(link.id)}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna de Mensagem */}
          <div className="footer-col footer-message">
            <h3>Mensagem</h3>
            <ContactForm recaptchaRef={recaptchaRef} showModal={showModal} />
          </div>

          {/* Coluna de Redes Sociais */}
          <div className="footer-col footer-social">
            <SocialLinks showModal={showModal} />
          </div>
        </div>

        {/* Rodapé inferior */}
        <p className="footer-bottom copy mt-4">
          © {new Date().getFullYear()} by Johnny Durão Mangunza — Todos os
          direitos reservados.
          <span className="jm-logo">
            JM <span>tech</span>
          </span>
          <span
            className="info-icon"
            role="button"
            aria-label="Informações detalhadas sobre o projeto"
            aria-haspopup="dialog"
            tabIndex={0}
            onClick={() => setInfoModalActive(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setInfoModalActive(true);
              }
            }}
          >
            i<span className="tooltip">Mais informações</span>
          </span>
        </p>
        <p className="recaptcha-notice">Protegido por Google reCAPTCHA</p>
      </footer>

      {/* Modal de feedback do formulário */}
      <div
        className={`modal-message ${modalActive ? "active" : ""} ${modalType}`}
        role="alert"
        aria-live="assertive"
        onClick={() => setModalActive(false)}
      >
        {modalMessage}
      </div>

      {/* Modal de informações detalhadas */}
      {infoModalActive && (
        <div
          className="modal-info-overlay"
          onClick={() => setInfoModalActive(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="info-modal-title"
        >
          <div
            className="modal-info-content animate-modal"
            ref={infoModalRef}
            tabIndex="-1"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 id="info-modal-title">Sobre o Projeto</h4>

            <p>
              Este projeto foi desenvolvido como demonstração das minhas
              competências em desenvolvimento Fullstack, incluindo integração de
              formulários dinâmicos via EmailJS.
              <br />
              <br />
              As mensagens enviadas são entregues diretamente ao meu e-mail
              pessoal de forma segura. Nenhum dado é armazenado permanentemente
              — informações temporárias expiram automaticamente após o envio.
              <br />
              <br />
              O design segue padrões modernos de UI/UX com tema Escuro Verde
              Mancha, animações sutis e princípios de acessibilidade.
              <br />
              <br />
              <strong>Políticas de uso:</strong> Este portfólio destina-se
              apenas a fins de demonstração. Todos os dados enviados são
              tratados com confidencialidade e protegidos via Google reCAPTCHA.
            </p>

            <button
              className="modal-close-btn"
              onClick={() => setInfoModalActive(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
