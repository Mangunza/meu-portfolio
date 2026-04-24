import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import LazyWrapper from "./components/shared/LazyWrapper";
import { lazyLoad } from "./utils/lazyLoader";

/* ================================
   Lazy Imports lacal unico by Durão
  ================================ */
const Home = lazyLoad(() => import("./Components/Pages/Home"));
const Contact = lazyLoad(() =>
  import("./Components/Component/Contact/Contact")
);
const AboutPage = lazyLoad(() =>
  import("./Components/Component/About/Components/AboutPage")
);
const ProjectsPage = lazyLoad(() =>
  import("./Components/Component/Projets/ProjectsPage")
);

function App() {
  const basename = "/meu-portfolio";

  return (
    <HelmetProvider>
      <Router basename={basename}>
        <LazyWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<AboutPage />} />
            <Route path="/project" element={<ProjectsPage />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </LazyWrapper>
      </Router>
    </HelmetProvider>
  );
}

export default App;