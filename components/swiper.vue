<template>
  <div class="swiper-container">
    <loading-box class="loading" v-if="home.length === 0" />
    <template v-else>
      <transition name="module" mode="out-in">
        <div key="swiper" v-swiper:swiper="swiperOption" class="swiper">
          <div class="swiper-wrapper">
            <div
              :key="index"
              v-for="(it, index) in home"
              class="swiper-slide slide-item"
            >
              <div class="content filter">
                <NuxtLink
                  :to="{
                    path: pathLang('/articles/' + it._id, lang),
                  }"
                >
                  <div class="img">
                    <img :src="getImgUrl(it.img)" />
                    <span class="title">{{ it.title }}</span>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
          <div
            class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets"
          ></div>
        </div>
      </transition>
    </template>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import lozad from 'lozad'
export default {
  name: 'Swiper',
  data() {
    return {
      home: [],
      swiperOption: {
        loop: true,
        height: 200,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        lazy: true,
        pagination: {
          clickable: true,
          el: '.swiper-pagination',
        },
        mousewheel: true,
        observeParents: true,
        grabCursor: false,
        preloadImages: false,
      },
    }
  },
  computed: {
    ...mapState('common', ['lang']),
  },
  methods: {
    ...mapActions('article', ['getHomeArticles']),
  },
  mounted() {
    this.getHomeArticles({ page: 1 }).then((res) => {
      this.home = res.data.splice(0, 10)
      this.$nextTick(() => {
        const observer = lozad()
        observer.observe()
      })
    })
  },
}
</script>
<style>
@import 'swiper/dist/css/swiper.css';
</style>
<style lang="scss" scoped>
.swiper-container {
  background-color: $module-bg;
  overflow: hidden;
  height: 200px;
  .pag {
    color: $text-reversal;
  }
  .img {
    position: relative;
    height: 200px;
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
