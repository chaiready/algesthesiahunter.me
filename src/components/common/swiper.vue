<template>
  <div class="swiper-container">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(it, i) in home" :key="i">
        <router-link
          :to="{
            path: '/articles/' + it._id,
          }"
        >
          <div class="img">
            <img :src="cdn + it.img" />
            <span class="title">{{ it.title }}</span>
          </div>
        </router-link>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { mapActions, mapState } from 'vuex'
import lozad from 'lozad'
export default {
  name: 'Swiper',
  data() {
    return {
      swiperOption: {
        loop: true,
        centeredSlides: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        lazy: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
    }
  },
  computed: {
    ...mapState('article', ['home']),
  },
  components: {
    swiper,
    swiperSlide,
  },
  mounted() {
    const observer = lozad()
    observer.observe()
  },
}
</script>
<style lang="scss" scoped>
.swiper-container {
  overflow: hidden;
  height: 200px;
  .pag {
    color: $text-reversal;
  }
  .img {
    position: relative;
    height: 100%;
    width: 100%;
    .title {
      position: absolute;
      top: 1rem;
      right: 1.2rem;
      color: $link-color;
      padding-right: 0.6em;
      padding-left: 1.1em;
      height: 2em;
      line-height: 2em;
      font-size: 1em;
      font-weight: 700;
      border-radius: 1px;
      letter-spacing: 0.3px;
      max-width: 75%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      background-clip: text;
      background: linear-gradient(
        90deg,
        transparent,
        $module-bg 2em,
        $module-bg-opacity-9,
        $text-reversal
      );
    }
  }
}
</style>
