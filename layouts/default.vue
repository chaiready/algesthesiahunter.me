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
export default {
  name: 'App',
  components: {
    Header: () => import(/* Header */ '@/components/layout/header.vue'),
    Main: () => import(/* Main */ '@/components/layout/main/index.vue'),
    Footer: () => import(/* Footer */ '@/components/layout/footer.vue'),
  },
}
</script>
<style lang="scss" scoped>
#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 75px;
  min-height: 100vh;
  transition: none;
  position: relative;
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
      background-size: 100% 100%;
    }
  }
}
</style>
