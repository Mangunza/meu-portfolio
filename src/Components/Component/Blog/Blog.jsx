import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import BlogCard from "./BlogCard";
import BlogModal from "./BlogModal";
import { PROJECTS_DATA } from "./blog.data.js";

import btnArrow from "./../../../assets/about-more-circle.svg";
import "./style/blog.sass";

const FALLBACK_IMAGE = "/assets/fallback.png";
const MAX_PROJECTS_DISPLAY = 8;

function Blog() {
  const [projects, setProjects] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const statusMap = {
    all: "all",
    production: "Em Produção",
    development: "Em Desenvolvimento",
  };

  const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        await new Promise((r) => setTimeout(r, 300));
        if (!PROJECTS_DATA || PROJECTS_DATA.length === 0) {
          throw new Error("Nenhum projeto encontrado");
        }
        setProjects(PROJECTS_DATA);
        setError(null);
      } catch (err) {
        setError("Erro ao carregar projetos");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    let temp =
      filter === "all"
        ? projects
        : projects.filter(
            (p) => p.status.toLowerCase() === statusMap[filter].toLowerCase()
          );

    if (temp.length > MAX_PROJECTS_DISPLAY) {
      temp = shuffleArray(temp).slice(0, MAX_PROJECTS_DISPLAY);
    }

    setFiltered(temp);
  }, [filter, projects]);

  return (
    <section className="blog-section">
      <header className="blog-header">
        <div className="header-flex">
          <div className="section-title">
            <h5>Projetos</h5>

            <h1>
                Problemas em <span>Soluções</span>
            </h1>

            <p>
              Descubra projetos que combinam criatividade, tecnologia e resultados
              reais.
              <strong> Teste, explore e inspire-se!</strong>
            </p>
          </div>

          <div className="btn-1">
            <Link to="/contact">
              Contacto
              <img src={btnArrow} alt="arrow" />
            </Link>
          </div>
        </div>
      </header>

      <div className="filter-buttons">
        {["all", "production", "development"].map((key) => (
          <button
            key={key}
            className={filter === key ? "active" : ""}
            onClick={() => setFilter(key)}
          >
            {key === "all"
              ? "Todos"
              : key === "production"
              ? "Produção"
              : "Desenvolvimento"}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="projects-loader">
          <div className="spinner" />
          Carregando projetos…
        </div>
      ) : error ? (
        <div className="projects-error">{error}</div>
      ) : filtered.length === 0 ? (
        <div className="projects-empty">Nenhum projeto disponível</div>
      ) : (
        <>
          <div className="projects-grid">
            {filtered.map((project, index) => (
              <BlogCard
                key={project.id}
                project={project}
                fallbackImage={FALLBACK_IMAGE}
                onOpen={() => setActiveProject(project)}
                style={{ animationDelay: `${index * 0.15}s` }}
              />
            ))}
          </div>

          {projects.length > MAX_PROJECTS_DISPLAY && (
            <div className="view-more-wrapper">
              <button className="view-more" onClick={() => navigate("/projects")}>
                Ver mais projetos
              </button>
            </div>
          )}
        </>
      )}

      {activeProject && (
        <BlogModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
}

export default Blog;
