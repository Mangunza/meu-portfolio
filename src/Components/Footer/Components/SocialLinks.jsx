import React from "react";
import { FaLinkedinIn, FaGithub, FaDiscord } from "react-icons/fa";

const SocialLinks = ({ showModal }) => {
  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/Curriculum-Johnny-Mangunza.pdf";
    link.download = "Curriculum-Johnny-Mangunza.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showModal("CV baixado com sucesso! ✅","success");
  };

  return (
    <>
      <h3>Redes Sociais</h3>
      <div className="social-icons gap-4 mt-3">
        <a href="https://www.linkedin.com/in/johnny-mangunza-828b0a1b1/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
        <a href="https://github.com/Mangunza" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
        <a href="https://discord.com/users/1021918036950794353" target="_blank" rel="noopener noreferrer"><FaDiscord /></a>
      </div>
      <button onClick={handleDownloadCV} className="btn-cv mt-4">Download CV</button>
    </>
  );
};

export default SocialLinks;
