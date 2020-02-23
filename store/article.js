/*
 * @Description:article数据模块
 * @author: <https://github.com/algesthesiahunter>
 */
import { showMessage } from '@/utils/show-message'

const state = () => ({
  origin: ['original', 'reprint', 'hybrid'],
})

const mutations = {}

const actions = {
  getHomeArticles({ commit }, params) {
    return this.$axios.$get('/api/article', { params })
  },
  getHotArticles({ commit }) {
    return this.$axios.$get('/api/article/hot')
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
