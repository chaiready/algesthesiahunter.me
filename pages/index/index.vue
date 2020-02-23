<template>
  <div class="home-container">
    <Swiper></Swiper>
    <Announcement class="announcement"></Announcement>
    <transition name="fade" mode="out-in">
      <NuxtChild :nuxtChildKey="$route.path" :article="data" class="main" />
    </transition>
    <Paginations :total="total"></Paginations>
  </div>
</template>

<script>
import Swiper from '@/components/swiper.vue'
import Announcement from '@/components/announcement.vue'
import Paginations from '@/components/paginations.vue'
export default {
  name: 'Home',
  watchQuery: true,
  components: {
    Swiper,
    Announcement,
    Paginations,
  },
  data() {
    return {
      data: [],
      total: 0,
    }
  },
  asyncData({ store, query }) {
    return store.dispatch('article/getArticles', {
      page: query.page ? query.page : 1,
    })
  },
}
</script>
<style lang="scss" scoped>
.home-container {
  width: 642px;
  .announcement {
    margin-top: 15px;
    margin-bottom: 15px;
  }
}
</style>
