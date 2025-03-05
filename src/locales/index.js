import { createI18n } from "vue-i18n";
const en = require("./en.json");
const vi = require("./vi.json");

const i18n = createI18n({
  locale: "en", // Mặc định là English
  fallbackLocale: "en",
  messages: { en, vi },
});

export default i18n;
