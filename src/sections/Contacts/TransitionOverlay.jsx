import React, { useEffect, useState } from 'react';
import styles from './TransitionOverlay.module.css';

export default function TransitionOverlay({ onComplete }) {
  const [showText, setShowText] = useState(false);
  const [hideText, setHideText] = useState(false);

  useEffect(() => {
    // Start text fade in after overlay animates in (1s)
    const textIn = setTimeout(() => setShowText(true), 1000);
    // Fade out text after 1.2s
    const textOut = setTimeout(() => setHideText(true), 2200);
    // Remove overlay after total 2.5s
    const done = setTimeout(() => onComplete && onComplete(), 2500);
    return () => {
      clearTimeout(textIn);
      clearTimeout(textOut);
      clearTimeout(done);
    };
  }, [onComplete]);

  return (
    <div className={styles.overlay}>
      <div className={styles.blackScreen} />
      <div className={
        `${styles.text} ${showText ? styles.textVisible : ''} ${hideText ? styles.textHidden : ''}`
      }>
        {/* let&apos;s get in touch */}
        LET'S GET IN TOUCH
      </div>
    </div>
  );
} 