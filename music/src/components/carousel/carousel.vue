<template>
  <div class="carousel">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item, index) in swiper" :key="index">
        <img :src="item.imgUrl">
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import '../../../static/css/swiper.min.css'

export default {
  name: 'carousel',
  data() {
    return {
      swiperOption: {
        notNextTick: true,
        autoplay: 2000,
        pagination: '.swiper-pagination',
        paginationClickable :true
      }
    }
  },
  props: {
    swiper: {
      type: Array,
      default: []
    }
  },
  mounted() {
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>
<style lang="stylus" scoped> 
  .carousel
    img 
      width 100%
</style>


