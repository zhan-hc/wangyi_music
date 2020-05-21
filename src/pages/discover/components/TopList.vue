<template>
  <div class="wrapper">
      <div class="header-wrapper">
          <router-link to="/" tag="span" class="iconfont icon-fanhuipt"></router-link>
          <div class="title">排行榜</div>
      </div>
      <div class="content-wrapper">
          <div class="yunlist-wrapper">
              <div class="title">云音乐特色榜</div>
              <div class="list" v-for="list in toplist.slice(0,4)" :key="list.id">
                  <div class="list-img">
                      <img :src="list.coverImgUrl" alt="">
                  </div>
                  <ul class="item">
                      <li class="item-li" v-for="(item, index) in list.tracks" :key="index">
                          {{index+1}}. {{item.first}} -- {{item.second}}
                      </li>
                  </ul>
              </div>
          </div>
          <div class="reclist-wrapper">
              <div class="title">推荐榜</div>
              <div class="list" v-for="list in toplist.slice(4)" :key="list.id">
                  <div class="list-img">
                      <img :src="list.coverImgUrl" alt="">
                  </div>
                  <div class="list-title">{{list.name}}</div>
              </div>
          </div>
      </div>
  </div>
</template>

<script type="text/javascript">
import axios from 'axios'
export default {
  name: 'DiscoverTopList',
  data () {
    return {
      toplist: []
    }
  },
  mounted () {
    this.init_toplist()
  },
  methods: {
    init_toplist () {
      this.$nextTick(() => {
        axios.get('http://localhost:3000/toplist/detail').then(res => res.data).then(data => {
          if (data.code === 200) {
            console.log(data)
            this.toplist = data.list
          }
        }).catch((error) => {
          console.log(error.response.status)
        })
      })
    }
  }
}
</script>

<style lang="stylus" scoped >
@import '~styles/mixins.styl'
.wrapper
    position relative
    // background #fff
    .header-wrapper
        position fixed
        top 0
        left 0
        width 100%
        z-index 105
        background #fff
        padding 10px
        .icon-fanhuipt
            display inline-block
            font-size 24px
            margin-right 10px
        .title
            display inline-block
            font-size 18px
    .content-wrapper
        position relative
        .yunlist-wrapper
            position relative
            margin-top 20px
            .title
                font-weight bold
                margin-left 15px
            .list
                display flex
                .list-img
                    flex 0 0 120px
                    padding 5%
                    img
                        width 100%
                        height 100%
                        border-radius 5px
                .item
                    flex 1
                    padding 5% 0
                    min-width 0
                    .item-li
                        ellipsis()
                        font-size 14px
                        margin-bottom 10px
                        color #ccc
        .reclist-wrapper
            position relative
            margin-top 20px
            .title
                font-weight bold
                margin-left 15px
                margin-bottom 20px
            .list
                // border 2px solid red
                position relative
                width 30%
                margin-left 3%
                float left
                margin-bottom 15px
                .list-img
                    // width 30%
                    img
                        width 100%
                        height 100%
                        border-radius 5px
                .list-title
                    ellipsis()

</style>
