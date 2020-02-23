/*
 * @Description: announcement 数据模块
 * @author: <https://github.com/algesthesiahunter>
 */
import { showMessage } from '@/utils/show-message'

const state = () => ({})

const mutations = {}

const actions = {
  getAnnouncements({ commit }) {
    return this.$axios.$get('/api/announcement')
  },
  postAnnouncement({ commit }, content) {
    return this.$axios
      .$post('/api/announcement', { content })
      .then(() => showMessage('添加 announcement 成功'))
  },
  deleteAnnouncement({ commit }, id) {
    return this.$axios
      .$delete(`/api/announcement/${id}`)
      .then(() => showMessage('删除 announcement 成功'))
  },
  putAnnouncement({ commit }, { id, params }) {
    return this.$axios
      .$put(`/api/announcement/${id}`, params)
      .then(() => showMessage('修改 announcement 成功'))
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
