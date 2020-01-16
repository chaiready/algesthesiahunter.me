import { scrollTo } from '../utils/scroll-to'

export default function scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    scrollTo(savedPosition.y)
    return savedPosition
  } else if (to.hash) {
    scrollTo(to.hash.y)
    return { selector: to.hash }
  }
  scrollTo(0)
  return { x: 0, y: 0 }
}
