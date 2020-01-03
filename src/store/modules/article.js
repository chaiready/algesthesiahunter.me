/*
 * @Description:article数据模块
 * @author: <https://github.com/algesthesiahunter>
 */
import { showMessage } from 'utils/showMessage'
import http from 'utils/http'

const state = {}

const mutations = {}

const actions = {
  getArticles: ({ commit }, params) => http.get('/api/article', { params }),
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
