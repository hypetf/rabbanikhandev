import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import styles from './Navbar.module.css';
import logoLight from '../../assets/logo_light.png';

const Navbar = () => {
  const { t } = useLanguage();
  const [isShrunk, setIsShrunk] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsShrunk(true);
      } else {
        setIsShrunk(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new Event('popstate'));
      
      setTimeout(() => {
        const el = document.querySelector(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.querySelector(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`${styles.nav} ${isShrunk ? styles.shrunk : ''}`}>
        <a className={styles.navLogo} href="#hero" onClick={(e) => { handleNavClick(e, '#hero'); setIsMobileMenuOpen(false); }}>
          <img src={logoLight} alt="hypetf logo" style={{ height: '42px', display: 'block' }} />
        </a>
        <ul className={styles.navLinks}>
          <li>
            <a href="#projects" onClick={(e) => handleNavClick(e, '#projects')}>{t('nav.work')}</a>
          </li>
          <li>
            <a href="#about" onClick={(e) => handleNavClick(e, '#about')}>{t('nav.about')}</a>
          </li>
          <li>
            <a href="#design" onClick={(e) => handleNavClick(e, '#design')}>{t('nav.design')}</a>
          </li>
          <li>
            <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>{t('nav.contact')}</a>
          </li>
        </ul>
        <a className={styles.navCta} href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>
          {t('nav.hireMe')}
        </a>

        {/* Mobile Toggle Button */}
        <button 
          className={styles.mobileToggle} 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span className={`${styles.burgerLine} ${isMobileMenuOpen ? styles.open : ''}`}></span>
          <span className={`${styles.burgerLine} ${isMobileMenuOpen ? styles.open : ''}`}></span>
          <span className={`${styles.burgerLine} ${isMobileMenuOpen ? styles.open : ''}`}></span>
        </button>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div 
        className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <ul className={styles.mobileNavLinks} onClick={(e) => e.stopPropagation()}>
          <li>
            <a href="#projects" onClick={(e) => { handleNavClick(e, '#projects'); setIsMobileMenuOpen(false); }}>
              {t('nav.work')}
            </a>
          </li>
          <li>
            <a href="#about" onClick={(e) => { handleNavClick(e, '#about'); setIsMobileMenuOpen(false); }}>
              {t('nav.about')}
            </a>
          </li>
          <li>
            <a href="#design" onClick={(e) => { handleNavClick(e, '#design'); setIsMobileMenuOpen(false); }}>
              {t('nav.design')}
            </a>
          </li>
          <li>
            <a href="#contact" onClick={(e) => { handleNavClick(e, '#contact'); setIsMobileMenuOpen(false); }}>
              {t('nav.contact')}
            </a>
          </li>
        </ul>
        <a 
          className={styles.mobileCta} 
          href="#contact" 
          onClick={(e) => { handleNavClick(e, '#contact'); setIsMobileMenuOpen(false); }}
        >
          {t('nav.hireMe')}
        </a>
      </div>
    </>
  );
};

export default Navbar;
