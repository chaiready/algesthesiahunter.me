import http from 'utils/http'
import source from '@/markdown'
import sort from '@/utils/sort'
import MD5 from 'crypto-js/md5'
const state = {
  sourceData: [],
  sourceAttr: [],
  token: localStorage.token,
}

for (const [k, v] of source) {
  let l = v.size
  for (const [key, value] of v.entries()) {
    value.attributes.length = l
    state.sourceData.push(value)
    state.sourceAttr.push(value.attributes)
    state.sourceAttr = sort(state.sourceAttr, null, val => new Date(val.date))
  }
}
const mutations = {
  UPDATE_TOKEN(state, token) {
    state.token = token
    localStorage.token = token
  },
}
const actions = {
  getArticleDetail: ({ commit }, id) => {
    let arr = state.sourceData.filter(v => v.attributes.date === id)
    if (arr.length !== 0) {
      return arr[0]
    }
    return {}
  },

  getArticleByTag: ({ commit }, tag) =>
    state.sourceAttr.filter(v => v.tag === tag),

  getArticleByCategory: ({ commit }, category) =>
    state.sourceAttr.filter(v => v.category === category),
  getArticleByKeyword: ({ commit }, keyword) =>
    state.sourceAttr.filter(v => {
      return (
        v.category.includes(keyword) ||
        v.tag.includes(keyword) ||
        v.title.includes(keyword) ||
        v.des.includes(keyword)
      )
    }),
  getArticleByHot: ({ commit }) => state.sourceAttr.filter((v, i) => i <= 10),

  getArticleByEveryTag: ({ commit }) => {
    let o = {}
    state.sourceAttr.forEach(v => {
      if (!o[v.tag]) {
        o[v.tag] = v
      }
    })
    return Object.values(o)
  },
  login: ({ commit }, password) => {
    let code = MD5(password).toString()
    return http.post('/api/auth/login', { password: code }).then(res => {
      commit('UPDATE_TOKEN', res.token)
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
