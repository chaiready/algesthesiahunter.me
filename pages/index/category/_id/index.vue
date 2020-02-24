<template>
  <div>
    <slogin :sloginStyle="sloginStyle" :name="name" :text="text"></slogin>
    <transition name="fade" mode="out-in">
      <NuxtChild :nuxtChildKey="$route.path" :article="data" class="main" />
    </transition>
    <Paginations :total="total"></Paginations>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Paginations from '@/components/paginations.vue'
import slogin from '@/components/slogin.vue'
export default {
  name: 'CategoryType',
  components: {
    Paginations,
    slogin,
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
