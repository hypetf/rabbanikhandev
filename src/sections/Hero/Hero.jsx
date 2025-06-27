import React from 'react'
import styles from './Hero.module.css'
import hero_image from '/profilepic2.jpg'
import Blob from '../../components/Blob/Blob'
import cv_pdf from '../../assets/Rabbani Khan - Curriculum Vitae2025.pdf'
import { useFadeInOnScroll } from '../../hooks/useFadeInOnScroll'

export default function Hero() {
  const [refLeft, visibleLeft] = useFadeInOnScroll();
  const [refRight, visibleRight] = useFadeInOnScroll();
  return (
    <section className={styles.hero} style={{ position: 'relative' }}>
      <Blob color="var(--blue)" width={600} height={350} left={150} top={100} opacity={.7} blur={60} rotationSpeed={30000} morphSpeed={20000} movementSpeed={10000} />
      <Blob color="var(--purple)" width={600} height={350} left={250} top={250} opacity={.7} blur={60} rotationSpeed={30000} morphSpeed={20000} movementSpeed={60000} />
      <Blob color="var(--teal)" width={600} height={650} left={"90%"} top={-50} opacity={0.7} blur={60} rotationSpeed={30000} morphSpeed={20000} movementSpeed={10000} />
      <Blob color="var(--cyan)" width={600} height={850} left={"85%"} top={200} opacity={0.7} blur={60} rotationSpeed={30000} morphSpeed={20000} movementSpeed={10000} />
      <div className={styles.hero_content}>
        <div ref={refLeft} className={`fade-in-up${visibleLeft ? ' visible' : ''} ${styles.hero_content_left}`}>
          <img src={hero_image} alt="hero" />
        </div>
        <div ref={refRight} className={`fade-in-up${visibleRight ? ' visible' : ''} ${styles.hero_content_right}`}>
          <h1>
            RABBANI KHAN
          </h1>
          <h3>Full Stack Developer</h3>
          <p>
            I am a Web & Software Developer located in Manchester, currently a
            full-time student pursuing Computer Science Bachelor's degree program at
            Manchester Metropolitan University where I am enhancing my knowledge in the field.
          </p>
          <p>One of my greatest achievement is being a finalist in the national competition WorldSkills UK in Web Design & Development.</p>
          <div className={styles.hero_content_right_buttons}>
            <a href={cv_pdf} target="_blank" rel="noopener noreferrer" className={styles.download_cv_button}>Download my CV</a>
            <a
              href="#skills"
              onClick={e => {
                e.preventDefault();
                document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore more
            </a>
          </div>
        </div>
      </div>
      <p className={styles.scroll_to_view}>Scroll to view more</p>
    </section>
  )
}