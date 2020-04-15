import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'albums' }
  },
  {
    path: '/albums',
    name: 'albums',
    component: () => import('../views/Albums')
  },
  {
    path: '/playlists',
    name: 'playlists',
    component: () => import('../views/Playlists')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/Search')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
