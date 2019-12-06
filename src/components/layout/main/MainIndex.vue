<template>
  <main class="main-container">
    <Nav></Nav>
    <ToolBox></ToolBox>
    <router-view class="main" />
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
  width: 1250px;
  margin: 0 auto;
  .main {
    width: 680px;
    min-height: 1px;
    position: relative;
    overflow: hidden;
    transition: none;
    flex: 1;
  }
}
</style>
