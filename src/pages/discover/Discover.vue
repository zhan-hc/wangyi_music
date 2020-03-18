<template>
  <div class="discover">
    <discover-swiper></discover-swiper>
    <discover-icon></discover-icon>
    <discover-recommend></discover-recommend>
  </div>
</template>

<script type="text/javascript">
import DiscoverSwiper from './components/Swiper'
import DiscoverIcon from './components/Icon'
import DiscoverRecommend from './components/Recommend'
export default {
  name: 'Discover',
  data () {
    return {

    }
  },
  components: {
    DiscoverSwiper,
    DiscoverIcon,
    DiscoverRecommend
  }
}
</script>

<style lang="stylus" scoped >
</style>
