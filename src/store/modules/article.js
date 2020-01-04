/*
 * @Description:article数据模块
 * @author: <https://github.com/algesthesiahunter>
 */
import { showMessage } from 'utils/showMessage'
import http from 'utils/http'

const state = {
  home: [],
}

const mutations = {
  UPDATE_HOME(state, home) {
    state.home = home
  },
  UPDATE_MODE(state, mode) {
    state.mode = mode
  },
}

const actions = {
  getHomeArticles: ({ commit }, params) =>
    http
      .get('/api/article', { params })
      .then(res => commit('UPDATE_HOME', res.data)),
  getArticles: ({ commit }, params) => http.get('/api/article', { params }),
  getArticlesByDate: ({ commit }, params) =>
    http.get('/api/article/search/time', { params }),
  getArticleDetail: ({ commit }, id) => http.get(`/api/article/${id}`),
  postArticle: ({ commit }, article) =>
    http
      .post('/api/article', article)
      .then(() => showMessage('添加Article成功')),
  deleteArticle: ({ commit }, id) =>
    http
      .delete(`/api/article/${id}`)
      .then(() => showMessage('删除Article成功')),
  putArticle: ({ commit }, { id, params }) =>
    http
      .put(`/api/article/${id}`, params)
      .then(() => showMessage('修改Article成功')),
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
