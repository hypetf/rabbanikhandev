import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import styles from './About.module.css';

const About = () => {
  const { t } = useLanguage();
  const [wsOpen, setWsOpen] = useState(false);

  return (
    <section id="about" className={styles.aboutSection}>
      <div className="container">
        <div className={styles.aboutGrid}>
          <div className={`${styles.aboutText} reveal`}>
            <div className="section-head" style={{ marginBottom: '32px' }}>
              <span className="section-label">{t('about.sectionLabel')}</span>
              <h2 className="section-title">
                {t('about.sectionTitleLine1')}<br />{t('about.sectionTitleLine2')}
              </h2>
            </div>
            <p>{t('about.p1')}</p>
            <div className={styles.aboutHighlight}>
              {t('about.quote')}
            </div>
            <p>{t('about.p2')}</p>

            {/* WorldSkills Accordion */}
            <div className={styles.worldskillsCard}>
              <div className={styles.wsHeader} onClick={() => setWsOpen(!wsOpen)}>
                <div>
                  <div className={styles.wsBadge}>{t('about.wsBadge')}</div>
                  <div className={styles.wsSubtitle}>
                    {t('about.wsSubtitle')}
                  </div>
                </div>
                <div className={`${styles.wsToggle} ${wsOpen ? styles.wsToggleOpen : ''}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
              <div className={`${styles.wsBody} ${wsOpen ? styles.wsBodyOpen : ''}`}>
                <p className={styles.wsBodyParagraph}>
                  {t('about.wsBody')}
                </p>
                <div className={styles.wsLinks}>
                  <a href="https://www.worldskillsuk.org/competitions/web-development/" target="_blank" rel="noreferrer" className={styles.wsLink}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    WorldSkills UK — Web Dev
                  </a>
                  <a href="https://aboutmanchester.co.uk/oldham-college-stars-ready-for-worldskills-uk-finals/" target="_blank" rel="noreferrer" className={styles.wsLink}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 22V4c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2v18l-4-2-4 2-4-2-4 2z"></path>
                    </svg>
                    About Manchester coverage
                  </a>
                  <a href="https://www.theoldhamtimes.co.uk/news/19711060.oldham-college-students-reach-national-competition-finals/" target="_blank" rel="noreferrer" className={styles.wsLink}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 22V4c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2v18l-4-2-4 2-4-2-4 2z"></path>
                    </svg>
                    The Oldham Times
                  </a>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className={styles.skillsSection}>
              <div className={styles.skillGroup}>
                <div className={styles.skillGroupTitle}>{t('about.skillFrontend')}</div>
                <div className={styles.skillTags}>
                  <span className={styles.skillTag}>React</span>
                  <span className={styles.skillTag}>TypeScript</span>
                  <span className={styles.skillTag}>Next.js</span>
                  <span className={styles.skillTag}>HTML/CSS</span>
                  <span className={styles.skillTag}>TailwindCSS</span>
                  <span className={styles.skillTag}>Figma</span>
                </div>
              </div>
              <div className={styles.skillGroup}>
                <div className={styles.skillGroupTitle}>{t('about.skillBackend')}</div>
                <div className={styles.skillTags}>
                  <span className={styles.skillTag}>Node.js</span>
                  <span className={styles.skillTag}>Python</span>
                  <span className={styles.skillTag}>Express.js</span>
                  <span className={styles.skillTag}>MongoDB</span>
                  <span className={styles.skillTag}>REST APIs</span>
                </div>
              </div>
              <div className={styles.skillGroup}>
                <div className={styles.skillGroupTitle}>{t('about.skillInfrastructure')}</div>
                <div className={styles.skillTags}>
                  <span className={styles.skillTag}>Docker</span>
                  <span className={styles.skillTag}>VPS / Nginx</span>
                  <span className={styles.skillTag}>Custom model training</span>
                  <span className={styles.skillTag}>SEO</span>
                  <span className={styles.skillTag}>Git / CI-CD</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Experience & Education */}
          <div className="reveal reveal-delay-1">
            <ul className={styles.expList}>
              <li className={styles.expItem}>
                <div>
                  <div className={styles.expRole}>{t('about.expTitle1')}</div>
                  <div className={styles.expCompany}>{t('about.expCompany1')}</div>
                  <div className={styles.expDesc}>{t('about.expDesc1')}</div>
                </div>
                <div className={styles.expDate}>{t('about.expDate1')}</div>
              </li>
              <li className={styles.expItem}>
                <div>
                  <div className={styles.expRole}>{t('about.expTitle2')}</div>
                  <div className={styles.expCompany}>{t('about.expCompany2')}</div>
                  <div className={styles.expDesc}>{t('about.expDesc2')}</div>
                </div>
                <div className={styles.expDate}>{t('about.expDate2')}</div>
              </li>
              <li className={styles.expItem}>
                <div>
                  <div className={styles.expRole}>{t('about.expTitle3')}</div>
                  <div className={styles.expCompany}>{t('about.expCompany3')}</div>
                  <div className={styles.expDesc}>{t('about.expDesc3')}</div>
                  <div className={styles.expWin}>{t('about.expOutcome3')}</div>
                </div>
                <div className={styles.expDate}>{t('about.expDate3')}</div>
              </li>
            </ul>

            <div className={styles.eduContainer}>
              <div className={styles.eduGrid} style={{ gridTemplateColumns: '1fr' }}>
                <div className={styles.eduCard}>
                  <span className={styles.eduFlag}>🏴󠁧󠁢󠁥󠁮󠁧󠁿</span>
                  <div className={styles.eduInst}>{t('about.eduMMU')}</div>
                  <div className={styles.eduLoc}>{t('about.eduMMULoc')}</div>
                  <div className={styles.eduDegree}>{t('about.eduMMUDegree')}</div>
                  <div className={styles.eduCourses}>{t('about.eduMMUDesc')}</div>
                </div>
                <div className={`${styles.eduCard} ${styles.eduCardSecond}`}>
                  <span className={styles.eduFlag}>🏴󠁧󠁢󠁥󠁮󠁧󠁿</span>
                  <div className={styles.eduInst}>{t('about.eduOldham')}</div>
                  <div className={styles.eduLoc}>{t('about.eduOldhamLoc')}</div>
                  <div className={styles.eduDegree}>{t('about.eduOldhamDegree')}</div>
                  <div className={styles.eduCourses}>{t('about.eduOldhamDesc')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
