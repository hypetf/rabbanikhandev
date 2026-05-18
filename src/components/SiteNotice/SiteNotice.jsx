import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import styles from './SiteNotice.module.css';

const SiteNotice = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Search the browser document.cookie for our specific consent flag
    const hasConsent = document.cookie.split('; ').find(row => row.startsWith('siteConsent='));
    if (!hasConsent) {
      // Delay the popup slightly so it slides in elegantly after the initial page load animations
      const timer = setTimeout(() => setIsVisible(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    // Set the cookie to strictly expire after 1 year (365 days * 24 hours * 60 mins * 60 secs)
    document.cookie = "siteConsent=true; max-age=31536000; path=/";
    setIsClosing(true); // Trigger the CSS exit animation
    
    // Completely unmount the component from the DOM after the animation completes
    setTimeout(() => setIsVisible(false), 500);
  };

  if (!isVisible) return null;

  return (
    <div className={`${styles.noticeWrapper} ${isClosing ? styles.closing : ''}`}>
      <div className={styles.noticeContent}>
        <div className={styles.noticeIcon}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
            <path d="M8.5 8.5v.01"></path>
            <path d="M16 12.5v.01"></path>
            <path d="M12 16v.01"></path>
            <path d="M11 12v.01"></path>
            <path d="M15 8v.01"></path>
          </svg>
        </div>
        <p className={styles.noticeText}>
          {t('cookies.message')}
        </p>
      </div>
      <button className={styles.noticeBtn} onClick={handleAccept}>
        {t('cookies.accept')}
      </button>
    </div>
  );
};

export default SiteNotice;
