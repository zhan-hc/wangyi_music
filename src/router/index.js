import Vue from 'vue'
import Router from 'vue-router'
// import Home from 'pages/home/Home.vue'
// import Discover from 'pages/discover/Discover.vue'
// import YunCun from 'pages/yuncun/YunCun.vue'
// import Vedio from 'pages/vedio/Vedio.vue'
// import Lyrics from 'pages/common/Lyrics.vue'
// import Search from 'pages/common/Search.vue'
// import Favorite from 'pages/home/components/Favorite.vue'
// import Login from 'pages/login/Login.vue'
// import PhoneLogin from 'pages/login/components/PhoneLogin.vue'
// import CheckPhone from 'pages/login/components/CheckPhone.vue'
// import PhoneRegister from 'pages/login/components/PhoneRegister.vue'
// import TelLogin from 'pages/login/components/TelLogin.vue'
// import Rename from 'pages/login/components/Rename.vue'
// import DiscoverDaily from 'pages/discover/components/Daily.vue'
// import SearchResult from 'pages/common/SearchResult.vue'
// import PlayList from 'pages/discover/components/PlayList.vue'
// import PlayDetail from 'pages/common/PlayListDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Discover',
      component: resolve => require(['pages/discover/Discover.vue'], resolve)
    },
    {
      path: '/home',
      name: '',
      component: resolve => require(['pages/home/Home.vue'], resolve)
    },
    {
      path: '/yuncun',
      name: 'YunCun',
      component: resolve => require(['pages/yuncun/YunCun.vue'], resolve)
    },
    {
      path: '/vedio',
      name: 'Vedio',
      component: resolve => require(['pages/vedio/Vedio.vue'], resolve)
    },
    {
      path: '/lyrics',
      name: 'Lyrics',
      component: resolve => require(['pages/common/Lyrics.vue'], resolve)
    },
    {
      path: '/favorite',
      name: 'Favorite',
      component: resolve => require(['pages/home/components/Favorite.vue'], resolve)
    },
    {
      path: '/search',
      name: 'Search',
      component: resolve => require(['pages/common/Search.vue'], resolve)
    },
    {
      path: '/login',
      name: 'Login',
      component: resolve => require(['pages/login/Login.vue'], resolve)
    },
    {
      path: '/phonelogin',
      name: 'PhoneLogin',
      component: resolve => require(['pages/login/components/PhoneLogin.vue'], resolve)
    },
    {
      path: '/checkphone',
      name: 'CheckPhone',
      component: resolve => require(['pages/login/components/CheckPhone.vue'], resolve)
    },
    {
      path: '/phoneRegister',
      name: 'PhoneRegister',
      component: resolve => require(['pages/login/components/PhoneRegister.vue'], resolve)
    },
    {
      path: '/telLogin',
      name: 'TelLogin',
      component: resolve => require(['pages/login/components/TelLogin.vue'], resolve)
    },
    {
      path: '/rename',
      name: 'Rename',
      component: resolve => require(['pages/login/components/Rename.vue'], resolve)
    },
    {
      path: '/daily',
      name: 'DiscoverDaily',
      component: resolve => require(['pages/discover/components/Daily.vue'], resolve)
    },
    {
      path: '/searchresult',
      name: 'SearchResult',
      component: resolve => require(['pages/common/SearchResult.vue'], resolve)
    },
    {
      path: '/playlist',
      name: ' PlayList',
      component: resolve => require(['pages/discover/components/PlayList.vue'], resolve)
    },
    {
      path: '/playdetail',
      name: 'PlayDetail',
      component: resolve => require(['pages/common/PlayListDetail'], resolve)
    },
    {
      path: '/toplist',
      name: 'toplist',
      component: resolve => require(['pages/discover/components/TopList.vue'], resolve)
    },
    {
      path: '/setup',
      name: 'setup',
      component: resolve => require(['pages/category/components/Setup.vue'], resolve)
    }
  ]
})
