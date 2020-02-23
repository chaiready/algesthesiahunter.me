<template>
  <ArticleList :article="article"></ArticleList>
</template>

<script>
import ArticleList from '@/components/article-list.vue'
export default {
  name: 'SearchArticleList',
  props: {
    article: {},
  },
  components: {
    ArticleList,
  },
}
</script>
