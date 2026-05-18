import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import styles from './Projects.module.css';
import novaDentalImg from '../../assets/projects/nova-dental.png';
import apexproxyImg from '../../assets/projects/apexproxy.png';
import viaromaImg from '../../assets/projects/viaroma.png';
import aerocloudOgImg from '../../assets/projects/aerocloud-og.png';
import aerocloudNewImg from '../../assets/projects/aerocloud-new.png';

const Projects = () => {
  const { t } = useLanguage();
  const [modalImage, setModalImage] = useState(null);
  const [modalTitle, setModalTitle] = useState('');

  const openModal = (imgSrc, title) => {
    setModalImage(imgSrc);
    setModalTitle(title);
  };

  const closeModal = () => {
    setModalImage(null);
    setModalTitle('');
  };

  return (
    <section id="projects" className={styles.projectsSection}>
      <div className="container">
        <div className="section-head reveal">
          <span className="section-label">{t('projects.sectionLabel')}</span>
          <h2 className="section-title">
            {t('projects.sectionTitleLine1')}<br />{t('projects.sectionTitleLine2')}
          </h2>
          <p className="section-desc">
            {t('projects.sectionDesc')}
          </p>
        </div>

        <div className={styles.projectsGrid}>
          
          {/* FEATURED: Nova Dental */}
          <div className={`${styles.projCard} ${styles.large} reveal`}>
            <div className={styles.projFeatured}>Featured</div>
            <div className={`${styles.projImgPlaceholder} ${styles.placeholderNovaDental}`} style={{ padding: 0, cursor: 'pointer' }}>
              <img 
                className={styles.projImg} 
                src={novaDentalImg} 
                alt="NovaDental Private Practice website screenshot" 
                onClick={() => openModal(novaDentalImg, "NovaDental — Private Practice Website")}
              />
            </div>
            <div className={styles.projBody}>
              <div className={styles.projTags}>
                <span className={`${styles.projTag} ${styles.accent}`}>{t('projects.tagClient')}</span>
                <span className={styles.projTag}>{t('projects.tagUiUx')}</span>
                <span className={styles.projTag}>Next.js</span>
                <span className={styles.projTag}>{t('projects.tagResponsive')}</span>
              </div>
              <div className={styles.projTitle}>
                {t('projects.novaDental.title')}
              </div>
              <p className={styles.projDesc}>
                {t('projects.novaDental.desc')}
              </p>
              <div className={styles.projOutcome}>
                {t('projects.novaDental.outcome')}
              </div>
              <div className={styles.projLinks}>
                <a className={`${styles.projLink} ${styles.primary}`} href="https://5313c80e.novadental-6w2.pages.dev/" target="_blank" rel="noreferrer">
                  {t('projects.liveSite')}
                </a>
              </div>
            </div>
          </div>

          {/* ApexProxy */}
          <div className={`${styles.projCard} ${styles.medium} reveal reveal-delay-1`}>
            <div className={`${styles.projImgPlaceholder} ${styles.placeholderApexProxy}`} style={{ padding: 0, cursor: 'pointer' }}>
              <img 
                className={styles.projImg} 
                src={apexproxyImg} 
                alt="ApexProxy rotating mobile proxies dashboard screenshot" 
                onClick={() => openModal(apexproxyImg, "ApexProxy — Mobile Proxy SaaS Dashboard")}
              />
            </div>
            <div className={styles.projBody}>
              <div className={styles.projTags}>
                <span className={`${styles.projTag} ${styles.accent}`}>{t('projects.tagPersonal')}</span>
                <span className={styles.projTag}>{t('projects.tagSaaS')}</span>
                <span className={styles.projTag}>React</span>
              </div>
              <div className={styles.projTitle}>
                {t('projects.apexProxy.title')}
              </div>
              <p className={styles.projDesc}>
                {t('projects.apexProxy.desc')}
              </p>
              <div className={styles.projOutcome}>
                {t('projects.apexProxy.outcome')}
              </div>
              <div className={styles.projLinks}>
                <a className={`${styles.projLink} ${styles.primary}`} href="https://apexproxy.tech/" target="_blank" rel="noreferrer">
                  {t('projects.live')}
                </a>
              </div>
            </div>
          </div>

          {/* BlackjackIQ */}
          <div className={`${styles.projCard} ${styles.half} reveal reveal-delay-1`}>
            <div className={`${styles.projImgPlaceholder} ${styles.placeholderBlackjackIQ}`}>
              <span className={styles.titleBlackjackIQ}>
                BlackjackIQ<br />
                <span className={styles.tagBlackjackIQ}>
                  {t('projects.inDevelopment')}
                </span>
              </span>
            </div>
            <div className={styles.projBody}>
              <div className={styles.projTags}>
                <span className={`${styles.projTag} ${styles.accent}`}>{t('projects.tagAiMl')}</span>
                <span className={styles.projTag}>{t('projects.tagBrowserExt')}</span>
              </div>
              <div className={styles.projTitle}>
                {t('projects.blackjackIQ.title')}
              </div>
              <p className={styles.projDesc}>
                {t('projects.blackjackIQ.desc')}
              </p>
              <div className={styles.projOutcome}>
                {t('projects.blackjackIQ.outcome')}
              </div>
              <div className={styles.projLinks}>
                <span className={styles.projLink} style={{ opacity: 0.5, cursor: 'default' }}>
                  {t('projects.comingSoon')}
                </span>
              </div>
            </div>
          </div>

          {/* Via Roma Verona */}
          <div className={`${styles.projCard} ${styles.half} reveal reveal-delay-2`}>
            <div className={`${styles.projImgPlaceholder} ${styles.placeholderViaroma}`} style={{ padding: 0, cursor: 'pointer' }}>
              <img 
                className={styles.projImg} 
                src={viaromaImg} 
                alt="Via Roma 12 holiday accommodation in Verona screenshot" 
                onClick={() => openModal(viaromaImg, "Via Roma 12 — Verona Holiday Rental")}
              />
            </div>
            <div className={styles.projBody}>
              <div className={styles.projTags}>
                <span className={`${styles.projTag} ${styles.accent}`}>{t('projects.tagClient')}</span>
                <span className={styles.projTag}>{t('projects.tagHospitality')}</span>
                <span className={styles.projTag}>HTML/CSS/JS</span>
              </div>
              <div className={styles.projTitle}>
                {t('projects.viaroma.title')}
              </div>
              <p className={styles.projDesc}>
                {t('projects.viaroma.desc')}
              </p>
              <div className={styles.projOutcome}>
                {t('projects.viaroma.outcome')}
              </div>
              <div className={styles.projLinks}>
                <a className={`${styles.projLink} ${styles.primary}`} href="https://viaroma12verona.it/" target="_blank" rel="noreferrer">
                  {t('projects.live')}
                </a>
              </div>
            </div>
          </div>

          {/* Ded Daniela */}
          <div className={`${styles.projCard} ${styles.medium} reveal reveal-delay-1`}>
            <div className={`${styles.projImgPlaceholder} ${styles.placeholderDedDaniela}`}>
              <span className={styles.titleDedDaniela}>
                Ded Daniela<br />Dalfini<br />
                <span className={styles.tagDedDaniela}>
                  {t('projects.inDevelopment')}
                </span>
              </span>
            </div>
            <div className={styles.projBody}>
              <div className={styles.projTags}>
                <span className={`${styles.projTag} ${styles.accent}`}>{t('projects.tagClient')}</span>
                <span className={styles.projTag}>{t('projects.tagECommerce')}</span>
                <span className={styles.projTag}>Shopify</span>
              </div>
              <div className={styles.projTitle}>
                {t('projects.dedDaniela.title')}
              </div>
              <p className={styles.projDesc}>
                {t('projects.dedDaniela.desc')}
              </p>
              <div className={styles.projLinks}>
                <a className={styles.projLink} href="https://deddanieladalfini.it/" target="_blank" rel="noreferrer">
                  {t('projects.preview')}
                </a>
              </div>
            </div>
          </div>

          {/* 24 Immobiliare */}
          <div className={`${styles.projCard} ${styles.large} reveal reveal-delay-2`}>
            <div className={`${styles.projImgPlaceholder} ${styles.placeholderImmobiliare}`}>
              <span className={styles.titleImmobiliare}>24Immobiliare</span>
              <span className={styles.tagImmobiliare}>
                {t('projects.immobiliare.tag')}
              </span>
            </div>
            <div className={styles.projBody}>
              <div className={styles.projTags}>
                <span className={`${styles.projTag} ${styles.accent}`}>{t('projects.tagClient')}</span>
                <span className={styles.projTag}>{t('projects.tagRealEstate')}</span>
                <span className={styles.projTag}>{t('projects.tagRedesign')}</span>
                <span className={styles.projTag}>{t('projects.tagBeforeAfter')}</span>
              </div>
              <div className={styles.projTitle}>
                {t('projects.immobiliare.title')}
              </div>
              <p className={styles.projDesc}>
                {t('projects.immobiliare.desc')}
              </p>
              <div className={styles.projOutcome}>
                {t('projects.immobiliare.outcome')}
              </div>
              <div className={styles.projLinks}>
                <a className={styles.projLink} href="https://www.24immobiliare.it/" target="_blank" rel="noreferrer">
                  {t('projects.original')}
                </a>
                <span className={styles.projLink} style={{ opacity: 0.5, cursor: 'default' }}>
                  {t('projects.redesignComingSoon')}
                </span>
              </div>
            </div>
          </div>

          {/* AeroCloud Case Study */}
          <div className={`${styles.projCard} ${styles.caseStudyCard} reveal`}>
            <span className={styles.caseLabel}>
              {t('projects.caseStudy.label')}
            </span>
            <div className={styles.caseStudyInner}>
              <div>
                <div className={styles.projTags} style={{ marginBottom: '16px' }}>
                  <span className={`${styles.projTag} ${styles.accent}`}>{t('projects.tagClient')}</span>
                  <span className={styles.projTag}>{t('projects.tagUiUx')}</span>
                  <span className={styles.projTag}>React</span>
                  <span className={styles.projTag}>Figma</span>
                </div>
                <h3 className={styles.caseTitle}>
                  {t('projects.caseStudy.title')}
                </h3>
                <p className={styles.caseDesc}>
                  {t('projects.caseStudy.desc')}
                </p>
                <div className={styles.caseMetrics}>
                  <div>
                    <div className={styles.caseMetricNum}>
                      {t('projects.caseStudy.metricB2BTitle')}
                    </div>
                    <div className={styles.caseMetricLabel} dangerouslySetInnerHTML={{ __html: t('projects.caseStudy.metricB2BDesc') }}></div>
                  </div>
                  <div>
                    <div className={styles.caseMetricNum}>
                      {t('projects.caseStudy.metricVisualTitle')}
                    </div>
                    <div className={styles.caseMetricLabel} dangerouslySetInnerHTML={{ __html: t('projects.caseStudy.metricVisualDesc') }}></div>
                  </div>
                  <div>
                    <div className={styles.caseMetricNum}>
                      {t('projects.caseStudy.metricDesignTitle')}
                    </div>
                    <div className={styles.caseMetricLabel} dangerouslySetInnerHTML={{ __html: t('projects.caseStudy.metricDesignDesc') }}></div>
                  </div>
                </div>
                <div className={styles.projLinks}>
                  <a className={styles.projLink} href="https://aerocloudsystems.com/" target="_blank" rel="noreferrer">
                    {t('projects.caseStudy.originalLink')}
                  </a>
                  <a className={`${styles.projLink} ${styles.primary}`} href="https://aerocloud-redesign.rabbanikhandev.workers.dev/" target="_blank" rel="noreferrer">
                    {t('projects.caseStudy.myRedesignLink')}
                  </a>
                </div>
              </div>
              <div className={styles.caseStudyScreens}>
                <div className={`${styles.csScreen} ${styles.csScreenSpan2}`} style={{ height: '240px', padding: 0, overflow: 'hidden', cursor: 'pointer' }}>
                  <img 
                    className={styles.projImg} 
                    src={aerocloudNewImg} 
                    alt={t('projects.caseStudy.myRedesign')} 
                    onClick={() => openModal(aerocloudNewImg, "AeroCloud Systems — Redesign Mockup")}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '0.65rem', color: 'var(--c-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                    {t('projects.caseStudy.originalSite')}
                  </span>
                  <img 
                    className={styles.csScreen} 
                    src={aerocloudOgImg} 
                    alt={t('projects.caseStudy.originalSite')} 
                    onClick={() => openModal(aerocloudOgImg, "AeroCloud Systems — Original Website")}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '0.65rem', color: 'var(--c-accent)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                    {t('projects.caseStudy.myRedesign')}
                  </span>
                  <img 
                    className={styles.csScreen} 
                    src={aerocloudNewImg} 
                    alt={t('projects.caseStudy.myRedesign')} 
                    onClick={() => openModal(aerocloudNewImg, "AeroCloud Systems — Redesign Website")}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Dynamic Lightbox Modal */}
        {modalImage && (
          <div className={styles.modalOverlay} onClick={closeModal}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <button className={styles.modalClose} onClick={closeModal} aria-label="Close modal">
                &times;
              </button>
              <img className={styles.modalImg} src={modalImage} alt={modalTitle} onClick={closeModal} style={{ cursor: 'zoom-out' }} />
              {modalTitle && <div className={styles.modalCaption}>{modalTitle}</div>}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
