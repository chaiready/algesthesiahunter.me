<template>
  <div class="aside-container">
    <div ref="hotRef"><hot></hot></div>
    <calendar class="calendar" />
    <category :categoryFixed="categoryFixed"></category>
  </div>
</template>

<script>
import hot from './hot.vue'
import category from './category.vue'
import calendar from '@/components/common/calendar.vue'

export default {
  name: 'Aside',
  data() {
    return {
      categoryFixed: true,
    }
  },
  components: {
    hot,
    category,
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
      this.categoryFixed = v[0].isIntersecting
    },
  },
}
</script>

<style scoped lang="scss">
.aside-container {
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
