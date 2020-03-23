<template>
  <div class="aplayer">
    <div class="aplayer-img">
      <img src="http://p2.music.126.net/6TNYBV2rezZLiwsGYBgmPw==/123145302311773.jpg"/>
    </div>
    <div class="content">
      <div class="title">幻听</div>
      <div class="author">许嵩</div>
    </div>
    <div class="play">
      <span class="iconfont" :class="{'icon-zanting1':a_play,'icon-bofang2':a_pause}" @click="play()"></span>
    </div>
    <div class="about">
      <span class="iconfont icon-caidan"></span>
    </div>
    <audio ref="audio" src="http://music.163.com/song/media/outer/url?id=167655.mp3"></audio>
  </div>
</template>

<script type="text/javascript">
import Aplayer from 'vue-aplayer'
export default {
  name: 'CommonAplayer',
  data () {
    return {
      a_play: true,
      a_pause: false
    }
  },
  methods: {
    play () {
      if (this.$store.state.AudioStatus) {
        this.$store.commit('changeAudioStatus')

        this.a_play = true
        this.a_pause = false
        this.$refs.audio.pause()
      } else {
        this.$store.commit('changeAudioStatus')
        this.a_play = false
        this.a_pause = true
        this.$refs.audio.play()
      }
    }
  },
  components: {
    Aplayer
  }
}
</script>

<style lang="stylus" scoped >
.aplayer
    position fixed
    bottom 0px
    left 0px
    z-index 99
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
