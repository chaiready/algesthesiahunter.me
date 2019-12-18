<template>
  <div id="app">
    <Header></Header>
    <div class="g-background-img">
      <div class="background-image"></div>
    </div>
    <Main></Main>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from '@/views/layout/header.vue'
import Footer from '@/views/layout/footer.vue'
import Main from '@/views/layout/main/MainIndex.vue'
export default {
  name: 'App',
  data() {
    return {}
  },
  components: {
    Header,
    Main,
    Footer,
  },
}
</script>
<style lang="scss" scoped>
.g-background-img {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  background-color: $body-bg;
  .background-image {
    opacity: 0.3;
    height: 100%;
    width: 100%;
    background: url($cdn+'bg.jpg') center center no-repeat;
    background-size: auto 100%;
  }
}
</style>
