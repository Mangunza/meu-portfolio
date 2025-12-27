import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";

import BlogCard from "./BlogCard";
import BlogModal from "./BlogModal";
import { PROJECTS_DATA } from "./blog.data.js";

import btnArrow from "./../../../assets/btn-arrow.svg";
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
    // Simula fetch
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
        console.error(err);
        setError("Erro ao carregar projetos");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Filtro toggle
  useEffect(() => {
    let temp =
      filter === "all"
        ? projects
        : projects.filter((p) =>
            p.status.toLowerCase().includes(statusMap[filter].toLowerCase())
          );

    if (temp.length > MAX_PROJECTS_DISPLAY) {
      temp = shuffleArray(temp).slice(0, MAX_PROJECTS_DISPLAY);
    }

    setFiltered(temp);
  }, [filter, projects]);

  const handleViewMore = () => navigate("/projects", "/contact");

  const handleFilterClick = (key) => {
    setFilter((prev) => (prev === key ? "all" : key));
  };

  return (
    <section className="blog-section">
      <Helmet>
        <title>Projetos | Johnny Durão</title>
        <meta
          name="description"
          content="Portfólio profissional de projetos web e sistemas desenvolvidos com foco em qualidade e escalabilidade."
        />
      </Helmet>

      <header className="blog-header">
        <div className="large-section test-section position-relative pt-5">
          <div className="container py-5 text-white">
            <div className="row section-head py-5 align-items-center">
              <div className="col-lg-6">
                <div className="section-title">
                  <h5>Projetos</h5>
                  <h1>
                    Soluções que <span>encantam clientes</span>
                  </h1>
                  <p className="lead">
                    Descubra projetos que combinam criatividade, tecnologia e
                    resultados reais.
                    <strong> Teste, explore e inspire-se!</strong>
                  </p>
                </div>
              </div>

              <div className="col-lg-6 d-flex justify-content-end align-items-end">
                <div className="btn-1">
                  <Link to="/contact" className="btn-1">
                    Contacto
                    <img src={btnArrow} alt="arrow" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Filtros */}
      <div className="filter-buttons">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => handleFilterClick("all")}
        >
          Todos
        </button>
        <button
          className={filter === "production" ? "active" : ""}
          onClick={() => handleFilterClick("production")}
        >
          Produção
        </button>
        <button
          className={filter === "development" ? "active" : ""}
          onClick={() => handleFilterClick("development")}
        >
          Desenvolvimento
        </button>
      </div>

      {loading ? (
        <div className="projects-loader">
          <div className="spinner"></div>
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
            <div className="view-more-wrapper mt-5">
              <button className="view-more" onClick={handleViewMore}>
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
