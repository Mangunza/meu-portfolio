import React, { useState } from "react";
import { FaLinkedin, FaGithub, FaDiscord } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./header.sass";

const Header = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);
  const close = () => setOpen(false);

  return (
    <>
      {/* johnnydurao1802@gmail.com */}
      <div className={`overlay ${open ? "active" : ""}`} onClick={close}></div>

      <header id="header">
        <div className="container">
          <div className="logo">
            JM <span>tech</span>
          </div>

          <div className={`hamburger ${open ? "active" : ""}`} onClick={toggle}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <nav className={`nav-menu ${open ? "open" : ""}`}>
            <ul>
              <li onClick={close}>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  Inicial
                </NavLink>
              </li>

              <li onClick={close}>
                <NavLink
                  to="/portfolio"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  Portfólio
                </NavLink>
              </li>

              <li onClick={close}>
                <NavLink
                  to="/project"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  Projectos
                </NavLink>
              </li>

              <li onClick={close}>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  Contactos
                </NavLink>
              </li>
            </ul>

            <div className="socials">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <FaLinkedin />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer">
                <FaGithub />
              </a>
              <a href="https://discord.com" target="_blank" rel="noreferrer">
                <FaDiscord />
              </a>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
