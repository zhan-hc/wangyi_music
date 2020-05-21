<template>
<div class="swiper-container">
    <swiper :options="swiperOption">
        <swiper-slide v-for="(list, index) in swiperList" :key="index">
            <img class="swiper-img" v-lazy='list.imageUrl'>
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination">
        </div>
    </swiper>
</div>
</template>

<script type="text/javascript">
import axios from 'axios'
export default {
  name: 'HomeSwiper',
  data () {
    return {
      swiperList: [],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        loop: true,
        autoplay: true
      }
    }
  },
  computed: {
  },
  mounted () {
    this.GetSwiper()
  },
  methods: {
    GetSwiper () {
      this.$nextTick(() => {
        axios.get('http://localhost:3000/banner').then(res => res.data).then(data => {
          this.swiperList = data.banners
        })
      })
    }
  }
}
</script>

<style lang="stylus" scoped >
.swiper-container >>> .swiper-pagination-bullet-active
    background: #DC143C
.swiper-container
    margin-top 5px
    overflow hidden
    width 100%
    height 0
    padding-bottom 35%
    border-radius 5px
    .swiper-img
        width 100%

</style>
