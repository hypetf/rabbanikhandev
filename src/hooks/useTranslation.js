import useLanguageStore from '../stores/languageStore';

export const useTranslation = () => {
  const {
    language,
    getTranslation,
    getCurrentTranslations,
    setLanguage,
    toggleLanguage,
    getCurrentLanguage
  } = useLanguageStore();

  return {
    language,
    t: getTranslation, // Short alias for getTranslation
    getTranslation,
    getCurrentTranslations,
    setLanguage,
    toggleLanguage,
    getCurrentLanguage
  };
}; 