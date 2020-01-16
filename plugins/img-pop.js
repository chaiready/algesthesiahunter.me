/*
 * @Description:图片点击上遮罩图片放大
 * @author: <https://github.com/algesthesiahunter>
 */
// 销毁图片弹窗
const delImgPopup = () => {
  const mask = document.getElementById('image-popup')
  if (mask) {
    window.onscroll = null
    mask.setAttribute('class', '')
    document.body.removeChild(mask)
  }
}

// 打开图片弹窗
const addImgPopup = (src, className) => {
  if (!src) {
    return false
  }
  const image = document.createElement('img')
  image.src = src

  const oldMask = document.getElementById('image-popup')
  if (oldMask) {
    document.body.removeChild(oldMask)
  }
  const mask = document.createElement('div')
  mask.setAttribute('id', 'image-popup')
  mask.appendChild(image)
  document.body.appendChild(mask)
  setTimeout(() => {
    mask.setAttribute('class', 'display')
  }, 10)

  // 监听滚动和点击事件
  window.onscroll = delImgPopup
  mask.onclick = delImgPopup
}

window.utils = window.utils || {}
window.utils.addImgPopup = addImgPopup
window.utils.delImgPopup = delImgPopup
window.cdn = 'http://q2otndneo.bkt.clouddn.com/'
