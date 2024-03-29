/*
 * @Description:tag数据模块
 * @author: <https://github.com/algesthesiahunter>
 */
import { showMessage } from '@/utils/show-message'

const state = () => ({
  tags: [],
})

const mutations = {
  UPDATE_TAGS(state, tags) {
    state.tags = tags
  },
}

const actions = {
  getTags({ commit }) {
    return this.$axios.$get('/api/tag').then((tags) => {
      commit('UPDATE_TAGS', tags)
    })
  },
  postTag({ commit }, name) {
    return this.$axios
      .$post('/api/tag', { name })
      .then(() => showMessage('添加Tag成功'))
  },
  deleteTag({ commit }, id) {
    return this.$axios
      .$delete(`/api/tag/${id}`)
      .then(() => showMessage('删除Tag成功'))
  },
  putTag({ commit }, { id, params }) {
    return this.$axios
      .$put(`/api/tag/${id}`, params)
      .then(() => showMessage('修改Tag成功'))
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
