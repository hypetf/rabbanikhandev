import React from 'react';
import styles from './NotFound.module.css';
import Blob from '../Blob/Blob';
import { useTranslation } from '../../hooks/useTranslation';

export default function NotFound() {
  const { t } = useTranslation();
  
  return (
    <div className={styles.notFoundContainer}>
      {/* <Blob color="var(--blue)" width={600} height={350} left={150} top={100} opacity={.7} blur={60} rotationSpeed={30000} morphSpeed={20000} movementSpeed={10000} />
      <Blob color="var(--purple)" width={600} height={350} left={250} top={250} opacity={.7} blur={60} rotationSpeed={30000} morphSpeed={20000} movementSpeed={60000} />
      <Blob color="var(--teal)" width={600} height={650} left={"90%"} top={-50} opacity={0.7} blur={60} rotationSpeed={30000} morphSpeed={20000} movementSpeed={10000} />
      <Blob color="var(--cyan)" width={600} height={850} left={"85%"} top={200} opacity={0.7} blur={60} rotationSpeed={30000} morphSpeed={20000} movementSpeed={10000} /> */}
      <h1 className={styles.heading}>{t('notFound.title')}</h1>
      <h2 className={styles.subheading}>{t('notFound.subtitle')}</h2>
      <a href="/" className={styles.homeLink}>{t('notFound.goHome')}</a>
    </div>
  );
} 