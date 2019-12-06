import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/views/home.vue'
import middleware from './router-middleware'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
  },
  {
    path: '/coding',
    name: 'coding',
    component: () =>
      import(/* webpackChunkName: "coding" */ '@/views/coding.vue'),
  },
  {
    path: '/think',
    name: 'think',
    component: () =>
      import(/* webpackChunkName: "think" */ '@/views/think.vue'),
  },
  {
    path: '/project',
    name: 'project',
    component: () =>
      import(/* webpackChunkName: "project" */ '@/views/project.vue'),
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
  {
    path: '/guestbook',
    name: 'guestbook',
    component: () =>
      import(/* webpackChunkName: "guestbook" */ '@/views/guestbook.vue'),
  },
  {
    path: '/articles/:id(.*)',
    name: 'articles',
    component: () =>
      import(/* webpackChunkName: "articles" */ '@/views/articles.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  },
  base: process.env.BASE_URL,
  routes,
})

middleware(router)
export default router
