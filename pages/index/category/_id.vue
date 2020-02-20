<template>
  <div>
    <div class="slogin" :style="sloginStyle">
      <svg-icon :icon-class="name" class="slogin-svg"></svg-icon>
      <div class="text">{{ text }}</div>
    </div>
    <ArticleList :article="data"></ArticleList>
  </div>
</template>

<script>
export default {
  name: 'CategoryType',
  components: {
    ArticleList: () =>
      import(/* ArticleList */ '@/components/article-list.vue'),
  },
  head(app) {
    return {
      title: `${this.$store.state.common.title}`,
    }
  },
  computed: {
    sloginStyle() {
      return `background-image:url(${this.cdn}category_${this.name}.jpeg)`
    },
    name() {
      return this.$route.params.id
    },
    text() {
      return this.$t(`text.category.${this.name}`)
    },
  },
  data() {
    return {
      data: [],
    }
  },
  asyncData({ store, query }) {
    return store.dispatch('article/getArticles', {
      page: query.page ? query.page : 1,
      category: query.category,
    })
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/components/slogin.scss';
</style>
