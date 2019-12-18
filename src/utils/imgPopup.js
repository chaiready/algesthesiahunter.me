// 销毁图片弹窗
const delImgPopup = () => {
  const mask = document.getElementById('image-popup')
  if (mask) {
    window.onscroll = null
    mask.setAttribute('class', '')
    setTimeout(() => {
      if (mask) {
        document.body.removeChild(mask)
      }
    }, 350)
  }
}

// 打开图片弹窗
const addImgPopup = (src, className) => {
  if (!src) {
    return false
  }
  const image = document.createElement('img')
  image.src = src
  image.setAttribute('class', className)

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
  }, 100)
  // 监听滚动和点击事件
  window.onscroll = delImgPopup
  mask.onclick = delImgPopup
}

window.utils = window.utils || {}
window.utils.addImgPopup = addImgPopup
window.utils.delImgPopup = delImgPopup
