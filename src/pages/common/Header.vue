<template>
  <div class="header">
      <div class="header-left">
        <span class="iconfont icon-MENU" @click="ShowCategory"></span>
      </div>
      <div class="header-main">
        <router-link tag="span" to="/home" active-class="active">我的</router-link>
        <router-link tag="span" to="/" active-class="active"  exact>发现</router-link>
        <router-link tag="span" to="/yuncun" active-class="active">云村</router-link>
        <router-link tag="span" to="/vedio" active-class="active">视频</router-link>
      </div>
      <div class="header-right">
        <router-link tag="span" to="/search" class="iconfont icon-sousuo"></router-link>
      </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'CommonHeader',
  data () {
    return {
      homeStatus: false
    }
  },
  watch: {
  },
  methods: {
    ShowCategory () {
      this.$store.commit('showCategory')
    }
  },
  computed: {
  }
}
</script>

<style lang="stylus" scoped >
.active {
  color #000
  font-weight bold
}
.header
    display flex
    // background #000
    width 100%
    height 36px
    line-height 36px
    color rgba(0,0,0,0.7)
    .header-left
        flex 0 0 36px
        text-align center
        font-weight bold
    .header-main
        display flex
        flex 1
        line-height 36px
        span
          flex 1
          text-align center
    .header-right
        flex 0 0 36px
        text-align center
        font-weight 600
</style>
