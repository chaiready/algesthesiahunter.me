<template>
  <div class="nav-container">
    <nav class="nav-list">
      <router-link class="it" :to="'/'" exact>
        <svg-icon icon-class="home"></svg-icon>
        {{ navList.home }}</router-link
      >
      <router-link class="it" to="/coding">
        <svg-icon icon-class="coding"></svg-icon>
        {{ navList.coding }}</router-link
      >
      <router-link class="it" to="/think">
        <svg-icon icon-class="think"></svg-icon>
        {{ navList.think }}</router-link
      >
      <router-link class="it" to="/project">
        <svg-icon icon-class="project"></svg-icon>
        {{ navList.project }}</router-link
      >
      <router-link class="it" to="/vlog">
        <svg-icon icon-class="vlog"></svg-icon>
        {{ navList.vlog }}</router-link
      >
      <router-link class="it" to="/about">
        <svg-icon icon-class="about"></svg-icon>
        {{ navList.about }}</router-link
      >
      <router-link class="it" to="/guestbook">
        <svg-icon icon-class="guestbook"></svg-icon>
        {{ navList.guestbook }}</router-link
      >
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    navList() {
      return this.$t('nav')
    },
  },
  mounted() {
    console.log(this.navList)
  },
}
</script>

<style scoped lang="scss">
.nav-container {
  margin-right: 15px;
  width: 160px;
  min-height: calc(100vh - 164px);
  user-select: none;
  .nav-list {
    width: 160px;
    padding: 0;
    margin: 0;
    position: fixed;
    display: flex;
    flex-direction: column;
    .it {
      border: none;
      display: flex;
      align-items: center;
      position: relative;
      width: 100%;
      height: 42px;
      padding: 0 14px;
      text-decoration: none;
      text-transform: uppercase;
      font-weight: 700;
      border-radius: 1px;
      font-size: 14px;
      letter-spacing: 0.5px;
      margin-bottom: 7px;
      svg {
        margin-right: 14px;
      }
      &:hover {
        color: $primary;
      }
      &.router-link-active {
        color: $primary;
        background-color: $module-bg;
      }
    }
  }
}
</style>
