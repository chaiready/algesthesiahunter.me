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
import { mapActions } from 'vuex'
import Header from '@/components/layout/header.vue'
import Footer from '@/components/layout/footer.vue'
import Main from '@/components/layout/main/index.vue'
export default {
  name: 'App',
  components: {
    Header,
    Main,
    Footer,
  },
  methods: {
    ...mapActions('common', ['browserInit']),
  },
  mounted() {
    this.browserInit()
  },
}
</script>
<style lang="scss" scoped>
#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  transition: none;
  padding-top: 75px;
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
