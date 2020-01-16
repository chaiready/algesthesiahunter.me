/*
 * @Description:提示信息组件
 * @author: <https://github.com/algesthesiahunter>
 */
import { fadeIn } from '@/utils/animation'
import { isBrowser } from '@/config/env'
export function showMessage(content) {
  if (isBrowser) {
    const div = document.createElement('div')
    div.innerHTML = `<div class="esa-layer"><span class="esa-layer-content">${content}</span></div>`
    document.body.appendChild(div)
    const layers = document.getElementsByClassName('esa-layer')
    const layer = layers[layers.length - 1]
    fadeIn(layer)
    setTimeout(() => {
      document.body.removeChild(div)
    }, 2000)
  }
}

if (isBrowser) {
  window.utils = window.utils || {}
  window.utils.showMessage = showMessage
}
