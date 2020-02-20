<template>
  <div class="home-container">
    <Swiper></Swiper>
    <Announcement class="announcement"></Announcement>
    <ArticleList :article="data"></ArticleList>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
    Swiper: () => import(/* Swiper */ '@/components/swiper.vue'),
    Announcement: () =>
      import(/* announcement */ '@/components/announcement.vue'),
    ArticleList: () =>
      import(/* ArticleList */ '@/components/article-list.vue'),
  },
  data() {
    return {
      data: [],
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
