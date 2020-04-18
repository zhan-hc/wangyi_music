<template>
  <div class="wrapper">
      <div class="header-wrapper">
          <router-link tag="div" to="/phonelogin" class="back">
              <span class="iconfont icon-fanhuipt"></span>
          </router-link>
          <div class="title">手机号验证</div>
      </div>
      <div class="desc">验证码已发送至</div>
      <div class="remind">+86 {{Getphone}}</div>
      <div class="count" :style="{'color': IfRefresh(Showtime)}" @click="sentcode(Showtime)">{{Showtime}}</div>
      <div class="input_code">
          <div class="code" v-for="(item, index) in codeList" :key="index">
              <input class="code_input" ref="code" v-model="item.val" maxlength="1" type="text" @keyup="nextFocus($event,index)"/>
          </div>
      </div>
  </div>
</template>

<script type="text/javascript">
import axios from 'axios'
export default {
  name: 'CheckPhone',
  data () {
    return {
      codeList: [{val: ''}, {val: ''}, {val: ''}, {val: ''}],
      timer: '',
      totalTime: 59
    }
  },
  computed: {
    Getphone () { // 将号码加密
      let phone = localStorage.getItem('tel')
      let mdphone = ''
      for (var i = 0; i < phone.length; i++) {
        if (i > 2 && i < 7) {
          mdphone += '*'
        } else {
          mdphone += phone[i]
        }
      }
      return mdphone
    },
    Getcode () {
      var code = ''
      this.codeList.forEach((num) => {
        code += num.val
      })
      return code
    },
    Showtime () {
      if (this.totalTime === 0) {
        clearInterval(this.timer)
        return '重新获取'
      } else {
        return this.totalTime + 's'
      }
    }
  },
  mounted () {
    this.$refs.code[0].focus()
    this.timer = setInterval(this.countdown, 1000)
  },
  methods: {
    Checkcode () {
      let phone = localStorage.getItem('tel')
      axios.get('http://localhost:3000/captcha/verify?phone=' + phone + '&captcha=' + this.Getcode).then(res => res.data).then(data => {
        if (data.code === 200) {
          localStorage.setItem('code', this.Getcode)// 保存code
          this.$router.push({
            path: '/phoneRegister'
          })
        }
      })
    },
    // 对焦到下一个input框去
    nextFocus (el, index) {
      var dom = this.$refs.code
      var currInput = dom[index]
      var nextInput = dom[index + 1]
      var lastInput = dom[index - 1]
      // 这里的keyCode 根据不同的平台或许不同,安卓就是不是8
      if (el.keyCode !== 8) {
        if (index < (this.codeList.length - 1)) {
          nextInput.focus()
        } else {
          currInput.blur()
          this.Checkcode()
        }
      } else {
        if (index !== 0) {
          lastInput.focus()
        }
      }
    },
    // 倒计时
    countdown () {
      this.totalTime--
    },
    // 改变倒计时字体颜色
    IfRefresh (text) {
      if (text === '重新获取') {
        return '#4169E1'
      } else {
        return '#999'
      }
    },
    sentcode (text) {
      if (text === '重新获取') {
        var phone = localStorage.getItem('tel')
        axios.get('http://localhost:3000/captcha/sent?phone=' + phone).then(res => res.data).then(data => {
        })
        this.$router.go(0)
      }
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
        position relative
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
    .desc
        margin-top 10%
        padding 0 10px
    .remind
        display inline-block
        color #999
        margin-top 20px
        padding 0 10px
        font-size 12px
    .count
        display inline-block
        float right
        margin-right 20px
        margin-top 5%
    .input_code
        position relative
        margin-top 15%
        width 80%
        display flex
        margin-left 10%
        text-align center
        .code
            flex 1
            .code_input
                width 50%
                text-align center
                font-weight bold
                font-size 25px
                border none
                outline none
                border-bottom 2px solid #ccc
</style>
