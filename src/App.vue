<template>
  <div id="app">
    <common-header></common-header>
    <category v-show="CategoryStatu"></category>
    <common-aplayer></common-aplayer>
    <common-menu v-show="MenuStatu"></common-menu>
    <router-view/>
  </div>
</template>

<script>
import './assets/iconfont/iconfont.css'
import CommonHeader from './pages/common/Header'
import Category from './pages/category/Category'
import CommonAplayer from './pages/common/Aplayer'
import CommonMenu from './pages/common/Menu'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
    CategoryStatu () {
      return this.$store.state.CategoryStatus
    },
    LyricsStatu () {
      return this.$store.state.LyricsStatus
    },
    MenuStatu () {
      return this.$store.state.MenuStatus
    }
  },
  components: {
    CommonHeader,
    Category,
    CommonAplayer,
    CommonMenu
  }
}
</script>

<style>

</style>
