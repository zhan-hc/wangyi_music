<template>
  <div class="lyrics" :style="{'background': SongList.background ? SongList.background : 'linear-gradient(#171B1E, #354650, #171B24)'}">
      <div class="wrapper">
          <div class="header">
              <div class="back"><span class="iconfont icon-fanhuipt" @click="HideLyrics"></span></div>
              <div class="text">
                  <span class="title">{{SongList.name}}</span>
                  <span class="authors">{{SongList.ar[0].name}} ></span>
              </div>
              <div class="share"><span class="iconfont icon-fenxiangpt"></span></div>
          </div>
          <div class="content" @click="ChangeLyricStatu">
              <div class="stylus" v-show="lyricstatus">
                <div class="box">
                  <div class="stylus_1" :style="{'transform':ChangeStylus}">
                    <div class="stylus_2">
                      <div class="stylus_3"></div>
                      <div class="stylus_4">
                        <div class="stylus_5">
                          <div class="stylus_6"></div>
                          <div class="stylus_7">
                            <div class="stylus_8">
                              <div class="stylus_9"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="level_1" v-show="lyricstatus" :style="{'animation-play-state':Animation}">
                  <div class="level_2">
                      <div class="level_3">
                          <img :src="SongList.al.picUrl"/>
                      </div>
                  </div>
              </div>
              <div class="song-lyric" ref="lyricList" v-show="!lyricstatus">
                <div class="lyric-wrapper">
                  <div v-if="currentLyric">
                    <div class="item" ref="lyricLine" v-for="(list, index) in songLyric"
                     :key="index" :class="{'current': currentLineNum === index}">{{list.txt}}</div>
                  </div>
                </div>
              </div>
          </div>
          <div class="footer">
              <div class="content-wrapper">
                  <div class="function">
                      <span class="iconfont" @click="ChangeLikeStatus" :class="{'icon-xihuan-kongpt': likestatus,'icon-xihuan-wangyiicon':!likestatus}"></span>
                      <span class="iconfont icon-xiazaipt"></span>
                      <span class="iconfont icon-lingsheng1"></span>
                      <span class="iconfont icon-pinglunpt1"></span>
                      <span class="iconfont icon-xinxipt"></span>
                  </div>
                  <div class="progress">
                      <div class="now-time">{{SongStartTime}}</div>
                      <div class="now-progress" ref="abc" @mousedown="move"></div>
                      <div class="sum-time">{{SongSumTime}}</div>
                      <div class="spot" ref="spot" :style="{'left': Song_X}" ></div>
                      <div class="after-time" :style="{'width': SongRate}"></div>
                  </div>
                  <div class="main">
                      <span class="iconfont icon--lbxh"></span>
                      <span class="iconfont icon-xiangyiqu" @click="LastSong"></span>
                      <span class="iconfont" :class="AudioStatu" @click="play"></span>
                      <span class="iconfont icon-xiayiqu-wangyiicon" @click="NextSong"></span>
                      <span class="iconfont icon-caidan-wangyiicon"></span>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script type="text/javascript">
