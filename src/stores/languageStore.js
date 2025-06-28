import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import translations from '../assets/translations.json';

const LANGUAGE_KEY = 'portfolio_language';

// Function to detect user's language based on location
const detectUserLanguage = () => {
  try {
    // Check if user has a saved preference
    const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'it')) {
      return savedLanguage;
    }

    // Try to detect from browser language
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('it')) {
      return 'it';
    }

    // Try to detect from timezone (Italy is in Europe/Rome timezone)
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timezone === 'Europe/Rome' || timezone.includes('Italy')) {
      return 'it';
    }

    // Default to English
    return 'en';
  } catch (error) {
    console.warn('Error detecting language:', error);
    return 'en';
  }
};

const useLanguageStore = create(
  persist(
    (set, get) => ({
      language: detectUserLanguage(),
      translations: translations,
      
      // Get current language translations
      getCurrentTranslations: () => {
        const { language, translations } = get();
        return translations[language] || translations.en;
      },
      
      // Get a specific translation key
      getTranslation: (key) => {
        const { language, translations } = get();
        const currentTranslations = translations[language] || translations.en;
        
        // Support nested keys like 'nav.aboutMe'
        const keys = key.split('.');
        let value = currentTranslations;
        
        for (const k of keys) {
          if (value && typeof value === 'object' && k in value) {
            value = value[k];
          } else {
            // Fallback to English if key not found
            value = translations.en;
            for (const fallbackKey of keys) {
              if (value && typeof value === 'object' && fallbackKey in value) {
                value = value[fallbackKey];
              } else {
                return key; // Return the key itself if not found
              }
            }
            break;
          }
        }
        
        return value || key;
      },
      
      // Change language
      setLanguage: (newLanguage) => {
        if (newLanguage === 'en' || newLanguage === 'it') {
          set({ language: newLanguage });
        }
      },
      
      // Toggle between languages
      toggleLanguage: () => {
        const { language } = get();
        const newLanguage = language === 'en' ? 'it' : 'en';
        set({ language: newLanguage });
      },
      
      // Get current language code
      getCurrentLanguage: () => {
        return get().language;
      }
    }),
    {
      name: LANGUAGE_KEY,
      partialize: (state) => ({ language: state.language }),
    }
  )
);

export default useLanguageStore; 