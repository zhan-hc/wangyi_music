<template>
  <div class="icon-container border-bottom">
      <router-link to="/daily" tag="div" class="icon-wrapper">
          <div class="icon-bg">
            <span class="iconfont icon-rili"></span></div>
          <div class="text">每日推荐</div>
      </router-link>
      <router-link to="/playlist" tag="div" class="icon-wrapper">
          <div class="icon-bg">
            <span class="iconfont icon-yinpingedan"></span></div>
          <div class="text">歌单</div>
      </router-link>
      <router-link to="/toplist" tag="div" class="icon-wrapper">
          <div class="icon-bg">
            <span class="iconfont icon-paihangbang"></span></div>
          <div class="text">排行榜</div>
      </router-link>
      <div class="icon-wrapper">
          <div class="icon-bg">
            <span class="iconfont icon-diantai"></span></div>
          <div class="text">电台</div>
      </div>
      <div class="icon-wrapper">
          <div class="icon-bg">
            <span class="iconfont icon-Shape"></span></div>
          <div class="text">直播</div>
      </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'DiscoverIcon',
  data () {
    return {
      iconList: [
        {
          id: '001',
          name: 'icon-rili',
          text: '每日推荐'
        },
        {
          id: '002',
          name: 'icon-yinpingedan',
          text: '歌单'
        },
        {
          id: '003',
          name: 'icon-paihangbang',
          text: '排行榜'
        },
        {
          id: '004',
          name: 'icon-diantai',
          text: '电台'
        },
        {
          id: '005',
          name: 'icon-Shape',
          text: '直播'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped >
.icon-container
    display flex
    width 100%
    margin-top 5px
    .icon-wrapper
        flex 1
        text-align center
        .icon-bg
            margin 5px auto
            width 40px
            height 40px
            line-height 40px
            background red
            color white
            border-radius 50%
        .text
            font-size 10px
</style>
