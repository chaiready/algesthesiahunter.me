import Vue from 'vue'
import VueRouter from 'vue-router'
import middleware from './router-middleware'
import { scrollTo } from 'utils/scroll-to'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () =>
      import(/* webpackChunkName: "category" */ '@/views/category.vue'),
    redirect: { name: 'home' },
    children: [
      {
        path: '/',
        name: 'home',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/home.vue'),
      },
    ],
  },
  {
    path: '/category1',
    name: 'category1',
    component: () =>
      import(/* webpackChunkName: "category" */ '@/views/category.vue'),
    children: [
      {
        path: '/articles/:id(.*)',
        name: 'articles',
        component: () =>
          import(/* webpackChunkName: "articles" */ '@/views/articles.vue'),
      },
      {
        path: '/tags/:tag(.*)',
        name: 'tags',
        component: () =>
          import(/* webpackChunkName: "tags" */ '@/views/tags.vue'),
      },
      {
        path: '/search',
        name: 'search',
        component: () =>
          import(/* webpackChunkName: "search" */ '@/views/search.vue'),
      },
    ],
  },
  {
    path: '/vlog',
    name: 'vlog',
    component: () => import(/* webpackChunkName: "vlog" */ '@/views/vlog.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/about.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      scrollTo(savedPosition.y)
      return savedPosition
    } else if (to.hash) {
      scrollTo(to.hash.y)
      return { selector: to.hash }
    }
    scrollTo(0)
    return { x: 0, y: 0 }
  },
  base: process.env.BASE_URL,
  routes,
})

middleware(router)

const otherRoutes = arr => {
  let resRouter = [
    {
      path: '/category',
      name: 'category',
      component: () =>
        import(/* webpackChunkName: "category" */ '@/views/category.vue'),
      children: [],
    },
    {
      path: '*',
      redirect: { name: 'home' },
    },
  ]
  for (let i = 0; i < arr.length; i++) {
    const v = arr[i]
    resRouter[0].children.push({
      path: `/${v.name}`,
      name: v.name,
      props: {
        categoryType: v.name,
      },
      component: () =>
        import(
          /* webpackChunkName: "categoryPage" */ '@/views/category-page.vue'
        ),
    })
  }
  return resRouter
}

export const addRoutesByCategorys = categorys =>
  router.addRoutes(otherRoutes(categorys))

export default router
