<template>
  <div>
    <div class="slogin" :style="sloginStyle">
      <svg-icon :icon-class="name" class="slogin-svg"></svg-icon>
      <div class="text">{{ text }}</div>
    </div>
    <transition name="fade" mode="out-in">
      <NuxtChild :nuxtChildKey="$route.path" :article="data" class="main" />
    </transition>
    <Paginations :total="total"></Paginations>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Paginations from '@/components/paginations.vue'
export default {
  name: 'CategoryType',
  components: {
    Paginations,
  },
  watchQuery: true,
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
      total: 0,
    }
  },
  methods: {
    ...mapActions('article', ['getArticles']),
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
