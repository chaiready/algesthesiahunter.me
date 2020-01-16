<template>
  <div class="think">
    <ArticleList :article="data"></ArticleList>
  </div>
</template>

<script>
import ArticleList from '@/components/article-list.vue'
export default {
  name: 'Tags',
  components: {
    ArticleList,
  },
  asyncData({ store, query }) {
    return store.dispatch('article/getArticles', {
      page: query.page ? query.page : 1,
      tags: query.tags,
    })
  },
}
</script>
