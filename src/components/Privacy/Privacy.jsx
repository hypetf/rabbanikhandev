import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../../sections/Footer/Footer';
import styles from './Privacy.module.css';
import Blob from '../Blob/Blob';
import { useTranslation } from '../../hooks/useTranslation';

export default function Privacy() {
  const { t } = useTranslation();
  const p = t('privacy');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', marginTop: '10vh', position: 'relative', overflow: 'hidden' }}>
      <Blob color="var(--blue)" width={800} height={720} left={-120} top={'10%'} opacity={0.35} blur={60} zIndex={-2} rotationSpeed={30000} morphSpeed={20000} movementSpeed={10000} />
      <Blob color="var(--purple)" width={650} height={300} left={'70%'} top={-100} opacity={0.28} blur={60} zIndex={-2} rotationSpeed={30000} morphSpeed={20000} movementSpeed={10000} />
      <Blob color="var(--cyan)" width={500} height={400} left={'60%'} top={'60%'} opacity={0.22} blur={60} zIndex={-2} rotationSpeed={30000} morphSpeed={20000} movementSpeed={10000} />
      <Navbar />
      <main className={styles.privacyContainer}>
        <h1>{p.title}</h1>
        <p><strong>{p.effectiveDate}</strong></p>
        <p>{p.intro}</p>
        <h2>{p.infoTitle}</h2>
        <ul>
          {p.infoList && p.infoList.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <h2>{p.useTitle}</h2>
        <ul>
          {p.useList && p.useList.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <h2>{p.cookiesTitle}</h2>
        <p>{p.cookiesIntro}</p>
        <ul>
          {p.cookiesList && p.cookiesList.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <p><strong>{p.cookiesNote}</strong></p>
        <h2>{p.rightsTitle}</h2>
        <ul>
          {p.rightsList && p.rightsList.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <h2>{p.contactTitle}</h2>
        <p>{p.contactText}</p>
        <h2>{p.changesTitle}</h2>
        <p>{p.changesText}</p>
      </main>
      <Footer />
    </div>
  );
} 