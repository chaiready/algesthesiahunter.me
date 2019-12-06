import bezierEasing from 'bezier-easing'
const typeAni = {
  ease: [0.25, 0.1, 0.25, 1.0],
  linear: [0, 0.0, 1, 1.0],
  'ease-in': [0.42, 0.0, 1, 1.0],
  'ease-out': [0, 0.0, 0.58, 1.0],
  'ease-in-out': [0.42, 0.0, 0.58, 1.0],
  default: [0.25, 0.8, 0.5, 1],
}
// fade out

export function fadeOut(el) {
  el.style.opacity = 1
  ;(function fade() {
    if ((el.style.opacity -= 0.1) < 0) {
      el.style.display = 'none'
    } else {
      requestAnimationFrame(fade)
    }
  })()
}

// fade in

export function fadeIn(el, display) {
  el.style.opacity = 0
  el.style.display = display || 'block'
  ;(function fade() {
    var val = parseFloat(el.style.opacity)
    if (!((val += 0.1) > 1)) {
      el.style.opacity = val
      requestAnimationFrame(fade)
    }
  })()
}

export const animation = (type = 'default') => bezierEasing(...typeAni[type])
