<template>
  <div class="category">
    <transition name="fade" mode="out-in">
      <router-view class="main" :key="$route.path" />
    </transition>
    <Aside></Aside>
  </div>
</template>

<script>
import Aside from '@/views/layout/main/modules/aside.vue'
export default {
  name: 'category',
  components: {
    Aside,
  },
}
</script>
<style lang="scss" scoped>
.category {
  display: flex;
  .main {
    transition: opacity 0.25s cubic-bezier(0.55, 0, 0.1, 1);
    min-height: 1px;
    position: relative;
    flex: 1;
    width: 642px;
  }
}
</style>
