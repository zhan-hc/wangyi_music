<template>
  <div class="Wrapper">
      <div class="header-wrapper">
          <span class="iconfont icon-fanhuipt" @click="BackPage"></span>
          <div class="search"><input type="text"/></div>
          <span class="iconfont icon-geshou"></span>
      </div>
        <div class="null_block"></div>
        <div class="scroll-wrapper" ref="ScrollWrapper">
          <div class="container">
            <div class="history-wrapper" v-show="HistoryRecords.length > 0">
              <div class="header">
                <div class="title">历史记录</div>
                <span class="iconfont icon-lajitong" @click="showHistory"></span>
              </div>
              <div class="content-wrapper" ref="contentScroll">
                <div class="content" ref="container">
                  <span v-for="(list, index) in HistoryRecords" :key="index">{{list}}</span>
                  </div>
              </div>
            </div>
            <div class="hotlist-wrapper">
              <div class="title">热搜榜</div>
              <div class="list-wrapper">
                <div class="list" v-for="(list,index) in HotList" :key="list.id">
                  <div class="order" :style="{'color' : hotcolor(index)}">{{index+1}}</div>
                  <div class="content">
                    <div class="title">{{list.searchWord}}<img v-show="list.iconType" :src="list.iconUrl"></div>
                    <div class="desc">{{list.content}}</div>
                  </div>
                  <div class="num">{{list.score}}</div>
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
  name: 'CommonSearch',
  data () {
    return {
      HotList: []
    }
  },
  mounted () {
    this._Historyinit()
    this._HotInit()
    this.Gethotlist()
  },
  computed: {
    HistoryRecords () {
      return this.$store.state.History
    }
    // HotList () {
    //   return this.$store.state.hotlist
    // }
  },
  methods: {
    BackPage () {
      this.$router.go(-1)
    },
    _Historyinit () {
      let width = this.historylength()
      this.$refs.container.style.width = width + 'px' // 给ul设置了宽度
      this.$nextTick(() => {
        if (!this.contScroll) {
          this.recScroll = new BScroll(this.$refs.contentScroll, {
            startX: 0,
            scrollX: true, // 水平滚动
            eventPassthrough: 'vertical' // 水平滚动时忽略垂直滚动
          })
        } else {
          this.contScroll.refresh()
        }
      })
    },
    _HotInit () {
      this.$nextTick(() => {
        if (!this.hotScroll) {
          this.hotScroll = new BScroll(this.$refs.ScrollWrapper, {
            click: true
          })
        } else {
          this.hotScroll.refresh()
        }
      })
    },
    historylength () {
      let len = 0
      let history = this.$store.state.History
      history.forEach(list => {
        len += (12 * list.length) + 26
      })
      return len
    },
    showHistory () {
      this.$store.commit('showHistory')
    },
    hotcolor (index) {
      if (index < 3) {
        return 'red'
      }
    },
    Gethotlist () {
      this.$nextTick(() => {
        axios.get('http://localhost:3000/search/hot/detail').then(res => res.data).then(data => {
          this.HotList = data.data
        })
      })
    }
  },
  components: {
  }
}
</script>

<style lang="stylus" scoped >
.Wrapper
    position absolute
    top 0
    left 0
    right 0
    bottom 110px
    z-index 104
    background #fff
    .header-wrapper
        position fixed
        top 0
        left 0
        width 93%
        z-index 105
        display flex
        padding 15px 10px
        .icon-fanhuipt
            width 30px
            font-size 26px
        .search
            flex 1
            input
                outline 0
                border none
                width 90%
                margin-left 5%
                font-size 3vh
                padding-bottom 5px
                border-bottom 2px solid #999
        .icon-geshou
            width 30px
            font-size 22px
    .null_block
      height 60px
    .scroll-wrapper
      position relative
      height 100%
      overflow hidden
      .container
        position relative
        .history-wrapper
          position relative
          padding 10px 20px 0 20px
          .header
            position relative
            .title
              font-weight bold
            .icon-lajitong
              position absolute
              right 0
              top 0
              font-size 20px
              color #999
          .content-wrapper
            position relative
            overflow hidden
            white-space nowrap
            .content
              position relative
              padding 15px 0
              span
                border-radius 20px
                background #DCDCDC
                font-size 12px
                font-weight bold
                padding 5px 8px
                margin-right 10px
        .hotlist-wrapper
          position relative
          margin-top 20px
          padding 0 20px
          .title
            font-weight bold
          .list-wrapper
            width 100%
            .list
              display flex
              height 50px
              margin-top 10px
              .order
                display inline-block
                width 30px
                height 40px
                line-height 40px
                vertical-align top
                // border 2px solid #000
                text-align left
              .content
                flex 1
                display inline-block
                .title
                  font-size 14px
                  img
                    margin-left 5px
                    width 14px
                    height 100%
                .desc
                  margin-top 3px
                  font-size 12px
                  color #C0C0C0
              .num
                display inline-block
                font-size 12px
                color #C0C0C0

</style>
