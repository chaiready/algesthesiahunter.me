import Vue from 'vue'
import { showMessage } from '@/utils/show-message'
import '@/plugins/swiper'
import '@/plugins/pop-confirm'
import '@/plugins/img-pop'
import 'gitalk/dist/gitalk.css'
Vue.prototype.showMessage = showMessage
export default function({ store }) {
  store.dispatch('common/browserInit')
}
