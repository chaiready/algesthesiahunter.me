import i18n from '../lang'
import { source } from '@/lang/config/i18n.config'
import { rightTitle } from 'utils/title'
let middleware = router => {
  router.beforeEach((to, from, next) => {
    let title = ''
    if (to.name in source.nav) {
      const name = `nav.${to.name}`
      let i18Res = i18n.t(name)
      if (i18Res) {
        title = `${i18n.t(name)}  |  `.toUpperCase()
      }
    }

    document.title = title + rightTitle
    next()
  })
  router.afterEach(() => {})
}

export default middleware
