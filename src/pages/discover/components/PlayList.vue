<template>
  <div class="wrapper">
      <div class="header-wrapper">
          <div class="title-wrapper">
              <router-link tag="div" to="/" class="back"><span class="iconfont icon-fanhuipt"></span></router-link>
              <div class="title">歌单广场</div>
          </div>
          <div class="type-wrapper">
            <div class="list" v-for="(list,index) in titleList" :key="list.id" @click="ActiveClick(list.name,index)">
              <span :class="{'list-active':HaveActive(index)}">{{list.name}}</span>
            </div>
          </div>
      </div>
      <div class="content-wrapper">
        <div class="carousel-wrapper">
          <carousel-3d width="150" height="210" border="0" space="160" perspective="10">
            <slide class="carousel" v-for="(list,index) in carouseList" :key="index" :index="index">
              <div class="content">
                <img :src="list.coverImgUrl">
                <div class="desc">{{list.copywriter}}</div>
                <div class="play"><span class="iconfont icon-bofang"></span></div>
                <div class="num"><span class="iconfont icon-pause"></span>{{NumFilter(list.playCount)}}</div>
              </div>
            </slide>
          </carousel-3d>
        </div>
        <div class="main-wrapper">
          <div class="item-wrapper" v-for="(page,index) in pages" :key="index">
            <div class="item" v-for="list in page" :key="list.id" @click="playdetail(list.id)">
              <div class="img-wrapper">
                <img :src="list.coverImgUrl">
              </div>
              <div class="desc">{{list.copywriter}}</div>
              <div class="num"><span class="iconfont icon-pause"></span>{{NumFilter(list.playCount)}}</div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script type="text/javascript">
import axios from 'axios'
import { Carousel3d, Slide } from 'vue-carousel-3d'
export default {
  name: 'DiscoverPlayList',
  data () {
    return {
      tindex: 0,
      titleList: [
        {
          id: '01',
          name: '推荐'
        },
        {
          id: '02',
          name: '华语'
        },
        {
          id: '03',
          name: '民谣'
        },
        {
          id: '04',
          name: '电子'
        },
        {
          id: '05',
          name: '轻音乐'
        }
      ],
      carList: []
    }
  },
  mounted () {
    this.init_playlist()
  },
  watch: {
    playList () {
      this.$forceUpdate()
    }
  },
  computed: {
    carouseList () {
      let clist = []
      for (var i = 0; i < 3; i++) {
        clist.push(this.playList[i])
      }
      return clist
    },
    recomList () {
      let list = JSON.parse(JSON.stringify(this.playList))
      list.splice(0, 3)
      return list
    },
    playList () {
      return this.$store.state.recplaylist
    },
    pages () {
      const pages = []
      this.recomList.forEach((item, index) => {
        const page = Math.floor(index / 3) // icon处在第几页
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages
    }
  },
  methods: {
    ActiveClick (name, index) {
      this.tindex = index
      if (name === '推荐') {
        name = ''
      }axios.get('http://localhost:3000/top/playlist/highquality?cat=' + name).then(res => res.data).then(data => {
        if (data.code === 200) {
          this.$store.commit('Changerecplay', data.playlists)
        }
      })
    },
    HaveActive (index) {
      if (index === this.tindex) {
        return true
      } else {
        return false
      }
    },
    init_playlist () {
      this.$nextTick(() => {
        axios.get('http://localhost:3000/top/playlist/highquality').then(res => res.data).then(data => {
          if (data.code === 200) {
            this.$store.commit('Changerecplay', data.playlists)
          }
        }).catch((error) => {
          console.log(error.response.status)
        })
      })
    },
    NumFilter (num) {
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
    playdetail (id) {
      localStorage.playlist_id = id
      this.$router.push('/playdetail')
    }
  },
  components: {
    Carousel3d,
    Slide
  }
}
</script>

<style lang="stylus" scoped >
@import '~styles/mixins.styl'
.list-active{
  color red
  font-weight bold
  border-bottom 2px solid red
}
.wrapper
  position relative
  margin-top 20px
  .header-wrapper
    position fixed
    top 0
    left 0
    right 0
    z-index 105
    height 110px
    background-image: linear-gradient(rgb(135,206,250), #fff)
    .title-wrapper
      position relative
      padding 20px
      .back
        display inline-block
        margin-right 10px
        .icon-fanhuipt
          font-size 24px
      .title
        display inline-block
    .type-wrapper
      position relative
      display flex
      overflow hidden
      white-space nowrap
      padding 10px 20px
      border-bottom 1.5px solid #ccc
      .list
        flex 1
        margin-right 40px
  .content-wrapper
    position relative
    .carousel-wrapper
      margin-top 80px
      .carousel
        // position relative
        // background #fff
        border-radius 5px
        box-shadow 2px 2px 2px #888888
        .content
          position relative
          height 160px
          width 100%
          background #fff
          border-bottom 5px solid #fff
          img
            width 100%
            height 100%
            border-radius 5px 5px 0 0
          .desc
            height 35px
            // border 2px solid red
            background #fff
            font-size 12px
            padding 5px
          .play
            position absolute
            bottom 10px
            right 10px
            padding 3px 9px 5px 9px
            border-radius 50%
            background rgba(255,255,255,0.7)
            text-align center
            .icon-bofang
              color red
              font-size 12px
          .num
            position absolute
            top 5px
            right 10px
            color #ffffff
            font-size 12px
            .icon-pause
              font-size 12px
    .main-wrapper
      position relative
      padding 10px
      margin-bottom 50px
      .item-wrapper
        position relative
        display flex
        margin-bottom 10px
        .item
          position relative
          flex 1
          margin-right 10px
          // min-width 0
          .img-wrapper
            width 100%
            height 100px
            // padding-bottom 100%
            img
              width 100%
              height 100%
              border-radius 5px
          .desc
            font-size 12px
            padding 5px
            letter-spacing 1px
            max-height 30px
            ellipsis-row(2)
          .num
            position absolute
            top 5px
            right 10px
            color #ffffff
            font-size 10px
            .icon-pause
              font-size 10px

</style>
