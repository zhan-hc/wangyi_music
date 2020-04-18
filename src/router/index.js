import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home/Home.vue'
import Discover from '../pages/discover/Discover.vue'
import YunCun from '../pages/yuncun/YunCun.vue'
import Vedio from '../pages/vedio/Vedio.vue'
import Lyrics from '../pages/common/Lyrics.vue'
import Search from '../pages/common/Search.vue'
import Favorite from '../pages/home/components/Favorite.vue'
import Login from '../pages/login/Login.vue'
import PhoneLogin from '../pages/login/components/PhoneLogin.vue'
import CheckPhone from '../pages/login/components/CheckPhone.vue'
import PhoneRegister from '../pages/login/components/PhoneRegister.vue'
import TelLogin from '../pages/login/components/TelLogin.vue'
import Rename from '../pages/login/components/Rename.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Discover',
      component: Discover
    },
    {
      path: '/home',
      name: '',
      component: Home
    },
    {
      path: '/yuncun',
      name: 'YunCun',
      component: YunCun
    },
    {
      path: '/vedio',
      name: 'Vedio',
      component: Vedio
    },
    {
      path: '/lyrics',
      name: 'Lyrics',
      component: Lyrics
    },
    {
      path: '/favorite',
      name: 'Favorite',
      component: Favorite
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/phonelogin',
      name: 'PhoneLogin',
      component: PhoneLogin
    },
    {
      path: '/checkphone',
      name: 'CheckPhone',
      component: CheckPhone
    },
    {
      path: '/phoneRegister',
      name: 'PhoneRegister',
      component: PhoneRegister
    },
    {
      path: '/telLogin',
      name: 'TelLogin',
      component: TelLogin
    },
    {
      path: '/rename',
      name: 'Rename',
      component: Rename
    }
  ]
})
