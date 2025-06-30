import React from 'react'
import styles from './Projects.module.css'
import Blob from '../../components/Blob/Blob'
import github_logo from '../../assets/github_logo.png'
import project_1 from '../../assets/project_proxy.png'
import project_2 from '../../assets/project_viaroma.png'
import project_3 from '../../assets/project_search.png'
import project_4 from '../../assets/project_weakphp.png'
import { useFadeInOnScroll } from '../../hooks/useFadeInOnScroll'
import { useTranslation } from '../../hooks/useTranslation'
// Add more project images as needed

const projects = [
  {
    image: project_1,
    overlay: 'A proxy farm for the internet',
    github: 'https://www.apexproxy.tech/',
  },
  {
    image: project_2,
    overlay: 'Via Roma 12 Hotel',
    github: 'https://viaroma12verona.it/',
  },
  {
    image: project_3,
    overlay: 'A basic search engine built with React',
    github: 'https://github.com/hypetf/react-search',
  },
  {
    image: project_4,
    overlay: 'A weak PHP authentication system for testing webshell injection',
    github: 'https://github.com/hypetf/weak-php',
  },
];

export default function Projects() {
  const { t } = useTranslation();
  
  return (
    <section className={styles.projects}>
      <Blob color="var(--red)" width={600} height={600} left={"35%"} top={"20%"} opacity={.7} blur={120} rotationSpeed={30000} morphSpeed={20000} movementSpeed={50000} />
      <div className={styles.header}>
        <a href="https://www.github.com/hypetf" target="_blank" rel="noopener noreferrer" className={styles.logo}>
          <img src={github_logo} alt="logo" />
        </a>
        <div className={styles.divider}></div>
        <h1>{t('projects.title')}</h1>
      </div>
      <div className={styles.projects_container}>
        {projects.map((project, idx) => {
          const [ref, visible] = useFadeInOnScroll();
          return (
            <div
              ref={ref}
              className={`fade-in-up${visible ? ' visible' : ''} ${styles.project_card}`}
              key={idx}
            >
              <img src={project.image} alt={`project_${idx + 1}`} />
              <div className={styles.project_overlay}>
                {project.overlay}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.github_link}
                >
                  {t('projects.viewOnGitHub')}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  )
}
