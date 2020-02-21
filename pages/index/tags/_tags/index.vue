<template>
  <div class="tags">
    <div class="slogin" :style="sloginStyle">
      <svg-icon icon-class="route.category" class="slogin-svg"></svg-icon>
      <div class="text" style="text-transform: uppercase">{{ sonName }}</div>
    </div>
    <transition name="fade" mode="out-in">
      <NuxtChild :nuxtChildKey="$route.path" :article="data" class="main" />
    </transition>
    <Paginations :total="total"></Paginations>
  </div>
</template>

<script>
export default {
  name: 'Tags',
  components: {
    Paginations: () => import(/* Paginations */ '@/components/paginations.vue'),
  },
  watchQuery: true,
  head(app) {
    return {
      title: `${this.$store.state.common.title}`,
    }
  },
  data() {
    return {
      data: [],
      total: 0,
    }
  },
  computed: {
    sloginStyle() {
      return `background-image:url(${this.cdn}category_search.jpeg)`
    },
    sonName() {
      return this.$route.params.tags
    },
  },
  asyncData({ store, query }) {
    return store.dispatch('article/getArticles', {
      page: query.page ? query.page : 1,
      tags: query.tags,
    })
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/components/slogin.scss';
</style>
