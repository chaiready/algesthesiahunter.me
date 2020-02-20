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
import ArticleList from '@/components/article-list.vue'
export default {
  name: 'CategoryType',
  components: {
    ArticleList,
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
  mounted() {
    console.log(this.$route.params.id)
  },
}
</script>
<style lang="scss" scoped>
.slogin {
  color: $text-reversal;
  height: 200px;
  background-color: $module-hover-bg-darken-10;
  background-size: cover;
  background-blend-mode: hue;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  .slogin-svg {
    font-size: 62px;
    margin-top: 0.7em;
    animation: scale-svg 5s -0.15s infinite linear;
  }
  @keyframes scale-svg {
    50% {
      opacity: 0.2;
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  .text {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 30px;
  }
}
</style>
