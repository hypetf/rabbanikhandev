import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import styles from './Hero.module.css';

const Hero = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      // Swap content exactly at the 300ms midpoint when the text is completely faded out
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % 3);
      }, 300);
      
      // Stop the animation cycle after 600ms total runtime
      setTimeout(() => {
        setIsTransitioning(false);
      }, 600);
    }, 6000); // Rotate slides every 6 seconds

    return () => clearInterval(timer);
  }, []);

  const handleScrollClick = (e, targetId) => {
    e.preventDefault();
    const el = document.querySelector(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStatClick = (num) => {
    if (num === 'CV' || num === '简历') {
      window.open('/RabbaniKhan_CV.pdf', '_blank');
    }
  };

  const statNum1 = t(`hero.statNum1_${currentSlide}`);
  const statLabel1 = t(`hero.statLabel1_${currentSlide}`);
  const statNum2 = t(`hero.statNum2_${currentSlide}`);
  const statLabel2 = t(`hero.statLabel2_${currentSlide}`);
  const statNum3 = t(`hero.statNum3_${currentSlide}`);
  const statLabel3 = t(`hero.statLabel3_${currentSlide}`);

  return (
    <section id="hero" className={styles.hero}>
      <div className="container">
        <div className={styles.heroInner}>
          <div>
            <div className={styles.heroLabel}>
              {t('hero.title')}
            </div>
            <h1 className={styles.heroName}>
              <span className={styles.line}>Rabbani</span>
              <span className={`${styles.line} ${styles.outlineText}`}>Khan</span>
            </h1>
            <p className={styles.heroBio}>
              {t('hero.bio')}
            </p>
            <div className={styles.heroActions}>
              <a className={styles.btnPrimary} href="#projects" onClick={(e) => handleScrollClick(e, '#projects')}>
                {t('hero.viewWork')}
              </a>
              <a className={styles.btnGhost} href="#contact" onClick={(e) => handleScrollClick(e, '#contact')}>
                {t('hero.letstalk')}
              </a>
              <a 
                className={`${styles.btnGhost} ${styles.btnGhostCv}`} 
                href="/RabbaniKhan_CV.pdf" 
                target="_blank" 
                rel="noreferrer"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="12" y1="18" x2="12" y2="12"></line>
                  <line x1="9" y1="15" x2="15" y2="15"></line>
                </svg>
                {t('hero.viewCV')}
              </a>
            </div>
          </div>
          <div className={styles.heroRight}>
            {/* Photo card */}
            <div className={styles.heroPhotoCard}>
              <div className={styles.heroPhotoWrap}>
                <img src="/profilepic2.jpg" alt="Rabbani Khan" />
              </div>
              <div className={styles.heroPhotoInfo}>
                <div className={styles.photoInfoName}>Rabbani Khan</div>
                <div className={styles.photoInfoLoc}>
                  Full-Stack Developer · Manchester, UK
                </div>
                <div className={styles.photoCardTags}>
                  <span className={styles.photoTagAvailable}>
                    {t('hero.available')}
                  </span>
                  <span className={styles.photoTagWorldskills}>
                    {t('hero.worldskillsFinalist')}
                  </span>
                  <span className={styles.photoTagStandard}>
                    {t('hero.tagBSc')}
                  </span>
                  <span className={styles.photoTagStandard}>
                    {t('hero.tagFullStack')}
                  </span>
                  <span className={styles.photoTagStandard}>
                    {t('hero.tagUiUx')}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Dynamic Stat Cards with stable containers */}
            <div className={styles.heroStatCard}>
              <div className={styles.heroStatNum}>
                <span className={isTransitioning ? styles.textAnimate : ''}>
                  {statNum1}
                </span>
              </div>
              <div className={styles.heroStatLabel}>
                <span 
                  className={isTransitioning ? styles.textAnimate : ''} 
                  dangerouslySetInnerHTML={{ __html: statLabel1 }}
                ></span>
              </div>
            </div>
            
            <div 
              className={`${styles.heroStatCard} ${(statNum2 === 'CV' || statNum2 === '简历') ? styles.clickableStatCard : ''}`}
              onClick={() => handleStatClick(statNum2)}
            >
              <div className={styles.heroStatNum}>
                <span className={isTransitioning ? styles.textAnimate : ''}>
                  {statNum2}
                  {(statNum2 === 'CV' || statNum2 === '简历') && <span className={styles.statArrow}>↗</span>}
                </span>
              </div>
              <div className={styles.heroStatLabel}>
                <span 
                  className={isTransitioning ? styles.textAnimate : ''} 
                  dangerouslySetInnerHTML={{ __html: statLabel2 }}
                ></span>
              </div>
            </div>
            
            <div className={styles.heroStatCard}>
              <div className={styles.heroStatNum}>
                <span className={isTransitioning ? styles.textAnimate : ''}>
                  {statNum3}
                </span>
              </div>
              <div className={styles.heroStatLabel}>
                <span 
                  className={isTransitioning ? styles.textAnimate : ''} 
                  dangerouslySetInnerHTML={{ __html: statLabel3 }}
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.heroScroll}>
        <span>{t('hero.scroll')}</span>
        <div className={styles.scrollLine}></div>
      </div>
    </section>
  );
};

export default Hero;
