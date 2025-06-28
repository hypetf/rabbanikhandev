import React, { useState, useEffect, useRef } from 'react'
import styles from './Designs.module.css'
import behance_logo from '../../assets/behance_logo.png'
import dribbble_logo from '../../assets/dribbble_logo.png'
import menu_design from '../../assets/menu_design.png'
import chat_design from '../../assets/chat_design.png'
import ev_design from '../../assets/ev.png'
import jtkbrand from '../../assets/jtkbrand.png'
import rankez from '../../assets/rankez.png'
import viaroma from '../../assets/viaroma.png'
import pinkdrips from '../../assets/pinkdrips.png'
import Blob from '../../components/Blob/Blob'
import { useFadeInOnScroll } from '../../hooks/useFadeInOnScroll'
import { usePageVisibility } from '../../hooks/usePageVisibility'

// Array of design objects
const designs = [
  {
    image: rankez,
    design_title: '#Mock Guess the Rank Web App',
  },
  {
    image: menu_design,
    design_title: '#Mock Café Menu Design',
  },
  {
    image: pinkdrips,
    design_title: '#Re-design PinkDrips',
  },
  {
    image: ev_design,
    design_title: '#Clothing Brand',
  },
  {
    image: chat_design,
    design_title: '#Mock Chat Application',
  },
  {
    image: jtkbrand,
    design_title: '#Clothing Store Design',
  },

  {
    image: viaroma,
    design_title: '#Re-design ViaRoma12Verona.it',
  },
  
  // Add more designs here as needed
];

export default function Designs() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
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
    if (!paused && isVisible && !showFullscreen) {
      start = Date.now() - elapsed;
      const update = () => {
        const now = Date.now();
        const newElapsed = now - start;
        setElapsed(newElapsed);
        const percent = Math.min((newElapsed / intervalDuration) * 100, 100);
        setProgress(percent);
        if (percent < 100 && !paused && isVisible && !showFullscreen) {
          timeoutId = setTimeout(update, 30); // throttle to every 30ms
        } else if (percent >= 100 && !paused && isVisible && !showFullscreen) {
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
  }, [paused, current, isVisible, showFullscreen]);

  // Reset progress and elapsed when image changes (for immediate restart)
  useEffect(() => {
    setProgress(0);
    setElapsed(0);
  }, [current]);

  // Clean up on unmount
  useEffect(() => () => clearInterval(intervalRef.current), []);

  const { image, design_title } = designs[current];

  const handleImageClick = () => {
    setShowFullscreen(true);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleCloseFullscreen = () => {
    setShowFullscreen(false);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowFullscreen(false);
      setZoom(1);
      setPan({ x: 0, y: 0 });
    }
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.5, 0.5));
  };

  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.2 : 0.2;
    setZoom(prev => Math.max(0.5, Math.min(4, prev + delta)));
  };

  // Disable page scroll when zoomed in
  useEffect(() => {
    if (zoom > 1) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [zoom]);

  const handleMouseDown = (e) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoom > 1) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

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
            onClick={handleImageClick}
          />
        </div>
      </div>
      <div className={styles.progressBarWrapper}>
        <div className={styles.progressBar} style={{ width: `${progress}%` }} />
      </div>
      <p ref={refTitle} id={styles.design_title} className={`fade-in-up${visibleTitle ? ' visible' : ''}`}>{design_title}</p>

      {/* Fullscreen Overlay */}
      {showFullscreen && (
        <div className={styles.fullscreenOverlay} onClick={handleOverlayClick}>
          <div className={styles.fullscreenContent}>
            <button className={styles.closeButton} onClick={handleCloseFullscreen}>
              &times;
            </button>
            
            {/* Zoom Controls */}
            <div className={styles.zoomControls}>
              <button onClick={handleZoomOut} disabled={zoom <= 0.5}>−</button>
              <button onClick={handleResetZoom}>Reset</button>
              <button onClick={handleZoomIn} disabled={zoom >= 4}>+</button>
            </div>

            <div 
              className={styles.imageContainer}
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <img 
                src={image} 
                alt={design_title} 
                className={styles.fullscreenImage}
                style={{
                  transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                  cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
                }}
                draggable={false}
              />
            </div>
            
            <p className={styles.fullscreenTitle}>{design_title}</p>
          </div>
        </div>
      )}
    </section>
  );
}
