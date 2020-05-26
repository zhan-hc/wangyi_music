<template>
  <div class="favorite-wrapper">
      <div class="header-wrapper">
          <div @click="back" class="back">
              <span class="iconfont icon-fanhuipt"></span>
          </div>
          <div class="title">{{title}}</div>
          <div class="icon">
              <span class="iconfont icon-sousuo"></span>
              <span class="iconfont icon-threepoint"></span>
          </div>
      </div>
      <div class="content-wrapper"  ref="songScroll">
        <div class="container">
            <div class="desc-wrapper">
                <div class="null">
                </div>
                <div class="content" ref="Main">
                    <div class="img-wrapper" >
                        <div class="container" v-lazy:background-image="playlist.coverImgUrl">
                            <div class="num"><span class="iconfont icon-pause">{{NumFilter(playlist.playCount)}}</span></div>
                            <div class="icon">
                                <!-- <span class="iconfont icon-xinaixin"></span> -->
                            </div>
                        </div>
                    </div>
                    <div class="info-wrapper">
                        <div class="title">{{playlist.name}}</div>
                        <div class="object">
                            <img :src="avUrl" width="30" height="30">
                            <div class="name">{{nicktext}}<span class="iconfont icon-arrow-right"></span></div>
                        </div>
                        <div class="desc-container">
                            <div class="desc">{{playlist.description}}</div>
                            <div class="icon"><span class="iconfont icon-arrow-right"></span></div>
                        </div>
                    </div>
                </div>
                <div class="icon-wrapper">
                    <div class="icon" @click="GetLikeSong">
                        <span class="iconfont icon-pinglunpt"></span>
                        <div class="name">评论</div>
                    </div>
                    <div class="icon">
                        <span class="iconfont icon-fenxiangpt"></span>
                        <div class="name">分享</div>
                    </div>
                    <div class="icon">
                        <span class="iconfont icon-xiazaipt"></span>
                        <div class="name">下载</div>
                    </div>
                    <div class="icon">
                        <span class="iconfont icon-huaban"></span>
                        <div class="name">多选</div>
                    </div>
                </div>
            </div>
            <div class="song_menu-wrapper">
                <div class="container">
                    <div class="header" >
                        <span class="iconfont icon-bofang1"></span><!--  -->
                        <div class="desc">播放全部<span class="num">(共{{playlist.trackCount}}首)</span></div>
                    </div>
                    <div class="song-wrapper">
                        <div @click.stop="updateSong(list,index)"
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
  name: 'PlayListDeatail',
  data () {
    return {
      likelist: [],
      title: '歌单',
      active: '',
      playlist: [],
      avUrl: [],
      nicktext: ''
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
    updateSong (list, index) {
      list.index = index
      this.$store.commit('ChangeSong', list)
      this.$store.commit('PlayAudio')
    },
    GetLikeSong () {
      this.$nextTick(() => {
        var id = localStorage.getItem('playlist_id')
        axios.get('http://localhost:3000/playlist/detail?id=' + id).then(res => res.data).then(data => {
          console.log(data)
          this.playlist = data.playlist
          this.likelist = data.playlist.tracks
          this.$store.commit('ChangeNext', this.likelist)
          this.avUrl = this.playlist.creator.avatarUrl
          this.nicktext = this.playlist.creator.nickname
        })
      })
    },
    back () { // 返回跳转
      this.$router.go(-1)
    },
    NumFilter (num) { // 过滤播放量
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
    GetAlAr (listar, listal) { // 获取作曲者
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
    }
    // ,
    // playlist () {
    //   return this.$store.state.playlist[0]
    // }
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
        background rgba(0,0,0,0.7)
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
                background rgba(0,0,0,0.7)
                padding-bottom 80%
                .null
                    position relative
                    width 100%
                    height 50px
                    background #fff
                .content
                    position relative
                    // height 30p
                    display flex
                    margin-top 20px
                    padding 0 15px 20px 15px
                    // border 2px solid red
                    .img-wrapper
                        position relative
                        flex 1
                        // height 130px
                        // padding-right 15%
                        // border 2px solid red
                        height 0
                        padding-bottom 40%
                        border-radius 5px
                        .container
                            position relative
                            width 80%
                            height 0
                            padding-bottom 80%
                            border-radius 5px
                            background-repeat no-repeat
                            background-size cover
                            // background rgba(0,0,0,0.6)
                            color #fff
                            text-align center
                            .num
                                position absolute
                                right 5px
                                top 3px
                                font-size 14px
                                .iconfont
                                    font-size 12px
                            .icon
                                padding-top 25%
                                span
                                    font-size 70px
                    .info-wrapper
                        position relative
                        flex 1
                        color #fff
                        margin-top 10px
                        margin-left 15px
                        vertical-align top
                        .title
                            font-weight bold
                            // font-size 14px
                            ellipsis-row(2)
                        .object
                            margin-top 10px
                            img
                                display inline-block
                                border-radius 50%
                            .name
                                display inline-block
                                color rgba(255,255,255,0.9)
                                font-size 12px
                                line-height 30px
                                margin-left 5px
                                vertical-align top
                                ellipsis()
                                span
                                    font-size 12px
                        .desc-container
                            font-size 12px
                            display flex
                            color #ccc
                            .desc
                                flex 1
                                ellipsis-row(2)
                                margin-right 10%
                            .icon
                                width 20px
                                line-height 30px
                                .icon-arrow-right
                                    vertical-align middle
                .icon-wrapper
                    display flex
                    text-align center
                    color #ffffff
                    // height 100px
                    border 2px solid red
                    .icon
                        flex 1
                        .iconfont
                            font-size 24px
                        .name
                            margin-top 5px
                            font-size 12px
                            color rgba(255,255,255,0.6)
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
                                margin-right 15px
                                .name
                                    font-size 14px
                                    ellipsis()
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
