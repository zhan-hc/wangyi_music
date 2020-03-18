<template>
  <div class="discover">
    <discover-swiper></discover-swiper>
    <discover-icon></discover-icon>
  </div>
</template>

<script type="text/javascript">
import DiscoverSwiper from './components/Swiper'
import DiscoverIcon from './components/Icon'
export default {
  name: 'Discover',
  data () {
    return {

    }
  },
  components: {
    DiscoverSwiper,
    DiscoverIcon
  }
}
</script>

<style lang="stylus" scoped >
</style>
