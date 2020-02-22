import Vue from 'vue'
import { showMessage } from '@/utils/show-message'
import '@/plugins/swiper'
import '@/plugins/directives'
import '@/components/global'
import '@/plugins/svg'
import '@/plugins/pop-confirm'
import '@/plugins/img-pop'
Vue.prototype.showMessage = showMessage
export default function({ store }) {
  store.dispatch('common/browserInit')
  store.dispatch('article/getHotArticles')
}
