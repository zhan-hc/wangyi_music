<template>
  <div class="song">
      <div class="header-wrapper">
          <div class="header-top">歌曲推荐</div>
          <div class="header-left">{{message}}新歌速递</div>
          <div class="header-right"><span class="iconfont icon-bofang"></span>播放全部</div>
      </div>
      <div class="content-wrapper" ref="ContentScroll">
          <div class="container" ref="container">
              <div class="content-song" :style="{'width': clientWidth + 'px'}" v-for="(page, index) in pages" :key="index">
                  <div class="list" v-for="list in page" :key="list.id">
                      <div class="list-img"><img :src="list.album.picUrl"></div>
                      <div class="name" :class="{lineheight: haveDesc(list.alias[0])}"
                      :style="{'width': clientWidth * 0.6 + 'px'}">{{list.name}}<span class="author">  ─ &nbsp;{{GetAlAr(list.artists)}}</span></div>
                      <div class="desc"><span class="iconfont"></span>{{list.alias[0]}}</div>
                      <div class="icon"><span class="iconfont icon-bofang1" @click="updateSong(list.id)"></span></div>
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
  name: 'DiscoverSong',
  data () {
    return {
      areasong: [],
      message: '',
      clientWidth: document.body.clientWidth * 0.95
    }
  },
  computed: {
    pages () {
      const pages = []
      this.areasong.forEach((item, index) => {
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
    this.RandomRecommend()
    this._recommedinit()
  },
  methods: {
    _recommedinit () {
      let recWidth = this.clientWidth // 图片宽度
      let margin = 0
      let width = (recWidth + margin) * 3 - margin
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
    },
    updateSong (id) {
      axios.get('http://localhost:3000/song/detail?ids=' + id).then(res => res.data).then(data => {
        if (data.code === 200) {
          console.log(data.songs[0])
          this.$store.commit('ChangeSong', data.songs[0])
          this.$store.commit('PlayAudio')
        }
      })
    },
    RandomRecommend () {
      var rad = Math.floor(Math.random() * 4)
      var area = ['欧美', '华语', '日本', '韩国']
      let newsong = {'欧美': 96, '华语': 7, '日本': 8, '韩国': 16}
      this.message = area[rad]
      axios.get('http://localhost:3000/top/song?type=' + newsong[area[rad]]).then(res => res.data).then(data => {
        for (var i = 0; i < 9; i++) {
          this.areasong.push(data.data[i])
        }
      })
    },
    GetAlAr (listar) {
      var detail = ''
      listar.forEach((item, index) => {
        if (index === listar.length - 1) {
          detail += item.name
        } else {
          detail += item.name + '/'
        }
      })
      return detail
    },
    haveDesc (desc) {
      if (!desc) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="stylus" scoped >
@import '~styles/mixins.styl'
// .desc-active
//     background rgba(255,192,203,0.5)
//     color #DC143C !important
//     border-radius 2px
.lineheight {
  line-height 40px
}
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
                    // min-width 0
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
                        // border 2px solid red
                        // width 200px
                        ellipsis()
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
