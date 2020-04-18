<template>
  <div class="wrapper">
      <div class="header-wrapper">
          <router-link tag="div" to="/phoneRegister" class="back">
              <span class="iconfont icon-fanhuipt"></span>
          </router-link>
          <div class="title">给自己取一个昵称</div>
      </div>
      <div class="img-wrapper">
          <img src="../components/rename.jpg">
      </div>
      <div class="input_phone">
          <div class="phone">
              <input class="number" maxlength="16" type="text" v-model="name" placeholder="请输入昵称"/>
          </div>
      </div>
      <div class="next" @click="next">开启云音乐</div>
      <div class="remind" ref="remind"  v-show="message">用户名重复</div>
  </div>
</template>

<script type="text/javascript">
import axios from 'axios'
export default {
  name: 'Rename',
  data () {
    return {
      name: '',
      message: false
    }
  },
  methods: {
    next () {
      var tel = localStorage.getItem('tel')
      var code = localStorage.getItem('code')
      var password = localStorage.getItem('password')
      axios.get('http://localhost:3000/register/cellphone?phone=' + tel + '&password=' + password + '&captcha=' + code + '&nickname=' + this.name + '').then(res => res.data).then(data => {
        console.log(data)
        if (data.code === 200) { // 注册成功
          this.$store.commit('ChangeUserList', data.profile)
          this.$store.commit('ChangeUserLevel', 0)
          var id = data.account.id
          axios.get('http://localhost:3000/user/playlist?uid=' + id).then(res => res.data).then(data => {
            this.$store.commit('ChangePlayList', data.playlist)
            this.$router.push({
              path: '/home'
            })
          })
        }
      }).catch((error) => { // 如果用户名重复
        console.log(error.response.status)
        this.message = true
        let _this = this
        this.name = ''
        setTimeout(function () {
          _this.message = false
        }, 3000)
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
    .img-wrapper
        position relative
        width 60%
        margin-left 20%
        img
            width 100%
            height 100%
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
    .remind
        margin-top 50%
        margin-left 25%
        text-align center
        border-radius 30px
        width 50%
        background rgba(220,220,220,0.7)
        padding 15px 0
</style>