import BScroll from 'better-scroll'
import Lyric from 'lyric-parser'
import axios from 'axios'
export default {
  name: 'CommonLyrics',
  data () {
    return {
      positionX: 0,
      positionY: 0,
      currentLyric: null, // 设置一个歌词维护属性
      currentLineNum: 0,
      songLyric: [],
      lyricstatus: true,
      lyric: null,
      likestatus: true
    }
  },
  watch: {
    '$store.state.AudioStatus' () { // 监听播放的全局的播放状态
      // if (this.$store.state.AudioStatus) {
      //   this.$refs.audio.play()
      // } else {
      //   this.$refs.audio.pause()
      // }
      this.currentLyric.togglePlay()
    }
  },
  mounted () {
    this.$store.commit('UpdateSongWidth', this.$refs.abc.offsetWidth)
    this.init_LyricScroll()
  },
  methods: {
    HideLyrics () {
      this.$router.go(-1)
    },
    play () {
      this.$store.commit('changeAudioStatus')
    },
    move (e) {
      this.positionX = e.offsetX // 获取鼠标移动的水平位移
      this.$store.commit('UpdateSongX', this.positionX + 57 + 'px')
      this.$store.commit('UpdateSpotMove', this.positionX + 'px')
      this.timer = setTimeout(() => {
        this.currentLyric.seek(this.$store.state.currentTime * 1000)
      }, 100)
    },
    handleLyric ({lineNum, txt}) {
      this.currentLineNum = lineNum
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5]
        this.lyricList.scrollToElement(lineEl, 1000)// 滚动到元素
      } else {
        this.lyricList.scrollTo(0, 0, 1000)// 滚动到顶部
      }
      this.playingLyric = txt
    },
    init_LyricScroll () { // 初始化歌词的滚动
      this.$nextTick(() => {
        this.$refs.lyricList.style.height = window.screen.height - 200 + 'px'
        if (!this.lyricList) {
          this.lyricList = new BScroll(this.$refs.lyricList, {
            click: true
          })
        } else {
          this.lyricList.refresh()
        }
        this.play_Lyric()
      })
    },
    play_Lyric () {
      // this.$nextTick(() => {
      // console.log(this.SongList.id)
      axios.get('http://localhost:3000/lyric?id=' + this.SongList.id).then(res => res.data).then(data => {
        if (data.code === 200) {
          if (data.lrc) {
            this.lyric = data.lrc.lyric // 歌词数据
            this.currentLyric = new Lyric(this.lyric, this.handleLyric) // this.handleLyric回调函数
            this.songLyric = this.currentLyric.lines
            if (this.$store.state.AudioStatus) {
              this.currentLyric.play()
            }
          } else {
            this.songLyric = [{'txt': '还没收录歌词'}]
          }
        }
      })
      // })
    },
    ChangeLyricStatu () { // 点击变换成歌词或唱盘
      this.lyricstatus = !this.lyricstatus
    },
    ChangeLikeStatus () {
      this.likestatus = !this.likestatus
    },
    NextSong () {
      if (this.currentLyric) {
        this.currentLyric.stop()
      }
      var sq = parseInt(this.SongList.index)
      if (sq === this.Nowlist.length - 1) {
        sq = -1
      }
      this.Nowlist[sq + 1].index = sq + 1
      this.$store.commit('ChangeSong', this.Nowlist[sq + 1])
      this.play_Lyric()
    },
    LastSong () {
      var sq = parseInt(this.SongList.index)
      if (sq === 0) {
        sq = this.Nowlist.length
      }
      this.Nowlist[sq - 1].index = sq - 1
      this.$store.commit('ChangeSong', this.Nowlist[sq - 1])
    }
  },
  computed: {
    SongStartTime () {
      return this.$store.state.SongNowTime
    },
    SongSumTime () {
      return this.$store.state.SongSumTime
    },
    Song_X () {
      return this.$store.state.Song_X
    },
    SongRate () {
      return this.$store.state.SongRate
    },
    SongList () {
      return this.$store.state.SongList
    },
    AudioStatu () { // 控制播放暂停的图标
      if (this.$store.state.AudioStatus) {
        return 'icon-bofang2'
      } else {
        return 'icon-zanting1'
      }
    },
    Animation () { // 控制光碟的动画
      if (this.$store.state.AudioStatus) {
        return 'running'
      } else {
        return 'paused'
      }
    },
    ChangeStylus () {
      if (this.$store.state.AudioStatus) {
        return 'rotate(-18deg)'
      } else {
        return 'rotate(-50deg)'
      }
    },
    Nowlist () {
      return this.$store.state.NowList
    }
  },
  components: {
  }
}

</script>

