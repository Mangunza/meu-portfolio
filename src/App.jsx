// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Home from "./Components/Pages/Home";
import Contact from "./Components/Component/Contact/Contact";
import AboutPage from "./Components/Component/About/Components/AboutPage";
import ProjectsPage from "./Components/Component/Projets/ProjectsPage";

function App() {
  const basename = "/meu-portfolio";

  return (
    <HelmetProvider>
      <Router basename={basename}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<AboutPage />} />
          <Route path="/project" element={<ProjectsPage />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
