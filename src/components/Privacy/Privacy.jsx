import React, { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import styles from './Privacy.module.css';

const Privacy = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackToHome = (e) => {
    e.preventDefault();
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <section className={styles.privacySection}>
      <div className="container">
        <a href="/" className={styles.backBtn} onClick={handleBackToHome}>
          {t('privacy.backToHome')}
        </a>
        <div className={styles.privacyCard}>
          <h1 className={styles.title}>{t('privacy.title')}</h1>
          <span className={styles.effective}>{t('privacy.effective')}</span>
          <p className={styles.intro}>{t('privacy.intro')}</p>

          <div className={styles.section}>
            <h2>{t('privacy.sec1Title')}</h2>
            <ul className={styles.list}>
              <li className={styles.listItem}>{t('privacy.sec1Item1')}</li>
              <li className={styles.listItem}>{t('privacy.sec1Item2')}</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>{t('privacy.sec2Title')}</h2>
            <ul className={styles.list}>
              <li className={styles.listItem}>{t('privacy.sec2Item1')}</li>
              <li className={styles.listItem}>{t('privacy.sec2Item2')}</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>{t('privacy.sec3Title')}</h2>
            <p>{t('privacy.sec3Intro')}</p>
            <ul className={styles.list}>
              <li className={styles.listItem}>{t('privacy.sec3Item1')}</li>
              <li className={styles.listItem}>{t('privacy.sec3Item2')}</li>
            </ul>
            <p style={{ marginTop: '16px' }}>{t('privacy.sec3Outro')}</p>
          </div>

          <div className={styles.section}>
            <h2>{t('privacy.sec4Title')}</h2>
            <p>{t('privacy.sec4Desc')}</p>
          </div>

          <div className={styles.section}>
            <h2>{t('privacy.sec5Title')}</h2>
            <p>{t('privacy.sec5Desc')}</p>
          </div>

          <div className={styles.section}>
            <h2>{t('privacy.sec6Title')}</h2>
            <p>{t('privacy.sec6Desc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Privacy;
