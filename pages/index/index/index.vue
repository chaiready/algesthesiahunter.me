<template>
  <ArticleList :article="article"></ArticleList>
</template>

<script>
export default {
  name: 'HomeArticleList',
  props: {
    article: {},
  },
  components: {
    ArticleList: () =>
      import(/* ArticleList */ '@/components/article-list.vue'),
  },
}
</script>
