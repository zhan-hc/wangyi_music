<template>
  <div class="wrapper">
      <div class="alert-wrapper">
          <div class="content">确定退出当前账号吗？</div>
          <div class="push">
              <span @click="cancel">取消</span>
              <span @click="exit">退出</span>
          </div>
      </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'AlertExit',
  data () {
    return {

    }
  },
  methods: {
    cancel () {
      this.$emit('CancelAlert', false)
    },
    exit () {
      this.$emit('ExitAccount', false)
    }
  }
}
</script>

<style lang="stylus" scoped >
.wrapper
    z-index 106
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    background rgba(0,0,0,0.5)
    .alert-wrapper
        position relative
        background #fff
        margin-top 70%
        margin-left 5%
        height 17%
        width 90%
        border-radius 10px
        .content
            font-size 14px
            padding 20px 15px
            letter-spacing 1.5px
            color #999
        .push
            position absolute
            right 20px
            bottom 20px
            font-size 14px
            color #FF0000
            span
                margin-right 20px
</style>
