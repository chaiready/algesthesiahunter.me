import Vue from 'vue'
import i18n from '@/lang'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/base.scss'
import '@/icons'
import '@/components/global'
import '@/assets/markdown.theme.scss'
import { showMessage } from '@/utils/showMessage'
import '@/utils/imgPopup'
Vue.prototype.showMessage = showMessage
Vue.prototype.cdn = 'http://q2otndneo.bkt.clouddn.com/'
window.cdn = 'http://q2otndneo.bkt.clouddn.com/'
Vue.config.productionTip = false
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
