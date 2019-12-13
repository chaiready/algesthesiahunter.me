<template>
  <div class="search">
    <ArticleList :keyword="keyword"></ArticleList>
  </div>
</template>

<script>
import ArticleList from './article-list.vue'
export default {
  name: 'search',
  components: {
    ArticleList,
  },
  computed: {
    keyword() {
      return this.$route.query.keyword
    },
  },
}
</script>
<style lang="scss" scoped></style>
