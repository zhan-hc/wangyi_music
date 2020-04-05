<template>
  <div class="wrapper">
      <div class="header-wrapper">
          <div class="title">我的音乐</div>
          <div class="detail"><span class="iconfont icon-arrow-right"></span></div>
      </div>
      <div class="content-wrapper" ref="WrapperScroll">
          <div class="content" ref="ContentScroll">
              <router-link tag="div" :to="Page_favorite(list.id)" class="list-wrapper" v-for="list in musicList" :key="list.id" :style="{'background-image': 'url( ' + list.imgUrl + ')'}">
                <div class="list">
                    <div class="icon"><span class="iconfont" :class="list.icon"></span></div>
                    <div class="title">{{list.title}}</div>
                    <div class="desc">{{list.desc}}</div>
                </div>
              </router-link>
          </div>
      </div>
      <div class="header-wrapper">
          <div class="title">最近播放</div>
          <div class="detail">更多<span class="iconfont icon-arrow-right"></span></div>
      </div>
      <div class="recent-wrapper">
          <div class="Songlist">
              <div class="img-wrapper">
                  <span class="iconfont icon-bofang"></span>
              </div>
              <div class="info">
                  <div class="title" ref="title">全部已播歌曲</div>
                  <div class="desc">300首</div>
              </div>
          </div>
          <div class="Songlist">
              <div class="img-wrapper" style="background-image:url('http://p3.music.126.net/b-AXM9IBg_rBQzL47BU3rA==/109951163010190652.jpg?param=200y200')">
                  <span class="iconfont icon-bofang"></span>
              </div>
              <div class="info">
                  <div class="title" ref="title">歌单：洗澡歌单</div>
                  <div class="desc">继续播放</div>
              </div>
          </div>
      </div>
      <div class="header-wrapper">
          <div class="title">创建歌单<span class="num">1</span></div>
          <div class="title1">收藏歌单<span class="num">0</span></div>
          <div class="detail"><span class="iconfont icon-threepoint"></span></div>
      </div>
      <div class="create-wrapper">
          <div class="Songlist">
              <div class="img-wrapper" style="background-image:url('http://p2.music.126.net/yhoHOHkayVb0DJtugKDVwQ==/109951163965499011.jpg')">
              </div>
              <div class="info">
                  <div class="title">2019年度歌单</div>
                  <div class="desc">10首</div>
              </div>
          </div>
          <div class="Songlist1">
              <div class="img-wrapper">
                  <span class="iconfont icon-plus"></span>
              </div>
              <div class="info">
                  <div class="title">创建歌单</div>
              </div>
          </div>
      </div>
  </div>
</template>
<script type="text/javascript">
import BScroll from 'better-scroll'
export default {
  name: 'HomeContent',
  data () {
    return {
      musicList: [
        {
          id: '001',
          imgUrl: 'http://p2.music.126.net/rTb28CZeLWxIRuSlJWkPLQ==/18850027346628137.jpg?param=130y130',
          icon: 'icon-xihuan-wangyiicon',
          title: '我喜欢的音乐',
          desc: '心动模式'
        },
        {
          id: '002',
          imgUrl: 'http://p2.music.126.net/gJDfYQYO8N_53CifsNzOLw==/726777185971185.jpg?param=130y130',
          icon: 'icon-fm',
          title: '私人FM',
          desc: '你的私人曲库'
        },
        {
          id: '003',
          imgUrl: '',
          icon: 'icon-paobu',
          title: '跑步FM',
          desc: '运动更有活力'
        },
        {
          id: '004',
          imgUrl: '',
          icon: 'icon-jiaoyou',
          title: '因乐交友',
          desc: '找到音乐好友'
        },
        {
          id: '005',
          imgUrl: '',
          icon: 'icon-piano',
          title: '古典专区',
          desc: '专业古典大全'
        }
      ],
      screenWidth: document.body.clientWidth
    }
  },
  mounted () {
    this._musicinit()
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      })()
    }
    this.$refs.title.style.width = ((this.screenWidth * 0.5) - 77) + 'px'
  },
  methods: {
    _musicinit () {
      let recWidth = 100 // 图片宽度
      let margin = 10
      let width = (recWidth + margin) * this.musicList.length - margin
      this.$refs.ContentScroll.style.width = width + 'px' // 给ul设置了宽度
      this.$nextTick(() => {
        if (!this.recScroll) {
          this.recScroll = new BScroll(this.$refs.WrapperScroll, {
            scrollX: true, // 水平滚动
            eventPassthrough: 'vertical' // 水平滚动时忽略垂直滚动
          })
        } else {
          this.recScroll.refresh()
        }
      })
    },
    Page_favorite (id) {
      if (id === '001') {
        return '/favorite'
      } else {
        return '/home'
      }
    }
  },
  computed: {
  }
}
</script>

