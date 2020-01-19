import { source } from '@/config/i18n.config.js'
import { rightTitle } from '@/utils/title'
function funcBack(store, name, title) {
  const i18Res = store.$i18n.t(name)
  if (i18Res) {
    title = `${store.$i18n.t(name)} | `.toUpperCase()
  }
  const str = title + rightTitle
  store.dispatch('common/updateTitle', str)
}
function middleware({ app, route, store }) {
  app.head.bodyAttrs.class = store.state.common.theme
  const title = ''
  let path = route.path.replace(/\/*[a-z]*\//g, '')
  if (path === '') {
    path = 'home'
  }
  if (path in source.nav) {
    const name = `nav.${path}`
    funcBack(store, name, title)
  } else if (path in source.tag) {
    const name = `tag.${path}`
    funcBack(store, name, title)
  }
}
export { middleware as default }
