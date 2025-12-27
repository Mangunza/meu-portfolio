import React, { useState } from "react";
import "./style/blogcard.sass";

function BlogCard({ project, onOpen, fallbackImage }) {
  const [imgError, setImgError] = useState(false);
  const [hoverVideo, setHoverVideo] = useState(false);

  const statusNormalized = project.status?.toLowerCase();
  const statusColor = statusNormalized.includes("produção")
    ? "#3b82f6" // azul
    : statusNormalized.includes("desenvolvimento")
    ? "#facc15" // amarelo
    : "#88C273"; // neon

  const statusText = statusNormalized.includes("produção")
    ? "Em Produção"
    : statusNormalized.includes("desenvolvimento")
    ? "Em Desenvolvimento"
    : "Em Desenvolvimento";

  const hasMedia = project.image || project.video;

  return (
    <article
      className="blog-card"
      onClick={hasMedia ? onOpen : undefined}
      onMouseEnter={() => setHoverVideo(true)}
      onMouseLeave={() => setHoverVideo(false)}
    >
      <div className="media">
        {hasMedia ? (
          <>
            {!imgError && !hoverVideo && (
              <img
                src={project.image || fallbackImage}
                alt={project.title}
                onError={() => setImgError(true)}
              />
            )}
            {hoverVideo && project.video && (
              <video
                src={project.video}
                muted
                loop
                autoPlay
                playsInline
                preload="metadata"
                className="card-video"
              />
            )}

            {project.video && !hoverVideo && <div className="hover-play">▶</div>}
          </>
        ) : (
          <div className="blog-card-brevemente">
            <span>Brevemente</span>
          </div>
        )}

        <span className="status" style={{ backgroundColor: statusColor }}>
          {statusText}
        </span>
      </div>

      <div className="info">
        <h3>{project.title}</h3>
        <p>{project.technologies}</p>
      </div>
    </article>
  );
}

export default BlogCard;
