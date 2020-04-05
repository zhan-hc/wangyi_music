<template>
  <div class="home">
    <home-header></home-header>
    <home-content></home-content>
  </div>
</template>

<script type="text/javascript">
import HomeHeader from './components/Header'
import HomeContent from './components/Content'
export default {
  name: 'Home',
  data () {
    return {

    }
  },
  components: {
    HomeHeader,
    HomeContent
  }
}
</script>

<style lang="stylus" scoped >
</style>
