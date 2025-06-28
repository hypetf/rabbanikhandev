import React, { useState, useEffect } from 'react';
import styles from './CookieNotification.module.css';
import cookieIcon from '../../assets/cookie.svg';
import { useTranslation } from '../../hooks/useTranslation';

const COOKIE_KEY = 'cookieConfirmed';

export default function CookieNotification() {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!localStorage.getItem(COOKIE_KEY)) {
      setVisible(true);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem(COOKIE_KEY, 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={styles.cookieNotification}>
      <img src={cookieIcon} alt="cookie" className={styles.icon} />
      <span className={styles.text}>{t('cookie.text')}</span>
      <button className={styles.confirm} onClick={handleConfirm}>{t('cookie.confirm')}</button>
    </div>
  );
} 