<template>
  <main class="main-container" id="main">
    <Nav></Nav>
    <ToolBox></ToolBox>
    <router-view />
    <ScrollTool></ScrollTool>
  </main>
</template>

<script>
import Nav from './modules/nav.vue'
import ToolBox from './modules/toolBox.vue'
import ScrollTool from './modules/scrollTool.vue'
export default {
  name: 'Main',
  data() {
    return {}
  },
  components: {
    Nav,
    ToolBox,
    ScrollTool,
  },
}
</script>

<style scoped lang="scss">
.main-container {
  position: relative;
  display: flex;
  flex-direction: row;
  width: 1100px;
  margin: 0 auto;
}
</style>
