<template>
  <div class="index-container">
    <NuxtChild v-if="!hasChild" :nuxtChildKey="$route.path" class="main" />
    <transition name="fade" mode="out-in" v-else>
      <NuxtChild :nuxtChildKey="$route.path" class="main" />
    </transition>
    <Aside></Aside>
  </div>
</template>

<script>
import Aside from '@/components/layout/aside'
export default {
  name: 'Category',
  components: {
    Aside,
  },
  computed: {
    hasChild() {
      const path = this.$route.path
      return /about/.test(path) || /articles/.test(path)
    },
  },
}
</script>
<style lang="scss" scoped>
.index-container {
  display: flex;
  .main {
    transition: opacity 0.25s cubic-bezier(0.55, 0, 0.1, 1);
    position: relative;
    flex: 1;
    width: 642px;
  }
}
</style>
