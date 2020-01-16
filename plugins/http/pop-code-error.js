/*
 * @Description: 针对http的错误码报错
 */
import { showMessage } from '@/utils/show-message'
function popError(res, store) {
  if (!res.message) {
    // 后端报错返回空
    if (window.navigator.onLine) {
      // 有网报通用错误
      showMessage('没有可用的服务实例，请稍后重试')
    } else {
      // 没网
      showMessage('请求超时，请确保本地网络和服务器网络连接畅通')
    }
    return
  }
  const code = res.code
  // 401重新登录
  if (code === 401) {
    /* 对未授权的处理 */
    store.dispatch('common/logout')
    return
  }
  const message = res.message.message || res.message
  if (message) {
    showMessage(message)
    return
  }
  // 针对后端返回code的object
  switch (code) {
    case 502:
      showMessage('没有可用的服务实例，请稍后重试')
      break
    case 500:
      showMessage('服务器出错了，请稍后再试')
      break
    case 404:
      showMessage('未找到对应资源，请稍后再试')
      break
    case 403:
      showMessage('请求因权限原因被禁止')
      break
    case 400:
      showMessage('请求参数错误，请确认后重试')
      break
    default:
      showMessage('服务器出错了，请稍后再试')
      break
  }
}
export default popError
