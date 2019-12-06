const state = {}

const mutations = {
  GETARTICLEDETAIL(state, params) {
    state.article = state.sourceDate.filter(
      v => v.attributes.date === params.id
    )[0]
  },
}

const actions = {
  getArticleDetail: ({ commit }, params) => {
    commit('GETARTICLEDETAIL', params)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
