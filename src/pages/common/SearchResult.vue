<template>
  <div class="Wrapper">
      <div class="header-wrapper">
          <router-link tag="span" to="/search" class="iconfont icon-fanhuipt"></router-link>
          <div class="search"><input type="text" v-model="message" @keyup="GetSearchSuggest"></div>
          <span class="iconfont icon-chuyidong" @click="Emptymsg"></span>
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
      <div class="title-wrapper">
        <div class="title">
          <span class="title-active">综合</span>
        </div>
        <div class="title">
          <span>单曲</span>
        </div>
        <div class="title">
          <span>云村</span>
        </div>
        <div class="title">
          <span>视频</span>
        </div>
        <div class="title">
          <span>歌手</span>
        </div>
      </div>
      <div class="null_block"></div>
      <div class="content-wrapper">
        <div class="content">
          <div class="singles-wrapper">
            <div class="header">
              <div class="title">单曲</div>
              <div class="all">
                <span class="iconfont icon-bofang1"></span>播放全部
              </div>
            </div>
            <div class="list-wrapper">
              <div class="list" @click="updateSong(list.id)" v-for="list in partSearchList" :key="list.id">
                <div class="text">
                  <div class="name">{{list.name}}</div>
                  <div class="artist">{{GetAlAr(list.artists,list.album)}}</div>
                </div>
                <div class="mv" v-show="havemv(list.copyrightId)">
                  <span class="iconfont icon-mv"></span>
                </div>
                <div class="about">
                  <span class="iconfont icon-threepoint"></span>
                </div>
              </div>
            </div>
            <div class="searchAll">
              查看全部{{count}}首单曲
              <span class="iconfont icon-arrow-right"></span>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script type="text/javascript">
// import BScroll from 'better-scroll'
import axios from 'axios'
export default {
  name: 'SearchResult',
  data () {
    return {
      message: '',
      suggestList: [],
      resultList: [],
      count: 0
    }
  },
  watch: {
    '$store.state.search' () {
      this.initResult()
    }
  },
  mounted () {
    this.initResult()
  },
  computed: {
    suggestStatus () {
      if (this.message === '' || this.message === this.searchtext) {
        return false
      } else {
        return true
      }
    },
    searchtext () {
      return this.$store.state.search
    },
    partSearchList () {
      let partlist = []
      if (this.resultList.length > 18) {
        for (var i = 0; i < 18; i++) {
          partlist.push(this.resultList[i])
        }
        return partlist
      } else {
        return this.resultList
      }
    }
  },
  methods: {
    GetSearchSuggest () {
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
    },
    initResult () { // 初始化结果
      this.message = this.searchtext
      this.$nextTick(() => {
        axios.get('http://localhost:3000/search?keywords=' + this.searchtext).then(res => res.data).then(data => {
          if (data.code === 200) {
            console.log(data)
            this.resultList = data.result.songs
            this.count = data.result.songCount
          }
        })
      })
    },
    GetAlAr (listar, listal) {
      var detail = ''
      listar.forEach((item, index) => {
        if (index === listar.length - 1) {
          detail += item.name
        } else {
          detail += item.name + '/'
        }
      })
      detail += ' - ' + listal.name
      return detail
    },
    updateSong (id) {
      axios.get('http://localhost:3000/song/detail?ids=' + id).then(res => res.data).then(data => {
        if (data.code === 200) {
          this.$store.commit('ChangeSong', data.songs[0])
          this.$store.commit('PlayAudio')
        }
      })
    },
    havemv (id) { // 判断是否有mv
      if (id === 0) {
        return false
      } else {
        return true
      }
    },
    Emptymsg () {
      this.message = ''
    }
  },
  components: {
  }
}
</script>

<style lang="stylus" scoped >
@import '~styles/mixins.styl'
.title-active{
  color red
  border-bottom 2px solid red
  // padding 5px 0
  font-weight bold
}
.Wrapper
    position absolute
    top 0
    left 0
    right 0
    bottom 110px
    z-index 105
    background #fff
    .header-wrapper
        position fixed
        top 0
        left 0
        width 93%
        z-index 105
        background #fff
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
                width 100%
                margin-left 5%
                font-size 3vh
                padding-bottom 5px
                border-bottom 2px solid #999
        .icon-chuyidong
            width 30px
            font-size 22px
            border-bottom 2px solid #999
    .search-suggest
      z-index 106
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
    .title-wrapper
      position fixed
      top 60px
      left 0
      z-index 105
      display flex
      width 100%
      background #fff
      border-bottom 1.5px solid #C0C0C0
      .title
        flex 1
        text-align center
        padding 5px 0
        span
          padding-bottom 2.5px
    .null_block
      height 100px
    .content-wrapper
      .content
        margin-bottom 100px
        .singles-wrapper
          position relative
          margin-top 20px
          .header
            padding 0 15px
            .title
              font-weight bold
            .all
              position absolute
              right 10px
              top 0
              border 1px solid #c0c0c0
              border-radius 20px
              padding 3px 5px
              font-size 12px
              .icon-bofang1
                margin-right 3px
                font-size 14px
                font-weight bold
          .list-wrapper
            position relative
            margin-top 20px
            width 100%
            .list
              display flex
              padding 0 15px
              margin-bottom 10px
              .text
                flex 1
                min-width 0
                .name
                  color #4169E1
                  width 80%
                  ellipsis()
                .artist
                  ellipsis()
                  font-size 12px
                  color #999
              .mv
                display inline-block
                line-height 40px
                margin-left 20px
                margin-right 15px
                .icon-mv
                    font-size 24px
              .about
                  display inline-block
                  line-height 40px
          .searchAll
            width 100%
            text-align center
            font-size 12px
            color #696969

</style>
