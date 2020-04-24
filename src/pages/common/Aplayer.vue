<template>
  <router-link tag="div" class="aplayer" to="/lyrics">
    <div class="aplayer-img">
      <img :src="SongList.al.picUrl"/>
    </div>
    <div class="content">
      <div class="title">{{SongList.name}}</div>
      <div class="author">{{SongList.ar[0].name}}</div>
    </div>
    <div class="play">
      <span class="iconfont" :class="AudioStatu" @click.stop="play"></span>
    </div>
    <div class="about">
      <span class="iconfont icon-caidan" @click.stop="ShowMenu"></span>
    </div>
    <audio ref="audio" :src="'http://music.163.com/song/media/outer/url?id=' + SongList.id + '.mp3'"></audio>
  </router-link>
</template>

<script type="text/javascript">
export default {
  name: 'CommonAplayer',
  data () {
    return {
      a_play: true,
      a_pause: false
    }
  },
  computed: {
    AudioStatu () {
      if (this.$store.state.AudioStatus) {
        return 'icon-bofang2'
      } else {
        return 'icon-zanting1'
      }
    },
    SongList () {
      return this.$store.state.SongList
    }
  },
  mounted () {
    this.$refs.audio.oncanplay = () => { // 音乐准备播放前执行
      this.$store.commit('SongTime', this.transTime(this.$refs.audio.duration))
      if (this.$store.state.AudioStatus) {
        this.$refs.audio.play()
      }
    }
    this.$refs.audio.ontimeupdate = () => { // 当媒介改变其播放位置时执行
      this.$store.commit('UpdateSongNow', this.transTime(this.$refs.audio.currentTime))
      this.$store.commit('UpdateSongX', (((this.$refs.audio.currentTime / this.$refs.audio.duration) * this.$store.state.SongWidth) + 57) + 'px')
      this.$store.commit('UpdateSongRate', ((this.$refs.audio.currentTime / this.$refs.audio.duration * this.$store.state.SongWidth)).toFixed(2) + 'px')
    }
  },
  watch: {
    '$store.state.AudioStatus' () { // 监听播放的全局的播放状态
      if (this.$store.state.AudioStatus) {
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    },
    '$store.state.SpotMove' () { // 当移动进度条时触发
      let time = (((this.$store.state.Song_X.slice(0, -2) - 57) / this.$store.state.SongWidth) * this.$refs.audio.duration).toFixed(6)
      this.$refs.audio.currentTime = time
      this.$store.commit('ChangecurrentTime', time)
    }
  },
  methods: {
    play () {
      this.$store.commit('changeAudioStatus')
    },
    transTime (times) { // 将音乐播播放格式变为 00:00
      var t
      if (times > -1) {
        var hour = Math.floor(times / 3600) * 60
        var min = Math.floor(times / 60) % 60
        var sec = times % 60
        if (hour > 0) {
          t = (hour + min).toString()
        } else {
          if (min < 10) {
            t = '0' + min
          } else {
            t = min
          }
        }
        t += ':'
        if (sec < 10) {
          t += '0'
        }
        t += Math.floor(sec)
      }
      return t
    },
    ShowMenu () {
      this.$store.commit('showMenu')
    }
  },
  components: {
  }
}
</script>

<style lang="stylus" scoped >
.aplayer
    position fixed
    bottom 0px
    left 0px
    z-index 106
    width 100%
    height 50px
    background #ffffff
    border-top 1px solid #ccc
    .aplayer-img
      position relative
      width 40px
      height 40px
      padding 5px
      img
        width 100%
        border-radius 50%
    .content
      position absolute
      left 55px
      bottom 10px
      letter-spacing 1px
      .title
        font-size 12px
      .author
        font-size 10px
        color #999
    .play
      position absolute
      right 50px
      bottom 8px
      .icon-zanting1
        font-size 32px
      .icon-bofang2
        font-size 32px
    .about
      position absolute
      right 10px
      bottom 13px
      .icon-caidan
        font-size 24px
</style>
