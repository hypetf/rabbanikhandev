import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import styles from './Contact.module.css';

const Contact = () => {
  const { t } = useLanguage();
  const [activeTopic, setActiveTopic] = useState('Hiring');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleTopicChange = (topic) => {
    setActiveTopic(topic);
    setSuccess(false);
  };

  const getSubjectPlaceholder = () => {
    if (activeTopic === 'Hiring') return t('contact.placeholderSubjectHiring');
    if (activeTopic === 'Project') return t('contact.placeholderSubjectProject');
    return t('contact.placeholderSubjectOther');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert(t('contact.errorMessage') || "Please fill in all required fields.");
      return;
    }
    
    setLoading(true);
    setSuccess(false);
    setError(false);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "35b2ce3a-0add-463d-90c6-2e40caeba212",
          name: name,
          email: email,
          subject: subject || `${activeTopic} Inquiry from Portfolio`,
          message: `Topic: ${activeTopic}\n\n${message}`,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSuccess(true);
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setError(true);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className="container">
        <div className={styles.contactGrid}>
          <div className="reveal">
            <h2 className={styles.contactInfo}>
              <span className={styles.contactHeaderOutline}>
                Let's build
              </span>
              <span className={styles.contactHeaderAccent}>
                something great.
              </span>
            </h2>
            <p className={styles.contactDescription}>
              {t('contact.contactDesc')}
            </p>
            <ul className={styles.socialList}>
              <li className={styles.socialItem}>
                <a href="https://www.linkedin.com/in/rabbanidev/" target="_blank" rel="noreferrer">
                  <span className={styles.socialLabelContainer}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </span>
                  <span>↗</span>
                </a>
              </li>
              <li className={styles.socialItem}>
                <a href="https://github.com/hypetf" target="_blank" rel="noreferrer">
                  <span className={styles.socialLabelContainer}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </span>
                  <span>↗</span>
                </a>
              </li>
              <li className={styles.socialItem}>
                <a href="https://www.behance.net/hypetf" target="_blank" rel="noreferrer">
                  <span className={styles.socialLabelContainer}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.799 5.698C8.7 5.698 9.5 5.8 10.2 6c.7.2 1.3.5 1.8.9.5.4.9.9 1.1 1.5.2.6.4 1.3.4 2.1 0 .9-.2 1.6-.6 2.3-.4.6-1 1.1-1.8 1.4.9.3 1.6.8 2.1 1.5.5.7.7 1.6.7 2.6 0 .8-.2 1.6-.5 2.2-.3.6-.8 1.1-1.4 1.5-.6.4-1.2.7-2 .9-.7.2-1.5.3-2.3.3H1V5.698h6.799zm-.5 5.9H4.5v3.8h2.9c.4 0 .8 0 1.2-.1.4-.1.7-.2 1-.4.3-.2.5-.4.7-.7.2-.3.2-.7.2-1.1 0-.9-.3-1.5-.8-1.9-.5-.4-1.2-.6-2.4-.6zm-.4-4.8H4.5v3.4h2.1c.8 0 1.4-.2 1.9-.5.4-.4.7-.9.7-1.7 0-.8-.2-1.4-.7-1.7-.5-.4-1.2-.5-1.6-.5zm10.9 9.5c.5.5 1.2.8 2.1.8.6 0 1.2-.2 1.6-.5.4-.3.7-.7.8-1h2.4c-.4 1.2-1 2-1.8 2.6-.8.6-1.8.8-2.9.8-.8 0-1.5-.1-2.1-.4-.6-.3-1.2-.6-1.6-1.1-.4-.5-.8-1.1-1-1.7-.2-.7-.3-1.4-.3-2.1 0-.8.1-1.5.4-2.1.2-.7.6-1.2 1-1.7.4-.5 1-.9 1.6-1.1.6-.3 1.3-.4 2-.4.8 0 1.6.2 2.2.5.6.3 1.1.8 1.5 1.4.4.6.7 1.2.8 2 .2.7.2 1.5.1 2.3H17c0 .9.3 1.7.8 2.2zm3.7-5.3c-.4-.4-1-.6-1.8-.6-.5 0-.9.1-1.2.3-.3.2-.6.4-.8.7-.2.3-.3.5-.4.8-.1.3-.1.5-.1.8h5.1c-.1-.9-.4-1.6-.8-2zm-6.7-5.3h6.1v1.5H15.3V6.7z" />
                    </svg>
                    Behance
                  </span>
                  <span>↗</span>
                </a>
              </li>
              <li className={styles.socialItem}>
                <a href="https://dribbble.com/hypetf" target="_blank" rel="noreferrer">
                  <span className={styles.socialLabelContainer}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0zm8.046 6.253a10.04 10.04 0 0 1 2.083 5.856c-.26-.052-2.836-.577-5.43-.25-.063-.13-.12-.26-.187-.39-.176-.38-.376-.77-.573-1.14 2.9-1.188 4.23-2.9 4.107-4.076zM12 2.003a10.02 10.02 0 0 1 6.51 2.4c-.156 1.043-1.34 2.64-4.11 3.696a33.97 33.97 0 0 0-3.02-4.73A9.896 9.896 0 0 1 12 2.003zm-2.535.435a33.54 33.54 0 0 1 3.053 4.68 29.47 29.47 0 0 1-7.36.936A10.065 10.065 0 0 1 9.465 2.44zM2.003 12a10.026 10.026 0 0 1 .26-2.3c.26.01 3.53.075 7.29-.8.208.396.39.8.573 1.193-3.14 1.14-5.18 4.02-5.45 4.44A10.004 10.004 0 0 1 2.003 12zm2.87 5.57c.178-.365 1.676-3.114 5.11-4.47a26.43 26.43 0 0 1 2.033 5.58 10.044 10.044 0 0 1-7.173-1.1zm9.12 1.48a25.6 25.6 0 0 0-1.91-5.376c1.26-.2 4.374.1 6.01 2.22a10.024 10.024 0 0 1-4.1 3.157zM19.635 14c-.26-1.47-1.59-3.78-5.334-4.28.177-.43.343-.87.5-1.3 2.746-.35 5.447.207 5.707.26-.013 1.978-.666 3.8-1.873 5.32z" />
                    </svg>
                    Dribbble
                  </span>
                  <span>↗</span>
                </a>
              </li>
              <li className={styles.socialItem}>
                <a href="https://codepen.io/hypetf" target="_blank" rel="noreferrer">
                  <span className={styles.socialLabelContainer}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 8.182l-.018-.087-.017-.05c-.01-.024-.018-.05-.03-.075l-.012-.025-.05-.074-.016-.024-.067-.08-.033-.032-.045-.04-.048-.036-.048-.024-.06-.03-.02-.008-.065-.015-.022-.007-.07-.01H1.586c-.024 0-.047.003-.07.01l-.022.006-.065.014-.02.008-.06.03-.048.024-.048.037-.045.04-.033.032-.067.08-.016.023-.05.075-.012.024-.03.075-.017.05-.018.087-.005.043v7.8l.005.044.018.086.017.05c.01.024.018.05.03.074l.012.025.05.075.016.024.067.08.033.032.045.04.048.037.048.023.06.031.02.008.065.015.022.007.07.01h20.628c.024 0 .047-.003.07-.01l.022-.006.065-.015.02-.008.06-.03.048-.023.048-.037.045-.04.033-.032.067-.08.016-.024.05-.075.012-.025.03-.074.017-.05.018-.086.005-.044v-7.8l-.005-.043zm-10.951 7.22v2.895l-5.05-3.175 2.443-1.533 2.607 1.813zm-4.298-3.187L5.766 9.51 12 5.725l6.233 3.785-6.17 4.705zm1.663 2.994l2.607-1.813 2.443 1.533-5.05 3.175V15.21zm8.89-1.574l-5.012-3.14 5.012-3.142V13.636zm-15.6-6.282l5.012 3.142-5.012 3.14V7.354z" />
                    </svg>
                    CodePen
                  </span>
                  <span>↗</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="reveal reveal-delay-1">
            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <div className={styles.interestGroupWrapper}>
                <div className={styles.formGroup}>
                  <label>{t('contact.labelInterest')}</label>
                  <div className={styles.topicTabs}>
                    <button 
                      type="button"
                      className={`${styles.topicTab} ${activeTopic === 'Hiring' ? styles.topicTabActive : ''}`} 
                      onClick={() => handleTopicChange('Hiring')}
                    >
                      {t('contact.hiring')}
                    </button>
                    <button 
                      type="button"
                      className={`${styles.topicTab} ${activeTopic === 'Project' ? styles.topicTabActive : ''}`} 
                      onClick={() => handleTopicChange('Project')}
                    >
                      {t('contact.project')}
                    </button>
                    <button 
                      type="button"
                      className={`${styles.topicTab} ${activeTopic === 'Other' ? styles.topicTabActive : ''}`} 
                      onClick={() => handleTopicChange('Other')}
                    >
                      {t('contact.other')}
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">{t('contact.labelName')}</label>
                  <input 
                    type="text" 
                    id="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('contact.placeholderName')} 
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">{t('contact.labelEmail')}</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('contact.placeholderEmail')} 
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="subject">{t('contact.labelSubject')}</label>
                <input 
                  type="text" 
                  id="subject" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={getSubjectPlaceholder()} 
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">{t('contact.labelMessage')}</label>
                <textarea 
                  id="message" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t('contact.placeholderMessage')}
                ></textarea>
              </div>
              <button type="submit" className={styles.btnSubmit} disabled={loading}>
                {loading ? 'Sending...' : t('contact.btnSubmit')}
              </button>
              
              {success && (
                <div className={styles.formSuccess}>
                  {t('contact.successMessage')}
                </div>
              )}
              {error && (
                <div className={styles.formError} style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '12px' }}>
                  An error occurred while sending your message. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
