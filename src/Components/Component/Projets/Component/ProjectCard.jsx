import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Style/projectcard.sass";

const ProjectCard = ({ project, onClick, fallbackImage = "/assets/fallback.png" }) => {
  const [imgError, setImgError] = useState(false);
  const [hoverMedia, setHoverMedia] = useState(false);

  const { title, category, status, image, video } = project;

  const statusNormalized = status?.toLowerCase() || "";
  const statusColor = statusNormalized.includes("produção")
    ? "#3b82f6"
    : statusNormalized.includes("desenvolvimento")
    ? "#facc15"
    : "#88C273";

  const statusText = statusNormalized.includes("produção")
    ? "Em Produção"
    : statusNormalized.includes("desenvolvimento")
    ? "Em Desenvolvimento"
    : "Brevemente";

  const hasMedia = !!image || !!video;

  return (
    <motion.article
      className="project-card"
      onClick={hasMedia ? onClick : undefined}
      onMouseEnter={() => setHoverMedia(true)}
      onMouseLeave={() => setHoverMedia(false)}
      whileHover={hasMedia ? { y: -6, scale: 1.02 } : {}}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="media">
        {/* Imagem */}
        {!hoverMedia && image && !imgError && (
          <img
            src={image}
            alt={title}
            onError={() => setImgError(true)}
          />
        )}

        {hoverMedia && video && (
          <video
            src={video}
            muted
            loop
            autoPlay
            playsInline
            preload="metadata"
          />
        )}
        
        {!image && !video && (
          <div className="project-card-brevemente">
            <span>Brevemente</span>
          </div>
        )}

        <span
          className="status-badge"
          style={{ backgroundColor: statusColor }}
        >
          {statusText}
        </span>

        {/* johnnydurao1802@gmail.com */}
        {hasMedia && !hoverMedia && video && <div className="hover-play"></div>}
      </div>

      <div className="info">
        <h3>{title}</h3>
        <span className="category">{category}</span>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
