<template>
  <div class="search">
    <ArticleList :keyword="keyword" :date="date"></ArticleList>
  </div>
</template>

<script>
import ArticleList from './components/article-list.vue'
export default {
  name: 'search',
  components: {
    ArticleList,
  },
  computed: {
    keyword() {
      return this.$route.query.keyword
    },
    date() {
      return this.$route.query.date
    },
  },
}
</script>
<style lang="scss" scoped></style>
