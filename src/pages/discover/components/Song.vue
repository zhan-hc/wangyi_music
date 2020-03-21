<template>
  <div class="song">
      <div class="header-wrapper">
          <div class="header-top">歌曲推荐</div>
          <div class="header-left">根据羡慕推荐</div>
          <div class="header-right"><span class="iconfont icon-bofang"></span>播放全部</div>
      </div>
      <div class="content-wrapper" ref="ContentScroll">
          <div class="container" ref="container">
              <div class="content-song" :style="{'width': clientWidth + 'px'}" v-for="(page, index) in pages" :key="index">
                  <div class="list" v-for="list in page" :key="list.id">
                      <div class="list-img"><img :src="list.imgUrl"></div>
                      <div class="name">{{list.name}}<span class="author">{{list.author}}</span></div>
                      <div class="desc" :class="{'desc-active': !list.icon}"><span class="iconfont" :class="list.icon"></span>{{list.desc}}</div>
                      <div class="icon"><span class="iconfont icon-bofang1"></span></div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script type="text/javascript">
import BScroll from 'better-scroll'
export default {
  name: 'DiscoverSong',
  data () {
    return {
      songList: [
        {
          id: '0001',
          imgUrl: 'http://p2.music.126.net/6TNYBV2rezZLiwsGYBgmPw==/123145302311773.jpg',
          name: '幻听',
          author: '  -  许嵩',
          icon: 'icon-sq',
          desc: '心酸纵有千百种 沉默不语最难过'
        },
        {
          id: '0002',
          imgUrl: 'http://p2.music.126.net/qX7ixB5ZT2wVJwgACuf_nA==/109951164623078367.jpg',
          name: '悬日',
          author: '  -  田馥甄',
          desc: '云音乐飙升榜16名'
        },
        {
          id: '0003',
          imgUrl: 'http://p1.music.126.net/a0jjOlv-61XLSoIiMjjGgA==/109951164566000641.jpg',
          name: '老友记',
          author: '  -  李荣浩',
          icon: 'icon-dujia1',
          desc: '纵使相逢应不识 尘满面 鬓如霜'
        },
        {
          id: '0004',
          imgUrl: 'http://p1.music.126.net/P3c_pg1RI5KXw7DFxGEh0w==/109951163784021165.jpg',
          name: 'Parties',
          author: '  -  Jake Miller',
          desc: '超72%人播放'
        },
        {
          id: '0005',
          imgUrl: 'http://p1.music.126.net/gQ_ga1r9r7YpHG3j0zr9wg==/109951163305404713.jpg',
          name: 'Speecjless',
          author: '  -  Dan + Shay',
          icon: 'null',
          desc: '你是如此让我着迷 还把它埋在心里'
        },
        {
          id: '0006',
          imgUrl: 'http://p2.music.126.net/UsSAd3Bdf77DjhCuTSEvUw==/109951163077613693.jpg',
          name: '异类',
          author: '  -  华晨宇',
          icon: 'icon-dujia1',
          desc: '长得像小白兔 唱的歌像大灰狼'
        }
      ],
      clientWidth: document.body.clientWidth * 0.95
    }
  },
  computed: {
    pages () {
      const pages = []
      this.songList.forEach((item, index) => {
        const page = Math.floor(index / 3) // icon处在第几页
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages
    }
  },
  mounted () {
    this._recommedinit()
  },
  methods: {
    _recommedinit () {
      let recWidth = this.clientWidth // 图片宽度
      let margin = 0
      let width = (recWidth + margin) * this.pages.length - margin
      this.$refs.container.style.width = width + 'px' // 给ul设置了宽度
      this.$nextTick(() => {
        if (!this.recScroll) {
          this.recScroll = new BScroll(this.$refs.ContentScroll, {
            startX: 0,
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
.desc-active
    background rgba(255,192,203,0.5)
    color #DC143C !important
    border-radius 2px
.song
    position relative
    margin 15px auto
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
            .icon-bofang
                font-size 8px
                margin-right 2px
    .content-wrapper
        overflow hidden
        white-space nowrap
        width 100%
        margin-top 10px
        .container
            position relative
            .content-song
                position relative
                display inline-block
                height 180px
                .list
                    position relative
                    height 60px
                    .list-img
                        width 50px
                        height 50px
                        margin-top 5px
                        img
                            width 100%
                            border-radius 5px
                    .name
                        position absolute
                        left 60px
                        top 5px
                        font-size 12px
                        .author
                            color rgba(0,0,0,0.5)
                            font-size 8px
                    .desc
                        position absolute
                        left 60px
                        top 25px
                        padding 0 2px
                        color rgba(0,0,0,0.6)
                        font-size 8px
                        line-height 16px
                        span
                            color red
                            font-size 16px
                            font-weight 500
                    .icon
                        position absolute
                        right 20px
                        top 15px
                        color red
                        span
                            font-size 20px
</style>
