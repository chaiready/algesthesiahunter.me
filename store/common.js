/*
 * @Description:通用数据模块
 * @author: <https://github.com/algesthesiahunter>
 */
import MD5 from 'crypto-js/md5'
import { showMessage } from '@/utils/show-message'
const state = () => ({
  token: null,
  title: null,
  mode: 0,
  lang: 'zh',
  theme: 'dark',
})
const mutations = {
  UPDATE_TOKEN(state, token) {
    state.token = token
    localStorage.token = token
  },
  UPDATE_MODE(state, mode) {
    const res = mode + '' === 'true'
    localStorage.mode = res
    state.mode = res
  },
  UPDATE_LANG(state, lang) {
    const res = lang === 'en' ? 'en' : 'zh'
    localStorage.lang = res
    state.lang = res
    this.$i18n.locale = res
  },
  UPDATE_TITLE(state, title) {
    state.title = title
    this.app.head.title = title
  },
  UPDATE_THEME(state, theme) {
    const res = theme === 'default' ? 'default' : 'dark'
    document.body.classList.remove('default', 'dark')
    document.body.classList.add(res)
    localStorage.theme = res
    state.theme = res
  },
}
const actions = {
  browserInit({ commit }) {
    const { token, mode, lang, theme } = localStorage
    commit('UPDATE_TOKEN', token)
    commit('UPDATE_MODE', mode)
    commit('UPDATE_LANG', lang)
    commit('UPDATE_THEME', theme)
  },
  logout: ({ commit }) => {
    commit('UPDATE_TOKEN', null)
    showMessage('请重新登陆')
  },
  login({ commit }, password) {
    const code = MD5(password).toString()
    return this.$axios
      .$post('/api/auth/login', { password: code })
      .then((res) => {
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
  updateTitle({ commit }, title) {
    commit('UPDATE_TITLE', title)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
