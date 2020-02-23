<template>
  <ArticleList :article="article"></ArticleList>
</template>

<script>
export default {
  name: 'TagsArticleList',
  props: {
    article: {},
  },
  components: {
    ArticleList: () =>
      import(/* ArticleList */ '@/components/article-list.vue'),
  },
}
</script>
