<template>
  <div class="menu" @click="HideMenu">
    <div class="swiper-wrapper">
      <swiper :options="swiperOption">
        <swiper-slide>
            <div class="title">历史播放</div>
            <div class="header-wrapper">
              <div class="desc">来自首页推荐</div>
            </div>
            <div class="list-wrapper" ref="HistoryListScroll">
              <ul class="nowlist">
                  <li class="item" v-for="list in songList" :key="list.id"  @click.stop="updateSong(list)">
                      <div class="name">{{list.song.name}}</div>
                      <div class="author"> - {{list.song.ar[0].name}}</div>
                      <span class="iconfont icon-chuyidong"></span>
                  </li>
              </ul>
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="title">上次播放</div>
            <div class="header-wrapper">
              <div class="desc">来自首页推荐</div>
            </div>
            <div class="list-wrapper" ref="LastListScroll">
              <ul class="nowlist">
                  <li class="item" v-for="list in songList" :key="list.id" @click.stop="updateSong(list)">
                      <div class="name">{{list.song.name}}</div>
                      <div class="author"> - {{list.song.ar[0].name}}</div>
                      <span class="iconfont icon-chuyidong"></span>
                  </li>
              </ul>
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="title">当前播放<span class="num">({{this.recently_num}})</span></div>
            <div class="header-wrapper">
              <div class="audio-way"><span class="iconfont icon--lbxh"></span>列表循环</div>
              <div class="collect"><span class="iconfont icon-shoucangjia"></span>收藏全部</div>
              <div class="delete"><span class="iconfont icon-lajitong"></span></div>
            </div>
            <div class="list-wrapper" ref="NowListScroll">
              <ul class="nowlist">
                  <li class="item" v-for="list in songList" :key="list.id" @click.stop="updateSong(list.song)">
                      <div class="name">{{list.song.name}}</div>
                      <div class="author"> - {{list.song.ar[0].name}}</div>
                      <span class="iconfont icon-chuyidong"></span>
                  </li>
              </ul>
            </div>
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script type="text/javascript">
import BScroll from 'better-scroll'
import axios from 'axios'
export default {
  name: 'CommonMenu',
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        loop: false,
        autoplay: false,
        initialSlide: 2,
        observeParents: true,
        observer: true
      },
      songList: [],
      recently_num: 0
    }
  },
  mounted () {
    this._ListInit()
    this.GetRecently()
  },
  methods: {
    _ListInit () {
      this.$nextTick(() => {
        if (!this.nowScroll) {
          this.nowScroll = new BScroll(this.$refs.NowListScroll, {
            click: true
          })
          // this.$refs.NowListScroll.style.height = document.body.clientHeight * 0.5 + 'px'
        } else {
          this.nowScroll.refresh()
        }
        if (!this.lastScroll) {
          this.lastScroll = new BScroll(this.$refs.LastListScroll, {
            click: true
          })
          // this.$refs.LastListScroll.style.height = document.body.clientHeight * 0.5 + 'px'
        } else {
          this.lastScroll.refresh()
        }
        if (!this.historyScroll) {
          this.historyScroll = new BScroll(this.$refs.HistoryListScroll, {
            click: true
          })
          // this.$refs.HistoryListScroll.style.height = document.body.clientHeight * 0.5 + 'px'
        } else {
          this.historyScroll.refresh()
        }
      })
    },
    HideMenu () {
      this.$store.commit('hideMenu')
    },
    updateSong (list) {
      this.$store.commit('ChangeSong', list)
      this.$store.commit('PlayAudio')
    },
    GetRecently () {
      let id = this.$store.state.userlist.userId
      axios.get('http://localhost:3000/user/record?uid=' + id + '&type=1').then(res => res.data).then(data => {
        this.songList = data.weekData
        this.recently_num = this.songList.length
      })
    }
  }
}
</script>

<style lang="stylus" scoped >
@import '~styles/mixins.styl'
// .swiper-container >>> .swiper-pagination-bullet-active
//     background: rgba(255,255,255,0.8)
.menu
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  z-index 106
  margin 0
  padding 20px
  background rgba(0,0,0,0.5)
  box-sizing border-box
  .swiper-wrapper
    position relative
    height 70%
    background #fff
    margin-top 60%
    border-radius 10px
    // box-shadow -6px 0px 3px #333333
    .title
      margin 20px 20px 10px 20px
      font-weight bold
      .num
        color #999
        margin-left 10px
        font-size 14px
        font-weight 500
    .header-wrapper
      position relative
      color rgba(0,0,0,0.8)
      padding-bottom 10px
      .audio-way
        display inline-block
        font-size 13px
        margin-left 20px
        .icon--lbxh
          margin-right 5px
      .desc
        color #999
        font-size 12px
        padding-left 20px
      .collect
        display inline-block
        margin-left 20%
        font-size 13px
        .icon-shoucangjia
          margin-right 5px
          font-size 13px
      .delete
        position absolute
        right 0
        top 0
        float right
        padding 0 10px
        border-left 2px solid #ccc
    .list-wrapper
      overflow hidden
      height 280px
      .nowlist
        list-style-type none
        padding 5px 20px
        .item
          width 70%
          padding-bottom 10px
          ellipsis()
          .name
            display inline-block
            font-size 14px
          .author
            display inline-block
            font-size 12px
            color #999
          .icon-chuyidong
            position absolute
            right 20px
            color #999
            font-size 14px
    // .swiper-pagination
    //   position fixed
    //   top -8%
    //   left 0
</style>
