import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home/Home.vue'
import Discover from '../pages/discover/Discover.vue'
import YunCun from '../pages/yuncun/YunCun.vue'
import Vedio from '../pages/vedio/Vedio.vue'
import Lyrics from '../pages/common/Lyrics.vue'
import Favorite from '../pages/home/components/Favorite.vue'

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
    }
  ]
})
