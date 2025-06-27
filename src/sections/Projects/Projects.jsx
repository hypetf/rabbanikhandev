import React from 'react'
import styles from './Projects.module.css'
import Blob from '../../components/Blob/Blob'
import github_logo from '../../assets/github_logo.png'
import project_1 from '../../assets/project_proxy.png'
import { useFadeInOnScroll } from '../../hooks/useFadeInOnScroll'
// Add more project images as needed

const projects = [
  {
    image: project_1,
    overlay: 'A proxy farm for the internet',
    github: 'https://github.com/yourusername/project1',
  },
  {
    image: project_1,
    overlay: 'Project 2 Description',
    github: 'https://github.com/yourusername/project2',
  },
  {
    image: project_1,
    overlay: 'Project 3 Description',
    github: 'https://github.com/yourusername/project3',
  },
  {
    image: project_1,
    overlay: 'Project 4 Description',
    github: 'https://github.com/yourusername/project4',
  },
];

export default function Projects() {
  return (
    <section className={styles.projects}>
      <Blob color="var(--red)" width={600} height={600} left={"35%"} top={"20%"} opacity={.7} blur={120} rotationSpeed={30000} morphSpeed={20000} movementSpeed={50000} />
      <div className={styles.header}>
        <a href="https://www.github.com/hypetf" target="_blank" rel="noopener noreferrer" className={styles.logo}>
          <img src={github_logo} alt="logo" />
        </a>
        <div className={styles.divider}></div>
        <h1>Projects</h1>
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
                  View on GitHub
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  )
}
