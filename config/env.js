export const environment = process.env
export const NODE_ENV = environment.NODE_ENV
export const isDevMode = Object.is(NODE_ENV, 'development')
export const isProdMode = Object.is(NODE_ENV, 'production')

export const isStatic = process && process.static
export const isServer = process && process.server
export const isBrowser = process && process.browser
export const isModern = process && process.modern

export const VUE_APP_HTTP_HOST = isDevMode
  ? 'http://localhost:3000'
  : 'http://localhost:3000'
// export const VUE_APP_HTTP_HOST = isDevMode
//   ? 'http://localhost:3000'
//   : 'https://api.algesthesiahunter.top'
