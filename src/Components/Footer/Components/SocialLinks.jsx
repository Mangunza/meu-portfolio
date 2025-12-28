import React from "react";
import { FaLinkedinIn, FaGithub, FaDiscord } from "react-icons/fa";

const SocialLinks = ({ showModal }) => {
  const handleDownloadCV = () => {
    // Detecta se o usuário está em dispositivo mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // Mobile: abre o PDF em nova aba para o usuário salvar manualmente
      window.open("/Curriculum-Johnny-Mangunza.pdf", "_blank");
      showModal(
        "Abra o PDF no navegador e use 'Salvar em Arquivos' para baixar ✅",
        "info"
      );
    } else {
      // Desktop: baixa automaticamente
      const link = document.createElement("a");
      link.href = "/Curriculum-Johnny-Mangunza.pdf";
      link.download = "Curriculum-Johnny-Mangunza.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showModal("CV baixado com sucesso! ✅", "success");
    }
  };

  return (
    <div className="social-links">
      <h3>Redes Sociais</h3>
      <div className="social-icons gap-4 mt-3">
        <a
          href="https://www.linkedin.com/in/johnny-mangunza-828b0a1b1/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedinIn />
        </a>
        <a
          href="https://github.com/Mangunza"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>
        <a
          href="https://discord.com/users/1021918036950794353"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaDiscord />
        </a>
      </div>
      <button onClick={handleDownloadCV} className="btn-cv mt-4">
        Download CV
      </button>
    </div>
  );
};

export default SocialLinks;