<style lang="stylus" scoped >
@keyframes changDeg{
0%{
transform: rotate(0deg);
}
100%{
transform: rotate(360deg);
}
}
.current{
  color #fff
}
.lyrics
    position fixed
    left 0
    top 0
    z-index 106
    // background-image linear-gradient(#0d080a,#8d0744,#311c25)
    width 100%
    height 100%
    .wrapper
        width 100%
        display flex
        flex-direction column
        height 100%
        .header
            flex 0 0 40px
            position relative
            display inline-block
            height 40px
            width 100%
            color #fff
            padding 15px 10px 10px 10px
            .back
                position relative
                display inline-block
                vertical-align top
                .icon-fanhuipt
                    font-size 24px
            .text
                display inline-block
                margin-left 15px
                .title
                    display block
                .authors
                    display block
                    color #999
                    font-size 12px
            .share
                display inline-block
                vertical-align top
                float right
                margin-right 20px
                .icon-fenxiangpt
                    font-size 24px
        .content
            flex 1
            margin auto
            // width 100%
            text-align center
            overflow hidden
            .stylus
              .box
                position absolute
                width 100%
                display flex
                justify-content center
                .stylus_1
                  position relative
                  border-radius 50%
                  width 25px
                  height 25px
                  background rgba(0, 0, 0, 0.2)
                  z-index: 1
                  transform:rotate(-18deg);
                  transition: all 2s ease-in-out;
                  .stylus_2
                    width 76%
                    height 76%
                    border-radius 50%
                    margin 12%
                    background-color #ffffff
                    display flex
                    justify-content center
                    align-items center
                    z-index 2
                    .stylus_3
                      width 40%
                      height 40%
                      border-radius 50%
                      background-color #e5e5e5
                    .stylus_4
                      width 25%
                      height 200%
                      position absolute
                      z-index -3
                      top 20%
                      border-radius 50px
                      background linear-gradient(to right, #b3b3b1, #d3d3d3, #b3b3b1)
                      // border 1px solid #fff
                      .stylus_5
                        width:100%
                        height:56%
                        position:relative
                        bottom:-88%
                        left: 6px
                        background: linear-gradient(to right, #b3b3b1, #d3d3d3, #b3b3b1)
                        transform:rotate(-25deg)
                        // border 1px solid #fff
                        .stylus_6
                          width 30%
                          height 20%
                          background-color #3e3e3e
                          position absolute
                          bottom 0
                          left 35%
                          border-radius 10px 10px 0 0
                        .stylus_7
                          width 135%
                          height 60%
                          border-radius 5px 5px 0 0
                          position absolute
                          bottom -58%
                          left -15%
                          background linear-gradient(#b3b3b1, #d3d3d3)
                          .stylus_8
                            width 150%
                            height 75%
                            position relative
                            bottom -98%
                            left -2px
                            border-radius 2px
                            background: linear-gradient(to right, #b3b3b1, #d3d3d3, #b3b3b1)
                            .stylus_9
                              width: 8%;
                              height: 50%;
                              background-color: #b1b1b1;
                              position: absolute;
                              top: 20%;
                              left 5px
            .level_1
                width 70%
                height 0
                padding-bottom 70%
                margin 15% auto
                border-radius 50%
                border 3px solid #696969
                animation changDeg 10s linear infinite
                .level_2
                    display inline-block
                    z-index 2
                    width 100%
                    height 0
                    padding-bottom 100%
                    background-color #262628
                    border-radius 50%
                    background linear-gradient(#101012, #272729, #101012)
                    .level_3
                        position relative
                        z-index 3
                        width 60%
                        height 0
                        padding-bottom 60%
                        margin 20% auto
                        // padding-top 20%
                        background #fff
                        border-radius 50%
                        vertical-align middle
                        color #fff
                        border 4px solid #000
                        img
                            width 100%
                            border-radius 50%
            .song-lyric
              position relative
              color #999
              overflow hidden
              .lyric-wrapper
                .item
                  width 100%
                  margin 15px 0
        .footer
            position relative
            height 160px
            .content-wrapper
                .function
                    position relative
                    text-align center
                    padding-top 10px
                    display flex
                    color rgba(255,255,255,0.8)
                    // margin-top 20px
                    .icon-xihuan-wangyiicon
                        color red
                    .iconfont
                        flex 1
                        font-size 24px
                .progress
                    // width 100%
                    display flex
                    color rgba(255,255,255,0.6)
                    position relative
                    margin-top 15px
                    .now-time
                        flex 0 0 20px
                        font-size 10px
                        padding-left 20px
                    .sum-time
                        flex 0 0 20px
                        padding-right 20px
                        font-size 10px
                    .now-progress
                        margin 0 10px
                        flex 1
                        border-bottom 2px solid #696A6C
                    .spot
                        position absolute
                        bottom -1px
                        background #ffffff
                        width 5px
                        height 5px
                        border-radius 50%
                    .after-time
                        position absolute
                        bottom 0
                        left 57px
                        border-bottom 2px solid #969799
                .main
                    position fixed
                    bottom 0
                    left 0
                    padding-bottom 20px
                    line-height 65px
                    width 100%
                    display flex
                    color #fff
                    text-align center
                    .icon--lbxh,.icon-xiangyiqu,.icon-xiayiqu-wangyiicon,.icon-caidan-wangyiicon
                        flex 1
                        font-size 24px
                    .icon-zanting1,.icon-bofang2
                        flex 1
                        font-size 65px

</style>
