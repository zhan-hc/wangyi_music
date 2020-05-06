<template>
  <div class="wrapper">
    <div class="header-wrapper">
      <div class="title" v-for="(list,index) in titleList" :key="list.id" @click="ActiveClick(index)">
        <span :class="{'title-active':HaveActive(index)}">{{list.name}}</span>
      </div>
    </div>
    <div class="list-wrapper">
      <div class="list" v-for="list in vedioList" :key="list.id">
        <div class="play">
          <span class="iconfont icon-bofang"></span>
        </div>
        <div class="vedio">
          <img :src="list.cover" alt="">
          <div class="playnum"><span class="iconfont icon-pause"></span>{{NumFilter(list.playCount)}}</div>
        </div>
        <div class="desc">{{list.name}}</div>
        <div class="info">
          <div class="avator">
            <img :src="list.cover" alt="">
          </div>
          <div class="name">{{list.artistName}}</div>
          <div class="icon">
            <span class="iconfont icon-damuzhi"></span>
            <span class="iconfont icon-pinglunpt1"></span>
            <span class="iconfont icon-threepoint"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import axios from 'axios'
export default {
  name: 'Vedio',
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
          name: 'LOOK直播'
        },
        {
          id: '03',
          name: '超燃计划'
        },
        {
          id: '04',
          name: '翻唱'
        },
        {
          id: '05',
          name: '舞蹈'
        },
        {
          id: '06',
          name: 'MV'
        },
        {
          id: '07',
          name: '#相信未来#'
        },
        {
          id: '08',
          name: '现场'
        },
        {
          id: '09',
          name: '广场'
        },
        {
          id: '10',
          name: '听BGM'
        },
        {
          id: '11',
          name: '生活'
        },
        {
          id: '12',
          name: '游戏'
        },
        {
          id: '13',
          name: 'ACG音乐'
        },
        {
          id: '14',
          name: '最佳饭剩'
        }
      ],
      vedioList: []
    }
  },
  mounted () {
    this.init_vedio()
  },
  methods: {
    ActiveClick (index) {
      this.tindex = index
    },
    HaveActive (index) {
      if (index === this.tindex) {
        return true
      } else {
        return false
      }
    },
    init_vedio () {
      this.$nextTick(() => {
        axios.get('http://localhost:3000/mv/all?area=%E5%86%85%E5%9C%B0').then(res => res.data).then(data => {
          if (data.code === 200) {
            console.log(data)
            this.vedioList = data.data
          }
        }).catch((error) => {
          console.log(error.response.status)
        })
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
    NumFilter (num) {
      var shu = ''
      var unit = num
      var wan = num / 10000
      var yi = num / 100000000
      if ((yi) > 1) {
        shu += parseInt(yi) + '亿'
      } else {
        if (wan > 1) {
          shu += parseInt(wan) + '万'
        } else {
          shu += unit
        }
      }
      return shu
    }
  }
}
</script>

<style lang="stylus" scoped >
@import '~styles/mixins.styl'
.title-active{
  color red
  font-weight bold
  border-bottom 2px solid red
}
.wrapper
  position relative
  margin-top 20px
  .header-wrapper
    position relative
    display flex
    background #fff
    padding 5px
    font-weight bold
    color #808080
    border-bottom 1.5px solid #ccc
    overflow hidden
    white-space nowrap
    .title
      position relative
      margin-right 40px
  .list-wrapper
    position relative
    margin-top 10px
    width 98%
    margin-left 1%
    background #f5f5f5
    .list
      position relative
      background #fff
      margin-bottom 10px
      padding-top 10px
      .play
        z-index 105
        position absolute
        top 70px
        left 45%
        .icon-bofang
          font-size 30px
          color rgba(255,255,255,0.7)
      .vedio
        position relative
        width 100%
        height 150px
        img
          border-radius 5px
          width 100%
          height 100%
        .playnum
          position absolute
          bottom 5px
          left 5px
          color #fff
          font-size 12px
          .icon-pause
            font-size 12px
      .desc
        padding 10px 0
        font-size 14px
        border-bottom 1.5px solid #ccc
      .info
        position relative
        padding 10px
        display flex
        .avator
          position relative
          display inline-block
          height 30px
          width 30px
          img
            border-radius 50%
            width 100%
            height 100%
        .name
          display inline-block
          flex 1
          margin-top 5px
          margin-left 10px
          font-size 14px
        .icon
          position relative
          margin-top 3px
          .iconfont
            margin-right 20px
          .icon-damuzhi
            font-size 20px
          .icon-pinglunpt1
            font-size 20px

</style>
