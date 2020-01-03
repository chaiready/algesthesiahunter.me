/*
 * @Description:通用数据模块
 * @author: <https://github.com/algesthesiahunter>
 */
import http from 'utils/http'
import MD5 from 'crypto-js/md5'
import { showMessage } from 'utils/showMessage'
const state = {
  mode: true,
  token: localStorage.token,
}
const mutations = {
  UPDATE_TOKEN(state, token) {
    state.token = token
    localStorage.token = token
  },
  UPDATE_MODE(state, mode) {
    state.mode = mode
  },
}
const actions = {
  login: ({ commit }, password) => {
    let code = MD5(password).toString()
    return http.post('/api/auth/login', { password: code }).then(res => {
      commit('UPDATE_TOKEN', res.token)
      showMessage('管理员登录成功')
    })
  },
  updateMode({ commit }, mode) {
    commit('UPDATE_MODE', mode)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
