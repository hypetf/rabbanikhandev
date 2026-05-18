import React, { useEffect, useRef, useState } from 'react';
import styles from './Cursor.module.css';

const Cursor = () => {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const mobileQuery = window.matchMedia('(max-width: 900px)');
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(mobileQuery.matches || hasTouch);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    let rx = 0, ry = 0, cx = 0, cy = 0;
    let animationFrameId;

    const handleMouseMove = (e) => {
      cx = e.clientX;
      cy = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = cx + 'px';
        cursorRef.current.style.top = cy + 'px';
      }
    };

    const animateRing = () => {
      rx += (cx - rx) * 0.12;
      ry += (cy - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px';
        ringRef.current.style.top = ry + 'px';
      }
      animationFrameId = requestAnimationFrame(animateRing);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isInteractive =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('[role="button"]') ||
        target.closest('[data-cursor="pointer"]') ||
        // Heuristic: check class names for interactive keywords
        Array.from(target.classList || []).some(cls => 
          cls.toLowerCase().includes('card') || 
          cls.toLowerCase().includes('btn') || 
          cls.toLowerCase().includes('tab') || 
          cls.toLowerCase().includes('link') ||
          cls.toLowerCase().includes('item')
        );

      if (isInteractive) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    animateRing();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('resize', checkDevice);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      <div 
        ref={cursorRef} 
        className={`${styles.cursor} ${isHovered ? styles.cursorHovered : ''}`}
      ></div>
      <div 
        ref={ringRef} 
        className={styles.cursorRing}
      ></div>
    </>
  );
};

export default Cursor;
