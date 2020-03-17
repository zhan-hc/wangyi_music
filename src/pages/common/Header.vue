<template>
  <div class="header">
      <div class="header-left">
        <span class="iconfont icon-category"></span>
      </div>
      <div class="header-main">
        <router-link tag="span" to="/" active-class="active" exact>我的</router-link>
        <router-link tag="span" to="/discover" active-class="active">发现</router-link>
        <router-link tag="span" to="/yuncun" active-class="active">云村</router-link>
        <router-link tag="span" to="/video" active-class="active">视频</router-link>
      </div>
      <div class="header-right">
        <span class="iconfont icon-search1"></span>
      </div>

  </div>
</template>

<script type="text/javascript">
export default {
  name: 'CommonHeader',
  data () {
    return {

    }
  }
}
</script>

<style lang="stylus" scoped >
.active
  color #000
  font-weight 700
  // &.fade-enter-active,&.fade-leave-active
  //   transition: opacity .5s
  // &.fade-enter,&.fade-leave-to
  //   opacity: 0
.header
    display flex
    width 100%
    height 36px
    line-height 36px
    color rgba(0,0,0,0.7)
    .header-left
        flex 0 0 36px
        text-align center
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
</style>
