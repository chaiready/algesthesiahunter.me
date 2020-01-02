/*
 * @Description:tag数据模块
 * @author: <https://github.com/algesthesiahunter>
 */
import { showMessage } from 'utils/showMessage'
import http from 'utils/http'

const state = {}

const mutations = {}

const actions = {
  getTags: ({ commit }) => http.get('/api/tag'),
  postTag: ({ commit }, name) =>
    http.post('/api/tag', { name }).then(() => showMessage('添加Tag成功')),
  deleteTag: ({ commit }, id) =>
    http.delete(`/api/tag/${id}`).then(() => showMessage('删除Tag成功')),
  putTag: ({ commit }, { id, params }) =>
    http.put(`/api/tag/${id}`, params).then(() => showMessage('修改Tag成功')),
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
