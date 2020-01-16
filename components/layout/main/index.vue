<!--
 * @Description:主承载包括左侧导航、tool工具、滑动工具
 * @author: <https://github.com/algesthesiahunter>
 -->
<template>
  <main id="main" class="main-container">
    <Nav></Nav>
    <ToolBox></ToolBox>
    <nuxt />
    <ScrollTool></ScrollTool>
  </main>
</template>

<script>
import Nav from './modules/nav.vue'
import ToolBox from './modules/toolBox.vue'
import ScrollTool from './modules/scrollTool.vue'
export default {
  name: 'Main',
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
