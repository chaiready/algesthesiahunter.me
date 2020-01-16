/*
 * @Description: axios封装，请求拦截，统一报错处理等
 */
import popCodeError from '@/plugins/http/pop-code-error'
import { showMessage } from '@/utils/show-message'
export default function({ $axios, store }) {
  $axios.onRequest((config) => {
    // 在发送请求之前做某件事
    // 若是有做鉴权token , 就给头部带上token
    const token = store.state.common.token
    if (token) {
      config.headers.common.Authorization = `Bearer ${token}`
    }
    // 删除垃圾数据
    if (config.params) {
      for (const k in config.params) {
        if (
          config.params[k] === undefined ||
          config.params[k] === '' ||
          config.params[k] === null
        ) {
          Reflect.deleteProperty(config.params, k)
        }
      }
    }
  })

  $axios.onResponse((res) => {
    if (res.data && res.data.status === 0) {
      // 失败
      if (res.data.code === 401) {
        showMessage('请重新登陆')
        /* 对未授权的处理 */
        store.dispatch('common/logout')
      }
      // showMessage(res.data.message)
      return Promise.reject(res.data)
    }
    if (res.data && res.data.status === 1) {
      // 成功
      // return res.data.data
      return res.data // 傻叉官方故作聪明这里删了个.data，我他吗找了好久，去他娘的
    }
    return res.data // 兼容
  })

  $axios.onError((err) => {
    // 返回错误统一处理
    if (err.response && err.response.data) {
      popCodeError(err.response.data, store)
      return Promise.reject(err)
    } else {
      popCodeError(err, store)
      return Promise.reject(err)
    }
  })
}
