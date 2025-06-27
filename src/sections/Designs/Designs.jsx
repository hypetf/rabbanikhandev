import React, { useState, useEffect, useRef } from 'react'
import styles from './Designs.module.css'
import behance_logo from '../../assets/behance_logo.png'
import dribbble_logo from '../../assets/dribbble_logo.png'
import menu_design from '../../assets/menu_design.png'
import chat_design from '../../assets/chat_design.png'
import Blob from '../../components/Blob/Blob'
import { useFadeInOnScroll } from '../../hooks/useFadeInOnScroll'
import { usePageVisibility } from '../../hooks/usePageVisibility'

// Array of design objects
const designs = [
  {
    image: menu_design,
    design_title: '#Mock Menu Design',
  },
  {
    image: chat_design,
    design_title: '#Mock Chat Application',
  },
  // Add more designs here as needed
];

export default function Designs() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef();
  const fadeDuration = 600; // ms, should match CSS
  const intervalDuration = 5000; // ms
  const [refImg, visibleImg] = useFadeInOnScroll();
  const [refTitle, visibleTitle] = useFadeInOnScroll();
  const isVisible = usePageVisibility();

  // Unified progress and image change effect
  useEffect(() => {
    let timeoutId;
    let start;
    if (!paused && isVisible) {
      start = Date.now() - elapsed;
      const update = () => {
        const now = Date.now();
        const newElapsed = now - start;
        setElapsed(newElapsed);
        const percent = Math.min((newElapsed / intervalDuration) * 100, 100);
        setProgress(percent);
        if (percent < 100 && !paused && isVisible) {
          timeoutId = setTimeout(update, 30); // throttle to every 30ms
        } else if (percent >= 100 && !paused && isVisible) {
          setFade(true); // Start fade out
          setTimeout(() => {
            setCurrent(prev => (prev + 1) % designs.length);
            setFade(false); // Fade in new image
            setProgress(0);
            setElapsed(0);
          }, fadeDuration);
        }
      };
      update();
    }
    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line
  }, [paused, current, isVisible]);

  // Reset progress and elapsed when image changes (for immediate restart)
  useEffect(() => {
    setProgress(0);
    setElapsed(0);
  }, [current]);

  // Clean up on unmount
  useEffect(() => () => clearInterval(intervalRef.current), []);

  const { image, design_title } = designs[current];

  return (
    <section className={styles.designs}>
      <Blob color="var(--yellow)" width={600} height={600} left={"35%"} top={"20%"} opacity={.7} blur={120} rotationSpeed={30000} morphSpeed={20000} movementSpeed={50000} />
      <div className={styles.header}>
        <a href="https://www.behance.net/hypetf" target="_blank" rel="noopener noreferrer" className={styles.logo}>
          <img src={behance_logo} alt="logo" />
        </a>
        <a href="https://dribbble.com/hypetf" target="_blank" rel="noopener noreferrer" className={styles.logo}>
          <img src={dribbble_logo} alt="logo" />
        </a>
        <div className={styles.divider}></div>
        <h1>Designs</h1>
      </div>
      <div className={styles.designs_container}>
        <div ref={refImg} className={`${styles.designs_image_wrapper} fade-in-up${visibleImg ? ' visible' : ''}`}>
          <img
            className={`${styles.designs_image} ${fade ? styles.fade : ''}`}
            src={image}
            alt={design_title}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          />
        </div>
      </div>
      <div className={styles.progressBarWrapper}>
        <div className={styles.progressBar} style={{ width: `${progress}%` }} />
      </div>
      <p ref={refTitle} id={styles.design_title} className={`fade-in-up${visibleTitle ? ' visible' : ''}`}>{design_title}</p>
    </section>
  );
}
