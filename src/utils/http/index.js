/*
 * @Description: axios封装，请求拦截，统一报错处理等
 */
import axios from 'axios'
import popCodeError from 'utils/http/pop-code-error'
import { showMessage } from 'utils/showMessage'
import router from '@/router'
// axios初始化配置
// 返回数据的格式，可选值为arraybuffer,blob,document,json,text,stream，默认值为json
export const resTypeHttp = responseType => {
  const o = {
    baseURL: process.env.VUE_APP_HTTP_HOST,
    timeout: 300000,
  }
  if (responseType) {
    o.responseType = responseType
  }
  const http = axios.create(o)

  http.interceptors.request.use(
    config => {
      // 在发送请求之前做某件事
      // 若是有做鉴权token , 就给头部带上token
      let token = localStorage.token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
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
      console.log(config)
      return config
    },
    err => Promise.reject(err)
  )

  // 对数据返回进行拦截
  http.interceptors.response.use(
    res => {
      if (res.data && res.data.status === 0) {
        // 失败
        if (res.data.code === 401) {
          showMessage('请重新登陆')
          /* 对未授权的处理 */
          localStorage.removeItem('token')
          router.push({ name: 'home' })
        }
        return Promise.reject(showMessage(res.data.message))
      }
      if (res.data && res.data.status === 1) {
        // 成功
        return res.data.data
      }
      return res.data // 兼容
    },
    err => {
      // 返回错误统一处理
      if (err.response && err.response.data) {
        popCodeError(err.response)
      } else {
        showMessage(String(err))
      }
      return Promise.reject(err)
    }
  )
  return http
}
export default resTypeHttp()
