<template>
  <div :class="categoryType">
    <ArticleList :category="categoryType"></ArticleList>
  </div>
</template>

<script>
import ArticleList from '@/components/common/article-list.vue'
export default {
  props: {
    categoryType: String,
  },
  name: 'categoryType',
  components: {
    ArticleList,
  },
}
</script>
