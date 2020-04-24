<template>
  <div class="Wrapper">
      <div class="header-wrapper">
          <router-link tag="span" to="/" class="iconfont icon-fanhuipt"></router-link>
          <div class="search"><input type="text" v-model="message" @keyup="GetSearchSuggest"></div>
          <span class="iconfont icon-geshou"></span>
      </div>
      <div class="search-suggest" v-show="suggestStatus">
          <div class="title" @click="SearchResult(message)">搜索  “{{message}}”</div>
          <div class="list">
              <div class="item" @click="SearchResult(item.keyword)" v-for="(item, index) in suggestList" :key="index">
                  <span class="iconfont icon-sousuo"></span>
                  <div class="content">{{item.keyword}}</div>
              </div>
          </div>
      </div>
        <div class="null_block"></div>
        <div class="scroll-wrapper" ref="ScrollWrapper">
          <div class="container">
            <div class="history-wrapper" v-show="HistoryNum">
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
                <div class="list" v-for="(list,index) in HotList" :key="list.id" @click="SearchResult(list.searchWord)">
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
      HotList: [],
      message: '',
      suggestList: []
    }
  },
  mounted () {
    this._Historyinit()
    this._HotInit()
    this.Gethotlist()
  },
  computed: {
    HistoryRecords () {
      return this.$store.state.history
    },
    suggestStatus () {
      if (this.message === '') {
        return false
      } else {
        return true
      }
    },
    HistoryNum () {
      if (this.HistoryRecords.length === 0) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    _Historyinit () { // 历史记录初始化
      if (this.HistoryNum) {
        return
      }
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
    _HotInit () { // 热门搜索排行榜初始化
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
    historylength () { // 返回历史记录的呃呃长度
      let len = 0
      this.HistoryRecords.forEach(list => {
        len += (12 * list.length) + 26
      })
      return len
    },
    showHistory () {
      this.$store.commit('showHistory')
    },
    hotcolor (index) { // 如果是前三名显示红色
      if (index < 3) {
        return 'red'
      }
    },
    Gethotlist () { // 获取排行榜数据
      this.$nextTick(() => {
        axios.get('http://localhost:3000/search/hot/detail').then(res => res.data).then(data => {
          this.HotList = data.data
        })
      })
    },
    GetSearchSuggest () { // 获取搜索建议
      // console.log(this.message.length)
      if (this.message === ' ') {
        this.message = this.message.trim()
      }
      if (this.message !== '') {
        setTimeout(
          axios.get('http://localhost:3000/search/suggest?keywords=' + this.message + '&type=mobile').then(res => res.data).then(data => {
            if (data.code === 200) {
              this.suggestList = data.result.allMatch
            }
          }), 1000)
      }
    },
    SearchResult (text) {
      this.$store.commit('AddHistory', text)
      this.$store.commit('ChangeSearch', text)
      this.$router.push({
        path: '/searchresult'
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
    .search-suggest
      z-index 105
      position absolute
      left 15px
      top 60px
      width 80%
      background #fff
      box-shadow 1px 1px 2px 2px #ccc
      // border 2px solid red
      .title
        color #4169E1
        padding 10px
        border-bottom 1px solid #D3D3D3
      .list
        .item
          border-bottom 1px solid #D3D3D3
          padding 10px
          color #808080
          .icon-sousuo
            display inline-block
            margin-right 5px
          .content
            display inline-block
            // font-size 14px
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
