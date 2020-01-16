import { rightTitle } from '@/utils/title'
import { source } from '@/config/i18n.config.js'
function middleware({ app, route, store }) {
  let title = ''
  let path = route.path.replace(/\/*[a-z]*\//g, '')
  if (path === '') {
    path = 'home'
  }
  if (path in source.nav) {
    const name = `nav.${path}`
    const i18Res = store.$i18n.t(name)
    if (i18Res) {
      title = `${store.$i18n.t(name)}  |  `.toUpperCase()
    }
  }
  app.head.title = title + rightTitle
}
export { middleware as default }
