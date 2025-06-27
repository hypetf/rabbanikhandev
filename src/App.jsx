import { useState } from 'react'
import styles from './App.module.css'
import Navbar from './components/Navbar/Navbar'
import Hero from './sections/Hero/Hero'
import Designs from './sections/Designs/Designs'
import Projects from './sections/Projects/Projects'
import Skills from './sections/Skills/Skills'
import Contacts from './sections/Contacts/Contacts'
import Footer from './sections/Footer/Footer'

function App() {

  return (
    <div className={styles.app}>      
      <Navbar />
      <div className={styles.content}>
        <Hero />
        <Designs />
        <Projects />
        <Skills />
        <Contacts />
        <Footer />
      </div>
    </div>
  )
}

export default App
