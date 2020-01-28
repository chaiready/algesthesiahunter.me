<template>
  <div class="home-container">
    <Swiper></Swiper>
    <Announcement class="announcement"></Announcement>
    <ArticleList :article="data"></ArticleList>
  </div>
</template>

<script>
import Swiper from '@/components/swiper.vue'
import Announcement from '@/components/announcement.vue'
import ArticleList from '@/components/article-list.vue'
export default {
  name: 'Home',
  components: {
    Swiper,
    Announcement,
    ArticleList,
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
