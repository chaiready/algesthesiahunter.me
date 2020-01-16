/*
 * @Description:article数据模块
 * @author: <https://github.com/algesthesiahunter>
 */
import { showMessage } from '@/utils/show-message'

const state = () => ({
  home: [],
})

const mutations = {
  UPDATE_HOME(state, home) {
    state.home = home
  },
}

const actions = {
  getHomeArticles({ commit }, params) {
    return this.$axios
      .$get('/api/article', { params })
      .then(res => commit('UPDATE_HOME', res.data))
  },

  getArticles({ commit }, params) {
    return this.$axios.$get('/api/article', { params })
  },

  getArticlesByDate({ commit }, params) {
    return this.$axios.$get('/api/article/search/time', { params })
  },
  getArticleDetail({ commit }, id) {
    return this.$axios.$get(`/api/article/${id}`)
  },
  postArticle({ commit }, article) {
    return this.$axios
      .$post('/api/article', article)
      .then(() => showMessage('添加Article成功'))
  },
  deleteArticle({ commit }, id) {
    return this.$axios
      .$delete(`/api/article/${id}`)
      .then(() => showMessage('删除Article成功'))
  },
  putArticle({ commit }, { id, params }) {
    return this.$axios
      .$put(`/api/article/${id}`, params)
      .then(() => showMessage('修改Article成功'))
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
