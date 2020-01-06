<template>
  <div class="announcement-container">
    <div class="title">
      <svg-icon
        icon-class="windmill"
        class="svg"
        :style="{
          transform: `rotate(${rotatedeg * 90}deg)`,
        }"
      ></svg-icon>
    </div>
    <div class="bg"></div>
    <transition name="module" mode="out-in">
      <div
        class="swiper"
        key="swiper"
        v-swiper:swiper="swiperOption"
        @transitionStart="handleSwiperTransitionStart"
      >
        <div class="swiper-wrapper">
          <div
            :key="index"
            class="swiper-slide slide-item"
            v-for="(slide, index) in swiperSlides"
          >
            <div class="content filter">{{ slide }}</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// import 'swiper/dist/css/swiper.css'
export default {
  name: 'announcement',
  data() {
    return {
      rotatedeg: 0,
      swiperOption: {
        direction: 'vertical',
        height: 36,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
        },
      },
      swiperSlides: [
        '吹出去的牛逼能绕地球转三圈',
        '遇强则弱，遇弱则强',
        '时间就是金钱，效率就是生命',
      ],
    }
  },
  methods: {
    handleSwiperTransitionStart() {
      this.rotatedeg = this.swiper.activeIndex || 0
    },
  },
}
</script>
<style lang="scss" scoped>
.announcement-container {
  background-color: $module-bg;
  overflow: hidden;
  height: 36px;
  position: relative;
  .title {
    float: left;
    transform: rotate(45deg);
    transform-origin: center center;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .svg {
      color: $text-reversal;
      width: 60px;
      font-size: 16px;
      transition: all 0.3s;
    }
  }
  .filter {
    color: $text-reversal;
    height: 36px;
    display: flex;
    align-items: center;
  }

  .bg {
    left: 0;
    position: absolute;
    transform: rotate(-60deg) translateY(-59%);
    opacity: 0.7;
    border-bottom-width: 12px;
    z-index: -1;
    border-bottom-style: solid;
    border-color: #b5b5b5;
    background: linear-gradient(
      90deg,
      $theme-black 0%,
      $theme-black 50%,
      $module-bg 90%
    );
    padding-bottom: 50%;
    width: 100%;
  }
}
</style>
