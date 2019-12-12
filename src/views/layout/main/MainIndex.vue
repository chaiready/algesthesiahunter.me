<template>
  <main class="main-container">
    <Nav></Nav>
    <ToolBox></ToolBox>
    <transition name="fade" mode="out-in">
      <router-view class="main" />
    </transition>
    <Aside></Aside>
    <ScrollTool></ScrollTool>
  </main>
</template>

<script>
import Nav from './modules/nav.vue'
import ToolBox from './modules/toolBox.vue'
import ScrollTool from './modules/scrollTool.vue'
import Aside from './modules/aside.vue'
export default {
  name: 'Main',
  data() {
    return {}
  },
  components: {
    Nav,
    ToolBox,
    ScrollTool,
    Aside,
  },
}
</script>

<style scoped lang="scss">
.main-container {
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 1100px;
  margin: 0 auto;
  .main {
    transition: opacity 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    min-height: 1px;
    position: relative;
    overflow: hidden;
    flex: 1;
    width: 642px;
  }
}
</style>
