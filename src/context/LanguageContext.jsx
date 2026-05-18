import React, { createContext, useContext, useState, useEffect } from 'react';
import translations from '../translations.json';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState('en');
  const [loading, setLoading] = useState(true);

  const setLanguage = (lang) => {
    if (translations[lang]) {
      setLanguageState(lang);
      localStorage.setItem('portfolio_lang', lang);
      document.documentElement.lang = lang;
    }
  };

  useEffect(() => {
    const detectLanguage = async () => {
      // 1. Check if user already has a saved preference
      const savedLang = localStorage.getItem('portfolio_lang');
      if (savedLang && translations[savedLang]) {
        setLanguage(savedLang);
        setLoading(false);
        return;
      }

      // 2. Check system/browser language settings
      const systemLanguages = navigator.languages || [navigator.language];
      for (const sysLang of systemLanguages) {
        const lowerLang = sysLang.toLowerCase();
        if (lowerLang.startsWith('zh')) {
          setLanguage('zh');
          setLoading(false);
          return;
        }
        if (lowerLang.startsWith('it')) {
          setLanguage('it');
          setLoading(false);
          return;
        }
      }

      // 3. Check timezone settings (fast offline heuristic)
      try {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (timeZone) {
          const lowerTZ = timeZone.toLowerCase();
          if (lowerTZ.includes('rome') || lowerTZ.includes('europe/rome')) {
            setLanguage('it');
            setLoading(false);
            return;
          }
          if (
            lowerTZ.includes('shanghai') ||
            lowerTZ.includes('chongqing') ||
            lowerTZ.includes('harbin') ||
            lowerTZ.includes('urumqi') ||
            lowerTZ.includes('taipei') ||
            lowerTZ.includes('hong_kong') ||
            lowerTZ.includes('macau') ||
            lowerTZ.includes('singapore')
          ) {
            setLanguage('zh');
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.warn('Timezone detection failed:', e);
      }

      // 4. Geolocation fallback via IP API (non-blocking async)
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (response.ok) {
          const data = await response.json();
          const country = data.country_code?.toUpperCase();
          if (country === 'IT') {
            setLanguage('it');
            setLoading(false);
            return;
          }
          if (['CN', 'TW', 'HK', 'MO', 'SG'].includes(country)) {
            setLanguage('zh');
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn('IP Geolocation API failed:', err);
      }

      // 5. Default fallback to English
      setLanguage('en');
      setLoading(false);
    };

    detectLanguage();
  }, []);

  const t = (key) => {
    const keys = key.split('.');
    let result = translations[language];
    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k];
      } else {
        // Fallback to English
        let fallback = translations['en'];
        for (const fk of keys) {
          if (fallback && fallback[fk] !== undefined) {
            fallback = fallback[fk];
          } else {
            return key; // return key if not found at all
          }
        }
        return fallback;
      }
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, loading }}>
      {children}
    </LanguageContext.Provider>
  );
};
