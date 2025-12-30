import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Fuse from "fuse.js";
import { Link } from "react-router-dom";

import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import ProjectCard from "./Component/ProjectCard";
import ProjectModal from "./Component/ProjectModal";

import "./Component/Style/projectpage.sass";
import btnArrow from "./../../../assets/about-more-circle.svg";
import { PROJECTS_DATA } from "./projectspage.data";

// By johnnydurao1802@gmail.com
const debounce = (fn, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

const fallbackImage = "/assets/fallback.png";
const fallbackVideo = null;
const sanitizeInput = (str) => str.replace(/<[^>]*>?/gm, "").trim();

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [modalProject, setModalProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const carouselRef = useRef(null);

  const fuse = useMemo(
    () =>
      new Fuse(projects, {
        keys: ["title", "category", "status", "technologies"],
        threshold: 0.35,
        ignoreLocation: true,
        minMatchCharLength: 2,
      }),
    [projects]
  );

  const searchedProjects = useMemo(() => {
    if (!searchTerm || searchTerm.length < 2) return projects;
    try {
      const sanitized = sanitizeInput(searchTerm);
      const results = fuse.search(sanitized).map((r) => r.item);
      return results.length > 0 ? results : [];
    } catch {
      return [];
    }
  }, [searchTerm, fuse, projects]);

  const handleSearch = useCallback(
    debounce((value) => setSearchTerm(sanitizeInput(value)), 300),
    []
  );

  useEffect(() => {
    const loadProjects = async () => {
      try {
        await new Promise((res) => setTimeout(res, 300));
        if (!PROJECTS_DATA || PROJECTS_DATA.length === 0)
          throw new Error("Nenhum projeto disponível.");
        setProjects(PROJECTS_DATA);
        setError("");
      } catch (err) {
        setProjects([]);
        setError(err.message || "Erro ao carregar projetos.");
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const scrollLeft = () =>
    carouselRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  const scrollRight = () =>
    carouselRef.current?.scrollBy({ left: 320, behavior: "smooth" });

  // Carrossel infinito contínuo desktop
  useEffect(() => {
    if (!carouselRef.current) return;
    let req;
    const speed = 0.5;
    const animate = () => {
      const el = carouselRef.current;
      if (!el || isHovering || window.innerWidth < 768) {
        req = requestAnimationFrame(animate);
        return;
      }
      el.scrollLeft += speed;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth) el.scrollLeft = 0;
      req = requestAnimationFrame(animate);
    };
    req = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(req);
  }, [searchedProjects, isHovering]);

  return (
    <>
      <Helmet>
        <title>Projetos | Portfólio Premium</title>
        <meta
          name="description"
          content="Projetos profissionais em desenvolvimento web e mobile."
        />
      </Helmet>

      <Header />

      <section className="projects-page">
        <header className="projects-header">
          <div className="large-section pt-5">
            <div className="container py-5 text-white">
              <div className="row section-head py-5 align-items-center">
                <div className="col-lg-6">
                  <div className="section-title">
                    <h5>Projetos</h5>
                    <h1>
                      Automatizee suas <span>actividades</span>
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
                    <Link to="/contact" className="btn" aria-label="Contato">
                      Contacto
                      <img src={btnArrow} alt="arrow" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="projects-top">
          <input
            className="projects-search"
            type="text"
            placeholder="🔍 Procurar projeto"
            maxLength={50}
            onChange={(e) => handleSearch(e.target.value)}
            aria-label="Procurar projeto"
          />
        </div>

        <div
          className="carousel-wrapper"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <button
            className="nav left"
            onClick={scrollLeft}
            aria-label="Scroll para esquerda"
          >
            ‹
          </button>
          <div className="projects-carousel" ref={carouselRef}>
            <AnimatePresence>
              {loading ? (
                <div className="loader-wrapper">
                  <div className="loader-spinner"></div>
                  <p>Carregando projetos...</p>
                </div>
              ) : error ? (
                <div className="no-projects">⚠️ {error}</div>
              ) : searchedProjects.length === 0 ? (
                <div className="no-projects">🔍 Nenhum projeto encontrado</div>
              ) : (
                searchedProjects.map((project, index) => (
                  <motion.div
                    key={`${project.id}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{ minWidth: "260px", flexShrink: 0 }}
                  >
                    <ProjectCard
                      project={{
                        ...project,
                        image: project.image || fallbackImage,
                        video: project.video || fallbackVideo,
                        brief:
                          !project.image && !project.video ? "Brevemente" : "",
                      }}
                      onClick={() => setModalProject(project)}
                    />
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
          <button
            className="nav right"
            onClick={scrollRight}
            aria-label="Scroll para direita"
          >
            ›
          </button>
        </div>
      </section>

      {modalProject && (
        <ProjectModal
          project={modalProject}
          onClose={() => setModalProject(null)}
        />
      )}
      <Footer />
    </>
  );
};

export default ProjectsPage;
