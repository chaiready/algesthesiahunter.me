<template>
  <div class="articles">
    <markdown :value="article.body"></markdown>
  </div>
</template>

<script>
let markdown = () => import('@/components/common/markdown.vue')
import { getArticleDetail } from '@/service/articies'
export default {
  name: 'articles',
  data() {
    return {
      article: getArticleDetail(this.$route.params.id),
    }
  },
  components: {
    markdown,
  },
  computed: {},
  methods: {},
  created() {
    if (!this.article) {
      this.$router.go(-1)
    }
    console.log(this.article)
  },
}
</script>
<style lang="scss" scoped>
.articles {
  padding: 12px 24px;
  background-color: $module-bg;
}
</style>
