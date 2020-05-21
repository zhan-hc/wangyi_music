<template>
  <div class="recommend">
      <div class="header-wrapper">
          <div class="header-top">推荐歌单</div>
          <div class="header-left">为你精挑细选</div>
          <div class="header-right">查看更多</div>
      </div>
      <div class="content-wrapper" ref="ContentScroll">
          <div class="content-container" ref="container">
            <div class="content" v-for="list in recommendList" :key="list.id" @click="playdetail(list.id)">
                <div class="content-bg"><img v-lazy="list.picUrl"></div>
                <div class="content-text">{{list.name}}</div>
                <div class="content-num"><span class="iconfont icon-pause"> {{NumFilter(list.playCount)}}</span></div>
            </div>
          </div>
      </div>
  </div>
</template>

<script type="text/javascript">
import BScroll from 'better-scroll'
import axios from 'axios'
export default {
  name: 'DiscoverRecommend',
  data () {
    return {
      recommendList: []
    }
  },
  mounted () {
    this._recommedinit()
    this.GetRecommend()
  },
  methods: {
    _recommedinit () {
      let recWidth = 90 // 图片宽度
      let margin = 13
      let width = (recWidth + margin) * 6 - margin
      this.$refs.container.style.width = width + 'px' // 给ul设置了宽度
      this.$nextTick(() => {
        if (!this.recScroll) {
          this.recScroll = new BScroll(this.$refs.ContentScroll, {
            scrollX: true, // 水平滚动
            eventPassthrough: 'vertical' // 水平滚动时忽略垂直滚动
          })
        } else {
          this.recScroll.refresh()
        }
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
        if (wan > 10) {
          shu += parseInt(wan) + '万'
        } else {
          shu += unit
        }
      }
      return shu
    },
    GetRecommend () {
      this.$nextTick(() => {
        axios.get('http://localhost:3000/personalized?limit=6').then(res => res.data).then(data => {
          this.recommendList = data.result
        })
      })
    },
    playdetail (id) {
      localStorage.playlist_id = id
      this.$router.push('/playdetail')
    }
  },
  computed: {
  }
}

</script>

<style lang="stylus" scoped >
@import '~styles/mixins.styl'
.recommend
    position relative
    margin-top 15px
    .header-wrapper
        .header-top
            color rgba(0,0,0,0.5)
            font-size 12px
        .header-left
            font-size 16px
            font-weight 600
        .header-right
            position absolute
            right 0
            top 14px
            padding 3px 10px
            border 1px solid #ccc
            border-radius 50px
            font-size 10px
    .content-wrapper
        overflow hidden
        white-space nowrap
        width 100%
        height 0
        padding-bottom 120px
        margin-top 10px
        .content-container
            position relative
            .content
                position relative
                display: inline-block
                width 100px
                margin-right 3px
                vertical-align top
                .content-bg
                    width 90px
                    height 90px
                    img
                        width 100%
                        border-radius 5px
                .content-text
                    white-space normal
                    font-size 12px
                    width 90px
                    ellipsis-row(2)
                .content-num
                    position absolute
                    right 15px
                    top -4px
                    color #fff
                    span
                        font-size 8px
</style>
