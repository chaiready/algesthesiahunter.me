import Vue from 'vue'
const files = require.context('./modules', false, /\.vue$/)
const modules = {}
files.keys().forEach((key) => {
  if (key === './index.js') {
    return
  }
  modules[key.replace(/(\.\/|\.vue)/g, '')] = files(key).default
})

const Components = {
  install() {
    for (const key in modules) {
      Vue.component(key, modules[key])
    }
  },
}
Vue.use(Components)
