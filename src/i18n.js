import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en/translation.json';
import esTranslation from './locales/es/translation.json';
import deTranslation from './locales/de/translation.json';
import frTranslation from './locales/fr/translation.json';
import zhTranslation from './locales/zh/translation.json';
import ruTranslation from './locales/ru/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      es: { translation: esTranslation },
      de: { translation: deTranslation },
      fr: { translation: frTranslation },
      zh: { translation: zhTranslation },
      ru: { translation: ruTranslation }
    },
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false
    }
  });

// Sync <html lang> attribute with current language
i18n.on('languageChanged', (lng) => {
  document.documentElement.setAttribute('lang', lng);
});
// Set initial lang
document.documentElement.setAttribute('lang', i18n.language || 'en');

export default i18n;
