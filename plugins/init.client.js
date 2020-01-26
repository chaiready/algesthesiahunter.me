import Vue from 'vue'
import { showMessage } from '@/utils/show-message'
import '@/plugins/swiper'
import '@/plugins/directives'
import '@/plugins/marked'
import '@/plugins/svg'
import '@/plugins/pop-confirm'
import '@/plugins/img-pop'
import '@/components/global'
Vue.prototype.showMessage = showMessage

export default function({ store, redirect, route, app }) {
  store.dispatch('common/browserInit')
}
