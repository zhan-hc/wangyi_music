<template>
  <div class="discover">
    <discover-swiper></discover-swiper>
    <discover-icon></discover-icon>
    <discover-recommend></discover-recommend>
    <discover-song></discover-song>
        <category v-show="CategoryStatu"></category>
  </div>
</template>

<script type="text/javascript">
import DiscoverSwiper from './components/Swiper'
import DiscoverIcon from './components/Icon'
import DiscoverRecommend from './components/Recommend'
import DiscoverSong from './components/Song'
import Category from '../category/Category'
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
    DiscoverSong,
    Category
  },
  computed: {
    CategoryStatu () {
      return this.$store.state.CategoryStatus
    }
  }
}
</script>

<style lang="stylus" scoped >
.discover
  overflow hidden
</style>
