<template>
  <div class="aside-container">
    <div ref="hotRef"><hot></hot></div>
    <calendar
      class="calendar"
      :timeList="timeList"
      @initData="initData"
      :lang="$i18n.locale"
    />
    <tags :class="{ 'if-fixed': !tagsFixed }"></tags>
  </div>
</template>

<script>
import hot from './hot.vue'
import tags from './tags.vue'
import calendar from '@/components/common/calendar.vue'
import { mapActions } from 'vuex'
export default {
  name: 'Aside',
  data() {
    return {
      tagsFixed: true,
      timeList: [],
    }
  },
  components: {
    hot,
    tags,
    calendar,
  },
  watch: {
    date(n) {
      let res = new Date(n)
      if (res !== 'Invalid Date') {
        this.currentDate = res
      }
    },
  },
  computed: {
    isEnLang() {
      return this.$i18n.locale === 'en'
    },
    date() {
      return this.$route.query.date
    },
  },
  mounted() {
    const options = {
      root: null,
      rootMargin: '230px 0px 0px 0px',
    }
    let io = new IntersectionObserver(this.callback, options)
    io.observe(this.$refs.hotRef)
  },
  methods: {
    ...mapActions('article', ['getArticlesByDate']),
    initData(params) {
      this.getArticlesByDate({
        startAt: params.startAt,
        endAt: params.endAt,
      }).then(res => {
        this.timeList = res.data.map(v => {
          return {
            _id: v._id,
            createdAt: v.createdAt,
          }
        })
      })
    },
    callback(v) {
      this.tagsFixed = v[0].isIntersecting
    },
  },
}
</script>

<style scoped lang="scss">
.aside-container {
  .if-fixed {
    position: fixed;
  }
  margin-left: 15px;
  width: 268px;
  height: auto;
  user-select: none;
  display: flex;
  flex-direction: column;
  .calendar {
    padding: 12px;
    margin-top: 15px;
    margin-bottom: 15px;
    background-color: $module-bg;
  }
}
</style>
