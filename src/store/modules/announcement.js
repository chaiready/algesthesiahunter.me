/*
 * @Description: announcement 数据模块
 * @author: <https://github.com/algesthesiahunter>
 */
import { showMessage } from 'utils/showMessage'
import http from 'utils/http'

const state = {
  announcements: [],
}

const mutations = {
  UPDATE_ANNOUNCEMENT(state, announcement) {
    state.announcements = announcement
  },
}

const actions = {
  getAnnouncements: ({ commit }) =>
    http.get('/api/announcement').then(announcement => {
      commit('UPDATE_ANNOUNCEMENT', announcement)
    }),
  postAnnouncement: ({ commit }, content) =>
    http
      .post('/api/announcement', { content })
      .then(() => showMessage('添加 announcement 成功')),
  deleteAnnouncement: ({ commit }, id) =>
    http
      .delete(`/api/announcement/${id}`)
      .then(() => showMessage('删除 announcement 成功')),
  putAnnouncement: ({ commit }, { id, params }) =>
    http
      .put(`/api/announcement/${id}`, params)
      .then(() => showMessage('修改 announcement 成功')),
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
