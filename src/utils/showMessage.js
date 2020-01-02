/*
 * @Description:提示信息组件
 * @author: <https://github.com/algesthesiahunter>
 */
import { fadeIn } from '@/utils/animation'
export function showMessage(content) {
  let div = document.createElement('div')
  div.innerHTML = `<div class="esa-layer"><span class="esa-layer-content">${content}</span></div>`
  document.body.appendChild(div)
  let layers = document.getElementsByClassName('esa-layer')
  let layer = layers[layers.length - 1]
  fadeIn(layer)
  setTimeout(() => {
    document.body.removeChild(div)
  }, 2000)
}
