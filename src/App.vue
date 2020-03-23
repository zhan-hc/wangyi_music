<template>
  <div id="app">
    <common-header></common-header>
    <category v-show="CategoryStatu"></category>
    <common-aplayer></common-aplayer>
    <router-view/>
  </div>
</template>

<script>
import './assets/iconfont/iconfont.css'
import CommonHeader from './pages/common/Header'
import Category from './pages/category/Category'
import commonAplayer from './pages/common/Aplayer'
export default {
  name: 'App',
  data () {
    return {
      status: null
    }
  },
  methods: {
  },
  computed: {
    CategoryStatu () {
      return this.$store.state.CategoryStatus
    }
  },
  components: {
    CommonHeader,
    Category,
    commonAplayer
  }
}
</script>

<style>

</style>
