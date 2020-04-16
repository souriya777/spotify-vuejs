import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login')
  },
  {
    path: '/albums',
    name: 'albums',
    component: () => import('../views/Albums')
  },
  {
    path: '/albums/:albumId',
    name: 'album',
    component: () => import('../views/Album'),
    props: true
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
