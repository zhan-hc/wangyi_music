<template>
  <div class="wrapper">
      <div class="header-wrapper">
          <router-link tag="div" to="/phonelogin" class="back">
              <span class="iconfont icon-fanhuipt"></span>
          </router-link>
          <div class="title">手机号登录</div>
      </div>
      <div class="input_phone">

          <div class="phone">
              <input class="number" maxlength="16" type="password" v-model="password" placeholder="请输入密码"/>
          </div>
          <div class="forget">忘记密码</div>
      </div>
      <div class="next" @click="checkphone">下一步</div>
      <div class="remind" ref="remind" v-show="message">用户名或密码错误</div>
  </div>
</template>

<script type="text/javascript">
import axios from 'axios'
export default {
  name: 'TelLogin',
  data () {
    return {
      password: '',
      message: false
    }
  },
  methods: {
    checkphone () {
      let phone = localStorage.getItem('tel')
      axios.get('http://localhost:3000/login/cellphone?phone=' + phone + '&password=' + this.password).then(res => res.data).then(data => {
        if (data.code === 200) {
          var id = data.account.id
          axios.get('http://localhost:3000/user/detail?uid=' + id).then(res => res.data).then(data => {
            console.log(data)
            this.$store.commit('ChangeUserList', data.profile)
            this.$store.commit('ChangeUserLevel', data.level)
          })
          axios.get('http://localhost:3000/user/playlist?uid=' + id).then(res => res.data).then(data => {
            // console.log(data)
            this.$store.commit('ChangePlayList', data.playlist)
            this.$router.push({
              path: '/home'
            })
          })
        } else {
          this.message = true
          let _this = this
          setTimeout(function () {
            _this.message = false
          }, 3000)
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
                font-size 16px
                outline none
                border none
                caret-color red
        .forget
            color #4169E1
            font-size 12px
            margin-top 5px
            vertical-align middle
    .next
        width 80%
        margin-left 10%
        margin-top 10%
        background red
        text-align center
        color #ffffff
        padding 10px 0
        border-radius 30px
    .remind
        margin-top 90%
        margin-left 25%
        text-align center
        border-radius 30px
        width 50%
        background rgba(220,220,220,0.7)
        padding 15px 0
</style>
