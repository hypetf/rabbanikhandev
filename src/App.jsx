import React, { useEffect, useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Blobs from './components/Blobs/Blobs';
import Cursor from './components/Cursor/Cursor';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Projects from './components/Projects/Projects';
import About from './components/About/About';
import Design from './components/Design/Design';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Privacy from './components/Privacy/Privacy';
import SiteNotice from './components/SiteNotice/SiteNotice';
import './index.css';

const AppContent = () => {
  const { loading, language } = useLanguage();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  useEffect(() => {
    if (loading) return;

    // Small timeout to ensure the DOM is fully painted
    const timer = setTimeout(() => {
      const reveals = document.querySelectorAll('.reveal');
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08 }
      );

      reveals.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }, 150);

    return () => clearTimeout(timer);
  }, [loading, language, currentPath]);

  if (loading) {
    return (
      <div 
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#090b10',
          color: '#6ee7f7',
          fontFamily: "'Outfit', sans-serif",
          fontSize: '0.8rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          gap: '12px'
        }}
      >
        <span style={{ opacity: 0.8 }}>Detecting Locale</span>
        <div 
          style={{
            width: '24px',
            height: '2px',
            background: 'linear-gradient(90deg, #6ee7f7, #a78bfa)',
            animation: 'pulse 1.5s ease-in-out infinite'
          }}
        ></div>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.3; transform: scaleX(0.8); }
            50% { opacity: 1; transform: scaleX(1.3); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <Blobs />
      <Cursor />
      <Navbar />
      {currentPath === '/privacy' ? (
        <Privacy />
      ) : (
        <main>
          <Hero />
          <Projects />
          <About />
          <Design />
          <Contact />
        </main>
      )}
      <SiteNotice />
      <Footer />
    </>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
