import React, { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import logo_light from '/logo_light.png'
import { useTranslation } from '../../hooks/useTranslation'

import styles from './Navbar.module.css'

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const lastScrollY = useRef(0);
  const lastHideY = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, language, toggleLanguage } = useTranslation();

  // If not on home, no active section
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const vh = window.innerHeight;

      setScrolled(currentY !== 0);

      if (currentY === 0) {
        setVisible(true);
        lastHideY.current = 0;
      } else if (currentY > vh * 0.5 && currentY > lastScrollY.current) {
        setVisible(false);
        lastHideY.current = currentY;
      } else if (!visible && currentY < lastHideY.current - vh * 0.1) {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visible]);

  // Scroll spy effect to detect active section
  useEffect(() => {
    if (!isHome) {
      setActiveSection(null);
      return;
    }
    const handleScrollSpy = () => {
      const sections = ['about', 'designs', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for navbar height
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScrollSpy);
    handleScrollSpy(); // Check on initial load
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [isHome]);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle nav click: if not on home, navigate to home and scroll after navigation
  const handleNavClick = (sectionId) => (e) => {
    e.preventDefault();
    setMenuOpen(false);
    if (!isHome) {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      scrollToSection(sectionId);
    }
  };

  // Scroll to section if coming from another route
  useEffect(() => {
    if (isHome && window.history.state && window.history.state.usr && window.history.state.usr.scrollTo) {
      const sectionId = window.history.state.usr.scrollTo;
      setTimeout(() => scrollToSection(sectionId), 100);
    }
  }, [isHome]);

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <div
      className={styles.navbar}
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        background: scrolled ? '#0a0a0a80' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
      }}
    >
      {!menuOpen && (
        <div className={styles.navbar_content}>
          <div className={styles.navbar_logo}>
            <a href="/">
              <img src={logo_light} alt="logo" />
            </a>
          </div>
          <div className={styles.navbar_links}>
            <a 
              href="#about" 
              onClick={handleNavClick('about')}
              className={activeSection === 'about' ? styles.active : ''}
            >
              {t('nav.aboutMe')}
            </a>
            <a 
              href="#designs" 
              onClick={handleNavClick('designs')}
              className={activeSection === 'designs' ? styles.active : ''}
            >
              {t('nav.myDesigns')}
            </a>
            <a 
              href="#projects" 
              onClick={handleNavClick('projects')}
              className={activeSection === 'projects' ? styles.active : ''}
            >
              {t('nav.myProjects')}
            </a>
            <a 
              href="#skills" 
              onClick={handleNavClick('skills')}
              className={activeSection === 'skills' ? styles.active : ''}
            >
              {t('nav.mySkills')}
            </a>
            <a 
              href="#contact" 
              onClick={handleNavClick('contact')}
              className={activeSection === 'contact' ? styles.active : ''}
            >
              {t('nav.contactMe')}
            </a>
          </div>
          <button
            className={styles.hamburger}
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      )}
      {menuOpen && (
        <div className={styles.overlay_menu} onClick={() => setMenuOpen(false)}>
          <div className={styles.logo_centered}>
            <a href="/">
              <img src={logo_light} alt="logo" />
            </a>
          </div>
          <button
            className={styles.close_button}
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            &times;
          </button>
          <nav className={styles.overlay_nav} onClick={e => e.stopPropagation()}>
            <a 
              href="#about" 
              onClick={handleNavClick('about')}
              className={activeSection === 'about' ? styles.active : ''}
            >
              {t('nav.aboutMe')}
            </a>
            <a 
              href="#designs" 
              onClick={handleNavClick('designs')}
              className={activeSection === 'designs' ? styles.active : ''}
            >
              {t('nav.myDesigns')}
            </a>
            <a 
              href="#projects" 
              onClick={handleNavClick('projects')}
              className={activeSection === 'projects' ? styles.active : ''}
            >
              {t('nav.myProjects')}
            </a>
            <a 
              href="#skills" 
              onClick={handleNavClick('skills')}
              className={activeSection === 'skills' ? styles.active : ''}
            >
              {t('nav.mySkills')}
            </a>
            <a 
              href="#contact" 
              onClick={handleNavClick('contact')}
              className={activeSection === 'contact' ? styles.active : ''}
            >
              {t('nav.contactMe')}
            </a>
            <div className={styles.mobileLanguageToggle}>
              <button
                className={`${styles.mobileLangBtn} ${language === 'en' ? styles.active : ''}`}
                onClick={() => language !== 'en' && toggleLanguage()}
              >
                EN
              </button>
              <span className={styles.mobileLangSeparator}>|</span>
              <button
                className={`${styles.mobileLangBtn} ${language === 'it' ? styles.active : ''}`}
                onClick={() => language !== 'it' && toggleLanguage()}
              >
                ITA
              </button>
            </div>
            <a 
              href="#" 
              onClick={() => setMenuOpen(false)}
              style={{marginTop: '2rem', fontSize: '1rem', opacity: 0.7}}
            >
              {t('nav.cookieUsage')}
            </a>
            <a 
              href="#" 
              onClick={() => setMenuOpen(false)}
              style={{fontSize: '1rem', opacity: 0.7}}
            >
              {t('nav.privacyPolicy')}
            </a>
          </nav>
        </div>
      )}
    </div>
  )
}
