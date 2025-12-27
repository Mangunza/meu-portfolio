import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./style/blogmodal.sass";

const FALLBACK_IMAGE = "/assets/fallback.png";

/* ================= TRAP FOCUS ================= */
function useTrapFocus(ref, isOpen, onClose) {
  useEffect(() => {
    if (!isOpen || !ref.current) return;

    const focusables = ref.current.querySelectorAll(
      "button, video, [tabindex]:not([tabindex='-1'])"
    );

    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    first.focus();

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [ref, isOpen, onClose]);
}

/* ================= MODAL FILHO ================= */
function ChildModal({ title, children, onClose }) {
  const modalRef = useRef(null);
  useTrapFocus(modalRef, true, onClose);

  return (
    <AnimatePresence>
      <motion.div
        className="child-overlay"
        role="presentation"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          ref={modalRef}
          className="blog-modal small"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-btn" onClick={onClose} aria-label="Fechar" />
          <h2>{title}</h2>
          <div className="modal-content">{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ================= MODAL PRINCIPAL ================= */
function BlogModal({ project, onClose }) {
  if (!project) return null;

  const videoRef = useRef(null);
  const modalRef = useRef(null);

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);

  const {
    title = "",
    description = "",
    technologies = "",
    status = "development",
    image = FALLBACK_IMAGE,
    video = null,
    timeline = { steps: [], currentStep: "" },
  } = project;

  useTrapFocus(modalRef, true, onClose);

  const handlePlay = () => {
    setIsVideoPlaying(true);
    videoRef.current?.play();
  };

  const openDesc = () => {
    setShowTimeline(false);
    setShowDesc(true);
  };

  const openTimeline = () => {
    setShowDesc(false);
    setShowTimeline(true);
  };

  return (
    <>
      {/* MODAL PRINCIPAL */}
      <motion.div
        className="blog-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          ref={modalRef}
          className="blog-modal"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          initial={{ scale: 0.97 }}
          animate={{ scale: 1 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-btn" onClick={onClose} aria-label="Fechar" />

          <span className={`project-status ${status}`}>
            {status.toLowerCase().includes("produção")
              ? "Em Produção"
              : "Em Desenvolvimento"}
          </span>

          {/* MEDIA */}
          <div className="modal-media-container">
            <img src={image} alt={title} className="preview-image" loading="lazy" />

            <div className="media-right">
              {video && !isVideoPlaying && (
                <button className="play-btn" onClick={handlePlay} aria-label="Reproduzir vídeo" />
              )}
              {video && (
                <video ref={videoRef} src={video} className="modal-video" controls />
              )}
            </div>
          </div>

          {/* INFO */}
          <div className="modal-info">
            <h2>{title}</h2>
            <span className="technologies">{technologies}</span>

            <div className="modal-buttons">
              <button onClick={openDesc}>Sobre o projeto</button>
              <button onClick={openTimeline}>Progresso do projeto</button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* MODAL DESCRIÇÃO */}
      {showDesc && (
        <ChildModal title="Sobre o projeto" onClose={() => setShowDesc(false)}>
          <p className="description">{description}</p>
        </ChildModal>
      )}

      {/* MODAL TIMELINE */}
      {showTimeline && (
        <ChildModal title="Progresso do projeto" onClose={() => setShowTimeline(false)}>
          {timeline.steps.length > 0 ? (
            <ul className="timeline-checklist">
              {timeline.steps.map((step) => {
                const isCurrent = step.key === timeline.currentStep.toLowerCase();
                return (
                  <li
                    key={step.key}
                    className={`check-item ${step.completed ? "completed" : ""} ${
                      isCurrent ? "current" : ""
                    }`}
                  >
                    <span className="check-icon">
                      {step.completed ? "✔" : isCurrent ? "➤" : "•"}
                    </span>
                    <strong>{step.title}</strong> - {step.description}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>Nenhum progresso registrado ainda.</p>
          )}
        </ChildModal>
      )}
    </>
  );
}

export default BlogModal;
