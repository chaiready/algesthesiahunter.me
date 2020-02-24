<template>
  <div class="tags">
    <slogin
      :sloginStyle="sloginStyle"
      name="route.category"
      :text="sonName"
    ></slogin>
    <transition name="fade" mode="out-in">
      <NuxtChild :nuxtChildKey="$route.path" :article="data" class="main" />
    </transition>
    <Paginations :total="total"></Paginations>
  </div>
</template>

<script>
import Paginations from '@/components/paginations.vue'
import slogin from '@/components/slogin.vue'
export default {
  name: 'Tags',
  components: {
    Paginations,
    slogin,
  },
  // watchQuery: true,
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
