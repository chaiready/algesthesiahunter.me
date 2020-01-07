<template>
  <div class="home-container">
    <Swiper></Swiper>
    <Announcement class="announcement"></Announcement>
    <ArticleList></ArticleList>
  </div>
</template>

<script>
import Swiper from '@/components/common/swiper.vue'
import Announcement from '@/components/common/announcement.vue'
import ArticleList from './components/article-list.vue'
export default {
  name: 'Home',
  data() {
    return {}
  },
  components: {
    Swiper,
    Announcement,
    ArticleList,
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
