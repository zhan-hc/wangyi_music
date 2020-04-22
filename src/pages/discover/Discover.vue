<template>
  <div class="discover">
    <discover-swiper></discover-swiper>
    <discover-icon></discover-icon>
    <discover-recommend></discover-recommend>
    <discover-song></discover-song>
    <discover-recommend></discover-recommend>
  </div>
</template>

<script type="text/javascript">
import DiscoverSwiper from './components/Swiper'
import DiscoverIcon from './components/Icon'
import DiscoverRecommend from './components/Recommend'
import DiscoverSong from './components/Song'
export default {
  name: 'Discover',
  data () {
    return {

    }
  },
  mounted () {
  },
  components: {
    DiscoverSwiper,
    DiscoverIcon,
    DiscoverRecommend,
    DiscoverSong
  },
  computed: {
  }
}
</script>

<style lang="stylus" scoped >
.discover
  overflow hidden
  margin-bottom 60px
</style>
