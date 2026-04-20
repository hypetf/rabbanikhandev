import React, { useState } from 'react'
import styles from './Skills.module.css'
import skills_blob from '../../assets/skills_blob.png'
import { useFadeInOnScroll } from '../../hooks/useFadeInOnScroll'
import { useTranslation } from '../../hooks/useTranslation'
import {
  FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaGitAlt, FaFigma, FaDatabase,
  FaPython, FaJava, FaDocker, FaServer, FaSearch, FaNetworkWired, FaPalette
} from "react-icons/fa";
import {
  SiJavascript, SiTypescript, SiTailwindcss, SiNextdotjs,
  SiExpress, SiMongodb, SiPostman, SiRedis, SiNginx,
  SiGithubactions, SiFfmpeg
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";

export default function Skills() {
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

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
  ];

  const skillCategories = [
    {
      title: "Frontend Development",
      fallbackTitle: "Frontend",
      skills: [
        { name: "ReactJS", icon: <FaReact color="#61DAFB" />, level: 95 },
        { name: "TypeScript", icon: <SiTypescript color="#3178C6" />, level: 70 },
        { name: "JavaScript", icon: <SiJavascript color="#F7DF1E" />, level: 90 },
        { name: "HTML5", icon: <FaHtml5 color="#E34F26" />, level: 98 },
        { name: "CSS3", icon: <FaCss3Alt color="#1572B6" />, level: 90 },
        { name: "UI/UX Design", icon: <FaFigma color="#F24E1E" />, level: 90 },
        { name: "TailwindCSS", icon: <SiTailwindcss color="#06B6D4" />, level: 70 },
        { name: "Photoshop", icon: <FaPalette color="#31A8FF" />, level: 70 },
      ]
    },
    {
      title: "Backend Development",
      fallbackTitle: "Backend",
      skills: [
        { name: "NodeJS", icon: <FaNodeJs color="#339933" />, level: 90 },
        { name: "Express", icon: <SiExpress color="#ffffff" />, level: 90 },
        { name: "Python", icon: <FaPython color="#3776AB" />, level: 70 },
        { name: "Java", icon: <FaJava color="#007396" />, level: 70 },
        { name: "MongoDB", icon: <SiMongodb color="#47A248" />, level: 90 },
        { name: "Redis", icon: <SiRedis color="#DC382D" />, level: 80 },
        { name: "C#", icon: <TbBrandCSharp color="#239120" />, level: 70 },
      ]
    },
    {
      title: "Infrastructure & Networking",
      fallbackTitle: "Infrastructure",
      skills: [
        { name: "Docker", icon: <FaDocker color="#2496ED" />, level: 65 },
        { name: "Nginx", icon: <SiNginx color="#009639" />, level: 70 },
        { name: "CI/CD", icon: <SiGithubactions color="#2088FF" />, level: 85 },
        { name: "VPS Mgmt", icon: <FaServer color="#ffffff" />, level: 92 },
        { name: "Protocols", icon: <FaNetworkWired color="#ffffff" />, level: 95 },
        { name: "REST APIs", icon: <FaDatabase color="#ffffff" />, level: 95 },
      ]
    },
    {
      title: "Tools & Design",
      fallbackTitle: "Tools",
      skills: [
        { name: "Git & GitHub", icon: <FaGitAlt color="#F05032" />, level: 85 },
        { name: "Postman", icon: <SiPostman color="#FF6C37" />, level: 92 },
        { name: "VS Code", icon: <VscVscode color="#007ACC" />, level: 100 },
        { name: "FFmpeg", icon: <SiFfmpeg color="#0078D3" />, level: 80 },
        { name: "SEO", icon: <FaSearch color="#ffffff" />, level: 70 },
      ]
    }
  ];

  const getCategoryTitle = (cat) => {
    if (cat.fallbackTitle === "Frontend") return t('skills.frontend') || cat.title;
    if (cat.fallbackTitle === "Backend") return t('skills.backend') || cat.title;
    if (cat.fallbackTitle === "Infrastructure") return t('skills.infrastructure') || cat.title;
    return t('skills.tools') || cat.title;
  };

  return (
    <section className={styles.skills} id="skills">
      <div id={styles.bg}>
        <img src={skills_blob} alt="skills_blob" />
      </div>

      <div id={styles.wsCard}>
        <h1>{t('skills.worldSkillsTitle')}</h1>
        <p>
          {t('skills.worldSkillsDescription1')}
        </p>
        <p>
          {t('skills.worldSkillsDescription2')}
        </p>
        <button id={styles.readMore} onClick={() => setShowModal(true)}>
          {t('skills.readMore')}
        </button>
        <h1 id={styles.highestScore}>
          <span>{t('skills.highestScore')}</span>
          <span className={styles.northWest}>{t('skills.northWest')}</span>
        </h1>
      </div>

      <div className={styles.header}>
        <h1>{t('skills.title')}</h1>
      </div>

      <div className={styles.categoriesContainer}>
        {skillCategories.map((category) => {
          const [ref, visible] = useFadeInOnScroll();
          return (
            <div ref={ref} key={category.title} className={`${styles.categoryBlock} fade-in-up${visible ? ' visible' : ''}`}>
              <h2 className={styles.categoryTitle}>{getCategoryTitle(category)}</h2>
              <div className={styles.skillsGrid}>
                {category.skills.map((skill) => (
                  <div className={styles.skillCard} key={skill.name}>
                    <div className={styles.skillHeader}>
                      <span className={styles.skillIcon}>{skill.icon}</span>
                      <p className={styles.skillName}>{skill.name}</p>
                    </div>
                    <div className={styles.progressContainer}>
                      <div
                        className={styles.progressBar}
                        style={{
                          width: visible ? `${skill.level}%` : '0%',
                          backgroundColor: skill.icon.props.color === '#ffffff' ? '#aaaaaa' : skill.icon.props.color
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h2>{t('skills.relatedLinks')}</h2>
            <ul>
              {links.map(link => (
                <li key={link.url}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a>
                </li>
              ))}
            </ul>
            <button onClick={() => setShowModal(false)}>{t('skills.close')}</button>
          </div>
        </div>
      )}
    </section>
  )
}


