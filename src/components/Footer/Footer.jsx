import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import styles from './Footer.module.css';
import logoLight from '../../assets/logo_light.png';

const Footer = () => {
  const { language, setLanguage, t } = useLanguage();

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
    <footer className={styles.footer}>
      <div className={`${styles.footerInner} container`}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <div className={styles.footerLogo}>
              <img src={logoLight} alt="hypetf logo" style={{ height: '38px', display: 'block', marginBottom: '12px' }} />
            </div>
            <div className={styles.footerTagline}>
              {t('footer.tagline')}
              <br />
              <span className={styles.footerTaglineSpan}>
                {t('footer.availableText')}
              </span>
            </div>
          </div>
          <div className={styles.footerNavCols}>
            <div className={styles.footerCol}>
              <div className={styles.footerColTitle}>{t('footer.navigate')}</div>
              <a href="#projects" onClick={(e) => handleNavClick(e, '#projects')}>{t('nav.work')}</a>
              <a href="#about" onClick={(e) => handleNavClick(e, '#about')}>{t('nav.about')}</a>
              <a href="#design" onClick={(e) => handleNavClick(e, '#design')}>{t('nav.design')}</a>
              <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>{t('nav.contact')}</a>
            </div>
            <div className={styles.footerCol}>
              <div className={styles.footerColTitle}>{t('footer.connect')}</div>
              <a href="https://www.linkedin.com/in/rabbanidev/" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://github.com/hypetf" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://www.behance.net/hypetf" target="_blank" rel="noreferrer">Behance</a>
              <a href="https://dribbble.com/hypetf" target="_blank" rel="noreferrer">Dribbble</a>
            </div>
            <div className={styles.footerCol}>
              <div className={styles.footerColTitle}>{t('footer.resources')}</div>
              <a href="/RabbaniKhan_CV.pdf" target="_blank" rel="noreferrer">{t('hero.viewCV')}</a>
              <a 
                href="/privacy" 
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState({}, '', '/privacy');
                  window.dispatchEvent(new Event('popstate'));
                }}
              >
                Privacy Policy
              </a>
              <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')}>{t('footer.backToTop')}</a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <div className={styles.footerCopy}>{t('footer.copyright')}</div>
          <div className={styles.langSwitcher}>
            <button 
              className={`${styles.langBtn} ${language === 'en' ? styles.langBtnActive : ''}`}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
            <span style={{ color: 'var(--c-border-h)' }}>·</span>
            <button 
              className={`${styles.langBtn} ${language === 'it' ? styles.langBtnActive : ''}`}
              onClick={() => setLanguage('it')}
            >
              ITA
            </button>
            <span style={{ color: 'var(--c-border-h)' }}>·</span>
            <button 
              className={`${styles.langBtn} ${language === 'zh' ? styles.langBtnActive : ''}`}
              onClick={() => setLanguage('zh')}
            >
              中文
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
