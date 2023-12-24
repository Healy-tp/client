import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { DEFAULT_LOCALE } from "../utils/constants";
import translationES from "./locales/es.json";

// the translations (could be managed separated from the code: https://react.i18next.com/guides/multiple-translation-files))
const resources = {
  es: {
    translation: translationES,
  },
};

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // passes i18n down to react-i18next
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    returnNull: false,
    debug: true,
    resources,
    fallbackLng: DEFAULT_LOCALE,
    interpolation: {
      escapeValue: false, // react is already safe from xss
    },
  });

export default i18n;
