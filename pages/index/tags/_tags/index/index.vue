<template>
  <ArticleList :article="article"></ArticleList>
</template>

<script>
import ArticleList from '@/components/article-list.vue'
export default {
  name: 'TagsArticleList',
  props: {
    article: {},
  },
  components: {
    ArticleList,
  },
}
</script>
