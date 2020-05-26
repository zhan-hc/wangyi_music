<template>
<transition name="moveL">
<div class="outer-wrapper">
  <div class="category">
      <div class="wrapper" ref="categoryScroll">
          <div class="container">
              <div class="top-wrapper">
                  <div class="content">
                      <div class="top">
                          <div class="title">开通黑胶VIP</div>
                          <div class="desc">加入黑胶VIP，立享超12项专属特权</div>
                          <div class="right">会员中心</div>
                      </div>
                      <div class="bottom">
                          <div class="title">首月仅5元</div>
                          <div class="desc">新用户专属特惠，快来加入吧！</div>
                          <div class="right"><span class="iconfont icon-arrow-right"></span></div>
                      </div>
                  </div>
              </div>
              <div class="content-wrapper">
                  <div class="user">
                      <div class="avatar"><img :src="user.avatarUrl"></div>
                      <div class="name">{{user.nickname}}</div>
                      <div class="sign"><span class="iconfont icon-jinbi"><span class="text">签到</span></span> </div>
                  </div>
                  <div class="icon-wrapper">
                      <div class="icon" v-for="icon in iconList" :key="icon.id">
                          <span class="iconfont" :class="icon.icon"></span>
                          <div class="text">{{icon.text}}</div>
                      </div>
                  </div>
                  <div class="list">
                      <div class="item-border">
                          <span class="iconfont icon-dengpao"></span>创作者中心
                      </div>
                      <div class="item-middle">
                        <div class="item" v-for="list in middleList" :key="list.id">
                            <span class="iconfont" :class="list.icon"></span>{{list.text}}
                        </div>
                      </div>
                      <div class="item-last">
                        <div class="item" v-for="list in downList" :key="list.id">
                            <span class="iconfont" :class="list.icon"></span>{{list.text}}
                        </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="place" @click="HideCategory()"></div>
  </div>
  <div class="setting-wrapper">
    <div class="night"><span class="iconfont icon-yejianmoshi"></span>夜间模式</div>
    <div class="setting" @click="Setdetail"><span class="iconfont icon-shezhi"></span>设置</div>
    <div class="exit"><span class="iconfont icon-tuichu"></span>退出</div>
  </div>
</div>
</transition>
</template>

<script type="text/javascript">
import BScroll from 'better-scroll'
export default {
  name: 'Category',
  data () {
    return {
      iconList: [
        {
          id: '001',
          icon: 'icon-xin',
          text: '我的消息'
        },
        {
          id: '002',
          icon: 'icon-haoyou',
          text: '我的好友'
        },
        {
          id: '003',
          icon: 'icon-home',
          text: '个人主页'
        },
        {
          id: '004',
          icon: 'icon-yifu-',
          text: '个性装扮'
        }
      ],
      middleList: [
        {
          id: '001',
          icon: 'icon-tinggeshiqu',
          text: '听歌识曲'
        },
        {
          id: '002',
          icon: 'icon-yanchu',
          text: '演出'
        },
        {
          id: '003',
          icon: 'icon-gouwuche-',
          text: '商城'
        },
        {
          id: '004',
          icon: 'icon-fujinderen',
          text: '附近的人'
        },
        {
          id: '005',
          icon: 'icon-lingsheng',
          text: '口袋彩铃'
        }
      ],
      downList: [
        {
          id: '0001',
          icon: 'icon-dingdan',
          text: '我的订单'
        },
        {
          id: '0002',
          icon: 'icon-dingshitingzhibofang',
          text: '定时停止播放'
        },
        {
          id: '0003',
          icon: 'icon-saoyisao',
          text: '扫一扫'
        },
        {
          id: '0004',
          icon: 'icon-yinlenaozhong',
          text: '音乐闹钟'
        },
        {
          id: '0005',
          icon: 'icon-yunpan2',
          text: '音乐云盘'
        },
        {
          id: '0006',
          icon: 'icon-zaixiantinggemianliuliang',
          text: '在线听歌免流量'
        },
        {
          id: '0007',
          icon: 'icon-youhuiquan',
          text: '优惠券'
        },
        {
          id: '0008',
          icon: 'icon-dunpai',
          text: '青少年模式'
        }
      ],
      webHeight: ''
    }
  },
  mounted () {
    this._initScroll()
  },
  computed: {
    user () {
      return this.$store.state.userlist
    }
  },
  methods: {
    _initScroll () {
      this.$nextTick(() => {
        if (!this.categoryScroll) {
          this.categoryScroll = new BScroll(this.$refs.categoryScroll, {
            click: true,
            bounce: false // 取消回弹效果
          })
        } else {
          this.categoryScroll.refresh()
        }
      })
    },
    HideCategory () { // 点击空白区域隐藏
      this.$store.commit('hideCategory')
    },
    Setdetail () { // 跳转到设置详情页
      this.$store.commit('hideCategory')
      this.$router.push({
        path: '/setup'
      })
    }
  }
}
</script>

