import Vue from 'vue'
import '@/plugins/filters'
import '@/components/global'
function pathLang(path, lang) {
  if (lang === 'zh') {
    return path
  } else {
    return `/${lang}${path}`
  }
}
Vue.prototype.cdn = 'https://cdn.algesthesiahunter.top/'
Vue.prototype.pathLang = pathLang
