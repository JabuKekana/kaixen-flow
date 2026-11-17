import React, { useEffect, useState } from "react";
import "./App.css";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { AboutPage } from "./pages/AboutPage";
import { BookPage } from "./pages/BookPage";
import { ConfirmationPage } from "./pages/ConfirmationPage";
import { EventsPage } from "./pages/EventsPage";
import { GalleryPage } from "./pages/GalleryPage";
import { HomePage } from "./pages/HomePage";
import { useSimpleRouter } from "./hooks/useSimpleRouter";

const pageMap = {
  "/": HomePage,
  "/about": AboutPage,
  "/gallery": GalleryPage,
  "/events": EventsPage,
  "/book": BookPage,
  "/confirmation": ConfirmationPage,
};

function App() {
  const { path, search, navigate } = useSimpleRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [path]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [path]);

  const ActivePage = pageMap[path] || HomePage;

  return (
    <div className={`site-shell${path === "/" ? " site-shell--home" : ""}`}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header
        currentPath={path}
        menuOpen={menuOpen}
        navigate={navigate}
        setMenuOpen={setMenuOpen}
      />
      <main className="page-shell" id="main-content" key={path}>
        <ActivePage currentPath={path} navigate={navigate} search={search} />
      </main>
      <Footer currentPath={path} navigate={navigate} />
    </div>
  );
}

export default App;
