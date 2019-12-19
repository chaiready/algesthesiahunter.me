<template>
  <footer class="footer-container">
    <span>{{ $t('footer.powered') }} </span>
    <a href="https://vuejs.org">
      <span class="keyworld"> {{ $t('footer.library') }} </span>
    </a>
    <span>{{ $t('footer.and') }} </span>
    <span style="margin-left:5px">{{ $t('footer.drive') }} </span>
    <span class="gb">|</span>
    <span>{{ $t('footer.design') }} </span>
    <router-link to="/about">
      <span class="keyworld">{{ $t('footer.me') }}</span>
    </router-link>
  </footer>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style scoped lang="scss">
.footer-container {
  margin-top: 14px;
  background-color: $module-bg;
  height: 72px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .keyworld {
    text-decoration: underline;
    margin: 0 5px;
  }
  .gb {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 19px;
  }
}
</style>
