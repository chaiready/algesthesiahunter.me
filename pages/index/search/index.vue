<template>
  <div class="search">
    <slogin :sloginStyle="sloginStyle" :name="name" :text="text"></slogin>
    <transition name="fade" mode="out-in">
      <NuxtChild :nuxtChildKey="$route.path" :article="data" class="main" />
    </transition>
    <Paginations :total="total"></Paginations>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import dayjs from 'dayjs'
import { isBrowser } from '@/config/env'
import Paginations from '@/components/paginations.vue'
import slogin from '@/components/slogin.vue'
export default {
  name: 'Search',
  components: {
    Paginations,
    slogin,
  },
  data() {
    return {
      data: [],
      total: 0,
    }
  },
  // watchQuery: true,
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
      return this.$route.query.keyword
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
      const ref = this.$refs.articleList
      if (isBrowser && ref) {
        ref.initData()
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