<style lang="stylus" scoped >
@import '~styles/mixins.styl'
.wrapper
    position relative
    border-radius 20px
    background #fff
    margin-top -15px
    padding 15px
    .header-wrapper
        position relative
        width 100%
        margin-bottom 10px
        .title
            display inline-block
            font-weight bold
            .num
                margin-left 3px
                font-size 12px
        .title1
            display inline-block
            margin-left 10px
            font-weight bold
            color #999
            .num
                margin-left 3px
                font-size 12px
        .detail
            position absolute
            top 0
            right 0
    .content-wrapper
        position relative
        overflow hidden
        white-space nowrap
        width 100%
        margin-bottom 20px
        .content
            position relative
            .list-wrapper
                margin-right 10px
                display inline-block
                width 100px
                height 130px
                border-radius 5px
                background-repeat no-repeat
                background-size 100% 100%
                .list
                    background rgba(0,0,0,0.4)
                    border-radius 5px
                    width 100%
                    height 100%
                    .icon
                        padding-top 30px
                        text-align center
                        span
                            font-size 26px
                    .title
                        color rgba(255,255,255,0.9)
                        font-size 12px
                        text-align center
                        margin-top 8px
                    .desc
                        text-align center
                        margin-top 20px
                        font-size 12px
                        color rgba(255,255,255,0.8)
                &:nth-child(1)
                    color red
                &:nth-child(2)
                    color white
    .recent-wrapper
        display flex
        margin-bottom 20px
        .Songlist
            flex 1
            .img-wrapper
                display inline-block
                width 50px
                height 50px
                border-radius 5px
                background-image url('http://p1.music.126.net/sITJku5m96z6KF8c9P7fiA==/808141046459327.jpg')
                background-repeat no-repeat
                background-size cover
                text-align center
                .icon-bofang
                    color red
                    background rgba(255,255,255,0.8)
                    border-radius 50%
                    font-size 10px
                    line-height 50px
                    padding 10px
            .info
                display inline-block
                vertical-align middle
                font-size 0
                .title
                    font-size 12px
                    ellipsis-row(2)

                .desc
                    margin-top 5px
                    font-size 10px
                    color #999
    .create-wrapper
        display flex
        margin-bottom 20px
        .Songlist
            flex 1
            .img-wrapper
                display inline-block
                width 50px
                height 50px
                border-radius 5px
                background-image url('http://p1.music.126.net/sITJku5m96z6KF8c9P7fiA==/808141046459327.jpg')
                background-repeat no-repeat
                background-size cover
                text-align center
            .info
                display inline-block
                vertical-align top
                .title
                    font-size 14px
                .desc
                    margin-top 5px
                    font-size 12px
                    color #999
        .Songlist1
            flex 1
            .img-wrapper
                display inline-block
                width 50px
                height 50px
                border-radius 5px
                background #dcdcdc
                background-repeat no-repeat
                background-size cover
                text-align center
                .icon-plus
                    line-height 50px
            .info
                display inline-block
                vertical-align top
                .title
                    font-size 14px
                    line-height 50px

</style>
