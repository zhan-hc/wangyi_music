<template>
  <div class="wrapper">
      <div class="logo">
        <span class="iconfont icon-wyy"></span>
      </div>
      <router-link tag="div" to="/phonelogin" class="login">
        手机号登录
      </router-link>
      <div class="way">
        <div class="icon">
          <span class="iconfont icon-weixin"></span>
        </div>
        <div class="icon">
          <span class="iconfont icon-qq"></span>
        </div>
        <div class="icon">
          <span class="iconfont icon-iconfontweibowukuang-copy"></span>
        </div>
        <div class="icon">
          <span class="iconfont icon-wangyi"></span>
        </div>
      </div>
      <div class="checkbox">
        <label><span class="iconfont" @click="changeStatus"
        :class="{'icon-check_box': status,' icon-check-box':!status}"></span>
          <i>同意</i>
          </label>
        <span>《用户协议》《隐私政策》《儿童隐私政策》</span>
      </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'Login',
  data () {
    return {
      status: true
    }
  },
  methods: {
    changeStatus () { // 改变checkbox状态
      this.status = !this.status
    }
  }
}
</script>

<style lang="stylus" scoped >
.wrapper
    position absolute
    top 0
    left 0
    bottom 0
    right 0
    z-index 106
    background #DD2D20
    .logo
      width 100%
      margin-top 30%
      text-align center
      .icon-wyy
        color #fff
        font-size 40px
        background #F02924
        padding 8px 12px 12px 12px
        border-radius 50%
    .login
      width 70%
      margin-left 15%
      margin-top 80%
      padding-top 10px
      padding-bottom 10px
      letter-spacing 2px
      background #ffffff
      text-align center
      border-radius 30px
      color #F02924
    .way
      display flex
      width 70%
      margin-left 15%
      margin-top 7%
      .icon
        flex 1
        color #fff
        text-align center
        span
          border 1px solid #fff
          padding 5px
          border-radius 50%
    .checkbox
      color #fff
      width 70%
      margin-left 15%
      margin-top 5%
      label
        font-size 10px
        color rgba(255,255,255,0.5)
        i
          margin-left 5px
          font-size 8px
        .icon-check_box
          font-size 12px
          color rgba(255,255,255,0.5)
        .icon-check-box
          font-size 12px
          color rgba(255,255,255,0.5)
      span
        font-size 10px
        color rgba(255,255,255,0.8)

</style>
