<template>
  <div id="app">
    <common-header></common-header>
    <router-view/>
  </div>
</template>

<script>
import './assets/iconfont/iconfont.css'
import CommonHeader from './pages/common/Header'
export default {
  name: 'App',
  data () {
    return {
      status: null
    }
  },
  methods: {
  },
  components: {
    CommonHeader
  }
}
</script>

<style>

</style>
