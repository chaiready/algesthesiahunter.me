/*
 * @Description:category数据模块
 * @author: <https://github.com/algesthesiahunter>
 */
import { showMessage } from 'utils/showMessage'
import http from 'utils/http'
import { addRoutesByCategorys } from '@/router'
const state = {
  categorys: [],
}

const mutations = {
  UPDATE_CATEGORY(state, categorys) {
    state.categorys = categorys
    addRoutesByCategorys(categorys)
  },
}

const actions = {
  getCategorys: ({ commit }) =>
    http.get('/api/category').then(categorys => {
      commit('UPDATE_CATEGORY', categorys)
    }),
  postCategory: ({ commit }, name) =>
    http
      .post('/api/category', { name })
      .then(() => showMessage('添加category成功')),
  deleteCategory: ({ commit }, id) =>
    http
      .delete(`/api/category/${id}`)
      .then(() => showMessage('删除category成功')),
  putCategory: ({ commit }, { id, params }) =>
    http
      .put(`/api/category/${id}`, params)
      .then(() => showMessage('修改category成功')),
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
