/*
 * @Description:通用数据模块
 * @author: <https://github.com/algesthesiahunter>
 */
import http from 'utils/http'
import MD5 from 'crypto-js/md5'
import { showMessage } from 'utils/showMessage'
const { token, mode, lang, theme } = localStorage
const state = {
  token: token ? token : null,
  mode: mode ? mode : false,
  lang: lang ? lang : 'zh',
  theme: theme ? theme : 'dark',
}
const mutations = {
  UPDATE_TOKEN(state, token) {
    state.token = token
    localStorage.token = token
  },
  UPDATE_MODE(state, mode) {
    localStorage.mode = mode
    state.mode = mode
  },
  UPDATE_LANG(state, lang) {
    localStorage.lang = lang
    state.lang = lang
  },
  UPDATE_THEME(state, theme) {
    localStorage.theme = theme
    state.theme = theme
  },
}
const actions = {
  loginOut: ({ commit }) => {
    commit('UPDATE_TOKEN', null)
    showMessage('请重新登陆')
  },
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
  updateLang({ commit }, lang) {
    commit('UPDATE_LANG', lang)
  },
  updateTheme({ commit }, theme) {
    commit('UPDATE_THEME', theme)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
