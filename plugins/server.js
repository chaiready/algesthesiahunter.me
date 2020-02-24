import Vue from 'vue'
import '@/plugins/filters'
import '@/plugins/directives'
// 需要在服务端的插件
import '@/plugins/svg.js'
import '@/components/global'

function pathLang(path, lang) {
  if (lang === 'zh') {
    return path
  } else {
    return `/${lang}${path}`
  }
}
const cdn = 'https://cdn.algesthesiahunter.top/'
Vue.prototype.cdn = cdn
Vue.prototype.getImgUrl = (img) => {
  if (/http/.test(img)) {
    return img
  } else {
    return cdn + img + '?x-oss-process=image/resize,m_lfit,w_600'
  }
}
Vue.prototype.pathLang = pathLang
