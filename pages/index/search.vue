<template>
  <div class="search">
    <div class="slogin" :style="sloginStyle">
      <svg-icon :icon-class="name" class="slogin-svg"></svg-icon>
      <div class="text">{{ text }}</div>
    </div>
    <ArticleList ref="articleList" :article="data"></ArticleList>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import dayjs from 'dayjs'
import { isBrowser } from '@/config/env'
export default {
  name: 'Search',
  components: {
    ArticleList: () =>
      import(/* ArticleList */ '@/components/article-list.vue'),
  },
  data() {
    return {
      data: [],
    }
  },
  computed: {
    query() {
      return this.$route.query
    },
    date() {
      return this.query.date
    },
    page() {
      return this.query.page
    },
    keyword() {
      return this.query.keyword
    },
    sloginStyle() {
      return `background-image:url(${this.cdn}category_${this.name}.jpeg)`
    },
    name() {
      return 'search'
    },
    text() {
      return this.$t(`text.category.${this.name}`)
    },
  },
  watch: {
    date: {
      handler(n) {
        if (n) {
          this.initByDate()
        }
      },
      immediate: true,
    },
    keyword: {
      handler(n) {
        if (n) {
          this.init()
        }
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions('article', ['getArticlesByDate', 'getArticles']),
    initData() {
      if (isBrowser) {
        this.$refs.articleList.initData()
      }
    },
    init() {
      this.getArticles({
        page: this.page ? this.page : 1,
        keyword: this.keyword,
      }).then((res) => {
        this.data = res.data
        this.initData()
      })
    },
    initByDate() {
      const start = `${dayjs(this.date).format('YYYY/MM/DD')} 00:00:00`
      const end = `${dayjs(this.date).format('YYYY/MM/DD')} 23:59:59`
      this.getArticlesByDate({
        startAt: start,
        endAt: end,
      }).then((res) => {
        this.data = res.data
        this.initData()
      })
    },
  },
}
</script>
<style lang="scss">
@import '@/assets/components/slogin.scss';
</style>
