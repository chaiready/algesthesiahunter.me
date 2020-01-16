module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  globals: {
    Set: true,
    Howl: true,
    window: true,
    Reflect: true,
    Promise: true,
    arguments: true,
    document: true,
    localStorage: true,
    FaceDetector: true,
    requestAnimFrame: true,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        // tab缩进大小,默认为2
        tabWidth: 2,
        // 使用tab缩进，默认false
        useTabs: false,
        // 使用分号, 默认true
        semi: false,
        // 使用单引号, 默认false(在jsx中配置无效, 默认都是双引号)
        singleQuote: true,
        // 行尾逗号,默认none,可选 none|es5|all
        // es5 包括es5中的数组、对象
        // all 包括函数对象等所有可选
        trailingComma: 'es5',
        // 箭头函数参数括号 默认avoid 可选 avoid| always
        // avoid 能省略括号的时候就省略 例如x => x
        // always 总是有括号
        // arrowParens: 'avoid'
        // quoteProps:'consistent',
      },
    ],
    'nuxt/no-cjs-in-config': 'off',
    'vue/require-default-prop': 0,
    'vue/require-prop-types': 0,
    'no-console': 0,
    'vue/order-in-components': 0,
    'vue/require-component-is': 0,
  },
  env: {
    browser: true,
  },
}
