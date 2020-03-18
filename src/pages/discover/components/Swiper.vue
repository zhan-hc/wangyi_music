<template>
<div class="swiper-container">
    <swiper :options="swiperOption">
        <swiper-slide v-for="list in swiperList" :key="list.id">
            <img class="swiper-img" :src='list.imgUrl'>
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
</div>
</template>

<script type="text/javascript">
export default {
  name: 'HomeSwiper',
  data () {
    return {
      swiperList: [
        {
          id: '001',
          imgUrl: 'http://p1.music.126.net/07uWg0WypfXJR0dDVfFoGQ==/109951164815332366.jpg?imageView&quality=89'
        },
        {
          id: '002',
          imgUrl: 'http://p1.music.126.net/I_LtsEN94b6Ri0xc3kki8A==/109951164809231313.jpg?imageView&quality=89'
        },
        {
          id: '003',
          imgUrl: 'http://p1.music.126.net/8iV8Mq3g9auEXgAmKymalQ==/109951164812876717.jpg?imageView&quality=89'
        },
        {
          id: '004',
          imgUrl: 'http://p1.music.126.net/ocVk3WVZPVw2T13B1F_ogw==/109951164812860219.jpg?imageView&quality=89'
        },
        {
          id: '005',
          imgUrl: 'http://p1.music.126.net/Ta6xHV0_PQLOp3HJEL5DQA==/109951164812897275.jpg?imageView&quality=89'
        },
        {
          id: '006',
          imgUrl: 'http://p1.music.126.net/c4WHyY_n5aoxwrEDqsxb-Q==/109951164813876580.jpg?imageView&quality=89'
        },
        {
          id: '007',
          imgUrl: 'http://p1.music.126.net/Vz4j3NfQ1D-qBCuh2ckDKQ==/109951164813535529.jpg?imageView&quality=89'
        },
        {
          id: '008',
          imgUrl: 'http://p1.music.126.net/Pcv37iPUHgehP4Bhk6TS5Q==/109951164813070944.jpg?imageView&quality=89'
        },
        {
          id: '009',
          imgUrl: 'http://p1.music.126.net/5PNCWyrUTjx1tbWCBRP7RA==/109951164812919006.jpg?imageView&quality=89'
        }
      ],
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
