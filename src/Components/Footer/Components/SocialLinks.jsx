import React from "react";
import { FaLinkedinIn, FaGithub, FaDiscord } from "react-icons/fa";

const SocialLinks = ({ showModal }) => {
  const CV_URL = `${import.meta.env.BASE_URL}Curriculum-Johnny-Mangunza.pdf`;

  const handleDownloadCV = () => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      window.open(CV_URL, "_blank");
      showModal(
        "O CV foi aberto. Use o menu do navegador para Guardar / Transferir 📄",
        "info"
      );
      return;
    }

    const link = document.createElement("a");
    link.href = CV_URL;
    link.setAttribute("download", "Curriculum-Johnny-Mangunza.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showModal("CV baixado com sucesso! ", "success");
  };

  return (
    <div className="social-links">
      <h3>Redes Sociais</h3>

      <div className="social-icons">
        <a href="https://www.linkedin.com/in/johnny-mangunza-828b0a1b1/" target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn />
        </a>
        <a href="https://github.com/Mangunza" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
        <a href="https://discord.com/users/1021918036950794353" target="_blank" rel="noopener noreferrer">
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
