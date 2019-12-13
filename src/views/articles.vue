<template>
  <div class="articles">
    <markdown v-if="article && article.body" :value="article.body"></markdown>
    <div v-if="article && !article.body" class="empty">空空如也</div>
  </div>
</template>

<script>
import markdown from '@/components/common/markdown.vue'
import lozad from 'lozad'
import { mapActions } from 'vuex'
export default {
  name: 'articles',
  data() {
    return {
      article: {},
    }
  },
  components: {
    markdown,
  },
  computed: {
    id() {
      return this.$route.params.id
    },
  },
  watch: {
    id: {
      handler(n) {
        this.getArticleDetail(n).then(res => (this.article = res))
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions('common', ['getArticleDetail']),
  },
}
</script>
<style lang="scss" scoped>
.articles {
  padding: 12px 24px;
  background-color: $module-bg;
}
</style>
