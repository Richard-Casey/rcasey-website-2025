import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import CVPage from "./pages/CV";
import FooterSection from "./components/FooterSection";

import Home from "./pages/Home";
import About from "./pages/About";

export default function App() {
  return (
    <div className="min-h-screen bg-brand-black text-brand-text">
      <Navbar />
      <main className="p-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/cv" element={<CVPage />} />
        </Routes>
      </main>
      <FooterSection />
    </div>
  );
}
