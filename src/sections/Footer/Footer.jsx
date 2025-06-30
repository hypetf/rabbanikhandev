import React from 'react'
import styles from './Footer.module.css'
import logo from '../../assets/logo.svg'
import { useTranslation } from '../../hooks/useTranslation'
import { Link } from 'react-router-dom'

export default function Footer() {
  const { t, language, toggleLanguage } = useTranslation();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.topRow}>
        <div className={styles.line} />
        <div className={styles.logoBlock}>
          <img src={logo} alt="KR Logo" className={styles.logo} />
          <div className={styles.subtitle}>{t('footer.fullStackDeveloper')}</div>
        </div>
        <div className={styles.line} />
      </div>
      <div className={styles.linksRow}>
        <a href="#top" className={styles.link}>{t('footer.backToTop')}</a>
        <a href="/cv.pdf" className={styles.link} target="_blank" rel="noopener noreferrer">{t('footer.downloadCV')}</a>
        <Link to="/privacy" className={styles.link}>{t('footer.privacyPolicy')}</Link>
        <Link to="/privacy" className={styles.link}>{t('footer.cookiesUsage')}</Link>
        {/* <a href="#" className={styles.link}>
          {t('footer.leaveALike')} <span className={styles.heart}>❤️</span>
        </a> */}
        <div className={styles.languageToggle}>
          <button
            className={`${styles.langBtn} ${language === 'en' ? styles.active : ''}`}
            onClick={() => language !== 'en' && toggleLanguage()}
          >
            EN
          </button>
          <span className={styles.langSeparator}>|</span>
          <button
            className={`${styles.langBtn} ${language === 'it' ? styles.active : ''}`}
            onClick={() => language !== 'it' && toggleLanguage()}
          >
            ITA
          </button>
        </div>
      </div>
    </footer>
  )
}
