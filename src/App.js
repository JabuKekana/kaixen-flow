import React, { useEffect, useState } from 'react';
import './App.css';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { AboutPage } from './pages/AboutPage';
import { BookPage } from './pages/BookPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { EventsPage } from './pages/EventsPage';
import { GalleryPage } from './pages/GalleryPage';
import { HomePage } from './pages/HomePage';
import { useSimpleRouter } from './hooks/useSimpleRouter';

const pageMap = {
  '/': HomePage,
  '/about': AboutPage,
  '/gallery': GalleryPage,
  '/events': EventsPage,
  '/book': BookPage,
  '/confirmation': ConfirmationPage,
};

function App() {
  const { path, search, navigate } = useSimpleRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [path]);

  const ActivePage = pageMap[path] || HomePage;

  return (
    <div className="site-shell">
      <div className="ambient ambient--one" />
      <div className="ambient ambient--two" />
      <Header
        currentPath={path}
        menuOpen={menuOpen}
        navigate={navigate}
        setMenuOpen={setMenuOpen}
      />
      <main className="page-shell">
        <ActivePage currentPath={path} navigate={navigate} search={search} />
      </main>
      <Footer currentPath={path} navigate={navigate} />
    </div>
  );
}

export default App;
