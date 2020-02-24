import Vue from 'vue'
import '@/plugins/filters'
import '@/components/global'
import '@/plugins/directives'
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
    return cdn + img
  }
}
Vue.prototype.pathLang = pathLang
