export const actions = {
  // 全局服务初始化
  nuxtServerInit(store, { req }) {
    return Promise.all([
      store.dispatch('article/getHomeArticles', {
        page: 1,
      }),
      store.dispatch('category/getCategorys'),
      store.dispatch('tag/getTags'),
    ])
  },
}
