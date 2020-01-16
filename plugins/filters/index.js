import Vue from 'vue'
const files = require.context('./', true, /\.js$/)
const filters = {}
files.keys().forEach(key => {
  if (key === './index.js') {
    return
  }
  filters[key.replace(/(\.\/\w*|\.js|\/)/g, '')] = files(key).default
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
