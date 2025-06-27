import React, { useEffect, useState, useRef } from 'react'
import logo_light from '/logo_light.png'

import styles from './Navbar.module.css'

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const lastHideY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const vh = window.innerHeight;

      setScrolled(currentY !== 0);

      if (currentY === 0) {
        setVisible(true);
        lastHideY.current = 0;
      } else if (currentY > vh * 0.5 && currentY > lastScrollY.current) {
        setVisible(false);
        lastHideY.current = currentY;
      } else if (!visible && currentY < lastHideY.current - vh * 0.1) {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visible]);

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <div
      className={styles.navbar}
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        background: scrolled ? '#0a0a0a80' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
      }}
    >
      {!menuOpen && (
        <div className={styles.navbar_content}>
          <div className={styles.navbar_logo}>
            <a href="/">
              <img src={logo_light} alt="logo" />
            </a>
          </div>
          <div className={styles.navbar_links}>
            <a href="#">About me</a>
            <a href="#">My Projects</a>
            <a href="#">My Skills</a>
            <a href="#">Contact me</a>
          </div>
          <button
            className={styles.hamburger}
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      )}
      {menuOpen && (
        <div className={styles.overlay_menu} onClick={() => setMenuOpen(false)}>
          <div className={styles.logo_centered}>
            <a href="/">
              <img src={logo_light} alt="logo" />
            </a>
          </div>
          <button
            className={styles.close_button}
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            &times;
          </button>
          <nav className={styles.overlay_nav} onClick={e => e.stopPropagation()}>
            <a href="#" onClick={() => setMenuOpen(false)}>About me</a>
            <a href="#" onClick={() => setMenuOpen(false)}>My Projects</a>
            <a href="#" onClick={() => setMenuOpen(false)}>My Skills</a>
            <a href="#" onClick={() => setMenuOpen(false)}>Contact me</a>
          </nav>
        </div>
      )}
    </div>
  )
}
