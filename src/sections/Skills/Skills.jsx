import React, { useState, useRef, useEffect } from 'react'
import Blob from '../../components/Blob/Blob'
import styles from './Skills.module.css'
import skills_blob from '../../assets/skills_blob.png'
import react_logo from '../../assets/react_icon.svg'
import js_logo from '../../assets/js_logo.svg'
import mongodb_logo from '../../assets/mongodb.svg'
import html_logo from '../../assets/html_logo.svg'
import csharp_logo from '../../assets/csharp_logo.svg'
import Figma_logo from '../../assets/Figma-logo.svg'
import css_logo from '../../assets/css_logo.svg'
import nodejs_logo from '../../assets/nodejs-icon.svg'
import git_logo from '../../assets/Git-Icon-1788C.svg'
import { useFadeInOnScroll } from '../../hooks/useFadeInOnScroll'

export default function Skills() {
  const [showModal, setShowModal] = useState(false);

  const links = [
    {
      title: "WorldSkills UK Web Development",
      url: "https://www.worldskillsuk.org/competitions/web-development/"
    },
    {
      title: "Oldham College Stars Ready for WorldSkills UK Finals",
      url: "https://aboutmanchester.co.uk/oldham-college-stars-ready-for-worldskills-uk-finals/"
    },
    {
      title: "Student Reaches National Competition Finals",
      url: "https://www.theoldhamtimes.co.uk/news/19711060.oldham-college-students-reach-national-competition-finals/"
    }
    // {
    //   title: "Oldham College Stars Ready for WorldSkills UK Finals (Saddind)",
    //   url: "https://saddind.co.uk/oldham-college-stars-ready-for-worldskills-uk-finals/"
    // }
  ];

  return (
    <section className={styles.skills} id="skills">
      <div id={styles.bg}>
          <img src={skills_blob} alt="skills_blob" />
      </div>

      <div id={styles.wsCard}>
          <h1>WORLD SKILLS UK FINALIST</h1>
          <p>
          In 2021, I had reached the finals of WorldSkills UK, representing my region Greater Manchester in one of the most prestigious skills competitions in the country. Competing against the best young talent across the UK, I showcased my expertise in Web Design and Development, gaining valuable experience and national recognition.
          </p>
          <p>
          WorldSkills UK is a member of WorldSkills, a global movement of over 80 countries.<br />
WorldSkills supports young people across the world via competitions-based training, <br />
assessment and benchmarking, with members' national teams ultimately testing their <br />
ability to achieve world-class standards in the biennial 'skills olympics'.
          </p>
          <button id={styles.readMore} onClick={() => setShowModal(true)}>
            READ MORE
          </button>
          <h1 id={styles.highestScore}>
            <span>HIGHEST SCORE IN THE</span>
            <span className={styles.northWest}>NORTH WEST</span>
          </h1>
      </div>

      <div className={styles.header}>
          <h1>Skills & Tools</h1>
      </div>

      <div id={styles.skillsGrid}>
          {[
            { src: react_logo, label: 'ReactJS' },
            { src: js_logo, label: 'JavaScript' },
            { src: mongodb_logo, label: 'MongoDB' },
            { src: html_logo, label: 'HTML5' },
            { src: csharp_logo, label: 'C#' },
            { src: Figma_logo, label: 'Figma' },
            { src: css_logo, label: 'CSS3' },
            { src: nodejs_logo, label: 'NodeJS' },
            { src: git_logo, label: 'Git Control' },
          ].map(({ src, label }, idx) => {
            const [ref, visible] = useFadeInOnScroll();
            return (
              <div ref={ref} className={`fade-in-up${visible ? ' visible' : ''}`} id={styles.skillCard} key={label}>
                <img src={src} alt={label.toLowerCase() + '_logo'} />
                <p>{label}</p>
              </div>
            );
          })}
      </div>

      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h2>Related Links</h2>
            <ul>
              {links.map(link => (
                <li key={link.url}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a>
                </li>
              ))}
            </ul>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </section>
  )
}
