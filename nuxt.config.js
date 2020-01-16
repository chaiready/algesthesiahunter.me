import { resolve } from 'path'
import { i18nConfig } from './config/i18n.config'
import { VUE_APP_HTTP_HOST } from './config/env'
import { meta } from './config/meta'
export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: meta.title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: meta.description,
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: meta.keywords,
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    bodyAttrs: {
      class: 'dark',
    },
  },
  cache: {
    max: 100,
    maxAge: 1000 * 60 * 15,
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  router: {
    middleware: ['router-middleware'],
  },
  /*
   ** Global CSS
   */
  css: ['normalize.css/normalize.css', '@/assets/base.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '@/plugins/http' },
    { src: '@/plugins/extend/server' },
    { src: '@/plugins/extend/client', mode: 'client' },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    ['@nuxtjs/axios', { baseURL: VUE_APP_HTTP_HOST }],
    [
      'nuxt-i18n',
      {
        locales: ['zh', 'en'],
        defaultLocale: 'zh',
        vueI18n: {
          fallbackLocale: 'zh',
          messages: i18nConfig,
        },
      },
    ],
  ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.resolve.alias.vue = 'vue/dist/vue.common'
      // 排除 nuxt 原配置的影响
      const svgRule = config.module.rules.find((rule) => rule.test.test('.svg'))
      svgRule.exclude = [resolve(__dirname, 'assets/svg')]

      config.module.rules.push({
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve(__dirname, 'assets/svg')],
        options: {
          extract: false,
          symbolId: 'icon-[name]',
        },
      })

      config.module.rules.forEach((rule) => {
        if (/scss/.test(rule.test.toString())) {
          rule.oneOf.forEach((item) => {
            item.use.push({
              loader: 'sass-loader',
              options: {
                prependData: `@import "@/assets/variables.scss";`,
              },
            })
          })
        }
      })
    },
  },
  server: {
    port: 8080, // default: 3000
    host: 'localhost', // default: localhost,
  },
}
