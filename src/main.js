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
Vue.prototype.showMessage = showMessage
Vue.config.productionTip = false
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created() {
    console.log(123)
  },
}).$mount('#app')
