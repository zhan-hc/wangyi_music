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
                      <div class="name">{{list.name}}</div>
                      <div class="author"> - {{list.author}}</div>
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
                      <div class="name">{{list.name}}</div>
                      <div class="author"> - {{list.author}}</div>
                      <span class="iconfont icon-chuyidong"></span>
                  </li>
              </ul>
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="title">当前播放<span class="num">(12)</span></div>
            <div class="header-wrapper">
              <div class="audio-way"><span class="iconfont icon--lbxh"></span>列表循环</div>
              <div class="collect"><span class="iconfont icon-shoucangjia"></span>收藏全部</div>
              <div class="delete"><span class="iconfont icon-lajitong"></span></div>
            </div>
            <div class="list-wrapper" ref="NowListScroll">
              <ul class="nowlist">
                  <li class="item" v-for="list in songList" :key="list.id" @click.stop="updateSong(list)">
                      <div class="name">{{list.name}}</div>
                      <div class="author"> - {{list.author}}</div>
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
      songList: [
        {
          id: '001',
          name: '天真有邪',
          author: '林宥嘉',
          imgUrl: 'http://p1.music.126.net/oVJmUJ1bPb_9eBOFCKLclQ==/109951163167730852.jpg',
          mp3: 'http://music.163.com/song/media/outer/url?id=417833029.mp3'
        },
        {
          id: '002',
          name: '演员',
          author: '薛之谦',
          imgUrl: 'http://p2.music.126.net/qpvBqYIqkRhO9Ry2qOCdJQ==/2942293117852634.jpg',
          mp3: 'http://music.163.com/song/media/outer/url?id=32507038.mp3'
        },
        {
          id: '003',
          name: '小酒窝',
          author: '林俊杰/蔡卓妍',
          imgUrl: 'http://p1.music.126.net/s6zFxvXe5kOxub4_x4rZhQ==/109951163052847567.jpg',
          mp3: 'http://music.163.com/song/media/outer/url?id=108468.mp3'
        },
        {
          id: '004',
          name: '倒数',
          author: 'G.E.M.邓紫棋',
          imgUrl: 'http://p1.music.126.net/tXCIFsVDK6IKcQ9YWxwOEg==/109951163523944497.jpg',
          mp3: 'http://music.163.com/song/media/outer/url?id=1299550532.mp3'
        },
        {
          id: '005',
          name: '你想要的',
          author: '颜人中',
          imgUrl: 'http://p1.music.126.net/OzDIi7gUmsPkRUtF-slgYA==/109951164844070975.jpg',
          mp3: 'http://music.163.com/song/media/outer/url?id=1434309927.mp3'
        },
        {
          id: '006',
          name: 'comethru',
          author: 'Jeremy Zucker',
          imgUrl: 'http://p1.music.126.net/5T16HrYHad3Zaqh5EAfUxQ==/109951163623808339.jpg',
          mp3: 'http://music.163.com/song/media/outer/url?id=1307996767.mp3'
        },
        {
          id: '007',
          name: '重演',
          author: '王巨星',
          imgUrl: 'http://p1.music.126.net/nqw7mcUKGY-I4aKTtC9BZA==/109951164519394300.jpg',
          mp3: 'http://music.163.com/song/media/outer/url?id=1406809993.mp3'
        },
        {
          id: '008',
          name: '与火星的孩子对话',
          author: '华晨宇',
          imgUrl: 'http://p2.music.126.net/AFmJAcW7jFamQBNF68iKgw==/109951164452907718.jpg',
          mp3: 'http://music.163.com/song/media/outer/url?id=1399533630.mp3'
        },
        {
          id: '009',
          name: '孤身',
          author: '徐炳龙',
          imgUrl: 'http://p1.music.126.net/yVmtE5RFcJ1fhv-ivuyuRw==/109951164075300143.jpg',
          mp3: 'http://music.163.com/song/media/outer/url?id=1365393542.mp3'
        },
        {
          id: '010',
          name: '国王与乞丐',
          author: '华晨宇/杨宗纬',
          imgUrl: '32835565',
          mp3: 'http://music.163.com/song/media/outer/url?id=32835565.mp3'
        },
        {
          id: '011',
          name: '这一生关于你的风景',
          author: '枯木逢春',
          imgUrl: 'http://p1.music.126.net/415A5Xt3bUegx4vyiY8dNQ==/109951164821961505.jpg',
          mp3: 'http://music.163.com/song/media/outer/url?id=1356350562.mp3'
        }
      ]
    }
  },
  mounted () {
    this._ListInit()
  },
  methods: {
    _ListInit () {
      this.$nextTick(() => {
        if (!this.nowScroll) {
          this.nowScroll = new BScroll(this.$refs.NowListScroll, {
            click: true
          })
        } else {
          this.nowScroll.refresh()
        }
        if (!this.lastScroll) {
          this.lastScroll = new BScroll(this.$refs.LastListScroll, {
            click: true
          })
        } else {
          this.lastScroll.refresh()
        }
        if (!this.historyScroll) {
          this.historyScroll = new BScroll(this.$refs.HistoryListScroll, {
            click: true
          })
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
  z-index 102
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
