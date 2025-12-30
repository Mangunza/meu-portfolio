import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Style/projectmodal.sass";

const FALLBACK_IMAGE = "/assets/fallback.png";

// BY  johnnydurao1802@gmail.com
function useTrapFocus(ref, isOpen, onClose) {
  useEffect(() => {
    if (!isOpen || !ref.current) return;
    const focusables = Array.from(
      ref.current.querySelectorAll(
        "button, video, [tabindex]:not([tabindex='-1'])"
      )
    ).filter((el) => !el.disabled && el.offsetParent !== null);

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

function ChildModal({ title, children, onClose }) {
  const modalRef = useRef(null);
  useTrapFocus(modalRef, !!title, onClose);

  return (
    <AnimatePresence>
      <motion.div
        className="child-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          ref={modalRef}
          className="child-modal"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.25 },
          }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-btn" onClick={onClose} />
          <h2>{title}</h2>
          <div className="modal-content">{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// by johnnydurao180215@gmail.com
function ProjectModal({ project, onClose }) {
  if (!project) return null;

  const modalRef = useRef(null);
  const videoRef = useRef(null);

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);

  const {
    title,
    description,
    technologies,
    status,
    image,
    video,
    timeline = {},
  } = project;

  const steps = timeline?.steps || [];
  const currentStepKey = timeline?.currentStep || "";

  const hasMedia = image || video;
  useTrapFocus(modalRef, !!project, onClose);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  useEffect(() => {
    if (isVideoPlaying && videoRef.current)
      videoRef.current.play().catch(() => {});
  }, [isVideoPlaying]);

  const handlePlay = () => setIsVideoPlaying(true);
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
      <AnimatePresence>
        <motion.div
          className="project-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            ref={modalRef}
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ scale: 0.97 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={onClose} />

            {status && hasMedia && (
              <span className={`project-status ${status.toLowerCase()}`}>
                {status}
              </span>
            )}

            {!hasMedia ? (
              <div className="coming-soon">Brevemente</div>
            ) : (
              <div className="modal-media-container">
                {image && (
                  <img
                    src={image || FALLBACK_IMAGE}
                    alt={title}
                    className="project-image"
                  />
                )}
                <div className="media-right">
                  {video && !isVideoPlaying && (
                    <button className="play-btn" onClick={handlePlay} />
                  )}
                  {video && (
                    <video
                      ref={videoRef}
                      src={video}
                      className="modal-video"
                      controls
                      autoPlay={isVideoPlaying}
                      muted
                      playsInline
                      preload="metadata"
                    />
                  )}
                </div>
              </div>
            )}

            <div className="modal-info">
              <h2>{title}</h2>
              {technologies && (
                <span className="technologies">{technologies}</span>
              )}
              {hasMedia && (
                <div className="modal-buttons">
                  <button onClick={openDesc}>Sobre o projeto</button>
                  <button onClick={openTimeline}>Progresso do projeto</button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {showDesc && (
        <ChildModal title="Sobre o projeto" onClose={() => setShowDesc(false)}>
          <p>{description}</p>
        </ChildModal>
      )}

      {showTimeline && (
        <ChildModal
          title="Progresso do projeto"
          onClose={() => setShowTimeline(false)}
        >
          {steps.length > 0 ? (
            <ul className="timeline-vertical">
              {steps.map((item, idx) => (
                <li
                  key={idx}
                  className={`timeline-item ${item.completed ? "done" : ""} ${
                    item.key === currentStepKey ? "current" : ""
                  }`}
                >
                  <span className="dot" />
                  <span className="text">{item.title}</span>
                  {item.description && (
                    <span className="description">{item.description}</span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum progresso registrado ainda.</p>
          )}
        </ChildModal>
      )}
    </>
  );
}

export default ProjectModal;
