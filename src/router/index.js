import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home/Home.vue'
import Discover from '../pages/discover/Discover.vue'
import YunCun from '../pages/yuncun/YunCun.vue'
import Vedio from '../pages/vedio/Vedio.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/discover',
      name: 'Discover',
      component: Discover
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
    }
  ]
})
