import source from '@/markdown'
import sort from '@/utils/sort'
const state = {
  sourceData: [],
  sourceAttr: [],
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
const mutations = {}

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
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
