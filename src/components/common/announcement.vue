<template>
  <div class="announcement-container">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
        <div class="main">
          <svg-icon icon-class="windmill" class="svg"></svg-icon>
          <span>{{ slide }}</span>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'announcement',
  data() {
    return {
      swiperOption: {
        direction: 'vertical',
        autoplay: {
          delay: 3000,
        },
      },
      swiperSlides: [
        '吹出去的牛逼能绕地球转三圈。',
        '遇强则弱，遇弱则强。',
        '一个人最想进步的时刻就是在他旁边有个比他吊的人存在且面对面装逼',
        '不知道为什么越来越喜欢独处以至于朋友之间交流的时候不知道讲什么',
      ],
    }
  },
  components: {
    swiper,
    swiperSlide,
  },
}
</script>
<style lang="scss" scoped>
.announcement-container {
  overflow: hidden;
  height: 36px;
  .main {
    position: relative;
    height: 36px;
    display: flex;
    align-items: center;
    font-size: 13.3px;
    background-color: #b5b5b5;
    user-select: none;
    color: $text-reversal;
    .svg {
      width: 60px;
      font-size: 16px;
    }
  }
}
</style>
