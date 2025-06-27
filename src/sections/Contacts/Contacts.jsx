import React, { useState, useEffect, useRef } from 'react';
import TransitionOverlay from './TransitionOverlay';
import styles from './Contacts.module.css';
import instagram from '../../assets/instagram.svg';
import github from '../../assets/github.svg';
import codepen from '../../assets/codepen.svg';
import linkedin from '../../assets/linkedin.svg';
import paperclip from '../../assets/paperclip.svg';

export default function Contacts() {
  const [showTransition, setShowTransition] = useState(false);
  const [showMain, setShowMain] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const sectionRef = useRef();
  const triggeredRef = useRef(false);
  const [tab, setTab] = useState('Hiring');
  const [attachment, setAttachment] = useState(null);
  const fileInputRef = useRef();

  const handleTextareaChange = (e) => {
    const value = e.target.value;
    setCharCount(value.length);
  };

  const handleAttachmentChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleAttachmentClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveAttachment = (e) => {
    e.stopPropagation();
    setAttachment(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Detect when Contacts section enters the viewport
  useEffect(() => {
    const handleScroll = () => {
      if (triggeredRef.current || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        triggeredRef.current = true;
        setShowTransition(true);
        setTimeout(() => {
          sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (showTransition) return;
    if (!triggeredRef.current) return;
    const timer = setTimeout(() => setShowMain(true), 100);
    return () => clearTimeout(timer);
  }, [showTransition]);

  return (
    <section className={styles.contacts} ref={sectionRef}>
      {/* <div className={styles.contactsBg} style={{ backgroundImage: `url(${waves})` }} /> */}
      {showTransition && !showMain && (
        <TransitionOverlay onComplete={() => setShowTransition(false)} />
      )}
      {showMain && (
        <div className={styles.contactsContent}>
          <div className={styles.contactsLeft}>
            <h2>CONTACT ME</h2>
            <div className="bigText">
              <span className={styles.bigText}>LET'S<br />WORK<br />TOGETHER</span>
            </div>
            <div className={styles.contactsLeftBottom}>
              <a className={styles.email} href="mailto:rabbanikhandev@gmail.com">rabbanikhandev@gmail.com</a>
              <div className={styles.socials}>
                <a href="https://instagram.com/hypetf" target="_blank" rel="noopener noreferrer"><img src={instagram} alt="Instagram" /></a>
                <a href="https://codepen.io/hypetf" target="_blank" rel="noopener noreferrer"><img src={codepen} alt="CodePen" /></a>
                <a href="https://www.linkedin.com/in/rabbanidev/" target="_blank" rel="noopener noreferrer"><img src={linkedin} alt="LinkedIn" /></a>
                <a href="https://github.com/hypetf" target="_blank" rel="noopener noreferrer"><img src={github} alt="GitHub" /></a>
              </div>
            </div>
          </div>
          <div className={styles.contactsRight}>
            <p id={styles.formTitle}>I'm interested in...</p>
            <div className={styles.formTabs}>
              {['Hiring', 'Project', 'Other'].map(t => (
                <button
                  key={t}
                  className={styles.formTab + (tab === t ? ' ' + styles.active : '')}
                  onClick={() => setTab(t)}
                  type="button"
                >
                  {t}
                </button>
              ))}
            </div>
            <form>
              <div className={styles.formGroup}>
                <input className={styles.formInput} type="text" placeholder="Your name" required />
              </div>
              <div className={styles.formGroup}>
                <input className={styles.formInput} type="email" placeholder="Your email" required />
              </div>
              <div className={styles.formGroup}>
                <textarea className={styles.formTextarea} placeholder="Your message..." maxLength={500} onChange={handleTextareaChange} required />
                <span className={styles.charCount}>{charCount}/500</span>
              </div>
              <div
                className={styles.formAttach + (attachment ? ' ' + styles.attachmentSelected : '')}
                onClick={!attachment ? handleAttachmentClick : undefined}
                style={{cursor: attachment ? 'default' : 'pointer'}}
              >
                {!attachment && (
                  <>
                    <img src={paperclip} alt="Attach file" className={styles.paperclipIcon} />
                    <span className={styles.attachText}>Add attachment</span>
                      <input
                        ref={fileInputRef}
                        id="attachment-input"
                        type="file"
                        accept=".pdf,.doc,.docx,image/*"
                        style={{ display: 'none' }}
                        onChange={handleAttachmentChange}
                      />
                  </>
                )}
                {attachment && (
                  <span className={styles.attachmentFile}>
                    <span className={styles.removeAttachment} onClick={handleRemoveAttachment}>&times;</span>
                    {attachment.name}
                  </span>
                )}
              </div>
              <button className={styles.formSend} type="button">Send message</button>
            </form>
          </div>
          <div className={styles.mobileContactInfo}>
            <a className={styles.email} href="mailto:rabbanikhandev@gmail.com">rabbanikhandev@gmail.com</a>
            <div className={styles.socials}>
              <a href="https://instagram.com/hypetf" target="_blank" rel="noopener noreferrer"><img src={instagram} alt="Instagram" /></a>
              <a href="https://codepen.io/hypetf" target="_blank" rel="noopener noreferrer"><img src={codepen} alt="CodePen" /></a>
              <a href="https://www.linkedin.com/in/rabbanidev/" target="_blank" rel="noopener noreferrer"><img src={linkedin} alt="LinkedIn" /></a>
              <a href="https://github.com/hypetf" target="_blank" rel="noopener noreferrer"><img src={github} alt="GitHub" /></a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
