import React from 'react'
import styles from './Footer.module.css'
import logo from '../../assets/logo.svg'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <img src={logo} alt="KR Logo" className={styles.logo} />
        <span className={styles.role}>Web Developer</span>
      </div>
      <div className={styles.right}>
        <span className={styles.copyright}>
          <b>Rabbani Khan</b> &copy; 2025 - Present. All rights reserved.
        </span>
      </div>
    </footer>
  )
}
