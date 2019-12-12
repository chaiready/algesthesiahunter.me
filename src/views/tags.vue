<template>
  <div class="think">
    <ArticleList :tag="tag"></ArticleList>
  </div>
</template>

<script>
import ArticleList from './article-list.vue'
export default {
  name: 'tags',
  components: {
    ArticleList,
  },
  computed: {
    tag() {
      return this.$route.params.tag
    },
  },
}
</script>
<style lang="scss" scoped></style>
