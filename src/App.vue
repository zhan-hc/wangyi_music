<template>
  <div id="app">
    <common-header></common-header>
    <category v-show="CategoryStatu"></category>
    <common-aplayer></common-aplayer>
    <common-lyrics v-show="LyricsStatu"></common-lyrics>
    <router-view/>
  </div>
</template>

<script>
import './assets/iconfont/iconfont.css'
import CommonHeader from './pages/common/Header'
import Category from './pages/category/Category'
import CommonAplayer from './pages/common/Aplayer'
import CommonLyrics from './pages/common/Lyrics'
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
    },
    LyricsStatu () {
      return this.$store.state.LyricsStatus
    }
  },
  components: {
    CommonHeader,
    Category,
    CommonAplayer,
    CommonLyrics
  }
}
</script>

<style>

</style>
