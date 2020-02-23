<template>
  <ArticleList :article="article"></ArticleList>
</template>

<script>
import ArticleList from '@/components/article-list.vue'
export default {
  name: 'HomeArticleList',
  props: {
    article: {},
  },
  components: {
    ArticleList,
  },
}
</script>
