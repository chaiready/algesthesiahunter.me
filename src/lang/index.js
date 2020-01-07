import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './config/i18n.config'
import store from '@/store'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: store.state.common.lang,
  messages,
})
export default i18n
