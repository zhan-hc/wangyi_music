<template>
  <div class="header">
      <div class="avatar-wrapper">
          <div class="avatar"><img src="http://p1.music.126.net/BUFZLieG5a6E3ZVpkHP6fA==/109951163402069754.jpg"></div>
          <div class="info">
              <div class="name">等你回眸170530</div>
          <div class="grade">Lv.6</div>
          </div>
          <div class="vip">开通黑胶VIP ></div>
      </div>
      <div class="icon-wrapper">
          <div class="icon" v-for="list in iconList" :key="list.id">
            <span class="iconfont" :class="list.icon"></span>
            <div class="name">{{list.name}}</div>
          </div>
      </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'HomeHeader',
  data () {
    return {
      iconList: [
        {
          id: '001',
          icon: 'icon-yinyue',
          name: '本地音乐'
        },
        {
          id: '002',
          icon: 'icon-xiazaipt',
          name: '下载管理'
        },
        {
          id: '003',
          icon: 'icon-diantai1',
          name: '我的电台'
        },
        {
          id: '004',
          icon: 'icon-shoucang',
          name: '我的收藏'
        },
        {
          id: '005',
          icon: 'icon-xinge',
          name: '关注新歌'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped >
.header
    position relative
    padding 15px 15px 30px 15px
    background rgba(0,0,0,0.8)
    color #fff
    .avatar-wrapper
        width 100%
        .avatar
            display inline-block
            width 45px
            height 45px
            img
                width 100%
                border-radius 50%
        .info
            display inline-block
            vertical-align top
            margin 5px 10px
            .name
                font-size  14px
            .grade
                width 28px
                margin-top 3px
                padding 1px 5px
                background #cccccc
                color #fff
                letter-spacing 1px
                font-style italic
                border-radius 25px
                font-size 10px
        .vip
            float right
            margin-top 10px
            color #D3D3D3
            font-size 12px
    .icon-wrapper
        width 100%
        display flex
        text-align center
        margin-top 10px
        .icon
            flex 1
            .iconfont
                font-size 18px
            .name
                margin-top 5px
                font-size 12px

</style>
