import React, { useState, useEffect, useRef } from 'react';
import TransitionOverlay from './TransitionOverlay';
import styles from './Contacts.module.css';
import instagram from '../../assets/instagram.svg';
import github from '../../assets/github.svg';
import codepen from '../../assets/codepen.svg';
import linkedin from '../../assets/linkedin.svg';
import paperclip from '../../assets/paperclip.svg';
import { useTranslation } from '../../hooks/useTranslation';

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

export default function Contacts() {
  const [showTransition, setShowTransition] = useState(false);
  const [showMain, setShowMain] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const sectionRef = useRef();
  const triggeredRef = useRef(false);
  const [tab, setTab] = useState('Hiring');
  const [attachment, setAttachment] = useState(null);
  const fileInputRef = useRef();
  const turnstileRef = useRef();
  const { t } = useTranslation();

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');

  const handleTextareaChange = (e) => {
    const value = e.target.value;
    setCharCount(value.length);
    setForm(f => ({ ...f, message: value }));
    if (errors.message) {
      setErrors(errs => ({ ...errs, message: undefined }));
    }
  };

  const handleInputChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(errs => ({ ...errs, [e.target.name]: undefined }));
    }
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

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = t('contact.nameRequired');
    if (!form.email.trim()) errs.email = t('contact.emailRequired');
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = t('contact.invalidEmail');
    if (!form.message.trim()) errs.message = t('contact.messageRequired');
    if (form.message.length > 500) errs.message = t('contact.messageTooLong');
    if (!turnstileToken) errs.turnstile = t('contact.captchaRequired');
    return errs;
  };

  const handleTurnstileCallback = (token) => {
    setTurnstileToken(token);
    if (errors.turnstile) {
      setErrors(errs => ({ ...errs, turnstile: undefined }));
    }
  };

  const handleTurnstileExpired = () => {
    setTurnstileToken('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitError('');
    setSuccess(false);
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    const start = Date.now();
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('message', form.message);
      formData.append('tab', tab);
      formData.append('turnstileToken', turnstileToken);
      if (attachment) formData.append('attachment', attachment);
      const res = await fetch('https://numerous-dulci-hypetf-b9146aa8.koyeb.app/api/contact', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || t('contact.failedToSend'));
      const elapsed = Date.now() - start;
      if (elapsed < 2000) await new Promise(r => setTimeout(r, 2000 - elapsed));
      setSuccess(true);
      setForm({ name: '', email: '', message: '' });
      setAttachment(null);
      setCharCount(0);
      setTurnstileToken('');
      // Reset Turnstile widget
      if (window.turnstile && turnstileRef.current) {
        window.turnstile.reset(turnstileRef.current);
      }
    } catch (err) {
      if (err.name === 'TypeError' || err.message === 'Failed to fetch') {
        setSubmitError(t('contact.somethingWentWrong'));
      } else {
        setSubmitError(err.message || t('contact.failedToSend'));
      }
      // Reset Turnstile on error
      if (window.turnstile && turnstileRef.current) {
        window.turnstile.reset(turnstileRef.current);
      }
      setTurnstileToken('');
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    if (!showMain) return;
    const renderTurnstile = () => {
      if (window.turnstile && turnstileRef.current) {
        window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: handleTurnstileCallback,
          'expired-callback': handleTurnstileExpired,
        });
      }
    };
    if (window.turnstile) {
      renderTurnstile();
    } else {
      const checkTurnstile = setInterval(() => {
        if (window.turnstile) {
          clearInterval(checkTurnstile);
          renderTurnstile();
        }
      }, 100);
      setTimeout(() => clearInterval(checkTurnstile), 10000);
    }
  }, [showMain]);

  return (
    <section className={styles.contacts} ref={sectionRef}>
      {showTransition && !showMain && (
        <TransitionOverlay onComplete={() => setShowTransition(false)} />
      )}
      {showMain && (
        <div className={styles.contactsContent}>
          <div className={styles.contactsLeft}>
            <h2>{t('contact.title')}</h2>
            <div className="bigText">
              <span className={styles.bigText}>{t('contact.letsWorkTogether')}</span>
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
            <p id={styles.formTitle}>{t('contact.interestedIn')}</p>
            <div className={styles.formTabs}>
              {[
                { key: 'Hiring', label: t('contact.hiring') },
                { key: 'Project', label: t('contact.project') },
                { key: 'Other', label: t('contact.other') }
              ].map(({ key, label }) => (
                <button
                  key={key}
                  className={styles.formTab + (tab === key ? ' ' + styles.active : '')}
                  onClick={() => setTab(key)}
                  type="button"
                >
                  {label}
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmit} aria-live="polite" noValidate>
              <div className={styles.formGroup}>
                <label htmlFor="contact-name" className={styles.visuallyHidden}>{t('contact.yourName')}</label>
                <input
                  className={styles.formInput}
                  type="text"
                  id="contact-name"
                  name="name"
                  placeholder={t('contact.yourName')}
                  value={form.name}
                  onChange={handleInputChange}
                  required
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && <span className={styles.error} id="name-error">{errors.name}</span>}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="contact-email" className={styles.visuallyHidden}>{t('contact.yourEmail')}</label>
                <input
                  className={styles.formInput}
                  type="email"
                  id="contact-email"
                  name="email"
                  placeholder={t('contact.yourEmail')}
                  value={form.email}
                  onChange={handleInputChange}
                  required
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && <span className={styles.error} id="email-error">{errors.email}</span>}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="contact-message" className={styles.visuallyHidden}>{t('contact.yourMessage')}</label>
                <textarea
                  className={styles.formTextarea}
                  id="contact-message"
                  name="message"
                  placeholder={t('contact.yourMessage')}
                  maxLength={500}
                  value={form.message}
                  onChange={handleTextareaChange}
                  required
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                <span className={styles.charCount}>{charCount}/500</span>
                {errors.message && <span className={styles.error} id="message-error">{errors.message}</span>}
              </div>
              <div
                className={styles.formAttach + (attachment ? ' ' + styles.attachmentSelected : '')}
                onClick={!attachment ? handleAttachmentClick : undefined}
                style={{cursor: attachment ? 'default' : 'pointer'}}
              >
                {!attachment && (
                  <>
                    <img src={paperclip} alt="Attach file" className={styles.paperclipIcon} />
                    <span className={styles.attachText}>{t('contact.addAttachment')}</span>
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
              <div className={styles.formGroup}>
                <div 
                  ref={turnstileRef}
                  className="cf-turnstile"
                ></div>
                {errors.turnstile && <span className={styles.error}>{errors.turnstile}</span>}
              </div>
              
              <button className={styles.formSend} type="submit" disabled={loading} aria-busy={loading}>
                {loading ? <span className={styles.loader}></span> : t('contact.sendMessage')}
              </button>
              
              {success && <div className={styles.successMsgCentered} role="status">{t('contact.messageSent')}</div>}
              {submitError && <div className={styles.error} role="alert">{submitError}</div>}
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
