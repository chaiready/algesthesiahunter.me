/*
 * @Description:scroll滑动组件
 * @author: <https://github.com/algesthesiahunter>
 */
import { animation } from './animation'
const move = amount => {
  document.documentElement.scrollTop = amount
  document.body.parentNode.scrollTop = amount
  document.body.scrollTop = amount
}

const position = () => {
  return (
    document.documentElement.scrollTop ||
    document.body.parentNode.scrollTop ||
    document.body.scrollTop
  )
}

export const scrollTo = (to, duration, callback) => {
  const oriPosition = position()
  duration = typeof duration === 'undefined' ? 500 : duration
  let start = null
  const change = oriPosition - to
  const animateScroll = function(timestamp) {
    if (!start) {
      start = timestamp
    }
    const timeNow = timestamp - start >= duration ? duration : timestamp - start
    const percentage = timeNow / duration
    const easing = animation()
    const val = oriPosition - easing(percentage) * change
    move(val)
    if (timeNow < duration) {
      window.requestAnimationFrame(animateScroll)
    } else if (callback && typeof callback === 'function') {
      callback()
    }
  }
  window.requestAnimationFrame(animateScroll)
}
