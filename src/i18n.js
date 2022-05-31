import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importing translation files
import traductionDE from "./lang/de/traduction.json";
import traductionEN from "./lang/en/traduction.json";
import traductionFR from "./lang/fr/traduction.json";
import traductionIT from "./lang/it/traduction.json";
import traductionZH from "./lang/zh/traduction.json";

// Creating object with the variables of imported translation files
const resources = {
    de: { traduction: traductionDE },
    en: { traduction: traductionEN },
    fr: { traduction: traductionFR },
    it: { traduction: traductionIT },
    zh: { traduction: traductionZH },
};

// i18N Initialization
i18n.use(initReactI18next).init({
    resources,
    lng: "en", // default language
    keySeparator: false,
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
