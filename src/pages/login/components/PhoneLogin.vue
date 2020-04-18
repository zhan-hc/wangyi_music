<template>
  <div class="wrapper">
      <div class="header-wrapper">
          <router-link tag="div" to="/login" class="back">
              <span class="iconfont icon-fanhuipt"></span>
          </router-link>
          <div class="title">手机号登录</div>
      </div>
      <div class="remind">未注册手机号登录将自动创建账号</div>
      <div class="input_phone">
          <div class="prefix">
              <select class="select">
                <option>+86</option>
              </select>
          </div>
          <div class="phone">
              <input class="number" maxlength="11" v-model="phone" type="text" placeholder="请输入手机号"/>
          </div>
      </div>
      <div class="next" @click="showphone">下一步</div>
  </div>
</template>

<script type="text/javascript">
import axios from 'axios'
export default {
  name: 'PhoneLogin',
  data () {
    return {
      phone: ''
    }
  },
  methods: {
    showphone () {
      localStorage.setItem('tel', this.phone)
      axios.get('http://localhost:3000/cellphone/existence/check?phone=' + this.phone).then(res => res.data).then(data => {
        if (data.exist === -1) { // 手机号码未注册
          axios.get('http://localhost:3000/captcha/sent?phone=' + this.phone).then(res => res.data).then(data => {
          })
          this.$router.push({
            path: '/checkphone'
          })
        } else {
          this.$router.push({
            path: '/telLogin'
          })
        }
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
    .remind
        color #999
        margin-top 10%
        padding 0 10px
        font-size 12px
    .input_phone
        margin-top 10%
        width 80%
        display flex
        margin-left 10%
        padding 5px 0
        border-bottom 1px solid #808080
        .prefix
            display inline-block
            .select
                border none
                outline none
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
