<template>
  <div class="wrapper">
      <div class="header-wrapper">
          <router-link tag="div" to="/checkphone" class="back">
              <span class="iconfont icon-fanhuipt"></span>
          </router-link>
          <div class="title">手机号注册</div>
      </div>
      <div class="input_phone">

          <div class="phone">
              <input class="number" maxlength="16" type="password" v-model="password" placeholder="设置登陆密码，不少于6位"/>
          </div>
      </div>
      <div class="next" @click="next">下一步</div>
  </div>
</template>

<script type="text/javascript">
// import axios from 'axios'
export default {
  name: 'PhoneRegister',
  data () {
    return {
      password: ''
    }
  },
  methods: {
    next () {
      localStorage.setItem('password', this.password)
      this.$router.push({
        path: '/rename'
      })
    }
  }
}
</script>

<style lang="stylus" scoped >
.wrapper
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    z-index 106
    background #fff
    .header-wrapper
        width 100%
        height 50px
        .back
            display inline-block
            line-height 50px
            margin-left 10px
            .iconfont
                font-size 24px
        .title
            display inline-block
            letter-spacing 1px
            line-height 50px
            margin-left 10px
            vertical-align top
    .input_phone
        margin-top 10%
        width 80%
        display flex
        margin-left 10%
        padding 5px 0
        border-bottom 1px solid #808080
        .phone
            flex 1
            margin-left 5px
            display inline-block
            .number
                width 100%
                outline none
                border none
                caret-color red
    .next
        width 80%
        margin-left 10%
        margin-top 10%
        background red
        text-align center
        color #ffffff
        padding 10px 0
        border-radius 30px
</style>
