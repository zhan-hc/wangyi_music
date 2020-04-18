<template>
  <div class="favorite-wrapper">
      <div class="header-wrapper">
          <router-link tag="div" to="/home" class="back">
              <span class="iconfont icon-fanhuipt"></span>
          </router-link>
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
                    <div class="img-wrapper">
                        <div class="container">
                            <div class="num"><span class="iconfont icon-pause"></span>17</div>
                            <div class="icon">
                                <span class="iconfont icon-xinaixin"></span>
                            </div>
                        </div>
                    </div>
                    <div class="info-wrapper">
                        <div class="title">我喜欢的音乐</div>
                        <div class="object">
                            <img :src="user.avatarUrl" width="30" height="30">
                            <div class="name">{{user.nickname}}<span class="iconfont icon-arrow-right"></span></div>
                        </div>
                    </div>
                </div>
                <div class="icon-wrapper">
                    <div class="icon">
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
                        <span class="iconfont icon-bofang1"></span>
                        <div class="desc">播放全部<span class="num">(共31首)</span></div>
                    </div>
                    <div class="song-wrapper">
                        <div @click.stop="updateSong(list)" @touchstart="SongOver(index)" @touchend="SongOut(index)"
                         class="songlist" v-for="(list, index) in songList" :key="list.id"
                           :class="{'change_bg': list.isHv}">
                            <div class="id">{{index + 1}}</div>
                            <div class="content">
                                <div class="name">{{list.name}}</div>
                                <div class="author">{{list.author}}</div>
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
export default {
  name: 'HomeFavorite',
  data () {
    return {
      songList: [
        {
          id: '001',
          name: '天真有邪',
          author: '林宥嘉',
          imgUrl: 'http://p1.music.126.net/oVJmUJ1bPb_9eBOFCKLclQ==/109951163167730852.jpg',
          mp3: 'http://music.163.com/song/media/outer/url?id=417833029.mp3',
          isHv: 0
        },
        {
          id: '002',
          name: '演员',
          author: '薛之谦',
          imgUrl: 'http://p2.music.126.net/qpvBqYIqkRhO9Ry2qOCdJQ==/2942293117852634.jpg',
          mp3: 'http://music.163.com/song/media/outer/url?id=32507038.mp3',
          isHv: 0
        },
        {
          id: '003',
          name: '小酒窝',
          author: '林俊杰/蔡卓妍',
          imgUrl: 'http://p1.music.126.net/s6zFxvXe5kOxub4_x4rZhQ==/109951163052847567.jpg',
          mp3: 'http://music.163.com/song/media/outer/url?id=108468.mp3',
          isHv: 0
        },
        {
          id: '004',
          name: '倒数',
          author: 'G.E.M.邓紫棋',
          imgUrl: 'http://p1.music.126.net/tXCIFsVDK6IKcQ9YWxwOEg==/109951163523944497.jpg',
          mp3: 'http://music.163.com/song/media/outer/url?id=1299550532.mp3',
          isHv: 0
        },
        {
          id: '005',
          name: '你想要的',
          author: '颜人中',
          imgUrl: 'http://p1.music.126.net/OzDIi7gUmsPkRUtF-slgYA==/109951164844070975.jpg',
          mp3: 'http://music.163.com/song/media/outer/url?id=1434309927.mp3',
          isHv: 0
        },
        {
          id: '006',
          name: 'comethru',
          author: 'Jeremy Zucker',
          imgUrl: 'http://p1.music.126.net/5T16HrYHad3Zaqh5EAfUxQ==/109951163623808339.jpg',
          mp3: 'http://music.163.com/song/media/outer/url?id=1307996767.mp3',
          isHv: 0
        },
        {
          id: '007',
          name: '重演',
          author: '王巨星',
          imgUrl: 'http://p1.music.126.net/nqw7mcUKGY-I4aKTtC9BZA==/109951164519394300.jpg',
          mp3: 'http://music.163.com/song/media/outer/url?id=1406809993.mp3',
          isHv: 0
        },
        {
          id: '008',
          name: '与火星的孩子对话',
          author: '华晨宇',
          imgUrl: 'http://p2.music.126.net/AFmJAcW7jFamQBNF68iKgw==/109951164452907718.jpg',
          mp3: 'http://music.163.com/song/media/outer/url?id=1399533630.mp3',
          isHv: 0
        },
        {
          id: '009',
          name: '孤身',
          author: '徐炳龙',
          imgUrl: 'http://p1.music.126.net/yVmtE5RFcJ1fhv-ivuyuRw==/109951164075300143.jpg',
          mp3: 'http://music.163.com/song/media/outer/url?id=1365393542.mp3',
          isHv: 0
        },
        {
          id: '010',
          name: '国王与乞丐',
          author: '华晨宇/杨宗纬',
          imgUrl: 'http://p2.music.126.net/UsSAd3Bdf77DjhCuTSEvUw==/109951163077613693.jpg?param=130y130',
          mp3: 'http://music.163.com/song/media/outer/url?id=32835565.mp3',
          isHv: 0
        },
        {
          id: '011',
          name: '这一生关于你的风景',
          author: '枯木逢春',
          imgUrl: 'http://p1.music.126.net/415A5Xt3bUegx4vyiY8dNQ==/109951164821961505.jpg',
          mp3: 'http://music.163.com/song/media/outer/url?id=1356350562.mp3',
          isHv: 0
        }
      ],
      title: '歌单',
      active: ''
    }
  },
  mounted () {
    this._initScroll()
    window.addEventListener('scroll', this.handleScroll)
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
    SongOver (i) {
      this.songList[i].isHv = 1
    },
    SongOut (i) {
      this.songList[i].isHv = 0
    }
  },
  computed: {
    user () {
      return this.$store.state.userlist
    }
  }
}
</script>

<style lang="stylus" scoped >
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
        background rgba(0,0,0,0.6)
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
                background rgba(0,0,0,0.6)
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
                    .img-wrapper
                        position relative
                        display inline-block
                        width 40%
                        height 0
                        padding-bottom 40%
                        border-radius 5px
                        background-image url('http://p2.music.126.net/gJDfYQYO8N_53CifsNzOLw==/726777185971185.jpg?param=130y130')
                        background-repeat no-repeat
                        background-size cover
                        .container
                            position relative
                            width 100%
                            height 0
                            padding-bottom 100%
                            border-radius 5px
                            background rgba(0,0,0,0.6)
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
                        display inline-block
                        color #fff
                        margin-top 10px
                        margin-left 15px
                        vertical-align top
                        .title
                            font-weight bold
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
                                span
                                    font-size 12px
                .icon-wrapper
                    display flex
                    text-align center
                    color #ffffff
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
                            // border 2px solid #000
                            height 50px
                            width 100%
                            .id
                                display inline-block
                                width 30px
                                height 30px
                                line-height 50px
                                text-align center
                                vertical-align top
                                color #999
                            .content
                                display inline-block
                                line-height 20px
                                padding 5px
                                .name
                                    font-size 14px
                                .author
                                    font-size 12px
                                    color rgba(0,0,0,0.4)
                            .mv
                                position absolute
                                right 35px
                                top 13px
                                .icon-mv
                                    font-size 24px
                            .about
                                position absolute
                                right 5px
                                top 15px
</style>
