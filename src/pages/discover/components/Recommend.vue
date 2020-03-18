<template>
  <div class="recommend">
      <div class="header-wrapper">
          <div class="header-top">推荐歌单</div>
          <div class="header-left">为你精挑细选</div>
          <div class="header-right">查看更多</div>
      </div>
      <div class="content-wrapper" ref="ContentScroll">
          <div class="content-container" ref="container">
            <div class="content" v-for="list in recommendList" :key="list.id">
                <div class="content-bg"><img :src="list.imgUrl"></div>
                <div class="content-text">{{list.text}}</div>
                <div class="content-num"><span class="iconfont icon-pause"> {{list.Num}}</span></div>
            </div>
          </div>
      </div>
  </div>
</template>

<script type="text/javascript">
import BScroll from 'better-scroll'
export default {
  name: 'DiscoverRecommend',
  data () {
    return {
      recommendList: [
        {
          id: '0001',
          imgUrl: 'http://p4.music.126.net/OUFpNEOPyNE6zZSogqse2Q==/109951164625068258.jpg',
          text: '熬夜写作业必备醒脑歌单（英文）',
          Num: '81万'
        },
        {
          id: '0002',
          imgUrl: 'http://p3.music.126.net/ajoA2VrwgES6ovTHJRc15w==/109951164814653033.jpg',
          text: '[一周日语上新] RADWIMPS最新单曲 点一盏明灯照亮漫漫长夜',
          Num: '3746万'
        },
        {
          id: '0003',
          imgUrl: 'http://p3.music.126.net/BeIc-sv62xZPpVBS4DjE-g==/109951164607988464.jpg',
          text: '私人雷达|根据听歌记录为你打造',
          Num: '7133万'
        },
        {
          id: '0004',
          imgUrl: 'http://p4.music.126.net/x44v5IkLN30gWgUYWYivbg==/109951164000997664.jpg',
          text: '男生的温柔侵入心底 珊瑚长出海面伸向月亮',
          Num: '1929万'
        },
        {
          id: '0005',
          imgUrl: 'http://p3.music.126.net/imAiEP2RbTdLA639FzCo1g==/109951164604265438.jpg',
          text: 'Synth Pop丨复古青年浪漫合成器',
          Num: '64万'
        }
      ]
    }
  },
  mounted () {
    this._recommedinit()
  },
  methods: {
    _recommedinit () {
      let recWidth = 100 // 图片宽度
      let margin = 5
      let width = (recWidth + margin) * this.recommendList.length - margin
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
    }
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
        margin-top 10px
        .content-container
            position relative
            .content
                position relative
                display: inline-block
                width 100px
                margin 0 5px
                .content-bg
                    width 100px
                    height 100px
                    img
                        width 100%
                        border-radius 5px
                .content-text
                    white-space normal
                    font-size 12px
                    width 100px
                    ellipsis-row(2)
                .content-num
                    position absolute
                    right 3px
                    top 0
                    color #fff
                    span
                        font-size 8px
</style>
