<template>
  <div class="wrapper">
    <div class="header-wrapper">
      <div class="square">
        <span :class="{'title-active':tstatus}" @click="squareClick">广场</span>
      </div>
      <div class="concern">
        <span :class="{'title-active':!tstatus}" @click="concernClick">关注</span>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="hotwall">
        <div class="content">
          <div class="title">云村热评墙<span class="iconfont icon-arrow-right"></span></div>
          <div class="desc">今日走心热评，那句最触动你？</div>
        </div>
        <div class="time">
          <div class="month">{{Getmonth}}.</div>
          <div class="day">{{Getday}}</div>
        </div>
      </div>
      <div class="main">
        <div class="list" v-for="list in yunList" :key="list.id">
          <div class="img-wrapper">
            <img :src="list.picUrl" alt="">
          </div>
          <div class="content" >
            <div class="desc">{{list.dj.signature}}</div>
            <div class="info">
              <div class="avator">
                <img :src="list.dj.avatarUrl" alt="">
              </div>
              <div class="name">{{list.dj.nickname}}</div>
              <div class="like">{{NumFilter(list.subCount)}}</div>
              <div class="icon"><span class="iconfont icon-threepoint"></span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import axios from 'axios'
export default {
  name: 'YunCun',
  data () {
    return {
      tstatus: true,
      yunList: []
    }
  },
  mounted () {
    this.init_yun()
  },
  computed: {
    Getmonth () {
      var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
      let mm = new Date().getMonth()
      return month[mm]
    },
    Getday () {
      let dd = new Date().getDate()
      if (dd.toString.length === 1) {
        dd = '0' + dd
      }
      return dd
    }
  },
  methods: {
    concernClick () {
      this.tstatus = false
    },
    squareClick () {
      this.tstatus = true
    },
    init_yun () {
      this.$nextTick(() => {
        axios.get('http://localhost:3000/dj/hot').then(res => res.data).then(data => {
          if (data.code === 200) {
            this.yunList = data.djRadios
          }
        }).catch((error) => {
          console.log(error.response.status)
        })
      })
    },
    NumFilter (num) {
      var shu = ''
      var unit = num
      var wan = num / 10000
      var yi = num / 100000000
      if ((yi) > 1) {
        shu += parseInt(yi) + '亿'
      } else {
        if (wan > 1) {
          shu += parseInt(wan) + '万'
        } else {
          shu += unit
        }
      }
      return shu
    }
  }
}
</script>

<style lang="stylus" scoped >
@import '~styles/mixins.styl'
.title-active{
  color red
  font-weight bold
  border-bottom 2px solid red
}
.wrapper
  position relative
  margin-top 20px
  .header-wrapper
    position relative
    display flex
    background #fff
    padding 5px
    font-weight bold
    color #808080
    border-bottom 1.5px solid #ccc
    .square
      flex 1
      text-align right
      margin-right 8%
      span
        padding 5px 10px
    .concern
      flex 1
      margin-left 8%
      span
        padding 5px 10px
  .content-wrapper
    position relative
    margin-top 10px
    .hotwall
      position relative
      display flex
      margin 0 10px
      padding 15px
      border-radius 10px
      background-image linear-gradient(to right,#191932, #595959, #191932)
      .content
        flex 1
        // display inline-block
        .title
          color #fff
          margin-bottom 10px
        .desc
          color #c0c0c0
          font-size 12px
      .time
        color #fff
        font-weight bold
        .month
          font-size 14px
        .day
          font-size 24px
    .main
      // position relative
      .list
        position relative
        margin 10px 2%
        width 46%
        float left
        border-radius 10px
        box-shadow 5px 5px 5px #888888
        .img-wrapper
          position relative
          // width 100%
          img
            border-radius 10px 10px 0 0
            width 100%
            height 250px
        .content
          position relative
          .desc
            margin-top 10px
            padding 0 10px
            font-size 12px
            ellipsis-row(2)
          .info
            position relative
            display flex
            padding 10px
            font-size 12px
            color #999
            .avator
              display inline-block
              width 25px
              height 25px
              img
                width 100%
                height 100%
                border-radius 50%
            .name
              display inline-block
              flex 1
              width 30px
              margin-left 5px
              vertical-align top
              margin-top 5px
              ellipsis()
            .like
              display inline-block
              vertical-align top
              margin-top 5px
              margin-right 5px
            .icon
              display inline-block
              line-height 25px
              .icon-threepoint
                font-size 12px

</style>
