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
                <div class="list" v-for="(list,index) in hotList" :key="list.id">
                  <div class="order">{{index+1}}</div>
                  <div class="content">
                    <div class="title">{{list.name}}<span class="iconfont" :class="list.icon"></span></div>
                    <div class="desc">{{list.desc}}</div>
                  </div>
                  <div class="num">{{list.num}}</div>
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
  name: 'CommonSearch',
  data () {
    return {
      hotList: [
        {
          id: '001',
          name: '微微',
          desc: '微微 去喜欢 这微微 小世界',
          num: '2573061'
        },
        {
          id: '002',
          name: '夏天的风',
          desc: '单曲循环无数次 回忆杀',
          num: '2421497',
          icon: 'icon-HOT'
        },
        {
          id: '003',
          name: '歌手当打之年',
          desc: '华晨宇新歌首发夺冠',
          num: '2113299',
          icon: 'icon-HOT'
        },
        {
          id: '004',
          name: '华晨宇',
          desc: '花花的歌声里 有少年的孤傲',
          num: '1559392',
          icon: 'icon-HOT'
        },
        {
          id: '005',
          name: '飘向北方',
          desc: '梦想在哪里，他们就飘到哪里',
          num: '1515802'
        },
        {
          id: '006',
          name: '国王与乞丐',
          desc: '一起感受华晨宇的绝美吟唱！',
          num: '1112238'
        },
        {
          id: '007',
          name: 'Relationship',
          desc: '说唱是疯狂的 也是真诚的',
          num: '1104167'
        },
        {
          id: '008',
          name: 'Zyn Zyn',
          desc: '上班困了？ 来首歌醒脑！',
          num: '1082242'
        },
        {
          id: '009',
          name: '吹梦到西洲',
          desc: '南风知我意，吹梦到西洲。',
          num: '973245',
          icon: 'icon-HOT'
        },
        {
          id: '010',
          name: 'dat $tick',
          desc: '进来感受7哥的低音炮吧！',
          num: '942912'
        },
        {
          id: '011',
          name: '你',
          desc: '你，是这个世界上最短的诗句',
          num: '847716'
        },
        {
          id: '012',
          name: '林俊杰',
          desc: '一千年以后，还是学不会爱你',
          num: '776279'
        },
        {
          id: '013',
          name: '冬眠',
          desc: '外面好冷 可以一起冬眠吗',
          num: '765586'
        },
        {
          id: '014',
          name: '死也爱你',
          desc: '噪音也太深情了！',
          num: '761594',
          icon: 'icon-shang'
        },
        {
          id: '015',
          name: '你是人间四月天',
          desc: '你是人间四月天，笑声点亮四面神',
          num: '7396666'
        }
      ]
    }
  },
  mounted () {
    this._Historyinit()
    this._HotInit()
  },
  computed: {
    HistoryRecords () {
      return this.$store.state.History
    }
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
                height 50px
                line-height 50px
                vertical-align top
                text-align left
              .content
                flex 1
                display inline-block
                .title
                  font-size 14px
                  .iconfont
                    color red
                .desc
                  margin-top 3px
                  font-size 12px
                  color #C0C0C0
              .num
                display inline-block
                font-size 12px
                color #C0C0C0

</style>
