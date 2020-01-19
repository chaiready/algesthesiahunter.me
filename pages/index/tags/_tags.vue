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
  head(app) {
    return {
      title: `${this.$store.state.common.title}`,
    }
  },
  data() {
    return {
      data: [],
    }
  },
  asyncData({ store, query }) {
    return store.dispatch('article/getArticles', {
      page: query.page ? query.page : 1,
      tags: query.tags,
    })
  },
}
</script>
