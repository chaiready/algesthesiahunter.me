<template>
  <div class="category">
    <transition name="fade" mode="out-in">
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
