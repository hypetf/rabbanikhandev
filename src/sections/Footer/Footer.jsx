import React from 'react'
import styles from './Footer.module.css'
import logo from '../../assets/logo.svg'
import cv from '../../assets/Rabbani Khan - Curriculum Vitae2025.pdf'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.topRow}>
        <div className={styles.line} />
        <div className={styles.logoBlock}>
          <img src={logo} alt="KR Logo" className={styles.logo} />
          <div className={styles.subtitle}>Full Stack Web Developer</div>
        </div>
        <div className={styles.line} />
      </div>
      <div className={styles.linksRow}>
        <a href="#top" className={styles.link}>Back to top</a>
        <a href={cv} className={styles.link} target="_blank" rel="noopener noreferrer">Download my CV</a>
        <a href="#" className={styles.link}>Privacy Policy</a>
        <a href="#" className={styles.link}>Cookies usage</a>
        <a href="#" className={styles.link}>
          Leave a like! <span className={styles.heart}>❤️</span>
        </a>
      </div>
    </footer>
  )
}
