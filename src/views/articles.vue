<template>
  <div class="articles">
    <template v-if="article && article.body">
      <div class="title">
        <h2>{{ article.attributes.title }}</h2>
        <img
          :src="cdn + article.attributes.img"
          @click="addImgPopup(cdn + article.attributes.img)"
        />
      </div>
      <markdown :value="article.body"></markdown>
    </template>
    <div v-else class="empty">空空如也</div>
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
    addImgPopup(src) {
      if (window.utils) {
        window.utils.addImgPopup(src)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.articles {
  padding: 12px 24px;
  background-color: $module-bg;
  .title {
    h2 {
      margin: 1em 0 1.5em;
      text-align: center;
      font-weight: 700;
      font-size: 19.285px;
    }
    img {
      height: 200px;
      cursor: pointer;
    }
  }
}
</style>
