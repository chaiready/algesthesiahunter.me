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
    htmlAttrs: {
      lang: 'en',
    },
    title: meta.title,
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'x-dns-prefetch-control', content: 'on' },
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
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'dns-prefetch',
        href:
          'https://s2.pstatp.com/cdn/expire-1-M/gitalk/1.5.0/gitalk.min.css',
      },
      {
        rel: 'dns-prefetch',
        href:
          'https://s3.pstatp.com/cdn/expire-1-M/normalize/8.0.1/normalize.min.css',
      },
    ],
    noscript: [{ innerHTML: 'This website requires JavaScript.' }],
    bodyAttrs: {
      class: 'default',
    },
  },
  cache: {
    max: 100,
    maxAge: 1000 * 60 * 15,
  },
  render: {
    http2: { push: true },
  },
  /*
   ** Customize the progress-bar color
   */
  router: {
    prefetchLinks: false,
    middleware: ['router-middleware'],
  },
  /*
   ** Global CSS
   */
  css: ['./assets/base.scss'],
  styleResources: {
    scss: ['./assets/variables.scss', './assets/theme.scss'],
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: './plugins/http' },
    { src: './plugins/server' },
    { src: './plugins/init.client', ssr: false },
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
    '@nuxtjs/style-resources',
    '@nuxtjs/component-cache',
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
    optimization: {
      splitChunks: {
        cacheGroups: {
          expansions: {
            name: 'expansions',
            test(module) {
              return /swiper|lozad|marked|gitalk|highlight/.test(module.context)
            },
            chunks: 'initial',
            priority: 10,
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
    analyze: true,
    postcss: {
      plugins: { 'postcss-custom-properties': { warnings: false } },
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
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
    },
  },
  server: {
    port: 3001, // default: 3000
    host: '0.0.0.0', // default: localhost,
  },
}
