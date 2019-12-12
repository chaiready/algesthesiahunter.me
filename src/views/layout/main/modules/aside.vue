<template>
  <div class="aside-container">
    <div ref="hotRef"><hot></hot></div>
    <calendar class="calendar" />
    <tags :class="{ 'if-fixed': !tagsFixed }"></tags>
  </div>
</template>

<script>
import hot from './hot.vue'
import tags from './tags.vue'
import calendar from '@/components/common/calendar.vue'

export default {
  name: 'Aside',
  data() {
    return {
      tagsFixed: true,
    }
  },
  components: {
    hot,
    tags,
    calendar,
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
