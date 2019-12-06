import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './config/i18n.config'
export const getLocale = () => {
  if (localStorage.lang) {
    return localStorage.lang
  }
  return 'zh'
}
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: getLocale(),
  messages,
})
export default i18n