<style lang="stylus" scoped >
.moveL-enter-active,.moveL-leave-active{
    transition: all 0.3s linear
    transform: translateX(0%)}
.moveL-enter,.moveL-leave{
    transform: translateX(-100%)}
    .moveL-leave-to{
    transform: translateX(-100%)}
.outer-wrapper
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 107
    background rgba(0,0,0,0.5)
    .category
        display flex
        width 100%
        height 100%
        .wrapper
            flex 0 0 80%
            overflow hidden
            width 80%
            .container
                position relative
                background rgb(97,97,97)
                .top-wrapper
                    position relative
                    height 115px
                    background url('./components/category-bg.png') right bottom no-repeat
                    padding 30px 20px 0 20px
                    .content
                        position relative
                        background rgba(108,108,108,0.8)
                        width 100%
                        height 100px
                        border-radius 5px
                        padding-bottom 5px
                        .top
                            position relative
                            padding 10px 10px 20px 10px
                            border-bottom 1px solid rgba(255,255,255,0.3)
                            .title
                                color #FFE4E1
                                font-weight bold
                            .desc
                                margin-top 5px
                                font-size 10px
                                color #F5F5F5
                            .right
                                position absolute
                                top 10px
                                right 10px
                                padding 3px 5px
                                letter-spacing 1px
                                border-radius 20px
                                background #FFE4E1
                                color rgba(105,105,105,0.9)
                                font-size 8px
                        .bottom
                            position relative
                            padding 10px
                            font-size 8px
                            .title
                                color #FFE4E1
                                letter-spacing 1px
                            .desc
                                margin-top 3px
                                font-size 10px
                                color #F5F5F5
                            .right
                                position absolute
                                top 10px
                                right 10px
                                color #fff
                .content-wrapper
                    position relative
                    background #fff
                    border-radius 8px
                    padding 15px
                    .user
                        .avatar
                            width 30px
                            height 30px
                            img
                                width 100%
                                border-radius 50%
                        .name
                            position absolute
                            top 23px
                            left 53px
                            font-size 10px
                            font-weight bold
                        .sign
                            position absolute
                            top 20px
                            right 20px
                            font-size 8px
                            border-radius 20px
                            padding 2px 7px 1px 7px
                            background red
                            color #fff
                            span
                                font-size 14px
                                .text
                                    font-size 8px
                                    vertical-align top
                    .icon-wrapper
                        display flex
                        margin 15px 0
                        .icon
                            flex 1
                            text-align center
                            .iconfont
                                color red
                                font-size 24px
                            .text
                                margin-top 3px
                                font-size 10px
                                color rgba(0,0,0,0.7)
                    .list
                        margin 10px 0
                        .item-border
                            padding 15px 0
                            border-top 1px solid #dcdcdc
                            border-bottom 1px solid #dcdcdc
                            font-size 14px
                            span
                                font-weight bold
                                margin-right 10px
                        .item-middle
                            .item
                                padding 10px 0
                                font-size 14px
                                span
                                    margin-right 10px
                                &:last-child
                                    border-bottom 1px solid #dcdcdc
                                    padding-bottom 20px
                        .item-last
                            .item
                                padding 10px 0
                                font-size 14px
                                span
                                    margin-right 10px
                                &:first-child
                                    padding-top 20px
                                &:last-child
                                    border-bottom 1px solid #dcdcdc
                                    padding-bottom 25px
        .place
          flex 1
    .setting-wrapper
        position fixed
        display flex
        bottom 0
        left 0
        height 40px
        line-height 40px
        width 80%
        background #fff
        border-top 1px solid #dcdcdc
        z-index 200
        .night,.setting,.exit
            flex 1
            text-align center
            font-size 12px
            span
                margin-right 5px

</style>
