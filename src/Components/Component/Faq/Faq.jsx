// src/Components/Component/Faq/Faq.jsx
import React, { useState, useEffect, useRef } from "react";

// Imagens
import faqimage1 from "./../../../assets/our-faqs-image-1.png";
import faqimage2 from "./../../../assets/our-faqs-image-2.png";
import needhelp from "./../../../assets/icon-need-help.svg";

// Ícones
import { FaPlus, FaMinus } from "react-icons/fa";

// Estilos e JS extra
import "./Style/faq.sass";
import { FAQ_DATA } from "./Components/faq.texts"; 

function Faq() {
  const [openIndex, setOpenIndex] = useState(null);
  const accordionRef = useRef(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accordionRef.current && !accordionRef.current.contains(event.target)) {
        setOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="faq-section py-5">
      <div className="container">
        <div className="row align-items-center justify-content-between">

          {/* LEFT SIDE */}
          <div className="col-lg-6 mb-lg-0 mb-5 text-start position-relative">
            <div className="wow-img-container mb-3 faq-image1">
              <img src={faqimage1} alt="FAQ imagem 1" className="img-fluid rounded-4" />
            </div>

            <div className="mt-5 help-box-main">
              <div className="help-box p-4 py-3 rounded-4 d-inline-flex align-items-center gap-3 fs-5">
                <img src={needhelp} alt="Ajuda" />
                Precisa de ajuda? Pergunte!
              </div>
            </div>

            <div className="wow-img-container mt-3 faq-image2">
              <img src={faqimage2} alt="FAQ imagem 2" className="img-fluid rounded-4" />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-6 mt-lg-0">
            <div className="section-title faq-title mt-5 mb-5">
              <h5>FAQ</h5>
              <h1>
                Ver as <span>Perguntas</span> mais frequentes
              </h1>
            </div>

            <div className="accordion accordion-flush" ref={accordionRef}>
              {FAQ_DATA.map((item, index) => (
                <div className="accordion-item bg-dark text-white border-0 mb-2 rounded" key={index}>
                  <div className="accordion-header d-flex align-items-center px-2">
                    <button
                      className={`accordion-button faq-btn ${openIndex === index ? "open" : ""}`}
                      type="button"
                      onClick={() => toggleAccordion(index)}
                    >
                      {item.question}
                      <span className="icon-wrapper ms-auto">
                        {openIndex === index ? <FaMinus /> : <FaPlus />}
                      </span>
                    </button>
                  </div>

                  <div className={`accordion-collapse ${openIndex === index ? "show" : ""}`}>
                    <div className="accordion-body">{item.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Faq;
