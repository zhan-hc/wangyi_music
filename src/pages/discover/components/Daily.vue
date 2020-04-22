<template>
  <div class="favorite-wrapper">
      <div class="header-wrapper">
          <router-link tag="div" to="/home" class="back">
              <span class="iconfont icon-fanhuipt"></span>
          </router-link>
          <div class="title">{{title}}</div>
          <div class="icon">
              <span class="iconfont icon-threepoint"></span>
          </div>
      </div>
      <div class="content-wrapper"  ref="songScroll">
        <div class="container">
            <div class="desc-wrapper">
                <div class="null">
                </div>
                <div class="content" ref="Main">
                </div>
            </div>
            <div class="song_menu-wrapper">
                <div class="container">
                    <div class="header" >
                        <span class="iconfont icon-bofang1"></span><!--  -->
                        <div class="desc">播放全部<span class="num">(共{{playlist.trackCount}}首)</span></div>
                    </div>
                    <div class="song-wrapper">
                        <div @click.stop="updateSong(list)"
                         class="songlist" v-for="(list, index) in likelist" :key="list.id">
                            <div class="id">{{index + 1}}</div>
                            <div class="content">
                                <div class="name">{{list.name}}</div>
                                <div class="author">{{GetAlAr(list.ar, list.al)}}</div>
                            </div>
                            <div class="mv">
                                <span class="iconfont icon-mv"></span>
                            </div>
                            <div class="about">
                                <span class="iconfont icon-threepoint"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script type="text/javascript">
import BScroll from 'better-scroll'
import axios from 'axios'
export default {
  name: 'DiscoverDeaily',
  data () {
    return {
      likelist: [],
      title: '',
      active: ''
    }
  },
  mounted () {
    this._initScroll()
    window.addEventListener('scroll', this.handleScroll)
    this.GetLikeSong()
  },
  methods: {
    _initScroll () {
      this.$nextTick(() => {
        if (!this.songScroll) {
          this.songScroll = new BScroll(this.$refs.songScroll, {
            click: true,
            probeType: 3,
            bounce: false
          })
          this.songScroll.on('scroll', (pos) => { // 判断滑动距离事件
            if (Math.abs(Math.round(pos.y)) > 70) {
              this.title = '我喜欢的音乐'
            } else {
              this.title = '歌单'
            }
          })
        } else {
          this.songScroll.refresh()
        }
      })
    },
    updateSong (list) {
      this.$store.commit('ChangeSong', list)
      this.$store.commit('PlayAudio')
    },
    GetLikeSong () {
      this.$nextTick(() => {
        axios.get('http://localhost:3000/recommend/songs').then(res => res.data).then(data => {
          console.log(data)
        })
      })
    },
    GetAlAr (listar, listal) {
      var detail = ''
      listar.forEach((item, index) => {
        if (index === listar.length - 1) {
          detail += item.name
        } else {
          detail += item.name + '/'
        }
      })
      detail += ' - ' + listal.name
      return detail
    }
  },
  computed: {
    user () {
      return this.$store.state.userlist
    },
    playlist () {
      return this.$store.state.playlist[0]
    }
  }
}
</script>

<style lang="stylus" scoped >
@import '~styles/mixins.styl'
.change_bg{
  background #ccc}

.favorite-wrapper
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background #fff
    z-index 103
    .header-wrapper
        position fixed
        top 0
        left 0
        width 100%
        height 50px
        z-index 104
        background rgba(0,0,0,0.2)
        opacity 1
        color #fff
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
        .icon
            position absolute
            top 0
            right 15px
            .iconfont
                font-size 20px
                line-height 50px
                margin-left 20px
    .content-wrapper
        position relative
        overflow hidden
        height 700px
        .container
            position relative
            .desc-wrapper
                position relative
                width 100%
                height 0
                background-image url('http://p1.music.126.net/_RVi0cHgarQYomdbCaDTAQ==/109951164627112165.jpg')
                background-repeat no-repeat
                background-size 100% 100%
                padding-bottom 80%
                .null
                    position relative
                    width 100%
                    height 50px
                    background #fff
                .content
                    position relative
                    margin-top 20px
                    padding 0 15px 20px 15px
            .song_menu-wrapper
                position relative
                margin-top -15px
                padding 15px
                background #fff
                border-radius 15px
                margin-bottom 100px
                .container
                    position relative
                    width 100%
                    .header
                        .icon-bofang1
                            display inline-block
                            font-size 24px
                        .desc
                            display inline-block
                            margin 3px 10px
                            vertical-align top
                            span
                                font-size 12px
                                color rgba(0,0,0,0.6)
                    .song-wrapper
                        position relative
                        margin-top 10px
                        margin-bottom 70px
                        .songlist
                            position relative
                            margin-top 5px
                            height 50px
                            display flex
                            .id
                                display inline-block
                                width 30px
                                flex 0 0 30px
                                height 30px
                                line-height 50px
                                text-align center
                                vertical-align top
                                color #999
                            .content
                                flex 1
                                min-width 0
                                line-height 20px
                                padding 5px
                                .name
                                    font-size 14px
                                .author
                                    width 90%
                                    font-size 12px
                                    color rgba(0,0,0,0.4)
                                    ellipsis()
                            .mv
                                display inline-block
                                line-height 50px
                                margin-right 15px
                                .icon-mv
                                    font-size 24px
                            .about
                                display inline-block
                                line-height 50px
</style>
