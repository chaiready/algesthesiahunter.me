/*
 * @Description:category数据模块
 * @author: <https://github.com/algesthesiahunter>
 */
import { showMessage } from '@/utils/show-message'
const state = () => ({
  categorys: [],
})

const mutations = {
  UPDATE_CATEGORY(state, categorys) {
    state.categorys = categorys
  },
}

const actions = {
  getCategorys({ commit }) {
    return this.$axios.$get('/api/category').then((categorys) => {
      commit('UPDATE_CATEGORY', categorys)
    })
  },
  postCategory({ commit }, name) {
    return this.$axios
      .$post('/api/category', { name })
      .then(() => showMessage('添加category成功'))
  },
  deleteCategory({ commit }, id) {
    return this.$axios
      .$delete(`/api/category/${id}`)
      .then(() => showMessage('删除category成功'))
  },
  putCategory({ commit }, { id, params }) {
    return this.$axios
      .$put(`/api/category/${id}`, params)
      .then(() => showMessage('修改category成功'))
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
