<!--
 * @Description:右侧群贤毕至、日历、tags
 * @author: <https://github.com/algesthesiahunter>
 -->
<template>
  <div class="aside-container">
    <div ref="hotRef">
      <hot></hot>
    </div>
    <calendar
      :time-list="timeList"
      @initData="initData"
      :lang="lang"
      class="calendar"
    />
    <tags :class="{ 'if-fixed': !tagsFixed }"></tags>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Aside',
  data() {
    return {
      tagsFixed: true,
      timeList: [],
    }
  },
  components: {
    hot: () => import(/* hot */ './modules/hot.vue'),
    tags: () => import(/* tags */ './modules/tags.vue'),
    calendar: () => import(/* calendar */ './modules/calendar.vue'),
  },
  watch: {
    date(n) {
      const res = new Date(n)
      if (res !== 'Invalid Date') {
        this.currentDate = res
      }
    },
  },
  computed: {
    ...mapState('common', ['lang']),
    isEnLang() {
      return this.lang === 'en'
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
    const io = new IntersectionObserver(this.callback, options)
    io.observe(this.$refs.hotRef)
  },
  methods: {
    ...mapActions('article', ['getArticlesByDate']),
    initData(params) {
      this.getArticlesByDate({
        startAt: params.startAt,
        endAt: params.endAt,
      }).then((res) => {
        this.timeList = res.data.map((v) => {
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
