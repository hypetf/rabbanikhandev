import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import styles from './App.module.css'
import Navbar from './components/Navbar/Navbar'
import Hero from './sections/Hero/Hero'
import Designs from './sections/Designs/Designs'
import Projects from './sections/Projects/Projects'
import Skills from './sections/Skills/Skills'
import Contacts from './sections/Contacts/Contacts'
import Footer from './sections/Footer/Footer'
import CookieNotification from './components/CookieNotification/CookieNotification'
import NotFound from './components/NotFound/NotFound'
import Privacy from './components/Privacy/Privacy'

function App() {
  return (
    <div className={styles.app}>      
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={
            <div className={styles.content}>
              <div id="about">
                <Hero />
              </div>
              <div id="designs">
                <Designs />
              </div>
              <div id="projects">
                <Projects />
              </div>
              <div id="skills">
                <Skills />
              </div>
              <div id="contact">
                <Contacts />
              </div>
              <Footer />
            </div>
          } />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <CookieNotification />
    </div>
  )
}

export default App
